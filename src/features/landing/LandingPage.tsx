import { BUSINESS } from '../../constants/business';
import type { LandingPageDetails } from '../../types/landing';
import { ContactSection } from '../home/ContactSection';
import { SiteFooter } from '../home/SiteFooter';
import { SiteHeader } from '../home/SiteHeader';

/*** Render a useful, accessible call-first destination without unsupported service promises. */
export function LandingPage({ page }: { readonly page: LandingPageDetails }) {
  return (
    <div className="page-shell" id="top">
      <SiteHeader />
      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero__inner">
            <p className="eyebrow">{page.eyebrow}</p>
            <h1 id="landing-title">{page.heading}</h1>
            <p className="landing-hero__lead">{page.intro}</p>
            <a className="button" href={BUSINESS.phoneHref}>
              <span aria-hidden="true">☎</span>
              Jetzt anrufen: {BUSINESS.phoneDisplay}
            </a>
          </div>
        </section>
        <section className="landing-details section" aria-labelledby="landing-details-title">
          <p className="eyebrow">Gut vorbereitet</p>
          <h2 id="landing-details-title">Das hilft bei Ihrer Anfrage.</h2>
          <div className="landing-details__grid">
            {page.items.map(([title, description], index) => (
              <article className="landing-details__item" key={title}>
                <span className="landing-details__number">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
          <p className="landing-details__note">{page.note}</p>
        </section>
        <ContactSection />
      </main>
      <SiteFooter />
      <a className="mobile-call" href={BUSINESS.phoneHref}>
        <span aria-hidden="true">☎</span>
        {BUSINESS.phoneDisplay}
      </a>
    </div>
  );
}
