# SEO

## Objective

AKON TAXI should be easy to discover for people who genuinely need a taxi in Wetzikon and the
Zürcher Oberland. The primary search intent is `taxi wetzikon`; secondary intents are evaluated
only when they describe services AKON TAXI actually provides.

SEO work must remain people-first. It must not introduce keyword stuffing, doorway pages, fake
reviews, fabricated business details, link schemes, or claims that cannot be verified.

## Baseline — 2026-10-06

### Search goals

Primary query family:

- `taxi wetzikon`
- `taxi in wetzikon`
- `taxi wetzikon telefon`

Candidate secondary query families, subject to service verification before dedicated content exists:

- `taxi wetzikon bahnhof`
- `taxi zürcher oberland`
- `taxi wetzikon flughafen`

Primary conversion:

- a visitor starts a phone call through a `tel:` link.

Secondary conversion:

- a visitor reaches the contact section and uses the prominently displayed phone number.

### Public search visibility

A public search snapshot on 2026-10-06 did not surface `akontaxi.ch` for `site:akontaxi.ch`,
`"akontaxi.ch" "Taxi Wetzikon"`, or `"AKON TAXI" Wetzikon` in the retrieved results.
Unrelated businesses using the "Akon Taxi" name in Germany did surface for branded queries.

This makes two early priorities explicit:

1. get the canonical Wetzikon site crawled and indexed;
2. make the Wetzikon entity and service area unambiguous in visible content and structured data.

Search-engine visibility is expected to change over time, so this snapshot is a baseline rather than
a permanent assertion.

### Repository baseline

The current application already provides:

- Next.js 16 App Router server rendering;
- canonical metadata for `https://akontaxi.ch`;
- title and description metadata;
- index/follow and Googlebot directives;
- generated `robots.txt` and `sitemap.xml`;
- Open Graph and Twitter metadata;
- a generated social image;
- `TaxiService` JSON-LD;
- `next/image` and `next/font`.

The SEO program audits and hardens these foundations rather than replacing working primitives.

## Production smoke checks

`.github/workflows/seo.yml` is the canonical network-level smoke check. It verifies:

- the canonical homepage returns HTTP 200;
- HTTP redirects to HTTPS without a redirect chain;
- `robots.txt` returns HTTP 200 and advertises the canonical sitemap;
- `sitemap.xml` returns HTTP 200 and contains the canonical homepage;
- an unknown route returns HTTP 404 rather than a soft 404;
- Googlebot receives the same public homepage body as a normal crawler.

These checks intentionally live outside the deterministic application test suite because they
validate the deployed public edge rather than local application behavior.

## Measurement principles

- Prefer Search Console query/page data over personalized manual searches.
- Treat Core Web Vitals as user-experience measures, not a promise of ranking.
- Use current metrics: LCP, INP and CLS. FID is historical course material and is not a current Core
  Web Vital.
- Capture measurements before and after performance work.
- Do not add analytics or third-party scripts unless their decision value exceeds their performance
  and privacy cost.

## External setup status

Google Business Profile and Search Console require account-level ownership/verification. Repository
work can prepare and document them, but they must not be marked complete until the real external
state is verified.
