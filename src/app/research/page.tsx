import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { FaTiktok, FaYoutube, FaInstagram, FaFacebook, FaDiscord, FaGraduationCap, FaArrowUpRightFromSquare, FaFilePdf } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

const ACCENT = '#7EB8DA'
const ACCENT_BG = 'rgba(126,184,218,0.08)'
const ACCENT_BORDER = 'rgba(126,184,218,0.15)'

const SCHOLAR_URL = 'https://scholar.google.com/citations?user=sI--g3gAAAAJ&hl=en'
const THESIS_URL = 'https://escholarship.org/uc/item/5tv243dq'
const THESIS_PDF = '/Newkirk_Dissertation_2023.pdf'

const SOCIALS = [
  { Icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', label: 'TikTok' },
  { Icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', label: 'YouTube' },
  { Icon: FaInstagram, url: 'https://instagram.com/drgregshow', label: 'Instagram' },
  { Icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', label: 'Facebook' },
  { Icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', label: 'Discord' },
  { Icon: SiSubstack, url: 'https://drgregshow.substack.com', label: 'Substack' },
]

type BadgeAccent = 'gold' | 'navy' | 'crimson' | 'default'
type Badge = { text: string; accent?: BadgeAccent; logo?: string }

const EDUCATION: Array<{
  degree: string
  school: string
  detail: string
  year: string
  badge: Badge
}> = [
  {
    degree: 'Ph.D., Microbiology',
    school: 'University of California, Riverside',
    detail: 'Department of Microbiology and Plant Pathology · Giraldo Laboratory',
    year: '2023',
    badge: { text: 'UCR', accent: 'navy', logo: '/logos/ucr.png' },
  },
  {
    degree: 'B.Sc., Biology',
    school: 'University of California, San Diego',
    detail: 'Evolution, Ecology, and Behavior',
    year: '2012',
    badge: { text: 'UCSD', accent: 'navy', logo: '/logos/ucsd.png' },
  },
]

const HONORS: Array<{
  year: string
  name: string
  detail: string
  badge: Badge
}> = [
  {
    year: '2019',
    name: 'NDSEG Fellowship',
    detail: 'National Defense Science and Engineering Graduate Fellowship — three years of full funding from the U.S. Department of Defense. Awarded to roughly 4% of applicants in the natural sciences, mathematics, and engineering.',
    badge: { text: 'DoD', accent: 'gold', logo: '/logos/dod.png' },
  },
  {
    year: '2019',
    name: 'NSF GRFP',
    detail: 'National Science Foundation Graduate Research Fellowship — awarded, declined in favor of NDSEG. Cannot accept both; the NSF GRFP carries comparable selectivity and prestige.',
    badge: { text: 'NSF', accent: 'navy', logo: '/logos/nsf.png' },
  },
  {
    year: '2019',
    name: 'Sigma Xi',
    detail: 'Associate Member of the international scientific research honor society. Founded at Cornell in 1886, invitation-only on the basis of demonstrated research aptitude. Past members include more than 200 Nobel laureates (Einstein, Fermi, Pauling, Watson, Crick).',
    badge: { text: 'ΣΞ', accent: 'crimson', logo: '/logos/sigmaxi.png' },
  },
  {
    year: '2018',
    name: 'Best Poster',
    detail: 'Center for Plant Cell Biology Postdoc Symposium · UC Riverside — "Biopharmaceutical production through microalgae photobioreactors mediated by nanomaterial delivery of chloroplast genetic elements."',
    badge: { text: 'UCR', accent: 'navy', logo: '/logos/ucr.png' },
  },
]

const BADGE_COLORS: Record<BadgeAccent, { fg: string; bg: string; border: string }> = {
  navy:    { fg: '#A8C9E8', bg: 'rgba(126,184,218,0.10)', border: 'rgba(126,184,218,0.30)' },
  gold:    { fg: '#E8C97E', bg: 'rgba(232,201,126,0.10)', border: 'rgba(232,201,126,0.30)' },
  crimson: { fg: '#E89B9B', bg: 'rgba(232,155,155,0.10)', border: 'rgba(232,155,155,0.30)' },
  default: { fg: '#A8C9E8', bg: 'rgba(126,184,218,0.08)', border: 'rgba(126,184,218,0.15)' },
}

function CredBadge({ badge, size = 48 }: { badge: Badge; size?: number }) {
  const c = BADGE_COLORS[badge.accent ?? 'default']
  const fontSize = badge.text.length >= 4 ? 10 : badge.text.length === 2 ? 16 : 12
  return (
    <div
      className="shrink-0 flex items-center justify-center font-black tracking-wider"
      style={{
        width: size, height: size,
        color: c.fg,
        background: c.bg,
        border: `1px solid ${c.border}`,
        borderRadius: '12px',
        fontSize: `${fontSize}px`,
      }}
      aria-label={badge.text}
    >
      {badge.text}
    </div>
  )
}

const PATENT = {
  number: 'US 11,186,845 B1',
  year: '2021',
  title: 'Compositions comprising a nanoparticle, a molecular basket comprising cyclodextrin, and a chloroplast-targeting peptide and methods of use thereof',
  url: 'https://patents.google.com/patent/US11186845B1',
}

type Pub = {
  authors: string
  title: string
  venue: string
  year: string
  doi?: string
  url?: string
  pdf?: string
  firstAuthor?: boolean
}

const PUBLICATIONS: Pub[] = [
  {
    authors: 'Newkirk GM, Jeon S-J, Kim H-i, Sivaraj S, de Allende P, Castillo C, Jinkerson RE, Giraldo JP.',
    title: 'DNA delivery by high aspect ratio nanomaterials to algal chloroplasts.',
    venue: 'Environmental Science: Nano',
    year: '2023',
    doi: '10.1039/D3EN00268C',
    pdf: '/papers/Newkirk_2023_DNA_delivery_chloroplasts.pdf',
    firstAuthor: true,
  },
  {
    authors: 'Santana I, Jeon S-J, Kim H-I, Islam MR, Castillo C, Garcia GFH, Newkirk GM, Giraldo JP.',
    title: 'Targeted Carbon Nanostructures for Chemical and Gene Delivery to Plant Chloroplasts.',
    venue: 'ACS Nano',
    year: '2022',
    doi: '10.1021/acsnano.2c02714',
  },
  {
    authors: 'Newkirk GM, de Allende P, Jinkerson RE, Giraldo JP.',
    title: 'Nanotechnology Approaches for Chloroplast Biotechnology Advancements.',
    venue: 'Frontiers in Plant Science',
    year: '2021',
    doi: '10.3389/fpls.2021.691295',
    pdf: '/papers/Newkirk_2021_Frontiers_Chloroplast_Nanotechnology.pdf',
    firstAuthor: true,
  },
  {
    authors: 'Wang JW, Grandio EG, Newkirk GM, Demirer GS, Butrus S, Giraldo JP, Landry MP.',
    title: 'Nanoparticle mediated genetic engineering of plants.',
    venue: 'Molecular Plant',
    year: '2019',
    doi: '10.1016/j.molp.2019.06.010',
  },
  {
    authors: 'Giraldo JP, Wu H, Newkirk GM, Kruss S.',
    title: 'Nanobiotechnology approaches for engineering smart plant sensors.',
    venue: 'Nature Nanotechnology',
    year: '2019',
    doi: '10.1038/s41565-019-0470-6',
    pdf: '/papers/Newkirk_2019_NatureNanotechnology_SmartPlantSensors.pdf',
  },
  {
    authors: 'Newkirk GM, Wu H, Santana I, Giraldo JP.',
    title: 'Catalytic Scavenging of Plant Reactive Oxygen Species In Vivo by Anionic Cerium Oxide Nanoparticles.',
    venue: 'Journal of Visualized Experiments',
    year: '2018',
    doi: '10.3791/58373',
    firstAuthor: true,
  },
  {
    authors: 'Newkirk GM.',
    title: 'A 2018 Ballot Measure Analysis for Voters: The CA Water Bond and its Impact on Scientific Research from a Biology Perspective.',
    venue: 'Journal of Science Policy and Governance',
    year: '2018',
    url: 'http://jspg2018.gregnewkirk.com',
    firstAuthor: true,
  },
  {
    authors: 'Tran M, Henry RE, Siefker D, Van C, Newkirk GM, Kim J, Bui J, Mayfield SP.',
    title: 'Production of anti-cancer immunotoxins in algae: ribosome inactivating proteins as fusion partners.',
    venue: 'Biotechnology and Bioengineering',
    year: '2013',
    doi: '10.1002/bit.24966',
  },
]

const THESIS = {
  title: 'Nanotechnology Approaches for Arabidopsis and Chlamydomonas Chloroplast Bioengineering',
  degree: 'Ph.D. Dissertation, Microbiology',
  school: 'University of California, Riverside',
  date: 'September 2023',
  committee: 'Dr. Juan Pablo Giraldo (Chair), Dr. Robert Jinkerson, Dr. Ian Wheeldon',
}

export const metadata: Metadata = {
  title: 'Research & Credentials | Dr. Greg Newkirk',
  description: 'Peer-reviewed publications, U.S. patent, NDSEG Fellowship, and Ph.D. dissertation from Dr. Gregory M. Newkirk — molecular biologist, UC Riverside.',
  openGraph: {
    title: 'Research & Credentials | Dr. Greg Newkirk',
    description: 'Peer-reviewed publications, U.S. patent, and Ph.D. dissertation from Dr. Gregory M. Newkirk.',
    url: 'https://drgregshow.com/research',
    siteName: 'Dr. Greg Show',
    type: 'profile',
  },
}

function pubLink(p: Pub): string | undefined {
  if (p.doi) return `https://doi.org/${p.doi}`
  return p.url
}

export default function ResearchPage() {
  const firstAuthorCount = PUBLICATIONS.filter(p => p.firstAuthor).length

  return (
    <div className="text-white overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif", background: '#0C0C0E' }}>

      {/* ═══ NAV ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b border-white/[0.04]" style={{ background: 'rgba(12,12,14,0.8)' }}>
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="w-7 h-7 flex items-center justify-center text-[11px] font-black text-black" style={{ background: ACCENT, borderRadius: '8px' }}>DG</span>
            <span className="text-[15px] font-bold tracking-tight"><span className="text-white/40">The </span><span style={{ color: ACCENT }}>Dr Greg</span><span className="text-white/40"> Show</span></span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/#about" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">About</Link>
            <Link href="/#clips" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Clips</Link>
            <Link href="/#watch" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Watch</Link>
            <Link href="/research" className="text-[13px] text-white hover:text-white transition-colors duration-300 hidden sm:block">Research</Link>
            <Link href="/book" className="text-[13px] text-white/40 hover:text-white transition-colors duration-300 hidden sm:block">Book</Link>
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener"
              className="text-[12px] font-semibold px-5 py-1.5 bg-white text-black hover:bg-white/90 transition-all duration-300" style={{ borderRadius: '999px' }}>
              Watch Live
            </a>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="relative pt-32 sm:pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, #08080A, #0C0C0E)' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(126,184,218,0.08) 0%, transparent 55%)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* Portrait */}
          <div className="sm:col-span-5 order-1 sm:order-1">
            <div className="relative aspect-[3/4] max-w-[360px] mx-auto sm:mx-0 overflow-hidden"
              style={{ borderRadius: '24px', border: `1px solid ${ACCENT_BORDER}`, boxShadow: `0 0 80px ${ACCENT_BG}` }}>
              <Image
                src="/research-portrait.jpg"
                alt="Dr. Gregory M. Newkirk in UC Riverside doctoral regalia"
                fill
                sizes="(max-width: 640px) 90vw, 360px"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-bold tracking-widest uppercase text-white/85">Ph.D. Conferred</div>
                <div className="text-[12px] text-white/65">UC Riverside · September 2023</div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="sm:col-span-7 order-2 sm:order-2 text-center sm:text-left">
            <div className="text-[12px] font-bold tracking-[0.35em] uppercase mb-5" style={{ color: ACCENT }}>
              Research & Credentials
            </div>
            <h1 className="text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.04em] mb-6 text-white" style={{ fontWeight: 900 }}>
              17 years at the bench.<br />
              <span style={{ color: ACCENT }}>The receipts.</span>
            </h1>
            <p className="text-[clamp(1rem,1.5vw,1.1rem)] text-white/50 max-w-xl mx-auto sm:mx-0 leading-relaxed font-medium">
              Peer-reviewed publications, a U.S. patent, the NDSEG and NSF GRFP fellowships, and a Ph.D. dissertation. Everything below is verifiable.
            </p>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mt-8">
              <a href={SCHOLAR_URL} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 text-black font-bold text-[14px] transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderRadius: '999px', background: ACCENT }}>
                <FaGraduationCap className="w-4 h-4" /> Google Scholar
              </a>
              <a href={THESIS_URL} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/85 font-semibold text-[14px] hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                style={{ borderRadius: '999px' }}>
                <FaArrowUpRightFromSquare className="w-3.5 h-3.5" /> Dissertation
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS STRIP ═══ */}
      <section className="py-14 border-y border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-10">
          {[
            { value: PUBLICATIONS.length, label: 'Peer-Reviewed Publications' },
            { value: firstAuthorCount, label: 'First Author' },
            { value: 1, label: 'U.S. Patent' },
            { value: 17, label: 'Years in Science' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-[clamp(2rem,4vw,3rem)] font-black tracking-tight leading-none text-white">{s.value}</div>
              <div className="text-[12px] text-white/35 font-medium mt-2 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ LAB BANNER ═══ Wide professional shot at Cibus */}
      <section className="relative">
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '3 / 1', maxHeight: '520px' }}>
          <Image
            src="/research-lab-banner.jpg"
            alt="Dr. Greg Newkirk at the bench, Cibus, San Diego"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* edge fades to blend into page bg */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(12,12,14,0.4) 0%, transparent 25%, transparent 65%, rgba(12,12,14,0.95) 100%)' }} />
          <div className="absolute inset-y-0 left-0 w-24 sm:w-40" style={{ background: 'linear-gradient(to right, rgba(12,12,14,0.6), transparent)' }} />
          <div className="absolute inset-y-0 right-0 w-24 sm:w-40" style={{ background: 'linear-gradient(to left, rgba(12,12,14,0.6), transparent)' }} />
          {/* caption */}
          <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 text-center px-6">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase mb-1.5" style={{ color: ACCENT }}>At the Bench</div>
            <div className="text-[12px] sm:text-[13px] text-white/70 font-medium">Cibus · San Diego</div>
          </div>
        </div>
      </section>

      {/* ═══ EDUCATION ═══ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Education</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-10 text-white" style={{ fontWeight: 900 }}>
            Trained in the lab.
          </h2>
          <div className="space-y-5">
            {EDUCATION.map((e, i) => (
              <div key={i} className="p-6 sm:p-7 flex gap-5 items-start" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '16px' }}>
                <CredBadge badge={e.badge} size={52} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-[18px] font-bold text-white">{e.degree}</h3>
                    <span className="text-[13px] font-semibold" style={{ color: ACCENT }}>{e.year}</span>
                  </div>
                  <div className="text-[15px] text-white/70 mb-1">{e.school}</div>
                  <div className="text-[13px] text-white/40">{e.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ THESIS ═══ */}
      <section className="py-20 sm:py-24" style={{ background: '#09090B' }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Dissertation</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-10 text-white" style={{ fontWeight: 900 }}>
            Ph.D. thesis, UC Riverside.
          </h2>

          <div className="p-7 sm:p-9" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
            <h3 className="text-[clamp(1.1rem,2.2vw,1.5rem)] font-bold text-white leading-snug mb-4">
              Nanotechnology Approaches for <em className="italic">Arabidopsis</em> and <em className="italic">Chlamydomonas</em> Chloroplast Bioengineering
            </h3>
            <div className="text-[14px] text-white/60 mb-1">{THESIS.degree} · {THESIS.school}</div>
            <div className="text-[13px] text-white/40 mb-1">{THESIS.date}</div>
            <div className="text-[13px] text-white/40 mb-6">Committee: {THESIS.committee}</div>
            <div className="flex flex-wrap gap-3">
              <a href={THESIS_URL} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-black font-bold text-[13px] transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderRadius: '999px', background: ACCENT }}>
                <FaArrowUpRightFromSquare className="w-3 h-3" /> View on eScholarship
              </a>
              <a href={THESIS_PDF} target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/80 font-semibold text-[13px] hover:bg-white/5 hover:border-white/25 transition-all duration-300"
                style={{ borderRadius: '999px' }}>
                <FaFilePdf className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PATENT ═══ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>U.S. Patent</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-10 text-white" style={{ fontWeight: 900 }}>
            Granted, 2021.
          </h2>

          <div className="p-7 sm:p-9" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '20px' }}>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-4">
              <span className="text-[13px] font-mono font-bold tracking-wider" style={{ color: ACCENT }}>{PATENT.number}</span>
              <span className="text-[13px] text-white/40">Issued {PATENT.year}</span>
            </div>
            <p className="text-[15px] sm:text-[16px] text-white/80 leading-relaxed mb-6">
              &ldquo;{PATENT.title}&rdquo;
            </p>
            <a href={PATENT.url} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/15 text-white/80 font-semibold text-[13px] hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              style={{ borderRadius: '999px' }}>
              <FaArrowUpRightFromSquare className="w-3 h-3" /> View on Google Patents
            </a>
          </div>
        </div>
      </section>

      {/* ═══ HONORS ═══ */}
      <section className="py-20 sm:py-24" style={{ background: '#09090B' }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-[2fr_3fr] gap-10 sm:gap-14 items-start">
          {/* Portrait at BASF */}
          <div className="sm:sticky sm:top-24">
            <div className="relative aspect-[4/5] max-w-[320px] mx-auto sm:mx-0 overflow-hidden"
              style={{ borderRadius: '20px', border: `1px solid ${ACCENT_BORDER}`, boxShadow: `0 0 60px ${ACCENT_BG}` }}>
              <Image
                src="/research-headshot-basf.jpg"
                alt="Dr. Greg Newkirk in lab coat at BASF, San Diego"
                fill
                sizes="(max-width: 640px) 90vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4">
                <div className="text-[10px] font-bold tracking-widest uppercase text-white/85">BASF · San Diego</div>
                <div className="text-[11px] text-white/55">Scientist III, Host Strain Engineering</div>
              </div>
            </div>
          </div>

          {/* Honors list */}
          <div>
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase mb-4" style={{ color: ACCENT }}>Honors & Fellowships</div>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-8 text-white" style={{ fontWeight: 900 }}>
              Recognized work.
            </h2>
            <div className="space-y-3">
              {HONORS.map((h, i) => (
                <div key={i} className="flex items-start gap-4 px-5 py-4" style={{ background: '#111113', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                  <CredBadge badge={h.badge} size={44} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                      <h3 className="text-[15px] font-bold text-white">{h.name}</h3>
                      <span className="text-[11px] font-mono font-bold" style={{ color: ACCENT }}>{h.year}</span>
                    </div>
                    <div className="text-[13px] text-white/45">{h.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ PUBLICATIONS ═══ */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-baseline justify-between mb-4">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase" style={{ color: ACCENT }}>Publications</div>
            <a href={SCHOLAR_URL} target="_blank" rel="noopener"
              className="text-[12px] text-white/40 hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5">
              Google Scholar <FaArrowUpRightFromSquare className="w-2.5 h-2.5" />
            </a>
          </div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.75rem)] font-black leading-[1.05] tracking-tight mb-3 text-white" style={{ fontWeight: 900 }}>
            Peer-reviewed work.
          </h2>
          <p className="text-[14px] text-white/40 mb-10">
            Published across <em>Nature Nanotechnology</em>, <em>ACS Nano</em>, <em>Molecular Plant</em>, and others. First-author papers marked with a dot.
          </p>

          <ol className="space-y-5">
            {PUBLICATIONS.map((p, i) => {
              const link = pubLink(p)
              return (
                <li key={i} className="p-5 sm:p-6 transition-colors duration-300 hover:bg-white/[0.02]"
                  style={{ background: '#0F0F11', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '14px' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-[12px] font-mono text-white/25 mt-1 w-6 shrink-0">{String(PUBLICATIONS.length - i).padStart(2, '0')}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2 mb-2">
                        {p.firstAuthor && (
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: ACCENT }} aria-label="First author" />
                        )}
                        {link ? (
                          <a href={link} target="_blank" rel="noopener"
                            className="text-[15px] sm:text-[16px] font-bold text-white hover:underline leading-snug"
                            style={{ textDecorationColor: ACCENT }}>
                            {p.title}
                          </a>
                        ) : (
                          <span className="text-[15px] sm:text-[16px] font-bold text-white leading-snug">{p.title}</span>
                        )}
                      </div>
                      <div className="text-[12px] text-white/40 leading-relaxed mb-2">{p.authors}</div>
                      <div className="text-[12px] flex flex-wrap items-center gap-2">
                        <em className="text-white/65 not-italic font-semibold" style={{ fontStyle: 'italic' }}>{p.venue}</em>
                        <span className="text-white/25">·</span>
                        <span className="text-white/45">{p.year}</span>
                        {p.doi && (
                          <>
                            <span className="text-white/25">·</span>
                            <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener"
                              className="font-mono text-white/40 hover:text-white transition-colors duration-300">
                              doi:{p.doi}
                            </a>
                          </>
                        )}
                        {p.pdf && (
                          <a href={p.pdf} target="_blank" rel="noopener"
                            className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold transition-colors duration-300 hover:bg-white/5"
                            style={{ color: ACCENT, border: `1px solid ${ACCENT_BORDER}`, borderRadius: '999px' }}>
                            <FaFilePdf className="w-3 h-3" /> PDF
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            <a href={SCHOLAR_URL} target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-black font-bold text-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderRadius: '999px', background: ACCENT }}>
              <FaGraduationCap className="w-4 h-4" /> Full list on Google Scholar
            </a>
          </div>
        </div>
      </section>

      {/* ═══ BACK CTA ═══ */}
      <section className="py-20 relative" style={{ background: '#09090B' }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 50% 50%, ${ACCENT_BG} 0%, transparent 60%)` }} />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-[clamp(1.6rem,3vw,2.4rem)] font-black leading-[1.1] tracking-tight mb-5 text-white" style={{ fontWeight: 900 }}>
            Now let&apos;s do something with it.
          </h2>
          <p className="text-[15px] text-white/45 mb-8 max-w-md mx-auto">
            17 years of bench science, every night on a microphone, fighting misinformation in real time.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/"
              className="px-8 py-3.5 text-black font-bold text-[14px] transition-all duration-300 hover:-translate-y-0.5"
              style={{ borderRadius: '999px', background: ACCENT }}>
              Back to the Show
            </Link>
            <Link href="/book"
              className="px-8 py-3.5 border border-white/15 text-white/85 font-semibold text-[14px] hover:bg-white/5 hover:border-white/25 transition-all duration-300"
              style={{ borderRadius: '999px' }}>
              Book Dr. Greg
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 border-t border-white/[0.04]">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <span className="text-[12px] text-white/20">© {new Date().getFullYear()} The Dr Greg Show</span>
          <div className="flex gap-5">
            {SOCIALS.map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener" aria-label={s.label}
                className="text-white/20 hover:text-white/50 transition-colors duration-300">
                <s.Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
