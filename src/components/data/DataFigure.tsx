"use client";

import { useState, type ReactNode } from "react";
import { dataset, questions } from "@/content";
import { topTopics } from "@/lib/topics";
import Heatmap from "./Heatmap";
import RankChart from "./RankChart";

type Props = {
  /** Pre-rendered <ReceiptBlock/> elements from a server parent, keyed by receipt id. */
  receiptElements: Record<string, ReactNode>;
};

// Client wrapper holding the shared activeTopic state for Figure 1 (Heatmap) and Figure 2
// (RankChart + its receipt panel), matching the mockup's setTopic()/filterRank() coupling.
export default function DataFigure({ receiptElements }: Props) {
  const rows = topTopics(8);
  const streams = dataset.perStream;
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  return (
    <>
      <div className="fig">
        <div className="fig-title">
          <span className="fig-no">Figure 1.</span>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Every night, what we argued about</h2>
        </div>
        <div className="panel-head" style={{ marginTop: 14 }}>
          <span className="panel-l">A</span>
          <h3>Keyword mentions per stream, by topic</h3>
        </div>
        <Heatmap rows={rows} streams={streams} onTopic={setActiveTopic} />
        <p className="legend-cap">
          <b>Figure 1A.</b> Each column is one transcribed stream ({dataset.summary.streams} streams,{" "}
          {dataset.summary.hours} hours, {dataset.summary.from} to {dataset.summary.to}). Rows are the {rows.length}{" "}
          topics that came up in the most streams. Each cell is shaded by how many times that topic&apos;s keywords
          appear in the stream transcript, on a log scale; cells under 3 mentions stay blank, matching the counting
          rule. &quot;Shade within topic&quot; scales each row to its own busiest night so quieter topics stay
          readable; &quot;Across topics&quot; uses one scale for all rows. The right margin shows streams where the
          topic&apos;s keywords came up 3 or more times. Rows are labeled directly, and the lower four swatches are
          hatched, so color is never the only cue. Click a topic to filter Figure 2.
        </p>
      </div>

      <div className="fig" style={{ marginTop: 24 }}>
        <div className="fig-title">
          <span className="fig-no">Figure 2.</span>
          <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Most asked on the show</h2>
        </div>
        <RankChart questions={questions} activeTopic={activeTopic} topics={rows} receiptElements={receiptElements} />
        <p className="legend-cap">
          <b>Figure 2.</b> (B) Bar length is the number of streams where the question came up (keyword match on
          transcripts), colored by topic; grey marks a topic outside the top 8. (C) The published result cited for
          the selected question. Charts are redrawn from published values; every citation links to its DOI or
          source.
        </p>
      </div>
    </>
  );
}
