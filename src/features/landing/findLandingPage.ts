import { LANDING_PAGES } from './constants/landingPages';

/*** Resolve a supported service destination without manufacturing fallback pages. */
export function findLandingPage(slug: string) {
  return LANDING_PAGES.find((page) => page.slug === slug);
}
