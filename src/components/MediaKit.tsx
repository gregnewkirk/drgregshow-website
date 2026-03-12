"use client";

import { useState } from "react";

const FULL_BIO = `Dr. Gregory Michael Newkirk is a PhD microbiologist (Microbiology & Nanotechnology), science communicator, and science communicator and public opponent of misinformation based in San Diego, California. He has spent his career making complex science accessible to general audiences while actively engaging and debating those who spread scientific misinformation. Dr. Greg's unique combination of academic credentials, patent strategy expertise, and media presence makes him an ideal guest for podcasts, news segments, and panel discussions on science, health, technology, and public policy. He is the founder of Science and Freedom for Everyone (SAFE), a 501(c)3 science advocacy nonprofit. He can be reached for bookings at booking@drgregshow.com.`;

export default function MediaKit() {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <section id="media-kit" className="py-20 bg-bg-surface">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            For Producers &amp; Journalists
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-3">
            Media Kit
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Everything you need to pitch Dr. Greg to your audience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* One-Sheet */}
          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
              One-Sheet
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
              Bio, topics, and contact. Print-ready PDF.
            </p>
            {/* TODO: Replace href with actual one-sheet PDF once created. Place file at /public/media/one-sheet.pdf */}
            <a
              href="/media/one-sheet.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-bg text-sm font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
            >
              Download One-Sheet
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>

          {/* Press Photos */}
          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
              Press Photos
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
              High-resolution headshots and action photos.
            </p>
            {/* TODO: Replace href with actual press photos ZIP once photos are taken. Place file at /public/media/press-photos.zip */}
            <a
              href="/media/press-photos.zip"
              download
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-bg text-sm font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
            >
              Download Photos
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>

          {/* Full Bio */}
          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">
              Full Bio
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
              Long-form bio for show notes and introductions.
            </p>

            {bioExpanded && (
              <p className="text-text-secondary text-sm leading-relaxed mb-5 border-t border-white/10 pt-4">
                {FULL_BIO}
              </p>
            )}

            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-accent-cyan/50 text-accent-cyan text-sm font-semibold rounded-lg hover:bg-accent-cyan/10 transition-colors"
            >
              {bioExpanded ? "Collapse Bio" : "Read Full Bio"}
              <svg
                className={`w-4 h-4 transition-transform ${bioExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
