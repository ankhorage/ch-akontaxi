import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const [command, label, directory] = process.argv.slice(2);
const url = 'http://127.0.0.1:3000';
const sampleCount = 5;
const metrics = ['performance', 'accessibility', 'seo', 'lcpMs', 'cls', 'tbtMs', 'fcpMs'];

function median(values) {
  const sorted = [...values].sort((left, right) => left - right);
  return sorted[Math.floor(sorted.length / 2)];
}

function parseLighthouse(path) {
  const data = JSON.parse(readFileSync(path, 'utf8'));
  const audit = (id) => data.audits[id]?.numericValue ?? 0;
  for (const id of ['aria-allowed-attr', 'color-contrast']) {
    assert.equal(data.audits[id]?.score, 1, 'accessibility audit failed: ' + id + ' in ' + path);
  }
  return {
    performance: Math.round((data.categories.performance?.score ?? 0) * 100),
    accessibility: Math.round((data.categories.accessibility?.score ?? 0) * 100),
    seo: Math.round((data.categories.seo?.score ?? 0) * 100),
    lcpMs: Math.round(audit('largest-contentful-paint')),
    cls: Number(audit('cumulative-layout-shift').toFixed(3)),
    tbtMs: Math.round(audit('total-blocking-time')),
    fcpMs: Math.round(audit('first-contentful-paint')),
  };
}

function collectSeries() {
  assert.ok(label === 'baseline' || label === 'candidate', 'invalid series label');
  mkdirSync(directory, { recursive: true });
  const series = {};

  for (const profile of ['mobile', 'desktop']) {
    const runs = [];
    for (const number of Array.from({ length: sampleCount }, (_, index) => index + 1)) {
      const outputPath = join(directory, label + '-' + profile + '-' + number + '.json');
      const argumentsList = [
        'exec',
        '--yes',
        '--package=lighthouse@13.5.0',
        '--',
        'lighthouse',
        url,
        '--only-categories=performance,accessibility,seo',
        '--output=json',
        '--output-path=' + outputPath,
        '--chrome-flags=--headless --no-sandbox',
        '--quiet',
        ...(profile === 'desktop' ? ['--preset=desktop'] : []),
      ];
      console.log(label + ' / ' + profile + ' / run ' + number + '/' + sampleCount);
      execFileSync('npm', argumentsList, { stdio: 'inherit', timeout: 180000 });
      const result = parseLighthouse(outputPath);
      console.log(JSON.stringify(result));
      runs.push(result);
    }
    series[profile] = {
      runs,
      median: Object.fromEntries(
        metrics.map((metric) => [metric, median(runs.map((result) => result[metric]))]),
      ),
    };
  }

  const summary = { label, sampleCount, url, lighthouseVersion: '13.5.0', series };
  writeFileSync(join(directory, label + '-median.json'), JSON.stringify(summary, null, 2) + '\n');
}

function compareSeries() {
  const baseline = JSON.parse(readFileSync(join(directory, 'baseline-median.json'), 'utf8'));
  const candidate = JSON.parse(readFileSync(join(directory, 'candidate-median.json'), 'utf8'));
  assert.equal(baseline.sampleCount, sampleCount);
  assert.equal(candidate.sampleCount, sampleCount);

  const rows = [
    '| Profile / metric | Baseline median | Candidate median | Delta |',
    '| --- | ---: | ---: | ---: |',
  ];
  for (const profile of ['mobile', 'desktop']) {
    for (const metric of metrics) {
      const before = baseline.series[profile].median[metric];
      const after = candidate.series[profile].median[metric];
      rows.push(
        '| ' +
          profile +
          ' / ' +
          metric +
          ' | ' +
          before +
          ' | ' +
          after +
          ' | ' +
          Number((after - before).toFixed(3)) +
          ' |',
      );
    }
  }

  const summary = [
    '## Paired AKON TAXI Lighthouse acceptance',
    '',
    'Five runs per profile and revision, on the same GitHub Actions runner / Chrome version.',
    'The baseline and candidate use separate production builds, identical localhost delivery, and warmed image caches.',
    '',
    ...rows,
    '',
    'Raw Lighthouse JSON and screenshots are attached to this workflow run.',
    'Lab scores and medians do not imply a production field-data guarantee.',
    '',
  ].join('\n');
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) {
    writeFileSync(process.env.GITHUB_STEP_SUMMARY, summary, { flag: 'a' });
  }

  for (const profile of ['mobile', 'desktop']) {
    const before = baseline.series[profile].median;
    const after = candidate.series[profile].median;
    assert.equal(before.accessibility, 100, profile + ': baseline accessibility');
    assert.equal(after.accessibility, 100, profile + ': candidate accessibility');
    assert.equal(before.seo, 100, profile + ': baseline SEO');
    assert.equal(after.seo, 100, profile + ': candidate SEO');
    assert.ok(after.performance >= before.performance - 2, profile + ': performance regression');
    assert.ok(
      after.lcpMs <= before.lcpMs + (profile === 'mobile' ? 100 : 250),
      profile + ': LCP regression',
    );
    assert.ok(after.cls <= before.cls + 0.01, profile + ': CLS regression');
  }

  assert.ok(
    candidate.series.mobile.median.tbtMs <= baseline.series.mobile.median.tbtMs + 150,
    'mobile: TBT regression',
  );
  console.log('Five-run median guardrails passed.');
}

if (command === 'collect') {
  collectSeries();
} else if (command === 'compare') {
  compareSeries();
} else {
  throw new Error(
    'Usage: lighthouseAcceptance.mjs <collect|compare> <baseline|candidate|unused> <directory>',
  );
}
