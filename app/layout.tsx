import type { Metadata } from "next";
import { Header, Footer } from "@/components/Brand";
import "./globals.css";
import { siteUrl } from "@/lib/site";
const site = siteUrl;
export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "Matratzen-Finder – Deine Matratze. Dein Liegegefühl.",
    template: "%s | Matratzen-Finder",
  },
  description:
    "Finde Matratzen nach Größe, Härtegrad und Material. Verständliche Kriterien, transparente Empfehlungen und klar gekennzeichnete Amazon-Partnerlinks.",
  openGraph: { type: "website", locale: "de_DE", siteName: "Matratzen-Finder" },
  robots: { index: false, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <a className="skip-link" href="#main">
          Zum Inhalt springen
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
