import { BUSINESS } from '../../constants/business';
import { createTaxiStructuredData } from '../seo/createTaxiStructuredData';
import { ContactSection } from './ContactSection';
import { Hero } from './Hero';
import { ServiceSection } from './ServiceSection';
import { SiteFooter } from './SiteFooter';
import { SiteHeader } from './SiteHeader';
import { TrustStrip } from './TrustStrip';
import { VehicleSection } from './VehicleSection';

/*** Compose the public AKON TAXI homepage from focused presentation sections. */
export function HomePage() {
  const structuredData = createTaxiStructuredData();

  return (
    <>
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
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
