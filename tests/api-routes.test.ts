import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET as getLive } from "@/app/api/live/route";
import { GET as getStats } from "@/app/api/stats/route";
import { GET as getVideos } from "@/app/api/videos/route";

const fetchMock = vi.fn<typeof fetch>();
const shortCache = "public, s-maxage=300, stale-while-revalidate=3600";

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock);
  fetchMock.mockReset();
  fetchMock.mockResolvedValue(new Response(null, { status: 503 }));
  for (const key of ["YOUTUBE_API_KEY", "APIFY_API_TOKEN", "STATS_API_URL", "STATS_API_KEY"]) {
    vi.stubEnv(key, "");
  }
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("live API", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-07-02T04:00:00Z")); // 9 PM PDT
  });

  it("does not spend quota without an API key", async () => {
    const response = await getLive();
    expect(await response.json()).toEqual({ live: false, videoId: null });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=180, stale-while-revalidate=300");
  });

  it.each([
    ["2026-07-02T02:59:00Z", false], // 7:59 PM PDT
    ["2026-07-02T03:00:00Z", true], // 8 PM PDT
    ["2026-07-02T06:59:00Z", true], // 11:59 PM PDT
    ["2026-07-02T07:00:00Z", false], // midnight PDT
    ["2026-01-02T03:59:00Z", false], // 7:59 PM PST
    ["2026-01-02T04:00:00Z", true], // 8 PM PST
    ["2026-01-02T08:00:00Z", false], // midnight PST
  ])("respects the Pacific show window at %s", async (date, active) => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    vi.setSystemTime(new Date(date));
    fetchMock.mockResolvedValue(Response.json({ items: [{ id: { videoId: "pdzkCwy46zo" } }] }));
    expect(await (await getLive()).json()).toEqual(
      active ? { live: true, videoId: "pdzkCwy46zo" } : { live: false, videoId: null },
    );
    expect(fetchMock).toHaveBeenCalledTimes(active ? 1 : 0);
  });

  it("falls back when the provider has no live video", async () => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    fetchMock.mockResolvedValue(Response.json({ items: [] }));
    expect(await (await getLive()).json()).toEqual({ live: false, videoId: null });
  });

  it.each(["http", "network", "json"])("falls back on %s failures", async (failure) => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    if (failure === "network") fetchMock.mockRejectedValue(new Error("unavailable"));
    if (failure === "json") fetchMock.mockResolvedValue(new Response("not json"));
    expect(await (await getLive()).json()).toEqual({ live: false, videoId: null });
  });
});

describe("videos API", () => {
  it("returns the curated fallback and a short cache without an API key", async () => {
    const response = await getVideos();
    const data = await response.json();
    expect(data.source).toBe("fallback");
    expect(data.videos).toHaveLength(4);
    expect(data.videos[0]).toMatchObject({ id: "pdzkCwy46zo", views: "Most-watched" });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(response.headers.get("Cache-Control")).toBe(shortCache);
  });

  it("pins the flagship and sorts the other videos by numeric view count", async () => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    fetchMock.mockResolvedValue(Response.json({ items: [
      { id: "TCkwyex_Xoo", statistics: { viewCount: "900" } },
      { id: "pdzkCwy46zo", snippet: { title: "Current title" }, statistics: { viewCount: "15" } },
      { id: "mvhSU-BPSsw", statistics: { viewCount: "1000" } },
      { id: "Uw53ZEDVutE", statistics: { viewCount: "1234567" } },
    ] }));
    const response = await getVideos();
    const data = await response.json();
    expect(data.source).toBe("live");
    expect(data.videos.map((video: { id: string }) => video.id)).toEqual([
      "pdzkCwy46zo", "Uw53ZEDVutE", "mvhSU-BPSsw", "TCkwyex_Xoo",
    ]);
    expect(data.videos[0]).toMatchObject({ title: "Current title", views: "15 views", opponent: "vs Kent Hovind" });
    expect(data.videos.map((video: { views: string }) => video.views)).toEqual(["15 views", "1.2M views", "1K views", "900 views"]);
    expect(data.videos[1].title).toBeTruthy();
    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=21600, stale-while-revalidate=43200");
  });

  it.each(["http", "network", "json", "empty"])("returns the fallback on %s failures", async (failure) => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    if (failure === "network") fetchMock.mockRejectedValue(new Error("unavailable"));
    if (failure === "json") fetchMock.mockResolvedValue(new Response("not json"));
    if (failure === "empty") fetchMock.mockResolvedValue(Response.json({ items: [] }));
    const response = await getVideos();
    expect((await response.json()).source).toBe("fallback");
    expect(response.headers.get("Cache-Control")).toBe(shortCache);
  });
});

function mockPlatforms(data: { youtube?: unknown; discord?: unknown; tiktok?: unknown; instagram?: unknown }) {
  fetchMock.mockImplementation(async (input) => {
    const url = String(input);
    const platform = url.includes("youtube") ? "youtube"
      : url.includes("discord.com") ? "discord"
      : url.includes("tiktok") ? "tiktok" : "instagram";
    return data[platform] === undefined
      ? new Response(null, { status: 503 })
      : Response.json(data[platform]);
  });
}

describe("stats API", () => {
  it("uses complete fallback stats and a short cache when providers fail", async () => {
    const response = await getStats();
    const data = await response.json();
    expect(data).toMatchObject({ source: "fallback", liveApis: 0, totals: { followers: "34.9K+", views: "7M+" } });
    expect(response.headers.get("Cache-Control")).toBe(shortCache);
    expect(Number.isNaN(Date.parse(data.updatedAt))).toBe(false);
    expect(fetchMock).toHaveBeenCalledTimes(1); // Discord needs no API key.
  });

  it("uses live YouTube and Discord counts with fallback platforms", async () => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    mockPlatforms({ youtube: { items: [{ statistics: { subscriberCount: "2000", viewCount: "3000000", videoCount: "12" } }] }, discord: { approximate_member_count: 500 } });
    const response = await getStats();
    expect(await response.json()).toMatchObject({
      source: "live", liveApis: 2,
      youtube: { subscribers: "2K", views: "3M", videoCount: "12" },
      discord: { members: "500" }, totals: { followers: "35.8K+", views: "10M+" },
    });
    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=3600, stale-while-revalidate=7200");
  });

  it("uses Mission Control before direct providers", async () => {
    vi.stubEnv("STATS_API_URL", "https://stats.example.test/stats");
    vi.stubEnv("STATS_API_KEY", "test-key");
    fetchMock.mockResolvedValue(Response.json({ totals: { followers: "42K+", views: "8M+" }, source: "upstream" }));
    expect(await (await getStats()).json()).toEqual({ totals: { followers: "42K+", views: "8M+" }, source: "mission-control" });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith("https://stats.example.test/stats", expect.objectContaining({ headers: { "x-api-key": "test-key" } }));
  });

  it("continues to direct providers after Mission Control fails", async () => {
    vi.stubEnv("STATS_API_URL", "https://stats.example.test/stats");
    fetchMock.mockRejectedValueOnce(new Error("unavailable"));
    fetchMock.mockResolvedValueOnce(Response.json({ approximate_member_count: 100 }));
    expect(await (await getStats()).json()).toMatchObject({ source: "live", liveApis: 1, discord: { members: "100" } });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it.each([undefined, null, "", "n/a", -1, "Infinity"])("falls back for invalid provider counts (%s)", async (count) => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    vi.stubEnv("APIFY_API_TOKEN", "test-key");
    mockPlatforms({
      youtube: { items: [{ statistics: { subscriberCount: count, viewCount: "42" } }] },
      discord: { approximate_member_count: count },
      tiktok: [{ fans: count }],
      instagram: [{ followersCount: count }],
    });
    const response = await getStats();
    expect(await response.json()).toMatchObject({
      source: "fallback", liveApis: 0,
      youtube: { subscribers: "1.4K", views: "0" }, discord: { members: "210" },
      tiktok: { followers: "20.3K", views: "7M+" }, instagram: { followers: "7K" },
    });
    expect(response.headers.get("Cache-Control")).toBe(shortCache);
  });

  it("keeps legitimate zero counts instead of reverting to fallback followers", async () => {
    vi.stubEnv("YOUTUBE_API_KEY", "test-key");
    vi.stubEnv("APIFY_API_TOKEN", "test-key");
    mockPlatforms({
      youtube: { items: [{ statistics: { subscriberCount: "0", viewCount: "0" } }] },
      discord: { approximate_member_count: 0 }, tiktok: [{ fans: 0 }], instagram: [{ followersCount: 0 }],
    });
    expect(await (await getStats()).json()).toMatchObject({
      source: "live", liveApis: 4,
      youtube: { subscribers: "0", views: "0" }, discord: { members: "0" },
      tiktok: { followers: "0", views: "7M+" }, instagram: { followers: "0" },
    });
  });

  it("does not mislabel TikTok likes as video views", async () => {
    vi.stubEnv("APIFY_API_TOKEN", "test-key");
    mockPlatforms({ tiktok: [{ fans: 200, heart: 12345 }] });
    expect(await (await getStats()).json()).toMatchObject({
      source: "live", liveApis: 1,
      tiktok: { followers: "200", views: "7M+" }, totals: { views: "7M+" },
    });
  });
});
