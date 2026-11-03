/*** Inform visitors about actual contact and website processing without advertising absent services. */
export function PrivacyNotice() {
  const measurementEnabled = process.env.GOOGLE_ADS_MEASUREMENT_ENABLED === 'true';

  return (
    <section className="imprint-page__section" id="datenschutz" aria-labelledby="privacy-title">
      <h2 id="privacy-title">Datenschutz</h2>
      <p>
        Für den sicheren Betrieb dieser Website werden technisch notwendige Verbindungsdaten
        verarbeitet, beispielsweise die IP-Adresse und der Zeitpunkt des Seitenaufrufs.
      </p>
      <p>
        Wenn Sie uns telefonisch oder per E-Mail kontaktieren, verwenden wir Ihre Angaben zur
        Bearbeitung Ihrer Anfrage. Bei Fragen zur Bearbeitung Ihrer Daten oder zu Ihren
        Datenschutzrechten erreichen Sie uns über die oben genannten Kontaktmöglichkeiten.
      </p>
      {measurementEnabled ? (
        <>
          <p>
            Mit Ihrer Einwilligung nutzen wir Google Ads zur Werbe- und Anrufmessung sowie Vercel
            Analytics und Speed Insights zur Nutzungsanalyse. Sie können Ihre Auswahl jederzeit
            unter «Datenschutz-Einstellungen» ändern oder widerrufen.
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
      ) : null}
    </section>
  );
}
