import './globals.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { Montserrat } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';

import { ConsentManager } from '../features/consent/ConsentManager';
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
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function(){window.dataLayer.push(arguments);};
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied'
            });
            window.gtag('js', new Date());
          `}
        </Script>
        {children}
        <ConsentManager />
        <SpeedInsights />
      </body>
    </html>
  );
}
