import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import nextConfig from '../../next.config';
import { Hero } from '../../src/features/home/Hero';
import { MotionReveal } from '../../src/features/home/MotionReveal';

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
    expect(markup).toContain('decoding="async"');
  });

  test('renders the headline and native phone link without an opacity-zero motion wrapper', () => {
    const markup = renderToStaticMarkup(<Hero />);

    expect(markup).toContain('Taxi Wetzikon. Persönlich. Lokal. Direkt erreichbar.');
    expect(markup).toContain('href="tel:+41772366068"');
    expect(markup).toContain('class="hero__content"');
    expect(markup).not.toContain('data-motion-reveal');
  });

  test('keeps below-fold sections visible before JavaScript hydration', () => {
    const markup = renderToStaticMarkup(
      <MotionReveal direction="left" delay={0.08}>
        Service-Angebote
      </MotionReveal>,
    );

    expect(markup).not.toContain('data-motion-state="pending"');
    expect(markup).toContain('data-motion-reveal');
    expect(markup).toContain('--reveal-x:-24px');
    expect(markup).toContain('--reveal-delay:0.08s');
    expect(markup).not.toContain('opacity:0');
  });

  test('supports the lower mobile image quality without changing desktop quality', () => {
    expect(nextConfig.images?.qualities).toEqual([60, 75]);
  });
});
