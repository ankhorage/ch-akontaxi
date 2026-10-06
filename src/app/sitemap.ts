import type { MetadataRoute } from 'next';

import { createSitemapMetadata } from '../features/seo/createSitemapMetadata';

/*** Generate the canonical sitemap for the public application routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemapMetadata();
}
