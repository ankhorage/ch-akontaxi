import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { BUSINESS } from '../../src/constants/business';
import { ServiceSection } from '../../src/features/home/ServiceSection';

describe('Local search content', () => {
  test('renders verified local service context and a direct enquiry path', () => {
    const html = renderToStaticMarkup(<ServiceSection />);

    expect(html).toContain('Taxi in Wetzikon');
    expect(html).toContain('Zürcher Oberland');
    expect(html).toContain('Ziel nicht aufgeführt?');
    expect(html).toContain(BUSINESS.phoneDisplay);
    expect(html).toContain(BUSINESS.phoneHref);
  });
});
