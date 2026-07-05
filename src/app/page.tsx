'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaDiscord, FaFacebook, FaHeart, FaInstagram, FaPatreon, FaTiktok, FaYoutube } from 'react-icons/fa6'
import { SiSubstack } from 'react-icons/si'

const ACCENT = '#7EB8DA'
const ACCENT_BG = 'rgba(126,184,218,0.10)'
const ACCENT_BORDER = 'rgba(126,184,218,0.22)'

const SOCIALS = [
  { name: 'TikTok', icon: FaTiktok, url: 'https://www.tiktok.com/@drgregshow', key: 'tiktok', fallback: '20.3K followers', color: '#ff0050' },
  { name: 'YouTube', icon: FaYoutube, url: 'https://www.youtube.com/@DrGregShow', key: 'youtube', fallback: 'Subscribe', color: '#FF0000' },
  { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com/drgregshow', key: 'instagram', fallback: '7K', color: '#E4405F' },
  { name: 'Facebook', icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=61582489461029', key: 'facebook', fallback: '6K', color: '#1877F2' },
  { name: 'Discord', icon: FaDiscord, url: 'https://discord.gg/RXFpEmZMJU', key: 'discord', fallback: 'Join the lab', color: '#5865F2' },
  { name: 'Substack', icon: SiSubstack, url: 'https://drgregshow.substack.com', key: 'substack', fallback: 'Show notes', color: '#FF6719' },
]

const CREDENTIALS = [
  { label: 'PhD', detail: 'Microbiology & Plant Pathology, UC Riverside' },
  { label: 'Published', detail: 'Nature Nanotechnology, ACS Nano' },
  { label: 'Patent', detail: 'U.S. Patent Holder - nanoparticle delivery' },
  { label: 'Fellow', detail: 'NDSEG, Dept. of Defense (<4% acceptance)' },
  { label: '17 years', detail: 'Bench science: BASF, Cibus, UC San Diego' },
]

const CLIPS = [
  { id: '7577351168741936414', label: 'Breakthrough Moment of the Year' },
  { id: '7545302162721492255', label: 'Pseudoscience Crash Out of the Year' },
  { id: '7544864301073419551', label: 'Most Watched of the Year' },
]

// Curated fallback for the "Most Popular" section — mirrors /api/videos.
// Live data (ranked by view count, flagship pinned first) replaces this at runtime.
const FALLBACK_VIDEOS = [
  { id: 'pdzkCwy46zo', title: 'Kent Hovind Challenged a Real Scientist - Full Debate', views: 'Most-watched' },
  { id: 'Uw53ZEDVutE', title: '1 Scientist vs 8 Antivaxxers | It Got HEATED Fast', views: '' },
  { id: 'TCkwyex_Xoo', title: 'Raw Milk Is a Scam and Scientists Are Done Being Polite', views: '' },
  { id: 'mvhSU-BPSsw', title: 'Your DNA Toolbox: CRISPR & Medical Myths', views: '' },
]

const WATCH_PLAYLIST = 'PL6djXSS0x-ZwWFk5qgsXE6tIpCCZUraVl'
const watchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}&list=${WATCH_PLAYLIST}`

function getSocialLabel(
  social: typeof SOCIALS[number],
  stats: Record<string, { followers?: string; subscribers?: string; members?: string }> | null,
) {
  if (!stats) return social.fallback
  if (social.key === 'tiktok') return stats.tiktok?.followers ? `${stats.tiktok.followers} followers` : social.fallback
  if (social.key === 'youtube') return stats.youtube?.subscribers ? `${stats.youtube.subscribers} subs` : social.fallback
  if (social.key === 'instagram') return stats.instagram?.followers ?? social.fallback
  if (social.key === 'facebook') return stats.facebook?.followers ?? social.fallback
  if (social.key === 'discord') return stats.discord?.members ? `${stats.discord.members} members` : social.fallback
  return social.fallback
}

export default function Home() {
  const [liveStats, setLiveStats] = useState<Record<string, { followers?: string; subscribers?: string; members?: string }> | null>(null)
  const [totals, setTotals] = useState({ views: '7M+', followers: '34K+', debates: '500+', years: '17' })
  const [videos, setVideos] = useState<{ id: string; title: string; views: string }[]>(FALLBACK_VIDEOS)

  useEffect(() => {
    fetch('/api/stats')
      .then(r => r.json())
      .then(data => {
        setLiveStats(data)
        if (data.totals) {
          setTotals(current => ({
            ...current,
            views: data.totals.views || current.views,
            followers: data.totals.followers || current.followers,
          }))
        }
      })
      .catch(() => {})

    fetch('/api/videos')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data.videos) && data.videos.length) setVideos(data.videos)
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden text-white" style={{ background: '#0B0B0E', fontFamily: "'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif" }}>
      {/* Depth: soft accent glows + faint grid instead of flat void */}
      <div className="fixed inset-0 z-0 pointer-events-none" style={{
        background:
          'radial-gradient(900px 520px at 15% 2%, rgba(126,184,218,0.10), transparent 60%), radial-gradient(760px 460px at 88% 6%, rgba(255,0,80,0.05), transparent 60%), radial-gradient(1200px 900px at 50% 118%, rgba(126,184,218,0.045), transparent 60%), linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
        backgroundSize: 'auto, auto, auto, 60px 60px, 60px 60px',
      }} />
      <div className="fixed inset-0 z-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 320px 60px rgba(0,0,0,0.55)' }} />

      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0B0B0E]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-black text-black" style={{ background: ACCENT }}>DG</span>
            <span className="text-[15px] font-bold tracking-tight"><span className="text-white/45">The </span><span style={{ color: ACCENT }}>Dr Greg</span><span className="text-white/45"> Show</span></span>
          </Link>
          <div className="flex items-center gap-5">
            <a href="#clips" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Clips</a>
            <a href="#watch" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Watch</a>
            <Link href="/research" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Research</Link>
            <Link href="/book" className="hidden text-[13px] text-white/48 transition hover:text-white sm:block">Book</Link>
            <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener" className="rounded-full bg-white px-5 py-1.5 text-[12px] font-bold text-black transition hover:bg-white/90">
              Watch Live
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        {/* HERO */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-14 pt-24 sm:grid-cols-[1.05fr_0.95fr] sm:items-stretch sm:px-8 sm:pt-28">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: ACCENT }}>
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Live Every Night · 9 PM Pacific
            </div>
            <h1 className="max-w-3xl text-[clamp(2.6rem,7vw,4.6rem)] font-black leading-[0.9] tracking-[-0.05em]" style={{ fontWeight: 900 }}>
              Fighting misinformation
              <span className="block" style={{ color: ACCENT }}>so you don&apos;t have to.</span>
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-7 text-white/58">
              PhD molecular biologist. 17 years in the lab. Now I debate science deniers live, every single night.
            </p>

            <div className="mt-7 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { value: totals.views, label: 'Total Views' },
                { value: totals.followers, label: 'Followers' },
                { value: totals.debates, label: 'Live Debates' },
                { value: totals.years, label: 'Years in Science' },
              ].map(stat => (
                <div key={stat.label} className="rounded-2xl border border-white/[0.10] bg-white/[0.045] p-4">
                  <div className="text-[22px] font-black tracking-tight text-white">{stat.value}</div>
                  <div className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-white/38">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="https://www.tiktok.com/@drgregshow" target="_blank" rel="noopener" className="rounded-full px-7 py-3 text-[14px] font-black text-black transition hover:-translate-y-0.5" style={{ background: ACCENT }}>
                Watch Live
              </a>
              <Link href="/book" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/88 transition hover:border-white/30 hover:bg-white/[0.04]">
                Book Dr. Greg
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-rows-[1.55fr_1fr]">
            <div className="relative min-h-[220px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-white/[0.035] shadow-2xl shadow-black/40">
              <Image src="/images/liveshot.png" alt="Dr. Greg live on The Dr Greg Show" fill priority sizes="(max-width: 640px) 100vw, 45vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>Broadcast proof</div>
                <p className="max-w-md text-[13px] font-semibold text-white/88">Live, unscripted science communication with real-time audience pressure.</p>
              </div>
            </div>
            <div className="relative min-h-[180px] overflow-hidden rounded-[22px] border border-white/[0.10] bg-white/[0.035]">
              <Image src="/headshot.jpg" alt="Dr. Greg Newkirk" fill sizes="(max-width: 640px) 100vw, 45vw" className="object-cover object-[35%_22%]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-[10px] font-bold uppercase tracking-[0.22em]" style={{ color: ACCENT }}>The Scientist</div>
                <p className="mt-1 text-[14px] font-black leading-tight text-white">Real credentials. Real debates. Real science.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section id="about" className="border-y border-white/[0.07] bg-[#131317]/60 py-6">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 px-6 sm:grid-cols-5 sm:px-8">
            {CREDENTIALS.map(cred => (
              <div key={cred.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                <div className="text-[13px] font-black text-white">{cred.label}</div>
                <div className="mt-1 text-[12px] leading-5 text-white/45">{cred.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CLIPS */}
        <section id="clips" className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Fan-Voted · Top Moments</div>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-white">Every night, a different fight.</h2>
            <p className="mt-3 text-[15px] leading-7 text-white/45">Chosen by the audience. These moments make the show feel current, volatile, and hard to fake.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {CLIPS.map(clip => (
              <div key={clip.id} className="rounded-2xl border border-white/[0.10] bg-white/[0.035] p-3">
                <div className="mb-3 rounded-xl border px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: ACCENT, borderColor: ACCENT_BORDER, background: ACCENT_BG }}>
                  {clip.label}
                </div>
                <div className="overflow-hidden rounded-xl border border-white/[0.06]">
                  <blockquote className="tiktok-embed" cite={`https://www.tiktok.com/@drgregshow/video/${clip.id}`} data-video-id={clip.id} style={{ maxWidth: '100%', minWidth: 0, width: '100%', margin: 0 }}>
                    <section><a target="_blank" rel="noopener noreferrer" href="https://www.tiktok.com/@drgregshow">@drgregshow</a></section>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
          <script async src="https://www.tiktok.com/embed.js" />
        </section>

        {/* WATCH — most popular on YouTube (dynamic, flagship featured) */}
        <section id="watch" className="border-y border-white/[0.06] bg-[#111116] py-14">
          <div className="mx-auto max-w-6xl px-6 sm:px-8">
            <div className="mb-8 max-w-2xl">
              <div className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Most Popular on YouTube</div>
              <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-white">See it for yourself.</h2>
              <p className="mt-3 text-[15px] leading-7 text-white/45">Debates, deep dives, and debunks — ranked by what people actually watch.</p>
              <a href="https://www.youtube.com/@DrGregShow?sub_confirmation=1" target="_blank" rel="noopener" className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-6 py-3 text-[14px] font-black text-white transition hover:bg-[#CC0000]">
                <FaYoutube className="h-5 w-5" /> Subscribe on YouTube
              </a>
            </div>

            {videos[0] && (
              <a href={watchUrl(videos[0].id)} target="_blank" rel="noopener" className="group relative mb-4 block overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0B0B0D] transition hover:border-white/20">
                <div className="relative aspect-video overflow-hidden sm:aspect-[21/9]">
                  <Image src={`https://img.youtube.com/vi/${videos[0].id}/maxresdefault.jpg`} alt={videos[0].title} fill sizes="(max-width: 640px) 100vw, 1152px" className="object-cover transition duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/25" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-black/50 backdrop-blur-sm transition group-hover:scale-110" style={{ boxShadow: `0 0 40px ${ACCENT_BG}` }}>
                      <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white"><path d="M8 5v14l11-7z" /></svg>
                    </span>
                  </div>
                  <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#FF0000] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white">
                    <FaYoutube className="h-3.5 w-3.5" /> Most Watched
                  </span>
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    {videos[0].views && videos[0].views !== 'Most-watched' && (
                      <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: ACCENT }}>{videos[0].views}</div>
                    )}
                    <h3 className="max-w-3xl text-[clamp(1.15rem,2.4vw,1.75rem)] font-black leading-tight text-white">{videos[0].title}</h3>
                  </div>
                </div>
              </a>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              {videos.slice(1).map(video => (
                <a key={video.id} href={watchUrl(video.id)} target="_blank" rel="noopener" className="group overflow-hidden rounded-2xl border border-white/[0.10] bg-[#0B0B0D] transition hover:-translate-y-1 hover:border-white/20">
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`} alt={video.title} fill sizes="(max-width: 640px) 100vw, 360px" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/25" />
                    {video.views && (
                      <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white">{video.views}</span>
                    )}
                  </div>
                  <h3 className="p-4 text-[13px] font-bold leading-5 text-white/82 group-hover:text-white">{video.title}</h3>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CONNECT — stacked header, dense 3-col grid (no mid-section void) */}
        <section id="connect" className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <div className="mb-8 max-w-2xl">
            <div className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Connect</div>
            <h2 className="mt-3 text-[clamp(1.7rem,3.4vw,2.6rem)] font-black leading-[1.02] tracking-[-0.035em] text-white">Find the show.</h2>
            <p className="mt-3 text-[15px] leading-7 text-white/45">The live audience is spread across platforms, but it all connects to one show.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SOCIALS.map(social => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-white/[0.10] bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl" style={{ background: `${social.color}22` }}>
                  <social.icon style={{ color: social.color }} className="h-[18px] w-[18px]" />
                </span>
                <span className="flex-1 text-[15px] font-extrabold text-white">{social.name}</span>
                <span className="text-[12px] font-semibold text-white/40">{getSocialLabel(social, liveStats)}</span>
              </a>
            ))}
          </div>
        </section>

        {/* BOOK CTA */}
        <section className="border-y border-white/[0.06] bg-[#111116] py-14">
          <div className="mx-auto grid max-w-6xl gap-4 px-6 sm:grid-cols-3 sm:px-8">
            <div className="rounded-3xl border border-white/[0.10] bg-white/[0.04] p-7 sm:col-span-2">
              <div className="text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color: ACCENT }}>Available For</div>
              <h2 className="mt-3 text-[clamp(1.7rem,3.2vw,2.5rem)] font-black leading-[1.0] tracking-[-0.035em] text-white">Book Dr. Greg.</h2>
              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-white/50">Podcasts. Keynotes. Live debates. Brand partnerships. Expert commentary. If it involves science and a camera, I&apos;m in.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['Podcasts', 'Keynotes', 'Debates', 'Brands', 'Media'].map(item => (
                  <span key={item} className="rounded-full border px-4 py-2 text-[13px] font-bold text-white/70" style={{ borderColor: ACCENT_BORDER, background: ACCENT_BG }}>{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/[0.10] bg-white/[0.04] p-7">
              <p className="text-[20px] font-black leading-snug text-white/85">&ldquo;Every night, someone comes on my show absolutely sure they know more than every scientist alive. Every night, we find out.&rdquo;</p>
              <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.16em] text-white/30">Dr. Greg Newkirk</p>
              <Link href="/book" className="mt-6 inline-block rounded-full px-7 py-3 text-[14px] font-black text-black" style={{ background: ACCENT }}>Book Now</Link>
            </div>
          </div>
        </section>

        {/* RESEARCH STATS */}
        <section className="mx-auto max-w-6xl px-6 py-14 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { stat: 'Ph.D.', label: 'Microbiology · UC Riverside' },
              { stat: '8', label: 'Peer-Reviewed Publications' },
              { stat: '1', label: 'U.S. Patent (2021)' },
              { stat: '2', label: 'NDSEG + NSF GRFP Fellowships' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl border border-white/[0.10] bg-white/[0.04] p-5">
                <div className="text-[28px] font-black" style={{ color: ACCENT }}>{item.stat}</div>
                <div className="mt-2 text-[13px] font-semibold leading-5 text-white/48">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link href="/research" className="rounded-full px-7 py-3 text-[14px] font-black text-black" style={{ background: ACCENT }}>Full Research Profile</Link>
            <a href="https://scholar.google.com/citations?user=sI--g3gAAAAJ&hl=en" target="_blank" rel="noopener" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/80">Google Scholar</a>
            <a href="https://escholarship.org/uc/item/5tv243dq" target="_blank" rel="noopener" className="rounded-full border border-white/15 px-7 py-3 text-[14px] font-bold text-white/80">Ph.D. Dissertation</a>
          </div>
        </section>

        {/* DONATE */}
        <section className="border-y border-white/[0.06] bg-[#111116] py-12">
          <div className="mx-auto flex max-w-6xl flex-col gap-5 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div>
              <h2 className="text-[22px] font-black text-white">Help keep the show running.</h2>
              <p className="mt-2 text-sm text-white/45">The Dr Greg Show is free, every night, for everyone. Your support makes that possible.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="https://www.patreon.com/DrGregShow" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 rounded-2xl border border-[#FF424D]/25 bg-[#FF424D]/10 px-6 py-3 text-[14px] font-black text-white">
                <FaPatreon className="h-5 w-5 text-[#FF424D]" /> Join on Patreon
              </a>
              <a href="https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01" target="_blank" rel="noopener" className="inline-flex items-center justify-center gap-3 rounded-2xl border px-6 py-3 text-[14px] font-black text-white" style={{ borderColor: ACCENT_BORDER, background: ACCENT_BG }}>
                <FaHeart className="h-5 w-5" style={{ color: ACCENT }} /> One-Time Donation
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span className="text-[12px] text-white/25">© 2026 The Dr Greg Show</span>
          <div className="flex items-center gap-6">
            <Link href="/research" className="text-[12px] text-white/35 transition hover:text-white/70">Research</Link>
            <Link href="/book" className="text-[12px] text-white/35 transition hover:text-white/70">Book</Link>
            {SOCIALS.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noopener" className="text-white/25 transition hover:text-white/60" aria-label={s.name}>
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
