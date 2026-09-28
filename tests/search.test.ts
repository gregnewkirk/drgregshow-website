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
