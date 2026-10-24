import type { Metadata } from 'next';

import { BUSINESS } from '../../constants/business';

/*** Describe the legal notice with a self-canonical URL and distinct search metadata. */
export function createImprintMetadata(): Metadata {
  const title = `Impressum | ${BUSINESS.name}`;
  const description = 'Impressum und Kontaktangaben von AKON TAXI in Wetzikon (ZH).';

  return {
    title: 'Impressum',
    description,
    alternates: {
      canonical: '/impressum',
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      siteName: BUSINESS.name,
      title,
      description,
      url: '/impressum',
      images: [
        {
          url: BUSINESS.assets.socialImage,
          width: 1200,
          height: 630,
          alt: 'AKON TAXI – Taxi in Wetzikon',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [BUSINESS.assets.socialImage],
    },
  };
}
