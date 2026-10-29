import { createGoogleAdsPhoneConversionEvent } from './createGoogleAdsPhoneConversionEvent';

/*** Report one consented phone conversion without controlling telephone navigation. */
export function reportGoogleAdsPhoneConversion(googleTag: Window['gtag']) {
  if (!googleTag) {
    return false;
  }

  googleTag('event', 'conversion', createGoogleAdsPhoneConversionEvent());

  return true;
}
