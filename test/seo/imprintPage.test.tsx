import { describe, expect, test } from 'bun:test';
import { renderToStaticMarkup } from 'react-dom/server';

import { BUSINESS } from '../../src/constants/business';
import { SiteFooter } from '../../src/features/home/SiteFooter';
import { ImprintPage } from '../../src/features/legal/ImprintPage';

describe('Impressum route', () => {
  test('links the legal notice from the shared footer', () => {
    const html = renderToStaticMarkup(<SiteFooter />);

    expect(html).toContain('href="/impressum"');
    expect(html).toContain('>Impressum</a>');
    expect(html).toContain('Inhaber: Akan Usumez');
  });

  test('shows confirmed proprietor, address and contact details with a route home', () => {
    const html = renderToStaticMarkup(<ImprintPage />);

    expect(html).toContain('<h1>Impressum</h1>');
    expect(html).toContain(BUSINESS.name);
    expect(html).toContain(BUSINESS.phoneHref);
    expect(html).toContain(BUSINESS.phoneDisplay);
    expect(html).toContain('Inhaber: Akan Usumez');
    expect(html).toContain('Rechtsform: Einzelunternehmen');
    expect(html).toContain('Ankengasse 15');
    expect(html).toContain('8623 Wetzikon ZH');
    expect(html).toContain('usunezakan@gmail.com');
    expect(html).toContain('href="mailto:usunezakan@gmail.com"');
    expect(html).not.toContain('usumezakan@gmail.com');
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/impressum"');
  });
});
