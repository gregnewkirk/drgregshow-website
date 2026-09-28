import { describe, it, expect } from "vitest";
import { site } from "@/content/site";

const all = JSON.stringify(site);
describe("curated content", () => {
  it("has no em or en dashes", () => {
    expect(all).not.toMatch(/[–—]/);
  });
  it("never speaks of Greg in third person", () => {
    expect(all).not.toMatch(/\b(Dr\.? )?Greg (explains|reacts|debates|breaks|argues)\b/i);
  });
  it("every question receipt exists", () => {
    for (const q of site.questions) if (q.receipt) expect(site.receipts).toHaveProperty(q.receipt);
  });
  it("every receipt links somewhere", () => {
    for (const r of Object.values(site.receipts)) expect(Boolean(r.doi || r.url)).toBe(true);
  });
  it("question slugs are unique", () => {
    const s = site.questions.map((q) => q.slug);
    expect(new Set(s).size).toBe(s.length);
  });
  it("events have a status and a venue", () => {
    for (const e of site.events) {
      expect(["upcoming", "past"]).toContain(e.status);
      expect(e.where).not.toBe("");
    }
  });
  it("games link to https", () => {
    for (const g of site.games) expect(g.url).toMatch(/^https:\/\//);
  });
});
