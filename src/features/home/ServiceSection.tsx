import { BUSINESS } from '../../constants/business';

const SERVICES = [
  {
    title: 'Taxi in Wetzikon',
    text: 'Für Abholungen, Ziele und kurze Wege in Wetzikon.',
  },
  {
    title: 'Direkt telefonisch buchen',
    text: 'Abholort, Ziel und Zeitpunkt persönlich am Telefon klären.',
  },
  {
    title: 'Zürcher Oberland',
    text: 'Fahrten in der Region nach individueller Absprache.',
  },
] as const;

/*** Render the verified, intentionally claim-light service proposition. */
export function ServiceSection() {
  return (
    <section className="section section--light" id="fahrservice">
      <div className="section__intro">
        <p className="eyebrow">Fahrservice</p>
        <h2>Taxi und Fahrservice rund um Wetzikon.</h2>
        <p>
          Wenn Sie eine Fahrt in Wetzikon oder im Zürcher Oberland planen, erreichen Sie AKON TAXI
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
