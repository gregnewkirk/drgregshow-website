import type { ReactNode } from "react";
import type { StreamRow } from "@/content";
import { dataset, questions, site, topics } from "@/content";
import { topTopics } from "@/lib/topics";
import { shortCite } from "@/lib/format";
import { ReceiptBlock } from "@/components/figures/Receipt";
import DataFigure from "./DataFigure";

// Server component: the only place that imports @/content's runtime data (dataset, questions,
// site) for Figures 1 and 2. Strips it down to serializable props before handing it to the
// client component, so no video titles or other dataset.json/site.ts content reach the client
// bundle. Later pages render this instead of <DataFigure/> directly.
export default function DataFigureServer() {
  const rows = topTopics(8);
  const slugs = rows.map((r) => r.slug);

  const streams: StreamRow[] = dataset.perStream.map((s) => {
    const trimmed: StreamRow = { date: s.date, video: s.video };
    slugs.forEach((slug) => {
      trimmed[slug] = Number(s[slug]) || 0;
    });
    return trimmed;
  });

  const receiptElements: Record<string, ReactNode> = {};
  for (const q of questions) {
    if (q.receipt && site.receipts[q.receipt] && !receiptElements[q.receipt]) {
      receiptElements[q.receipt] = <ReceiptBlock id={`receipt-${q.receipt}`} receipt={site.receipts[q.receipt]} />;
    }
  }

  const questionsWithCite = questions.map((q) => ({
    ...q,
    receiptCite: q.receipt && site.receipts[q.receipt] ? shortCite(site.receipts[q.receipt].cite) : null,
  }));

  // Every topic's name, not just the top 8 in `rows`, so RankChart never falls back to a raw
  // slug (e.g. "germ terrain") for a question outside the top 8.
  const topicNames: Record<string, string> = {};
  for (const t of topics) {
    topicNames[t.slug] = t.name;
  }

  return (
    <DataFigure
      rows={rows}
      streams={streams}
      questions={questionsWithCite}
      summary={{
        streams: dataset.summary.streams,
        hours: dataset.summary.hours,
        from: dataset.summary.from,
        to: dataset.summary.to,
      }}
      topicNames={topicNames}
      receiptElements={receiptElements}
    />
  );
}
