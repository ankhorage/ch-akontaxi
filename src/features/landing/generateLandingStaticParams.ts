import { LANDING_PAGES } from './constants/landingPages';

/*** Enumerate the real landing routes for static rendering. */
export function generateLandingStaticParams() {
  return LANDING_PAGES.map(({ slug }) => ({ slug }));
}
