import Image from "next/image";
import Link from "next/link";
import { site, dataset } from "@/content";
import { topTopics } from "@/lib/topics";
import { buildTopicStyles, styleFor } from "@/components/data/palette";
import DataFigureServer from "@/components/data/DataFigureServer";
import Sparkline from "@/components/data/Sparkline";
import Countdown from "@/components/show/Countdown";
import PopularGrid from "@/components/show/PopularGrid";
import UpcomingTeaser from "@/components/show/UpcomingTeaser";

// Search suggestion chips: literal `search` values already used by site.questions entries in
// @/content/site.ts (autism, mrna, lab leak, new information, raw milk), matching the mockup's
// home suggestion chips. Not importing `questions` here since it is not a listed home-page
// interface; these are query strings, not facts, so hardcoding the same known terms is safe.
const SEARCH_SUGGESTIONS = ["autism", "mrna", "lab leak", "new information", "raw milk"];

export default function Home() {
  const summary = dataset.summary;
  const top8 = topTopics(8);
  const topicStyles = buildTopicStyles(top8);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>Every night I argue science live. Here is a year of it, charted.</h1>
            <p className="lede">
              I am a Ph.D. molecular biologist. At 9 PM Pacific I debate people who reject vaccines,
              evolution, climate science and germ theory, with the papers on screen. {summary.streams} of
              those streams are transcribed, so you can see what we actually argue about.
            </p>
            <div className="row">
              <a className="btn primary" href={site.links.subscribe} target="_blank" rel="noopener">
                <svg className="yt" viewBox="0 0 18 13" aria-hidden="true">
                  <rect width="18" height="13" rx="3.5" fill="#fff" />
                  <path d="M7 3.6v5.8L12 6.5z" fill="#0E3A5B" />
                </svg>
                Subscribe on YouTube
              </a>
              <Link className="btn ghost" href="/donate">
                Support the show
              </Link>
            </div>
            <Link
              className="card livebox"
              href="/events"
              style={{ textDecoration: "none", color: "inherit", display: "grid" }}
            >
              <span className="lbl">
                <span className="dot" aria-hidden="true" />
                Tonight
              </span>
              <span className="count num">
                <Countdown variant="card" />
              </span>
              <span className="small">YouTube and TikTok, every night</span>
            </Link>
          </div>
          <figure className="plate">
            <div className="ph">
              <Image
                src={site.images.portrait}
                alt="Portrait of me, Gregory Newkirk"
                width={960}
                height={1440}
                priority
              />
            </div>
            <figcaption>
              <b>Plate 1.</b> Your host. {site.credentials[0]}. {site.credentials[1]}.
            </figcaption>
          </figure>
        </div>
      </section>

      <section style={{ paddingTop: 8 }}>
        <div className="wrap">
          <DataFigureServer />
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="stats">
            <div className="stat">
              <b>{summary.streams}</b>
              <span>streams transcribed</span>
            </div>
            <div className="stat">
              <b>{summary.hours}</b>
              <span>hours of live debate</span>
            </div>
            <div className="stat">
              <b>{summary.from}</b>
              <span>first stream in the set</span>
            </div>
            <div className="stat">
              <b>{summary.to}</b>
              <span>latest stream in the set</span>
            </div>
          </div>
          <p className="small" style={{ marginTop: 10 }}>
            {summary.note}
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="sec-head">
            <div>
              <h2>Topic hubs</h2>
              <p className="lede" style={{ marginTop: 6 }}>
                The {top8.length} topics that came up in the most streams. Each strip is the same{" "}
                {summary.streams}-stream timeline from Figure 1.
              </p>
            </div>
          </div>
          <div className="topics">
            {top8.map((t) => {
              const style = styleFor(topicStyles, t.slug);
              const values = dataset.perStream.map((s) => Number(s[t.slug]) || 0);
              return (
                <Link
                  key={t.slug}
                  className="card topic"
                  href={`/topics/${t.slug}`}
                  style={{ borderLeftColor: style.col }}
                >
                  <span className="tn">
                    <b>{t.name}</b>
                    <span>{t.streams}</span>
                  </span>
                  <p>{t.blurb}</p>
                  <Sparkline values={values} color={style.col} />
                  <span className="small">{t.streams} streams</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <UpcomingTeaser events={site.events} />

      <PopularGrid popular={site.popular} />

      <section style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="card" style={{ padding: 24 }}>
            <h2>Search the transcripts</h2>
            <p className="lede" style={{ margin: "8px 0 6px" }}>
              Find the exact moment a claim came up and jump to it on YouTube.
            </p>
            <form className="sbox" role="search" action="/search" method="get">
              <label className="sr" htmlFor="sq">
                Search the transcripts
              </label>
              <input id="sq" name="q" type="search" placeholder="Try autism, mRNA, lab leak" autoComplete="off" />
              <button className="btn primary" type="submit">
                Search transcripts
              </button>
            </form>
            <div className="sugg">
              {SEARCH_SUGGESTIONS.map((s) => (
                <Link key={s} className="chip" href={`/search?q=${encodeURIComponent(s)}`}>
                  {s}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="wrap two">
          <div className="card" style={{ padding: 24, display: "grid", gap: 12, alignContent: "start" }}>
            <h2>Think you can win?</h2>
            <p className="lede">
              Bring the claim you will defend and your best evidence. If it holds up to a first look, I will
              book you on the show.
            </p>
            <div>
              <Link className="btn primary" href="/challenge">
                Challenge me
              </Link>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="creds">
              <div>
                <h2 style={{ fontSize: 24, marginBottom: 10 }}>Who you are debating</h2>
                <ul>
                  {site.credentials.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="metrics">
              {site.metrics.map((m) => (
                <div key={m.label}>
                  <b>{m.value}</b>
                  <span>{m.label}</span>
                </div>
              ))}
            </div>
            <p className="small" style={{ marginTop: 8 }}>
              Audience figures: {site.metrics[0]?.source}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
