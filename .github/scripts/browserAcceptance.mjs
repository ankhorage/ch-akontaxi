import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { after, test } from 'node:test';

const { chromium } = await import(process.env.AKON_PLAYWRIGHT_MODULE ?? 'playwright');
const browser = await chromium.launch({
  args: ['--no-sandbox'],
  executablePath: process.env.AKON_CHROME_PATH ?? '/usr/bin/google-chrome',
  headless: true,
});
const baseUrl = process.env.AKON_TEST_URL ?? 'http://127.0.0.1:3000';
const artifactDir = process.env.AKON_BROWSER_ARTIFACTS ?? 'performance-artifacts/browser';

await mkdir(artifactDir, { recursive: true });
after(async () => browser.close());

async function screenshot(page, name) {
  await page.screenshot({ path: artifactDir + '/' + name + '.png' });
}

async function verifyHeroImage(profile, viewport, expectedAsset, unexpectedAsset) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const heroRequests = [];
  page.on('request', (request) => {
    if (
      request.url().includes('hero-mobile-approved.webp') ||
      request.url().includes('hero-desktop-approved.webp')
    ) {
      heroRequests.push(request.url());
    }
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('.hero__image').count(), 1);
    assert.equal(await page.locator('.hero picture source').count(), 1);
    assert.equal(await page.locator('h1').isVisible(), true);
    assert.equal(
      await page.locator('h1').evaluate((element) => getComputedStyle(element).opacity),
      '1',
    );
    assert.equal(await page.locator('.hero__call-action').getAttribute('href'), 'tel:+41772366068');
    await page.locator('.hero__image').evaluate((image) => image.decode());

    assert.ok(
      heroRequests.some((url) => url.includes(expectedAsset)),
      profile + ': selected hero was not fetched',
    );
    assert.ok(
      heroRequests.every((url) => !url.includes(unexpectedAsset)),
      profile + ': unnecessary hero was fetched',
    );
    await screenshot(page, profile + '-hero');
  } finally {
    await context.close();
  }
}

test('mobile downloads only the mobile hero and shows the heading without an animation gate', async () => {
  await verifyHeroImage(
    'mobile',
    { width: 390, height: 844 },
    'hero-mobile-approved.webp',
    'hero-desktop-approved.webp',
  );
});

test('desktop downloads only the desktop hero', async () => {
  await verifyHeroImage(
    'desktop',
    { width: 1440, height: 900 },
    'hero-desktop-approved.webp',
    'hero-mobile-approved.webp',
  );
});

test('no JavaScript keeps the hero and scrolled sections visible', async () => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  try {
    await page.goto(baseUrl, { waitUntil: 'load' });
    assert.equal(await page.locator('h1').isVisible(), true);
    assert.equal(await page.locator('.hero__call-action').getAttribute('href'), 'tel:+41772366068');

    const reveal = page.locator('[data-motion-reveal]').last();
    assert.ok((await reveal.count()) > 0, 'expected an animated below-fold section');
    await reveal.scrollIntoViewIfNeeded();
    assert.equal(await reveal.evaluate((element) => getComputedStyle(element).opacity), '1');
    await screenshot(page, 'without-javascript');
  } finally {
    await context.close();
  }
});

test('reduced-motion preference never hides below-fold content', async () => {
  const context = await browser.newContext({
    reducedMotion: 'reduce',
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  try {
    await page.goto(baseUrl, { waitUntil: 'load' });
    const reveal = page.locator('[data-motion-reveal]').last();
    await reveal.scrollIntoViewIfNeeded();
    assert.equal(await reveal.evaluate((element) => getComputedStyle(element).opacity), '1');
    assert.equal(await reveal.evaluate((element) => getComputedStyle(element).transform), 'none');
    await screenshot(page, 'reduced-motion');
  } finally {
    await context.close();
  }
});

test('slow JavaScript does not prevent initial hero paint; scrolled reveals eventually display', async () => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.route('**/_next/static/chunks/**', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.continue();
  });

  try {
    await page.goto(baseUrl, { waitUntil: 'commit' });
    await page.locator('h1').waitFor({ state: 'visible' });
    assert.equal(
      await page.locator('h1').evaluate((element) => getComputedStyle(element).opacity),
      '1',
    );
    await screenshot(page, 'slow-javascript-hero');

    const reveal = page.locator('[data-motion-reveal]').last();
    await page.waitForFunction(
      () => {
        const elements = [...document.querySelectorAll('[data-motion-reveal]')];
        return (
          elements.length > 0 && elements.at(-1)?.getAttribute('data-motion-state') === 'pending'
        );
      },
      undefined,
      { timeout: 20000 },
    );
    await reveal.evaluate((element) => element.scrollIntoView({ block: 'center' }));
    await page.waitForFunction(
      () => {
        const elements = [...document.querySelectorAll('[data-motion-reveal]')];
        const last = elements.at(-1);
        return (
          last?.getAttribute('data-motion-state') === 'visible' &&
          Number(getComputedStyle(last).opacity) > 0.99
        );
      },
      undefined,
      { timeout: 10000 },
    );
    await screenshot(page, 'scroll-reveal');
  } finally {
    await context.close();
  }
});
