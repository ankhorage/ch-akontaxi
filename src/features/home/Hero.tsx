import { getImageProps } from 'next/image';

import { BUSINESS } from '../../constants/business';
import { PhoneLink } from '../phone/PhoneLink';

/*** Render one responsive, eagerly discoverable hero image without hiding first-viewport content. */
export function Hero() {
  const {
    props: { srcSet: mobileSrcSet },
  } = getImageProps({
    alt: '',
    fill: true,
    quality: 60,
    sizes: '100vw',
    src: '/images/hero-mobile-approved.webp',
  });
  const { props: desktopImage } = getImageProps({
    alt: '',
    decoding: 'sync',
    fetchPriority: 'high',
    fill: true,
    loading: 'eager',
    quality: 75,
    sizes: '100vw',
    src: '/images/hero-desktop-approved.webp',
  });

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__media" aria-hidden="true">
        <picture>
          <source media="(max-width: 860px)" sizes="100vw" srcSet={mobileSrcSet} />
          <img {...desktopImage} className="hero__image" />
        </picture>
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
          <PhoneLink className="button hero__call-action">
            <span aria-hidden="true">☎</span>
            Jetzt anrufen
          </PhoneLink>
          <a className="button button--ghost" href="#fahrservice">
            Mehr erfahren
          </a>
        </div>
        <PhoneLink className="hero__phone">{BUSINESS.phoneDisplay}</PhoneLink>
      </div>
    </section>
  );
}
