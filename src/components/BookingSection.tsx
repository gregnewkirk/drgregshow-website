"use client";

import { useState, FormEvent } from "react";

const APPEARANCE_TYPES = [
  "Podcast",
  "TV Segment",
  "Panel",
  "Speaking",
  "Other",
];

export default function BookingSection() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = data.get("name") as string;
    const organization = data.get("organization") as string;
    const type = data.get("type") as string;
    const message = data.get("message") as string;

    const subject = encodeURIComponent(`Booking Inquiry: ${type} — ${organization}`);
    const body = encodeURIComponent(
      `Name: ${name}\nShow/Organization: ${organization}\nType: ${type}\n\n${message}`
    );

    window.location.href = `mailto:booking@drgregshow.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <section id="booking" className="py-20 bg-bg">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            Booking
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-3">
            Book Dr. Greg
          </h2>
          <p className="text-text-secondary">
            For podcast appearances, panel discussions, media segments, and speaking
            engagements.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-10 bg-bg-surface rounded-xl border border-white/10">
            <div className="text-4xl mb-4">✅</div>
            <p className="text-text-primary font-semibold text-lg mb-2">
              Inquiry sent.
            </p>
            <p className="text-text-secondary text-sm">
              We respond to all inquiries within 2 business days.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-bg-surface rounded-xl border border-white/10 p-8 space-y-5"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="organization"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Show / Organization
              </label>
              <input
                id="organization"
                name="organization"
                type="text"
                required
                placeholder="Podcast name, network, show, etc."
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Type of Appearance
              </label>
              <select
                id="type"
                name="type"
                required
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent-cyan/50 transition-colors"
              >
                <option value="">Select type…</option>
                {APPEARANCE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-semibold text-text-primary mb-1.5"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder="Tell Dr. Greg about your show, the topic you have in mind, and the format."
                className="w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/50 focus:outline-none focus:border-accent-cyan/50 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
            >
              Send Booking Inquiry
            </button>
          </form>
        )}

        <p className="text-center text-text-secondary text-sm mt-6">
          Or email directly:{" "}
          <a
            href="mailto:booking@drgregshow.com"
            className="text-accent-cyan hover:underline"
          >
            booking@drgregshow.com
          </a>
        </p>
        <p className="text-center text-text-secondary/60 text-xs mt-2">
          We respond to all inquiries within 2 business days.
        </p>
      </div>
    </section>
  );
}
