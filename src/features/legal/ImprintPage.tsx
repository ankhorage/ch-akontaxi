import { BUSINESS } from '../../constants/business';
import { SiteFooter } from '../home/SiteFooter';
import { SiteHeader } from '../home/SiteHeader';

/*** Render verified provider and contact facts without inventing legal identity details. */
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
              <p>Wetzikon (ZH), Schweiz</p>
            </address>
          </section>

          <section className="imprint-page__section" aria-labelledby="imprint-contact">
            <h2 id="imprint-contact">Kontakt</h2>
            <p>
              Telefon: <a href={BUSINESS.phoneHref}>{BUSINESS.phoneDisplay}</a>
            </p>
            <p>
              Website: <a href={BUSINESS.url}>{BUSINESS.domain}</a>
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

/*
 * Release blocker: add the verified legal operator (full person/company name),
 * serviceable postal address and publicly reachable email address before merge.
 * Wetzikon is only a locality; it is not a postal address.
 */
