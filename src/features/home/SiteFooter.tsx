import { BUSINESS } from '../../constants/business';
import { BrandLogo } from '../brand/BrandLogo';

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
      <div className="site-footer__bottom">
        <span>© 2026 {BUSINESS.name}</span>
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
