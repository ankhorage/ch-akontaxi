/*** Describe only the tracking behavior of the deployed, explicitly configured build. */
export function PrivacyNotice() {
  const measurementEnabled = process.env.GOOGLE_ADS_MEASUREMENT_ENABLED === 'true';

  return (
    <section className="imprint-page__section" id="datenschutz" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Datenschutz</h2>
      {measurementEnabled ? (
        <>
          <p>
            Nur mit Ihrer Einwilligung laden wir Google Ads für Werbe- und Anrufmessung sowie Vercel
            Analytics und Speed Insights für Nutzungsstatistiken. Dazu können Telefonklicks und
            Anrufe über die Website gemessen werden. Das bedeutet nicht, dass jeder Klick ein
            tatsächlich geführtes Gespräch oder eine Buchung ist.
          </p>
          <p>
            Ohne Zustimmung laden wir diese optionalen Messdienste nicht. Die Telefonnummer
            funktioniert unabhängig von Ihrer Entscheidung. Über «Datenschutz-Einstellungen» können
            Sie Ihre Einwilligung jederzeit ändern oder widerrufen.
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
            .
          </p>
        </>
      ) : (
        <>
          <p>
            Wir haben die optionale Werbe- und Nutzungsanalyse derzeit deaktiviert. Es werden keine
            Google-Ads-Tracking-Tags oder Vercel-Analytics-/Speed-Insights-Skripte geladen;
            Telefonklicks und Website-Anrufe werden nicht als Werbe-Conversions gemessen.
          </p>
          <p>
            Die Website und die Telefonnummer bleiben ohne Tracking nutzbar. Für Bereitstellung und
            Sicherheit der Website können weiterhin technisch notwendige Verbindungsdaten durch den
            Hosting-Anbieter verarbeitet werden.
          </p>
        </>
      )}
    </section>
  );
}
