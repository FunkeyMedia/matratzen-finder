import type { Metadata } from "next";
import { products, mattresses, accessories } from "@/lib/products";
import { getOffers } from "@/lib/amazon";
import { catalogPage, type Filters } from "@/lib/catalog";
import CatalogBrowser from "@/components/CatalogBrowser";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  alternates: { canonical: "/katalog" },
  title: "Matratzen & Schlafzubehör vergleichen",
  description:
    "Matratzen und Schlafzubehör nach Marke, Material, Größe und Härte filtern. Verifizierte Modellvarianten und aktuelle Amazon-Angebote.",
};
export default async function Catalog({
  searchParams,
}: {
  searchParams: Promise<{
    typ?: string;
    seite?: string;
    material?: string;
    groesse?: string;
    haerte?: string;
    marke?: string;
    art?: string;
    suche?: string;
  }>;
}) {
  const q = await searchParams;
  const initial: Filters = {
    category:
      q.typ === "matratzen"
        ? "matratze"
        : q.typ === "zubehoer"
          ? "zubehoer"
          : "",
    material: q.material || "",
    size: q.groesse || "",
    firmness: q.haerte || "",
    brand: q.marke || "",
    kind: q.art || "",
    query: q.suche || "",
  };
  const current = catalogPage(products, initial, Number(q.seite) || 1);
  const offers = await getOffers(current.visible.map((p) => p.asin));
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">
            {mattresses.length} MATRATZEN · {accessories.length} ZUBEHÖRMODELLE
          </p>
          <h1>Dein Bett. Deine Auswahl.</h1>
          <p>
            Filtere den gesamten Katalog nach deinen Wünschen. Vergleiche bis zu
            vier konkrete Modelle und prüfe deren Variante beim Händler.
          </p>
        </div>
      </section>
      <div className="wrap section">
        <CatalogBrowser
          key={JSON.stringify(q)}
          products={products}
          offers={offers}
          initial={initial}
          initialPage={current.page}
        />
        <p className="small-note">
          {mattresses.length} Matratzenmodelle und {accessories.length}{" "}
          Zubehörmodelle. Größen- und Härtevarianten derselben Modellfamilie
          zählen nicht als zusätzliche Modelle. Jede Karte beschreibt die
          konkret verlinkte ASIN; die Quellen und das Prüfdatum stehen auf der
          Detailseite. Live-Angebotsdaten stammen aus der Amazon Creators API. *
          Partnerlinks.
        </p>
      </div>
    </>
  );
}
