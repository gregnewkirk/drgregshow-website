import { describe, expect, it } from "vitest";
import { countdownParts, isOnAir, nextShowAt, todayPT } from "@/lib/schedule";

describe("Pacific schedule boundaries", () => {
  it.each([
    ["2026-09-29T03:59:59.999Z", false],
    ["2026-09-29T04:00:00.000Z", true],
    ["2026-09-29T05:59:59.999Z", true],
    ["2026-09-29T06:00:00.000Z", false],
    ["2026-12-02T04:59:59.999Z", false],
    ["2026-12-02T05:00:00.000Z", true],
    ["2026-12-02T06:59:59.999Z", true],
    ["2026-12-02T07:00:00.000Z", false],
  ])("on-air state at %s is %s", (now, expected) => {
    expect(isOnAir(new Date(now))).toBe(expected);
  });

  it.each([
    ["2026-09-29T06:59:59.999Z", "2026-09-28"],
    ["2026-09-29T07:00:00.000Z", "2026-09-29"],
    ["2027-01-01T07:59:59.999Z", "2026-12-31"],
    ["2027-01-01T08:00:00.000Z", "2027-01-01"],
  ])("Pacific date at %s is %s", (now, expected) => {
    expect(todayPT(new Date(now))).toBe(expected);
  });

  it.each([
    ["2026-03-08T07:00:00Z", "2026-03-09T04:00:00.000Z"],
    ["2026-11-01T06:00:00Z", "2026-11-02T05:00:00.000Z"],
    ["2027-01-01T07:00:00Z", "2027-01-02T05:00:00.000Z"],
    ["2026-09-29T03:59:59.999Z", "2026-09-29T04:00:00.000Z"],
    ["2026-09-29T04:00:00.000Z", "2026-09-30T04:00:00.000Z"],
  ])("next show after %s is %s", (now, expected) => {
    expect(nextShowAt(new Date(now)).toISOString()).toBe(expected);
  });

  it("clamps elapsed countdowns to zero and floors partial seconds", () => {
    expect(countdownParts(-1000)).toEqual({ h: 0, m: 0, s: 0 });
    expect(countdownParts(999)).toEqual({ h: 0, m: 0, s: 0 });
    expect(countdownParts(3_600_999)).toEqual({ h: 1, m: 0, s: 0 });
  });
});
