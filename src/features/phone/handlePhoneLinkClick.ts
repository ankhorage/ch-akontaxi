import { reportGoogleAdsPhoneConversion } from './reportGoogleAdsPhoneConversion';

interface PhoneLinkClickInput {
  readonly defaultPrevented: boolean;
  readonly googleTag: Window['gtag'];
}

/*** Report an allowed call interaction without interrupting the browser's native telephone navigation. */
export function handlePhoneLinkClick({ defaultPrevented, googleTag }: PhoneLinkClickInput) {
  return !defaultPrevented && reportGoogleAdsPhoneConversion(googleTag, () => undefined);
}
