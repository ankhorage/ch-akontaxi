import Image from 'next/image';

import { BUSINESS } from '../../constants/business';

/*** Render the homepage hero with the primary phone conversion path. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Image
        className="hero__image"
        src="/images/hero-taxi.svg"
        alt="Illustration eines weissen AKON Taxis am Bahnhof Wetzikon"
        fill
        priority
        sizes="100vw"
      />
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">Ihr Taxi in Wetzikon</p>
        <h1 id="hero-title">Persönlich. Lokal. Direkt erreichbar.</h1>
        <p className="hero__lead">
          AKON TAXI ist Ihr direkter Ansprechpartner für Fahrten in Wetzikon und im
          Zürcher Oberland.
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
