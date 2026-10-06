import type { MetadataRoute } from 'next';

import { createRobotsMetadata } from '../features/seo/createRobotsMetadata';

/*** Generate crawler directives and advertise the canonical sitemap. */
export default function robots(): MetadataRoute.Robots {
  return createRobotsMetadata();
}
