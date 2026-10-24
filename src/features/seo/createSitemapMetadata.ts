import type { MetadataRoute } from 'next';

import { BUSINESS } from '../../constants/business';
import { LANDING_PAGES } from '../landing/constants/landingPages';

/*** Create canonical sitemap entries for the homepage and helpful service destinations. */
export function createSitemapMetadata(): MetadataRoute.Sitemap {
  return [
    {
      url: BUSINESS.url,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BUSINESS.url}/impressum`,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    ...LANDING_PAGES.map(({ slug }) => ({
      url: `${BUSINESS.url}/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
