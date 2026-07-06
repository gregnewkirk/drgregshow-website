import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import {
  FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaDiscord, FaTwitch,
  FaXTwitter, FaEnvelope, FaArrowUpRightFromSquare, FaPlay,
} from 'react-icons/fa6'

const ACCENT = '#7EB8DA'
const GOLD = '#E8C97E'
const REEL_URL = 'https://youtu.be/KMZWRu7mBEs'
const BOOKING_EMAIL = 'greg@drgregshow.com'

const SOCIALS = [
  { Icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', label: 'YouTube' },
  { Icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', label: 'TikTok' },
  { Icon: FaTwitch, url: 'https://www.twitch.tv/drgregshow', label: 'Twitch' },
  { Icon: FaInstagram, url: 'https://instagram.com/drgregshow', label: 'Instagram' },
  { Icon: FaXTwitter, url: 'https://x.com/DrGregShow', label: 'X' },
  { Icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', label: 'Facebook' },
  { Icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', label: 'Discord' },
]

const STATS = [
  { n: '6M+', l: 'Views' },
  { n: '7.78%', l: 'Engagement (3x avg)' },
  { n: '30K+', l: 'Following' },
  { n: '500+', l: 'Live debates' },
]

const COVERS = [
  'Vaccines & immunology', 'Genetics & CRISPR', 'Public health', 'Nutrition science',
  'Microbiology & the microbiome', 'Drug development & pharma', 'Health misinformation', 'Science denial',
]

const CREDENTIALS = [
  { k: 'Doctorate', v: 'Ph.D., Microbiology, UC Riverside (2023)' },
  { k: 'Undergraduate', v: 'B.Sc., Biology, UC San Diego' },
  { k: 'Publications', v: 'Nature Nanotechnology, ACS Nano, Molecular Plant, Frontiers in Plant Science' },
  { k: 'Patent', v: 'Granted U.S. Patent US11186845B1 (nanoparticle delivery)' },
  { k: 'Honors', v: 'NDSEG Fellow (U.S. Dept. of Defense, ~top 4%); NSF GRFP awarded' },
  { k: 'Industry', v: '17 years bench science across biotech and pharma' },
]

const CREDITS = [
  { role: 'Host & Creator', title: 'The Dr Greg Show', detail: 'Nightly live science program (TikTok / YouTube / Twitch)', year: '2025 to present' },
  { role: 'Principal, Commercial', title: 'Pinter', detail: 'National commercial (GASSED)', year: '2026' },
  { role: 'Principal, Commercial', title: 'The Beard Club (x2)', detail: 'National commercials (GASSED)', year: '2026' },
  { role: 'Principal, Print', title: 'Calming Co', detail: 'Print / product campaign', year: '2026' },
]

export const metadata: Metadata = {
  title: 'Press & Booking | Dr. Greg Newkirk',
  description:
    'Electronic press kit for Dr. Greg Newkirk, PhD molecular biologist and on-camera science host who translates health, genetics, and vaccine science for the public. Booking, credentials, reel, and stats.',
  openGraph: {
    title: 'Press & Booking | Dr. Greg Newkirk',
    description:
      'PhD molecular biologist and on-camera science host. Booking, credentials, reel, and audience stats.',
    url: 'https://drgregshow.com/press',
    siteName: 'Dr. Greg Show',
    type: 'profile',
  },
}

const PERSON_JSONLD = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Gregory M. Newkirk',
  alternateName: 'Dr. Greg Newkirk',
  jobTitle: 'Science Correspondent',
  description:
    'PhD molecular biologist and on-camera science host who translates health, genetics, and vaccine science for the public and debates health and biotech misinformation live.',
  url: 'https://drgregshow.com/press',
  image: 'https://drgregshow.com/headshot.jpg',
  email: `mailto:${BOOKING_EMAIL}`,
  knowsAbout: ['Biotechnology', 'Public health', 'Vaccines', 'Genetics', 'CRISPR', 'Microbiology', 'Science communication', 'Health misinformation'],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'University of California, Riverside' },
    { '@type': 'CollegeOrUniversity', name: 'University of California, San Diego' },
  ],
  sameAs: SOCIALS.map(s => s.url),
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 border-t border-white/[0.06]">
      <h2 className="text-xs tracking-[0.22em] uppercase font-bold mb-6" style={{ color: ACCENT }}>{label}</h2>
      {children}
    </section>
  )
}

export default function PressPage() {
  return (
    <div className="text-white overflow-x-hidden min-h-screen" style={{
      fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif",
      background: '#0B0B0E',
      backgroundImage: 'radial-gradient(900px 520px at 15% 2%, rgba(126,184,218,0.10), transparent 60%), radial-gradient(760px 460px at 88% 6%, rgba(255,0,80,0.05), transparent 60%), linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
      backgroundSize: 'auto, auto, 60px 60px, 60px 60px',
    }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_JSONLD) }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.04]" style={{ background: 'rgba(12,12,14,0.8)' }}>
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold tracking-wide text-sm">DR. GREG</Link>
          <div className="flex items-center gap-5 text-sm text-white/70">
            <Link href="/research" className="hover:text-white transition">Research</Link>
            <a href={`mailto:${BOOKING_EMAIL}`} className="px-3 py-1.5 rounded-md font-semibold text-black transition" style={{ background: ACCENT }}>Book</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header className="max-w-5xl mx-auto px-6 pt-28 pb-10">
        <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase font-bold mb-4" style={{ color: GOLD }}>Electronic Press Kit</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">Dr. Greg Newkirk, PhD</h1>
            <p className="mt-5 text-lg md:text-xl text-white/85 leading-relaxed">
              PhD molecular biologist and on-camera science host who translates health, genetics, and
              vaccine science for the public, and debates health and biotech misinformation live.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={`mailto:${BOOKING_EMAIL}?subject=Booking%20inquiry%20-%20Dr.%20Greg%20Newkirk`}
                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-black" style={{ background: ACCENT }}>
                <FaEnvelope /> Book Dr. Greg
              </a>
              <a href={REEL_URL} target="_blank" rel="noopener noreferrer"
                 className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold border border-white/15 hover:border-white/40 transition">
                <FaPlay /> Watch the reel
              </a>
            </div>
          </div>
          <div className="justify-self-center">
            <div className="relative w-56 h-72 rounded-xl overflow-hidden border" style={{ borderColor: 'rgba(126,184,218,0.35)' }}>
              <Image src="/headshot.jpg" alt="Dr. Greg Newkirk" fill sizes="224px" className="object-cover" priority />
            </div>
          </div>
        </div>
      </header>

      {/* STAT STRIP */}
      <div className="border-y border-white/[0.06]" style={{ background: 'rgba(126,184,218,0.04)' }}>
        <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map(s => (
            <div key={s.l} className="text-center">
              <div className="text-3xl font-extrabold" style={{ color: ACCENT }}>{s.n}</div>
              <div className="text-[11px] tracking-wider uppercase text-white/55 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* THE LANE */}
      <Section label="The Lane">
        <p className="text-lg text-white/85 leading-relaxed max-w-3xl">
          Not another general-science personality. Dr. Greg owns the intersection no one else holds: real
          bench credentials plus 500+ live debates against science deniers, in the specific beat of biotech,
          health, and vaccines. Where others explain settled wonder from a safe remove, he is the credentialed
          scientist who steps into the fight and tells audiences what today&apos;s health headline actually means.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {COVERS.map(c => (
            <span key={c} className="px-3 py-1.5 rounded-full text-sm border" style={{ borderColor: 'rgba(126,184,218,0.25)', background: 'rgba(126,184,218,0.06)', color: '#CFE3F2' }}>{c}</span>
          ))}
        </div>
      </Section>

      {/* BIO */}
      <Section label="Bio">
        <div className="max-w-3xl space-y-4 text-white/80 leading-relaxed">
          <p>
            Dr. Greg Newkirk is a PhD molecular biologist with 17 years at the lab bench and a warm, natural
            on-camera presence. Published in Nature Nanotechnology and ACS Nano, a granted U.S. patent holder,
            and an NDSEG Fellow, he now hosts The Dr Greg Show, a nightly live program that makes real science
            clear, accurate, and engaging, with more than 6 million views since August 2025.
          </p>
          <p>
            He has done more than 500 live debates with anti-vaxxers, creationists, and wellness-misinformation
            proponents, which makes him the rare on-camera scientist who stays credible and composed under fire.
            That combination, genuine expertise plus a live, unscripted spine, makes him a trustworthy voice for
            health, biotech, pharma, and public-health stories. San Diego based, Los Angeles available, and
            remote self-tape ready.
          </p>
        </div>
      </Section>

      {/* CREDENTIALS */}
      <Section label="Credentials">
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 max-w-3xl">
          {CREDENTIALS.map(c => (
            <div key={c.k}>
              <div className="text-[11px] tracking-wider uppercase font-bold mb-1" style={{ color: GOLD }}>{c.k}</div>
              <div className="text-sm text-white/80 leading-snug">{c.v}</div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href="/research" className="inline-flex items-center gap-2 text-sm font-semibold" style={{ color: ACCENT }}>
            Full publication list and dissertation <FaArrowUpRightFromSquare className="text-xs" />
          </Link>
        </div>
      </Section>

      {/* CREDITS */}
      <Section label="Select Credits">
        <div className="divide-y divide-white/[0.06] max-w-3xl">
          {CREDITS.map(c => (
            <div key={c.title} className="py-3 flex items-baseline justify-between gap-4">
              <div>
                <span className="font-semibold">{c.title}</span>
                <span className="text-white/55 text-sm"> — {c.role}. {c.detail}</span>
              </div>
              <span className="text-white/45 text-sm whitespace-nowrap">{c.year}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* FORMAT / AVAILABILITY */}
      <Section label="Format & Availability">
        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl text-sm">
          <div><div className="font-bold mb-1" style={{ color: ACCENT }}>Cadence</div><div className="text-white/75">Live nightly, 9PM PT. Rapid-response same-day commentary on breaking health and science news.</div></div>
          <div><div className="font-bold mb-1" style={{ color: ACCENT }}>Formats</div><div className="text-white/75">On-air expert, spokesperson, debate, explainer, remote live hit, self-tape.</div></div>
          <div><div className="font-bold mb-1" style={{ color: ACCENT }}>Location</div><div className="text-white/75">San Diego, Los Angeles available, broadcast-quality home studio, remote ready.</div></div>
        </div>
      </Section>

      {/* BOOKING / CONTACT */}
      <section className="max-w-5xl mx-auto px-6 py-14 border-t border-white/[0.06]">
        <div className="rounded-2xl p-8 md:p-10 text-center border" style={{ borderColor: 'rgba(126,184,218,0.25)', background: 'rgba(126,184,218,0.05)' }}>
          <h2 className="text-2xl md:text-3xl font-extrabold">Booking</h2>
          <p className="mt-3 text-white/75">For segments, expert commentary, spokesperson, and speaking.</p>
          <a href={`mailto:${BOOKING_EMAIL}?subject=Booking%20inquiry%20-%20Dr.%20Greg%20Newkirk`}
             className="mt-5 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-black text-lg" style={{ background: ACCENT }}>
            <FaEnvelope /> {BOOKING_EMAIL}
          </a>
          <div className="mt-8 flex items-center justify-center gap-5 text-white/60">
            {SOCIALS.map(({ Icon, url, label }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-white transition text-xl">
                <Icon />
              </a>
            ))}
          </div>
        </div>
        <p className="text-center text-white/35 text-xs mt-8">Dr. Greg Newkirk, PhD &middot; The Dr Greg Show &middot; drgregshow.com</p>
      </section>
    </div>
  )
}
