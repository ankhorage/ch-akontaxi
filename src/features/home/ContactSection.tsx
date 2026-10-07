import { BUSINESS } from '../../constants/business';
import { MotionReveal } from './MotionReveal';

/*** Render the final conversion section with the verified phone number. */
export function ContactSection() {
  return (
    <section className="contact-section" id="kontakt">
      <MotionReveal>
        <p className="eyebrow">Direkter Kontakt</p>
        <h2>Fahrt benötigt?</h2>
        <p>Rufen Sie AKON TAXI an und besprechen Sie Ihre Fahrt persönlich.</p>
      </MotionReveal>
      <MotionReveal className="contact-section__phone-wrap" delay={0.08} direction="right">
        <a className="contact-section__phone" href={BUSINESS.phoneHref}>
        <small>Telefon</small>
        {BUSINESS.phoneDisplay}
        <span aria-hidden="true">→</span>
        </a>
      </MotionReveal>
    </section>
  );
}
