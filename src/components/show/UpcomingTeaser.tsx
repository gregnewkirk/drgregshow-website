import Link from "next/link";
import type { Event } from "@/content/types";
import { todayPT } from "@/lib/schedule";

type Props = {
  events: Event[];
};

// Ascending by date; events with no date sort last (matches the Events page's evSort(1)).
function byDateAscending(a: Event, b: Event) {
  const x = a.date || "";
  const y = b.date || "";
  if (!x && !y) return 0;
  if (!x) return 1;
  if (!y) return -1;
  return x < y ? -1 : x > y ? 1 : 0;
}

// Server component (no interactivity). Takes events as a prop rather than importing @/content
// itself, matching DataFigureServer's pattern of a server parent supplying serializable data.
//
// Home teaser: the soonest upcoming event, skipping any with "Hovind" in the title (that debate
// stays on the Events page only; see global-constraints.md's Hovind rule) and any whose date has
// already passed (America/Los_Angeles). Renders nothing if no such event remains.
export default function UpcomingTeaser({ events }: Props) {
  const today = todayPT();
  const next = events
    .filter((e) => e.status === "upcoming" && !/hovind/i.test(e.title) && (!e.date || e.date >= today))
    .sort(byDateAscending)[0];

  if (!next) {
    return null;
  }

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="card" style={{ padding: 24 }}>
          <div className="sec-head" style={{ marginBottom: 12 }}>
            <h2>Upcoming</h2>
            <Link className="btn ghost" href="/events">
              See all events
            </Link>
          </div>
          <ul className="evlist">
            <li className="card ev">
              <div className="d">{next.when || "Date to be announced"}</div>
              <div>
                <h3>{next.title}</h3>
                <p className="w">{next.where}</p>
                {next.note && <p className="nt">{next.note}</p>}
                {next.url && (
                  <a className="btn ghost" href={next.url} target="_blank" rel="noopener">
                    Watch
                  </a>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
