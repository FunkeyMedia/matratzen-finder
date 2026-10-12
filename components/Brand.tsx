import Link from "next/link";
export function Mark() {
  return (
    <span className="mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" fill="none">
        <path
          d="M7 13h22v7H7zM7 22h22v7H7z"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M10 9h16"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
export function Header() {
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <span>Deine Matratze. Deine Kriterien.</span>
          <Link href="/affiliate">
            Unabhängige Auswahl · Partnerlinks mit *
          </Link>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap header-inner">
          <Link
            href="/"
            className="brand"
            aria-label="Matratzen-Finder Startseite"
          >
            <Mark />
            <span>
              MATRATZEN<span className="brand-light">FINDER</span>
            </span>
          </Link>
          <nav aria-label="Hauptnavigation">
            <Link href="/katalog">Matratzen & Zubehör</Link>
            <Link href="/vergleich">Vergleichen</Link>
            <Link href="/ratgeber">Schlafwissen</Link>
          </nav>
          <Link className="header-cta" href="/finder">
            Matratze finden <span aria-hidden="true">→</span>
          </Link>
        </div>
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <Link href="/" className="brand">
            <Mark />
            <span>
              MATRATZEN<span className="brand-light">FINDER</span>
            </span>
          </Link>
          <p>
            Weniger suchen. Bewusster auswählen. Deine Orientierung für
            Matratzen und Schlafzubehör.
          </p>
          <small>
            * Als Amazon-Partner verdienen wir an qualifizierten Verkäufen.
            Keine eigenen Liege- oder Labortests.
          </small>
        </div>
        <div>
          <h3>Deine Auswahl</h3>
          <Link href="/finder">Matratzen-Finder</Link>
          <Link href="/katalog?typ=matratzen">Alle Matratzen</Link>
          <Link href="/katalog?typ=zubehoer">Schlafzubehör</Link>
          <Link href="/vergleich">Modelle vergleichen</Link>
        </div>
        <div>
          <h3>Gut informiert</h3>
          <Link href="/ratgeber">Schlafwissen</Link>
          <Link href="/methode">Unsere Methode</Link>
          <Link href="/affiliate">Affiliate-Hinweis</Link>
          <Link href="/ueber-uns">Über uns</Link>
        </div>
        <div>
          <h3>Kontakt & Rechtliches</h3>
          <Link href="/kontakt">Kontakt</Link>
          <Link href="/impressum">Impressum</Link>
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} Matratzen-Finder</span>
        <span>Klar vergleichen. In Ruhe entscheiden.</span>
      </div>
    </footer>
  );
}
