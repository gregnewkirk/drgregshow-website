"use client";

import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Debates", href: "/#debates" },
  { label: "Topics", href: "/#topics" },
  { label: "Mission", href: "/#mission" },
  { label: "Support", href: "/#support" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? "bg-[#0F0E0C]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
        : "bg-transparent"
    }`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo mark */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-sm bg-[#1847CC] flex items-center justify-center shadow-md group-hover:bg-[#2558E8] transition-colors">
            <span className="text-white font-heading font-black text-sm leading-none">Dr</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-white text-base leading-tight">Dr. Greg</span>
            <span className="text-[9px] text-[#6B9FFF] tracking-widest uppercase leading-tight">Newkirk, PhD</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white/70 hover:text-white transition-colors text-sm"
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
          className="md:hidden text-white/70"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0F0E0C]/98 border-b border-white/10 px-4 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-2 text-white/70 hover:text-white transition-colors"
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
