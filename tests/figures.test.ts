import { describe, it, expect } from "vitest";
import { scaleX } from "@/components/figures/scale";

describe("scaleX", () => {
  it("maps domain to range", () => {
    const x = scaleX(0.6, 1.4, 100, 300);
    expect(x(1)).toBe(200);
    expect(x(0.6)).toBe(100);
  });
});
