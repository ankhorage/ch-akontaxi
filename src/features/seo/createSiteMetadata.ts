import type { Metadata } from 'next';

import { BUSINESS } from '../../constants/business';

/*** Create canonical site metadata from verified business identity and optional Google verification. */
export function createSiteMetadata(googleSiteVerification?: string): Metadata {
  const verificationToken = googleSiteVerification?.trim();

  return {
    metadataBase: new URL(BUSINESS.url),
    title: {
      default: BUSINESS.seo.title,
      template: `%s | ${BUSINESS.name}`,
    },
    description: BUSINESS.seo.description,
    alternates: {
      canonical: '/',
    },
    robots: SITE_ROBOTS,
    verification: verificationToken ? { google: verificationToken } : undefined,
    openGraph: {
      type: 'website',
      locale: 'de_CH',
      url: '/',
      siteName: BUSINESS.name,
      title: BUSINESS.seo.title,
      description: BUSINESS.seo.description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: 'summary_large_image',
      title: BUSINESS.seo.title,
      description: BUSINESS.seo.description,
      images: [BUSINESS.assets.socialImage],
    },
    icons: {
      icon: '/icon.svg',
    },
  };
}

const SITE_ROBOTS = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
} as const;

const SOCIAL_IMAGE = {
  url: BUSINESS.assets.socialImage,
  width: 1200,
  height: 630,
  alt: 'AKON TAXI – Taxi in Wetzikon',
} as const;
