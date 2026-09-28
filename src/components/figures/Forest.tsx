import type { Figure } from "@/content/types";
import { scaleX } from "./scale";

type ForestFigure = Extract<Figure, { type: "forest" }>;

const TICKS = [0.8, 1.0, 1.2, 1.4];

export default function Forest({ f }: { f: ForestFigure }) {
  const rows = f.rows;
  const W = 360;
  const lab = 110;
  const top = 18;
  const rh = 30;
  const H = top + rows.length * rh + 40;
  const lo = 0.7;
  const hi = 1.4;
  const x = scaleX(lo, hi, lab, W - 10);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Forest plot: ${f.axis}`}>
      {TICKS.map((v) => (
        <g key={v}>
          <line
            x1={x(v)}
            x2={x(v)}
            y1={top - 6}
            y2={H - 34}
            stroke={v === 1 ? "#122433" : "#E6ECF0"}
            strokeWidth={v === 1 ? 1.5 : 1}
            strokeDasharray={v === 1 ? "4 3" : undefined}
          />
          <text x={x(v)} y={H - 20} textAnchor="middle">
            {v.toFixed(1)}
          </text>
        </g>
      ))}
      {rows.map((r, i) => {
        const y = top + i * rh + rh / 2;
        return (
          <g key={r.label}>
            <text x={0} y={y + 4} className="t-ink">
              {r.label}
            </text>
            <line x1={x(r.l)} x2={x(r.u)} y1={y} y2={y} stroke="#122433" strokeWidth={2} />
            <rect x={x(r.e) - 5} y={y - 5} width={10} height={10} fill="#122433" />
            <text x={W} y={y - 9} textAnchor="end" style={{ fontSize: 11 }}>
              {r.e.toFixed(2)} ({r.l.toFixed(2)} to {r.u.toFixed(2)})
            </text>
          </g>
        );
      })}
      <text x={x(1.05)} y={H - 2} textAnchor="middle" className="t-b">
        {f.axis} (95% CI)
      </text>
    </svg>
  );
}
