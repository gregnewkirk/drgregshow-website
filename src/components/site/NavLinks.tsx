"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export type NavLink = { href: string; label: string };

type Props = {
  links: NavLink[];
};

// Client component. Links come in as plain props from the server parent (Header), so this file
// never imports @/content at runtime; usePathname needs the client boundary to mark the active
// link with aria-current="page" (styled in globals.css: nav.main a[aria-current="page"]).
export default function NavLinks({ links }: Props) {
  const pathname = usePathname();

  return (
    <>
      {links.map((l) => (
        <Link key={l.href} href={l.href} aria-current={pathname === l.href ? "page" : undefined}>
          {l.label}
        </Link>
      ))}
    </>
  );
}
