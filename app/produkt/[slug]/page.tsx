import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { bySlug, products, affiliateUrl } from "@/lib/products";
import { getOffers } from "@/lib/amazon";
import { siteUrl } from "@/lib/site";
export const dynamic = "force-dynamic";
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = bySlug((await params).slug);
  return {
    alternates: p ? { canonical: `/produkt/${p.slug}` } : undefined,
    title: p ? `${p.brand} ${p.name}` : "Produkt",
    description: p
      ? `${p.kind} ${p.size}: geprüfte Merkmale und offene Fragen.`
      : undefined,
  };
}
export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = bySlug((await params).slug);
  if (!p) notFound();
  const offer = (await getOffers([p.asin]))[0];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${p.brand} ${p.name}`,
    brand: { "@type": "Brand", name: p.brand },
    description: `${p.kind}, ${p.size}. ${p.features.join(". ")}`,
    sku: p.asin,
    size: p.size,
    url: `${siteUrl}/produkt/${p.slug}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="wrap">
        <nav className="breadcrumbs" aria-label="Brotkrumennavigation">
          <Link href="/">Start</Link>
          <span aria-hidden="true">/</span>
          <Link href="/katalog">Modelle</Link>
          <span aria-hidden="true">/</span>
          <span>
            {p.brand} {p.name}
          </span>
        </nav>
        <div className="detail-grid">
          <div className="detail-photo">
            {offer.image ? (
              <img src={offer.image} alt={offer.title || p.name} />
            ) : (
              <div className="image-fallback">
                <span className="fallback-shape" aria-hidden="true" />
                <span>Illustration · kein Produktfoto</span>
              </div>
            )}
          </div>
          <div className="detail-copy">
            <p className="eyebrow">
              {p.brand} · {p.kind}
            </p>
            <h1>{p.name}</h1>
            {offer.title && (
              <p className="amazon-title">
                <strong>Amazon-Produkttitel:</strong> {offer.title}
              </p>
            )}
            <p>
              {p.size}
              {p.height ? ` · ${p.height} cm hoch` : ""}
              {p.firmness ? ` · ${p.firmness.join(" / ")}` : ""}
            </p>
            <div className="notice">
              <strong>Unsere Einordnung</strong>
              <p>
                Dieses Modell kann passen, wenn die angegebenen Eigenschaften
                deinen Wünschen entsprechen. Wir haben es nicht selbst getestet.
              </p>
            </div>
            <h2 style={{ fontSize: "2rem" }}>Recherchierte Produktangaben</h2>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            {offer.features.length > 0 && (
              <>
                <h2 style={{ fontSize: "2rem" }}>Produktangaben von Amazon</h2>
                <ul>
                  {offer.features.slice(0, 5).map((f: string) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            <h2 style={{ fontSize: "2rem" }}>Vor dem Kauf prüfen</h2>
            <p>{p.caveat}</p>
            <p>
              ASIN: {p.asin} · Recherchestand: {p.verifiedAt}
            </p>
            <p>
              <a href={p.source} target="_blank" rel="noopener noreferrer">
                Händlerquelle der recherchierten Variante ↗
              </a>
            </p>
            <p className="small-note">
              Die Angaben stammen aus der verlinkten Händlerseite zum
              angegebenen Recherchestand. Sie sind keine eigenen Testergebnisse.
              Prüfe die ausgewählte Größe, Härte und Modellversion erneut beim
              Händler, da Varianten wechseln können.
            </p>
            {offer.availability && (
              <p>
                <strong>Amazon-Verfügbarkeit:</strong> {offer.availability}
              </p>
            )}
            <div className="detail-cta">
              <a
                className="button button-primary"
                href={affiliateUrl(p.asin)}
                target="_blank"
                rel="sponsored nofollow noopener noreferrer"
              >
                Bei Amazon ansehen* ↗
              </a>
              <Link href="/finder" className="text-link">
                Antworten im Finder anpassen
              </Link>
            </div>
            <p className="small-note">
              * Partnerlink. Als Amazon-Partner verdienen wir an qualifizierten
              Verkäufen.{" "}
              {offer.price != null
                ? `Amazon-Preis: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(offer.price)} · Abruf: ${new Date(offer.checkedAt!).toLocaleString("de-DE")}.`
                : "Preis und Verfügbarkeit bitte bei Amazon prüfen."}{" "}
              Maßgeblich ist das Angebot beim Kauf.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
