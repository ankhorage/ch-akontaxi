import './globals.css';

import type { ReactNode } from 'react';

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
