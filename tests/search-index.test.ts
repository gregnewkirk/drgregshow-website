import { beforeEach, describe, expect, it, vi } from "vitest";
import { gzipSync } from "node:zlib";
import { readFile } from "node:fs/promises";

vi.mock("server-only", () => ({}));
vi.mock("node:fs/promises", () => ({ readFile: vi.fn() }));

const index = { videos: [], chunks: [] };

beforeEach(() => {
  vi.resetModules();
  vi.mocked(readFile).mockReset();
});

describe("search index loader", () => {
  it("loads the packaged gzip and reuses its parsed index", async () => {
    vi.mocked(readFile).mockResolvedValue(gzipSync(JSON.stringify(index)));
    const { loadIndex } = await import("@/lib/search-index");
    const first = await loadIndex();
    expect(first).toEqual(index);
    expect(await loadIndex()).toBe(first);
    expect(readFile).toHaveBeenCalledOnce();
    expect(readFile).toHaveBeenCalledWith(expect.stringMatching(/data\/search-index\.json\.gz$/));
  });

  it("can retry after a read failure instead of caching the rejection", async () => {
    vi.mocked(readFile)
      .mockRejectedValueOnce(new Error("fixture unavailable"))
      .mockResolvedValueOnce(gzipSync(JSON.stringify(index)));
    const { loadIndex } = await import("@/lib/search-index");
    await expect(loadIndex()).rejects.toThrow("fixture unavailable");
    await expect(loadIndex()).resolves.toEqual(index);
  });

  it("can retry after invalid compressed data", async () => {
    vi.mocked(readFile)
      .mockResolvedValueOnce(Buffer.from("invalid gzip"))
      .mockResolvedValueOnce(gzipSync(JSON.stringify(index)));
    const { loadIndex } = await import("@/lib/search-index");
    await expect(loadIndex()).rejects.toThrow();
    await expect(loadIndex()).resolves.toEqual(index);
  });
});
