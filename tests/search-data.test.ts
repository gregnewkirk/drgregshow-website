import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { dataset } from "@/content";
import { searchChunks, type Index } from "@/lib/search";

const index: Index = JSON.parse(gunzipSync(readFileSync(new URL("../data/search-index.json.gz", import.meta.url))).toString("utf8"));

describe("packaged search data", () => {
  it("uses the same video metadata as the public dataset", () => {
    expect(index.videos).toEqual(dataset.videos);
    expect(new Set(index.videos.map((video) => video.id)).size).toBe(index.videos.length);
  });

  it("has valid videos and unique, non-negative timestamps for every passage", () => {
    const ids = new Set(index.videos.map((video) => video.id));
    expect(index.videos.every((video) => /^[A-Za-z0-9_-]{11}$/.test(video.id))).toBe(true);
    expect(index.chunks.length).toBeGreaterThan(0);
    expect(index.chunks.every((chunk) => ids.has(chunk.v) && Number.isFinite(chunk.s) && chunk.s >= 0 && chunk.x.trim().length > 0)).toBe(true);
    expect(new Set(index.chunks.map((chunk) => `${chunk.v}:${chunk.s}`)).size).toBe(index.chunks.length);
  });

  it("returns usable timestamped results from the shipped index", () => {
    const { total, results } = searchChunks(index, "raw milk");
    expect(total).toBeGreaterThan(0);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((result) => result.title && /raw milk/i.test(result.snippet))).toBe(true);
  });
});
