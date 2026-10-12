import type { Metadata } from "next";
import Link from "next/link";
import { mattresses } from "@/lib/products";
import { getOffers } from "@/lib/amazon";
import { ProductCard } from "@/components/ProductCard";
import { MattressVisual } from "@/components/MattressVisual";
import { guides } from "@/lib/guides";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default async function Home() {
  const selected = mattresses.slice(0, 3);
  const offers = await getOffers(selected.map((p) => p.asin));
  return (
    <>
      <section className="hero">
        <div className="wrap hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">GUTER SCHLAF BEGINNT MIT DEINER AUSWAHL</p>
            <h1>
              Eine Matratze.
              <br />
              <em>Dein Liegegefühl.</em>
            </h1>
            <p className="hero-lead">
              Fest oder weich? Schaum oder Federkern? Finde heraus, welche
              Matratzen zu deinen Wünschen passen. Ohne den Überblick zu
              verlieren.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/finder">
                Meine Matratze finden <span aria-hidden="true">→</span>
              </Link>
              <Link
                className="button button-secondary"
                href="/katalog?typ=matratzen"
              >
                Modelle entdecken
              </Link>
            </div>
            <p className="hero-note">
              <span className="check">✓</span> 4 Fragen{" "}
              <span className="check">✓</span> Ohne Anmeldung{" "}
              <span className="check">✓</span> Kostenlos
            </p>
          </div>
          <div className="hero-art">
            <span className="art-label">DIE INNEREN WERTE ZÄHLEN.</span>
            <MattressVisual />
            <div className="art-caption">
              <small>SCHEMATISCHE DARSTELLUNG</small>
              <span>Material. Festigkeit. Größe.</span>
              <strong>Was passt zu dir?</strong>
            </div>
            <div className="art-dot" aria-hidden="true">
              Zzz.
            </div>
          </div>
        </div>
      </section>
      <div className="trust-strip wrap">
        <span>Nach deinen Kriterien</span>
        <span>Unterschiede verständlich erklärt</span>
        <span>Partnerlinks klar gekennzeichnet</span>
        <span>Keine erfundenen Testnoten</span>
      </div>
      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="eyebrow">DEIN SCHLAF IST INDIVIDUELL</p>
            <h2>
              Was für eine Matratze
              <br />
              suchst du?
            </h2>
          </div>
          <p>
            Starte mit dem Material. Oder lass den Finder deine Wünsche
            einordnen.
          </p>
        </div>
        <div className="category-grid">
          <Link
            className="category-card foam"
            href="/katalog?typ=matratzen&material=Kaltschaum"
          >
            <span className="category-icon" aria-hidden="true">
              ≈
            </span>
            <small>FLEXIBLER SCHAUM</small>
            <h3>Kaltschaum</h3>
            <p>Aufbau, Höhe und Festigkeit vergleichen.</p>
            <span className="text-link">Modelle entdecken →</span>
          </Link>
          <Link
            className="category-card spring"
            href="/katalog?typ=matratzen&material=Taschenfederkern"
          >
            <span className="category-icon" aria-hidden="true">
              ∿
            </span>
            <small>FEDERN IM KERN</small>
            <h3>Taschenfederkern</h3>
            <p>Federaufbau und konkrete Variante prüfen.</p>
            <span className="text-link">Modelle entdecken →</span>
          </Link>
          <Link
            className="category-card accessory"
            href="/katalog?typ=zubehoer"
          >
            <span className="category-icon" aria-hidden="true">
              ☾
            </span>
            <small>DAS DRUMHERUM</small>
            <h3>Schlafzubehör</h3>
            <p>Kissen und Auflagen für dein Bett.</p>
            <span className="text-link">Zubehör entdecken →</span>
          </Link>
        </div>
      </section>
      <section className="tint-section">
        <div className="wrap section">
          <div className="section-head">
            <div>
              <p className="eyebrow">KLAR VERGLEICHEN</p>
              <h2>
                Drei Modelle.
                <br />
                Drei verschiedene Ansätze.
              </h2>
            </div>
            <Link className="text-link" href="/katalog">
              Zur gesamten Auswahl →
            </Link>
          </div>
          <div className="product-grid">
            {selected.map((p) => (
              <ProductCard
                key={p.asin}
                product={p}
                offer={offers.find((o) => o.asin === p.asin)}
              />
            ))}
          </div>
          <p className="small-note">
            Unsere aktuelle Auswahl umfasst {mattresses.length}{" "}
            Matratzenmodelle. Die Auswahl ist keine Rangliste. Aktuelle Preise
            und Produktbilder erscheinen nur bei erfolgreichem Amazon-Abruf. *
            Partnerlink.
          </p>
        </div>
      </section>
      <section className="finder-banner">
        <div className="wrap banner-layout">
          <div>
            <p className="eyebrow">DU MUSST KEIN MATRATZENPROFI SEIN.</p>
            <h2>
              Deine Antworten.
              <br />
              Eine klare Vorauswahl.
            </h2>
            <p>
              Größe, Festigkeit, Material und dein Extra-Wunsch. Der Finder
              zeigt passende Merkmale und nennt Abweichungen.
            </p>
            <Link href="/finder" className="button button-primary">
              Finder starten →
            </Link>
          </div>
          <ol className="banner-steps">
            <li>
              <b>01</b>
              <div>
                <h3>Vier Fragen beantworten</h3>
                <p>Du kannst auch „nicht sicher“ wählen.</p>
              </div>
            </li>
            <li>
              <b>02</b>
              <div>
                <h3>Unterschiede erkennen</h3>
                <p>Belegte Eigenschaften statt pauschaler Versprechen.</p>
              </div>
            </li>
            <li>
              <b>03</b>
              <div>
                <h3>In Ruhe entscheiden</h3>
                <p>Details vergleichen und Angebot beim Händler prüfen.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
      <section className="wrap section">
        <div className="section-head">
          <div>
            <p className="eyebrow">SCHLAFWISSEN</p>
            <h2>
              Gut informiert.
              <br />
              Besser ausgewählt.
            </h2>
          </div>
          <Link href="/ratgeber" className="text-link">
            Alle Ratgeber →
          </Link>
        </div>
        <div className="guide-grid">
          {guides.slice(0, 3).map((g, i) => (
            <Link
              href={`/ratgeber/${g.slug}`}
              className="guide-card"
              key={g.slug}
            >
              <div className={`guide-cover cover-${i}`}>
                <span aria-hidden="true">{g.symbol}</span>
                <small>{g.category}</small>
              </div>
              <div>
                <p className="eyebrow">{g.readingTime} MINUTEN LESEZEIT</p>
                <h3>{g.title}</h3>
                <p>{g.intro}</p>
                <span className="text-link">Weiterlesen →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="faq-section">
        <div className="wrap faq-layout">
          <div>
            <p className="eyebrow">NOCH FRAGEN?</p>
            <h2>
              Das solltest
              <br />
              du wissen.
            </h2>
            <Link href="/methode" className="text-link">
              Unsere Methode kennenlernen →
            </Link>
          </div>
          <div className="faq-list">
            <details>
              <summary>Welche Matratze ist die beste?</summary>
              <p>
                Das hängt von deinen Wünschen, der Größe und deinem persönlichen
                Liegegefühl ab. Unser Finder vergleicht belegte Eigenschaften.
                Er liefert keine Testnote und ersetzt das Probeliegen nicht.
              </p>
            </details>
            <details>
              <summary>Was bedeutet H2 oder H3?</summary>
              <p>
                Härtegrade dienen als Orientierung und sind zwischen Herstellern
                nicht einheitlich. Prüfe die konkrete Variante und die
                Herstellerangaben.{" "}
                <Link href="/ratgeber/haertegrad-h2-h3">
                  Mehr zu Härtegraden
                </Link>
                .
              </p>
            </details>
            <details>
              <summary>Kann ich hier eine Matratze kaufen?</summary>
              <p>
                Du kaufst beim verlinkten Händler. Wir helfen bei der Vorauswahl
                und leiten dich über gekennzeichnete Partnerlinks weiter. Preis,
                Lieferung und Rückgabe richten sich nach dem Händlerangebot.
              </p>
            </details>
            <details>
              <summary>Wie finanziert sich der Matratzen-Finder?</summary>
              <p>
                Bei qualifizierten Käufen über Amazon-Partnerlinks können wir
                eine Provision erhalten. Der Kriterienvergleich hängt nicht von
                einer Provision ab.{" "}
                <Link href="/affiliate">Unser Affiliate-Hinweis</Link>.
              </p>
            </details>
          </div>
        </div>
      </section>
      <section className="wrap closing">
        <p className="eyebrow">MACH DEN ERSTEN SCHRITT</p>
        <h2>
          Dein Bett verdient
          <br />
          eine bewusste Entscheidung.
        </h2>
        <Link className="button button-primary" href="/finder">
          Jetzt passende Matratze finden →
        </Link>
      </section>
    </>
  );
}
