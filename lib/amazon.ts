import { products, affiliateUrl } from './products';

export type Offer = {
  asin: string;
  image: string | null;
  price: number | null;
  title: string | null;
  features: string[];
  availability: string | null;
  checkedAt: string | null;
  url: string;
};

const allowed = new Set(products.map(product => product.asin));
const cache = new Map<string, { offer: Offer; until: number }>();
let auth: { token: string; until: number } | null = null;
let queue = Promise.resolve();
let lastCall = 0;

async function token() {
  if (auth && auth.until > Date.now()) return auth.token;
  const id = process.env.AMAZON_CREDENTIAL_ID;
  const secret = process.env.AMAZON_CREDENTIAL_SECRET;
  if (!id || !secret) throw new Error('credentials_missing');
  const response = await fetch('https://api.amazon.co.uk/auth/o2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ grant_type: 'client_credentials', client_id: id, client_secret: secret, scope: 'creatorsapi::default' }),
    signal: AbortSignal.timeout(12000),
    cache: 'no-store',
  });
  if (!response.ok) throw new Error('auth_unavailable');
  const data = await response.json();
  auth = { token: data.access_token, until: Date.now() + Math.min(data.expires_in || 3600, 3500) * 1000 };
  return auth.token;
}

async function pacedFetch(request: unknown) {
  const task = queue.then(async () => {
    const wait = Math.max(0, 1100 - (Date.now() - lastCall));
    if (wait) await new Promise(resolve => setTimeout(resolve, wait));
    lastCall = Date.now();
    const gatewaySecret = process.env.AMAZON_GATEWAY_SECRET;
    if (gatewaySecret) {
      return fetch(process.env.AMAZON_GATEWAY_URL || 'https://boxershorts-finder.de/api/matratzen-gateway', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${gatewaySecret}` },
        body: JSON.stringify({ operation: 'getItems', request }),
        signal: AbortSignal.timeout(20000),
        cache: 'no-store',
      });
    }
    return fetch('https://creatorsapi.amazon/catalog/v1/getItems', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await token()}`, 'x-marketplace': 'www.amazon.de' },
      body: JSON.stringify(request),
      signal: AbortSignal.timeout(15000),
      cache: 'no-store',
    });
  });
  queue = task.then(() => {}, () => {});
  return task;
}

function amazonImage(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    if (url.hostname === 'm.media-amazon.com' || url.hostname.endsWith('.media-amazon.com') || url.hostname.endsWith('.images-amazon.com')) return value;
  } catch {}
  return null;
}

export async function getOffers(ids: string[]): Promise<Offer[]> {
  const safe = [...new Set(ids)].filter(id => allowed.has(id)).slice(0, 20);
  const missing = safe.filter(id => !cache.get(id) || cache.get(id)!.until < Date.now());
  const configured = Boolean(process.env.AMAZON_GATEWAY_SECRET || (process.env.AMAZON_CREDENTIAL_ID && process.env.AMAZON_CREDENTIAL_SECRET));
  if (missing.length && configured) {
    try {
      for (let index = 0; index < missing.length; index += 10) {
        const batch = missing.slice(index, index + 10);
        const response = await pacedFetch({
          itemIds: batch,
          marketplace: 'www.amazon.de',
          partnerTag: 'onlinestarkei-21',
          resources: ['images.primary.large', 'itemInfo.title', 'itemInfo.features', 'offersV2.listings.price', 'offersV2.listings.availability'],
        });
        if (!response.ok) throw new Error(`upstream_status_${response.status}`);
        const data = await response.json();
        for (const item of data.itemsResult?.items || data.itemResults?.items || []) {
          if (!batch.includes(item.asin)) continue;
          const listing = item.offersV2?.listings?.find((offer: { isBuyBoxWinner?: boolean }) => offer.isBuyBoxWinner) || item.offersV2?.listings?.[0];
          const money = listing?.price?.money;
          const price = money?.currency === 'EUR' && Number.isFinite(money.amount) && money.amount >= 0 ? money.amount : null;
          cache.set(item.asin, {
            offer: {
              asin: item.asin,
              image: amazonImage(item.images?.primary?.large?.url),
              price,
              title: item.itemInfo?.title?.displayValue || null,
              features: Array.isArray(item.itemInfo?.features?.displayValues) ? item.itemInfo.features.displayValues.filter((value: unknown) => typeof value === 'string') : [],
              availability: listing?.availability?.message || null,
              checkedAt: new Date().toISOString(),
              url: affiliateUrl(item.asin),
            },
            until: Date.now() + 30 * 60 * 1000,
          });
        }
      }
    } catch (error) {
      console.error('amazon_offer_refresh_failed', error instanceof Error ? error.message : 'unknown');
    }
  }
  return safe.map(asin => {
    const hit = cache.get(asin);
    return hit && hit.until > Date.now() ? hit.offer : { asin, image: null, price: null, title: null, features: [], availability: null, checkedAt: null, url: affiliateUrl(asin) };
  });
}
