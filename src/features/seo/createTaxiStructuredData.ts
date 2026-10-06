import { BUSINESS } from '../../constants/business';

/*** Create factual Schema.org TaxiService data with the business represented as its provider. */
export function createTaxiStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TaxiService',
    '@id': `${BUSINESS.url}/#taxi-service`,
    name: BUSINESS.name,
    url: BUSINESS.url,
    description: BUSINESS.seo.description,
    logo: BUSINESS.assets.logo,
    image: BUSINESS.assets.socialImage,
    mainEntityOfPage: BUSINESS.url,
    providerMobility: 'dynamic',
    provider: {
      '@type': 'Organization',
      '@id': `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.phoneInternational,
      logo: BUSINESS.assets.logo,
    },
    areaServed: [
      {
        '@type': 'City',
        name: BUSINESS.locality,
      },
      {
        '@type': 'AdministrativeArea',
        name: BUSINESS.region,
      },
    ],
  } as const;
}
