import { BUSINESS } from '../../constants/business';
import { ContactSection } from './ContactSection';
import { Hero } from './Hero';
import { ServiceSection } from './ServiceSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TrustStrip } from './TrustStrip';
import { VehicleSection } from './VehicleSection';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'TaxiService',
  name: BUSINESS.name,
  url: BUSINESS.url,
  telephone: '+41772366068',
  areaServed: [BUSINESS.locality, BUSINESS.region],
};

/*** Compose the public AKON TAXI homepage from focused presentation sections. */
export function HomePage() {
  return (
    <>
      <script type="application/ld+json">{JSON.stringify(STRUCTURED_DATA)}</script>
      <div className="page-shell" id="top">
        <SiteHeader />
        <main>
          <Hero />
          <TrustStrip />
          <ServiceSection />
          <VehicleSection />
          <ContactSection />
        </main>
        <SiteFooter />
      </div>
      <a className="mobile-call" href={BUSINESS.phoneHref}>
        <span aria-hidden="true">☎</span>
        {BUSINESS.phoneDisplay}
      </a>
    </>
  );
}
