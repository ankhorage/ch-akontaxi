import Link from 'next/link';

import { BrandLogo } from '../brand/BrandLogo';
import { PhoneLink } from '../phone/PhoneLink';

/*** Render navigation to homepage sections or service destinations and a persistent call action. */
export function SiteHeader({ isLanding = false }: { readonly isLanding?: boolean }) {
  return (
    <header className="site-header">
      <Link
        className="site-header__brand"
        href={isLanding ? '/' : '#top'}
        aria-label="AKON TAXI Startseite"
      >
        <BrandLogo />
      </Link>
      <nav className="site-header__nav" aria-label="Hauptnavigation">
        <Link href={isLanding ? '/#fahrservice' : '#fahrservice'}>Fahrservice</Link>
        <Link href={isLanding ? '/#fahrzeug' : '#fahrzeug'}>Fahrzeug</Link>
        <Link href={isLanding ? '/kontakt' : '#kontakt'}>Kontakt</Link>
      </nav>
      <div className="site-header__actions">
        {isLanding && (
          <Link className="site-header__back" href="/">
            ← Zur Startseite
          </Link>
        )}
        <PhoneLink className="button button--small">Jetzt anrufen</PhoneLink>
      </div>
    </header>
  );
}
