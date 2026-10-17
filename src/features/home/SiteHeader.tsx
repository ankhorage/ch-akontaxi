import Link from 'next/link';

import { BUSINESS } from '../../constants/business';
import { BrandLogo } from '../brand/BrandLogo';

/*** Render navigation to homepage sections or service destinations and a persistent call action. */
export function SiteHeader({
  isLanding = false,
}: {
  readonly isLanding?: boolean;
}) {
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
      <a className="button button--small" href={BUSINESS.phoneHref}>
        Jetzt anrufen
      </a>
    </header>
  );
}
