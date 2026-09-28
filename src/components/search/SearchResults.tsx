"use client";

import { useEffect, useState, type ReactNode } from "react";
import { termRegex } from "@/lib/search";
import { hms } from "@/lib/format";

type Hit = { v: string; s: number; title: string; date: string; snippet: string };
type ApiResponse = { q: string; total: number; results: Hit[] };

type Props = {
  q: string;
  videoCount: number;
};

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmtDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return `${MON[m - 1]} ${d}, ${y}`;
}

// Splits `text` on `re` (global) and wraps every match in <mark>, as React elements rather
// than dangerouslySetInnerHTML, per the task-11 rule against injecting HTML strings.
function highlight(text: string, term: string): ReactNode {
  const re = termRegex(term);
  if (!re) return text;
  const g = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = g.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<mark key={m.index}>{m[0]}</mark>);
    last = m.index + m[0].length;
    if (m[0].length === 0) g.lastIndex++;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

// Client component. Never imports from @/content: q and videoCount come in as plain props from
// the server page. Ports the mockup's runSearch()/resultCard()/pageSearch() result body: fetches
// /api/search?q= (Task interfaces), and renders each hit as a card linking to YouTube at the
// second it was said, with the matched term highlighted in the snippet.
export default function SearchResults({ q, videoCount }: Props) {
  // No separate "loading" boolean: staleness is derived by comparing the last-fetched response's
  // own `q` (the API interface echoes it back) to the current term, so every setState call lives
  // inside the fetch's .then callback rather than synchronously at the effect's top level.
  const [data, setData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    const term = q.trim();
    if (!term) {
      return;
    }
    let cancelled = false;
    fetch(`/api/search?q=${encodeURIComponent(term)}`)
      .then((res) => res.json())
      .then((json: ApiResponse) => {
        if (!cancelled) setData(json);
      });
    return () => {
      cancelled = true;
    };
  }, [q]);

  const term = q.trim();

  if (!term) {
    return (
      <p className="small" style={{ marginTop: 16 }}>
        Type a word or phrase. Search covers {videoCount} videos.
      </p>
    );
  }

  if (!data || data.q !== term) {
    return (
      <p className="small" style={{ marginTop: 16 }} aria-live="polite">
        Searching...
      </p>
    );
  }

  const { total, results } = data;

  if (!results.length) {
    return (
      <p style={{ marginTop: 16 }} aria-live="polite">
        No moments match &quot;{term}&quot;. Try a shorter word.
      </p>
    );
  }

  const countText = total > results.length ? `First ${results.length} of ${total.toLocaleString("en-US")}` : `${total}`;

  return (
    <>
      <p className="small" style={{ marginTop: 16 }} aria-live="polite">
        {countText} moments matching &quot;{term}&quot; across {videoCount} videos.
      </p>
      <div className="results">
        {results.map((r) => {
          const isHovind = /hovind/i.test(r.title);
          const title = isHovind ? `Stream, ${fmtDate(r.date)}` : r.title || "Stream";
          return (
            <a
              className="card res"
              key={`${r.v}-${r.s}`}
              href={`https://www.youtube.com/watch?v=${r.v}&t=${Math.floor(r.s)}s`}
              target="_blank"
              rel="noopener"
            >
              {isHovind ? (
                <span className="thumbph" aria-hidden="true">
                  Stream
                </span>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={`https://i.ytimg.com/vi/${r.v}/mqdefault.jpg`} alt="" loading="lazy" width={120} height={68} />
              )}
              <div>
                <div className="rt">{title}</div>
                <div className="small">{r.date ? fmtDate(r.date) : ""}</div>
                <p className="sn">
                  <span className="ts">{hms(r.s)}</span>
                  {highlight(r.snippet, term)}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </>
  );
}
