import type { Metadata } from "next";
import Link from "next/link";

const SCHOLAR_URL = "https://scholar.google.com/citations?user=sI--g3gAAAAJ&hl=en";
const THESIS_URL = "https://escholarship.org/uc/item/5tv243dq";
const THESIS_PDF = "/Newkirk_Dissertation_2023.pdf";

const EDUCATION = [
  {
    degree: "Ph.D., Microbiology",
    school: "University of California, Riverside",
    detail: "Department of Microbiology and Plant Pathology, Giraldo Laboratory",
    year: "2023",
  },
  {
    degree: "B.Sc., Biology",
    school: "University of California, San Diego",
    detail: "Evolution, Ecology, and Behavior",
    year: "2012",
  },
];

const HONORS = [
  {
    year: "2019",
    name: "NDSEG Fellowship",
    detail:
      "National Defense Science and Engineering Graduate Fellowship: three years of full funding from the U.S. Department of Defense. Awarded to roughly 4% of applicants in the natural sciences, mathematics, and engineering.",
  },
  {
    year: "2019",
    name: "NSF GRFP",
    detail:
      "National Science Foundation Graduate Research Fellowship, awarded, declined in favor of NDSEG. Cannot accept both; the NSF GRFP carries comparable selectivity and prestige.",
  },
  {
    year: "2019",
    name: "Sigma Xi",
    detail:
      "Associate Member of the international scientific research honor society. Founded at Cornell in 1886, invitation-only on the basis of demonstrated research aptitude. Past members include more than 200 Nobel laureates (Einstein, Fermi, Pauling, Watson, Crick).",
  },
  {
    year: "2018",
    name: "Best Poster",
    detail:
      'Center for Plant Cell Biology Postdoc Symposium, UC Riverside: "Biopharmaceutical production through microalgae photobioreactors mediated by nanomaterial delivery of chloroplast genetic elements."',
  },
];

const PATENT = {
  number: "US 11,186,845 B1",
  year: "2021",
  title:
    "Compositions comprising a nanoparticle, a molecular basket comprising cyclodextrin, and a chloroplast-targeting peptide and methods of use thereof",
  url: "https://patents.google.com/patent/US11186845B1",
};

type Pub = {
  authors: string;
  title: string;
  venue: string;
  year: string;
  doi?: string;
  url?: string;
  pdf?: string;
  firstAuthor?: boolean;
};

const PUBLICATIONS: Pub[] = [
  {
    authors: "Newkirk GM, Jeon S-J, Kim H-i, Sivaraj S, de Allende P, Castillo C, Jinkerson RE, Giraldo JP.",
    title: "DNA delivery by high aspect ratio nanomaterials to algal chloroplasts.",
    venue: "Environmental Science: Nano",
    year: "2023",
    doi: "10.1039/D3EN00268C",
    pdf: "/papers/Newkirk_2023_DNA_delivery_chloroplasts.pdf",
    firstAuthor: true,
  },
  {
    authors: "Santana I, Jeon S-J, Kim H-I, Islam MR, Castillo C, Garcia GFH, Newkirk GM, Giraldo JP.",
    title: "Targeted Carbon Nanostructures for Chemical and Gene Delivery to Plant Chloroplasts.",
    venue: "ACS Nano",
    year: "2022",
    doi: "10.1021/acsnano.2c02714",
  },
  {
    authors: "Newkirk GM, de Allende P, Jinkerson RE, Giraldo JP.",
    title: "Nanotechnology Approaches for Chloroplast Biotechnology Advancements.",
    venue: "Frontiers in Plant Science",
    year: "2021",
    doi: "10.3389/fpls.2021.691295",
    pdf: "/papers/Newkirk_2021_Frontiers_Chloroplast_Nanotechnology.pdf",
    firstAuthor: true,
  },
  {
    authors: "Wang JW, Grandio EG, Newkirk GM, Demirer GS, Butrus S, Giraldo JP, Landry MP.",
    title: "Nanoparticle mediated genetic engineering of plants.",
    venue: "Molecular Plant",
    year: "2019",
    doi: "10.1016/j.molp.2019.06.010",
  },
  {
    authors: "Giraldo JP, Wu H, Newkirk GM, Kruss S.",
    title: "Nanobiotechnology approaches for engineering smart plant sensors.",
    venue: "Nature Nanotechnology",
    year: "2019",
    doi: "10.1038/s41565-019-0470-6",
    pdf: "/papers/Newkirk_2019_NatureNanotechnology_SmartPlantSensors.pdf",
  },
  {
    authors: "Newkirk GM, Wu H, Santana I, Giraldo JP.",
    title: "Catalytic Scavenging of Plant Reactive Oxygen Species In Vivo by Anionic Cerium Oxide Nanoparticles.",
    venue: "Journal of Visualized Experiments",
    year: "2018",
    doi: "10.3791/58373",
    firstAuthor: true,
  },
  {
    authors: "Newkirk GM.",
    title:
      "A 2018 Ballot Measure Analysis for Voters: The CA Water Bond and its Impact on Scientific Research from a Biology Perspective.",
    venue: "Journal of Science Policy and Governance",
    year: "2018",
    firstAuthor: true,
  },
  {
    authors: "Tran M, Henry RE, Siefker D, Van C, Newkirk GM, Kim J, Bui J, Mayfield SP.",
    title: "Production of anti-cancer immunotoxins in algae: ribosome inactivating proteins as fusion partners.",
    venue: "Biotechnology and Bioengineering",
    year: "2013",
    doi: "10.1002/bit.24966",
  },
];

const THESIS = {
  title: "Nanotechnology Approaches for Arabidopsis and Chlamydomonas Chloroplast Bioengineering",
  degree: "Ph.D. Dissertation, Microbiology",
  school: "University of California, Riverside",
  date: "September 2023",
  committee: "Dr. Juan Pablo Giraldo (Chair), Dr. Robert Jinkerson, Dr. Ian Wheeldon",
};

export const metadata: Metadata = {
  title: "Research and credentials",
  description:
    "Peer-reviewed publications, U.S. patent, NDSEG Fellowship, and Ph.D. dissertation from Dr. Gregory M. Newkirk, molecular biologist, UC Riverside.",
  openGraph: {
    title: "Research and credentials | Dr. Greg Newkirk",
    description: "Peer-reviewed publications, U.S. patent, and Ph.D. dissertation from Dr. Gregory M. Newkirk.",
    url: "https://drgregshow.com/research",
    siteName: "The Dr Greg Show",
    type: "profile",
  },
};

function pubLink(p: Pub): string | undefined {
  if (p.doi) return `https://doi.org/${p.doi}`;
  return p.url;
}

export default function ResearchPage() {
  const firstAuthorCount = PUBLICATIONS.filter((p) => p.firstAuthor).length;

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>17 years at the bench. The receipts.</h1>
        <p className="lede">
          Peer-reviewed publications, a U.S. patent, the NDSEG and NSF GRFP fellowships, and a Ph.D. dissertation.
          Everything below is verifiable.
        </p>
        <div className="row" style={{ marginTop: 18 }}>
          <a className="btn primary" href={SCHOLAR_URL} target="_blank" rel="noopener">
            Google Scholar
          </a>
          <a className="btn ghost" href={THESIS_URL} target="_blank" rel="noopener">
            Dissertation
          </a>
        </div>

        <div className="stats" style={{ marginTop: 28 }}>
          <div className="stat"><b>{PUBLICATIONS.length}</b><span>Peer-reviewed publications</span></div>
          <div className="stat"><b>{firstAuthorCount}</b><span>First author</span></div>
          <div className="stat"><b>1</b><span>U.S. patent</span></div>
          <div className="stat"><b>17</b><span>Years in science</span></div>
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Education</h2>
        <div className="formats">
          {EDUCATION.map((e) => (
            <div className="card" style={{ padding: 20 }} key={e.degree}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h3>{e.degree}</h3>
                <span className="small">{e.year}</span>
              </div>
              <p>{e.school}</p>
              <p className="small">{e.detail}</p>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Dissertation</h2>
        <div className="card" style={{ padding: 24, maxWidth: 780 }}>
          <h3>
            Nanotechnology Approaches for <em>Arabidopsis</em> and <em>Chlamydomonas</em> Chloroplast Bioengineering
          </h3>
          <p style={{ marginTop: 8 }}>{THESIS.degree}, {THESIS.school}</p>
          <p className="small" style={{ marginTop: 4 }}>{THESIS.date}</p>
          <p className="small">Committee: {THESIS.committee}</p>
          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn primary" href={THESIS_URL} target="_blank" rel="noopener">View on eScholarship</a>
            <a className="btn ghost" href={THESIS_PDF} target="_blank" rel="noopener">Download PDF</a>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>U.S. patent, granted 2021</h2>
        <div className="card" style={{ padding: 24, maxWidth: 780 }}>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <span className="small" style={{ fontFamily: "monospace" }}>{PATENT.number}</span>
            <span className="small">Issued {PATENT.year}</span>
          </div>
          <p style={{ marginTop: 10 }}>&ldquo;{PATENT.title}&rdquo;</p>
          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn ghost" href={PATENT.url} target="_blank" rel="noopener">View on Google Patents</a>
          </div>
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Honors and fellowships</h2>
        <div style={{ display: "grid", gap: 12, maxWidth: 780 }}>
          {HONORS.map((h) => (
            <div className="card" style={{ padding: 16 }} key={h.name}>
              <div className="row" style={{ justifyContent: "space-between" }}>
                <h3>{h.name}</h3>
                <span className="small">{h.year}</span>
              </div>
              <p className="small" style={{ marginTop: 4 }}>{h.detail}</p>
            </div>
          ))}
        </div>

        <h2 style={{ margin: "36px 0 14px" }}>Peer-reviewed publications</h2>
        <p className="small" style={{ marginBottom: 16 }}>
          Published across Nature Nanotechnology, ACS Nano, Molecular Plant, and others. First-author papers marked
          with a dot.
        </p>
        <ol style={{ display: "grid", gap: 12, listStyle: "none", margin: 0, padding: 0 }}>
          {PUBLICATIONS.map((p) => {
            const link = pubLink(p);
            return (
              <li className="card" style={{ padding: 16 }} key={p.title}>
                <div>
                  {p.firstAuthor && <span aria-label="First author">&bull; </span>}
                  {link ? (
                    <a href={link} target="_blank" rel="noopener">
                      {p.title}
                    </a>
                  ) : (
                    <strong>{p.title}</strong>
                  )}
                </div>
                <div className="small" style={{ marginTop: 6 }}>{p.authors}</div>
                <div className="small" style={{ marginTop: 6 }}>
                  <em>{p.venue}</em> &middot; {p.year}
                  {p.doi && (
                    <>
                      {" "}&middot;{" "}
                      <a href={`https://doi.org/${p.doi}`} target="_blank" rel="noopener">
                        doi:{p.doi}
                      </a>
                    </>
                  )}
                  {p.pdf && (
                    <>
                      {" "}&middot;{" "}
                      <a href={p.pdf} target="_blank" rel="noopener">PDF</a>
                    </>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="row" style={{ marginTop: 20, justifyContent: "center" }}>
          <a className="btn primary" href={SCHOLAR_URL} target="_blank" rel="noopener">
            Full list on Google Scholar
          </a>
        </div>

        <div className="row" style={{ marginTop: 40, justifyContent: "center" }}>
          <Link className="btn primary" href="/">Back to the show</Link>
          <Link className="btn ghost" href="/book">Book Dr. Greg</Link>
        </div>
      </div>
    </section>
  );
}
