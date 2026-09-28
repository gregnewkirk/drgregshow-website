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

        <div className="formats">
          {site.bookingFormats.map((f) => (
            <div className="card" key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="stats" style={{ marginTop: 20 }}>
          {site.metrics.map((m) => (
            <div className="stat" key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </div>
          ))}
        </div>
        <p className="small" style={{ marginTop: 8 }}>Source: {site.metrics[0]?.source}.</p>

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

        <p className="small" style={{ marginTop: 20 }}>
          For the full debate and guest record, see <Link href="/events">events</Link>.
        </p>

        <h2 style={{ margin: "36px 0 16px" }}>Send a booking request</h2>
        <div>
          <BookingForm formatTitles={formatTitles} />
        </div>
      </div>
    </section>
  );
}
