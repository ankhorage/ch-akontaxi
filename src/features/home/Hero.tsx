import Image from 'next/image';

import { BUSINESS } from '../../constants/business';

/*** Render the homepage hero with explicit desktop and portrait mobile photography. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <Image
          className="hero__image hero__image--desktop"
          src="/images/hero-desktop.webp"
          alt=""
          fill
          fetchPriority="high"
          sizes="(max-width: 860px) 1px, 100vw"
        />
        <Image
          className="hero__image hero__image--mobile"
          src="/images/hero-mobile.webp"
          alt=""
          fill
          fetchPriority="high"
          sizes="(max-width: 860px) 100vw, 1px"
        />
      </div>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">Ihr Taxi in Wetzikon</p>
        <h1 id="hero-title">Taxi Wetzikon. Persönlich. Lokal. Direkt erreichbar.</h1>
        <p className="hero__lead">
          AKON TAXI ist Ihr direkter Ansprechpartner für Taxifahrten in Wetzikon und im Zürcher
          Oberland.
        </p>
        <div className="hero__actions">
          <a className="button" href={BUSINESS.phoneHref}>
            <span aria-hidden="true">☎</span>
            Jetzt anrufen
          </a>
          <a className="button button--ghost" href="#fahrservice">
            Mehr erfahren
          </a>
        </div>
        <a className="hero__phone" href={BUSINESS.phoneHref}>
          {BUSINESS.phoneDisplay}
        </a>
      </div>
    </section>
  );
}
