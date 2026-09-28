"use client";

import { useRef } from "react";
import Link from "next/link";
import type { Topic } from "@/content";

type Props = {
  topics: Topic[];
};

const LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/questions", label: "Most asked on the show" },
  { href: "/search", label: "Search the transcripts" },
  { href: "/events", label: "Events" },
  { href: "/games", label: "Games" },
  { href: "/book", label: "Book" },
  { href: "/support", label: "Support the show" },
];

export default function MobileNav({ topics }: Props) {
  const ref = useRef<HTMLDetailsElement>(null);
  const close = () => {
    if (ref.current) ref.current.open = false;
  };

  return (
    <details className="mnav" ref={ref}>
      <summary aria-label="Menu">
        <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden="true">
          <path d="M0 1h20M0 7h20M0 13h20" stroke="#122433" strokeWidth={2} />
        </svg>
      </summary>
      <div className="panel">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={close}>
            {l.label}
          </Link>
        ))}
        {topics.map((t) => (
          <Link key={t.slug} href={`/topics/${t.slug}`} onClick={close}>
            {t.name}
          </Link>
        ))}
      </div>
    </details>
  );
}
