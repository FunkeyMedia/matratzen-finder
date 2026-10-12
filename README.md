# Matratzen-Finder

Deutschsprachige Affiliate-Kaufberatung mit Next.js, einem regelbasierten Finder und serverseitigen Amazon-Creators-Angebotsdaten.

## Aktueller Bestand – 12. Oktober 2026

**200 Matratzenfamilien und 50 Zubehörmodelle.** Für jeden veröffentlichten Eintrag wurden die konkret verlinkte ASIN und die Modellinformationen per Creators API GetItems bestätigt. 1.465 Suchkandidaten wurden gesichtet; 468 ASINs wurden zusätzlich einzeln über GetItems abgeglichen. Reine Größen-/Härtevarianten werden über Parent-ASIN und normalisierte Modellidentität zusammengeführt. Der veröffentlichte Bestand enthält 250 eindeutige ASINs, Slugs und Modellschlüssel.

Zubehör: zwölf Topper, neun Nackenstützkissen, drei Kopfkissen, zehn Lattenroste, acht Matratzenschoner, fünf Matratzenbezüge und drei Auflagen. Der Bestand umfasst 128 Marken.

Jede Karte bezeichnet eine konkrete Ausführung, keine vollständige Liste aller Größen einer Familie. Unbelegte Höhe oder Härte bleibt unbekannt. Die Liefer-/Verpackungsmaße werden nicht als Liegehöhe übernommen. Bekannte widersprüchliche Größen sowie Kinder-, Haustier-, Wasser- und Luftbettprodukte wurden ausgeschlossen. Die beiden BODYGUARD-Einträge sind zusätzlich mit den offiziellen bett1-Produktseiten abgeglichen; die Boxspring-Version ist eine Schaum-Matratze. Testnoten und Gesundheitsversprechen werden nicht als eigene Bewertungen verwendet.

## Repository und Veröffentlichung

- GitHub: https://github.com/FunkeyMedia/matratzen-finder
- Vercel: Team `funkey1`, bestehendes Projekt `matratzen-finder`
- Öffentliche Adresse: https://matratzen-finder.vercel.app
- Production-Zweig: `main`, native Git-Integration

## Katalog und Finder

Suche, Marke, Material, Größe, Härte und Produktart filtern den **gesamten** Bestand vor der Seiteneinteilung. Es werden höchstens 18 Karten pro Seite angezeigt. Für die sichtbaren ASINs werden nur die benötigten, stabilen Gruppen von höchstens zehn ASINs geladen; beim Blättern und Filtern lädt die Oberfläche fehlende Angebote nach. Vergleichsauswahlen bleiben beim Blättern erhalten. Der direkte Vergleich verfügt über eine Modellsuche.

Der Finder berücksichtigt acht gängige Bettgrößen sowie die im Katalog belegten Größen in der Datenvalidierung, H2–H5 und mehrere Schaum-/Federkernmaterialien. Größe zählt 35, Härte 30, Material 25 und eine gewählte Zusatzpriorität 10 Punkte. Der Kriterienwert ist keine Qualitäts- oder Komfortnote. Unbekannte Felder erhalten keine Punkte; bekannte Abweichungen werden benannt.

## Amazon-Anbindung

`AMAZON_GATEWAY_SECRET` und `AMAZON_GATEWAY_URL` verbinden das Projekt mit dem vorhandenen Boxershorts-Finder-Gateway. Amazon-Credentials verbleiben im Gateway-Projekt. Alle Zugangsdaten sind serverseitig. Die öffentliche Angebots-API akzeptiert nur Katalog-ASINs und höchstens 20 Auswahlwerte.

Live-Titel, Bilder, EUR-Preise und Verfügbarkeit stammen ausschließlich aus einem erfolgreichen Creators-Abruf. Angebotstimestamps werden server- und browserseitig in Europe/Berlin angezeigt. Daten werden bis zu 30 Minuten im gemeinsamen Next.js-Datencache zwischengespeichert. Überlappende Seiten nutzen dieselben Gruppen; vorübergehende 429-/5xx-Antworten werden mit begrenztem Backoff erneut angefragt. Bei fehlenden Angeboten bleibt der Preis leer und die Seite verweist auf die Händlerprüfung. Preise und Bild-URLs sind nicht im Quellkatalog gespeichert.

Der Recherchezugang war zeitlich begrenzt und authentifiziert; seine Route wird aus der Veröffentlichung entfernt und das separate Secret nach dem Import gelöscht.

## Lokal prüfen

Node 24+, `npm ci`, `npm test`, `npm run build`, `npm run typecheck`. `npm run dev` startet die Entwicklungsvorschau. `.env.local` bleibt privat.

Die Tests prüfen Ranking, genaue Größen, gespeicherte Antworten, Händlerzuordnung, Filter über Seitengrenzen, Seiteneinteilung, Vergleichsauswahl, eindeutige Modellfamilien, Faktenfelder und stabile Datumsdarstellung einschließlich Sommer-/Winterzeit. Vor Abschluss werden Production-Build und öffentliche Browser-/API-Prüfung separat bestätigt.

## Grenzen

Keine eigenen Liege- oder Labortests. API- und Händlerangaben können sich ändern. Die Datenprüfung ist keine juristische Prüfung der bestehenden Betreiber- und Datenschutzinformationen. Partnerlinks beweisen weder Käufe noch Provisionen.
