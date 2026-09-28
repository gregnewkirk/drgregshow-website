import Link from "next/link";
import type { Metadata } from "next";
import { questions, site, topics } from "@/content";
import { topTopics } from "@/lib/topics";
import { buildTopicStyles, styleFor } from "@/components/data/palette";
import { ReceiptBlock } from "@/components/figures/Receipt";

// Ports the mockup's pageQuestions()/qCard(). No topic filter chips or the streams-per-question
// bar chart here: the brief for this task asks only for the ranked list, answer, receipt(s) and
// the "Hear it on the show" link, so that is what this page builds. `questions` (from
// @/content/index.ts) is already sorted by streams, descending.
export const metadata: Metadata = {
  title: "Most asked on the show",
};

const topicMap = new Map(topics.map((t) => [t.slug, t]));

export default function QuestionsPage() {
  const top8 = topTopics(8);
  const topicStyles = buildTopicStyles(top8);
  const linkableSlugs = new Set(top8.map((t) => t.slug));

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Most asked on the show</h1>
        <p className="lede">
          The questions that come up night after night, ranked by how many of the transcribed streams they came up
          in. Each one has my short answer and the paper behind it.
        </p>
        <div className="qlist">
          {questions.map((q, i) => {
            const rank = i + 1;
            const receipt = q.receipt ? site.receipts[q.receipt] : null;
            // The mockup's qCard() renders Taylor et al. as a second receipt only on the
            // vaccines-autism (hviid) card, since the answer cites both studies.
            const showTaylor = q.receipt === "hviid" && Boolean(site.receipts.taylor);
            const topicMeta = topicMap.get(q.topic);
            const style = styleFor(topicStyles, q.topic);

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
                        {topicMeta &&
                          (linkableSlugs.has(q.topic) ? (
                            <Link className="tag" style={{ color: style.ink }} href={`/topics/${q.topic}`}>
                              <span className="sw" style={{ background: style.col }} aria-hidden="true" />
                              {topicMeta.name}
                            </Link>
                          ) : (
                            <span className="tag" style={{ color: style.ink }}>
                              <span className="sw" style={{ background: style.col }} aria-hidden="true" />
                              {topicMeta.name}
                            </span>
                          ))}
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
                  {showTaylor && site.receipts.taylor && (
                    <div style={{ marginTop: 16 }}>
                      <p className="small" style={{ marginBottom: 6 }}>
                        The meta-analysis mentioned in the answer:
                      </p>
                      <ReceiptBlock id={`fig-${q.slug}-taylor`} receipt={site.receipts.taylor} />
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
