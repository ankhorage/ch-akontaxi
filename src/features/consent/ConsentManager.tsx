'use client';

import { Analytics } from '@vercel/analytics/next';
import Script from 'next/script';
import { useEffect, useState } from 'react';

import { createGoogleConsentState } from './createGoogleConsentState';

const CONSENT_STORAGE_KEY = 'akon-taxi-google-consent';
const GOOGLE_ADS_TAG_ID = 'AW-18499497170';

type ConsentChoice = 'granted' | 'denied';

/*** Render the accessible, persistent consent choice that controls optional Google Ads measurement. */
export function ConsentManager() {
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const storedChoice = readStoredConsent();

      if (storedChoice) {
        updateGoogleConsent(storedChoice);
        setChoice(storedChoice);
      }
    });

    return () => window.clearTimeout(timeout);
  }, []);

  const saveChoice = (nextChoice: ConsentChoice) => {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    updateGoogleConsent(nextChoice);
    setChoice(nextChoice);
    setIsSettingsOpen(false);
  };

  const isOpen = choice === null || isSettingsOpen;
  return (
    <>
      <GoogleMeasurement isEnabled={choice === 'granted'} />
      {isOpen ? (
        <ConsentDialog
          isSettingsOpen={isSettingsOpen}
          onAccept={() => saveChoice('granted')}
          onDecline={() => saveChoice('denied')}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />
      ) : (
        <button
          aria-haspopup="dialog"
          className="consent-manager__reopen"
          onClick={() => setIsSettingsOpen(true)}
          type="button"
        >
          Datenschutz-Einstellungen
        </button>
      )}
    </>
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
    </>
  ) : null;
}

interface ConsentDialogProps {
  readonly isSettingsOpen: boolean;
  readonly onAccept: () => void;
  readonly onDecline: () => void;
  readonly onOpenSettings: () => void;
}

/*** Render the focused choice dialog without adding a separate third-party consent platform. */
function ConsentDialog({
  isSettingsOpen,
  onAccept,
  onDecline,
  onOpenSettings,
}: ConsentDialogProps) {
  return (
    <section
      aria-describedby="consent-description"
      aria-labelledby="consent-title"
      aria-modal="true"
      className="consent-manager"
      role="dialog"
    >
      <div className="consent-manager__content">
        <h2 id="consent-title">Datenschutz-Einstellungen</h2>
        <p id="consent-description">
          Mit Ihrer Zustimmung messen wir ausschliesslich Klicks auf unsere Telefonnummer als
          Google-Ads-Conversion. Die Telefonfunktion bleibt immer verfügbar.
        </p>
        {isSettingsOpen ? (
          <p>
            Die optionale Google-Ads-Messung verwendet Google Consent Mode für Anzeigen-Speicherung,
            Anzeigen-Nutzerdaten, Anzeigen-Personalisierung und Analytics-Speicherung gemeinsam. Sie
            können diese Auswahl jederzeit hier ändern.
          </p>
        ) : null}
        <div className="consent-manager__actions">
          <button className="button" onClick={onAccept} type="button">
            Akzeptieren
          </button>
          <button className="button button--ghost" onClick={onDecline} type="button">
            Ablehnen
          </button>
          {!isSettingsOpen ? (
            <button className="consent-manager__settings" onClick={onOpenSettings} type="button">
              Einstellungen
            </button>
          ) : null}
        </div>
      </div>
    </section>
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
