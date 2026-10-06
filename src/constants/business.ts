const BUSINESS_URL = 'https://akontaxi.ch';

export const BUSINESS = {
  name: 'AKON TAXI',
  domain: 'akontaxi.ch',
  url: BUSINESS_URL,
  phoneDisplay: '077 236 60 68',
  phoneHref: 'tel:+41772366068',
  phoneInternational: '+41772366068',
  locality: 'Wetzikon',
  region: 'Zürcher Oberland',
  seo: {
    title: 'Taxi Wetzikon | AKON TAXI',
    description:
      'AKON TAXI – Ihr direkter Ansprechpartner für Taxifahrten in Wetzikon und im Zürcher Oberland.',
  },
  assets: {
    logo: `${BUSINESS_URL}/icon.svg`,
    socialImage: `${BUSINESS_URL}/opengraph-image`,
  },
} as const;
