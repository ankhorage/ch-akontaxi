import { describe, expect, test } from 'bun:test';

import nextConfig from '../../../next.config';
import { createSitemapMetadata } from '../seo/createSitemapMetadata';
import { LANDING_PAGES } from './constants/landingPages';

describe('taxi landing page routes', () => {
  test('keeps all six canonical destinations discoverable in the sitemap', () => {
    const slugs = LANDING_PAGES.map(({ slug }) => slug);
    const sitemapUrls = createSitemapMetadata().map(({ url }) => url);

    expect(slugs).toEqual([
      'taxi-wetzikon',
      'flughafentransfer',
      'bahnhoftransfer',
      'fahrgebiet',
      'preise',
      'kontakt',
    ]);

    for (const slug of slugs) {
      expect(sitemapUrls).toContain(`https://akontaxi.ch/${slug}`);
    }

    expect(sitemapUrls).not.toContain('https://akontaxi.ch/flughafentaxi');
    expect(sitemapUrls).not.toContain('https://akontaxi.ch/bahnhoftaxi');
  });

  test('redirects memorable airport and station URLs to canonical pages', async () => {
    const redirects = await nextConfig.redirects?.();

    expect(redirects).toEqual([
      { source: '/flughafentaxi', destination: '/flughafentransfer', permanent: true },
      { source: '/bahnhoftaxi', destination: '/bahnhoftransfer', permanent: true },
    ]);
  });
});
