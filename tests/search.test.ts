import { describe, it, expect } from "vitest";
import { termRegex, searchChunks, snippet } from "@/lib/search";

const index = {
  videos: [{ id: "A", title: "Stream A", date: "2026-01-01", topic: "vaccines", source: "ares" }],
  chunks: [
    { v: "A", s: 10, x: "we talked about raw milk today" },
    { v: "A", s: 40, x: "she said AI will replace doctors" },
    { v: "A", s: 70, x: "the paid stuff said nothing" }
  ]
};

describe("search", () => {
  it("short terms match whole words only", () => {
    const r = searchChunks(index, "AI");
    expect(r.total).toBe(1);
    expect(r.results[0].s).toBe(40);
  });
  it("phrases match", () => {
    expect(searchChunks(index, "raw milk").results[0].s).toBe(10);
  });
  it("blank query returns nothing", () => {
    expect(searchChunks(index, "  ").total).toBe(0);
    expect(termRegex("")).toBeNull();
  });
  it("snippet contains the term", () => {
    expect(snippet("x ".repeat(200) + "raw milk here", "raw milk")).toContain("raw milk");
  });
  it("regex special chars are escaped", () => {
    expect(() => searchChunks(index, "c++ (")).not.toThrow();
  });
});

describe("search ordering and cap", () => {
  const multiVideoIndex = {
    videos: [
      { id: "OLD", title: "Old Stream", date: "2025-01-01", topic: "vaccines", source: "ares" },
      { id: "NEW", title: "New Stream", date: "2026-01-01", topic: "vaccines", source: "ares" },
    ],
    chunks: [
      // OLD has 5 matching chunks (more than the per-video cap of 3).
      { v: "OLD", s: 10, x: "vaccine talk one" },
      { v: "OLD", s: 20, x: "vaccine talk two" },
      { v: "OLD", s: 30, x: "vaccine talk three" },
      { v: "OLD", s: 40, x: "vaccine talk four" },
      { v: "OLD", s: 50, x: "vaccine talk five" },
      // NEW has 2 matching chunks.
      { v: "NEW", s: 5, x: "vaccine talk six" },
      { v: "NEW", s: 15, x: "vaccine talk seven" },
    ],
  };

  it("sorts hits newest-first by video date", () => {
    const { results } = searchChunks(multiVideoIndex, "vaccine");
    expect(results[0].v).toBe("NEW");
    expect(results[1].v).toBe("NEW");
    expect(results[2].v).toBe("OLD");
  });

  it("caps at 3 hits per video before applying the overall limit", () => {
    const { total, results } = searchChunks(multiVideoIndex, "vaccine");
    expect(total).toBe(7);
    const oldHits = results.filter((r) => r.v === "OLD");
    const newHits = results.filter((r) => r.v === "NEW");
    expect(oldHits.length).toBe(3);
    expect(newHits.length).toBe(2);
    expect(results.length).toBe(5);
  });

  it("applies the overall limit after the per-video cap", () => {
    const { results } = searchChunks(multiVideoIndex, "vaccine", 4);
    expect(results.length).toBe(4);
  });
});
