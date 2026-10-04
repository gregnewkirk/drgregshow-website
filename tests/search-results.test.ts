import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import SearchResults from "@/components/search/SearchResults";

// A small hook runner executes the component's real effects without adding a DOM
// dependency. Renders, effect cleanup, and network completion stay under test control.
const hooks = vi.hoisted(() => ({
  cursor: 0,
  values: [] as unknown[],
  effects: [] as { deps: unknown[]; cleanup?: () => void }[],
  pending: [] as (() => void)[],
}));

vi.mock("react", async (importOriginal) => ({
  ...await importOriginal<typeof import("react")>(),
  useState(initial: unknown) {
    const slot = hooks.cursor++;
    if (!(slot in hooks.values)) hooks.values[slot] = initial;
    return [hooks.values[slot], (value: unknown) => {
      hooks.values[slot] = typeof value === "function" ? value(hooks.values[slot]) : value;
    }];
  },
  useEffect(effect: () => (() => void) | void, deps: unknown[]) {
    const slot = hooks.cursor++;
    const previous = hooks.effects[slot];
    if (previous && deps.length === previous.deps.length && deps.every((value, i) => Object.is(value, previous.deps[i]))) return;
    hooks.pending.push(() => {
      previous?.cleanup?.();
      hooks.effects[slot] = { deps, cleanup: effect() || undefined };
    });
  },
}));

function render(q: string) {
  hooks.cursor = 0;
  const html = renderToStaticMarkup(SearchResults({ q, videoCount: 10 }));
  for (const effect of hooks.pending.splice(0)) effect();
  return html;
}

function response(q: string) {
  return Response.json({
    q, total: 1,
    results: [{ v: "abcdefghijk", s: 12, title: "A stream", date: "2026-10-01", snippet: `We discussed ${q}.` }],
  });
}

const settled = () => new Promise<void>((resolve) => setImmediate(resolve));

beforeEach(() => {
  hooks.cursor = 0;
  hooks.values = [];
  hooks.effects = [];
  hooks.pending = [];
});

afterEach(() => {
  for (const effect of hooks.effects) effect?.cleanup?.();
  vi.unstubAllGlobals();
});

describe("search results lifecycle", () => {
  it("escapes transcript markup while highlighting matches and linking to the timestamp", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json({
      q: "raw milk", total: 1,
      results: [{ v: "abcdefghijk", s: 12.9, title: "A <script>title</script>", date: "2026-10-01",
        snippet: "raw milk <script>untrusted()</script>" }],
    })));
    render("raw milk");
    await settled();
    const html = render("raw milk");
    expect(html).toContain("<mark>raw milk</mark>");
    expect(html).toContain("&lt;script&gt;untrusted()&lt;/script&gt;");
    expect(html).toContain("&lt;script&gt;title&lt;/script&gt;");
    expect(html).not.toContain("<script>");
    expect(html).toContain('href="https://www.youtube.com/watch?v=abcdefghijk&amp;t=12s"');
  });

  it("recovers when a failed query is revisited and succeeds", async () => {
    const fetch = vi.fn()
      .mockRejectedValueOnce(new Error("offline"))
      .mockResolvedValueOnce(response("vaccine"))
      .mockResolvedValueOnce(response("raw milk"));
    vi.stubGlobal("fetch", fetch);

    expect(render("raw milk")).toContain("Searching...");
    await settled();
    expect(render("raw milk")).toContain("Search is unavailable");

    render("vaccine");
    await settled();
    expect(render("vaccine")).toContain("<mark>vaccine</mark>");

    render("raw milk");
    await settled();
    const html = render("raw milk");
    expect(fetch).toHaveBeenCalledTimes(3);
    expect(html).toContain("<mark>raw milk</mark>");
    expect(html).not.toContain("Search is unavailable");
  });

  it("ignores a stale request that finishes after the query changes", async () => {
    let resolveOld!: (value: Response) => void;
    const old = new Promise<Response>((resolve) => { resolveOld = resolve; });
    vi.stubGlobal("fetch", vi.fn().mockReturnValueOnce(old).mockResolvedValueOnce(response("vaccine")));

    render("raw milk");
    render("vaccine");
    await settled();
    expect(render("vaccine")).toContain("<mark>vaccine</mark>");

    resolveOld(response("raw milk"));
    await settled();
    const html = render("vaccine");
    expect(html).toContain("<mark>vaccine</mark>");
    expect(html).not.toContain("raw milk");
  });
});
