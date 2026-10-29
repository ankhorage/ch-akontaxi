/*** Render the factual notice for optional Google and Vercel measurement. */
export function PrivacyNotice() {
  return (
    <section className="imprint-page__section" id="datenschutz" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Datenschutz und optionale Messung</h2>
      <p>
        Wenn Sie zustimmen, laden wir den Google Ads Tag sowie Vercel Analytics und Speed Insights.
        Der Google Ads Tag erfasst einen Klick auf die Telefonnummer als Website-Conversion. Der
        angegebene Conversion-Wert beträgt CHF 1 und beschreibt keine tatsächlich geführte Fahrt
        oder ein Telefongespräch.
      </p>
      <p>
        Ohne Zustimmung laden wir keine optionalen Messdienste und senden kein Telefonklick-Event.
        Nach einem Widerruf lösen wir keine weiteren Telefonklick-Events oder Vercel-Messungen aus.
        Die Telefonnummer und die Anruffunktion stehen unabhängig von Ihrer Auswahl bereit. Sie
        können Ihre Auswahl jederzeit über «Datenschutz-Einstellungen» ändern oder widerrufen.
      </p>
      <p>
        Weitere Informationen zur Datenverarbeitung durch Google finden Sie in den{' '}
        <a
          href="https://policies.google.com/privacy?hl=de"
          rel="noopener noreferrer"
          target="_blank"
        >
          Google-Datenschutzhinweisen
        </a>
        . Diese Hinweise beschreiben die technische Messung und ersetzen keine individuelle
        Rechtsberatung.
      </p>
    </section>
  );
}
