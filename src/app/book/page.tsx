import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content";
import BookingForm from "@/components/forms/BookingForm";

export const metadata: Metadata = {
  title: "Book me",
};

// Verbatim from the old /book page's topics section (Greg's own pitch copy).
const TOPICS = [
  {
    title: "What does the vaccine evidence actually say?",
    prop: "Proposition: For routine childhood vaccines, the measured benefits far outweigh the measured risks.",
    desc: "Adverse-event reports, safety studies and mRNA myths, checked against the primary sources live.",
  },
  {
    title: "Are viruses real? Germ theory vs. terrain theory",
    prop: "Proposition: Viruses exist and cause infectious disease.",
    desc: 'Isolation, sequencing, electron microscopy and what "terrain theory" gets wrong.',
  },
  {
    title: "Do humans share ancestors with other apes?",
    prop: "Proposition: Genetic evidence shows humans and chimpanzees share a common ancestor.",
    desc: "Chromosome 2 fusion, shared viral insertions and broken genes in the same places, read the way a molecular biologist reads a genome.",
  },
  {
    title: "Climate change",
    prop: "Proposition: Human activity is the main driver of current global warming.",
    desc: "The measurements behind the consensus, and where biotechnology fits in mitigation.",
  },
  {
    title: "A COVID retrospective",
    prop: "",
    desc: "Lab leak, the pandemic's conspiracy theories, and what the evidence does and does not show.",
  },
  {
    title: "Also: origin of life, gene editing, nanotechnology",
    prop: "",
    desc: "Prebiotic chemistry from the molecular biology side, what CRISPR can and cannot do, and my own research on nanomaterial DNA delivery.",
  },
];

// Below: verbatim from `git show 4a68805:src/app/book/page.tsx` (fix round 1, controller ruling:
// /book is the page Greg's booking pitches link to, so the old pitch content must survive). No
// em or en dashes were present in the source.

// Keep in sync with DrGreg-Ops/50-Assets/DrGreg_Media_Kit_2026-09.html (vault).
const STATS = [
  { value: "6M+", label: "Views since Aug 2025" },
  { value: "35K+", label: "Followers, all platforms" },
  { value: "500+", label: "Live debates" },
  { value: "1,000+", label: "Hours live" },
];

const CREDENTIALS = [
  { label: "Ph.D.", detail: "Microbiology, UC Riverside (2023)" },
  { label: "Published", detail: "Nature Nanotechnology, ACS Nano" },
  { label: "Patent", detail: "Co-inventor, U.S. Patent 11,186,845" },
  { label: "Fellow", detail: "NDSEG, Dept. of Defense" },
  { label: "17 years", detail: "Bench science at BASF, Cibus, UC San Diego" },
];

const SERVICES = [
  { title: "Podcast Guest", desc: "In-studio or remote. 30-90 min format. Brings real credentials + real stories." },
  { title: "Keynote Speaking", desc: "Conferences, universities, corporate events. Science communication, misinformation, civic engagement." },
  { title: "Live Debate", desc: "Any science topic. Any format. 500+ live debates and counting." },
  { title: "Brand Spokesperson", desc: "Pharma, biotech, health, education. Authentic scientific authority with proven audience trust." },
  { title: "Commercial & On-Camera", desc: "Spokesperson, host, presenter, expert. Professional studio ready." },
  { title: "Science Consulting", desc: "Film, TV, media accuracy. Making the science right, and making it interesting." },
];

// Rendered server-side only, so Hovind-titled entries never reach client JS. Plain rows, no
// special styling for any title.
const RECORD = [
  { title: "Kent Hovind, creation vs. evolution", where: "Modern-Day Debate, Mar 2026", url: "https://www.youtube.com/watch?v=EW4_KcJ-9Ak" },
  { title: "2v2: Adam and Eve vs. evolution, vs. Standing For Truth (Donny Budinsky)", where: "Modern-Day Debate, Aug 11, 2026", url: "https://www.youtube.com/watch?v=8FCbPhlGaYw" },
  { title: "Evolution on Trial, vs. MadebyJimbob", where: "Modern-Day Debate, Jan 2026", url: "https://www.youtube.com/watch?v=hhq85EhaHIw" },
  { title: "Skeptics in the Pub Online, invited talk", where: "Aug 27, 2026" },
  { title: "Skeptics and Seekers, podcast guest", where: "" },
  { title: "Alex Stein vs 10 Skeptics, evolution round", where: "Digital Social Hour (1.2M+ YouTube subscribers), Sept 2026", url: "https://www.youtube.com/watch?v=ogT2ATaeLbE" },
  { title: "Big Homie CC vs 10, panelist", where: "Digital Social Hour, Sept 29, 2026" },
  { title: "Kent Hovind, in-person debate", where: "Digital Social Hour, Jan 2027 (upcoming)" },
];

const QUESTIONS = [
  "You spent 17 years in a lab. Why start arguing with strangers on the internet every night?",
  "After 500+ live debates, what actually changes someone's mind?",
  "What happened when you debated Kent Hovind?",
  "What is the single strongest genetic evidence for common ancestry?",
  "Scientists don't know how life started. Isn't that a win for creationists?",
  "How should a regular person check a viral health claim?",
  "Which question do you get asked that you still can't answer?",
];

const BIO_SHORT =
  "I'm Dr. Greg Newkirk, a molecular biologist (Ph.D., Microbiology, UC Riverside) and host of The Dr Greg Show, a nightly live science program. After 17 years at the lab bench, I now argue science in public: more than 500 live debates, including creationist Kent Hovind on Modern-Day Debate.";

const BIO_LONG = [
  "I'm Dr. Greg Newkirk, a molecular biologist and host of The Dr Greg Show, a live science program that streams nightly on YouTube, TikTok, Twitch and Facebook. I earned my Ph.D. in Microbiology at UC Riverside as an NDSEG Fellow and spent 17 years at the bench at BASF, Cibus and UC San Diego. My research has been published in Nature Nanotechnology and ACS Nano, and I am a co-inventor on a U.S. patent.",
  "I started the show because misinformation spreads in live, unscripted conversations, and scientists are rarely part of them. Since August 2025 I have done more than 500 live debates and 1,000 hours on air, and the show has passed 6 million views. I have debated Kent Hovind and argued evolution in a 2v2 on Modern-Day Debate. My approach is simple: one claim at a time, with the primary source on screen.",
];

const TECHNICAL = [
  "Full multi-camera OBS studio with professional audio (Electro-Voice RE20)",
  "Remote recording via Riverside, Zencastr, Zoom, Google Meet, or your platform",
  "In person in San Diego County, CA; travel by arrangement",
  "Nightly stream 9 to 11 PM PT; any other slot works",
];

const CALENDAR_URL = "https://calendar.app.google/2hjNTYiybwsuTVoE6";

export default function BookPage() {
  const formatTitles = site.bookingFormats.map((f) => f.title);

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Book me</h1>
        <p className="lede">{formatTitles.join(", ")}.</p>

        <div className="row" style={{ margin: "18px 0 26px" }}>
          <a className="btn ghost" href={site.links.mediaKit} target="_blank" rel="noopener">
            Download the media kit (PDF)
          </a>
        </div>

        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Credentials</h2>
        <div className="formats">
          {CREDENTIALS.map((c) => (
            <div className="card" style={{ padding: 16 }} key={c.label}>
              <h3>{c.label}</h3>
              <p className="small">{c.detail}</p>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Available for</h2>
        <div className="formats">
          {SERVICES.map((s) => (
            <div className="card" style={{ padding: 16 }} key={s.title}>
              <h3>{s.title}</h3>
              <p className="small">{s.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Booking formats</h2>
        <div className="formats">
          {site.bookingFormats.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Topics and propositions</h2>
        <div className="formats">
          {TOPICS.map((t) => (
            <div className="card" style={{ padding: 20 }} key={t.title}>
              <h3>{t.title}</h3>
              {t.prop && (
                <p className="small" style={{ fontStyle: "italic", marginTop: 6 }}>
                  {t.prop}
                </p>
              )}
              <p style={{ marginTop: 6 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div className="two" style={{ marginTop: 36 }}>
          <div>
            <h2 style={{ marginBottom: 16 }}>Debate and guest record</h2>
            <div>
              {RECORD.map((r) => (
                <div
                  key={r.title}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 8,
                    padding: "12px 0",
                    borderBottom: "1px solid var(--rule-2)",
                  }}
                >
                  <span style={{ fontWeight: 600 }}>
                    {r.url ? (
                      <a href={r.url} target="_blank" rel="noopener">
                        {r.title}
                      </a>
                    ) : (
                      r.title
                    )}
                  </span>
                  {r.where && <span className="small">{r.where}</span>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 style={{ marginBottom: 16 }}>Sample questions for hosts</h2>
            <ol style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 10 }}>
              {QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </ol>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Bios for show notes</h2>
        <div style={{ display: "grid", gap: 16, maxWidth: 780 }}>
          <div className="card" style={{ padding: 20 }}>
            <div className="small" style={{ fontWeight: 700, marginBottom: 8 }}>Short bio, 50 words</div>
            <p>{BIO_SHORT}</p>
          </div>
          <div className="card" style={{ padding: 20 }}>
            <div className="small" style={{ fontWeight: 700, marginBottom: 8 }}>Long bio, 150 words</div>
            {BIO_LONG.map((para) => (
              <p key={para.slice(0, 24)} style={{ marginTop: 10 }}>
                {para}
              </p>
            ))}
          </div>
          <div>
            <a className="btn primary" href={site.links.mediaKit} target="_blank" rel="noopener">
              Download the guest media kit (PDF)
            </a>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Technical capabilities</h2>
        <ul style={{ margin: 0, paddingLeft: 20, display: "grid", gap: 10, maxWidth: 780 }}>
          {TECHNICAL.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <p className="small" style={{ marginTop: 20 }}>
          For press and casting resources (resume, one-sheet, photos, casting profiles), see{" "}
          <Link href="/press">press</Link>.
        </p>

        <h2 style={{ margin: "36px 0 16px" }}>Book a call</h2>
        <div className="card" style={{ padding: 24, maxWidth: 480 }}>
          <p>30-minute intro calls. Pick a time that works.</p>
          <p className="small" style={{ marginTop: 8 }}>
            Pick any open slot on my live calendar. Opens in a new tab.
          </p>
          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn primary" href={CALENDAR_URL} target="_blank" rel="noopener">
              View available times
            </a>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 16px" }}>Send a booking request</h2>
        <div>
          <BookingForm formatTitles={formatTitles} />
        </div>
        <p className="small" style={{ marginTop: 20 }}>
          Or reach out directly: <a href="mailto:greg@drgregshow.com">greg@drgregshow.com</a>
          {" "}&middot;{" "}
          <a href="tel:9095775677">(909) 577-5677</a>
        </p>
      </div>
    </section>
  );
}
