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

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.url),
  title: 'Taxi Wetzikon | AKON TAXI',
  description:
    'AKON TAXI – Ihr direkter Ansprechpartner für Taxifahrten in Wetzikon und im Zürcher Oberland.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_CH',
    url: '/',
    siteName: BUSINESS.name,
    title: 'Taxi Wetzikon | AKON TAXI',
    description: 'Direkter Taxikontakt in Wetzikon und im Zürcher Oberland.',
  },
};

interface LayoutProps {
  readonly children: ReactNode;
}

/*** Render the document shell and brand typography for every route. */
export default function Layout({ children }: LayoutProps) {
  return (
    <html lang="de-CH">
      <body className={montserrat.variable}>{children}</body>
    </html>
  );
}
