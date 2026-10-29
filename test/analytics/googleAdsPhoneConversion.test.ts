import { describe, expect, test } from 'bun:test';

import { createGoogleAdsPhoneConversionEvent } from '../../src/features/phone/createGoogleAdsPhoneConversionEvent';
import { reportGoogleAdsPhoneConversion } from '../../src/features/phone/reportGoogleAdsPhoneConversion';

describe('Google Ads phone conversion', () => {
  test('uses the enabled click-to-call conversion destination', () => {
    expect(createGoogleAdsPhoneConversionEvent()).toEqual({
      send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
      value: 1,
      currency: 'CHF',
      event_timeout: 500,
    });
  });

  test('reports one conversion and resumes the call once when Google Ads confirms it', () => {
    const calls: Parameters<NonNullable<Window['gtag']>>[] = [];
    const googleTag = (...args: Parameters<NonNullable<Window['gtag']>>) => calls.push(args);
    let completionCount = 0;

    expect(reportGoogleAdsPhoneConversion(googleTag, () => (completionCount += 1))).toBe(true);

    expect(calls).toEqual([
      [
        'event',
        'conversion',
        {
          send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
          value: 1,
          currency: 'CHF',
          event_timeout: 500,
          event_callback: expect.any(Function),
        },
      ],
    ]);

    const eventCallback = calls[0]?.[2].event_callback;
    eventCallback?.();
    eventCallback?.();

    expect(completionCount).toBe(1);
  });

  test('does not delay a call when the Google tag is unavailable', () => {
    expect(reportGoogleAdsPhoneConversion(undefined, () => undefined)).toBe(false);
  });
});
