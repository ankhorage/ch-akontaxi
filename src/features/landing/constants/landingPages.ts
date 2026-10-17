import type { LandingPageDetails } from '../../../types/landing';

/*** Own canonical, factual service-page copy for paid and organic visitors. */
export const LANDING_PAGES = [
  {
    "slug": "taxi-wetzikon",
    "label": "Taxi Wetzikon",
    "title": "Taxi in Wetzikon anfragen",
    "description": "Taxi in Wetzikon telefonisch anfragen: AKON TAXI erreichen, Abholort und Fahrziel besprechen und Verfügbarkeit klären.",
    "eyebrow": "Lokal unterwegs",
    "heading": "Ihr Taxi in Wetzikon anfragen.",
    "intro": "Ob Fahrt innerhalb von Wetzikon oder Abholung für eine Weiterfahrt: Nennen Sie telefonisch den gewünschten Abholort, das Ziel und den Zeitpunkt. AKON TAXI klärt mit Ihnen, ob die Fahrt möglich ist.",
    "items": [
      [
        "Abholort nennen",
        "Geben Sie Strasse, Hausnummer oder einen eindeutig erkennbaren Treffpunkt an."
      ],
      [
        "Fahrziel angeben",
        "Nennen Sie die Zieladresse, damit die gewünschte Fahrt konkret besprochen werden kann."
      ],
      [
        "Zeit abstimmen",
        "Teilen Sie die gewünschte Abholzeit mit und lassen Sie sich die Verfügbarkeit bestätigen."
      ]
    ],
    "note": "Eine Anfrage ist noch keine bestätigte Buchung. Bitte vereinbaren Sie den konkreten Treffpunkt und Zeitpunkt direkt telefonisch."
  },
  {
    "slug": "flughafentransfer",
    "label": "Flughafentransfer",
    "title": "Flughafentransfer Zürich anfragen",
    "description": "Transfer von Wetzikon zum Flughafen Zürich telefonisch anfragen. Fahrzeit, Abholort, Reisende und Gepäck vorab besprechen.",
    "eyebrow": "Reiseplanung",
    "heading": "Zum Flughafen Zürich fahren.",
    "intro": "Für Fahrten zum Flughafen Zürich können Sie bei AKON TAXI telefonisch anfragen. Teilen Sie Abholort, gewünschte Ankunftszeit am Flughafen und Ihre Reisedaten mit, damit die Fahrt realistisch geplant werden kann.",
    "items": [
      [
        "Abflug und Zeitfenster",
        "Geben Sie Abflugdatum, ungefähre Check-in-Zeit und Ihre gewünschte Ankunft am Flughafen an."
      ],
      [
        "Abholung planen",
        "Nennen Sie die genaue Abholadresse in Wetzikon oder Ihrer Region."
      ],
      [
        "Personen und Gepäck",
        "Erwähnen Sie Anzahl Fahrgäste und grössere Gepäckstücke bereits bei der Anfrage."
      ]
    ],
    "note": "Die Verfügbarkeit und den Preis für Ihren Flughafentransfer erhalten Sie ausschliesslich nach telefonischer Rücksprache."
  },
  {
    "slug": "bahnhoftransfer",
    "label": "Bahnhoftransfer",
    "title": "Taxi Bahnhof Wetzikon anfragen",
    "description": "Taxi für eine Abholung am Bahnhof Wetzikon oder eine Fahrt dorthin telefonisch anfragen und Treffpunkt abstimmen.",
    "eyebrow": "Bahnhof Wetzikon",
    "heading": "Zum Bahnhof oder vom Bahnhof.",
    "intro": "Wer mit dem Zug ankommt oder zum Bahnhof Wetzikon fahren möchte, kann die gewünschte Taxifahrt direkt telefonisch anfragen. Ein klar vereinbarter Treffpunkt hilft bei der Abholung.",
    "items": [
      [
        "Richtung der Fahrt",
        "Erklären Sie, ob Sie am Bahnhof abgeholt werden oder dorthin fahren möchten."
      ],
      [
        "Ankunftszeit nennen",
        "Teilen Sie bei Zugankunft die geplante Uhrzeit und gegebenenfalls die Zugverbindung mit."
      ],
      [
        "Treffpunkt abstimmen",
        "Vereinbaren Sie telefonisch eine genaue Abholstelle und nennen Sie bei Bedarf Gepäck."
      ]
    ],
    "note": "Abholort, Wartezeit und Verfügbarkeit bitte vorab telefonisch bestätigen lassen."
  },
  {
    "slug": "fahrgebiet",
    "label": "Fahrgebiet",
    "title": "Taxi im Zürcher Oberland anfragen",
    "description": "Taxifahrten in Wetzikon und Umgebung anfragen: Hinwil, Pfäffikon ZH, Gossau ZH, Oetwil am See und Hombrechtikon.",
    "eyebrow": "Region",
    "heading": "Wetzikon und das Zürcher Oberland.",
    "intro": "AKON TAXI ist in Wetzikon ansässig und nimmt Anfragen für Fahrten in der Region entgegen. Die möglichen Abhol- und Zielorte stimmen Sie direkt mit dem Fahrer ab.",
    "items": [
      [
        "Wetzikon und Hinwil",
        "Fragen Sie eine Fahrt mit Abholung oder Ziel in Wetzikon und Hinwil telefonisch an."
      ],
      [
        "Pfäffikon ZH und Gossau ZH",
        "Besprechen Sie Fahrten mit diesen Ortschaften als Start- oder Zielpunkt."
      ],
      [
        "Hombrechtikon und Oetwil am See",
        "Auch für diese Orte können Sie eine individuelle Fahrt anfragen."
      ]
    ],
    "note": "Die genannten Orte sind Anfrageregionen, keine Garantie für jederzeit verfügbare Abholungen. Andere Ziele sind nach Absprache möglich."
  },
  {
    "slug": "preise",
    "label": "Preis anfragen",
    "title": "Taxipreise telefonisch anfragen",
    "description": "Preis für eine Taxifahrt ab oder nach Wetzikon direkt bei AKON TAXI anfragen. Strecke, Zeitpunkt und Fahrgäste besprechen.",
    "eyebrow": "Fahrtkosten",
    "heading": "Vor der Fahrt den Preis klären.",
    "intro": "Ein konkreter Fahrtpreis hängt unter anderem von Strecke, Zeitpunkt und Fahrtanforderungen ab. Deshalb nennt diese Seite bewusst keine pauschalen Tarife, die für Ihre Fahrt möglicherweise nicht gelten.",
    "items": [
      [
        "Strecke beschreiben",
        "Nennen Sie Startadresse und Zielort möglichst genau."
      ],
      [
        "Zeitpunkt mitteilen",
        "Geben Sie gewünschte Uhrzeit und Datum an, auch bei Flughafenfahrten."
      ],
      [
        "Details ergänzen",
        "Weisen Sie auf mehrere Fahrgäste, viel Gepäck oder besondere Wünsche hin."
      ]
    ],
    "note": "Fragen Sie den voraussichtlichen Preis und die Verfügbarkeit ausdrücklich am Telefon an, bevor Sie die Fahrt vereinbaren."
  },
  {
    "slug": "kontakt",
    "label": "Kontakt",
    "title": "AKON TAXI Wetzikon kontaktieren",
    "description": "AKON TAXI Wetzikon direkt unter 077 236 60 68 telefonisch erreichen und Taxifahrt anfragen.",
    "eyebrow": "Direkt erreichbar",
    "heading": "AKON TAXI direkt kontaktieren.",
    "intro": "Die Kontaktaufnahme läuft bei AKON TAXI direkt über das Telefon. So lassen sich Abholort, Fahrziel, Zeitpunkt und offene Fragen in einem Gespräch klären.",
    "items": [
      [
        "Telefonnummer",
        "Rufen Sie 077 236 60 68 an. Mobil genügt ein Tippen auf den Anruf-Button."
      ],
      [
        "Fahrt beschreiben",
        "Teilen Sie Abholort, Ziel, Wunschzeit und gegebenenfalls Gepäck mit."
      ],
      [
        "Bestätigung erhalten",
        "Vereinbaren Sie Abholstelle und Bedingungen unmittelbar mit dem Fahrer."
      ]
    ],
    "note": "Bitte beachten Sie: Ein Klick auf den Anruf-Button oder ein nicht beantworteter Anruf bestätigt keine Buchung."
  }
] as const satisfies readonly LandingPageDetails[];
