import { BUSINESS } from '../../constants/business';

const SERVICES = [
  {
    title: 'Lokaler Fahrservice',
    text: 'Für Fahrten ab, nach und rund um Wetzikon.',
  },
  {
    title: 'Direkte Anfrage',
    text: 'Abholort, Ziel und Zeitpunkt persönlich am Telefon klären.',
  },
  {
    title: 'Flexibel unterwegs',
    text: 'Fahrten im Zürcher Oberland nach individueller Absprache.',
  },
] as const;

/*** Render the verified, intentionally claim-light service proposition. */
export function ServiceSection() {
  return (
    <section className="section section--light" id="fahrservice">
      <div className="section__intro">
        <p className="eyebrow">Fahrservice</p>
        <h2>Ein Taxi. Ein direkter Kontakt.</h2>
        <p>
          Wenn Sie eine Fahrt planen oder ein Taxi benötigen, erreichen Sie AKON TAXI
          ohne Umweg direkt unter {BUSINESS.phoneDisplay}.
        </p>
      </div>
      <div className="service-grid">
        {SERVICES.map((service, index) => (
          <article className="service-card" key={service.title}>
            <span className="service-card__number">0{index + 1}</span>
            <h3>{service.title}</h3>
            <p>{service.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
