import type { ReactNode } from 'react';

import './globals.css';

interface RootLayoutProps {
  readonly children: ReactNode;
}

/*** Render the root document shell for the standalone Next.js application. */
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
