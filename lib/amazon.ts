import { unstable_cache } from "next/cache";
import { offerBatches } from "./catalog";
import { retryTransient } from "./retry";
import { products, affiliateUrl } from "./products";

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

const allowed = new Set(products.map((product) => product.asin));
const inflight = new Map<string, Promise<Offer[]>>();
let auth: { token: string; until: number } | null = null;
let queue = Promise.resolve();
let lastCall = 0;

async function token() {
  if (auth && auth.until > Date.now()) return auth.token;
  const id = process.env.AMAZON_CREDENTIAL_ID;
  const secret = process.env.AMAZON_CREDENTIAL_SECRET;
  if (!id || !secret) throw new Error("credentials_missing");
  const response = await fetch("https://api.amazon.co.uk/auth/o2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: id,
      client_secret: secret,
      scope: "creatorsapi::default",
    }),
    signal: AbortSignal.timeout(12000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("auth_unavailable");
  const data = await response.json();
  auth = {
    token: data.access_token,
    until: Date.now() + Math.min(data.expires_in || 3600, 3500) * 1000,
  };
  return auth.token;
}

async function pacedFetch(request: unknown) {
  const task = queue.then(async () => {
    const wait = Math.max(0, 1600 - (Date.now() - lastCall));
    if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
    lastCall = Date.now();
    const gatewaySecret = process.env.AMAZON_GATEWAY_SECRET;
    return retryTransient(async () => {
      if (gatewaySecret) {
        return fetch(
          process.env.AMAZON_GATEWAY_URL ||
            "https://boxershorts-finder.de/api/matratzen-gateway",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${gatewaySecret}`,
            },
            body: JSON.stringify({ operation: "getItems", request }),
            signal: AbortSignal.timeout(20000),
            cache: "no-store",
          },
        );
      }
      return fetch("https://creatorsapi.amazon/catalog/v1/getItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await token()}`,
          "x-marketplace": "www.amazon.de",
        },
        body: JSON.stringify(request),
        signal: AbortSignal.timeout(15000),
        cache: "no-store",
      });
    });
  });
  queue = task.then(
    () => {},
    () => {},
  );
  return task;
}

function amazonImage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    if (
      url.hostname === "m.media-amazon.com" ||
      url.hostname.endsWith(".media-amazon.com") ||
      url.hostname.endsWith(".images-amazon.com")
    )
      return value;
  } catch {}
  return null;
}

const emptyOffer = (asin: string): Offer => ({
  asin,
  image: null,
  price: null,
  title: null,
  features: [],
  availability: null,
  checkedAt: null,
  url: affiliateUrl(asin),
});
const cachedBatch = unstable_cache(
  async (batch: string[]): Promise<Offer[]> => {
    const response = await pacedFetch({
      itemIds: batch,
      marketplace: "www.amazon.de",
      partnerTag: "onlinestarkei-21",
      resources: [
        "images.primary.large",
        "itemInfo.title",
        "itemInfo.features",
        "offersV2.listings.price",
        "offersV2.listings.availability",
      ],
    });
    if (!response.ok) throw new Error(`upstream_status_${response.status}`);
    const data = await response.json();
    const output = new Map<string, Offer>();
    for (const item of data.itemsResult?.items ||
      data.itemResults?.items ||
      []) {
      if (!batch.includes(item.asin)) continue;
      const listing =
        item.offersV2?.listings?.find(
          (offer: { isBuyBoxWinner?: boolean }) => offer.isBuyBoxWinner,
        ) || item.offersV2?.listings?.[0];
      const money = listing?.price?.money;
      output.set(item.asin, {
        asin: item.asin,
        image: amazonImage(item.images?.primary?.large?.url),
        price:
          money?.currency === "EUR" &&
          Number.isFinite(money.amount) &&
          money.amount >= 0
            ? money.amount
            : null,
        title: item.itemInfo?.title?.displayValue || null,
        features: Array.isArray(item.itemInfo?.features?.displayValues)
          ? item.itemInfo.features.displayValues.filter(
              (v: unknown) => typeof v === "string",
            )
          : [],
        availability: listing?.availability?.message || null,
        checkedAt: new Date().toISOString(),
        url: affiliateUrl(item.asin),
      });
    }
    return batch.map((asin) => output.get(asin) || emptyOffer(asin));
  },
  ["matratzen-amazon-offers-v2"],
  { revalidate: 1800 },
);
export async function getOffers(ids: string[]): Promise<Offer[]> {
  const safe = [...new Set(ids)].filter((id) => allowed.has(id)).slice(0, 20);
  const configured = Boolean(
    process.env.AMAZON_GATEWAY_SECRET ||
      (process.env.AMAZON_CREDENTIAL_ID &&
        process.env.AMAZON_CREDENTIAL_SECRET),
  );
  if (!configured || !safe.length) return safe.map(emptyOffer);
  const result = new Map<string, Offer>();
  for (const batch of offerBatches(products, safe)) {
    const key = batch.join(",");
    try {
      let task = inflight.get(key);
      if (!task) {
        task = cachedBatch(batch);
        inflight.set(key, task);
        task.then(
          () => inflight.delete(key),
          () => inflight.delete(key),
        );
      }
      for (const offer of await task) {
        if (
          offer.checkedAt &&
          Date.now() - Date.parse(offer.checkedAt) < 1800000
        )
          result.set(offer.asin, offer);
      }
    } catch (error) {
      console.error(
        "amazon_offer_refresh_failed",
        error instanceof Error ? error.message : "unknown",
      );
    }
  }
  return safe.map((asin) => ({
    ...(result.get(asin) || emptyOffer(asin)),
    url: affiliateUrl(asin),
  }));
}
