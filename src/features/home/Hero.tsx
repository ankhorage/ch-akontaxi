import { getImageProps } from 'next/image';

import { BUSINESS } from '../../constants/business';

const DESKTOP_HERO = getImageProps({
  src: '/images/hero-desktop.avif',
  alt: 'Weisser VW Touran von AKON TAXI am Bahnhof Wetzikon',
  width: 1600,
  height: 900,
  priority: true,
  sizes: '100vw',
}).props;

const MOBILE_HERO = getImageProps({
  src: '/images/hero-mobile.avif',
  alt: '',
  width: 900,
  height: 1600,
  priority: true,
  sizes: '100vw',
}).props;

/*** Render the homepage hero with responsive real-world taxi photography. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <picture className="hero__media">
        <source media="(max-width: 860px)" srcSet={MOBILE_HERO.srcSet} />
        <img {...DESKTOP_HERO} className="hero__image" />
      </picture>
      <div className="hero__overlay" />
      <div className="hero__content">
        <p className="eyebrow">Ihr Taxi in Wetzikon</p>
        <h1 id="hero-title">Persönlich. Lokal. Direkt erreichbar.</h1>
        <p className="hero__lead">
          AKON TAXI ist Ihr direkter Ansprechpartner für Fahrten in Wetzikon und im Zürcher
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
