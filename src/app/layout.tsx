import './globals.css';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
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
      <body className={montserrat.variable}>
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18499497170"
          strategy="afterInteractive"
        />
        <Script id="google-ads-gtag" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18499497170');
          `}
        </Script>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
