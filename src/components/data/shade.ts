// Opacity for one heatmap/sparkline cell. Ported from mockup/theme-3-dataset.html's
// inline shade() (0.14 + 0.86*log-scale) and the brief's canonical rule-of-3 cutoff:
// cells under 3 mentions stay blank, matching the show's counting rule.
export function shade(count: number, max: number, rule3 = true): number {
  if ((rule3 && count < 3) || max <= 0) return 0;
  return Math.max(0.12, Math.log1p(count) / Math.log1p(max));
}
