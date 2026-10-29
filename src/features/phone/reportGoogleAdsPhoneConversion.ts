import { createGoogleAdsPhoneConversionEvent } from './createGoogleAdsPhoneConversionEvent';

/*** Report one phone conversion through the already configured Google Ads tag. */
export function reportGoogleAdsPhoneConversion(googleTag: Window['gtag']) {
  googleTag?.('event', 'conversion', createGoogleAdsPhoneConversionEvent());
}
