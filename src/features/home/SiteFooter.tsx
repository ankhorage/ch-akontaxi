import Link from 'next/link';

import { BUSINESS } from '../../constants/business';
import { BrandLogo } from '../brand/BrandLogo';
import { LANDING_PAGES } from '../landing/constants/landingPages';

/*** Render the compact brand and location footer. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <BrandLogo />
        <p className="site-footer__location">
          {BUSINESS.locality} · {BUSINESS.region}
        </p>
      </div>
      <nav className="site-footer__services" aria-label="Taxi-Angebote">
        {LANDING_PAGES.map(({ slug, label }) => (
          <Link key={slug} href={`/${slug}`}>
            {label}
          </Link>
        ))}
      </nav>
      <div className="site-footer__bottom">
        <span>
          © 2026 {BUSINESS.name} · Inhaber: {BUSINESS.legal.owner}
        </span>
        <nav className="site-footer__legal" aria-label="Rechtliche Informationen">
          <Link href="/impressum">Impressum</Link>
          <Link href="/impressum#datenschutz">Datenschutz</Link>
        </nav>
        <p className="site-footer__credit">
          {'design & development by '}
          <a href="https://ankhorage.com/" target="_blank" rel="noopener noreferrer">
            ankhorage.com
          </a>
        </p>
      </div>
    </footer>
  );
}
