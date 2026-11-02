'use client';

import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { type ReactNode, useEffect, useState } from 'react';

import { createGoogleConsentState } from './createGoogleConsentState';
import { MeasurementConsentContext } from './MeasurementConsentContext';

const CONSENT_STORAGE_KEY = 'akon-taxi-google-consent-v2';
const GOOGLE_ADS_TAG_ID = 'AW-18499497170';

type ConsentChoice = 'granted' | 'denied';

interface ConsentManagerProps {
  readonly children?: ReactNode;
  readonly measurementEnabled?: boolean;
}

/*** Render no tracking or consent UI unless optional measurement is explicitly enabled at build time. */
export function ConsentManager({ children, measurementEnabled = false }: ConsentManagerProps) {
  if (!measurementEnabled) {
    return (
      <MeasurementConsentContext.Provider value={false}>
        {children}
      </MeasurementConsentContext.Provider>
    );
  }
  return <EnabledConsentManager>{children}</EnabledConsentManager>;
}

/*** Preserve explicit opt-in and revocation only when optional measurement is enabled. */
function EnabledConsentManager({ children }: Pick<ConsentManagerProps, 'children'>) {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedChoice = readStoredConsent();

      if (storedChoice) {
        updateGoogleConsent(storedChoice);
        setChoice(storedChoice);
      }
      setIsReady(true);
    });

    return () => window.clearTimeout(timeout);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    updateGoogleConsent(nextChoice);
    setChoice(nextChoice);
    setIsSettingsOpen(false);
    // A previously loaded measurement script must not survive a consent withdrawal.
    if (nextChoice === 'denied' && choice === 'granted') window.location.reload();
  };

  const isOpen = isReady && (choice === null || isSettingsOpen);
  return (
    <MeasurementConsentContext.Provider value={choice === 'granted'}>
      {children}
      <GoogleMeasurement isEnabled={choice === 'granted'} />
      {isOpen ? (
        <ConsentDialog
          isSettingsOpen={isSettingsOpen}
          onAccept={() => saveChoice('granted')}
          onDecline={() => saveChoice('denied')}
        />
      ) : (
        <button
          className="consent-manager__reopen"
          onClick={() => setIsSettingsOpen(true)}
          type="button"
        >
          Datenschutz-Einstellungen
        </button>
      )}
    </MeasurementConsentContext.Provider>
  );
}

interface GoogleMeasurementProps {
  readonly isEnabled: boolean;
}

/*** Load optional measurement only after the visitor has explicitly granted consent. */
function GoogleMeasurement({ isEnabled }: GoogleMeasurementProps) {
  return isEnabled ? (
    <>
      <Script
        id="google-ads-tag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_TAG_ID}`}
        strategy="afterInteractive"
      />
      <Analytics />
      <SpeedInsights />
    </>
  ) : null;
}

interface ConsentDialogProps {
  readonly isSettingsOpen: boolean;
  readonly onAccept: () => void;
  readonly onDecline: () => void;
}

/*** Render the focused choice dialog without adding a separate third-party consent platform. */
function ConsentDialog({ isSettingsOpen, onAccept, onDecline }: ConsentDialogProps) {
  return (
    <aside
      aria-describedby="consent-description"
      aria-labelledby="consent-title"
      className="consent-manager"
    >
      <div className="consent-manager__content">
        <h2 id="consent-title">Optionale Messung</h2>
        <p id="consent-description">
          Dürfen wir Google Ads für Werbe- und Anrufmessung sowie Vercel für
          Nutzungsstatistiken verwenden? Auch ohne Zustimmung können Sie uns jederzeit anrufen.
        </p>
        {isSettingsOpen ? (
          <p>
            Sie können Ihre Einwilligung jederzeit widerrufen. Details finden Sie in
            unserer <a href="/impressum#datenschutz">Datenschutzerklärung</a>.
          </p>
        ) : null}
        <div className="consent-manager__actions">
          <button className="button" onClick={onAccept} type="button">
            Akzeptieren
          </button>
          <button className="button button--ghost" onClick={onDecline} type="button">
            Ablehnen
          </button>
          <a className="consent-manager__details" href="/impressum#datenschutz">
            Datenschutz
          </a>
        </div>
      </div>
    </aside>
  );
}

/*** Read a previously stored, valid consent choice without trusting arbitrary local storage content. */
function readStoredConsent(): ConsentChoice | null {
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);

  return value === 'granted' || value === 'denied' ? value : null;
}

/*** Queue the consent update before loading or using the optional Google Ads tag. */
function updateGoogleConsent(choice: ConsentChoice) {
  window.gtag?.('consent', 'update', createGoogleConsentState(choice === 'granted'));

  if (choice === 'granted') {
    window.gtag?.('config', GOOGLE_ADS_TAG_ID);
  }
}
