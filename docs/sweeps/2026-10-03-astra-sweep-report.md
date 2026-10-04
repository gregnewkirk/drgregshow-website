# Astra quality sweep

Date: 2026-10-03. Worktree: `drgregshow-website-astra-sweep`, branch `astra-sweep`.

## Scope and baseline

The worktree started clean. No `ASTRA_AUDIT_FINDINGS.md` or repository-local `AGENTS.md` was present. Existing tests were attempted before changes. The first `npm test` exited 127 because dependencies were absent. `npm ci --ignore-scripts --cache .cache/npm --no-audit --no-fund` installed the existing lockfile without changing either dependency manifest. The cache was subsequently moved under ignored `node_modules/.cache/astra-sweep/`.

| Check | Before changes | After changes |
| --- | --- | --- |
| `npm test` | 38 passed, 7 files | 147 passed, 17 files |
| `npm run lint` | 0 errors, 12 warnings | 0 errors, same 12 warnings |
| `npm run lint:copy` | Passed | Passed |
| `tsc --noEmit --incremental false` | Passed | Passed |
| `NEXT_TELEMETRY_DISABLED=1 npm run build` | Passed | Passed, 37 static pages generated |
| `check-routes.mjs` against local production server | Passed | Passed |
| `npm audit --json` | 19 findings: 1 critical, 13 high, 4 moderate, 1 low | Dependency versions unchanged; findings remain |

The lint warnings are the existing globals in `public/dashboard/content.js`. Its separate HTML scripts consume them, so removing them as dead code would break the dashboard.

## Proven defects and fixes

1. **Repeated and long search query parameters.** `/search?q=a&q=b` supplied an array to code expecting a string and threw at `trim()`. Queries over 80 characters differed between the page and the API's echoed query, preventing results from leaving the loading state. A shared normalizer selects the first query value, trims it, applies the existing 80-character limit, and trims the result again. The page and API now agree, including at a whitespace boundary. Files: `src/lib/search.ts`, `src/app/search/page.tsx`, `src/app/api/search/route.ts`.

   Final review also reproduced an emoji split at the 80-code-unit boundary, causing `encodeURIComponent` to throw `URIError`. A regression failed before dropping a trailing high surrogate created by truncation. This preserves the existing size limit and valid complete emoji pairs. The query is now safe to encode and stable across page/API normalization.

2. **Search availability handling.** Blank searches unnecessarily opened the large compressed index and could fail when it was unavailable. Index failures returned HTTP 200 and lacked an explicit no-cache policy. Blank searches now return empty results without index I/O; index failures return 503 with `Cache-Control: no-store`. The initial search route regressions had 4 failures and 4 passes before fixes.

3. **Search error recovery.** A failed query remained in `errorTerm`, so returning to that query could display an error even after a successful response. Clear the error when accepting a successful response. The recovery regression failed before the one-line fix. A deferred-response test also checks that a previous query cannot overwrite the current one. File: `src/components/search/SearchResults.tsx`.

4. **Month-only event dates.** The announced `2027-01` event moved to Past on January 1 because it was compared directly to a full date. A small shared helper compares month precision to month precision. The events page and home teaser now keep a monthly event upcoming through the final Pacific day of that month. Files: `src/lib/events.ts`, `src/app/events/page.tsx`, `src/components/show/UpcomingTeaser.tsx`.

5. **Watch-live destination.** The events page's live CTA opened the YouTube channel homepage. It now opens the canonical channel's `/live` endpoint. The initial event suite had 4 failures and 3 passes; all 7 passed after the two event fixes.

6. **Home event freshness.** The baseline production prerender manifest recorded `initialRevalidateSeconds: false` for `/`, freezing the date-sensitive teaser until another deployment. A route contract test failed before adding `revalidate = 60`. This enables on-demand incremental revalidation after 60 seconds. It is not a scheduled background job, and a request can receive the stale response while regeneration finishes. File: `src/app/page.tsx`.

7. **Invalid audience statistics.** Missing, empty, nonnumeric, negative, and infinite provider counts could be presented as live data containing `NaN`, `undefined`, or invented zeroes. Validate the numeric inputs and use the existing platform fallback if required fields are invalid. Preserve legitimate zero counts. File: `src/app/api/stats/route.ts`.

8. **TikTok likes reported as views.** TikTok `heart`/likes values were labeled as video views and included in total views. Stop treating likes as views and retain the existing view fallback. The API regression suite had 8 failures and 22 passes before these statistics fixes, then 30 passes.

9. **Clearly dead fallback fields.** Removed module-local `FALLBACK.updatedAt`, `FALLBACK.source`, and `FALLBACK.totals.followers` after confirming they have no reads. Kept the live response timestamp/source and the used view fallback.

10. **Image optimizer cache surface.** The installed optimizer accepted distinct query-string variants of the same static local asset and generated separate disk-cache keys. Restrict optimized images to the 10 actual local image paths with no query string and remove an unused remote host allowance. The validation-only suite had 7 failures and 11 passes before the configuration fix, then 18 passes. These tests use an isolated Next internal validator and should be reviewed during a framework upgrade. All 10 images were also fetched successfully through the production optimizer; query variants, API paths, and the former remote host were rejected with 400. New optimized assets must be added to this explicit allowlist. This reduces cache cardinality; it does not remediate the installed framework's advisory list. See the [maintainer advisory](https://github.com/vercel/next.js/security/advisories/GHSA-3x4c-7xq6-9pq8).

## Added coverage

- Search API success/error responses and cache policy; repeated, whitespace, and bounded query contracts; lazy gzip loading, reuse, retry after read/decompression failure; integrity of all 227 indexed videos and 77,247 chunks.
- Real search component rendering with controlled state/effect callbacks: recovery, stale-request cancellation, escaped transcript/title markup, highlighting, and timestamp links. This is a small hook harness, not a mounted browser or React concurrency test.
- Live API quota windows in PST/PDT; missing keys and upstream HTTP/network/JSON failures; video ordering, curated pinning, titles, and caches; statistics provider validation, totals, and Mission Control priority/failover. Network requests and credentials are mocked.
- Shared clock timer ownership, final unsubscribe cleanup, restart after an idle period, and server snapshots; exact on-air boundaries, Pacific midnight, DST transitions, year rollover, and expired countdowns.
- Booking/challenge form pending, error, and success states; required fields, email/evidence types, choices, and honeypots. Rendering uses mocked Formspree state and performs no submissions.
- Event month/day transitions and filtering; question route generation, headings, escaped answers, source links, metadata bounds, and unknown-question 404; existence of press/research downloads.
- Dataset counts independently recomputed using the displayed three-mention threshold; unique, date-ordered heatmap columns linked to known videos.

## Security findings and limits

A redacted scan of tracked text files found zero candidates for the selected high-confidence private-key, Google API, GitHub, AWS, Stripe-secret, and Slack-token patterns. This is a bounded pattern scan, not proof that all secrets are absent. No secrets were printed. The review found no current path from user input to the static JSON-LD or dashboard HTML insertion points; search snippets remain React-escaped and now have coverage.

The dependency audit remains a high-priority follow-up. The registry snapshot flags Next `16.1.6` and its image-processing dependencies, among other packages. It recommends Next `16.3.8`, a same-major update; development-tool recommendations also include a Vitest major update and an ESLint configuration downgrade. No dependency updates or blanket `npm audit fix --force` were applied. Dependency upgrades require their own compatibility review beyond these surgical application changes.

Critical advisory conditions must not be confused with proven exploitation: the [Windows-hosting condition](https://github.com/advisories/GHSA-p293-qw3h-jr36) does not match this local Darwin host, and deployment OS was not independently verified; image optimization is enabled, but no AVIF assets or upload endpoint were found for the [AVIF advisory](https://github.com/advisories/GHSA-2xp9-vwfh-vxw4). No middleware/proxy, rewrites, custom server, Cache Components, CSP nonces, or Server Actions were found in this worktree. The image-cache mitigation is partial, and the maintainer notes that platforms with their own optimizer, including Vercel, are not affected by that particular disk-cache issue.

## Smells intentionally left unchanged

- Mission Control statistics are passed through without schema validation. A `source: "live"` response can combine live and fallback fields; fallback figures lack provenance dates; totals sum rounded display values. A broader response-contract change would need consumer agreement.
- Live/video provider payloads still make shape assumptions. The current pages have no API consumers, but the project plan preserves these endpoint URLs, so they were retained.
- On-air labels represent the published schedule, not independent confirmation of an active stream.
- Retrying an identical failed search without changing the query or reloading may not trigger another effect. Concurrent cold index loads can duplicate reads/decompression. Short queries use ASCII word boundaries, which can miss punctuation-ended terms such as `C++`.
- Repeating the exact same player timestamp may not restart playback because the iframe URL is unchanged. This needs mounted browser/player verification.
- GoalBar's currently disabled configuration does not guard a zero target. Chart scales assume the curated domains and nonzero maxima. Current data satisfies those assumptions; speculative production guards were not added.
- Existing dashboard globals, public assets, preserved API routes, and unused-looking dependencies were not removed solely because a text search found few references.
- No paid provider calls, form submissions, live credentials, browser visual/accessibility audit, remote link availability checks, or deployment were used as evidence of completion.

## Final state

The final production build and route smoke checks pass. The generated manifest now records 60-second home revalidation. Additional production checks passed for all 10 rendered optimized image assets, three denied image inputs, and repeated/Unicode/blank search queries. `git diff --check` passes. The final build and local server used empty provider-key variables; provider tests are mocked.

All changes are left uncommitted for review on `astra-sweep`. No branches were switched, nothing was pushed, and no new dependencies were introduced. `package.json` and `package-lock.json` are unchanged. Temporary logs, the dependency-audit JSON, and npm cache are retained only under ignored `node_modules/.cache/astra-sweep/`. The task's local production server was stopped after checks.
