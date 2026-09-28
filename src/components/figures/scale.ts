export const scaleX = (lo: number, hi: number, x0: number, x1: number) => (v: number) =>
  x0 + ((v - lo) * (x1 - x0)) / (hi - lo);
