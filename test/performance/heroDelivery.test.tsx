import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import nextConfig from '../../next.config';
import { Hero } from '../../src/features/home/Hero';

describe('Responsive hero delivery', () => {
  test('selects one mobile or desktop asset with picture art direction', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('<picture>');
    expect(markup).toContain('media="(max-width: 860px)"');
    expect(markup).toContain('hero-mobile-approved.webp');
    expect(markup).toContain('hero-desktop-approved.webp');
    expect(markup.match(/<img\b/g)).toHaveLength(1);
    expect(markup.match(/<source\b/g)).toHaveLength(1);
    expect(markup).toContain('fetchPriority="high"');
    expect(markup).toContain('loading="eager"');
    expect(markup).toContain('decoding="sync"');
  });

  test('renders the headline and native phone link without an opacity-zero motion wrapper', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('Taxi Wetzikon. Persönlich. Lokal. Direkt erreichbar.');
    expect(markup).toContain('href="tel:+41772366068"');
    expect(markup).toContain('class="hero__content"');
    expect(markup).not.toContain('data-motion-reveal');
  });

  test('supports the lower mobile image quality without changing desktop quality', () => {
    expect(nextConfig.images?.qualities).toEqual([60, 75]);
  });
});
