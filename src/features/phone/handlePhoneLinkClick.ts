import { reportGoogleAdsPhoneConversion } from './reportGoogleAdsPhoneConversion';

interface PhoneLinkClickInput {
  readonly defaultPrevented: boolean;
  readonly googleTag: Window['gtag'];
  readonly hasMeasurementConsent: boolean;
}

/*** Report an allowed call interaction without interrupting the browser's native telephone navigation. */
export function handlePhoneLinkClick({
  defaultPrevented,
  googleTag,
  hasMeasurementConsent,
}: PhoneLinkClickInput) {
  return hasMeasurementConsent && !defaultPrevented && reportGoogleAdsPhoneConversion(googleTag);
}
