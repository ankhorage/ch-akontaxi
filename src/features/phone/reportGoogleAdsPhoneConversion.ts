import { createGoogleAdsPhoneConversionEvent } from './createGoogleAdsPhoneConversionEvent';

interface TimeoutController {
  readonly clearTimeout: (timeout: ReturnType<typeof globalThis.setTimeout>) => void;
  readonly setTimeout: (
    callback: () => void,
    delay: number,
  ) => ReturnType<typeof globalThis.setTimeout>;
}

/*** Report one phone conversion and complete its measurement lifecycle once without controlling navigation. */
export function reportGoogleAdsPhoneConversion(
  googleTag: Window['gtag'],
  onComplete: () => void,
  timeouts: TimeoutController = globalThis,
) {
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
  const timeout = timeouts.setTimeout(
    complete,
    createGoogleAdsPhoneConversionEvent().event_timeout,
  );

  googleTag('event', 'conversion', {
    ...createGoogleAdsPhoneConversionEvent(),
    event_callback: () => {
      timeouts.clearTimeout(timeout);
      complete();
    },
  });

  return true;
}
