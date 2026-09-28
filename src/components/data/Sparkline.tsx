import { shade } from "./shade";
import { hexA } from "./color";

type Props = {
  values: number[];
  color: string;
};

// Server component: one column per stream, shaded by mentions on a log scale (ported from
// mockup's sparkHTML()). No interactivity, so no "use client" needed.
export default function Sparkline({ values, color }: Props) {
  const max = Math.max(1, ...values);
  return (
    <div className="spark" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${values.length},1fr)` }}>
      {values.map((v, i) => {
        const a = shade(v, max);
        return <i key={i} style={{ background: a === 0 ? "var(--empty)" : hexA(color, a) }} />;
      })}
    </div>
  );
}
