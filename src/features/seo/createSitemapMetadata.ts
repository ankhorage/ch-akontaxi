import type { MetadataRoute } from 'next';

import { BUSINESS } from '../../constants/business';

/*** Create the sitemap entries for canonical indexable application routes. */
export function createSitemapMetadata(): MetadataRoute.Sitemap {
  return [
    {
      url: BUSINESS.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
