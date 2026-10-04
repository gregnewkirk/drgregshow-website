import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it, vi } from "vitest";
import EventsPage from "@/app/events/page";
import UpcomingTeaser from "@/components/show/UpcomingTeaser";
import type { Event } from "@/content/types";

afterEach(() => { vi.useRealTimers(); });

describe("event date precision", () => {
  it.each(["2027-01-01T20:00:00Z", "2027-01-31T20:00:00Z"])(
    "keeps the January appearance upcoming on %s",
    async (now) => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date(now));
      const html = renderToStaticMarkup(await EventsPage({ searchParams: Promise.resolve({}) }));
      const upcoming = html.slice(html.indexOf(">Upcoming</h2>"), html.indexOf(">Past appearances</h2>"));
      expect(upcoming).toContain("Kent Hovind, in-person debate");
    },
  );

  it("moves the January appearance to past after January ends", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-01T08:00:00Z"));
    const html = renderToStaticMarkup(await EventsPage({ searchParams: Promise.resolve({}) }));
    const past = html.slice(html.indexOf(">Past appearances</h2>"));
    expect(past).toContain("Kent Hovind, in-person debate");
    expect(html).toContain("Nothing announced yet.");
  });

  const monthly: Event = {
    title: "January panel", where: "Community hall", date: "2027-01", when: "Jan 2027", status: "upcoming",
  };

  it("keeps a month-only home teaser through the last Pacific day", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-01T07:59:59Z"));
    const html = renderToStaticMarkup(createElement(UpcomingTeaser, { events: [monthly] }));
    expect(html).toContain("January panel");
  });

  it("removes the month-only home teaser at the next Pacific month", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-02-01T08:00:00Z"));
    expect(renderToStaticMarkup(createElement(UpcomingTeaser, { events: [monthly] }))).toBe("");
  });

  it("keeps today's dated events, skips expired and Hovind events, and sorts undated events last", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2027-01-15T20:00:00Z"));
    const events: Event[] = [
      { ...monthly, title: "Undated", date: "" },
      { ...monthly, title: "Expired", date: "2027-01-14" },
      { ...monthly, title: "Hovind appearance", date: "2027-01-15" },
      { ...monthly, title: "Today's panel", date: "2027-01-15" },
    ];
    const html = renderToStaticMarkup(createElement(UpcomingTeaser, { events }));
    expect(html).toContain("Today&#x27;s panel");
    expect(html).not.toMatch(/Undated|Expired|Hovind appearance/);
  });
});

describe("events live link", () => {
  it("opens the live channel endpoint when the on-air state is shown", async () => {
    const html = renderToStaticMarkup(await EventsPage({ searchParams: Promise.resolve({ live: "1" }) }));
    expect(html).toMatch(/href="https:\/\/www\.youtube\.com\/@DrGregShow\/live"[^>]*>Watch live on YouTube/);
  });
});
