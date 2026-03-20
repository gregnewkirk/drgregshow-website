"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Debates", href: "/#debates" },
  { label: "Topics", href: "/#topics" },
  { label: "Media Kit", href: "/#media-kit" },
  { label: "Mission", href: "/#mission" },
  { label: "Support", href: "/#support" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="font-heading text-xl font-bold text-accent-cyan">
          Dr. Greg
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-text-secondary hover:text-accent-cyan transition-colors text-sm"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#support"
            className="px-4 py-2 bg-accent-amber/10 border border-accent-amber/30 text-accent-amber text-sm font-semibold rounded-lg hover:bg-accent-amber/20 transition-colors"
          >
            Back the Fight
          </a>
          <a
            href="/booking"
            className="px-4 py-2 bg-accent-cyan text-bg text-sm font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
          >
            Book Dr. Greg
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-bg-surface border-b border-white/5 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-text-secondary hover:text-accent-cyan transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/booking"
            className="block mt-3 px-4 py-2 bg-accent-cyan text-bg text-sm font-semibold rounded-lg text-center hover:bg-accent-cyan/90 transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            Book Dr. Greg
          </a>
        </div>
      )}
    </nav>
  );
}
