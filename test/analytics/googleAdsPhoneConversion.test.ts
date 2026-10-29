import { describe, expect, test } from 'bun:test';

import { createGoogleAdsPhoneConversionEvent } from '../../src/features/phone/createGoogleAdsPhoneConversionEvent';
import { reportGoogleAdsPhoneConversion } from '../../src/features/phone/reportGoogleAdsPhoneConversion';

describe('Google Ads phone conversion', () => {
  test('uses the enabled click-to-call conversion destination', () => {
    expect(createGoogleAdsPhoneConversionEvent()).toEqual({
      send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
      value: 1,
      currency: 'CHF',
    });
  });

  test('reports exactly one conversion event without a navigation callback', () => {
    const calls: Parameters<NonNullable<Window['gtag']>>[] = [];
    const googleTag = (...args: Parameters<NonNullable<Window['gtag']>>) => calls.push(args);

    reportGoogleAdsPhoneConversion(googleTag);

    expect(calls).toEqual([
      [
        'event',
        'conversion',
        {
          send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
          value: 1,
          currency: 'CHF',
        },
      ],
    ]);
  });
});
