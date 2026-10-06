import { BUSINESS } from '../../constants/business';
import { BrandLogo } from '../brand/BrandLogo';

/*** Render the compact brand and contact footer. */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <BrandLogo />
      <p>
        {BUSINESS.locality} · {BUSINESS.region}
      </p>
      <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
      <span>© 2026 {BUSINESS.name}</span>
      <p className="site-footer__credit">
        {'design & development by '}
        <a href="https://ankhorage.com/" target="_blank" rel="noopener noreferrer">
          ankhorage.com
        </a>
      </p>
    </footer>
  );
}
