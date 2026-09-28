import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content";

const BOOKING_EMAIL = "greg@drgregshow.com";

const COVERS = [
  "Vaccines & immunology",
  "Genetics & CRISPR",
  "Public health",
  "Nutrition science",
  "Microbiology & the microbiome",
  "Drug development & pharma",
  "Health misinformation",
  "Science denial",
];

const CREDENTIALS = [
  { k: "Doctorate", v: "Ph.D., Microbiology, UC Riverside (2023)" },
  { k: "Undergraduate", v: "B.Sc., Biology, UC San Diego" },
  { k: "Publications", v: "Nature Nanotechnology, ACS Nano, Molecular Plant, Frontiers in Plant Science" },
  { k: "Patent", v: "Co-inventor, U.S. Patent 11,186,845" },
  { k: "Honors", v: "NDSEG Fellow (U.S. Dept. of Defense, ~top 4%); NSF GRFP awarded" },
  { k: "Industry", v: "17 years bench science across biotech and pharma" },
];

const CREDITS = [
  { role: "Host & Creator", title: "The Dr Greg Show", detail: "Nightly live science program (TikTok / YouTube / Twitch)", year: "2025 to present" },
  { role: "Principal, Commercial", title: "Pinter", detail: "National commercial (GASSED)", year: "2026" },
  { role: "Principal, Commercial", title: "The Beard Club (x2)", detail: "National commercials (GASSED)", year: "2026" },
  { role: "Principal, Print", title: "Calming Co", detail: "Print / product campaign", year: "2026" },
];

// Guest media kit and casting resources, moved here from the old /book page.
const DOCS = [
  { href: site.links.mediaKit, title: "Guest media kit (Sept 2026)", sub: "PDF, 2 pages: bio, topics, record, questions, clips, contact" },
  { href: "/media/resume.pdf", title: "Acting resume", sub: "PDF: credits, training, stats, casting profiles" },
  { href: "/media/one-sheet.pdf", title: "Talent one-sheet", sub: "PDF: look, range, and representation summary" },
  { href: "/media/press-photos.zip", title: "Press photos", sub: "ZIP: high-res headshots (commercial, expert, lab coat)" },
];

const CASTING_PROFILES = [
  { href: "https://resumes.actorsaccess.com/gregnewkirk", title: "Actors Access profile", sub: "Live casting profile: credits, media, sizes" },
  { href: "https://app.castingnetworks.com/talent/public-profile/74e888a8-7716-11f1-a044-af55f057f81b", title: "Casting Networks profile", sub: "Live casting profile: media, stats, contact" },
];

export const metadata: Metadata = {
  title: "Press & booking",
  description:
    "Electronic press kit for Dr. Greg Newkirk, PhD molecular biologist and on-camera science host who translates health, genetics, and vaccine science for the public. Booking, credentials, reel, and stats.",
  openGraph: {
    title: "Press & booking | Dr. Greg Newkirk",
    description: "PhD molecular biologist and on-camera science host. Booking, credentials, reel, and audience stats.",
    url: "https://drgregshow.com/press",
    siteName: "The Dr Greg Show",
    type: "profile",
  },
};

const PERSON_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Gregory M. Newkirk",
  alternateName: "Dr. Greg Newkirk",
  jobTitle: "Science Correspondent",
  description:
    "PhD molecular biologist and on-camera science host who translates health, genetics, and vaccine science for the public.",
  url: "https://drgregshow.com/press",
  image: "https://drgregshow.com/images/headshot-commercial.jpg",
  email: `mailto:${BOOKING_EMAIL}`,
  knowsAbout: ["Biotechnology", "Public health", "Vaccines", "Genetics", "CRISPR", "Microbiology", "Science communication", "Health misinformation"],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of California, Riverside" },
    { "@type": "CollegeOrUniversity", name: "University of California, San Diego" },
  ],
  sameAs: [site.links.youtube, site.links.tiktok, site.links.instagram, site.links.discord, site.links.substack],
};

export default function PressPage() {
  return (
    <section className="page-head">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }} />
      <div className="wrap">
        <h1>Electronic press kit</h1>
        <p className="lede">
          I&apos;m a PhD molecular biologist and on-camera science host. I translate health, genetics, and vaccine
          science for the public, and I debate health and biotech misinformation live, every night.
        </p>
        <div className="row" style={{ marginTop: 18 }}>
          <a className="btn primary" href={`mailto:${BOOKING_EMAIL}?subject=Booking%20inquiry%20-%20Dr.%20Greg%20Newkirk`}>
            Book Dr. Greg
          </a>
          <a className="btn ghost" href="https://youtu.be/KMZWRu7mBEs" target="_blank" rel="noopener">
            Watch the reel
          </a>
        </div>

        <div className="stats" style={{ marginTop: 28 }}>
          {site.metrics.map((m) => (
            <div className="stat" key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>The lane</h2>
        <p style={{ maxWidth: "68ch" }}>
          I work one beat: biotech, health, genetics and vaccines. I bring real bench credentials and 500+ live
          debates against science deniers, and I explain what today&apos;s health headline actually means, with the
          primary research on screen.
        </p>
        <div className="row" style={{ marginTop: 14 }}>
          {COVERS.map((c) => (
            <span className="chip" key={c} style={{ cursor: "default" }}>
              {c}
            </span>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Bio</h2>
        <div className="card" style={{ padding: 24, display: "grid", gap: 12, maxWidth: 760 }}>
          <p>
            I&apos;m Dr. Greg Newkirk, a molecular biologist and host of The Dr Greg Show, a live science program
            that streams nightly on YouTube, TikTok, Twitch and Facebook. I earned my Ph.D. in Microbiology at UC
            Riverside as an NDSEG Fellow and spent 17 years at the bench at BASF, Cibus and UC San Diego. My research
            has been published in Nature Nanotechnology and ACS Nano, and I am a co-inventor on a U.S. patent.
          </p>
          <p>
            I started the show because misinformation spreads in live, unscripted conversations, and scientists are
            rarely part of them. Since August 2025 I have done more than 500 live debates and 1,000 hours on air, and
            the show has passed 6 million views. I have debated Kent Hovind and argued evolution in a 2v2 on
            Modern-Day Debate. My approach is simple: one claim at a time, with the primary source on screen.
          </p>
          <div>
            <a href={site.links.mediaKit} target="_blank" rel="noopener">
              Download the guest media kit (PDF, Sept 2026)
            </a>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Credentials</h2>
        <div className="creds" style={{ gridTemplateColumns: "repeat(2, minmax(0,1fr))", maxWidth: 760 }}>
          {CREDENTIALS.map((c) => (
            <div key={c.k}>
              <div className="small" style={{ fontWeight: 700 }}>{c.k}</div>
              <div>{c.v}</div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 14 }}>
          <Link href="/research">Full publication list and dissertation</Link>
        </p>

        <h2 style={{ margin: "36px 0 14px" }}>Select credits</h2>
        <div className="card" style={{ padding: 8, maxWidth: 760 }}>
          {CREDITS.map((c) => (
            <div
              key={c.title}
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 16,
                padding: "12px 16px",
                borderBottom: "1px solid var(--rule-2)",
              }}
            >
              <div>
                <strong>{c.title}</strong>
                <span className="small">, {c.role}. {c.detail}</span>
              </div>
              <span className="small" style={{ whiteSpace: "nowrap" }}>{c.year}</span>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Format and availability</h2>
        <div className="formats">
          <div className="card" style={{ padding: 16 }}>
            <h3>Cadence</h3>
            <p>Live nightly, 9 PM PT. Rapid-response same-day commentary on breaking health and science news.</p>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <h3>Formats</h3>
            <p>On-air expert, spokesperson, debate, explainer, remote live hit, self-tape.</p>
          </div>
          <div className="card" style={{ padding: 16 }}>
            <h3>Location</h3>
            <p>San Diego, Los Angeles available, broadcast-quality home studio, remote ready.</p>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Press and casting resources</h2>
        <div className="formats">
          {DOCS.map((doc) => (
            <a className="card" href={doc.href} target="_blank" rel="noopener" key={doc.href} style={{ padding: 16, textDecoration: "none" }}>
              <h3>{doc.title}</h3>
              <p className="small">{doc.sub}</p>
            </a>
          ))}
          {CASTING_PROFILES.map((p) => (
            <a className="card" href={p.href} target="_blank" rel="noopener" key={p.href} style={{ padding: 16, textDecoration: "none" }}>
              <h3>{p.title}</h3>
              <p className="small">{p.sub}</p>
            </a>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Booking</h2>
        <div className="card" style={{ padding: 24, textAlign: "center", maxWidth: 640 }}>
          <p>For segments, expert commentary, spokesperson, and speaking.</p>
          <div className="row" style={{ justifyContent: "center", marginTop: 14 }}>
            <a className="btn primary" href={`mailto:${BOOKING_EMAIL}?subject=Booking%20inquiry%20-%20Dr.%20Greg%20Newkirk`}>
              {BOOKING_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
