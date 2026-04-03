"use client";

import { useState, FormEvent } from "react";
import { useForm, ValidationError } from "@formspree/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FORMSPREE_ID = "xwvrknog";

const INQUIRY_TYPES = [
  "Podcast Guest Appearance",
  "Keynote Speaking",
  "Live Debate",
  "Brand Spokesperson / Partnership",
  "Commercial / On-Camera Work",
  "Science Consulting (Film / TV / Media)",
  "Expert Commentary / Panel",
  "Corporate Science Communication",
  "Other",
];

const AVAILABLE_FOR = [
  "Podcast Guest Appearances",
  "Keynote Speaking & Panels",
  "Live Debate (any science topic)",
  "Brand Spokesperson & Partnerships",
  "Commercial & On-Camera Work",
  "Science Consulting (Film / TV / Media)",
  "Expert Commentary & Media Appearances",
  "Corporate Science Communication Training",
];

const TOPICS = [
  { icon: "🦕", title: "Evolution vs. Creationism", desc: "The science is settled. The debate keeps happening. Dr. Greg explains why — and makes the case live." },
  { icon: "💉", title: "Vaccine Science & the Anti-Vax Movement", desc: "A molecular biologist breaks down the actual immunology and explains why the misinformation keeps spreading." },
  { icon: "🏥", title: "MAHA / RFK Jr. Health Claims", desc: "What the science actually says about the MAHA movement's health claims — from a PhD who debates them live." },
  { icon: "🧠", title: "The Psychology of Science Denial", desc: "500+ live debates. What actually changes minds — and what doesn't." },
  { icon: "⚔️", title: "Fighting Misinformation in Real Time", desc: "Lessons from the front lines. How misinformation spreads, why it sticks, and what to do about it." },
  { icon: "🎤", title: "Building a Media Brand as a Working Scientist", desc: "How a PhD built 6M+ views debating science deniers. Creator economy meets scientific authority." },
  { icon: "🤖", title: "AI & Pro-Science Civic Organizing", desc: "How AI tools can help pro-science communities organize and win the policy fights that matter." },
  { icon: "🧬", title: "Biotech & Gene Therapy (Explained Simply)", desc: "CRISPR, gene therapy, mRNA — explained without the jargon by someone who worked in the field." },
];

const CREDENTIALS = [
  "PhD, Microbiology & Plant Pathology — UC Riverside",
  "Published in Nature Nanotechnology and ACS Nano",
  "U.S. Patent Holder — nanoparticle delivery systems",
  "NDSEG Fellow (Dept. of Defense, <4% acceptance)",
  "17 years bench science: BASF, Cibus, UC San Diego",
  "6M+ views across all platforms since August 2025",
  "Debated Kent Hovind — 1h49m live broadcast, Modern Day Debates",
];

const STATS = [
  { value: "6M+", label: "Views Across All Platforms" },
  { value: "7.78%", label: "TikTok Engagement Rate (3× avg)" },
  { value: "500+", label: "Live Debates with Science Deniers" },
  { value: "17 yrs", label: "Bench Science Experience" },
];

const DEMO_AUDIENCE = [
  { label: "61% Female TikTok audience", note: "rare for science/debate content" },
  { label: "75% US-based Facebook audience", note: "" },
  { label: "Core age 35–64 across all platforms", note: "high-income decision-makers" },
  { label: "Top cities: NYC, LA, Chicago, Philly, Houston", note: "all top-10 US media markets" },
];

function BookingForm() {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="text-center py-10 bg-bg-surface rounded-xl border border-white/10">
        <div className="text-4xl mb-4">✅</div>
        <p className="text-text-primary font-semibold text-lg mb-2">Inquiry received!</p>
        <p className="text-text-secondary text-sm">Dr. Greg will respond within 2 business days.</p>
      </div>
    );
  }

  const inputClass = "w-full bg-bg border border-white/10 rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-cyan/50 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="bg-bg-surface rounded-xl border border-white/10 p-8 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Your Name</label>
          <input name="name" type="text" required placeholder="Your name" className={inputClass} />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-400 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Organization / Show Name</label>
          <input name="org" type="text" required placeholder="Podcast, network, brand, etc." className={inputClass} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Your Email</label>
          <input name="email" type="email" required placeholder="you@example.com" className={inputClass} />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-400 text-xs mt-1" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Type of Inquiry</label>
          <select name="type" required className={inputClass}>
            <option value="">Select type…</option>
            {INQUIRY_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Budget Range (optional)</label>
          <input name="budget" type="text" placeholder="e.g. $5,000–$10,000" className={inputClass} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Proposed Date(s)</label>
          <input name="dates" type="text" placeholder="e.g. May 2026, flexible" className={inputClass} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-text-primary mb-1.5">Brief Description of Opportunity</label>
        <textarea name="message" rows={4} required placeholder="Tell Dr. Greg about the opportunity, the topic, and the format." className={`${inputClass} resize-none`} />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-400 text-xs mt-1" />
      </div>
      <button type="submit" disabled={state.submitting} className="w-full py-3 bg-accent-cyan text-bg font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors disabled:opacity-60">
        {state.submitting ? "Sending..." : "Send Booking Inquiry"}
      </button>
    </form>
  );
}

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16">

        {/* Hero */}
        <section className="py-20 bg-bg">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">Booking</p>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-text-primary mb-4">Book Dr. Greg</h1>
            <p className="text-text-secondary text-lg mb-2">PhD Molecular Biologist. Live Debate Host. Science Communicator.</p>
            <p className="text-text-secondary">Available for podcasts, speaking, brand partnerships, media, and consulting.</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
              {STATS.map(s => (
                <div key={s.value} className="bg-bg-surface rounded-xl border border-white/10 p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-accent-cyan">{s.value}</div>
                  <div className="text-xs text-text-secondary mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Available For */}
        <section className="py-16 bg-bg-surface">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-8 text-center">Available For</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {AVAILABLE_FOR.map(item => (
                <div key={item} className="flex items-center gap-3 bg-bg border border-white/10 rounded-lg px-5 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0" />
                  <span className="text-text-primary text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Reel */}
        <section className="py-16 bg-bg">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-4 text-center">Demo Reel</h2>
            <p className="text-text-secondary text-center mb-8">60 seconds. Teaching, authority, composure under pressure, personality.</p>
            <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/KMZWRu7mBEs"
                title="Dr. Greg Newkirk Demo Reel"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-16 bg-bg-surface">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-8 text-center">Key Topics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TOPICS.map(t => (
                <div key={t.title} className="bg-bg rounded-xl border border-white/10 p-5 hover:border-accent-cyan/30 transition-colors">
                  <div className="text-2xl mb-3">{t.icon}</div>
                  <h3 className="font-semibold text-text-primary text-sm mb-2">{t.title}</h3>
                  <p className="text-text-secondary text-xs leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credentials */}
        <section className="py-16 bg-bg">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2 text-center">Credentials</h2>
            <p className="text-text-secondary text-center mb-8 text-sm">The real thing. Not an actor in a lab coat.</p>
            <div className="space-y-3 mb-10">
              {CREDENTIALS.map(c => (
                <div key={c} className="flex items-center gap-3 bg-bg-surface border border-white/10 rounded-lg px-5 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent-cyan flex-shrink-0" />
                  <span className="text-text-primary text-sm">{c}</span>
                </div>
              ))}
            </div>
            <div className="bg-bg-surface rounded-xl border border-white/10 p-6">
              <p className="text-text-secondary text-sm leading-relaxed">
                Dr. Gregory Newkirk is a molecular biologist (PhD, UC Riverside), science communicator, and the host of The Dr Greg Show — a nightly live debate program where he teaches complex science to everyday audiences and fights misinformation where it actually lives: live, in real time on TikTok and YouTube. His 17-year career spans BASF, Cibus, and UC San Diego, with publications in Nature Nanotechnology and ACS Nano. He is an NDSEG Fellow and holds a U.S. patent in nanoparticle delivery systems.
              </p>
            </div>
          </div>
        </section>

        {/* Audience Demographics */}
        <section className="py-16 bg-bg-surface">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2 text-center">Audience Demographics</h2>
            <p className="text-text-secondary text-center mb-8 text-sm">Who watches. Why it matters for brands.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {DEMO_AUDIENCE.map(d => (
                <div key={d.label} className="bg-bg rounded-xl border border-white/10 p-5">
                  <div className="font-semibold text-text-primary text-sm">{d.label}</div>
                  {d.note && <div className="text-text-secondary text-xs mt-1">{d.note}</div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical */}
        <section className="py-12 bg-bg">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-xl font-heading font-bold text-text-primary mb-6 text-center">Technical Capabilities</h2>
            <div className="bg-bg-surface rounded-xl border border-white/10 p-6 space-y-2 text-sm text-text-secondary">
              <p>Full multi-camera OBS studio with professional audio (Electro-Voice RE20)</p>
              <p>Remote recording via Riverside.fm, Zencastr, Zoom, Google Meet, or any platform</p>
              <p>Available in-person in San Diego County, CA — will travel nationally for major bookings</p>
              <p>Nightly stream 9PM–11PM PT — recordings outside that window preferred</p>
            </div>
          </div>
        </section>

        {/* Downloads */}
        <section className="py-16 bg-bg">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-2xl font-heading font-bold text-text-primary mb-2 text-center">Press Resources</h2>
            <p className="text-text-secondary text-center mb-8 text-sm">Everything you need for show notes, press, and pitching.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-bg-surface rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
                <div className="text-3xl mb-4">📄</div>
                <h3 className="font-heading font-bold text-text-primary text-lg mb-2">Media Kit & One-Sheet</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  Bio, topics, stats, and contact. Print-ready PDF.
                </p>
                <a
                  href="/media/one-sheet.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent-cyan text-bg text-sm font-semibold rounded-lg hover:bg-accent-cyan/90 transition-colors"
                >
                  Download Media Kit
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </a>
              </div>
              <div className="bg-bg-surface rounded-xl border border-white/10 p-7 flex flex-col items-start hover:border-accent-cyan/30 transition-colors">
                <div className="text-3xl mb-4">📸</div>
                <h3 className="font-heading font-bold text-text-primary text-lg mb-2">Press Photos</h3>
                <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                  High-resolution headshots. Commercial, expert, and lab coat.
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
            </div>
          </div>
        </section>

        {/* Schedule a Call */}
        <section className="py-20 bg-bg">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">Schedule</p>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">Book a Time</h2>
              <p className="text-text-secondary text-sm">Pick a time that works for you. 30-minute intro calls available.</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/10 bg-bg-surface">
              <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3p6cT71h7rHAhq98WA?gv=true"
                style={{ border: 0, width: '100%', height: '600px' }}
                title="Book a time with Dr. Greg"
              />
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-20 bg-bg-surface">
          <div className="max-w-2xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">Or Send a Message</p>
              <h2 className="text-3xl font-heading font-bold text-text-primary mb-3">Booking Inquiry</h2>
              <p className="text-text-secondary text-sm">For custom requests, brand partnerships, or anything that needs more detail.</p>
            </div>
            <BookingForm />
            <p className="text-center text-text-secondary text-sm mt-6">
              Or email directly: <a href="mailto:greg@drgregshow.com" className="text-accent-cyan hover:underline">greg@drgregshow.com</a>
              {" "}· <a href="tel:9095775677" className="text-accent-cyan hover:underline">(909) 577-5677</a>
            </p>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
