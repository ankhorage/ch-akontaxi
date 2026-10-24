import { BUSINESS } from '../../../constants/business';
import type { LandingPageDetails } from '../../../types/landing';

/*** Own canonical, factual service-page copy for paid and organic visitors. */
export const LANDING_PAGES = [
  {
    slug: 'taxi-wetzikon',
    label: 'Taxi Wetzikon',
    title: 'Taxi in Wetzikon anfragen',
    description:
      'Taxi in Wetzikon telefonisch anfragen: AKON TAXI erreichen, Abholort und Fahrziel besprechen und Verfügbarkeit klären.',
    eyebrow: 'Lokal unterwegs',
    heading: 'Ihr Taxi in Wetzikon anfragen.',
    intro:
      'Ob Fahrt innerhalb von Wetzikon oder Abholung für eine Weiterfahrt: Nennen Sie telefonisch den gewünschten Abholort, das Ziel und den Zeitpunkt. AKON TAXI klärt mit Ihnen, ob die Fahrt möglich ist.',
    items: [
      [
        'Abholort nennen',
        'Geben Sie Strasse, Hausnummer oder einen eindeutig erkennbaren Treffpunkt an.',
      ],
      [
        'Fahrziel angeben',
        'Nennen Sie die Zieladresse, damit die gewünschte Fahrt konkret besprochen werden kann.',
      ],
      [
        'Zeit abstimmen',
        'Teilen Sie die gewünschte Abholzeit mit und lassen Sie sich die Verfügbarkeit bestätigen.',
      ],
    ],
    note: 'Eine Anfrage ist noch keine bestätigte Buchung. Bitte vereinbaren Sie den konkreten Treffpunkt und Zeitpunkt direkt telefonisch.',
  },
  {
    slug: 'flughafentransfer',
    label: 'Flughafentransfer',
    title: `Flughafentaxi Wetzikon – ${BUSINESS.airportFare.display} Fixpreis`,
    description: `Von ${BUSINESS.airportFare.origin} zum Flughafen Zürich: ${BUSINESS.airportFare.display} Fixpreis pro einfache Fahrt. AKON TAXI direkt telefonisch buchen.`,
    eyebrow: `${BUSINESS.airportFare.display} Fixpreis`,
    heading: `Flughafentaxi für ${BUSINESS.airportFare.display} Fixpreis.`,
    intro: `Von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination} fahren Sie mit AKON TAXI für pauschal ${BUSINESS.airportFare.display} pro einfache Fahrt. Der Fahrpreis steht vor der Buchung fest. Rufen Sie an, um Ihre Abholung zu vereinbaren.`,
    items: [
      [
        'Verbindlicher Fixpreis',
        `Für die einfache Fahrt von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination} bezahlen Sie pauschal ${BUSINESS.airportFare.display}.`,
      ],
      [
        'Abholung vereinbaren',
        'Nennen Sie Ihre genaue Abholadresse, das Reisedatum und die gewünschte Ankunftszeit am Flughafen.',
      ],
      [
        'Personen und Gepäck',
        'Teilen Sie die Anzahl Fahrgäste und grössere Gepäckstücke bei der Buchung mit.',
      ],
    ],
    note: `Der Fixpreis von ${BUSINESS.airportFare.display} gilt für die einfache Fahrt von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination}. Verfügbarkeit und Abholzeit bitte telefonisch bestätigen lassen.`,
  },
  {
    slug: 'bahnhoftransfer',
    label: 'Bahnhoftransfer',
    title: 'Taxi Bahnhof Wetzikon anfragen',
    description:
      'Taxi für eine Abholung am Bahnhof Wetzikon oder eine Fahrt dorthin telefonisch anfragen und Treffpunkt abstimmen.',
    eyebrow: 'Bahnhof Wetzikon',
    heading: 'Zum Bahnhof oder vom Bahnhof.',
    intro:
      'Wer mit dem Zug ankommt oder zum Bahnhof Wetzikon fahren möchte, kann die gewünschte Taxifahrt direkt telefonisch anfragen. Ein klar vereinbarter Treffpunkt hilft bei der Abholung.',
    items: [
      [
        'Richtung der Fahrt',
        'Erklären Sie, ob Sie am Bahnhof abgeholt werden oder dorthin fahren möchten.',
      ],
      [
        'Ankunftszeit nennen',
        'Teilen Sie bei Zugankunft die geplante Uhrzeit und gegebenenfalls die Zugverbindung mit.',
      ],
      [
        'Treffpunkt abstimmen',
        'Vereinbaren Sie telefonisch eine genaue Abholstelle und nennen Sie bei Bedarf Gepäck.',
      ],
    ],
    note: 'Abholort, Wartezeit und Verfügbarkeit bitte vorab telefonisch bestätigen lassen.',
  },
  {
    slug: 'fahrgebiet',
    label: 'Fahrgebiet',
    title: 'Taxi im Zürcher Oberland anfragen',
    description:
      'Taxifahrten in Wetzikon und Umgebung anfragen: Hinwil, Pfäffikon ZH, Gossau ZH, Oetwil am See und Hombrechtikon.',
    eyebrow: 'Region',
    heading: 'Wetzikon und das Zürcher Oberland.',
    intro:
      'AKON TAXI ist in Wetzikon ansässig und nimmt Anfragen für Fahrten in der Region entgegen. Die möglichen Abhol- und Zielorte stimmen Sie direkt mit dem Fahrer ab.',
    items: [
      [
        'Wetzikon und Hinwil',
        'Fragen Sie eine Fahrt mit Abholung oder Ziel in Wetzikon und Hinwil telefonisch an.',
      ],
      [
        'Pfäffikon ZH und Gossau ZH',
        'Besprechen Sie Fahrten mit diesen Ortschaften als Start- oder Zielpunkt.',
      ],
      [
        'Hombrechtikon und Oetwil am See',
        'Auch für diese Orte können Sie eine individuelle Fahrt anfragen.',
      ],
    ],
    note: 'Die genannten Orte sind Anfrageregionen, keine Garantie für jederzeit verfügbare Abholungen. Andere Ziele sind nach Absprache möglich.',
  },
  {
    slug: 'preise',
    label: 'Preise',
    title: `Taxipreise Wetzikon – Flughafentaxi ${BUSINESS.airportFare.display} Fixpreis`,
    description: `Flughafentaxi von ${BUSINESS.airportFare.origin} zum Flughafen Zürich für ${BUSINESS.airportFare.display} Fixpreis. Preise für andere Taxifahrten telefonisch anfragen.`,
    eyebrow: 'Transparente Fahrtkosten',
    heading: `Zum Flughafen für ${BUSINESS.airportFare.display} Fixpreis.`,
    intro: `Für den Flughafentransfer von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination} gilt ein verbindlicher Pauschalpreis von ${BUSINESS.airportFare.display} pro einfache Fahrt. Preise für andere Strecken vereinbaren Sie individuell telefonisch.`,
    items: [
      [
        'Flughafentransfer zum Fixpreis',
        `Von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination}: ${BUSINESS.airportFare.display} pro einfache Fahrt.`,
      ],
      [
        'Andere Taxifahrten',
        'Nennen Sie Start- und Zieladresse, damit der Preis für eine andere Strecke geklärt werden kann.',
      ],
      [
        'Fahrt vereinbaren',
        'Teilen Sie Datum, Uhrzeit sowie Anzahl Fahrgäste mit und bestätigen Sie die Abholung telefonisch.',
      ],
    ],
    note: `Der Flughafentransfer-Fixpreis beträgt ${BUSINESS.airportFare.display} für die einfache Fahrt von ${BUSINESS.airportFare.origin} zum ${BUSINESS.airportFare.destination}. Für andere Fahrten gilt der telefonisch vereinbarte Preis.`,
  },
  {
    slug: 'kontakt',
    label: 'Kontakt',
    title: 'AKON TAXI Wetzikon kontaktieren',
    description:
      'AKON TAXI Wetzikon direkt unter 077 236 60 68 telefonisch erreichen und Taxifahrt anfragen.',
    eyebrow: 'Direkt erreichbar',
    heading: 'AKON TAXI direkt kontaktieren.',
    intro:
      'Die Kontaktaufnahme läuft bei AKON TAXI direkt über das Telefon. So lassen sich Abholort, Fahrziel, Zeitpunkt und offene Fragen in einem Gespräch klären.',
    items: [
      [
        'Telefonnummer',
        'Rufen Sie 077 236 60 68 an. Mobil genügt ein Tippen auf den Anruf-Button.',
      ],
      ['Fahrt beschreiben', 'Teilen Sie Abholort, Ziel, Wunschzeit und gegebenenfalls Gepäck mit.'],
      [
        'Bestätigung erhalten',
        'Vereinbaren Sie Abholstelle und Bedingungen unmittelbar mit dem Fahrer.',
      ],
    ],
    note: 'Bitte beachten Sie: Ein Klick auf den Anruf-Button oder ein nicht beantworteter Anruf bestätigt keine Buchung.',
  },
] as const satisfies readonly LandingPageDetails[];
