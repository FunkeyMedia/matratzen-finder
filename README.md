# Matratzen-Finder

Deutschsprachiger Matratzen-Finder mit Next.js App Router, TypeScript, regelbasiertem Ranking und serverseitiger Amazon Creators API.

## Repository und Hosting

- GitHub: https://github.com/FunkeyMedia/matratzen-finder
- Vercel-Projekt: https://vercel.com/funkey1/matratzen-finder
- Production-Branch: `main` über die native Git-Integration

## Status

Der Katalog enthält derzeit **vier recherchierte Matratzen und zwei Zubehörprodukte**. Das beauftragte Ziel von 200 + 50 eigenständigen, verifizierten Produkten ist nicht erreicht. API-Zugangsdaten wurden nicht bereitgestellt; aktuelle Produktbilder und Preise können daher noch nicht angezeigt oder geprüft werden. Die Website bleibt bewusst `noindex` und darf nicht als fertig recherchiertes Angebot beworben werden.

## Lokal starten

Node 24 und pnpm 11: `pnpm install`, `pnpm dev`, `pnpm build`.

Kopiere `.env.example` nach `.env.local` und trage die Amazon Creators API Zugangsdaten ein. Diese Datei bleibt durch `.gitignore` privat. Die Partner-ID `onlinestarkei-21` liegt in `lib/products.ts` für Links und in `lib/amazon.ts` für API-Abfragen. Auf Vercel müssen `AMAZON_CREDENTIAL_ID` und `AMAZON_CREDENTIAL_SECRET` als geschützte Umgebungsvariablen gesetzt werden.

## Produktmodell und Recherche

`lib/products.ts` enthält eindeutige ASINs, kurze redaktionelle Namen, belegte Merkmale, Quelle und Prüfdatum. Neue Produkte dürfen erst nach Prüfung der ASIN, Varianten und Merkmale ergänzt werden. Die Produktkategorie bestimmt Finder oder Zubehör. Reine Größenvarianten zählen nicht als neue Modelle. Das Importziel beträgt mindestens 200 Matratzen und 50 Zubehörmodelle.

`lib/amazon.ts` fragt für sichtbar benötigte ASINs die Creators API ab. Es nutzt maximal 10 ASINs je GetItems-Anfrage, drosselt Aufrufe und hält eine 30-Minuten-Servercache. Bei fehlendem oder gescheitertem API-Abruf erscheinen weder alte Preise noch fremde Bilder. Produktbild-URLs werden nicht dauerhaft gespeichert.

## Finder

`lib/ranking.ts` ist unabhängig von der Oberfläche. Größe zählt 35, Härtegrad 30, Material 25 und eine zusätzliche Priorität 10 Punkte. Unbekannte Merkmale erhalten keine Punkte. Der Finder speichert Antworten lokal im Browser. Es werden nur Kandidaten mit belegter gewünschter Größe angezeigt.

## Vor Veröffentlichung

- Amazon-Zugangsdaten sicher einrichten und Abrufe für Matratzen sowie Zubehör prüfen.
- 200 eigenständige Matratzen und 50 Zubehörmodelle verifizieren, Dubletten entfernen.
- Betreiberangaben aus dem bestehenden Impressum bestätigen und Datenschutztext rechtlich prüfen.
- Mobilansicht, Tastaturbedienung, Finder, Vergleich und Amazon-Links im Browser testen.
- Erst dann `robots.ts` und das `noindex`-Flag in `layout.tsx` freigeben.
- GitHub-Repository über die native Vercel-Git-Integration verbinden und einen Production-Build nach Push auf `main` verifizieren.

Keine Amazon-Zugangsdaten, Preis-Snapshots oder heruntergeladenen Amazon-Bilder committen.
