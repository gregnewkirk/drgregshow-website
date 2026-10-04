import { describe, it, expect } from "vitest";
import { dataset, questions } from "@/content";

describe("generated dataset", () => {
  it("perStream length matches summary", () => {
    expect(dataset.perStream.length).toBe(dataset.summary.streams);
  });
  it("streams run through Sept 2026", () => {
    expect(dataset.perStream.at(-1)!.date >= "2026-09-01").toBe(true);
  });
  it("every topic has a search term", () => {
    for (const t of dataset.topics) expect(t.term.length).toBeGreaterThan(1);
  });
  it("no dashes in generated text", () => {
    expect(JSON.stringify(dataset)).not.toMatch(/[–—]/);
  });
  it("questions carry stream counts", () => {
    expect(questions[0].streams).toBeGreaterThan(0);
  });
  it("no topic blurb mentions Hovind", () => {
    for (const t of dataset.topics) expect(t.blurb).not.toMatch(/hovind/i);
  });
  it("counts each tracked topic using the displayed three-mention rule", () => {
    for (const topic of dataset.topics) {
      if (!dataset.perStream.some((row) => topic.slug in row)) continue;
      const count = dataset.perStream.filter((row) => Number(row[topic.slug]) >= 3).length;
      expect(count, topic.slug).toBe(topic.streams);
    }
  });
  it("keeps the heatmap in date order with one known video per column", () => {
    const videos = new Set(dataset.videos.map((video) => video.id));
    const rows = dataset.perStream;
    expect(new Set(rows.map((row) => row.video)).size).toBe(rows.length);
    for (const [i, row] of rows.entries()) {
      expect(videos.has(row.video), row.video).toBe(true);
      if (i) expect(row.date >= rows[i - 1].date).toBe(true);
    }
  });
});
