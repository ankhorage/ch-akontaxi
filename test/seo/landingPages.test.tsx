import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { BUSINESS } from '../../src/constants/business';
import { LandingPage } from '../../src/features/landing/LandingPage';
import { LANDING_PAGES } from '../../src/features/landing/constants/landingPages';
import { findLandingPage } from '../../src/features/landing/findLandingPage';
import { generateLandingMetadata } from '../../src/features/landing/generateLandingMetadata';
import { generateLandingStaticParams } from '../../src/features/landing/generateLandingStaticParams';

describe('Paid search service destinations', () => {
  test('has six distinct and useful landing routes', () => {
    expect(generateLandingStaticParams()).toHaveLength(6);
    expect(new Set(LANDING_PAGES.map((page) => page.slug)).size).toBe(6);
    expect(findLandingPage('not-a-real-page')).toBeUndefined();
  });

  test('provides distinct canonical metadata', async () => {
    for (const page of LANDING_PAGES) {
      const metadata = await generateLandingMetadata({
        params: Promise.resolve({ slug: page.slug }),
      });
      expect(metadata.alternates).toEqual({ canonical: `/${page.slug}` });
      expect(metadata.description).toBe(page.description);
    }
  });

  test('advertises a single guaranteed CHF 90 airport fare across service and pricing pages', () => {
    const airport = findLandingPage('flughafentransfer');
    const prices = findLandingPage('preise');

    expect(airport?.heading).toContain(BUSINESS.airportFare.display);
    expect(prices?.heading).toContain(BUSINESS.airportFare.display);
    expect(airport?.intro).toContain(BUSINESS.airportFare.origin);
    expect(prices?.intro).toContain(BUSINESS.airportFare.origin);
    expect(airport?.note).toContain('einfache Fahrt');
    expect(airport?.description).not.toContain('ab CHF');
    expect(prices?.intro).not.toContain('keine pauschalen Tarife');
  });

  test('provides a callable phone number and useful planning information', () => {
    for (const page of LANDING_PAGES) {
      const html = renderToStaticMarkup(<LandingPage page={page} />);
      expect(html).toContain(page.heading);
      expect(html).toContain(BUSINESS.phoneHref);
      expect(html).toContain(page.note);
      expect(html).toContain(page.items[0]?.[0]);
    }
  });
});
