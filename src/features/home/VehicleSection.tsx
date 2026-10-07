import Image from 'next/image';

import { MotionReveal } from './MotionReveal';

/*** Present the actual AKON TAXI vehicle photographed in Wetzikon. */
export function VehicleSection() {
  return (
    <section className="section vehicle-section" id="fahrzeug">
      <MotionReveal className="vehicle-section__visual" direction="left">
        <Image
          src="/images/vehicle.webp"
          alt="Weisser VW Touran von AKON TAXI in Wetzikon"
          fill
          sizes="(max-width: 760px) 100vw, 52vw"
        />
      </MotionReveal>
      <MotionReveal className="vehicle-section__copy" delay={0.08} direction="right">
        <p className="eyebrow">Das Fahrzeug</p>
        <h2>Das Taxi, das Sie abholt.</h2>
        <p>Mit dem weissen VW Touran ist AKON TAXI in Wetzikon unterwegs.</p>
        <div className="vehicle-section__note">
          <span aria-hidden="true">↗</span>
          <p>Die Fotos auf dieser Website zeigen das tatsächlich eingesetzte Fahrzeug.</p>
        </div>
      </MotionReveal>
    </section>
  );
}
