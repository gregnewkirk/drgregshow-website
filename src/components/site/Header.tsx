import Link from "next/link";
import { site } from "@/content";
import { topTopics } from "@/lib/topics";
import MobileNav from "@/components/site/MobileNav";

export default function Header() {
  const topics = topTopics(8);

  return (
    <header className="site">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="The Dr Greg Show, home">
          <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
            <rect x="1" y="1" width="28" height="28" rx="6" fill="#122433" />
            <rect x="6" y="18" width="3" height="6" fill="#0072B2" />
            <rect x="11" y="12" width="3" height="12" fill="#009E73" />
            <rect x="16" y="8" width="3" height="16" fill="#D55E00" />
            <rect x="21" y="14" width="3" height="10" fill="#E69F00" />
          </svg>
          <span className="full">The Dr Greg Show</span>
          <span className="abbr">Dr Greg Show</span>
        </Link>

        <nav className="main" aria-label="Main">
          <Link href="/questions">Most asked</Link>
          <details className="dd">
            <summary>Topics</summary>
            <div className="menu">
              {topics.map((t) => (
                <Link key={t.slug} href={`/topics/${t.slug}`}>
                  {t.name}
                </Link>
              ))}
            </div>
          </details>
          <Link href="/search">Search</Link>
          <Link href="/events">Events</Link>
          <Link href="/games">Games</Link>
          <Link href="/book">Book</Link>
        </nav>

        <a className="btn primary cta" href={site.links.subscribe} target="_blank" rel="noopener">
          <svg className="yt" viewBox="0 0 18 13" aria-hidden="true">
            <rect width="18" height="13" rx="3.5" fill="#fff" />
            <path d="M7 3.6v5.8L12 6.5z" fill="#0E3A5B" />
          </svg>
          <span className="long">Subscribe on YouTube</span>
          <span className="short">Subscribe</span>
        </a>

        <MobileNav topics={topics} />
      </div>
    </header>
  );
}
