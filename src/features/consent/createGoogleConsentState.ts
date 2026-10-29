interface GoogleConsentState {
  readonly ad_storage: 'denied' | 'granted';
  readonly ad_user_data: 'denied' | 'granted';
  readonly ad_personalization: 'denied' | 'granted';
  readonly analytics_storage: 'denied' | 'granted';
}

/*** Create the single Google consent state used for the site's optional measurement. */
export function createGoogleConsentState(isGranted: boolean): GoogleConsentState {
  const value = isGranted ? 'granted' : 'denied';

  return {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  };
}
