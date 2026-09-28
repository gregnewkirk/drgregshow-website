import Link from "next/link";
import type { Event } from "@/content/types";

type Props = {
  events: Event[];
};

// Server component (no interactivity). Takes events as a prop rather than importing @/content
// itself, matching DataFigureServer's pattern of a server parent supplying serializable data.
//
// Home teaser: the next upcoming event, skipping any with "Hovind" in the title (that debate
// stays on the Events page only; see global-constraints.md's Hovind rule). Renders nothing if
// no such event remains.
export default function UpcomingTeaser({ events }: Props) {
  const next = events.find((e) => e.status === "upcoming" && !/hovind/i.test(e.title));

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
