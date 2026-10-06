import type { MetadataRoute } from 'next';

import { BUSINESS } from '../constants/business';

/*** Generate the canonical sitemap for the public application routes. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BUSINESS.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];
}
