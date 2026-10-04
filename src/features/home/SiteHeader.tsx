import { BUSINESS } from '../../constants/business';
import { BrandLogo } from '../brand/BrandLogo';

/*** Render the primary navigation and persistent call action. */
export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="site-header__brand" href="#top" aria-label="AKON TAXI Startseite">
        <BrandLogo />
      </a>
      <nav className="site-header__nav" aria-label="Hauptnavigation">
        <a href="#fahrservice">Fahrservice</a>
        <a href="#fahrzeug">Fahrzeug</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
      <a className="button button--small" href={BUSINESS.phoneHref}>
        Jetzt anrufen
      </a>
    </header>
  );
}
