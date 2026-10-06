import './globals.css';

import { Montserrat } from 'next/font/google';
import type { ReactNode } from 'react';

import { createSiteMetadata } from '../features/seo/createSiteMetadata';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-brand',
});

export const metadata = createSiteMetadata(process.env.GOOGLE_SITE_VERIFICATION);

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
