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
});
