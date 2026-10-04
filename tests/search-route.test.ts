import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { GET } from "@/app/api/search/route";
import SearchPage from "@/app/search/page";
import { loadIndex } from "@/lib/search-index";
import { normalizeSearchQuery } from "@/lib/search";

vi.mock("@/lib/search-index", () => ({ loadIndex: vi.fn() }));
vi.mock("next/navigation", () => ({ useRouter: () => ({ push: vi.fn() }) }));

const index = {
  videos: [{ id: "abcdefghijk", title: "A stream", date: "2026-10-01", topic: "nutrition", source: "youtube" }],
  chunks: [{ v: "abcdefghijk", s: 12, x: "We discussed raw milk today." }],
};

beforeEach(() => {
  vi.mocked(loadIndex).mockReset().mockResolvedValue(index);
});

describe("search route", () => {
  it("does not split an emoji at the query limit or crash URL encoding", async () => {
    const q = `${"a".repeat(79)}😀`;
    const normalized = normalizeSearchQuery(q);
    expect(() => encodeURIComponent(normalized)).not.toThrow();
    expect(normalized.length).toBeLessThanOrEqual(80);
    const response = await GET(new Request(`https://drgregshow.com/api/search?q=${encodeURIComponent(q)}`));
    expect((await response.json()).q).toBe(normalized);
    expect(normalizeSearchQuery(normalized)).toBe(normalized);
  });

  it("returns matching timestamps and public cache headers", async () => {
    const response = await GET(new Request("https://drgregshow.com/api/search?q=raw%20milk"));
    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toContain("s-maxage=3600");
    expect(await response.json()).toEqual({
      q: "raw milk",
      total: 1,
      results: [{ v: "abcdefghijk", s: 12, title: "A stream", date: "2026-10-01", snippet: index.chunks[0].x }],
    });
  });

  it("uses the first repeated query parameter without crashing the page", async () => {
    const response = await GET(new Request("https://drgregshow.com/api/search?q=raw%20milk&q=vaccine"));
    const data = await response.json();
    const searchParams = Promise.resolve({ q: ["raw milk", "vaccine"] });
    const html = renderToStaticMarkup(await SearchPage({ searchParams }));
    expect(html).toContain(`value="${data.q}"`);
    expect(data.total).toBe(1);
  });

  it("uses the same bounded query in the page and API response", async () => {
    const q = "a".repeat(100);
    const response = await GET(new Request(`https://drgregshow.com/api/search?q=${q}`));
    const data = await response.json();
    const html = renderToStaticMarkup(await SearchPage({ searchParams: Promise.resolve({ q }) }));
    expect(data.q).toHaveLength(80);
    expect(html).toContain(`value="${data.q}"`);
    expect(html).not.toContain(`value="${q}"`);
  });

  it("returns an empty result for a blank query without loading the index", async () => {
    vi.mocked(loadIndex).mockRejectedValueOnce(new Error("fixture unavailable"));
    const response = await GET(new Request("https://drgregshow.com/api/search?q=%20%20"));
    expect(await response.json()).toEqual({ q: "", total: 0, results: [] });
    expect(loadIndex).not.toHaveBeenCalled();
  });

  it("normalizes whitespace before limiting a query and remains stable at the boundary", async () => {
    const q = `  ${"a".repeat(79)} more words  `;
    const response = await GET(new Request(`https://drgregshow.com/api/search?q=${encodeURIComponent(q)}`));
    const data = await response.json();
    const html = renderToStaticMarkup(await SearchPage({ searchParams: Promise.resolve({ q }) }));
    expect(data.q).toBe("a".repeat(79));
    expect(html).toContain(`value="${data.q}"`);
    const repeated = await GET(new Request(`https://drgregshow.com/api/search?q=${data.q}`));
    expect((await repeated.json()).q).toBe(data.q);
  });

  it("returns a non-cacheable service error when the index cannot load", async () => {
    vi.mocked(loadIndex).mockRejectedValueOnce(new Error("fixture unavailable"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    try {
      const response = await GET(new Request("https://drgregshow.com/api/search?q=raw%20milk"));
      expect(response.status).toBe(503);
      expect(response.headers.get("cache-control")).toBe("no-store");
      expect(await response.json()).toEqual({ q: "raw milk", total: 0, results: [], error: "unavailable" });
    } finally {
      log.mockRestore();
    }
  });
});
