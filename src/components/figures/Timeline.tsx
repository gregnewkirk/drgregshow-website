import type { Figure } from "@/content/types";
import { scaleX } from "./scale";

type TimelineFigure = Extract<Figure, { type: "timeline" }>;

const TICKS = [0, 10000, 20000, 30000];

export default function Timeline({ f }: { f: TimelineFigure }) {
  const W = 360;
  const H = 120;
  const pad = 8;
  const x = scaleX(0, f.max, pad, W - pad);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Timeline: ${f.axis}`}>
      <line x1={pad} x2={W - pad} y1={54} y2={54} stroke="#122433" strokeWidth={1.5} />
      {TICKS.map((g) => (
        <g key={g}>
          <line x1={x(g)} x2={x(g)} y1={54} y2={60} stroke="#122433" />
          <text x={x(g)} y={74} textAnchor={g === 0 ? "start" : "middle"}>
            {g / 1000}k
          </text>
        </g>
      ))}
      {f.events.map((e, i) => {
        const cx = x(e.g);
        const up = i % 2 === 0;
        const anchor = cx < 60 ? "start" : cx > W - 90 ? "end" : "middle";
        return (
          <g key={e.label}>
            <circle
              cx={cx}
              cy={54}
              r={e.key ? 7 : 5}
              fill={e.key ? "#009E73" : "#fff"}
              stroke={e.key ? "#00704F" : "#122433"}
              strokeWidth={2}
            />
            <text
              x={cx}
              y={up ? 36 : 98}
              textAnchor={anchor}
              className={e.key ? "t-ink t-b" : undefined}
              style={{ fontSize: 11.5 }}
            >
              {e.label}
            </text>
          </g>
        );
      })}
      <text x={W / 2} y={H - 2} textAnchor="middle" className="t-b">
        {f.axis}
      </text>
    </svg>
  );
}
