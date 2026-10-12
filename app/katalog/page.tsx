import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";
import { getOffers } from "@/lib/amazon";
import CatalogBrowser from "@/components/CatalogBrowser";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  alternates: { canonical: "/katalog" },
  title: "Produktkatalog",
  description:
    "Matratzen und Schlafzubehör nach Material, Größe und Härte filtern und direkt vergleichen.",
};
const PAGE_SIZE = 18;

export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{ typ?: string; seite?: string; material?: string }>;
}) {
  const { typ, seite, material } = await searchParams;
  const category = typ === "matratzen" || typ === "zubehoer" ? typ : undefined;
  const filtered = products.filter((p) =>
    category === "zubehoer"
      ? p.category === "zubehoer"
      : category === "matratzen"
        ? p.category === "matratze"
        : true,
  );
  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const requested = Number(seite);
  const page = Number.isInteger(requested)
    ? Math.min(pages, Math.max(1, requested))
    : 1;
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const offers = await getOffers(visible.map((p) => p.asin));
  const pageUrl = (number: number) =>
    `/katalog${category || number > 1 ? `?${[category ? `typ=${category}` : null, number > 1 ? `seite=${number}` : null].filter(Boolean).join("&")}` : ""}`;
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">PRODUKTE ENTDECKEN</p>
          <h1>Dein Bett. Deine Auswahl.</h1>
          <p>
            Filtere Matratzen und Zubehör nach deinen Wünschen. Wähle bis zu
            vier Modelle für deinen direkten Vergleich.
          </p>
        </div>
      </section>
      <div className="wrap section">
        <CatalogBrowser
          key={`${category || ""}-${material || ""}-${page}`}
          products={visible}
          offers={offers}
          initial={{
            category:
              category === "zubehoer"
                ? "zubehoer"
                : category === "matratzen"
                  ? "matratze"
                  : "",
            material:
              material === "Kaltschaum" || material === "Taschenfederkern"
                ? material
                : "",
          }}
        />
        {pages > 1 && (
          <nav className="catalog-pages" aria-label="Katalogseiten">
            {page > 1 && <Link href={pageUrl(page - 1)}>← Zurück</Link>}
            {Array.from({ length: pages }, (_, i) => i + 1).map((number) => (
              <Link
                key={number}
                href={pageUrl(number)}
                aria-current={number === page ? "page" : undefined}
                className={number === page ? "active" : ""}
              >
                {number}
              </Link>
            ))}
            {page < pages && <Link href={pageUrl(page + 1)}>Weiter →</Link>}
          </nav>
        )}
        <p className="small-note">
          Die Auswahl umfasst derzeit vier Matratzen und zwei Zubehörprodukte.
          Angegeben ist jeweils die recherchierte Variante. Live-Angebotsdaten
          stammen aus der Amazon Creators API; ohne Abruf zeigen wir keine
          Preise. * Partnerlinks.
        </p>
      </div>
    </>
  );
}
