import type { Metadata } from "next";
import type { Event } from "@/content/types";
import { site } from "@/content";
import LiveStatus from "@/components/show/LiveStatus";

export const metadata: Metadata = {
  title: "Events",
};

// Ports the mockup's evSort(dir): empty dates always sort last, regardless of direction; dir=1
// is ascending (soonest first, for upcoming), dir=-1 is descending (newest first, for past).
function evSort(dir: 1 | -1) {
  return (a: Event, b: Event) => {
    const x = a.date || "";
    const y = b.date || "";
    if (!x && !y) return 0;
    if (!x) return 1;
    if (!y) return -1;
    return dir * (x < y ? -1 : x > y ? 1 : 0);
  };
}

function upcomingEvents(events: Event[]) {
  return events.filter((e) => e.status === "upcoming").sort(evSort(1));
}

function pastEvents(events: Event[]) {
  return events.filter((e) => e.status === "past").sort(evSort(-1));
}

// Ports the mockup's pageEvents(). Every event in site.events is listed, including Hovind-titled
// ones (they are factual appearances, per the task-11 rule): this page applies no special
// styling or filtering by title, unlike the home page's UpcomingTeaser.
export default async function EventsPage({ searchParams }: { searchParams: Promise<{ live?: string }> }) {
  const { live } = await searchParams;
  const forceLive = live === "1";

  const events = site.events;
  const upcoming = upcomingEvents(events);
  const past = pastEvents(events);
  const nightly = site.schedule.find((s) => s.when === "Nightly") ?? {
    when: "Nightly",
    what: "The Dr Greg Show",
    tag: "9 PM PT",
  };

  const groups: { year: string; items: Event[] }[] = [];
  const byYear = new Map<string, Event[]>();
  for (const e of past) {
    const y = e.date ? e.date.slice(0, 4) : "Undated";
    if (!byYear.has(y)) {
      byYear.set(y, []);
      groups.push({ year: y, items: byYear.get(y)! });
    }
    byYear.get(y)!.push(e);
  }
  const withUrl = past.filter((e) => e.url).length;

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Events</h1>
        <p className="lede">Live every night on my show, plus debates, panels and talks on other stages.</p>

        <h2 style={{ margin: "28px 0 14px" }}>Tonight</h2>
        <div className="tonight">
          <LiveStatus
            what={nightly.what}
            youtubeUrl={site.links.youtube}
            subscribeUrl={site.links.subscribe}
            tiktokUrl={site.links.tiktok}
            forceLive={forceLive}
          />
          <div className="card" style={{ padding: 24 }}>
            <h3>Every night</h3>
            <p style={{ marginTop: 8 }}>
              {nightly.when}, {nightly.tag} on YouTube and TikTok. Open debate and live callers. Bring a claim.
            </p>
            <p className="small" style={{ marginTop: 10 }}>
              The countdown uses Pacific time (America/Los_Angeles), so it stays right through daylight saving
              changes.
            </p>
          </div>
        </div>

        <h2 style={{ margin: "40px 0 14px" }}>Upcoming</h2>
        {upcoming.length ? (
          <ul className="evlist">
            {upcoming.map((e) => (
              <li className="card ev" key={e.title}>
                <div className="d">{e.when || "Date to be announced"}</div>
                <div>
                  <h3>{e.title}</h3>
                  <p className="w">{e.where}</p>
                  {e.note && <p className="nt">{e.note}</p>}
                  {e.url && (
                    <a className="btn ghost" href={e.url} target="_blank" rel="noopener">
                      Watch
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nothing announced yet. The nightly show is always on.</p>
        )}

        <div className="fig" style={{ marginTop: 40 }}>
          <div className="fig-title">
            <span className="fig-no">Figure 1.</span>
            <h2 style={{ fontSize: "clamp(22px,2.6vw,30px)" }}>Past appearances</h2>
          </div>
          <div className="panel-head" style={{ marginTop: 12 }}>
            <span className="panel-l">A</span>
            <h3>Record of appearances by year, newest first</h3>
          </div>
          <div className="tl">
            {groups.map(({ year, items }) => (
              <div className="tl-year" key={year}>
                <div className="tl-y">
                  {year}
                  <small>
                    {items.length} {items.length === 1 ? "event" : "events"}
                  </small>
                </div>
                <ul className="tl-items">
                  {items.map((e) => (
                    <li className={e.url ? "has-url" : ""} key={e.title}>
                      <span className="when">{e.when || "Date not recorded"}</span>
                      <h3>{e.title}</h3>
                      <p className="w">{e.where}</p>
                      {e.note && <p className="nt">{e.note}</p>}
                      {e.url && (
                        <a className="watch" href={e.url} target="_blank" rel="noopener">
                          Watch
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="legend-cap">
            <b>Figure 1A.</b> {past.length} past appearances outside my nightly show, grouped by year, newest
            first; items without a recorded date are listed last. A filled dot means a recording is available (
            {withUrl} of {past.length}).
          </p>
        </div>
      </div>
    </section>
  );
}
