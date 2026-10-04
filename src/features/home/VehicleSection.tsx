import Image from 'next/image';

/*** Present the vehicle direction while keeping the real-photo slot replaceable. */
export function VehicleSection() {
  return (
    <section className="section vehicle-section" id="fahrzeug">
      <div className="vehicle-section__visual">
        <Image
          src="/images/vehicle-taxi.svg"
          alt="Illustration des weissen AKON Taxi Fahrzeugs"
          fill
          sizes="(max-width: 760px) 100vw, 52vw"
        />
      </div>
      <div className="vehicle-section__copy">
        <p className="eyebrow">Das Fahrzeug</p>
        <h2>Genug Raum für eine entspannte Fahrt.</h2>
        <p>
          Der Fahrzeugbereich zeigt bewusst das tatsächliche Taxi als Mittelpunkt der Marke. Die
          finale Version übernimmt hier eines der aufbereiteten Originalfotos.
        </p>
        <div className="vehicle-section__note">
          <span aria-hidden="true">↗</span>
          <p>Originalaufnahmen aus Wetzikon werden für die Produktion weboptimiert eingesetzt.</p>
        </div>
      </div>
    </section>
  );
}
