import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Games",
};

export default function GamesPage() {
  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Games I made</h1>
        <p className="lede">Interactive games I built so you can run the numbers yourself.</p>

        <div className="games-list" style={{ marginTop: 28 }}>
          {site.games.map((g) => (
            <figure className="plate" key={g.title}>
              <div className="ph">
                <Image src={g.image} alt={`Screenshot of ${g.title}`} width={1200} height={750} />
              </div>
              <figcaption>
                <b>{g.title}.</b> {g.blurb}
              </figcaption>
              <a className="btn primary" href={g.url} target="_blank" rel="noopener">
                Play
              </a>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
