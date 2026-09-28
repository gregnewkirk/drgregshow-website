"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import type { Question } from "@/content/types";
import type { Topic } from "@/content";
import { buildTopicStyles, styleFor } from "./palette";

// receiptCite is precomputed server-side (shortCite(site.receipts[q.receipt].cite)) so this
// client component never imports @/content's runtime `site` data.
export type QuestionWithStreams = Question & { streams: number; receiptCite: string | null };

type Props = {
  questions: QuestionWithStreams[];
  activeTopic: string | null;
  topics: Topic[];
  /** Pre-rendered <ReceiptBlock/> elements from a server parent, keyed by receipt id. */
  receiptElements: Record<string, ReactNode>;
};

function tname(topics: Topic[], slug: string) {
  return topics.find((t) => t.slug === slug)?.name ?? slug.replace(/-/g, " ");
}

export default function RankChart({ questions, activeTopic, topics, receiptElements }: Props) {
  const styles = useMemo(() => buildTopicStyles(topics), [topics]);
  const rankOf = (q: QuestionWithStreams) => questions.indexOf(q) + 1;

  const list = useMemo(
    () => (activeTopic ? questions.filter((q) => q.topic === activeTopic) : questions),
    [questions, activeTopic],
  );
  const max = questions[0]?.streams ?? 1;

  const [selectedRank, setSelectedRank] = useState(() => (questions[0] ? rankOf(questions[0]) : -1));

  useEffect(() => {
    setSelectedRank(list[0] ? rankOf(list[0]) : -1);
    // rankOf is a stable pure function of `questions`; re-running when `activeTopic` changes
    // reproduces the mockup's filterRank() auto-selecting the filtered list's first question.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic, questions]);

  const selected = list.find((q) => rankOf(q) === selectedRank) ?? null;

  return (
    <div className="fig2" style={{ marginTop: 14 }}>
      <div>
        <div className="panel-head">
          <span className="panel-l">B</span>
          <h3>Questions ranked by streams where they came up</h3>
        </div>
        <p className="small" id="rankNote" style={{ marginBottom: 8 }}>
          {activeTopic
            ? `Showing ${list.length} of ${questions.length} questions for ${tname(topics, activeTopic)}. `
            : `All ${questions.length} questions. Pick a topic in Figure 1 to filter.`}
        </p>
        {list.length === 0 ? (
          <p className="rank-empty">
            No ranked questions for {activeTopic ? tname(topics, activeTopic) : ""} yet.
          </p>
        ) : (
          <div className="rank">
            {list.map((q) => {
              const rank = rankOf(q);
              const style = styleFor(styles, q.topic);
              return (
                <button
                  key={q.slug}
                  type="button"
                  className="rk"
                  aria-pressed={rank === selectedRank}
                  onClick={() => setSelectedRank(rank)}
                >
                  <span className="pos">{rank}</span>
                  <span>
                    <span className="q">{q.q}</span>
                    <span className="track">
                      <span className="bar" style={{ width: `${(q.streams / max) * 72}%`, background: style.col }} />
                      <span className="val">{q.streams} streams</span>
                    </span>
                    <span className="rc">{q.receiptCite ? `Receipt: ${q.receiptCite}` : "Receipt in review"}</span>
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="detail" aria-live="polite">
        {selected && (
          <>
            <div className="panel-head">
              <span className="panel-l">C</span>
              <h3>The receipt</h3>
            </div>
            <span className="tag" style={{ color: styleFor(styles, selected.topic).ink }}>
              <span className="sw" style={{ background: styleFor(styles, selected.topic).col }} />
              {tname(topics, selected.topic)}
            </span>
            <h3 style={{ fontSize: 22 }}>{selected.q}</h3>
            <p className="ans">{selected.answer}</p>
            {selected.receipt && receiptElements[selected.receipt] ? (
              receiptElements[selected.receipt]
            ) : (
              <span className="review">Receipt in review</span>
            )}
            <div className="row">
              <a className="btn ghost" href={`/questions/${selected.slug}`}>
                Full answer
              </a>
              <a className="btn quiet" href={`/search?q=${encodeURIComponent(selected.search)}`}>
                Hear it on the show
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
