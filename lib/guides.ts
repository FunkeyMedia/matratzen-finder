export type Guide = {
  slug: string;
  title: string;
  category: string;
  symbol: string;
  readingTime: number;
  intro: string;
  sections: [string, string][];
  checklist: string[];
  sources: [string, string][];
};
export const guides: Guide[] = [
  {
    slug: "haertegrad-h2-h3",
    title: "H2 oder H3: Wie fest möchtest du liegen?",
    category: "Härte & Liegegefühl",
    symbol: "H₂ / H₃",
    readingTime: 4,
    intro:
      "Warum eine Härtegrad-Angabe nur der Anfang deiner Entscheidung ist.",
    sections: [
      [
        "Beginne mit deinem Liegegefühl",
        "Möchtest du eher mittelfest oder fester liegen? Diese Frage hilft bei einer ersten Vorauswahl. Die Kennzeichnung H2 oder H3 allein beschreibt aber nicht, wie sich jede Matratze für dich anfühlt. Sie ist keine persönliche Komfortgarantie. Notiere zuerst, was dir an deiner bisherigen Matratze gefällt und was du verändern möchtest.",
      ],
      [
        "Vergleiche die konkrete Variante",
        "Beachte Größe, Modellbezeichnung und Härtegrad gemeinsam. Innerhalb eines Angebots können mehrere Varianten auswählbar sein. Wenn du auf einen Händlerlink klickst, prüfe vor der Bestellung erneut, welche Ausführung tatsächlich ausgewählt ist. Eine Bewertung zu einer anderen Größe oder Ausführung ist kein Beleg für deine Variante.",
      ],
      [
        "Wendematratze oder fester Härtegrad?",
        "Bei manchen Modellen sind zwei unterschiedliche Seiten beschrieben. Prüfe, ob die Härteangaben zwei Liegeflächen oder verschiedene bestellbare Ausführungen meinen. Das sind unterschiedliche Auswahlentscheidungen. Unser Katalog gibt nur die für die verlinkte Variante recherchierten Härtegrade an.",
      ],
      [
        "So hilft dir der Finder",
        "Wähle H2, H3 oder „nicht sicher“. Bei „nicht sicher“ wird der Härtegrad nicht als erfüllter Wunsch gewertet. Bei einer konkreten Wahl zeigt der Finder passende Angaben und bekannte Abweichungen. Die Prozentzahl bewertet ausschließlich diese Übereinstimmung; sie ist keine Qualitätsnote.",
      ],
      [
        "Vor der Bestellung",
        "Prüfe die Herstellerbeschreibung und die Bedingungen für Probeliegen, Probeschlafen und Rückgabe. Eine pauschale Zuordnung über eine einzige Eigenschaft ersetzt diese Prüfung nicht. Vergleiche Angebote in derselben Größe und entscheide anschließend nach deiner persönlichen Erfahrung.",
      ],
    ],
    checklist: [
      "Gewünschtes Liegegefühl notiert",
      "Härtegrad der verlinkten Variante kontrolliert",
      "Unterschiedliche Seiten oder Ausführungen unterschieden",
      "Rückgabebedingungen gelesen",
    ],
    sources: [["bett1: Zwei Härtegrade", "https://www.bett1.de/haertegrad"]],
  },
  {
    slug: "kaltschaum-oder-taschenfederkern",
    title: "Kaltschaum oder Taschenfederkern?",
    category: "Material & Aufbau",
    symbol: "≈ / ∿",
    readingTime: 4,
    intro: "Zwei Bauarten, viele Varianten. Darauf kommt es beim Vergleich an.",
    sections: [
      [
        "Der Aufbau ist dein Startpunkt",
        "Kaltschaum und Taschenfederkern bezeichnen unterschiedliche Kernaufbauten. Ein Materialname allein beantwortet jedoch nicht die Frage nach dem passenden Liegegefühl. Beziehe auch Höhe, Bezug und Festigkeit der konkreten Matratze in deinen Vergleich ein. So vergleichst du vollständige Modelle statt einzelner Schlagwörter.",
      ],
      [
        "Vergleiche gleiche Größen",
        "Eine 90 × 200 cm große Matratze ist keine Alternative für einen Rahmen, der 140 × 200 cm verlangt. Lege die passende Größe zuerst fest. Erst danach wird der Vergleich von Material und weiteren Eigenschaften sinnvoll. Unser Finder zeigt bei einer konkreten Größenwahl ausschließlich Einträge mit belegten passenden Maßen.",
      ],
      [
        "Was du in der Beschreibung suchen solltest",
        "Achte auf den beschriebenen Kern, die angegebene Gesamthöhe und den Bezug. Begriffe wie „7-Zonen“ sagen zunächst etwas über den beworbenen Aufbau aus; sie sind für sich keine belegte Komfortbewertung. Unterscheide außerdem einen abnehmbaren von einem ausdrücklich waschbaren Bezug.",
      ],
      [
        "Eine Vorauswahl für beide Materialien",
        "Im Katalog kannst du beide Bauarten getrennt filtern. Im Finder kannst du offen für beide bleiben. Wenn du dich für ein Material entscheidest, weist die Ergebnisliste bei anderen Materialien die Abweichung aus. Wir ergänzen keine Eigenschaften, die für die ausgewählte Variante fehlen.",
      ],
      [
        "Das Angebot abschließend prüfen",
        "Vergleiche zwei oder mehr konkrete Modelle nebeneinander. Prüfe Modellversion, Maße und Rückgabebedingungen direkt beim Händler. Eine persönliche Liegeprobe kann dir eine andere Auskunft geben als die Beschreibung allein. Unsere Daten helfen beim Sortieren dieser Informationen.",
      ],
    ],
    checklist: [
      "Passende Größe festgelegt",
      "Kernaufbau und Höhe verglichen",
      "Bezug und Pflegeangaben kontrolliert",
      "Keine Werbeaussage als Testnote gelesen",
    ],
    sources: [
      ["bett1: Matratzenkern", "https://www.bett1.de/qxschaum-matratzenkern"],
    ],
  },
  {
    slug: "matratzengroesse-waehlen",
    title: "Welche Matratzengröße passt in dein Bett?",
    category: "Größe & Bett",
    symbol: "↔",
    readingTime: 3,
    intro:
      "Erst messen, dann auswählen. So vermeidest du einen unpassenden Kauf.",
    sections: [
      [
        "Miss die vorgesehene Liegefläche",
        "Nutze die Innenmaße des Bettrahmens und kontrolliere die Maße deiner Unterfederung. Die Außenmaße des Bettes reichen als Grundlage nicht aus. Schreibe Breite und Länge in Zentimetern auf und gleiche sie mit der Produktvariante ab. Wenn du unsicher bist, prüfe die Angaben des Bettherstellers.",
      ],
      [
        "Eine große oder zwei einzelne Matratzen?",
        "Bei einem Doppelbett steht oft die Frage nach einer durchgehenden oder zwei getrennten Liegeflächen im Raum. Beziehe unterschiedliche Liegewünsche, vorhandene Unterfederungen und die gewünschte Bettaufteilung ein. Bei zwei Einzelmatratzen ist auch die jeweilige Höhe eine sinnvolle Vergleichsangabe.",
      ],
      [
        "Die Größe des Angebots kontrollieren",
        "Ein Produktname kann mehrere Größen zusammenfassen. Kontrolliere deshalb die tatsächlich ausgewählte Ausführung beim Händler. Der auf einer allgemeinen Produktseite genannte Einstiegspreis kann zu einer anderen Größe gehören. Unsere Katalogdaten bezeichnen jeweils die konkret recherchierte Variante.",
      ],
      [
        "Wenn deine Größe noch fehlt",
        "Im Katalog kannst du nach der konkret recherchierten Größe filtern. Eine andere Größe desselben Herstellers ist nicht automatisch für jede Matratze verfügbar. Wenn deine Maße nicht vertreten sind, wähle keinen unpassenden Ersatz. Prüfe die ausgewählte Größe im verlinkten Angebot erneut.",
      ],
    ],
    checklist: [
      "Innenmaße und Unterfederung gemessen",
      "Breite und Länge notiert",
      "Aufteilung bei einem Doppelbett geklärt",
      "Größe beim Händler erneut geprüft",
    ],
    sources: [
      ["bett1: Matratzengrößen", "https://www.bett1.de/matratzengroessen"],
    ],
  },
  {
    slug: "probeschlafen-und-rueckgabe",
    title: "Probeschlafen: Was du vor dem Kauf prüfen solltest",
    category: "Kauf & Rückgabe",
    symbol: "☾",
    readingTime: 3,
    intro:
      "Ein Probeschlaf-Angebot ist nur so hilfreich wie seine konkreten Bedingungen.",
    sections: [
      [
        "Lies die Bedingungen des tatsächlichen Verkäufers",
        "Nicht jede Matratze und nicht jeder Händler bietet dieselben Bedingungen an. Prüfe, wer dein Vertragspartner ist und welche Vereinbarung für die ausgewählte Ausführung gilt. Eine Angabe auf einer Herstellerseite gilt nicht automatisch für ein Angebot eines anderen Verkäufers.",
      ],
      [
        "Stelle diese Fragen vor der Bestellung",
        "Wie lange darfst du probeschlafen? Gibt es eine Mindestdauer? In welchem Zustand kann die Matratze zurückgegeben werden? Wer organisiert Abholung oder Rückversand? Fallen Kosten an? Halte die Antworten für dein konkretes Angebot fest, bevor du kaufst.",
      ],
      [
        "Prüfe den Ablauf einer Rückgabe",
        "Eine Frist allein beantwortet nicht, wie du die Rückgabe anmeldest oder wie eine große Matratze transportiert wird. Lies den beschriebenen Ablauf und prüfe, ob du ihn praktisch nutzen kannst. Bewahre die zum Kauf gehörenden Bedingungen und deine Bestellunterlagen auf.",
      ],
      [
        "Unser Finder und dein Kauf",
        "Der Matratzen-Finder vermittelt eine Vorauswahl, verkauft aber keine Matratzen. Die Kauf- und Rückgabebedingungen stammen vom verlinkten Händler. Für Amazon-Angebote solltest du die ausgewählte Größe, den Verkäufer und die aktuellen Bedingungen direkt im Angebot kontrollieren.",
      ],
    ],
    checklist: [
      "Tatsächlichen Verkäufer identifiziert",
      "Frist und Bedingungen gelesen",
      "Abholung oder Rückversand geklärt",
      "Eventuelle Rückgabekosten geprüft",
    ],
    sources: [
      [
        "bett1: Probeschlafen als Beispiel eines Händlerangebots",
        "https://www.bett1.de/probeschlafen",
      ],
    ],
  },
  {
    slug: "bezug-und-pflege",
    title: "Abnehmbar oder waschbar? Den Bezug richtig einordnen",
    category: "Bezug & Pflege",
    symbol: "◌",
    readingTime: 3,
    intro: "Welche Angaben du beim Matratzenbezug auseinanderhalten solltest.",
    sections: [
      [
        "Abnehmbar bedeutet nicht automatisch waschbar",
        "Ein abnehmbarer Bezug und ein ausdrücklich waschbarer Bezug sind unterschiedliche Angaben. Prüfe die Pflegebeschreibung deiner konkreten Matratze. Leite eine Waschtemperatur oder eine Trocknereignung nicht aus einem Reißverschluss oder einer allgemeinen Produktbezeichnung ab.",
      ],
      [
        "Die Pflegeanleitung gehört zum Vergleich",
        "Suche nach Informationen zur Abnahme des Bezugs, zur Reinigung und zur Wiederverwendung. Wenn es Teilstücke gibt, prüfe deren Handhabung. Angaben zu Waschmaschine und Trockner solltest du der tatsächlichen Pflegeanleitung entnehmen. Fehlt eine Angabe, frage beim Händler oder Hersteller nach.",
      ],
      [
        "Bezug und Auflage erfüllen unterschiedliche Aufgaben",
        "Ein Matratzenschoner oder eine Auflage ist ein zusätzliches Zubehörprodukt. Prüfe Material, Befestigung, Maße und Pflege getrennt vom Matratzenbezug. Eine Auflage macht eine ansonsten unpassende Matratze nicht automatisch zur richtigen Auswahl.",
      ],
      [
        "Was die Pflege-Priorität im Finder bedeutet",
        "Die Option zur Pflege berücksichtigt in unserem aktuellen Datenbestand einen als abnehmbar oder waschbar beschriebenen Bezug. Sie verspricht keine bestimmte Waschtemperatur. Lies im Ergebnis, welche Eigenschaft tatsächlich dokumentiert ist, und prüfe die Pflegeanleitung vor dem Kauf.",
      ],
    ],
    checklist: [
      "Abnehmbar und waschbar unterschieden",
      "Pflegeanleitung der Variante gelesen",
      "Keine Temperatur oder Trocknereignung vermutet",
      "Maße einer zusätzlichen Auflage geprüft",
    ],
    sources: [
      ["bett1: Matratzenbezug", "https://www.bett1.de/hybreeze-funktionsbezug"],
    ],
  },
  {
    slug: "matratzen-vergleichen",
    title: "Matratzen vergleichen, ohne den Überblick zu verlieren",
    category: "Deine Kaufentscheidung",
    symbol: "≠",
    readingTime: 4,
    intro:
      "Eine kurze Liste guter Fragen hilft mehr als eine lange Liste offener Tabs.",
    sections: [
      [
        "Lege deine Muss-Kriterien fest",
        "Die benötigte Größe ist ein guter Anfang. Ergänze anschließend dein gewünschtes Liegegefühl und gegebenenfalls ein bevorzugtes Material. Halte besondere Wünsche wie die Höhe oder einen abnehmbaren Bezug getrennt fest. So erkennst du, welche Eigenschaft unverzichtbar und welche nur angenehm wäre.",
      ],
      [
        "Vergleiche konkrete Varianten nebeneinander",
        "Wähle im Katalog oder im Vergleich zwei bis vier Modelle aus. Achte auf Maße, Kernaufbau, Härte und Höhe. Eine fehlende Angabe bleibt eine offene Frage. Sie sollte nicht als positiver oder negativer Messwert interpretiert werden.",
      ],
      [
        "Nutze Live-Preise mit Augenmaß",
        "Unsere Seite zeigt Preise ausschließlich nach einem erfolgreichen Amazon-Abruf. Ohne aktuelle Angebotsdaten steht dort „Preis bei Amazon prüfen“. Kontrolliere zusätzlich Größe, Verkäufer, Lieferkosten und Lieferbarkeit beim Händler. Ausschlaggebend ist das Angebot zum Zeitpunkt deines Kaufs.",
      ],
      [
        "Verstehe unseren Kriterienwert",
        "Der Finder gewichtet Größe, Härte, Material und einen gewählten Zusatzwunsch. Unbekannte Eigenschaften erhalten keine Punkte, bekannte Abweichungen werden benannt. Der Wert bewertet keine Haltbarkeit und keinen persönlichen Komfort. Wenn du keine konkreten Kriterien auswählst, zeigen wir keinen Prozentwert.",
      ],
      [
        "Entscheide mit einer überschaubaren Vorauswahl",
        "Prüfe die offenen Fragen der zwei oder drei interessantesten Varianten. Lies die Kauf- und Rückgabebedingungen und nutze nach Möglichkeit eine persönliche Liegeprobe. Der Kriterienvergleich hilft dir, die Auswahl nachvollziehbar einzugrenzen; deine Erfahrung bleibt ein eigener Schritt.",
      ],
    ],
    checklist: [
      "Muss-Kriterien und Wünsche getrennt",
      "Gleiche Größen und Varianten verglichen",
      "Offene Angaben beim Händler geprüft",
      "Preis und Rückgabebedingungen kontrolliert",
    ],
    sources: [["Unsere Auswahlmethode", "/methode"]],
  },
];
