import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dataset, questions, site } from "@/content";
import { topTopics, topicBySlug } from "@/lib/topics";
import { loadIndex } from "@/lib/search-index";
import { searchChunks } from "@/lib/search";
import { hms } from "@/lib/format";
import { ReceiptBlock } from "@/components/figures/Receipt";
import Sparkline from "@/components/data/Sparkline";
import { buildTopicStyles, styleFor } from "@/components/data/palette";

type Params = { slug: string };

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MON[m - 1]} ${d}, ${y}`;
}

// Only the top 8 hubs exist; every other slug (including "origin-of-life") 404s.
export function generateStaticParams() {
  return topTopics(8).map((t) => ({ slug: t.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = topicBySlug(slug);
  return { title: t ? `${t.name}, The Dr Greg Show` : "Topic not found" };
}

// Ports the mockup's topicMoments(): the top 6 transcript chunks for the topic's search term,
// one per video, ranked by how many times the term appears in that chunk.
async function topicMoments(term: string) {
  const index = await loadIndex();
  const { total, results } = searchChunks(index, term, 200);
  const seen = new Set<string>();
  const list = [];
  for (const r of results) {
    if (seen.has(r.v)) continue;
    seen.add(r.v);
    list.push(r);
    if (list.length >= 6) break;
  }
  return { term, total, list };
}

// Ports the mockup's pageTopic(): stats (streams tracked, busiest night), a sparkline across all
// streams, this topic's questions with receipts, and "Moments on stream" from the transcript index.
export default async function TopicPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const topic = topicBySlug(slug);
  if (!topic) {
    notFound();
  }

  const topicStyles = buildTopicStyles(topTopics(8));
  const style = styleFor(topicStyles, slug);

  const list = questions.filter((q) => q.topic === slug);
  const perStream = dataset.perStream;
  const tracked = perStream.length > 0 && slug in perStream[0];
  const peak = tracked
    ? perStream.reduce((best, r) => ((Number(r[slug]) || 0) > (Number(best[slug]) || 0) ? r : best), perStream[0])
    : null;
  const values = tracked ? perStream.map((r) => Number(r[slug]) || 0) : [];

  const mo = await topicMoments(topic.term);
  const otherSearches = Array.from(new Set(list.map((q) => q.search))).filter((s) => s !== mo.term);

  return (
    <section className="page-head">
      <div className="wrap">
        <Link className="back" href="/">
          Back to home
        </Link>
        <div className="row" style={{ gap: 14 }}>
          <span className={`sw${style.pat ? " pat" : ""}`} style={{ background: style.col, width: 22, height: 22 }} aria-hidden="true" />
          <h1>{topic.name}</h1>
        </div>
        <p className="lede">{topic.blurb}</p>

        <div className="stats" style={{ marginTop: 20 }}>
          <div className="stat">
            <b>{topic.streams}</b>
            <span>streams where it came up 3+ times</span>
          </div>
          <div className="stat">
            <b>{dataset.summary.streams}</b>
            <span>streams in the dataset</span>
          </div>
          {list.length ? (
            <div className="stat">
              <b>{list.length}</b>
              <span>ranked questions</span>
            </div>
          ) : (
            <div className="stat">
              <b>{mo.total.toLocaleString("en-US")}</b>
              <span>transcript passages that say &quot;{mo.term}&quot;</span>
            </div>
          )}
          <div className="stat">
            <b>{peak ? fmtDate(String(peak.date)) : "None"}</b>
            <span>
              {peak ? (
                <>
                  busiest night (
                  <a href={`https://www.youtube.com/watch?v=${peak.video}`} target="_blank" rel="noopener">
                    {fmtDate(String(peak.date))}
                  </a>
                  , {peak[slug]} mentions)
                </>
              ) : (
                "not tracked per stream"
              )}
            </span>
          </div>
        </div>

        {tracked && (
          <div className="fig" style={{ marginTop: 20 }}>
            <div className="panel-head">
              <span className="panel-l">A</span>
              <h3>
                {topic.name} mentions across {dataset.summary.streams} streams
              </h3>
            </div>
            <div className="spark-lg" style={{ height: 48 }}>
              <Sparkline values={values} color={style.col} />
            </div>
            <p className="legend-cap">
              <b>Figure A.</b> One column per stream in date order, {fmtDate(perStream[0]?.date as string)} to{" "}
              {fmtDate(perStream[perStream.length - 1]?.date as string)}. Shade is keyword mentions on a log scale,
              scaled to this topic&apos;s busiest night. Streams under 3 mentions stay blank.
            </p>
          </div>
        )}

        {list.length > 0 && (
          <>
            <h2 style={{ marginTop: 36 }}>Questions in this hub</h2>
            <div className="qlist">
              {list.map((q) => {
                const receipt = q.receipt ? site.receipts[q.receipt] : null;
                const rank = questions.indexOf(q) + 1;
                return (
                  <article className="card qitem" id={`q${rank}`} key={q.slug}>
                    <div>
                      <div className="qh">
                        <span className="rankno">{rank}</span>
                        <div>
                          <h3>
                            <Link href={`/questions/${q.slug}`}>{q.q}</Link>
                          </h3>
                          <div className="meta">
                            <span className="num">
                              <b>{q.streams}</b> streams where it came up
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="ans">{q.answer}</p>
                      <div className="acts">
                        <Link className="btn ghost" href={`/search?q=${encodeURIComponent(q.search)}`}>
                          Hear it on the show
                        </Link>
                      </div>
                    </div>
                    <div className="qfig">
                      <div className="panel-head">
                        <span className="panel-l">R</span>
                        <h3>Receipt</h3>
                      </div>
                      {receipt ? (
                        <ReceiptBlock id={`fig-${q.slug}`} receipt={receipt} />
                      ) : (
                        <span className="review">Receipt in review</span>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </>
        )}

        <div className="fig" style={{ marginTop: 28 }}>
          <div className="panel-head">
            <span className="panel-l">{tracked ? "B" : "A"}</span>
            <h3>Moments on stream: &quot;{mo.term}&quot;</h3>
          </div>
          {mo.list.length ? (
            <div className="moments">
              {mo.list.map((c) => {
                const title = /hovind/i.test(c.title) ? `Stream, ${fmtDate(c.date)}` : c.title || "Stream";
                return (
                  <a
                    className="card res"
                    key={`${c.v}-${c.s}`}
                    href={`https://www.youtube.com/watch?v=${c.v}&t=${Math.floor(c.s)}s`}
                    target="_blank"
                    rel="noopener"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`https://i.ytimg.com/vi/${c.v}/hqdefault.jpg`} alt="" loading="lazy" width={120} height={68} />
                    <div>
                      <div className="rt">{title}</div>
                      <div className="small">{c.date ? fmtDate(c.date) : ""}</div>
                      <p className="sn">
                        <span className="ts">{hms(c.s)}</span>
                        {c.snippet}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          ) : (
            <p>No transcript moments found for &quot;{mo.term}&quot;.</p>
          )}
          <p className="legend-cap">
            <b>Figure {tracked ? "B" : "A"}.</b> Transcript passages that mention &quot;{mo.term}&quot; the most, one
            per video, from {mo.total} matching passages. Each opens YouTube at that second.
          </p>
          <div className="row" style={{ marginTop: 12 }}>
            <Link className="btn ghost" href={`/search?q=${encodeURIComponent(mo.term)}`}>
              See all moments
            </Link>
            {otherSearches.map((s) => (
              <Link className="chip" key={s} href={`/search?q=${encodeURIComponent(s)}`}>
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
