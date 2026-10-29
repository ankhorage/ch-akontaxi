import { describe, expect, test } from 'bun:test';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import { ConsentManager } from '../../src/features/consent/ConsentManager';
import { createGoogleConsentState } from '../../src/features/consent/createGoogleConsentState';

describe('Google consent state', () => {
  test('denies every Google storage and data use purpose by default', () => {
    expect(createGoogleConsentState(false)).toEqual({
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
  });

  test('grants every Google purpose only after an explicit acceptance', () => {
    expect(createGoogleConsentState(true)).toEqual({
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  });

  test('does not render optional Google or Vercel measurement before the visitor chooses', () => {
    const markup = renderToStaticMarkup(createElement(ConsentManager));

    expect(markup).not.toContain('googletagmanager.com');
    expect(markup).not.toContain('vercel');
    expect(markup).toContain('Datenschutz-Einstellungen');
  });
});
