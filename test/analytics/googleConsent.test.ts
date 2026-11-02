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

  test('renders no consent overlay or optional measurement while campaigns are paused', () => {
    const markup = renderToStaticMarkup(
      createElement(
        ConsentManager,
        { measurementEnabled: false },
        createElement('a', { href: 'tel:+41772366068' }, '077 236 60 68'),
      ),
    );

    expect(markup).toContain('href="tel:+41772366068"');
    expect(markup).not.toContain('consent-manager');
    expect(markup).not.toContain('googletagmanager.com');
    expect(markup).not.toContain('vercel');
  });

  test('keeps all optional measurement unloaded until opt-in even when enabled', () => {
    const markup = renderToStaticMarkup(createElement(ConsentManager, { measurementEnabled: true }));

    expect(markup).not.toContain('googletagmanager.com');
    expect(markup).not.toContain('vercel');
  });

  test('does not use a full-screen modal for the optional consent panel', async () => {
    const stylesheet = await Bun.file(new URL('../../src/app/globals.css', import.meta.url)).text();
    const panel = stylesheet.split('.consent-manager {')[1]?.split('}', 1)[0] ?? '';

    expect(panel).toContain('position: fixed');
    expect(panel).not.toContain('inset: 0');
    expect(panel).toContain('max-height:');
  });
});
