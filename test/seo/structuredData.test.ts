import { describe, expect, test } from 'bun:test';

import { BUSINESS } from '../../src/constants/business';
import { createTaxiStructuredData } from '../../src/features/seo/createTaxiStructuredData';

describe('Taxi structured data', () => {
  test('describes the taxi service and its verified service area', () => {
    const data = createTaxiStructuredData();

    expect(data).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'TaxiService',
      '@id': `${BUSINESS.url}/#taxi-service`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      providerMobility: 'dynamic',
      areaServed: [
        { '@type': 'City', name: BUSINESS.locality },
        { '@type': 'AdministrativeArea', name: BUSINESS.region },
      ],
    });
  });

  test('keeps contact identity on the provider instead of the service', () => {
    const data = createTaxiStructuredData();

    expect(data.provider).toEqual({
      '@type': 'Organization',
      '@id': `${BUSINESS.url}/#organization`,
      name: BUSINESS.name,
      url: BUSINESS.url,
      telephone: BUSINESS.phoneInternational,
      logo: BUSINESS.assets.logo,
    });
    expect('telephone' in data).toBe(false);
  });

  test('does not fabricate local-business properties that are not verified', () => {
    const serialized = JSON.stringify(createTaxiStructuredData());

    for (const property of [
      '"address"',
      '"aggregateRating"',
      '"openingHoursSpecification"',
      '"priceRange"',
    ]) {
      expect(serialized).not.toContain(property);
    }
  });
});
