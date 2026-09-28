import Link from "next/link";
import { site } from "@/content";

const SOCIALS: { label: string; href: string }[] = [
  { label: "YouTube", href: site.links.youtube },
  { label: "TikTok", href: site.links.tiktok },
  { label: "Instagram", href: site.links.instagram },
  { label: "Substack", href: site.links.substack },
  { label: "Discord", href: site.links.discord },
];

export default function Footer() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h4>The Dr Greg Show</h4>
            <p style={{ fontSize: 15, maxWidth: "40ch" }}>
              Live science debates every night at 9 PM Pacific on YouTube and TikTok. Papers on screen.
            </p>
          </div>
          <div>
            <h4>Watch</h4>
            <ul>
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Explore</h4>
            <ul>
              <li>
                <Link href="/press">Press</Link>
              </li>
              <li>
                <Link href="/research">Research</Link>
              </li>
              <li>
                <Link href="/games">Games</Link>
              </li>
              <li>
                <Link href="/challenge">Challenge me</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Work with me</h4>
            <ul>
              <li>
                <Link href="/book">Book</Link>
              </li>
              <li>
                <Link href="/support">Support the show</Link>
              </li>
            </ul>
          </div>
        </div>
        <p className="fine">
          Dataset figures are drawn from transcribed streams in the show archive. Charts of published results are
          redrawn from published values. Follow the DOI for the original.
        </p>
      </div>
    </footer>
  );
}
