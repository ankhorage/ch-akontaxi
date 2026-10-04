import { BUSINESS } from '../../constants/business';

/*** Render the final conversion section with the verified phone number. */
export function ContactSection() {
  return (
    <section className="contact-section" id="kontakt">
      <div>
        <p className="eyebrow">Direkter Kontakt</p>
        <h2>Fahrt benötigt?</h2>
        <p>Rufen Sie AKON TAXI an und besprechen Sie Ihre Fahrt persönlich.</p>
      </div>
      <a className="contact-section__phone" href={BUSINESS.phoneHref}>
        <small>Telefon</small>
        {BUSINESS.phoneDisplay}
        <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
