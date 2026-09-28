# drgregshow.com "Dataset" Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current drgregshow.com with the approved "Dataset" design as a production Next.js site on branch `dev/receipts-lab`, keeping every existing URL.

**Architecture:** Next.js 16 App Router, mostly server components. There are two kinds of content, both in `src/content/`. Hand-curated content is typed TypeScript. Generated data (per-stream topic counts, question counts) is written as JSON by an offline Python builder, which also writes a gzipped transcript search index to `data/`. A route handler `/api/search` serves search, so clients never download the index. Interactive pieces are small client components: the heatmap, rank chart, countdown/live status, player, search box and forms.

**Tech Stack:** Next.js 16.1.6, React 19.2.3, TypeScript 5 strict, plain CSS in `globals.css` (ported from the mockup; Tailwind stays installed but unused by new code), `next/font/google` (Instrument Sans, Newsreader), `@formspree/react` 3, Vitest for unit tests, Python 3 for the offline builder.

**Spec:** `docs/superpowers/specs/2026-09-28-receipts-lab-design.md` (read the "Revision 2026-09-28" section last; it wins).
**Design reference:** `mockup/theme-3-dataset.html` + `mockup/content.js`. Serve with `python3 -m http.server 4417` from the repo root and open `http://127.0.0.1:4417/mockup/theme-3-dataset.html`. Every UI task ports named functions from this file, and the output must look and behave the same.

## Global Constraints

- **Copy:** no em dashes (U+2014) or en dashes (U+2013) anywhere in `src/` or `src/content/`. Use commas, colons, periods or parentheses.
- **Voice:** first person or no subject. Never third person: no "Dr. Greg explains/reacts/debates/breaks", no "Greg argues". Banned words: "leveraging", "spearheading", "cutting-edge". The site never mentions that AI built it.
- **Facts:** use only facts in `src/content/`. Never invent a stat, quote, event, date, view count or citation. Every citation links to `https://doi.org/<doi>` (or `url` for IPCC).
- **Hovind:** not in the hero, nav, page titles or metadata. His video thumbnail appears only in the "Most popular" section.
- **Topics:** never render a topic with `streams === 0`. Hubs, heatmap rows, chips and menus use `topTopics(8)`.
- **Support strip:** "Support on Patreon" and "Give once with Stripe" on every page. "Subscribe on YouTube" is the primary header button.
- **Kept URLs:** `/book`, `/booking` (already a permanent redirect to `/book` in `next.config.ts`), `/press`, `/research`, `/donate`, `/api/live`, `/api/stats`, `/api/videos`. Keep the existing `next.config.ts` redirects.
- **Quality floor:** no horizontal scroll at 375px, tap targets of 44px or more, visible `:focus-visible`, `prefers-reduced-motion` respected, WCAG AA contrast, no console errors.
- **Git:** explicit paths only (never `git add -A` or `git add .`). Never stage `src/app/recipes/`, which is untracked and not ours. Do not push.
- **Commits end with** `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`

## File Structure

```
scripts/build-dataset.py            offline: transcripts -> src/content/generated/dataset.json + data/search-index.json.gz
scripts/fetch-stream-meta.sh        offline: yt-dlp list of public stream VODs with start times
scripts/check-routes.mjs            smoke: every route returns 200/3xx on a running server
scripts/lint-copy.mjs               copy rules: dashes, third person, banned words over src/
src/content/types.ts                all content types
src/content/site.ts                 curated content (links, images, metrics, questions, receipts, events, formats, popular, credentials, schedule, featured)
src/content/generated/dataset.json  generated: dataset summary, topics, perStream, question stream counts
src/content/index.ts                merges site.ts + dataset.json -> typed exports
src/lib/topics.ts                   topTopics(), topicBySlug()
src/lib/schedule.ts                 nextShowAt(), isOnAir(), countdownParts()
src/lib/format.ts                   fmtViews(), hms(), doiUrl(), shortCite()
src/lib/search.ts                   termRegex(), searchChunks(), snippet()
src/lib/search-index.ts             server-only loader of data/search-index.json.gz
src/app/api/search/route.ts         GET ?q= -> {total, results[]}
src/components/site/TopStrip.tsx, Header.tsx, Footer.tsx, MobileNav.tsx (client)
src/components/figures/Forest.tsx, Bars.tsx, Timeline.tsx, Receipt.tsx
src/components/data/Heatmap.tsx (client), RankChart.tsx (client), Sparkline.tsx
src/components/show/Countdown.tsx (client), LiveStatus.tsx (client), Player.tsx (client)
src/components/search/SearchBox.tsx (client), SearchResults.tsx (client)
src/components/forms/ChallengeForm.tsx (client), BookingForm.tsx (client)
src/app/layout.tsx, globals.css, page.tsx
src/app/questions/page.tsx, questions/[slug]/page.tsx
src/app/topics/[slug]/page.tsx
src/app/search/page.tsx
src/app/events/page.tsx, live/page.tsx (redirect)
src/app/challenge/page.tsx, book/page.tsx, support/page.tsx, donate/page.tsx, press/page.tsx, research/page.tsx
tests/*.test.ts
```

Old `src/components/*.tsx` (Hero, Navbar, MediaKit, ParticleBackground, and the rest) are removed in Task 5 once nothing imports them.

---

### Task 1: Test harness + typed curated content

**Files:**
- Modify: `package.json` (devDependency `vitest`; scripts `test`, `lint:copy`)
- Create: `vitest.config.ts`, `src/content/types.ts`, `src/content/site.ts`, `scripts/lint-copy.mjs`, `tests/content.test.ts`

**Interfaces:**
- Produces: the types `Links, Metric, Question, Receipt, Figure, Event, BookingFormat, PopularVideo, ScheduleItem, Featured`, and `export const site` from `src/content/site.ts` with keys `links, images, metrics, questions, receipts, featured, schedule, credentials, events, bookingFormats, popular`.

- [ ] **Step 1: Install and configure Vitest**

Run: `npm i -D vitest@^3`
Add scripts: `"test": "vitest run"`, `"lint:copy": "node scripts/lint-copy.mjs"`.

```ts
// vitest.config.ts
import { defineConfig } from "vitest/config";
import path from "node:path";
export default defineConfig({
  test: { include: ["tests/**/*.test.ts"] },
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
});
```

- [ ] **Step 2: Write `src/content/types.ts`**

```ts
export type Links = { subscribe: string; youtube: string; tiktok: string; instagram: string; patreon: string; stripe: string; substack: string; discord: string; mediaKit: string };
export type Metric = { value: string; label: string; source: string };
export type Figure =
  | { type: "forest"; axis: string; rows: { label: string; e: number; l: number; u: number }[] }
  | { type: "bars"; axis: string; rows: { label: string; v: number; key?: boolean }[] }
  | { type: "timeline"; axis: string; max: number; events: { g: number; label: string; key?: boolean }[] };
export type Receipt = { cite: string; doi?: string; pmid?: string; url?: string; quote?: string; figure: Figure | null; moment?: { video: string; t: number } };
export type Question = { slug: string; q: string; topic: string; answer: string; receipt: string | null; search: string };
export type Event = { title: string; where: string; date: string; when: string; status: "upcoming" | "past"; url?: string; note?: string };
export type BookingFormat = { title: string; desc: string };
export type PopularVideo = { id: string; title: string; views: number };
export type ScheduleItem = { when: string; what: string; tag: string };
export type Featured = { claim: { text: string; video: string; t: number; note: string }; answer: { video: string; t: number; receipt: string } };
```

- [ ] **Step 3: Write `src/content/site.ts`**

Port every value from `mockup/content.js` except `dataset`, `topics`, `perStream` and question `streams`; those are generated in Task 2. Transform while porting:
- Give each question a `slug`: `mrna-safety`, `covid-lab`, `vaccines-autism`, `climate-real`, `fluoride`, `raw-milk`, `viruses-exist`, `new-information`.
- Set `links.substack` to `https://drgregshow.substack.com` and add `links.discord` = `https://discord.gg/RXFpEmZMJU`. Both values come from the current `src/app/press/page.tsx`.
- Change image paths to `/images/headshot-portrait.jpg` etc. (served from `public/`). Set `mediaKit` to `/media/DrGreg_Media_Kit_2026-09.pdf`.
- Keep `popular` (with `asOf` and `source`), `events`, `bookingFormats`, `credentials`, `schedule` and `featured` exactly as in content.js.
- Type the object as `export const site = {...} satisfies {...}`.

- [ ] **Step 4: Write the failing content test**

```ts
// tests/content.test.ts
import { describe, it, expect } from "vitest";
import { site } from "@/content/site";

const all = JSON.stringify(site);
describe("curated content", () => {
  it("has no em or en dashes", () => { expect(all).not.toMatch(/[\u2013\u2014]/); });
  it("never speaks of Greg in third person", () => {
    expect(all).not.toMatch(/\b(Dr\.? )?Greg (explains|reacts|debates|breaks|argues)\b/i);
  });
  it("every question receipt exists", () => {
    for (const q of site.questions) if (q.receipt) expect(site.receipts).toHaveProperty(q.receipt);
  });
  it("every receipt links somewhere", () => {
    for (const r of Object.values(site.receipts)) expect(Boolean(r.doi || r.url)).toBe(true);
  });
  it("question slugs are unique", () => {
    const s = site.questions.map(q => q.slug); expect(new Set(s).size).toBe(s.length);
  });
  it("events have a status and a venue", () => {
    for (const e of site.events) { expect(["upcoming", "past"]).toContain(e.status); expect(e.where).not.toBe(""); }
  });
});
```

- [ ] **Step 5: Run it.** `npm test` should give PASS for all 6 checks. (If Step 3 is incomplete, "receipt exists" fails first.)

- [ ] **Step 6: Write `scripts/lint-copy.mjs`**

```js
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
const bad = [
  [/[\u2013\u2014]/, "em/en dash"],
  [/\b(Dr\.? )?Greg (explains|reacts|debates|breaks|argues)\b/i, "third person"],
  [/leveraging|spearheading|cutting-edge/i, "banned phrase"],
];
const skip = new Set(["generated"]);
let fails = 0;
function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (!skip.has(f) && f !== "recipes") walk(p); continue; }
    if (!/\.(tsx?|css|json)$/.test(f)) continue;
    readFileSync(p, "utf8").split("\n").forEach((line, i) => {
      for (const [re, why] of bad) if (re.test(line)) { console.log(`${p}:${i + 1} ${why}`); fails++; }
    });
  }
}
walk("src");
if (fails) { console.error(`${fails} copy problems`); process.exit(1); }
console.log("copy ok");
```

Note: the old components still contain dashes. `lint:copy` only has to pass from Task 5 on, after they are removed.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/content/types.ts src/content/site.ts scripts/lint-copy.mjs tests/content.test.ts
git commit -m "Content: typed curated site content, Vitest, copy linter"
```

---

### Task 2: Dataset builder in repo + generated data

**Files:**
- Create: `scripts/build-dataset.py` (from `scripts/build-search-index.py`, which it replaces), `scripts/fetch-stream-meta.sh`, `src/content/generated/dataset.json`, `data/search-index.json.gz`, `src/content/index.ts`, `tests/dataset.test.ts`
- Delete: `scripts/build-search-index.py` (`git rm`)

**Interfaces:**
- Consumes: `site` (Task 1).
- Produces:
  - `dataset.json` shape: `{ summary:{streams,hours,from,to,sources,note,topicRule}, topics:[{slug,name,blurb,streams,term}], perStream:[{date,video,<slug>:number...}], questionStreams:{<questionText>:number}, videos:[{id,title,date,topic,source}] }`
  - `data/search-index.json.gz` shape: `{videos:[{id,title,date,topic,source}], chunks:[{v,s,x}]}`
  - `src/content/index.ts` exports `site`, `dataset`, `questions` (the site questions with `streams` merged in, sorted by streams descending), and `topics`.

- [ ] **Step 1: Port the builder**

Copy `scripts/build-search-index.py` to `scripts/build-dataset.py` and change it:
- Replace every hard-coded path with env vars that have defaults:
  - `DG_TRANSCRIPTS_ARES` (folder of Ares `.srt`)
  - `DG_VAULT_CONTENT` (default `/Volumes/vaults/Mnemosyne/DrGreg-Ops/30-Content`)
  - `DG_YT_SUBS` (folder of `<id>.*.vtt`)
  - `DG_STREAM_META` (the `stream-meta.txt` from Step 2)
  - `DG_EXTRA_VIDEOS` (optional old `search-data-16.js`)
- Write outputs to `src/content/generated/dataset.json` and `data/search-index.json.gz` (gzip level 9) instead of the mockup files.
- Stop editing `content.js`. Emit the dataset.json shape above.
- Topic list: keep the 14-topic `TAX` list with names and blurbs from `mockup/content.js`. Add `term` per topic, the search term for hub "moments": vaccines `vaccine`, evolution `evolution`, climate `climate`, germ-terrain `germ theory`, covid-origins `lab leak`, cancer `cancer`, ai `artificial intelligence`, gene-editing `CRISPR`, space `flat earth`, nutrition `supplement`, alt-medicine `ivermectin`, energy `nuclear`, gmos-food `GMO`, origin-of-life `abiogenesis`.
- Strip every U+2013 and U+2014 from titles and text (titles: `" \u2014 "` becomes `": "`).

- [ ] **Step 2: Write `scripts/fetch-stream-meta.sh`**

```bash
#!/usr/bin/env bash
# Usage: scripts/fetch-stream-meta.sh OUT_DIR   (needs yt-dlp; text metadata only, no media)
set -euo pipefail
OUT="${1:?out dir}"; mkdir -p "$OUT"
yt-dlp --flat-playlist --print "%(id)s" "https://www.youtube.com/@DrGregShow/streams" \
  | sed 's#^#https://www.youtube.com/watch?v=#' > "$OUT/stream-urls.txt"
yt-dlp --skip-download --ignore-errors \
  --print "%(id)s|%(release_timestamp)s|%(upload_date)s|%(duration)s|%(availability)s|%(title)s" \
  -a "$OUT/stream-urls.txt" > "$OUT/stream-meta.txt"
yt-dlp --skip-download --write-auto-subs --sub-langs "en-orig,en" --sub-format vtt \
  --sleep-subtitles 2 --ignore-errors --no-overwrites -o "$OUT/yt-subs/%(id)s.%(ext)s" -a "$OUT/stream-urls.txt"
```

- [ ] **Step 3: Run the builder** against the already-downloaded inputs in the orchestrator scratchpad. The orchestrator supplies the paths in the task prompt: `ares-srt/`, `yt-subs/`, `stream-meta.txt`, `search-data-16.js`.

Run: `DG_TRANSCRIPTS_ARES=... DG_YT_SUBS=... DG_STREAM_META=... DG_EXTRA_VIDEOS=... python3 scripts/build-dataset.py`
Expected: it prints `streams 219`, a range from `2025-09-03` to `2026-09-27`, and writes both output files. `data/search-index.json.gz` should be about 8 MB.

- [ ] **Step 4: Write `src/content/index.ts`**

```ts
import { site } from "./site";
import raw from "./generated/dataset.json";
export type Topic = { slug: string; name: string; blurb: string; streams: number; term: string };
export type StreamRow = { date: string; video: string } & Record<string, number | string>;
export const dataset = raw as unknown as {
  summary: { streams: number; hours: number; from: string; to: string; sources: Record<string, number>; note: string; topicRule: string };
  topics: Topic[]; perStream: StreamRow[]; questionStreams: Record<string, number>;
  videos: { id: string; title: string; date: string; topic: string; source: string }[];
};
export const topics = dataset.topics;
export const questions = site.questions
  .map(q => ({ ...q, streams: dataset.questionStreams[q.q] ?? 0 }))
  .sort((a, b) => b.streams - a.streams);
export { site };
```

- [ ] **Step 5: Write the failing test `tests/dataset.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { dataset, questions } from "@/content";
describe("generated dataset", () => {
  it("perStream length matches summary", () => { expect(dataset.perStream.length).toBe(dataset.summary.streams); });
  it("streams run through Sept 2026", () => { expect(dataset.perStream.at(-1)!.date >= "2026-09-01").toBe(true); });
  it("every topic has a search term", () => { for (const t of dataset.topics) expect(t.term.length).toBeGreaterThan(1); });
  it("no dashes in generated text", () => { expect(JSON.stringify(dataset)).not.toMatch(/[\u2013\u2014]/); });
  it("questions carry stream counts", () => { expect(questions[0].streams).toBeGreaterThan(0); });
});
```

- [ ] **Step 6: Run** `npm test`. Expected: PASS.

- [ ] **Step 7: Commit** (`data/search-index.json.gz` is committed deliberately, because the Vercel build must not depend on the vault SSD or Ares)

```bash
git rm scripts/build-search-index.py
git add scripts/build-dataset.py scripts/fetch-stream-meta.sh src/content/generated/dataset.json data/search-index.json.gz src/content/index.ts tests/dataset.test.ts
git commit -m "Data: in-repo dataset builder, generated topic/stream data, gzipped search index"
```

---

### Task 3: Pure libraries (topics, schedule, format)

**Files:**
- Create: `src/lib/topics.ts`, `src/lib/schedule.ts`, `src/lib/format.ts`, `tests/lib.test.ts`

**Interfaces:**
- Consumes: `topics` from `@/content`.
- Produces:
  - `topTopics(n = 8): Topic[]` (only topics with `streams > 0`, sorted descending, first `n`)
  - `topicBySlug(slug): Topic | undefined` (returns `undefined` when streams is 0)
  - `nextShowAt(now: Date): Date` (next 21:00 America/Los_Angeles)
  - `isOnAir(now: Date): boolean` (21:00 to 23:00 PT)
  - `countdownParts(ms): {h, m, s}`
  - `fmtViews(n): string` ("113,915 views")
  - `hms(sec): string` ("2:34:47", "41:42")
  - `doiUrl(doi): string`
  - `shortCite(cite): string` (first author surname + "et al." when there are 3+ authors, plus year)

- [ ] **Step 1: Write the failing tests**

```ts
// tests/lib.test.ts
import { describe, it, expect } from "vitest";
import { topTopics, topicBySlug } from "@/lib/topics";
import { nextShowAt, isOnAir, countdownParts } from "@/lib/schedule";
import { fmtViews, hms, doiUrl } from "@/lib/format";

describe("topics", () => {
  it("returns 8 non-zero topics sorted desc", () => {
    const t = topTopics(8);
    expect(t).toHaveLength(8);
    expect(t.every(x => x.streams > 0)).toBe(true);
    for (let i = 1; i < t.length; i++) expect(t[i - 1].streams).toBeGreaterThanOrEqual(t[i].streams);
  });
  it("hides zero-stream topics", () => { expect(topicBySlug("does-not-exist")).toBeUndefined(); });
});
describe("schedule", () => {
  it("next show is 9 PM Pacific, same day before 9", () => {
    const now = new Date("2026-09-28T19:00:00Z"); // 12:00 PDT
    expect(nextShowAt(now).toISOString()).toBe("2026-09-29T04:00:00.000Z");
  });
  it("rolls to tomorrow after 9 PM", () => {
    const now = new Date("2026-09-29T05:00:00Z"); // 22:00 PDT
    expect(nextShowAt(now).toISOString()).toBe("2026-09-30T04:00:00.000Z");
  });
  it("handles PST in winter", () => {
    const now = new Date("2026-12-01T20:00:00Z"); // 12:00 PST
    expect(nextShowAt(now).toISOString()).toBe("2026-12-02T05:00:00.000Z");
  });
  it("on air 9 to 11 PM PT", () => {
    expect(isOnAir(new Date("2026-09-29T04:30:00Z"))).toBe(true);
    expect(isOnAir(new Date("2026-09-29T06:30:00Z"))).toBe(false);
  });
  it("countdown parts", () => { expect(countdownParts(3_725_000)).toEqual({ h: 1, m: 2, s: 5 }); });
});
describe("format", () => {
  it("views", () => { expect(fmtViews(113915)).toBe("113,915 views"); });
  it("hms", () => { expect(hms(9287)).toBe("2:34:47"); expect(hms(2502)).toBe("41:42"); });
  it("doi", () => { expect(doiUrl("10.7326/M18-2101")).toBe("https://doi.org/10.7326/M18-2101"); });
});
```

- [ ] **Step 2: Run** `npm test`. Expected: FAIL (modules missing).

- [ ] **Step 3: Implement**

```ts
// src/lib/topics.ts
import { topics, type Topic } from "@/content";
export function topTopics(n = 8): Topic[] {
  return topics.filter(t => t.streams > 0).sort((a, b) => b.streams - a.streams).slice(0, n);
}
export function topicBySlug(slug: string): Topic | undefined {
  const t = topics.find(x => x.slug === slug);
  return t && t.streams > 0 ? t : undefined;
}
```

```ts
// src/lib/schedule.ts
const TZ = "America/Los_Angeles";
function ptParts(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    .formatToParts(d).map(x => [x.type, x.value]));
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, s: +p.second };
}
function ptOffsetMs(d: Date) {
  const p = ptParts(d);
  return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - Math.floor(d.getTime() / 1000) * 1000;
}
export function nextShowAt(now: Date): Date {
  const p = ptParts(now);
  let target = new Date(Date.UTC(p.y, p.mo - 1, p.d, 21, 0, 0) - ptOffsetMs(now));
  if (target.getTime() <= now.getTime()) {
    const t2 = new Date(Date.UTC(p.y, p.mo - 1, p.d + 1, 21, 0, 0));
    target = new Date(t2.getTime() - ptOffsetMs(t2));
  }
  return target;
}
export function isOnAir(now: Date): boolean { const h = ptParts(now).h; return h >= 21 && h < 23; }
export function countdownParts(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return { h: Math.floor(t / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}
```

```ts
// src/lib/format.ts
export const fmtViews = (n: number) => `${n.toLocaleString("en-US")} views`;
export function hms(sec: number) {
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.floor(sec % 60);
  const mm = h ? String(m).padStart(2, "0") : String(m);
  return (h ? `${h}:` : "") + `${mm}:${String(s).padStart(2, "0")}`;
}
export const doiUrl = (doi: string) => `https://doi.org/${doi}`;
export function shortCite(cite: string) {
  const authors = cite.split(".")[0];
  const first = authors.split(/[ ,]/)[0];
  const year = cite.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
  const many = (authors.match(/,/g)?.length ?? 0) >= 2 || /et al/.test(authors);
  return `${first}${many ? " et al." : ""} ${year}`.trim();
}
```

- [ ] **Step 4: Run** `npm test`. Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/lib/topics.ts src/lib/schedule.ts src/lib/format.ts tests/lib.test.ts
git commit -m "Lib: top topics, PT show schedule, formatting helpers"
```

---

### Task 4: Server-side transcript search

**Files:**
- Create: `src/lib/search.ts`, `src/lib/search-index.ts`, `src/app/api/search/route.ts`, `tests/search.test.ts`

**Interfaces:**
- Produces:
  - `termRegex(q): RegExp | null` (matches at word starts; terms of 3 letters or fewer match whole words only)
  - `searchChunks(index, q, limit = 60): { total: number; results: SearchHit[] }`, where `SearchHit = { v, s, title, date, snippet }`
  - `snippet(text, q): string` (plain text around the first hit, 240 chars max; the client highlights)
  - `GET /api/search?q=` returns JSON `{ q, total, results }` with `Cache-Control: public, s-maxage=3600`. An empty q returns `{q:"", total:0, results:[]}`.
  - `loadIndex(): Promise<Index>` (server-only, cached in a module variable)

- [ ] **Step 1: Write the failing tests**

```ts
// tests/search.test.ts
import { describe, it, expect } from "vitest";
import { termRegex, searchChunks, snippet } from "@/lib/search";
const index = { videos: [{ id: "A", title: "Stream A", date: "2026-01-01", topic: "vaccines", source: "ares" }],
  chunks: [{ v: "A", s: 10, x: "we talked about raw milk today" }, { v: "A", s: 40, x: "she said AI will replace doctors" },
           { v: "A", s: 70, x: "the paid stuff said nothing" }] };
describe("search", () => {
  it("short terms match whole words only", () => {
    const r = searchChunks(index, "AI"); expect(r.total).toBe(1); expect(r.results[0].s).toBe(40);
  });
  it("phrases match", () => { expect(searchChunks(index, "raw milk").results[0].s).toBe(10); });
  it("blank query returns nothing", () => { expect(searchChunks(index, "  ").total).toBe(0); expect(termRegex("")).toBeNull(); });
  it("snippet contains the term", () => { expect(snippet("x ".repeat(200) + "raw milk here", "raw milk")).toContain("raw milk"); });
  it("regex special chars are escaped", () => { expect(() => searchChunks(index, "c++ (")).not.toThrow(); });
});
```

- [ ] **Step 2: Run** `npm test`. Expected: FAIL.

- [ ] **Step 3: Implement**

```ts
// src/lib/search.ts
export type Index = { videos: { id: string; title: string; date: string; topic: string; source: string }[]; chunks: { v: string; s: number; x: string }[] };
export type SearchHit = { v: string; s: number; title: string; date: string; snippet: string };
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
export function termRegex(q: string): RegExp | null {
  const t = q.trim().toLowerCase().replace(/\s+/g, " ");
  if (!t) return null;
  return t.length <= 3 ? new RegExp(`\\b${esc(t)}\\b`, "i") : new RegExp(`\\b${esc(t)}`, "i");
}
export function snippet(text: string, q: string): string {
  const re = termRegex(q); const i = re ? text.search(re) : -1;
  const start = Math.max(0, i - 90);
  return (start ? "..." : "") + text.slice(start, start + 240).trim() + (start + 240 < text.length ? "..." : "");
}
export function searchChunks(index: Index, q: string, limit = 60) {
  const re = termRegex(q);
  if (!re) return { total: 0, results: [] as SearchHit[] };
  const vids = new Map(index.videos.map(v => [v.id, v]));
  const hits = index.chunks.filter(c => re.test(c.x));
  const results = hits.slice(0, limit).map(c => ({ v: c.v, s: c.s, title: vids.get(c.v)?.title ?? "", date: vids.get(c.v)?.date ?? "", snippet: snippet(c.x, q) }));
  return { total: hits.length, results };
}
```

```ts
// src/lib/search-index.ts
import "server-only";
import { readFile } from "node:fs/promises";
import { gunzipSync } from "node:zlib";
import path from "node:path";
import type { Index } from "./search";
let cached: Index | null = null;
export async function loadIndex(): Promise<Index> {
  if (cached) return cached;
  const buf = await readFile(path.join(process.cwd(), "data", "search-index.json.gz"));
  cached = JSON.parse(gunzipSync(buf).toString("utf8")) as Index;
  return cached;
}
```

```ts
// src/app/api/search/route.ts
import { NextResponse } from "next/server";
import { loadIndex } from "@/lib/search-index";
import { searchChunks } from "@/lib/search";
export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 80);
  const { total, results } = searchChunks(await loadIndex(), q);
  return NextResponse.json({ q, total, results }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
```

Run `npm i server-only`. Add `outputFileTracingIncludes: { "/api/search": ["./data/search-index.json.gz"] }` to `next.config.ts` so Vercel bundles the index with the function, and keep the existing redirects.

To stop Vitest choking on the `server-only` import: no test imports `search-index.ts`, so no change is needed. Do not add `server-only` to `search.ts`.

- [ ] **Step 4: Run** `npm test`. Expected: PASS. Then run `npm run dev` and `curl -s 'localhost:3000/api/search?q=raw%20milk' | head -c 300`. Expected: JSON with `total` of 30 or more.

- [ ] **Step 5: Commit**

```bash
git add src/lib/search.ts src/lib/search-index.ts src/app/api/search/route.ts tests/search.test.ts next.config.ts package.json package-lock.json
git commit -m "Search: server-side transcript search API over gzipped index"
```

---

### Task 5: Site shell (fonts, CSS, top strip, header, footer), retire old UI

**Files:**
- Modify: `src/app/layout.tsx`, `src/app/globals.css` (full replace)
- Create: `src/components/site/TopStrip.tsx`, `Header.tsx`, `MobileNav.tsx` (client), `Footer.tsx`, `src/components/show/Countdown.tsx` (client)
- Delete (`git rm`): every old file in `src/components/*.tsx`, plus `src/lib/youtube.ts` only if nothing in `src/app/api/*` imports it (check with grep; keep it if imported)
- Replace temporarily: `src/app/page.tsx` with a minimal placeholder `<main><h1>Every night I argue science live.</h1></main>` until Task 8. Old `book`, `press`, `research` and `donate` pages that import deleted components get a minimal placeholder the same way; Task 12 rebuilds them.

**Interfaces:**
- Consumes: `site.links`, `nextShowAt`, `isOnAir`, `countdownParts`.
- Produces: `<Countdown variant="strip" | "card" />` (client; renders "Next live show in 13h 42m 55s" or "On air now"; accepts `forceLive?: boolean`). The layout wraps every page as TopStrip, Header, `{children}`, Footer.

- [ ] **Step 1: Port the CSS.** Copy the `<style>` block of `mockup/theme-3-dataset.html` into `src/app/globals.css`, keeping every token, the strip/header/nav rules, buttons, figure panels, heatmap, rank, cards, forms, events timeline and footer. Replace the Google Fonts families with `var(--font-sans)` (Instrument Sans) and `var(--font-serif)` (Newsreader). Remove the `@import "tailwindcss"` line only if no remaining file uses Tailwind classes (`grep -r "className=\"[^\"]*\\b\\(flex\\|grid\\|px-\\)" src/app/recipes` is not ours and is ignored).

- [ ] **Step 2: layout.tsx**

```tsx
import type { Metadata } from "next";
import { Instrument_Sans, Newsreader } from "next/font/google";
import "./globals.css";
import TopStrip from "@/components/site/TopStrip";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", display: "swap", style: ["normal", "italic"] });
export const metadata: Metadata = {
  metadataBase: new URL("https://www.drgregshow.com"),
  title: { default: "The Dr Greg Show", template: "%s | The Dr Greg Show" },
  description: "I'm a Ph.D. molecular biologist. Every night at 9 PM Pacific I argue science live, with the papers on screen.",
  openGraph: { images: ["/images/headshot-banner.jpg"] },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body><TopStrip /><Header /><main id="main">{children}</main><Footer /></body>
    </html>
  );
}
```

- [ ] **Step 3: TopStrip / Header / MobileNav / Footer.** Port the markup of the mockup's strip, `header.site`, `.mnav` and footer.
  - The strip holds `Support on Patreon` (links.patreon), `Give once with Stripe` (links.stripe) and `<Countdown variant="strip"/>`.
  - The header holds the brand, then nav links `Most asked` (/questions), a `Topics` dropdown from `topTopics(8)` (/topics/[slug]), `Search` (/search), `Events` (/events) and `Book` (/book), then the primary button `Subscribe on YouTube` (links.subscribe).
  - The footer holds socials (YouTube, TikTok, Instagram, Substack, Discord) and links to Book, Support (/support), Press, Research and Challenge.
  - No Hovind link anywhere.

- [ ] **Step 4: Retire the old UI.** Also replace the em dashes in the comments of `src/app/api/videos/route.ts` and `src/app/api/stats/route.ts`, and any other kept file, with commas or colons (comment text only, no logic change), so `lint:copy` passes. Run `grep -rl "@/components/" src/app` and replace the pages that import old components with placeholders as noted above. Then `git rm` the old component files.

- [ ] **Step 5: Verify.**
  - Run `npm run lint:copy && npm test && npm run build`. Expected: all pass.
  - Run `npm run dev`, open `/` in the browser at 375px and at 1400px, and compare the strip and header to the mockup. The console must be clean.

- [ ] **Step 6: Commit** (list every deleted and changed path explicitly in `git add` / `git rm`):

```bash
git add src/app/layout.tsx src/app/globals.css src/components/site src/components/show/Countdown.tsx src/app/page.tsx src/app/book/page.tsx src/app/press/page.tsx src/app/research/page.tsx src/app/donate/page.tsx
git commit -m "Shell: Dataset theme layout, support strip, header, footer; retire old components"
```

---

### Task 6: Figures and receipts

**Files:**
- Create: `src/components/figures/Forest.tsx`, `Bars.tsx`, `Timeline.tsx`, `Receipt.tsx`, `tests/figures.test.ts`

**Interfaces:**
- Consumes: `Figure`, `Receipt`, `doiUrl`, `shortCite`, `hms`.
- Produces: `<FigureView figure={Figure} />` (switches on type) and `<ReceiptBlock id={string} receipt={Receipt} figNo?: string />`. Each renders inline SVG with the caption "Redrawn from published values", the full citation, the DOI link, and a "Watch the moment" link when `moment` exists (`https://www.youtube.com/watch?v=<video>&t=<t>s`, labeled with `hms(t)`).

- [ ] **Step 1: Write the failing test**, a pure geometry helper the SVGs use:

```ts
// tests/figures.test.ts
import { describe, it, expect } from "vitest";
import { scaleX } from "@/components/figures/scale";
describe("scaleX", () => {
  it("maps domain to range", () => { const x = scaleX(0.6, 1.4, 100, 300); expect(x(1)).toBe(200); expect(x(0.6)).toBe(100); });
});
```

- [ ] **Step 2: Implement `src/components/figures/scale.ts`**

```ts
export const scaleX = (lo: number, hi: number, x0: number, x1: number) => (v: number) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
```

- [ ] **Step 3: Port `figForest`, `figBars`, `figTimeline`, `figure` and `receiptBlock`** from the mockup into the four components (server components, JSX SVG, same viewBox and styling classes). Receipts with `figure: null` (Worobey, Zhu, IPCC) render the citation plus `quote` when present, and no chart.

- [ ] **Step 4: Run** `npm test`. Expected: PASS. Add a throwaway usage in `src/app/page.tsx` of each receipt, check them visually against the mockup's `#/questions`, then remove the throwaway usage.

- [ ] **Step 5: Commit**

```bash
git add src/components/figures tests/figures.test.ts
git commit -m "Figures: forest, bars, timeline, receipt blocks redrawn from published values"
```

---

### Task 7: Interactive data figures (heatmap, rank chart, sparkline)

**Files:**
- Create: `src/components/data/Heatmap.tsx` (client), `RankChart.tsx` (client), `Sparkline.tsx` (server), `src/components/data/shade.ts`, `tests/shade.test.ts`

**Interfaces:**
- Consumes: `dataset.perStream`, `topTopics(8)`, `questions`.
- Produces:
  - `<Heatmap rows={Topic[]} streams={StreamRow[]} onTopic?: (slug|null)=>void />`
  - `<RankChart questions={QuestionWithStreams[]} activeTopic={string|null} />`
  - `<DataFigure />`, a client wrapper holding the shared `activeTopic` state for Heatmap + RankChart + receipt panel, as in the mockup's `setTopic`/`filterRank`
  - `<Sparkline values={number[]} color={string} />`
  - `shade(count, max, rule3 = true): number` (0 to 1 opacity; 0 when count < 3, matching the topic rule)

- [ ] **Step 1: Failing test**

```ts
// tests/shade.test.ts
import { describe, it, expect } from "vitest";
import { shade } from "@/components/data/shade";
describe("shade", () => {
  it("zero below the 3-mention rule", () => { expect(shade(2, 100)).toBe(0); });
  it("log-scales within max", () => { expect(shade(100, 100)).toBeCloseTo(1); expect(shade(10, 100)).toBeGreaterThan(0.3); });
});
```

- [ ] **Step 2: Implement `shade.ts`**

```ts
export function shade(count: number, max: number, rule3 = true): number {
  if ((rule3 && count < 3) || max <= 0) return 0;
  return Math.max(0.12, Math.log1p(count) / Math.log1p(max));
}
```

- [ ] **Step 3: Port the heatmap and rank chart.** Port `heatmapHTML`, `readoutHTML`, `bindHeatmap`, `setCol`, `idxFromEvent`, `setTopic`, `rankHTML`, `detailHTML`, `bindRank`, `filterRank` and `sparkHTML` into React. Keep the mockup's behavior:
  - hover, tap and arrow keys move the column cursor;
  - the readout shows the date, the counts and a link to that stream's video (`perStream[i].video`);
  - a "Within topic / Across topics" toggle;
  - clicking a topic row dims the other rows and filters the rank chart.
  - The heatmap is SVG, drawn with a column width from the container, so all 219 columns fit at 375px.
  - Colors: the mockup's Okabe-Ito set plus the two Tol hues, and hatching on the lower four rows.

- [ ] **Step 4: Verify.** `npm test` passes. On the dev server, place `<DataFigure/>` on `/` temporarily and check that the arrow keys move the cursor, clicking "Vacc." filters the rank chart, and nothing overflows at 375px.

- [ ] **Step 5: Commit**

```bash
git add src/components/data tests/shade.test.ts
git commit -m "Data figures: interactive stream-by-topic heatmap, most-asked rank chart, sparklines"
```

---

### Task 8: Home page

**Files:**
- Modify: `src/app/page.tsx`
- Create: `src/components/show/PopularGrid.tsx`, `src/components/show/UpcomingTeaser.tsx`

**Interfaces:**
- Consumes: everything above plus `site.popular`, `site.events`, `site.credentials`, `site.metrics`, `dataset.summary`.

- [ ] **Step 1: Port `pageHome`** in the mockup's order:
  1. Hero: the H1 "Every night I argue science live. Here is a year of it, charted.", the lede (streams count from `dataset.summary`), Subscribe and Support buttons, the countdown card, and Plate 1, the portrait (`next/image`, `/images/headshot-portrait.jpg`, priority) with its caption.
  2. Figure 1 (`<DataFigure/>`) with the `datasetNote` caption from `dataset.summary.note`.
  3. Most asked (top 4 questions, each linking to `/questions/[slug]`).
  4. Topic hubs, a 4x2 grid of `topTopics(8)`.
  5. The upcoming teaser (next upcoming event that has no "Hovind" in the title), linking to `/events`.
  6. Figure 3, Most popular (`PopularGrid`, all 6, equal size, `fmtViews`, caption "Views as of {asOf}. Source: {source}.").
  7. A search entry (form GET to `/search`).
  8. The challenge teaser.
  9. Credentials plus metrics.
  - Page metadata title: "The Dr Greg Show". Never Hovind.

- [ ] **Step 2: Verify** at 375px and 1400px against the mockup home. The console must be clean, and `npm run lint:copy && npm test` must pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx src/components/show/PopularGrid.tsx src/components/show/UpcomingTeaser.tsx
git commit -m "Home: dataset hero, portrait plate, Figure 1, most asked, topic hubs, popular, upcoming"
```

---

### Task 9: Questions list + question pages with seekable player

**Files:**
- Create: `src/app/questions/page.tsx`, `src/app/questions/[slug]/page.tsx`, `src/components/show/Player.tsx` (client)

**Interfaces:**
- Produces: `<Player videoId start? label />`. It shows a striped click-to-play panel with no thumbnail, then an iframe `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&start=<t>`. `seek(video, t)` is exposed through an `id`'d context so timestamp buttons on the page can reload it.
- `generateStaticParams` returns every question slug. Unknown slugs call `notFound()`.

- [ ] **Step 1: `/questions`** ports `pageQuestions` and `qCard`: every question ranked by streams, with answer, `ReceiptBlock`(s) and a "Hear it on the show" link (`/search?q=<search>`). For `vaccines-autism`, also render `taylor` as a second receipt (as the mockup does). Title: "Most asked on the show".

- [ ] **Step 2: `/questions/[slug]`** ports `pageHovind` generalized: the H1 is the question text, then the answer and receipt. When `slug === "new-information"`, add the featured claim and answer with timestamp buttons that call `seek` (claim video `featured.claim.video` at `featured.claim.t`, answer at `featured.answer.t`) and the claim's `note` in small print. Other questions with `receipt.moment` get one "Play the moment" button. The metadata title is the question text.

- [ ] **Step 3: Verify** `/questions/new-information`: the buttons load the right video at 1:04:50 and 41:42, no thumbnail appears, and "Hovind" appears nowhere in the rendered HTML (`curl -s localhost:3000/questions/new-information | grep -ci hovind` gives 0).

- [ ] **Step 4: Commit**

```bash
git add src/app/questions src/components/show/Player.tsx
git commit -m "Questions: ranked most-asked page and per-question pages with seekable player"
```

---

### Task 10: Topic hubs

**Files:**
- Create: `src/app/topics/[slug]/page.tsx`

- [ ] **Step 1: Port `pageTopic` and `topicMoments`.**
  - `generateStaticParams` returns `topTopics(8)` and `export const dynamicParams = false`, so only the top 8 hubs exist; every other slug is a 404.
  - The page shows the streams count and busiest night (max of `perStream[slug]`, with its date and a video link), a `Sparkline` of the topic's per-stream counts, that topic's questions (if any) with receipts, and "Moments on stream": the top 6 chunks for `topic.term` from `searchChunks(await loadIndex(), topic.term, 200)`, one per video, each linking to YouTube at `s`.

- [ ] **Step 2: Verify** that `/topics/cancer`, `/topics/vaccines` and `/topics/ai` render with moments, and that `/topics/origin-of-life` (not in the top 8) returns 404.

- [ ] **Step 3: Commit**

```bash
git add src/app/topics
git commit -m "Topics: data-driven hubs with busiest night, sparkline, questions, transcript moments"
```

---

### Task 11: Search page + Events page

**Files:**
- Create: `src/app/search/page.tsx`, `src/components/search/SearchBox.tsx` (client), `src/components/search/SearchResults.tsx` (client), `src/app/events/page.tsx`, `src/app/live/page.tsx`, `src/components/show/LiveStatus.tsx` (client)

- [ ] **Step 1: Search.** `/search?q=` ports `pageSearch`, `resultCard` and `snippet` highlighting.
  - The page reads `searchParams.q`. The client fetches `/api/search?q=` and renders "First 60 of N moments across {videos} videos".
  - Each result shows a thumbnail (`https://i.ytimg.com/vi/<v>/mqdefault.jpg`, or a plain "Stream" tile when the title matches /hovind/i), title, date, `hms(s)` and the snippet with the term highlighted in `<mark>`, linking to YouTube at `s`.
  - Suggested chips come from the question `search` terms.

- [ ] **Step 2: Events.** `/events` ports `pageEvents`, `evRow`, `upcomingEvents` and `pastEvents`:
  - Tonight: `LiveStatus` with the countdown; `?live=1` forces the ON AIR state.
  - Upcoming: soonest first.
  - Past: a timeline grouped by year, newest first, with undated events last; "Watch" links; `note` in small text.
  - The caption counts recordings ("4 of 6 have a recording" style, computed).
  - `/live/page.tsx`: `import { redirect } from "next/navigation"; export default function Live(){ redirect("/events"); }`

- [ ] **Step 3: Verify** that `/search?q=raw%20milk` shows 30 or more moments, `/search?q=ai` does not match "said", `/live` redirects to `/events`, and Alex Stein's Watch link carries `t=9287s`.

- [ ] **Step 4: Commit**

```bash
git add src/app/search src/components/search src/app/events src/app/live src/components/show/LiveStatus.tsx
git commit -m "Search and Events: server-backed transcript search UI, events catalog, /live redirect"
```

---

### Task 12: Challenge, Book, Support/Donate, Press, Research

**Files:**
- Create: `src/app/challenge/page.tsx`, `src/components/forms/ChallengeForm.tsx`, `src/components/forms/BookingForm.tsx`, `src/app/support/page.tsx`
- Modify: `src/app/book/page.tsx`, `src/app/donate/page.tsx`, `src/app/press/page.tsx`, `src/app/research/page.tsx`

- [ ] **Step 1: ChallengeForm** (client) uses `useForm("xwvrknog")` from `@formspree/react`, the form the current booking page already uses. That sends challenges to the same inbox, with a hidden `_subject` = "Show challenge". Fields: name, handle and platform, topic (`topTopics(8)` names plus "Something else"), the claim you'll defend, a best-evidence URL, availability, and a honeypot `_gotcha`. Show `ValidationError`s. On success: "Challenge sent. I read every one." Button: "Send challenge".

- [ ] **Step 2: Book.**
  - Rebuild `/book` in the new theme: a lede, `site.bookingFormats` exactly, the topics list from the old page's topics section, verbatim (Greg's own pitch copy), the media kit link and `BookingForm`.
  - `BookingForm` ports the old page's Formspree form (same ID `xwvrknog`, same field names so submissions stay compatible).
  - The old page's media and casting-profile links (media kit, acting resume, one-sheet, press photos, Actors Access, Casting Networks) move to `/press`.

- [ ] **Step 3: Support + Donate.** `/support` ports `pageSupport` (Patreon and Stripe buttons, one sentence: the show is free, every night). `/donate` renders the same component (keep the URL; do not redirect).

- [ ] **Step 4: Press + Research.** Restyle both in the new theme, keeping all existing content and links from their current `page.tsx`. Only swap the components and styling, and run the copy lint.

- [ ] **Step 5: Verify.**
  - Do NOT submit either form: a submission emails a real inbox. Verify that both forms render, that client-side required-field validation blocks an empty submit, and that the honeypot field is hidden.
  - All pages pass at 375px.

- [ ] **Step 6: Commit**

```bash
git add src/app/challenge src/components/forms src/app/support src/app/book/page.tsx src/app/donate/page.tsx src/app/press/page.tsx src/app/research/page.tsx
git commit -m "Pages: challenge form, booking, support/donate, press and research in the Dataset theme"
```

---

### Task 12b: Games page

**Files:**
- Modify: `src/content/types.ts` (add `Game`), `src/content/site.ts` (add `games`), `src/components/site/Header.tsx`, `src/components/site/MobileNav.tsx`, `src/components/site/Footer.tsx`, `tests/content.test.ts`
- Create: `src/app/games/page.tsx`

**Interfaces:**
- Produces: `Game = { title: string; url: string; blurb: string }` and `site.games: Game[]`.

- [ ] **Step 1: Content.** Add `site.games` with exactly these entries, in this order. The blurbs are the sites' own meta descriptions or titles, so write nothing beyond them:
  1. `{ title: "SimEcon", url: "https://simecon.app", blurb: "Pull the levers on taxes and programs and watch the impact on the US deficit, debt, and who pays. Every number is sourced to CBO, JCT, OMB, and Treasury." }`
  2. `{ title: "SimEcon: San Diego", url: "https://simecon.app/san-diego", blurb: "Run the City of San Diego's General Fund: police staffing, pensions, reserves, and the decisions history got wrong. Calibrated to the FY2026 Adopted Budget, IBA reports, and SDCERS valuations." }`
  3. `{ title: "The Gap", url: "https://simecon.app/gap", blurb: "A game about numbers you can't feel." }`
  4. `{ title: "The Class Wargame", url: "https://theclasswargame.com", blurb: "" }` (an empty blurb renders the title and link only)
- [ ] **Step 2: Test.** Add to `tests/content.test.ts`: `it("games link to https", () => { for (const g of site.games) expect(g.url).toMatch(/^https:\/\//); });`. Run it and expect PASS.
- [ ] **Step 3: Page.** `/games` has the title "Games I made" and a one-line lede, "Interactive games I built so you can run the numbers yourself.", then one card per game in figure grammar (title, blurb, and a "Play" link that opens in a new tab with `rel="noopener"`). Server component. Metadata title: "Games".
- [ ] **Step 4: Nav.** Add "Games" (/games) to the header nav after Events, and to the mobile nav and the footer.
- [ ] **Step 5: Verify** at 375px and 1400px. `npm test && npm run lint:copy && npm run build` must pass.
- [ ] **Step 6: Commit**

```bash
git add src/content/types.ts src/content/site.ts src/app/games src/components/site/Header.tsx src/components/site/MobileNav.tsx src/components/site/Footer.tsx tests/content.test.ts
git commit -m "Games: page listing SimEcon, SimEcon San Diego, The Gap, Class Wargame"
```

---

### Task 13: Route smoke test, full verification

**Files:**
- Create: `scripts/check-routes.mjs`
- Modify: `package.json` (script `check:routes`)

- [ ] **Step 1: Write the route checker**

```js
// scripts/check-routes.mjs  usage: node scripts/check-routes.mjs http://localhost:3000
const base = process.argv[2] ?? "http://localhost:3000";
const expect200 = ["/", "/questions", "/questions/new-information", "/questions/vaccines-autism", "/topics/vaccines", "/topics/cancer",
  "/search?q=raw%20milk", "/events", "/games", "/challenge", "/book", "/support", "/donate", "/press", "/research",
  "/api/search?q=measles", "/api/live", "/api/stats", "/api/videos"];
const expectRedirect = ["/booking", "/live"];
const expect404 = ["/topics/origin-of-life", "/questions/nope"];
let bad = 0;
for (const p of expect200) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status !== 200) { console.log("FAIL 200", p, r.status); bad++; } }
for (const p of expectRedirect) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status < 300 || r.status >= 400) { console.log("FAIL 3xx", p, r.status); bad++; } }
for (const p of expect404) { const r = await fetch(base + p, { redirect: "manual" }); if (r.status !== 404) { console.log("FAIL 404", p, r.status); bad++; } }
const home = await (await fetch(base + "/")).text();
if (/hovind/i.test(home.replace(/Most popular[\s\S]*$/i, ""))) { console.log("FAIL Hovind above Most popular on home"); bad++; }
if (bad) process.exit(1); console.log("routes ok");
```

- [ ] **Step 2: Run the full gate**
  - Run `npm run lint && npm run lint:copy && npm test && npm run build`, then `npm start &` and `node scripts/check-routes.mjs http://localhost:3000`. Expected: everything passes and prints "routes ok".
  - Take browser screenshots at 375px and 1400px of `/`, `/questions`, `/topics/vaccines`, `/search?q=autism`, `/events` and `/book`. Check `document.documentElement.scrollWidth <= innerWidth` on each. The console must be clean.

- [ ] **Step 3: Commit**

```bash
git add scripts/check-routes.mjs package.json
git commit -m "Verify: route smoke test (kept URLs, redirects, 404s, Hovind placement)"
```

---

## Out of scope (next plans)

- A post-stream hook that re-runs `scripts/build-dataset.py` after each stream.
- Model-tagged "actual caller questions" to replace keyword counts.
- Pushing the branch or opening a PR (Greg's call).
- Dark theme.
- Per-opponent pages.
