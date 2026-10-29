import { describe, expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { createGoogleAdsPhoneConversionEvent } from '../../src/features/phone/createGoogleAdsPhoneConversionEvent';
import { handlePhoneLinkClick } from '../../src/features/phone/handlePhoneLinkClick';
import { PhoneLink } from '../../src/features/phone/PhoneLink';
import { reportGoogleAdsPhoneConversion } from '../../src/features/phone/reportGoogleAdsPhoneConversion';

type GoogleAdsConversionCall = Extract<
  Parameters<NonNullable<Window['gtag']>>,
  ['event', unknown, unknown]
>;

describe('Google Ads phone conversion', () => {
  test('uses the enabled click-to-call conversion destination', () => {
    expect(createGoogleAdsPhoneConversionEvent()).toEqual({
      send_to: 'AW-18499497170/cWP7CPzmyakdENLZn_VE',
      value: 1,
      currency: 'CHF',
    });
  });

  test('reports one conversion without changing telephone navigation', () => {
    const calls: GoogleAdsConversionCall[] = [];
    const googleTag = (...args: Parameters<NonNullable<Window['gtag']>>) => {
      if (args[0] === 'event') {
        calls.push(args);
      }
    };
    expect(reportGoogleAdsPhoneConversion(googleTag)).toBe(true);

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

  test('does not delay a call when the Google tag is unavailable', () => {
    expect(reportGoogleAdsPhoneConversion(undefined)).toBe(false);
  });

  test.each([
    ['without a decision', false],
    ['after rejection', false],
    ['after withdrawal', false],
  ])('does not report a click %s', (_scenario, hasMeasurementConsent) => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(
      handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent }),
    ).toBe(false);
    expect(reportCount).toBe(0);
  });

  test('does not treat an existing Google tag stub as consent', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(
      handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent: false }),
    ).toBe(false);
    expect(reportCount).toBe(0);
  });

  test('reports exactly once for each consented, unblocked phone click', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(
      handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent: true }),
    ).toBe(true);
    expect(
      handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent: true }),
    ).toBe(true);
    expect(reportCount).toBe(2);
  });

  test('reports only new clicks after consent is granted again', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent: false });
    handlePhoneLinkClick({ defaultPrevented: false, googleTag, hasMeasurementConsent: true });

    expect(reportCount).toBe(1);
  });

  test('does not report a prevented phone click even with consent', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(
      handlePhoneLinkClick({ defaultPrevented: true, googleTag, hasMeasurementConsent: true }),
    ).toBe(false);
    expect(reportCount).toBe(0);
  });

  test.each(['iOS Safari', 'Android Chrome'])(
    'renders a direct native tel link for %s',
    (platform) => {
      const markup = renderToStaticMarkup(createElement(PhoneLink, undefined, platform));

      expect(markup).toContain('href="tel:+41772366068"');
    },
  );
});
