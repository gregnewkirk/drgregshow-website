// Opacity for one heatmap/sparkline cell: 0 below the 3-mention counting rule (mockup's
// "cells under 3 mentions stay blank"), otherwise a log-scaled fill clamped to a 0.12 floor
// so a lone mention still shows as a visible (not invisible) cell.
export function shade(count: number, max: number, rule3 = true): number {
  if ((rule3 && count < 3) || max <= 0) return 0;
  return Math.max(0.12, Math.log1p(count) / Math.log1p(max));
}
