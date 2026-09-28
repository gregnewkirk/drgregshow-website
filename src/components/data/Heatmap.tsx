"use client";

import { useCallback, useId, useMemo, useState } from "react";
import type { KeyboardEvent, PointerEvent, MouseEvent } from "react";
import type { StreamRow, Topic } from "@/content";
import { shade } from "./shade";
import { hexA } from "./color";
import { buildTopicStyles } from "./palette";

const ROWH = 44;
const ROW_GAP = 4;
const GAP_UNITS = ROW_GAP / ROWH;

const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function fmtDate(iso: string, withDow = false) {
  if (!iso) return "";
  const p = iso.split("-").map(Number);
  const d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
  return (withDow ? `${DOW[d.getUTCDay()]}, ` : "") + `${MON[p[1] - 1]} ${p[2]}, ${p[0]}`;
}

function defaultColFor(streams: StreamRow[], topicKeys: string[]) {
  let best = -1;
  let bi = 0;
  streams.forEach((s, i) => {
    const total = topicKeys.reduce((sum, k) => sum + (Number(s[k]) || 0), 0);
    if (total > best) {
      best = total;
      bi = i;
    }
  });
  return bi;
}

function breakIndexFor(streams: StreamRow[]) {
  for (let i = 1; i < streams.length; i++) {
    const a = new Date(streams[i - 1].date).getTime();
    const b = new Date(streams[i].date).getTime();
    if ((b - a) / 864e5 > 30) return i;
  }
  return -1;
}

type Props = {
  rows: Topic[];
  streams: StreamRow[];
  onTopic?: (slug: string | null) => void;
};

export default function Heatmap({ rows, streams, onTopic }: Props) {
  const topicKeys = useMemo(() => rows.map((r) => r.slug), [rows]);
  const styles = useMemo(() => buildTopicStyles(rows), [rows]);
  const n = streams.length;
  const readoutId = useId();

  const [col, setColState] = useState(() => defaultColFor(streams, topicKeys));
  const [topic, setTopicState] = useState<string | null>(null);
  const [scale, setScale] = useState<"within" | "across">("within");

  const breakIndex = useMemo(() => breakIndexFor(streams), [streams]);

  const maxWithin = useMemo(() => {
    const m: Record<string, number> = {};
    topicKeys.forEach((k) => {
      m[k] = Math.max(0, ...streams.map((s) => Number(s[k]) || 0));
    });
    return m;
  }, [streams, topicKeys]);

  const maxAcross = useMemo(() => {
    let m = 0;
    streams.forEach((s) => topicKeys.forEach((k) => (m = Math.max(m, Number(s[k]) || 0))));
    return m;
  }, [streams, topicKeys]);

  const maxT = useMemo(() => Math.max(1, ...rows.map((r) => r.streams)), [rows]);

  const ticks = useMemo(() => {
    const out: { pos: number; tight: boolean; label: string }[] = [];
    let last = "";
    let lastPos = -100;
    streams.forEach((r, i) => {
      const m = r.date.slice(0, 7);
      if (m === last) return;
      last = m;
      const parts = r.date.split("-");
      const pos = (i / n) * 100;
      if (pos - lastPos < 5) return;
      const tight = pos - lastPos < 13;
      lastPos = pos;
      out.push({ pos, tight, label: MON[Number(parts[1]) - 1] + (parts[1] === "01" || i === 0 ? ` ${parts[0]}` : "") });
    });
    return out;
  }, [streams, n]);

  const setCol = useCallback(
    (i: number) => {
      setColState(Math.max(0, Math.min(n - 1, i)));
    },
    [n],
  );

  function idxFromClientX(el: Element, clientX: number) {
    const b = el.getBoundingClientRect();
    return Math.floor(((clientX - b.left) / b.width) * n);
  }

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    setCol(idxFromClientX(e.currentTarget, e.clientX));
  }

  function setTopic(k: string | null) {
    const next = topic === k ? null : k;
    setTopicState(next);
    onTopic?.(next);
  }

  function handleGridClick(e: MouseEvent<HTMLDivElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    const rowIdx = Math.floor(((e.clientY - b.top) / b.height) * rows.length);
    const k = topicKeys[Math.max(0, Math.min(rows.length - 1, rowIdx))];
    setTopic(k);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      setCol(col + 1);
      e.preventDefault();
    } else if (e.key === "ArrowLeft") {
      setCol(col - 1);
      e.preventDefault();
    } else if (e.key === "Home") {
      setCol(0);
      e.preventDefault();
    } else if (e.key === "End") {
      setCol(n - 1);
      e.preventDefault();
    }
  }

  function cellFill(slug: string, v: number) {
    const max = scale === "within" ? maxWithin[slug] : maxAcross;
    const a = shade(v, max);
    return a === 0 ? "var(--empty)" : hexA(styles[slug].col, a);
  }

  const r = streams[col];
  const rowMax = r ? Math.max(1, ...topicKeys.map((k) => Number(r[k]) || 0)) : 1;

  return (
    <>
      <div className="hm-controls" role="group" aria-label="Filter by topic">
        {rows.map((t) => (
          <button
            key={t.slug}
            type="button"
            className="chip"
            aria-pressed={topic === t.slug}
            onClick={() => setTopic(t.slug)}
          >
            <span className={`sw${styles[t.slug].pat ? " pat" : ""}`} style={{ background: styles[t.slug].col }} />
            {t.name} <span className="n">{t.streams}</span>
          </button>
        ))}
        <div className="seg" role="group" aria-label="Shade scale">
          <button type="button" aria-pressed={scale === "within"} onClick={() => setScale("within")}>
            Shade within topic
          </button>
          <button type="button" aria-pressed={scale === "across"} onClick={() => setScale("across")}>
            Across topics
          </button>
        </div>
      </div>

      <div className={`hm${topic ? " filtered" : ""}`} style={{ ["--cols" as string]: n }}>
        <div className="hm-labels">
          {rows.map((t) => (
            <button
              key={t.slug}
              type="button"
              className="hm-lab"
              aria-pressed={topic === t.slug}
              onClick={() => setTopic(t.slug)}
            >
              <span className={`sw${styles[t.slug].pat ? " pat" : ""}`} style={{ background: styles[t.slug].col }} />
              <span className="full">{t.name}</span>
              <span className="abbr">{styles[t.slug].abbr}</span>
            </button>
          ))}
        </div>

        <div
          className="hm-grid"
          tabIndex={0}
          role="application"
          aria-label={`Heatmap of ${n} streams by topic. Use left and right arrow keys to read one stream at a time.`}
          aria-describedby={readoutId}
          style={{
            display: "block",
            height: `calc(var(--rowh) * ${rows.length} + ${(rows.length - 1) * ROW_GAP}px)`,
          }}
          onPointerMove={handlePointerMove}
          onPointerDown={handlePointerMove}
          onClick={handleGridClick}
          onKeyDown={handleKeyDown}
        >
          <svg
            viewBox={`0 0 ${n} ${rows.length + (rows.length - 1) * GAP_UNITS}`}
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            style={{ display: "block" }}
            aria-hidden="true"
          >
            {rows.map((t, ri) => (
              <g key={t.slug} opacity={topic && topic !== t.slug ? 0.18 : 1}>
                {streams.map((s, ci) => (
                  <rect
                    key={ci}
                    x={ci}
                    y={ri * (1 + GAP_UNITS)}
                    width={1}
                    height={1}
                    fill={cellFill(t.slug, Number(s[t.slug]) || 0)}
                  />
                ))}
              </g>
            ))}
          </svg>
          {breakIndex > 0 && (
            <div className="hm-break" style={{ left: `calc(${(breakIndex / n) * 100}% - 1px)` }} aria-hidden="true" />
          )}
          <div
            className="hm-cursor"
            aria-hidden="true"
            style={{ left: `calc(${(col / n) * 100}% - 2px)`, width: `calc(${100 / n}% + 4px)` }}
          />
        </div>

        <div className="hm-marg">
          {rows.map((t) => (
            <div key={t.slug} className={`hm-bar${topic === t.slug ? " sel" : ""}`}>
              <span style={{ width: `${Math.round((t.streams / maxT) * 56)}px`, background: styles[t.slug].col }} />
              {t.streams}
            </div>
          ))}
        </div>

        <div />
        <div className="hm-x">
          {ticks.map((tk, i) => (
            <span key={i} className={tk.tight ? "tight" : ""} style={{ left: `${tk.pos}%` }}>
              {tk.label}
            </span>
          ))}
        </div>
        <div className="hm-mt">Streams counted</div>

        <div />
        <div className="hm-xt">
          Streams in date order, {fmtDate(streams[0]?.date)} to {fmtDate(streams[n - 1]?.date)} (one column per
          stream; spacing is by stream, not by calendar day)
        </div>
        <div />
      </div>

      <div className="readout" id={readoutId} aria-live="polite">
        {r && (
          <>
            <div className="rd-date">
              {fmtDate(r.date, true)}
              <small>
                Stream {col + 1} of {n}.{" "}
                <a href={`https://www.youtube.com/watch?v=${r.video}`} target="_blank" rel="noopener">
                  Watch this stream
                </a>
              </small>
            </div>
            <div className="rd-bars">
              {rows.map((t) => {
                const x = Number(r[t.slug]) || 0;
                return (
                  <div key={t.slug} title={t.name}>
                    <span className="t">{styles[t.slug].abbr}</span>
                    <b>{x}</b>
                    <em>
                      <s style={{ width: `${(x / rowMax) * 100}%`, background: styles[t.slug].col }} />
                    </em>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}
