import type {Metadata} from 'next';
import Link from 'next/link';
import {products} from '@/lib/products';
import {getOffers} from '@/lib/amazon';
import {ProductCard} from '@/components/ProductCard';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Produktkatalog',description:'Geprüfte Matratzen und Zubehörprodukte im Aufbaukatalog.'};
export default async function Catalog({searchParams}:{searchParams:Promise<{typ?:string}>}){const {typ}=await searchParams;const filtered=products.filter(p=>typ==='zubehoer'?p.category==='zubehoer':typ==='matratzen'?p.category==='matratze':true);const offers=await getOffers(filtered.map(p=>p.asin));return <><section className="page-hero"><div className="wrap"><p className="eyebrow">PRODUKTE ENTDECKEN</p><h1>Eine Auswahl mit offenen Karten.</h1><p>Jede Angabe hat eine Quelle. Wo Informationen fehlen, zeigen wir das an.</p></div></section><div className="wrap section"><div className="catalog-tools"><Link className={!typ?'active':''} href="/katalog">Alle ({products.length})</Link><Link className={typ==='matratzen'?'active':''} href="/katalog?typ=matratzen">Matratzen</Link><Link className={typ==='zubehoer'?'active':''} href="/katalog?typ=zubehoer">Zubehör</Link></div><div className="product-grid">{filtered.map(p=><ProductCard key={p.asin} product={p} offer={offers.find(o=>o.asin===p.asin)}/>)}</div><p className="small-note">Der Katalog ist im Aufbau und erfüllt noch nicht das Ziel von 200 Matratzen und 50 Zubehörprodukten. Aktuelle Angebotsdaten kommen ausschließlich aus der Amazon Creators API.</p></div></>}
