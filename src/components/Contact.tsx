"use client";

import { useState } from "react";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const INQUIRY_TYPES = [
  "Podcast Booking",
  "Speaking Event",
  "Collaboration",
  "Media Inquiry",
  "General",
];

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("https://formspree.io/f/xwvrknog", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Book Me / Get in Touch
        </h2>
        <p className="text-text-secondary text-center mb-12">
          Want me on your show? Have a collaboration idea? Let&apos;s talk.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-text-secondary mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-text-secondary mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="organization" className="block text-sm text-text-secondary mb-1">
                Organization
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              />
            </div>
            <div>
              <label htmlFor="inquiry" className="block text-sm text-text-secondary mb-1">
                Inquiry Type
              </label>
              <select
                id="inquiry"
                name="inquiry"
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors"
              >
                <option value="">Select...</option>
                {INQUIRY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-1">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full px-4 py-3 bg-bg border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-accent-cyan transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full py-3 bg-accent-green text-bg font-semibold rounded-lg hover:bg-accent-green/90 transition-colors disabled:opacity-50"
            >
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>
            {status === "success" && (
              <p className="text-accent-green text-center text-sm">
                Message sent! I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-center text-sm">
                Something went wrong. Try emailing me directly.
              </p>
            )}
          </form>

          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold mb-2">
                Other ways to reach me
              </h3>
              <div className="space-y-3">
                <a
                  href="mailto:contact@drgreg.show"
                  className="flex items-center gap-3 text-text-secondary hover:text-accent-cyan transition-colors"
                >
                  <FaEnvelope /> contact@drgreg.show
                </a>
                <div className="flex items-start gap-3 text-text-secondary">
                  <FaMapMarkerAlt className="mt-1 flex-shrink-0" />
                  <span>
                    747 S Mission Rd Unit 2380
                    <br />
                    Fallbrook, CA 92088-7097
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 bg-bg rounded-xl border border-white/5">
              <h3 className="font-heading font-semibold mb-2">
                What I&apos;m available for
              </h3>
              <ul className="text-text-secondary text-sm space-y-2">
                <li>• Podcast & show guest appearances</li>
                <li>• Speaking engagements & panels</li>
                <li>• Science communication collaborations</li>
                <li>• Media interviews & expert commentary</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
