import type { MetadataRoute } from 'next';

import { BUSINESS } from '../constants/business';

/*** Generate crawler directives and advertise the canonical sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BUSINESS.url}/sitemap.xml`,
    host: BUSINESS.url,
  };
}
