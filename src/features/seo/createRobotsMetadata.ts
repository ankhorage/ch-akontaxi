import type { MetadataRoute } from 'next';

import { BUSINESS } from '../../constants/business';

/*** Create crawler directives that expose only the canonical public site and sitemap. */
export function createRobotsMetadata(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
