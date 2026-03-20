"use client";

import { useState, FormEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ---- Data ----

const APPEARANCE_TYPES = ["Podcast", "TV Segment", "Panel", "Speaking", "Other"];

const FULL_BIO = `Dr. Gregory Michael Newkirk is a PhD microbiologist (Microbiology & Nanotechnology), science communicator, and public opponent of misinformation based in San Diego, California. He has spent his career making complex science accessible to general audiences while actively engaging and debating those who spread scientific misinformation. Dr. Greg's unique combination of academic credentials, patent strategy expertise, and media presence makes him an ideal guest for podcasts, news segments, and panel discussions on science, health, technology, and public policy. He is the founder of Science and Freedom for Everyone (SAFE), a 501(c)4 pending nonprofit. He can be reached for bookings at booking@drgregshow.com.`;

const TOPICS = [
  {
    icon: "💉",
    title: "Vaccine Science & Misinformation",
    description:
      "A molecular biologist breaks down the actual immunology — and explains why the misinformation keeps spreading despite the evidence.",
  },
  {
    icon: "🦕",
    title: "Evolution & Creationism",
    description:
      "The science of evolution is settled. The debate keeps happening anyway. Dr. Greg explains why, and what the evidence actually shows.",
  },
  {
    icon: "🌍",
    title: "Scientific Literacy & Critical Thinking",
    description:
      "Why do smart people believe false things? Dr. Greg breaks down how misinformation spreads, how to spot it, and what it takes to think like a scientist.",
  },
  {
    icon: "🧬",
    title: "Biotech & Gene Therapy (Explained Simply)",
    description:
      "CRISPR, gene therapy, and mRNA technology explained without the jargon — by someone who actually works in the field.",
  },
  {
    icon: "🔬",
    title: "How Science Actually Works",
    description:
      "Peer review, replication, statistical significance — what the scientific process really looks like from the inside.",
  },
  {
    icon: "🤖",
    title: "AI, Biotech & the Future of Medicine",
    description:
      "What happens when machine learning meets molecular biology? The real advances, the real risks, and what to watch.",
  },
];

const CREDENTIALS = [
  { label: "PhD Molecular Biology" },
  { label: "Biotech Patent Strategist" },
  { label: "Founder, SAFE (501c4 pending)" },
  { label: "San Diego, CA" },
  { label: "Available Nationwide" },
];

// ---- Booking Form ----

function BookingForm() {
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

  if (submitted) {
    return (
      <div className="text-center py-10 bg-bg-surface rounded-xl border border-white/10">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-text-primary font-semibold text-lg mb-2">Inquiry sent.</p>
        <p className="text-text-secondary text-sm">
          We respond to all inquiries within 2 business days.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-surface rounded-xl border border-white/10 p-8 space-y-5"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-1.5">
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
        <label htmlFor="organization" className="block text-sm font-semibold text-text-primary mb-1.5">
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
        <label htmlFor="type" className="block text-sm font-semibold text-text-primary mb-1.5">
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
        <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-1.5">
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
  );
}

// ---- Media Kit ----

function MediaKitSection() {
  const [bioExpanded, setBioExpanded] = useState(false);

  return (
    <section className="py-20 bg-bg-surface">
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
          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">One-Sheet</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
              Bio, topics, and contact. Print-ready PDF.
            </p>
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

          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📸</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">Press Photos</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
              High-resolution headshots and action photos.
            </p>
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

          <div className="bg-bg rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
            <div className="text-3xl mb-4">📝</div>
            <h3 className="font-heading font-bold text-text-primary text-lg mb-2">Full Bio</h3>
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

// ---- Page ----

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        {/* Header */}
        <section className="py-20 bg-bg">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
              Booking
            </p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">
              Book Dr. Greg
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              For podcast appearances, panel discussions, media segments, and speaking engagements.
            </p>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 bg-bg-surface">
          <div className="max-w-2xl mx-auto px-4">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
                Inquiry
              </p>
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-primary mb-3">
                Send a Booking Inquiry
              </h2>
            </div>
            <BookingForm />
            <p className="text-center text-text-secondary text-sm mt-6">
              Or email directly:{" "}
              <a href="mailto:booking@drgregshow.com" className="text-accent-cyan hover:underline">
                booking@drgregshow.com
              </a>
            </p>
            <p className="text-center text-text-secondary/60 text-xs mt-2">
              We respond to all inquiries within 2 business days.
            </p>
          </div>
        </section>

        {/* Topics & Angles */}
        <section className="py-20 bg-bg">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
                For Producers &amp; Bookers
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary mb-3">
                Topics &amp; Angles
              </h2>
              <p className="text-text-secondary max-w-xl mx-auto">Dr. Greg is available to discuss:</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TOPICS.map((topic) => (
                <div
                  key={topic.title}
                  className="bg-bg-surface rounded-xl border border-white/10 p-6 hover:border-accent-cyan/30 transition-colors"
                >
                  <div className="text-3xl mb-3">{topic.icon}</div>
                  <h3 className="font-heading font-bold text-text-primary text-base mb-2">
                    {topic.title}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{topic.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credibility Block */}
        <section className="py-20 bg-bg-surface">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
                Background
              </p>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-text-primary">
                The Credentials
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div className="space-y-5">
                <p className="text-text-secondary leading-relaxed">
                  Dr. Gregory Michael Newkirk holds a PhD in molecular biology and has spent his
                  career at the intersection of science, communication, and public accountability.
                  He founded Science and Freedom for Everyone (SAFE), a nonprofit dedicated to
                  science advocacy and policy.
                </p>
                <p className="text-text-secondary leading-relaxed">
                  Unlike most science communicators, Dr. Greg shows up to the debate on camera, in
                  real time, against the people actively spreading misinformation. His background in
                  patent strategy and biotech consulting gives him depth that goes beyond the lab.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {CREDENTIALS.map((cred) => (
                  <div
                    key={cred.label}
                    className="flex items-center gap-3 bg-bg border border-white/10 rounded-lg px-5 py-4"
                  >
                    <div className="w-2 h-2 rounded-full bg-accent-cyan flex-shrink-0" />
                    <span className="text-text-primary font-semibold">{cred.label}</span>
                  </div>
                ))}
                <div className="mt-6 p-4 rounded-lg bg-bg border border-white/5">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Off screen: dad of four, married since 2014, Brazilian jiu-jitsu practitioner.
                    The same discipline that keeps him standing in a debate keeps him grounded at home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Media Kit */}
        <MediaKitSection />

        {/* Contact footer */}
        <section className="py-12 bg-bg border-t border-white/5">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <p className="text-text-secondary text-sm mb-2">Direct booking inquiries:</p>
            <a
              href="mailto:booking@drgregshow.com"
              className="text-accent-cyan text-lg font-semibold hover:underline"
            >
              booking@drgregshow.com
            </a>
            <p className="text-text-secondary/60 text-xs mt-3">
              We respond to all inquiries within 2 business days.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
