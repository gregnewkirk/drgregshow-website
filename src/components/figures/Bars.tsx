import type { Figure } from "@/content/types";

type BarsFigure = Extract<Figure, { type: "bars" }>;

export default function Bars({ f }: { f: BarsFigure }) {
  const rows = f.rows;
  const W = 360;
  const lab = 80;
  const top = 6;
  const rh = 40;
  const H = top + rows.length * rh + 34;
  const max = Math.max(...rows.map((r) => r.v));
  const x = (v: number) => (v / max) * (W - lab - 50);

  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Bar chart: ${f.axis}`}>
      {rows.map((r, i) => {
        const y = top + i * rh;
        const w = Math.max(2, x(r.v));
        return (
          <g key={r.label}>
            <text x={0} y={y + 21} className="t-ink">
              {r.label}
            </text>
            <rect x={lab} y={y + 6} width={w} height={22} fill={r.key ? "#0072B2" : "#9AABB8"} />
            <text x={lab + w + 6} y={y + 22} className="t-ink t-b">
              {r.v}
            </text>
          </g>
        );
      })}
      <line x1={lab} x2={lab} y1={0} y2={H - 30} stroke="#122433" />
      <text x={lab} y={H - 6} className="t-b">
        {f.axis}
      </text>
    </svg>
  );
}
