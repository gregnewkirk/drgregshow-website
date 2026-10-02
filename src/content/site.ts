import type {
  Links,
  Images,
  Metric,
  Question,
  Receipt,
  Event,
  BookingFormat,
  PopularSection,
  ScheduleItem,
  Featured,
  Game,
} from "./types";

// Ported from mockup/content.js. Excludes dataset, topics, perStream and question.streams,
// which are generated in Task 2. taylor has no question pointing at it yet; a later task
// renders it as a second receipt on the vaccines-autism question.
//
// Annotated separately (rather than inline in `site`) so each entry widens to the full
// Receipt shape; inline object literals under `satisfies` keep their narrower per-key
// inferred type, which drops the optional `doi`/`url` fields that individual entries omit.
const receipts: Record<string, Receipt> = {
  hviid: {
    cite: "Hviid A, Hansen JV, Frisch M, Melbye M. Measles, Mumps, Rubella Vaccination and Autism: A Nationwide Cohort Study. Ann Intern Med. 2019;170(8):513-520.",
    doi: "10.7326/M18-2101",
    pmid: "30831578",
    figure: {
      type: "forest",
      axis: "Autism hazard ratio",
      rows: [{ label: "MMR vs none", e: 0.93, l: 0.85, u: 1.02 }],
    },
    moment: { video: "Kf2RPYrcJaQ", t: 7321 },
  },
  taylor: {
    cite: "Taylor LE, Swerdfeger AL, Eslick GD. Vaccines are not associated with autism: an evidence-based meta-analysis of case-control and cohort studies. Vaccine. 2014;32(29):3623-9.",
    doi: "10.1016/j.vaccine.2014.04.085",
    pmid: "24814559",
    figure: {
      type: "forest",
      axis: "Odds ratio, cohort data",
      rows: [
        { label: "All vaccines", e: 0.99, l: 0.92, u: 1.06 },
        { label: "Thimerosal", e: 1.0, l: 0.77, u: 1.31 },
        { label: "Mercury", e: 1.0, l: 0.93, u: 1.07 },
      ],
    },
  },
  blount: {
    cite: "Blount ZD, Borland CZ, Lenski RE. Historical contingency and the evolution of a key innovation in an experimental population of Escherichia coli. PNAS. 2008;105(23):7899-906.",
    doi: "10.1073/pnas.0803151105",
    pmid: "18524956",
    figure: {
      type: "timeline",
      events: [
        { g: 0, label: "12 populations founded, 1988" },
        { g: 20000, label: "Potentiating mutation by ~20k" },
        { g: 31500, label: "Citrate use evolves ~31.5k", key: true },
      ],
      max: 33000,
      axis: "Generations",
    },
    moment: { video: "pdzkCwy46zo", t: 2502 },
  },
  polack: {
    cite: "Polack FP, et al. Safety and Efficacy of the BNT162b2 mRNA Covid-19 Vaccine. N Engl J Med. 2020;383:2603-2615.",
    doi: "10.1056/NEJMoa2034577",
    pmid: "33301246",
    figure: {
      type: "bars",
      axis: "COVID-19 cases, 7+ days after dose 2",
      rows: [
        { label: "Placebo", v: 162 },
        { label: "Vaccine", v: 8, key: true },
      ],
    },
  },
  worobey: {
    cite: "Worobey M, et al. The Huanan Seafood Wholesale Market in Wuhan was the early epicenter of the COVID-19 pandemic. Science. 2022;377:951-959.",
    doi: "10.1126/science.abp8715",
    pmid: "35881010",
    figure: null,
  },
  zhu: {
    cite: "Zhu N, et al. A Novel Coronavirus from Patients with Pneumonia in China, 2019. N Engl J Med. 2020;382:727-733.",
    doi: "10.1056/NEJMoa2001017",
    pmid: "31978945",
    figure: null,
  },
  ipcc: {
    cite: "IPCC, 2021: Summary for Policymakers. In: Climate Change 2021: The Physical Science Basis. Working Group I contribution to the Sixth Assessment Report.",
    url: "https://www.ipcc.ch/report/ar6/wg1/chapter/summary-for-policymakers/",
    quote: "It is unequivocal that human influence has warmed the atmosphere, ocean and land",
    figure: null,
  },
};

export const site = {
  links: {
    subscribe: "https://www.youtube.com/@DrGregShow?sub_confirmation=1",
    youtube: "https://www.youtube.com/@DrGregShow",
    tiktok: "https://www.tiktok.com/@drgregshow",
    instagram: "https://www.instagram.com/drgregshow",
    patreon: "https://www.patreon.com/DrGregShow",
    stripe: "https://buy.stripe.com/7sYeVd0CWcwp0Vb4Hu6Ri01",
    venmo: "https://venmo.com/drgregshow",
    paypal: "https://paypal.biz/drgregshow",
    cashapp: "https://cash.app/$fakegreg",
    merch: "https://drgregshow-shop.fourthwall.com",
    twitch: "https://www.twitch.tv/drgregshow",
    safe: "https://scienceandfreedom.com",
    tiktokBackup: "https://www.tiktok.com/@drgregshow1",
    facebook: "https://www.facebook.com/profile.php?id=61582489461029",
    publications: "https://paperpile.com/shared/Newkirk-Publications-tUTY9rHQySBiS1BQ97grKCg",
    email: "mailto:contact@drgreg.show",
    substack: "https://drgregshow.substack.com",
    discord: "https://discord.gg/RXFpEmZMJU",
    mediaKit: "/media/DrGreg_Media_Kit_2026-09.pdf",
  },
  // /support tip tiers. Each needs its own Stripe Payment Link; a tier with an empty href is hidden.
  tips: [
    { label: "Pipette tips", amount: 3, href: "" },
    { label: "Box of gloves", amount: 10, href: "" },
    { label: "Reagent kit", amount: 25, href: "" },
  ],
  // /support goal bar, updated by hand. null hides it.
  goal: null as null | { title: string; target: number; raised: number; updated: string },
  images: {
    portrait: "/images/headshot-portrait.jpg",
    banner: "/images/headshot-banner.jpg",
    commercial: "/images/headshot-commercial.jpg",
    square: "/images/headshot-commercial-sq.jpg",
    liveshot: "/images/liveshot.png",
  },
  metrics: [
    { value: "35K+", label: "Followers", source: "Media kit, Sept 2026" },
    { value: "6M+", label: "Views", source: "Media kit, Sept 2026" },
    { value: "1,000+", label: "Hours live", source: "Media kit, Sept 2026" },
    { value: "500+", label: "Live debates", source: "Media kit, Sept 2026" },
  ],
  questions: [
    {
      slug: "mrna-safety",
      q: "Are mRNA vaccines safe?",
      topic: "vaccines",
      answer:
        "In the 43,548-person Pfizer trial, side effects were short-term and mild to moderate: sore arm, fatigue, headache. Serious adverse events were low and similar in the vaccine and placebo groups.",
      receipt: "polack",
      search: "mrna",
    },
    {
      slug: "climate-real",
      q: "Is climate change real?",
      topic: "climate",
      answer: "Yes. The IPCC's 2021 assessment calls human-caused warming unequivocal.",
      receipt: "ipcc",
      search: "climate change",
    },
    {
      slug: "covid-lab",
      q: "Did COVID come from a lab?",
      topic: "covid-origins",
      answer:
        "The earliest known cases clustered around the Huanan market, and virus-positive samples tracked with stalls selling live mammals. The authors say the upstream events remain unknown. The debate is live on the show.",
      receipt: "worobey",
      search: "lab leak",
    },
    {
      slug: "vaccines-autism",
      q: "Do vaccines cause autism?",
      topic: "vaccines",
      answer: "No. 657,461 Danish children, and a meta-analysis of more than 1.2 million more, found no link.",
      receipt: "hviid",
      search: "autism",
    },
    {
      slug: "fluoride",
      q: "Is fluoride dangerous?",
      topic: "germ-terrain",
      answer: "Receipt in review. Dose matters here, so this one needs a careful write-up before it goes on the site.",
      receipt: null,
      search: "fluoride",
    },
    {
      slug: "raw-milk",
      q: "Is raw milk healthier?",
      topic: "germ-terrain",
      answer: "Receipt in review.",
      receipt: null,
      search: "raw milk",
    },
    {
      slug: "viruses-exist",
      q: "Do viruses exist?",
      topic: "germ-terrain",
      answer: "Yes. SARS-CoV-2 was isolated in human airway cells, sequenced, and imaged in January 2020.",
      receipt: "zhu",
      search: "virus",
    },
    {
      slug: "new-information",
      q: "Can mutations add new information?",
      topic: "evolution",
      answer:
        "Yes. One E. coli population evolved the ability to use citrate, which its ancestors could not do, after about 31,500 generations.",
      receipt: "blount",
      search: "new information",
    },
  ],
  receipts,
  featured: {
    video: "pdzkCwy46zo",
    title: "Kent Hovind Challenged a Real Scientist: Full Debate",
    claim: {
      text: "You can't show me one example where a bacteria has gained new information.",
      video: "5iR7LzGCnoo",
      t: 3890,
      note: "Line from a 6-hour stream. Speaker not attributed: auto-captions do not identify speakers.",
    },
    answer: { video: "pdzkCwy46zo", t: 2502, receipt: "blount" },
  },
  schedule: [
    { when: "Nightly", what: "The Dr Greg Show: open debate and live callers", tag: "9 PM PT" },
    { when: "Jan 2027", what: "Kent Hovind, in-person debate", tag: "Upcoming" },
  ],
  credentials: [
    "Ph.D., Microbiology, UC Riverside",
    "Papers in Nature Nanotechnology and ACS Nano",
    "U.S. Patent US11186845B1",
    "NDSEG Fellow, Dept. of Defense",
    "Bench science at BASF and Cibus",
  ],
  events: [
    {
      title: "Big Homie CC vs 10, panelist",
      where: "Digital Social Hour",
      date: "2026-09-29",
      when: "Sept 29, 2026",
      status: "upcoming",
    },
    {
      title: "Kent Hovind, in-person debate",
      where: "Digital Social Hour",
      date: "2027-01",
      when: "Jan 2027",
      status: "upcoming",
    },
    {
      title: "Alex Stein vs 10 Skeptics, evolution round",
      where: "Digital Social Hour",
      date: "2026-09",
      when: "Sept 2026",
      status: "past",
      url: "https://www.youtube.com/watch?v=ogT2ATaeLbE&t=9287s",
      note: "My segment starts at 2:34:47. Digital Social Hour has 1.2M+ YouTube subscribers.",
    },
    {
      title: "Skeptics in the Pub Online, invited talk",
      where: "Skeptics in the Pub Online",
      date: "2026-08-27",
      when: "Aug 27, 2026",
      status: "past",
    },
    {
      title: "2v2: Adam and Eve vs. evolution, vs. Standing For Truth (Donny Budinsky)",
      where: "Modern-Day Debate",
      date: "2026-08-11",
      when: "Aug 11, 2026",
      status: "past",
      url: "https://www.youtube.com/watch?v=8FCbPhlGaYw",
    },
    {
      title: "Kent Hovind, creation vs. evolution",
      where: "Modern-Day Debate",
      date: "2026-03",
      when: "Mar 2026",
      status: "past",
      url: "https://www.youtube.com/watch?v=EW4_KcJ-9Ak",
    },
    {
      title: "Evolution on Trial, vs. MadebyJimbob",
      where: "Modern-Day Debate",
      date: "2026-01",
      when: "Jan 2026",
      status: "past",
      url: "https://www.youtube.com/watch?v=hhq85EhaHIw",
    },
    {
      title: "Skeptics and Seekers, podcast guest",
      where: "Skeptics and Seekers",
      date: "",
      when: "",
      status: "past",
    },
  ],
  bookingFormats: [
    {
      title: "Podcast guest",
      desc: "In-studio or remote. 30 to 90 minute format. Brings real credentials and real stories.",
    },
    {
      title: "Keynote speaking",
      desc: "Conferences, universities, corporate events. Science communication, misinformation, civic engagement.",
    },
    { title: "Live debate", desc: "Any science topic. Any format. 500+ live debates and counting." },
    {
      title: "Brand spokesperson",
      desc: "Pharma, biotech, health, education. Scientific authority with proven audience trust.",
    },
    { title: "Commercial and on-camera", desc: "Spokesperson, host, presenter, expert. Studio ready." },
    { title: "Science consulting", desc: "Film, TV, and media accuracy. Getting the science right, and making it interesting." },
  ],
  popular: {
    asOf: "Sept 28, 2026",
    source: "YouTube view counts via vidIQ",
    videos: [
      { id: "pdzkCwy46zo", title: "Kent Hovind Challenged a Real Scientist: Full Debate", views: 113915 },
      { id: "zhS6iWSwMBI", title: "Young-Earth Creationists vs. ACTUAL Scientific Evidence", views: 2647 },
      { id: "SgT5lj4Z6yA", title: "Two Creationists Challenged Us on Human Evolution", views: 2479 },
      { id: "k2D8VMJFg-U", title: "A Climate Skeptic Asked for Evidence. We Went Through It.", views: 1537 },
      { id: "gyZ1g5thSKA", title: "I Confronted Alex Stein About Evolution. Here's What Happened.", views: 1456 },
      { id: "Uw53ZEDVutE", title: "8 Anti-Vaxxers Challenged a Real Scientist: Full Debate", views: 878 },
    ],
  },
  games: [
    {
      title: "SimEcon",
      url: "https://simecon.app",
      blurb:
        "Pull the levers on taxes and programs and watch the impact on the US deficit, debt, and who pays. Every number is sourced to CBO, JCT, OMB, and Treasury.",
      image: "/images/games/simecon.png",
    },
    {
      title: "SimEcon: San Diego",
      url: "https://simecon.app/san-diego",
      blurb:
        "Run the City of San Diego's General Fund: police staffing, pensions, reserves, and the decisions history got wrong. Calibrated to the FY2026 Adopted Budget, IBA reports, and SDCERS valuations.",
      image: "/images/games/simecon-san-diego.png",
    },
    {
      title: "The Gap",
      url: "https://simecon.app/gap",
      blurb: "A game about numbers you can't feel.",
      image: "/images/games/the-gap.png",
    },
    {
      title: "The Class Wargame",
      url: "https://theclasswargame.com",
      blurb: "Click. Grind. Survive. Meanwhile, they don't have to. All dollar amounts are real. All data is sourced.",
      image: "/images/games/class-wargame.png",
    },
  ],
} satisfies {
  links: Links;
  images: Images;
  metrics: Metric[];
  questions: Question[];
  receipts: Record<string, Receipt>;
  featured: Featured;
  schedule: ScheduleItem[];
  credentials: string[];
  events: Event[];
  bookingFormats: BookingFormat[];
  popular: PopularSection;
  games: Game[];
  tips: { label: string; amount: number; href: string }[];
  goal: null | { title: string; target: number; raised: number; updated: string };
};
