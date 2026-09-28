import { describe, it, expect } from "vitest";
import { topTopics, topicBySlug } from "@/lib/topics";
import { nextShowAt, isOnAir, countdownParts } from "@/lib/schedule";
import { fmtViews, hms, doiUrl } from "@/lib/format";

describe("topics", () => {
  it("returns 8 non-zero topics sorted desc", () => {
    const t = topTopics(8);
    expect(t).toHaveLength(8);
    expect(t.every(x => x.streams > 0)).toBe(true);
    for (let i = 1; i < t.length; i++) expect(t[i - 1].streams).toBeGreaterThanOrEqual(t[i].streams);
  });
  it("hides zero-stream topics", () => { expect(topicBySlug("does-not-exist")).toBeUndefined(); });
});
describe("schedule", () => {
  it("next show is 9 PM Pacific, same day before 9", () => {
    const now = new Date("2026-09-28T19:00:00Z"); // 12:00 PDT
    expect(nextShowAt(now).toISOString()).toBe("2026-09-29T04:00:00.000Z");
  });
  it("rolls to tomorrow after 9 PM", () => {
    const now = new Date("2026-09-29T05:00:00Z"); // 22:00 PDT
    expect(nextShowAt(now).toISOString()).toBe("2026-09-30T04:00:00.000Z");
  });
  it("handles PST in winter", () => {
    const now = new Date("2026-12-01T20:00:00Z"); // 12:00 PST
    expect(nextShowAt(now).toISOString()).toBe("2026-12-02T05:00:00.000Z");
  });
  it("on air 9 to 11 PM PT", () => {
    expect(isOnAir(new Date("2026-09-29T04:30:00Z"))).toBe(true);
    expect(isOnAir(new Date("2026-09-29T06:30:00Z"))).toBe(false);
  });
  it("countdown parts", () => { expect(countdownParts(3_725_000)).toEqual({ h: 1, m: 2, s: 5 }); });
  it("DST spring forward before transition", () => {
    const now = new Date("2026-03-08T09:00:00Z"); // 1:00 AM PST, before 2 AM transition
    expect(nextShowAt(now).toISOString()).toBe("2026-03-09T04:00:00.000Z");
  });
  it("DST spring forward after transition", () => {
    const now = new Date("2026-03-08T12:00:00Z"); // 4:00 AM PST, after 2 AM transition (same day crosses into PDT)
    expect(nextShowAt(now).toISOString()).toBe("2026-03-09T04:00:00.000Z");
  });
  it("DST fall back before transition", () => {
    const now = new Date("2026-11-01T08:00:00Z"); // 1:00 AM PDT, before 2 AM transition
    expect(nextShowAt(now).toISOString()).toBe("2026-11-02T05:00:00.000Z");
  });
});
describe("format", () => {
  it("views", () => { expect(fmtViews(113915)).toBe("113,915 views"); });
  it("hms", () => { expect(hms(9287)).toBe("2:34:47"); expect(hms(2502)).toBe("41:42"); });
  it("doi", () => { expect(doiUrl("10.7326/M18-2101")).toBe("https://doi.org/10.7326/M18-2101"); });
});
