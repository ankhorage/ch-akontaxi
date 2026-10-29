import { createGoogleAdsPhoneConversionEvent } from './createGoogleAdsPhoneConversionEvent';

/*** Report one phone conversion and resume the telephone navigation when Google Ads completes or times out. */
export function reportGoogleAdsPhoneConversion(googleTag: Window['gtag'], onComplete: () => void) {
  if (!googleTag) {
    return false;
  }

  let isComplete = false;
  const complete = () => {
    if (!isComplete) {
      isComplete = true;
      onComplete();
    }
  };
  const timeout = globalThis.setTimeout(
    complete,
    createGoogleAdsPhoneConversionEvent().event_timeout,
  );

  googleTag('event', 'conversion', {
    ...createGoogleAdsPhoneConversionEvent(),
    event_callback: () => {
      globalThis.clearTimeout(timeout);
      complete();
    },
  });

  return true;
}
