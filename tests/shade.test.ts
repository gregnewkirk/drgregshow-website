import { describe, it, expect } from "vitest";
import { shade } from "@/components/data/shade";

describe("shade", () => {
  it("zero below the 3-mention rule", () => {
    expect(shade(2, 100)).toBe(0);
  });
  it("log-scales within max", () => {
    expect(shade(100, 100)).toBeCloseTo(1);
    expect(shade(10, 100)).toBeGreaterThan(0.3);
  });
});
