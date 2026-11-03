import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { BrandLogo } from '../../src/features/brand/BrandLogo';

/*** Calculate WCAG relative luminance for an opaque six-digit CSS color. */
function luminance(hex: string): number {
  const [red, green, blue] = [1, 3, 5]
    .map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
  if (red === undefined || green === undefined || blue === undefined)
    throw new Error('Invalid contrast color');
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

/*** Compute WCAG text contrast for opaque foreground/background pairs. */
function contrastRatio(foreground: string, background: string): number {
  const [lighter, darker] = [luminance(foreground), luminance(background)].toSorted(
    (left, right) => right - left,
  );
  if (lighter === undefined || darker === undefined) throw new Error('Invalid contrast pair');
  return (lighter + 0.05) / (darker + 0.05);
}

/*** Read a color token from a light or dark CSS root block. */
function rootColor(block: string, token: string): string {
  const match = block.match(new RegExp(`--${token}:\\s*(#[a-fA-F0-9]{6})`));
  if (match?.[1] === undefined) throw new Error(`Missing CSS color token: ${token}`);
  return match[1];
}

describe('Brand wordmark accessibility', () => {
  test.each([false, true])('exposes one correctly named image in compact=%s mode', (compact) => {
    const markup = renderToStaticMarkup(<BrandLogo compact={compact} />);

    expect(markup).toContain('class="brand-logo" role="img" aria-label="AKON TAXI"');
    expect(markup).toContain('class="brand-logo__mark" aria-hidden="true"');
    if (!compact) expect(markup).toContain('class="brand-logo__words" aria-hidden="true"');
  });

  test('meets WCAG AA text contrast on paper in light and dark mode', async () => {
    const css = await Bun.file(new URL('../../src/app/globals.css', import.meta.url)).text();
    const rootBlocks = [...css.matchAll(/:root\s*\{([^}]*)\}/g)].map((match) => match[1]);

    expect(rootBlocks).toHaveLength(2);
    expect(css).toContain('color: var(--yellow-strong);');
    for (const block of rootBlocks) {
      if (block === undefined) throw new Error('Missing root CSS');
      expect(
        contrastRatio(rootColor(block, 'yellow-strong'), rootColor(block, 'paper')),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
