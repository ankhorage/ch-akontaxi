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

## Rendering and on-page decisions

The homepage is rendered with the Next.js App Router and server components. Its primary business
copy, headings, navigation and phone actions are present in the HTML response and do not depend on
client-side JavaScript before crawlers can understand the page.

The homepage has one H1 and uses the natural primary intent `Taxi Wetzikon` directly in that
heading. Supporting copy uses Wetzikon, Taxi/Fahrservice and Zürcher Oberland only where those words
describe useful information for a visitor.

AMP is intentionally not used. The canonical responsive page is the single experience to optimize,
with Core Web Vitals and accessibility used as quality constraints.

The root URL remains the only canonical content route until a separate route can provide unique,
factually verified user value. Search-keyword variants alone are not a reason to create another URL.

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

## Performance baseline

The dedicated SEO workflow records repeatable Lighthouse 13.5.0 lab reports against the canonical
production URL for both mobile and desktop profiles. Raw JSON reports plus a normalized
`baseline.json` are uploaded as the `lighthouse-baseline` workflow artifact, and the key values are
written to the GitHub job summary.

Current Core Web Vitals field targets are evaluated at the 75th percentile separately for mobile and
desktop:

- LCP: at most 2.5 seconds;
- INP: at most 200 milliseconds;
- CLS: at most 0.1.

Lighthouse is a controlled lab audit and therefore does not replace field data. It records Total
Blocking Time (TBT) as a diagnostic for main-thread work, but TBT must not be reported as INP.
Search Console/CrUX field data becomes authoritative for real-user Core Web Vitals when enough
traffic exists.

Performance changes must be driven by measured bottlenecks. A higher synthetic score alone is not
a product requirement and does not imply a guaranteed search-ranking improvement.

### Recorded baseline

First Lighthouse 13.5.0 production measurement on 2026-10-06 using Chrome 154:

- Mobile: performance 83, SEO 100, LCP 2035 ms, CLS 0, TBT 640 ms, FCP 930 ms.
- Desktop: performance 100, SEO 100, LCP 456 ms, CLS 0, TBT 0 ms, FCP 251 ms.

The mobile LCP is already inside the 2.5 second field target in this lab run, while the 640 ms TBT
shows the clearest synthetic optimization opportunity. CLS is zero in both profiles. Subsequent
work units should therefore prioritize measured mobile main-thread/loading cost without degrading
the already strong SEO and layout-stability results.

## Image and font loading audit

The two hero photographs are alternative art-direction assets for different viewport widths. With
Next.js 16 they intentionally do not use the deprecated `priority` prop or preload both candidates.
Both keep normal lazy discovery with `fetchPriority="high"`, allowing the browser to prioritize the
candidate that actually applies without forcing both images into the preload queue.

The vehicle image is below the hero and uses the default lazy-loading behavior. It is not an LCP
candidate and is therefore not promoted into the initial critical request set.

All visible photographs continue to use `next/image` with responsive `sizes` and modern image
formats. The site font is loaded through `next/font` with the Latin subset and `display: swap`;
there is no runtime request to Google Fonts CSS. No extra font optimization is added without a
measured need.

## JavaScript and third-party audit

The current public site has no Client Component boundary, no `"use client"` modules, no
`next/script` usage, no analytics SDK and no other third-party browser script. Its visible content
and phone actions are ordinary server-rendered HTML.

Dynamic imports would therefore add complexity without reducing a real initial client bundle. They
are intentionally not introduced. If a future feature adds optional client-side behavior, it should
be measured first and split only when doing so materially improves the initial experience.

The legacy FID course chapter is evaluated through the current INP model. Lighthouse TBT remains a
lab diagnostic only; real-user INP must come from field data when sufficient traffic exists.

## Layout stability and candidate measurement

The production baseline reports CLS 0 on both mobile and desktop. The current layout already reserves
space for the hero and vehicle media through positioned containers, explicit minimum heights or
aspect ratios, and Next Image sizing. Font loading uses `display: swap`. No speculative CLS
workaround is justified while the measured value is zero.

The SEO workflow now measures two separate targets on every pull request:

- `lighthouse-baseline`: the current canonical production deployment;
- `lighthouse-candidate`: a local production build from the exact pull-request head.

This keeps the production baseline stable while making performance regressions in unmerged code
visible. Candidate measurements run one warm-up audit per profile before the recorded audit because
Next Image optimization is on-demand and a cold local image-transform request is not representative
of the steady production build. Synthetic score variance is still expected, so decisions should
prioritize persistent changes in LCP, CLS and main-thread diagnostics rather than a single score
fluctuation.

## Production monitoring

The SEO validation workflow runs on pull requests, manually, and every Monday at 05:17 UTC. The
scheduled run continuously checks the public production edge and records mobile/desktop Lighthouse
reports even when no code change is in flight.

Monitoring ownership is intentionally split by signal:

- GitHub Actions owns repeatable production HTTP, crawler and Lighthouse checks.
- Google Search Console should own indexing, query, click, impression, CTR and search-position data.
- CrUX should own real-user Core Web Vitals once the origin has enough eligible traffic.
- Lighthouse remains a lab diagnostic and is not treated as field telemetry.

Vercel Speed Insights is not enabled at this stage. The site currently has no client-side application
code or third-party analytics script, and adding browser telemetry solely to reproduce signals that
Search Console/CrUX can provide would increase client work without a demonstrated decision benefit.
This decision should be revisited only when field observability is insufficient for an actual product
or performance question.

Custom Web Vitals reporting is also intentionally deferred. It becomes justified only when AKON TAXI
needs per-route or conversion-correlated field measurements that the platform/search tools cannot
answer. Until then, keeping the public page script-free is the stronger performance and privacy
default.

CrUX/Looker Studio reporting is conditional on origin-level CrUX eligibility. A new or low-traffic
origin may legitimately have no CrUX dataset; absence of data must not be represented as zero or as
a successful Core Web Vitals assessment.

## Structured data

The homepage has one canonical structured-data owner:
`src/features/seo/createTaxiStructuredData.ts`.

The page describes the offered service as Schema.org `TaxiService`. The business identity is
represented as the service `provider`, including the verified name, canonical URL, international
telephone number and logo. The telephone is intentionally attached to the provider rather than the
service itself.

The service declares Wetzikon and the Zürcher Oberland as the verified service area and uses
`providerMobility: dynamic`, which matches a taxi service that moves to customers.

Google's LocalBusiness rich-result documentation requires an address for LocalBusiness eligibility.
AKON TAXI does not add a LocalBusiness address until a real public business location/address has
been verified for publication. The markup therefore does not invent an address merely to satisfy a
rich-result validator.

The structured data also omits aggregate ratings, opening hours and price ranges until those values
are both factual and intentionally published on the site.

## Local content and route strategy

The homepage remains the canonical landing page for the verified core intents around Taxi Wetzikon,
telephone contact and general service in the Zürcher Oberland. It now explicitly tells visitors how
to ask about a destination that is not listed instead of pretending every possible route is
guaranteed.

Dedicated search landing pages are created only when all of these are true:

1. AKON TAXI genuinely offers the service or journey category;
2. the page can answer a distinct user need with unique factual content;
3. the page can be linked naturally from the public navigation/content;
4. its metadata and sitemap entry have one canonical URL.

`taxi wetzikon bahnhof` and `taxi wetzikon flughafen` remain candidate intents, not current route
names. A Bahnhof or airport page would be added only after the corresponding service details are
verified. Creating near-duplicate city or keyword pages solely to rank for variants is explicitly
out of scope.

## Google local search setup

Status on 2026-10-06: Search Console and Google Business Profile are connected and verified enough
for the current SEO handoff. The profile is active and managed; Google currently reports pending
edits after the category/profile updates.

### Google Search Console

Verified through the connected property `sc-domain:akontaxi.ch`:

- Domain property exists and is readable.
- `https://akontaxi.ch/sitemap.xml` is submitted and downloaded successfully.
- Sitemap warnings: 0.
- Sitemap errors: 0.
- URL Inspection for `https://akontaxi.ch/` returns `PASS`.
- Coverage state: `Submitted and indexed`.
- Robots state: `ALLOWED`.
- Indexing state: `INDEXING_ALLOWED`.
- Page fetch state: `SUCCESSFUL`.
- Crawled as: mobile.

The sitemap aggregate can lag URL Inspection. At the time of verification it still reported one
submitted URL and zero indexed URLs while URL Inspection already reported the homepage as submitted
and indexed. The URL-specific inspection is the stronger current signal.

The first available 28-day Search Console performance baseline currently contains zero clicks and
zero impressions. This is expected for the new property and must not be treated as a mature
performance baseline.

### Google Business Profile

Verified through the connected `Akon Taxi` profile:

- Profile title: `Akon Taxi`.
- Primary category: `Taxiservice` (`gcid:taxi_service`).
- Website: `https://akontaxi.ch/`.
- Phone: `077 236 60 68`.
- Business model: pure service-area business (`CUSTOMER_LOCATION_ONLY`).
- Public address: none.
- Service area: Wetzikon, Schweiz.
- Opening hours: 24 hours, seven days a week.
- Open status: `OPEN`.
- Voice of Merchant: enabled.
- Current Google state: pending edits after profile changes.

The profile description is now:

> AKON TAXI ist Ihr persönliches Taxi in Wetzikon und im Zürcher Oberland. Fahrten werden direkt
> telefonisch vereinbart: Abholort, Ziel und Zeitpunkt persönlich klären. Lokal erreichbar und
> unkompliziert buchbar.

Two verified services are published:

- Taxi in Wetzikon;
- Fahrten im Zürcher Oberland.

The profile intentionally keeps no public street address because AKON TAXI has no customer-facing
business location. Bahnhof/Bahnhofstrasse is treated as an operating/collection area, not as a
business address.

### Media and reviews

The profile exposes one normal business photo through the Business Profile API. The owner also
confirmed a logo is present in the Business Profile UI; Windsor does not currently return it as a
separate `LOGO` media row.

There are currently no reviews. Google already exposes the official review-request URL for the
profile, so the review process is ready: after completed rides, real customers can be asked for an
honest review without incentives or review gating.

Local citations should keep the exact AKON TAXI name, phone and canonical website consistent and
should only be created in trustworthy directories where the business is genuinely eligible.

## Final technical handoff

The implementation covers the technical substance of all 33 Next.js SEO course chapters using
current Next.js 16 and current Core Web Vitals terminology.

Search Console is verified, the sitemap is accepted without warnings/errors, URL Inspection reports
the homepage as submitted and indexed, and the Google Business Profile now uses the correct taxi
category with verified service-area, description, services and 24/7 opening hours.

Latest recorded PR-candidate Lighthouse run before final verification:

- Mobile: performance 98, SEO 100, LCP 2369 ms, CLS 0, TBT 54 ms, FCP 762 ms.
- Desktop: performance 100, SEO 100, LCP 509 ms, CLS 0, TBT 0 ms, FCP 215 ms.

These are lab measurements and may vary between runs. The final candidate check asserts the rendered
application directly for canonical metadata, absence of accidental noindex, Taxi Wetzikon H1,
TaxiService structured data, phone/internal links, robots, sitemap, Open Graph image and a real 404.

### Intentionally not implemented

- AMP: the responsive canonical page is the only experience and is optimized directly.
- Dynamic imports: there is no meaningful client application bundle to split.
- Vercel Speed Insights: deferred while Search Console/CrUX plus Lighthouse answer current questions.
- Custom Web Vitals reporting: deferred until a real field-observability gap exists.
- Keyword/location doorway pages: prohibited unless a route has distinct verified user value.
- A fabricated LocalBusiness address or station pin: prohibited because AKON TAXI has no public
  customer-facing business location.

Technical SEO and local-search setup are ready for review. Google may continue processing the
Business Profile pending edits asynchronously after this handoff.
