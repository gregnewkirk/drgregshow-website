import Image from "next/image";
import Link from "next/link";
import type { Game } from "@/content/types";

type Props = {
  games: Game[];
};

// Server component (no interactivity). Compact 4-up (2-up mobile) strip on the home page,
// linking each game straight to its own site, plus an "All games" link to /games.
export default function GamesStrip({ games }: Props) {
  if (!games.length) {
    return null;
  }

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="sec-head">
          <h2>Games I made</h2>
          <Link className="btn ghost" href="/games">
            All games
          </Link>
        </div>
        <div className="games-strip">
          {games.map((g) => (
            <a className="card" key={g.title} href={g.url} target="_blank" rel="noopener">
              <div className="thumb">
                <Image src={g.image} alt="" fill loading="lazy" sizes="(min-width: 900px) 25vw, 50vw" />
              </div>
              <h3>{g.title}</h3>
              <p>{g.blurb}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
