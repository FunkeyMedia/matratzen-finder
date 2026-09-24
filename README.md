# Matratzen-Finder

Deutschsprachiger Matratzen-Finder mit Next.js App Router, TypeScript, regelbasiertem Ranking und serverseitiger Amazon Creators API.

## Repository und Hosting

- GitHub: https://github.com/FunkeyMedia/matratzen-finder
- Vercel-Projekt: https://vercel.com/funkey1/matratzen-finder
- Production-Branch: `main` über die native Git-Integration

## Status

Der Katalog enthält derzeit **vier recherchierte Matratzen und zwei Zubehörprodukte**. Das beauftragte Ziel von 200 + 50 eigenständigen, verifizierten Produkten ist nicht erreicht. Ein nutzbarer API- oder Gateway-Zugang ist noch nicht eingerichtet; aktuelle Produktbilder und Preise können daher noch nicht angezeigt oder geprüft werden. Die Website bleibt bewusst `noindex` und darf nicht als fertig recherchiertes Angebot beworben werden.

## Lokal starten

Node 24 und pnpm 11: `pnpm install`, `pnpm dev`, `pnpm build`.

Optional kann der bereits vorhandene Boxershorts-Finder-Katalog-Gateway über `AMAZON_GATEWAY_SECRET` und `AMAZON_GATEWAY_URL` genutzt werden. Der Gateway-Zugang muss serverseitig in beiden Projekten ausdrücklich freigegeben sein; die Amazon-Credentials bleiben im Gateway-Projekt. Alternativ für eine unabhängige Anbindung im Amazon PartnerNet unter **Tools → Creators API** eine eigene Anwendung „Matratzen-Finder“ und ein neues Credential erzeugen. Die Kontoinhaberin oder der Kontoinhaber setzt `AMAZON_CREDENTIAL_ID` und `AMAZON_CREDENTIAL_SECRET` direkt als geschützte Production-Umgebungsvariablen im Vercel-Projekt `matratzen-finder` und löst danach ein neues Deployment aus. Zugangsdaten nicht in Chat, GitHub oder Website-Formulare kopieren. Für lokale Entwicklung `.env.example` nach `.env.local` kopieren; `.gitignore` hält diese Datei privat. Die Partner-ID `onlinestarkei-21` liegt in `lib/products.ts` für Links und in `lib/amazon.ts` für API-Abfragen.

## Produktmodell und Recherche

`lib/products.ts` enthält eindeutige ASINs, kurze redaktionelle Namen, belegte Merkmale, Quelle und Prüfdatum. Neue Produkte dürfen erst nach Prüfung der ASIN, Varianten und Merkmale ergänzt werden. Die Produktkategorie bestimmt Finder oder Zubehör. Reine Größenvarianten zählen nicht als neue Modelle. Das Importziel beträgt mindestens 200 Matratzen und 50 Zubehörmodelle.

Der Katalog teilt größere Bestände in Seiten mit jeweils höchstens 18 Karten. Für die sichtbare Seite werden die Amazon-Daten vor dem Ausliefern geladen. `lib/amazon.ts` fragt für sichtbar benötigte ASINs die Creators API ab. Es nutzt maximal 10 ASINs je GetItems-Anfrage, drosselt Aufrufe und hält eine 30-Minuten-Servercache. Amazon-Bild, Produkttitel, Merkmale und Preis stammen dann aus derselben Antwort; der Abrufzeitpunkt erscheint am Preis. Bei fehlendem oder gescheitertem API-Abruf erscheinen weder alte Preise noch fremde Bilder. Produktbild-URLs werden nicht dauerhaft gespeichert.

## Finder

`lib/ranking.ts` ist unabhängig von der Oberfläche. Größe zählt 35, Härtegrad 30, Material 25 und eine zusätzliche Priorität 10 Punkte. Unbekannte Merkmale erhalten keine Punkte. Der Finder speichert Antworten lokal im Browser. Es werden nur Kandidaten mit belegter gewünschter Größe angezeigt.

## Vor Veröffentlichung

- Amazon-Zugangsdaten sicher einrichten und Abrufe für Matratzen sowie Zubehör prüfen.
- 200 eigenständige Matratzen und 50 Zubehörmodelle verifizieren, Dubletten entfernen.
- Datenschutztext und rechtliche Inhalte vor breiter Veröffentlichung fachlich prüfen.
- Mobilansicht, Tastaturbedienung, Finder, Vergleich und Amazon-Links im Browser testen.
- Erst dann `robots.ts` und das `noindex`-Flag in `layout.tsx` freigeben.
- Nach neuen Zugangsdaten einen erfolgreichen Creators-API-Abruf für beide Kategorien und den anschließenden Production-Build prüfen. Die native Git-Integration ist bereits eingerichtet und ein Push auf `main` wurde erfolgreich als Production-Deployment verifiziert.

Keine Amazon-Zugangsdaten, Preis-Snapshots oder heruntergeladenen Amazon-Bilder committen.
