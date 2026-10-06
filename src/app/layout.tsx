import './globals.css';

import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

import { BUSINESS } from '../constants/business';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand',
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: {
    default: BUSINESS.seo.title,
    template: `%s | ${BUSINESS.name}`,
  },
  description: BUSINESS.seo.description,
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  verification: googleSiteVerification ? { google: googleSiteVerification } : undefined,
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: '/',
    siteName: BUSINESS.name,
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
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
    title: BUSINESS.seo.title,
    description: BUSINESS.seo.description,
    images: [BUSINESS.assets.socialImage],
  },
  icons: {
    icon: '/icon.svg',
  },
};

interface LayoutProps {
  readonly children: ReactNode;
}

/*** Render the document shell and shared search/social metadata for every route. */
export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="de-CH">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
