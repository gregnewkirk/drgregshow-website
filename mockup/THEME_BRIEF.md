# drgregshow.com theme mockup brief (shared by all 5 themes)

If you opened this file before it existed, re-read it now; it is the contract.

## Who and what

Dr. Gregory M. Newkirk: a Ph.D. molecular biologist who hosts The Dr Greg Show, a live science debate show every night at 9 PM Pacific on YouTube and TikTok. He argues vaccines, evolution, climate, germ theory and COVID origins with people who reject the science, live, with papers on screen. The show has roughly a year of nightly debates; 74 streams (249 hours) are transcribed. That dataset is the site's unique asset.

Primary visitor: fans arriving from a Short or TikTok. Primary action: **Subscribe on YouTube**. Second action, visible at the top of the page: **Support the show** (Patreon + Stripe one-time). Many visitors come to donate, so a support entry point must be in the header or a top strip on every page, clearly but below Subscribe in emphasis.

## Files

- Build ONE self-contained HTML file (inline CSS and JS; Google Fonts allowed; no other CDNs, no build step). Your output path is given in your task.
- Load data with `<script src="content.js"></script>` and `<script src="search-data.js"></script>` (same folder). `window.CONTENT` holds every fact you may use (links, images, metrics, dataset, topics, questions, receipts, featured debate, schedule, credentials, perStream). `window.SEARCH_DATA` = `{videos:[{id,title,date,topic}], chunks:[{v,s,x}]}` (v = YouTube id, s = start seconds, x = caption text).
- Read `content.js` fully before designing. Image paths in it are relative to the mockup folder and work as-is.
- Do not edit any other file. Do not git commit.

## Routes (hash router, all must work)

- `#/` home
- `#/topics/<slug>` topic hub: the topic's questions from `CONTENT.questions`, their receipts, stream count, links into search
- `#/questions` "Most asked on the show": every question, ranked by `streams`, with answer, receipt, figure, citation link, and a "hear it on the show" search link. THIS is the centerpiece feature; Greg called it "really cool" and "utilizing our database, which is unique". Lean into the year-of-debates dataset (counts, `perStream` timeline/heatmap is available).
- `#/search?q=` working transcript search over SEARCH_DATA (substring match is fine), results show video thumb `https://i.ytimg.com/vi/<id>/hqdefault.jpg`, title, timestamp, highlighted snippet, and link to `https://www.youtube.com/watch?v=<id>&t=<s>s`.
- `#/debates/hovind` featured debate page: click-to-play YouTube embed (`https://www.youtube.com/embed/<id>?autoplay=1&start=<t>`), the featured claim and answer with timestamp buttons that seek the player, and the Blount receipt.
- `#/live` live status: countdown to 9 PM America/Los_Angeles; `#/live?live=1` simulates the ON AIR state; schedule from CONTENT.schedule.
- `#/challenge` "Think you can win?" form: name, handle + platform, topic select, claim you'll defend, best evidence link, availability, hidden honeypot. On submit show a confirmation; nothing is sent (mock).
- `#/book` booking page: formats (podcasts, keynotes, live debates, brand partnerships, expert commentary), media kit PDF link (`CONTENT.links.mediaKit`), a mock booking form. Book must be in the main nav.
- `#/support` Patreon and Stripe buttons with one plain sentence on why support matters (the show is free, every night).

Home must include: hero with Subscribe + live/countdown status; support entry at top; the most-asked questions (top 4 at least) with receipts; topic hubs with stream counts; the dataset headline (74 streams, 249 hours, Sep 2025 to Mar 2026) presented honestly; search entry; featured Hovind debate; challenge teaser; credentials; footer with socials, Book, Support.
Do NOT include a "latest videos from YouTube" row (Greg: the feed surfaces very old VODs).

## Truth rules (hard)

- Use only facts, numbers, quotes, citations and links in content.js. Never invent a stat, quote, guest, date, review, or citation. Numbers stay exactly as given ("35K+", not "35,000").
- `receipt: null` questions show "Receipt in review" honestly.
- Charts: draw only from `receipts.*.figure` data (forest plot, bars, timeline). No figure = show the citation and key result text, no invented chart. Label charts "Redrawn from published values".
- The featured claim is NOT attributed to a named person (captions do not identify speakers). Keep its note.
- Dataset counts mean "streams where the topic came up (keyword match)". Say so in small print near the numbers.
- Every citation links to `https://doi.org/<doi>` (or `url` for IPCC).

## Copy rules (hard)

- The site speaks in first person ("I", "my show") or with no subject. NEVER third person ("Dr. Greg explains", "Greg reacts").
- No em dashes or en dashes anywhere (use commas, periods, parentheses, colons). No "leveraging", "spearheading", "cutting-edge".
- Plain, direct, a little punchy. Sentence case. Buttons say exactly what happens ("Subscribe on YouTube", "Support on Patreon", "Send challenge").
- Never mention AI.

## Design quality bar

Greg saw a first mock (cream paper, typewriter labels, red marker circles) and said the styling is "not my favorite". Your theme must look nothing like that. Avoid these generated-page defaults unless your direction explicitly calls for them: cream #F4F1EA background with serif display; near-black + single acid accent; hairline newspaper columns; identical rounded SaaS cards with soft grey shadows and gradient washes; ALL-CAPS tracked eyebrow labels over every heading; "A · B · C" meta strings; monospace for small labels; "→" appended to buttons; one highlighted word in a headline; 01/02/03 numbering on non-sequences; fade-slide-up on every section.

Before coding, write a short plan (4-6 hex palette, 1-2 typefaces with roles, ASCII wireframe of home, 3 principles), check it against the defaults above, revise, then build. Spend boldness in ONE memorable element; keep the rest disciplined.

Quality floor: responsive to 375px with no horizontal page scroll (test `document.documentElement.scrollWidth <= innerWidth`), 44px tap targets, visible keyboard focus, `prefers-reduced-motion` respected, WCAG AA contrast, no console errors.

## Verify before you finish

A static server already serves the repo root at http://127.0.0.1:4417 so your page is at http://127.0.0.1:4417/mockup/<your-file>. If you have browser tools, screenshot home, #/questions, #/search?q=autism and #/book at desktop and 375px mobile, fix what looks wrong, and check the console. If you lack browser tools, at least `curl` the page and syntax-check the JS with `node --check` on an extracted script.

Grep your file for "—" and "–" and third-person "Dr. Greg (explains|reacts|debates|breaks)" patterns; must be zero.

## Report back (short)

File path; the one memorable element; palette + fonts; anything you could not do or any content gap you noticed.

## The five directions (build only yours)

1. **Late Show** (`theme-1-broadcast.html`): a late-night TV network. The site is the channel: a big host shot with a real tally light that goes red at 9 PM PT, lower-third graphics for claims and receipts, a program-guide grid for the schedule and topics, a studio-lighting palette (deep studio blue or plum, warm key light, tally red). The memorable thing: the lower-third "chyron" system that carries the claim and the receipt.
2. **Fight Card** (`theme-2-fightcard.html`): debate as a combat sport. Boxing or wrestling poster typography (wood-type condensed display, stacked billing), tale-of-the-tape for "Claim vs Evidence", a record-style scoreboard of topics, gold/black/blood-red or another sporting palette you choose. Memorable thing: the poster-style hero and the "tale of the tape" receipt layout. Keep it respectful: no mocking of opponents.
3. **The Dataset** (`theme-3-dataset.html`): the year of nightly debates IS the hero. Open with an interactive visualization of `CONTENT.perStream` (74 streams by date x topic, e.g. heatmap strip or streamgraph), then the most-asked ranking as a real chart. Scientific-figure grammar (Panel A, B, C; axis titles; captions), clinical light background with a crisp categorical palette. Memorable thing: the interactive "every night, what we argued about" chart; clicking a topic filters to its questions.
4. **Journal Issue** (`theme-4-journal.html`): the site as a peer-reviewed science journal of the show. The home is an issue cover plus table of contents; each question is an "article" with abstract (answer), figure, and reference. Distinctive editorial grid, a scholarly serif paired with a clean sans, restrained color with one signature ink color. Memorable thing: the cover. Avoid generic broadsheet hairline columns; make it read like a journal cover and article pages.
5. **Creator Energy** (`theme-5-creator.html`): YouTube/TikTok native. Face-forward (use the headshots big), thumbnail-grade contrast, bold sans, saturated palette (e.g. electric blue + hot yellow or your choice), sticker badges, swipeable card stacks for questions on mobile, vertical-video framing. Memorable thing: the face-plus-claim hero that looks like a winning thumbnail. Still honest and science-literate, not clickbait.
