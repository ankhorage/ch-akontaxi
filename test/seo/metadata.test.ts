import { describe, expect, test } from 'bun:test';

import { BUSINESS } from '../../src/constants/business';
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
    expect(createSitemapMetadata()).toEqual([
      {
        url: BUSINESS.url,
        changeFrequency: 'weekly',
        priority: 1,
      },
    ]);
  });
});
