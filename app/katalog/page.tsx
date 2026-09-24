import type {Metadata} from 'next';
import Link from 'next/link';
import {products} from '@/lib/products';
import {getOffers} from '@/lib/amazon';
import {ProductCard} from '@/components/ProductCard';

export const dynamic='force-dynamic';
export const metadata:Metadata={title:'Produktkatalog',description:'Geprüfte Matratzen und Zubehörprodukte im Aufbaukatalog.'};
const PAGE_SIZE=18;

export default async function Catalog({searchParams}:{searchParams:Promise<{typ?:string;seite?:string}>}){
 const {typ,seite}=await searchParams;
 const category=typ==='matratzen'||typ==='zubehoer'?typ:undefined;
 const filtered=products.filter(p=>category==='zubehoer'?p.category==='zubehoer':category==='matratzen'?p.category==='matratze':true);
 const pages=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
 const requested=Number(seite);
 const page=Number.isInteger(requested)?Math.min(pages,Math.max(1,requested)):1;
 const visible=filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE);
 const offers=await getOffers(visible.map(p=>p.asin));
 const offerByAsin=new Map(offers.map(offer=>[offer.asin,offer]));
 const pageUrl=(number:number)=>`/katalog${category||number>1?`?${[category?`typ=${category}`:null,number>1?`seite=${number}`:null].filter(Boolean).join('&')}`:''}`;
 return <>
  <section className="page-hero"><div className="wrap"><p className="eyebrow">PRODUKTE ENTDECKEN</p><h1>Eine Auswahl mit offenen Karten.</h1><p>Jede Angabe hat eine Quelle. Wo Informationen fehlen, zeigen wir das an.</p></div></section>
  <div className="wrap section">
   <nav className="catalog-tools" aria-label="Produktkategorie"><Link className={!category?'active':''} href="/katalog">Alle ({products.length})</Link><Link className={category==='matratzen'?'active':''} href="/katalog?typ=matratzen">Matratzen</Link><Link className={category==='zubehoer'?'active':''} href="/katalog?typ=zubehoer">Zubehör</Link></nav>
   <p className="catalog-count">{filtered.length?`${(page-1)*PAGE_SIZE+1}–${(page-1)*PAGE_SIZE+visible.length} von ${filtered.length} Produkten`:'Noch keine Produkte in dieser Kategorie'}</p>
   <div className="product-grid">{visible.map(p=><ProductCard key={p.asin} product={p} offer={offerByAsin.get(p.asin)}/>)}</div>
   {pages>1&&<nav className="catalog-pages" aria-label="Katalogseiten">{page>1&&<Link href={pageUrl(page-1)}>← Zurück</Link>}{Array.from({length:pages},(_,i)=>i+1).map(number=><Link key={number} href={pageUrl(number)} aria-current={number===page?'page':undefined} className={number===page?'active':''}>{number}</Link>)}{page<pages&&<Link href={pageUrl(page+1)}>Weiter →</Link>}</nav>}
   <p className="small-note">Der Katalog ist im Aufbau und erfüllt noch nicht das Ziel von 200 Matratzen und 50 Zubehörprodukten. Aktuelle Angebotsdaten kommen ausschließlich aus der Amazon Creators API.</p>
  </div>
 </>;
}
