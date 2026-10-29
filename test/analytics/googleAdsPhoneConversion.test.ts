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
      event_timeout: 500,
    });
  });

  test('reports one conversion and resumes the call once when Google Ads confirms it', () => {
    const calls: GoogleAdsConversionCall[] = [];
    const googleTag = (...args: Parameters<NonNullable<Window['gtag']>>) => {
      if (args[0] === 'event') {
        calls.push(args);
      }
    };
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

  test('uses the configured 500-ms timeout and completes only once when callback and timeout race', () => {
    const calls: GoogleAdsConversionCall[] = [];
    const googleTag = (...args: Parameters<NonNullable<Window['gtag']>>) => {
      if (args[0] === 'event') {
        calls.push(args);
      }
    };
    const scheduled: Array<() => void> = [];
    const cleared: Array<ReturnType<typeof setTimeout>> = [];
    let completionCount = 0;

    reportGoogleAdsPhoneConversion(googleTag, () => (completionCount += 1), {
      setTimeout: (callback, delay) => {
        expect(delay).toBe(500);
        scheduled.push(callback);
        return 1 as unknown as ReturnType<typeof setTimeout>;
      },
      clearTimeout: (timeout) => cleared.push(timeout),
    });

    const eventCallback = calls[0]?.[2].event_callback;
    eventCallback?.();
    scheduled[0]?.();

    expect(cleared).toHaveLength(1);
    expect(completionCount).toBe(1);
  });

  test('does not delay a call when the Google tag is unavailable', () => {
    expect(reportGoogleAdsPhoneConversion(undefined, () => undefined)).toBe(false);
  });

  test('does not report a prevented phone click', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(handlePhoneLinkClick({ defaultPrevented: true, googleTag })).toBe(false);
    expect(reportCount).toBe(0);
  });

  test('keeps native telephone navigation untouched while reporting an allowed click', () => {
    let reportCount = 0;
    const googleTag = (..._args: Parameters<NonNullable<Window['gtag']>>) => (reportCount += 1);

    expect(handlePhoneLinkClick({ defaultPrevented: false, googleTag })).toBe(true);
    expect(reportCount).toBe(1);
  });

  test.each(['iOS Safari', 'Android Chrome'])(
    'renders a direct native tel link for %s',
    (platform) => {
      const markup = renderToStaticMarkup(createElement(PhoneLink, undefined, platform));

      expect(markup).toContain('href="tel:+41772366068"');
    },
  );
});
