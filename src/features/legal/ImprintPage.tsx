import { BUSINESS } from '../../constants/business';
import { SiteFooter } from '../home/SiteFooter';
import { SiteHeader } from '../home/SiteHeader';

/*** Render confirmed proprietor, postal address and public contact details. */
export function ImprintPage() {
  return (
    <div className="page-shell" id="top">
      <SiteHeader isLanding />
      <main className="imprint-page">
        <div className="imprint-page__inner">
          <p className="eyebrow">Rechtliche Informationen</p>
          <h1>Impressum</h1>
          <p className="imprint-page__intro">
            Angaben zum Anbieter dieser Website und Kontaktmöglichkeiten.
          </p>

          <section className="imprint-page__section" aria-labelledby="imprint-provider">
            <h2 id="imprint-provider">Anbieter</h2>
            <address>
              <p>
                <strong>{BUSINESS.name}</strong>
              </p>
              <p>Inhaber: {BUSINESS.legal.owner}</p>
              <p>Rechtsform: {BUSINESS.legal.legalForm}</p>
              <p>{BUSINESS.legal.street}</p>
              <p>
                {BUSINESS.legal.postalCode} {BUSINESS.legal.city}
              </p>
              <p>{BUSINESS.legal.country}</p>
            </address>
          </section>

          <section className="imprint-page__section" aria-labelledby="imprint-contact">
            <h2 id="imprint-contact">Kontakt</h2>
            <p>
              Telefon: <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </p>
            <p>
              E-Mail: <a href={`mailto:${BUSINESS.legal.email}`}>{BUSINESS.legal.email}</a>
            </p>
            <p>
              Website: <a href={BUSINESS.url}>{BUSINESS.domain}</a>
            </p>
          </section>
          <p className="imprint-page__intro">
            {BUSINESS.name} ist die Geschäftsbezeichnung des Einzelunternehmens von{' '}
            {BUSINESS.legal.owner}.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
