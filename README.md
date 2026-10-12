# Matratzen-Finder

Deutschsprachiger Matratzen-Finder mit Next.js App Router, TypeScript, regelbasiertem Ranking und serverseitiger Amazon Creators API.

## Repository und Hosting

- GitHub: https://github.com/FunkeyMedia/matratzen-finder
- Vercel-Projekt: https://vercel.com/funkey1/matratzen-finder
- Production-Branch: `main` über die native Git-Integration

## Status

Der aktuelle Katalog enthält **vier recherchierte Matratzen und zwei Zubehörprodukte**. Die Amazon-Anbindung läuft über den vorhandenen Boxershorts-Finder-Gateway mit einem eigenen, nur für diesen Aufrufer angelegten Secret. Alle sechs Produkte wurden am 12. Oktober 2026 über die Creators API mit aktuellem Titel und Bild verifiziert. Fünf Produkte liefern einen EUR-Preis; Emma One ist laut Amazon derzeit nicht verfügbar und liefert deshalb keinen Preis. Der nicht mehr abrufbare smartsleep-Eintrag wurde durch das belegte BLACKROLL Recovery Pillow ersetzt; die bisherige Produkt-URL wird dauerhaft auf den neuen Eintrag weitergeleitet. Preise und Bild-URLs werden nicht in Git gespeichert.

Die öffentliche Veröffentlichung im bestehenden Vercel-Projekt und die Suchmaschinenfreigabe wurden am 12. Oktober ausdrücklich beauftragt. Ein früheres Ziel von 200 Matratzen und 50 Zubehörmodellen bleibt eine künftige Katalogerweiterung; der aktuelle Umfang wird auf der Website offen genannt.

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
- Erweiterungen des Katalogs erst nach Prüfung von Modellidentität und Variante veröffentlichen.
- Datenschutztext und rechtliche Inhalte vor breiter Veröffentlichung fachlich prüfen.
- Mobilansicht, Tastaturbedienung, Finder, Vergleich und Amazon-Links im Browser testen.
- Erst dann `robots.ts` und das `noindex`-Flag in `layout.tsx` freigeben.
- Nach neuen Zugangsdaten einen erfolgreichen Creators-API-Abruf für beide Kategorien und den anschließenden Production-Build prüfen. Die native Git-Integration ist bereits eingerichtet und ein Push auf `main` wurde erfolgreich als Production-Deployment verifiziert.

Keine Amazon-Zugangsdaten, Preis-Snapshots oder heruntergeladenen Amazon-Bilder committen.

## Lokale Abnahme 08.10.2026

Die sechs vorhandenen ASIN-Ziele wurden direkt im Browser gelesen. Traumnacht B01N6QMZED führt aktuell zur Basic-Variante (140 × 200 cm, H3, 16 cm), nicht zur zuvor benannten Premium-Variante. Der bestehende Slug bleibt für URL-Kontinuität erhalten. Händlerangaben sind keine eigenen Tests.

Der Finder weist bekannte Abweichungen aus, vergibt ohne Kriterien keinen Prozentwert, validiert gespeicherte Antworten und leert Vergleichsauswahlen bei neuen Antworten. `npm test` prüft Ranking und Händlerzuordnung. Ein npm-Lockfile ermöglicht alternativ `npm ci`, `npm run build` und `npm run typecheck` mit Node 24.

Next.js wurde lokal auf 16.3.8 aktualisiert. Keine Indexfreigabe oder Veröffentlichung. Die separate offene PR #1 für den vorhandenen Creators-Gateway bleibt eigenständig; die Gateway-Verbindung und die Erweiterung auf 200 + 50 Produkte sind weiterhin offen.

## Affiliate-Aufbau 12.10.2026

Die bestehende Anwendung wurde auf dem Production-Commit `96e2d4e` lokal weiterentwickelt. Die Referenz bett1.de dient als Orientierung für eine klare Produktführung; Texte, Kennzeichen und Illustration sind eigenständig.

- Neue responsive Startseite mit Materialeinstiegen, Produktauswahl, Finder, Ratgeber, FAQ und Affiliate-Hinweis.
- Katalogfilter nach Suche, Material, Größe und Härte; Auswahl von bis zu vier Produkten für einen direkten Vergleich.
- Vergleich ist auch ohne vorherigen Finder nutzbar. Keine zusätzliche Speicherung der Auswahl.
- Sechs eigenständige Ratgeber mit Inhaltsverzeichnis, Checkliste, Quellen und internen Links.
- Canonicals, Ratgeber- und Produkt-JSON-LD, erweiterte Sitemap; keine erfundenen Bewertungen oder Preise.
- Vier Matratzen und zwei Zubehörprodukte bleiben die verifizierte Datenbasis. Keine neuen Produkte oder Partnerprogramme erfunden.

`npm test` prüft Ranking, genaue Größen, ungültige gespeicherte Antworten, Händlerzuordnung, Filter und Vergleichsauswahl. Build und Browserprüfung sind vor Freigabe separat nachzuweisen. `noindex` und robots-Sperre bleiben aktiv. Kein Push oder Deployment ist Bestandteil dieses lokalen Aufbaus. Die vorhandenen Betreiber- und Datenschutzhinweise wurden inhaltlich nicht neu freigegeben.

## Amazon-Anbindung und Veröffentlichung 12.10.2026

- Eigenen geschützten Gateway-Zugang in beiden vorhandenen Vercel-Projekten eingerichtet. Amazon-Credentials bleiben ausschließlich im Gateway-Projekt.
- Der Gateway wurde vom exakt bestehenden Production-Commit `5677ea2` neu bereitgestellt, um die neue Konfiguration zu laden. Kein Gateway-Quellcode und keine anderen Zugänge geändert.
- Alle vier Matratzen und beide Zubehörprodukte über die Anbindung inklusive Titel, Bild, Verfügbarkeit und Abrufzeitpunkt verifiziert. Für fünf Produkte ist ein EUR-Preis vorhanden; beim derzeit nicht verfügbaren Emma-Modell bleibt der Preis bewusst leer. Nicht erlaubte ASINs werden von der öffentlichen API ausgeschlossen.
- Öffentliche Basisadresse: `https://matratzen-finder.vercel.app`. Die Indexierung ist freigegeben; robots.txt nennt die Sitemap und sperrt den API-Pfad.
- Vorschauen und generierte Deployment-Adressen sollen weiterhin Vercel-geschützt bleiben; die stabile Production-Adresse wird öffentlich freigegeben.
- Der bestehende Inhalt der Betreiber- und Datenschutzhinweise bleibt erhalten. Eine technische Prüfung ersetzt keine gesonderte juristische Prüfung.
