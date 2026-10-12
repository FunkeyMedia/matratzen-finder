import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guides";
import { siteUrl } from "@/lib/site";
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  return {
    title: g?.title || "Ratgeber",
    description: g?.intro,
    alternates: { canonical: `/ratgeber/${slug}` },
  };
}
export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const related = guides.filter((x) => x.slug !== slug).slice(0, 3);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.intro,
    inLanguage: "de-DE",
    datePublished: "2026-10-12",
    dateModified: "2026-10-12",
    author: { "@type": "Organization", name: "Matratzen-Finder" },
    mainEntityOfPage: `${siteUrl}/ratgeber/${g.slug}`,
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
      <section className="page-hero">
        <div className="wrap">
          <nav className="breadcrumbs" aria-label="Brotkrumennavigation">
            <Link href="/">Start</Link>
            <span>/</span>
            <Link href="/ratgeber">Schlafwissen</Link>
          </nav>
          <p className="eyebrow">
            {g.category} · {g.readingTime} MINUTEN LESEZEIT
          </p>
          <h1>{g.title}</h1>
          <p>{g.intro}</p>
        </div>
      </section>
      <div className="wrap article-layout">
        <article className="content-page">
          <p className="small-note">
            Redaktion Matratzen-Finder · Stand: 12. Oktober 2026
          </p>
          <nav className="article-toc" aria-label="Inhaltsverzeichnis">
            <strong>In diesem Ratgeber</strong>
            <ol>
              {g.sections.map(([title], i) => (
                <li key={title}>
                  <a href={`#abschnitt-${i + 1}`}>{title}</a>
                </li>
              ))}
            </ol>
          </nav>
          {g.sections.map(([title, body], i) => (
            <section id={`abschnitt-${i + 1}`} key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <div className="article-checklist">
            <h2>Deine Checkliste</h2>
            <ul>
              {g.checklist.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <h2>Quellen & weiterführende Informationen</h2>
          <ul>
            {g.sources.map(([label, url]) => (
              <li key={url}>
                <a
                  href={url}
                  {...(url.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {label} →
                </a>
              </li>
            ))}
          </ul>
          <p className="small-note">
            Eigene redaktionelle Kaufhilfe. Keine eigenen Produkt- oder
            Liegetests. Händlerbedingungen beziehen sich immer auf das konkrete
            Angebot.
          </p>
        </article>
        <aside className="article-sidebar">
          <div>
            <p className="eyebrow">VOM WISSEN ZUR AUSWAHL</p>
            <h2>Was passt zu dir?</h2>
            <p>
              Beantworte vier Fragen und vergleiche die belegten Eigenschaften.
            </p>
            <Link href="/finder" className="button button-primary">
              Finder starten →
            </Link>
            <Link className="text-link" href="/katalog">
              Modelle entdecken →
            </Link>
          </div>
        </aside>
      </div>
      <section className="tint-section">
        <div className="wrap section">
          <p className="eyebrow">WEITERLESEN</p>
          <h2>Das könnte dir auch helfen.</h2>
          <div className="related-guides">
            {related.map((r) => (
              <Link key={r.slug} href={`/ratgeber/${r.slug}`}>
                <h3>{r.title}</h3>
                <span className="text-link">Weiterlesen →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
