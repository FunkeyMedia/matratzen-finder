import type { Metadata } from "next";
import Link from "next/link";
import { guides } from "@/lib/guides";
export const metadata: Metadata = {
  alternates: { canonical: "/ratgeber" },
  title: "Schlafwissen & Matratzen-Kaufberatung",
  description:
    "Härtegrad, Material, Größe, Pflege und Probeschlafen: verständliche Hilfe für deine Matratzenwahl.",
};
export default function GuideIndex() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="eyebrow">SCHLAFWISSEN</p>
          <h1>
            Gut informiert.
            <br />
            Bewusst entschieden.
          </h1>
          <p>
            Antworten auf die Fragen, die beim Matratzenkauf wirklich helfen.
          </p>
        </div>
      </section>
      <section className="wrap section">
        <div className="guide-grid">
          {guides.map((g, i) => (
            <Link
              href={`/ratgeber/${g.slug}`}
              className="guide-card"
              key={g.slug}
            >
              <div className={`guide-cover cover-${i % 3}`}>
                <span aria-hidden="true">{g.symbol}</span>
                <small>{g.category}</small>
              </div>
              <div>
                <p className="eyebrow">{g.readingTime} MINUTEN LESEZEIT</p>
                <h2>{g.title}</h2>
                <p>{g.intro}</p>
                <span className="text-link">Ratgeber lesen →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap closing">
        <h2>Bereit für deine Vorauswahl?</h2>
        <Link href="/finder" className="button button-primary">
          Zum Matratzen-Finder →
        </Link>
      </section>
    </>
  );
}
