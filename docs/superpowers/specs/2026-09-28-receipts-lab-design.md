---
title: drgregshow.com rebuild, "Receipts Lab"
date: 2026-09-28
status: approved-design, awaiting spec review
branch: dev/receipts-lab
---

# drgregshow.com rebuild: "Receipts Lab"

## Goal

Rebuild drgregshow.com from scratch for fans arriving from Shorts and TikTok.
One primary conversion: **Subscribe on YouTube**. The site should itself
"bring the receipts", matching the gold Short standard (real figures circled,
sourced claims, paper wall).

## Decisions (Greg, 2026-09-28)

| Question | Answer |
|---|---|
| Primary visitor | Audience and fans |
| Creative direction | Receipts lab |
| Scope | New design, keep every existing URL |
| Signature features | Debate archive, topic hubs, live now + schedule, challenge form, transcript search |
| Archive data | Hybrid: YouTube API list + curated receipts file |
| Main CTA | Subscribe on YouTube |
| Challenge submissions | Email to greg@drgregshow.com |
| Imagery | Real assets only, no generated images |

## Build approach

Fresh `src/` tree on branch `dev/receipts-lab` in the existing repo
(Next.js 16, React 19, Tailwind 4, GSAP already installed). Carry over, unchanged
in behavior: `api/live`, `api/videos`, `api/stats`, `lib/youtube.ts`. Retire all
old components. Production is untouched until merge; the branch is pushed only
on Greg's go (a push creates a public Vercel preview URL).

## Site map

| Route | Content |
|---|---|
| `/` | Fan homepage (below) |
| `/debates` | Archive: every debate/long-form from YouTube, filter by topic, curated ones badged "Receipts" |
| `/debates/[slug]` | Video embed, opponent, claims made, receipt per claim, timestamp jumps |
| `/topics/[topic]` | vaccines, evolution, germ-terrain, climate, covid-origins, origin-of-life (last) |
| `/search` | Transcript search across indexed videos, results deep-link to `youtube.com/watch?v=ID&t=S` |
| `/live` | Live-now state via `/api/live`, nightly 9 PM PT slot, upcoming events |
| `/challenge` | "Think you can win?" intake form |
| `/book`, `/booking`, `/press`, `/research`, `/donate` | Kept at the same paths, redesigned; content preserved |

Topic order everywhere follows Greg's 2026-09-27 priority: vaccines first,
origin of life secondary.

## Homepage sequence

1. Hero: ON AIR tally (live) or countdown to 9 PM PT; headline; featured
   debate (Hovind, `pdzkCwy46zo`); primary button Subscribe on YouTube.
2. Receipts wall: 3 cards, each = claim, real figure with the key result
   circled in red (SVG stroke drawn on scroll), citation in mono type, link to
   the exact moment.
3. Topic hub grid.
4. Latest from the show (YouTube API, existing ISR route).
5. Search teaser ("Search 1,000+ hours of arguments" only if the number is
   true at build time; otherwise the real indexed count).
6. Challenge teaser.
7. Credibility margin note: Ph.D., Microbiology (UC Riverside), papers, patent.
8. Footer: Subscribe again, Substack, Patreon, Discord, quiet Book link.

## Visual system

- Paper `#F4F1EA`-ish background, ink near-black, marker red for circles and
  underlines, highlighter yellow for emphasis. Light theme only (YAGNI).
- Type: bold condensed display for headlines, readable serif body, mono for
  citations and timestamps. Google Fonts via `next/font`.
- Motion: GSAP stroke-draw for circles/underlines on scroll; respects
  `prefers-reduced-motion`.
- Imagery: existing headshots and live shots in `public/images`, stream frames,
  real paper figures only.
- Mobile first: 16px gutters, no horizontal scroll, tap targets 44px.

## Data

- `content/metrics.ts`: every public number on the site, each with `value`,
  `source`, `checkedOn`. No other file may hard-code a follower/view count.
  Fixes current drift (homepage "34K+" vs media kit "35K+").
- `content/debates.json`: curated entries `{slug, videoId, title, opponent,
  topic, date, claims: [{claim, t, receipt: {summary, citation, doi|pmid|url,
  figure, license}}]}`. Seed with ~10 top debates.
- `content/topics.ts`: topic slugs, labels, blurbs, keyword map for auto-tagging
  YouTube titles; curated entries override.
- `content/schedule.json`: nightly slot plus dated events (Hovind in-person
  debate, Jan 2027).
- Archive list: YouTube Data API (existing key), ISR, merged with curated file
  by `videoId`.

## Transcript search

- Build script `scripts/build-search-index.mjs` reads caption files (`.vtt`,
  `.srt`, `.sbv`, Whisper `.json`) mapped to YouTube video IDs, normalizes to
  ~30 s chunks `{videoId, start, text}`, writes `public/search/index.json` plus
  a prebuilt MiniSearch index.
- Primary source: **full-stream transcripts on Ares** (Greg, 2026-09-28), e.g.
  `C:\Users\gnwk\Videos\!LIVE archive\` (Aug-Sep 2025 `.sbv`/`.srt`), plus
  whatever the D:/Z: scan finds. Secondary: vault
  `DrGreg-Ops/30-Content/youtube-auto-captions/` (29 videos) and per-date
  Whisper transcripts in `DrGreg-Ops/30-Content/YYYY-MM-DD/`.
- Mapping: `scripts/sync-transcripts.mjs` pulls from Ares over SSH (Tailscale)
  and matches each stream transcript to its YouTube live VOD by stream date
  (YouTube `liveStreamingDetails.actualStartTime`, Pacific date). Matches go
  into `content/transcripts.json` (`file -> videoId`); unmatched or ambiguous
  dates are skipped and listed in a report, never guessed. Transcripts of
  streams without a public VOD are not indexed.
- Duplicate coverage (same stream in `.sbv` and `.srt`, or partial and full
  versions like `sep4 v1/v2/full`) resolves to the longest file.
- `/search` loads the index lazily (only on that page); results show snippet
  with highlight, video title, timestamp, and deep link.
- Only the generated, compact search index is committed (not raw transcripts),
  so Vercel builds depend on neither Ares nor the vault SSD. Re-run
  `npm run sync-transcripts && npm run build-search` to refresh.
- Transcripts contain guests' words already public on YouTube; the index stores
  text + timestamp only, no speaker names inferred.

## Challenge form

Formspree (already a dependency) to greg@drgregshow.com. Fields: name, handle
and platform, topic, the claim you will defend, your best evidence (link),
availability. Honeypot field for spam; no captcha. Confirmation screen, no
auto-reply promises.

## Receipts integrity rules

- Every DOI/PMID verified via PubMed or Crossref lookup before it enters
  `debates.json`; never pattern-guessed.
- Figures: CC-BY or other reuse-permitting licenses only, attributed on the
  card; otherwise redraw the chart from published data and cite it.
- Numbers only from `metrics.ts`, rounded down, never inflated.

## Copy rules

No em-dashes, no banned phrases, never third person ("Dr. Greg explains"); the
site speaks as "I" or with no subject. All public copy runs `humanizer` then
`structural-humanizer` before it is final.

## Verification (definition of done)

1. `npm run build` and `npm run lint` pass.
2. Script hits every old URL (`/`, `/book`, `/booking`, `/press`, `/research`,
   `/donate`, `/api/*`) on the local build and gets 200.
3. Browser pane screenshots at 375 px and 1440 px for every route; no
   horizontal scroll.
4. Search returns correct timestamps for 3 spot-checked phrases.
5. Challenge form posts in Formspree test mode.
6. Writing lint: zero em-dashes, zero banned phrases, zero third-person lines.

## Out of scope (later)

Per-opponent pages, automatic receipts pages from the post-stream pipeline,
live fact-check overlay on `/live`, dark theme, community voting.

## Open items

- Formspree form ID for the challenge form (reuse the existing account; new form
  needed).
- Which ~10 debates get curated receipts first (default: the allowlist in
  `api/videos` plus top topic debates by views).
