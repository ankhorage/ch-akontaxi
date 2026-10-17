import type { Metadata } from 'next';

import { BUSINESS } from '../../constants/business';
import { findLandingPage } from './findLandingPage';

/*** Build route-specific canonical and preview metadata for a verified service page. */
export async function generateLandingMetadata({
  params,
}: {
  readonly params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findLandingPage(slug);

  if (!page) {
    return { robots: { index: false, follow: false } };
  }

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/${page.slug}` },
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      title: page.title,
      description: page.description,
      url: `${BUSINESS.url}/${page.slug}`,
      siteName: BUSINESS.name,
    },
  };
}
