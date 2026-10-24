import { describe, expect, test } from 'bun:test';

import { BUSINESS } from '../../src/constants/business';
import { createImprintMetadata } from '../../src/features/seo/createImprintMetadata';
import { createRobotsMetadata } from '../../src/features/seo/createRobotsMetadata';
import { createSiteMetadata } from '../../src/features/seo/createSiteMetadata';
import { createSitemapMetadata } from '../../src/features/seo/createSitemapMetadata';

describe('SEO metadata', () => {
  test('keeps the public site canonical, relevant and indexable', () => {
    const metadata = createSiteMetadata(' google-verification-token ');

    expect(metadata.metadataBase?.toString()).toBe(`${BUSINESS.url}/`);
    expect(metadata.title).toEqual({
      default: 'Taxi Wetzikon | AKON TAXI',
      template: `%s | ${BUSINESS.name}`,
    });
    expect(metadata.description).toContain('Taxi in Wetzikon');
    expect(metadata.alternates).toEqual({ canonical: '/' });
    expect(metadata.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    });
    expect(metadata.verification).toEqual({ google: 'google-verification-token' });
  });

  test('uses a self-canonical, discoverable legal notice without competing local-service keywords', () => {
    const metadata = createImprintMetadata();

    expect(metadata.title).toBe('Impressum');
    expect(metadata.alternates).toEqual({ canonical: '/impressum' });
    expect(metadata.description).toContain('AKON TAXI');
    expect(metadata.openGraph).toMatchObject({ url: '/impressum' });
    expect(metadata.robots).toEqual({ index: true, follow: true });
  });

  test('does not emit empty Google verification metadata', () => {
    expect(createSiteMetadata('   ').verification).toBeUndefined();
  });

  test('advertises the canonical host and sitemap to crawlers', () => {
    expect(createRobotsMetadata()).toEqual({
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `${BUSINESS.url}/sitemap.xml`,
      host: BUSINESS.url,
    });
  });

  test('lists only canonical indexable routes', () => {
    const urls = createSitemapMetadata().map((entry) => entry.url);

    expect(urls).toEqual([
      BUSINESS.url,
      `${BUSINESS.url}/impressum`,
      ...[
        'taxi-wetzikon',
        'flughafentransfer',
        'bahnhoftransfer',
        'fahrgebiet',
        'preise',
        'kontakt',
      ].map((slug) => `${BUSINESS.url}/${slug}`),
    ]);
  });
});
