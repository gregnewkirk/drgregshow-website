import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { questions, site } from "@/content";
import { ReceiptBlock } from "@/components/figures/Receipt";
import Player, { SeekButton } from "@/components/show/Player";

type Params = { slug: string };

export function generateStaticParams() {
  return questions.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const q = questions.find((x) => x.slug === slug);
  return { title: q ? q.q : "Question not found" };
}

// Generalizes the mockup's pageHovind(). For every question: the question as H1, the answer,
// and its receipt. slug === "new-information" is the one reachable path to the Hovind-adjacent
// claim/answer widget (via site.featured); featured.video and featured.title are never read
// here or anywhere else, so "Hovind" never renders on this route.
export default async function QuestionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const q = questions.find((x) => x.slug === slug);
  if (!q) {
    notFound();
  }

  const receipt = q.receipt ? site.receipts[q.receipt] : null;

  if (slug === "new-information") {
    const { claim, answer } = site.featured;
    const answerKey = answer.receipt;
    const answerReceipt = site.receipts[answerKey] ?? receipt;

    return (
      <section className="page-head">
        <div className="wrap">
          <Link className="back" href="/questions">
            Back to all questions
          </Link>
          <h1>{q.q}</h1>
          <p className="lede">A claim I hear on stream, and the experiment that answers it.</p>
          <div className="feat" style={{ marginTop: 22 }}>
            <div>
              <Player videoId={answer.video} start={answer.t} label="my answer" />
              <div className="tsb" style={{ marginTop: 12 }}>
                <SeekButton video={claim.video} t={claim.t} label="Play the claim" />
                <SeekButton video={answer.video} t={answer.t} label="Play my answer" />
              </div>
              <p className="small" style={{ marginTop: 8 }}>
                The claim and the answer are in two different recordings. Each button loads that video at the
                timestamp.
              </p>
            </div>
            <div className="fig">
              <div className="panel-head">
                <span className="panel-l">A</span>
                <h3>The claim</h3>
              </div>
              <p className="claim">&quot;{claim.text}&quot;</p>
              <p className="small" style={{ marginTop: 8 }}>
                {claim.note}
              </p>
              <div className="panel-head" style={{ marginTop: 22 }}>
                <span className="panel-l">B</span>
                <h3>The answer</h3>
              </div>
              <p className="ans" style={{ font: "18px/1.5 var(--serif)" }}>
                {q.answer}
              </p>
              {answerReceipt && (
                <div style={{ marginTop: 12 }}>
                  <ReceiptBlock id={`fig-${answerKey}`} receipt={answerReceipt} showMoment={false} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-head">
      <div className="wrap">
        <Link className="back" href="/questions">
          Back to all questions
        </Link>
        <h1>{q.q}</h1>
        <p className="ans" style={{ marginTop: 16 }}>
          {q.answer}
        </p>
        {receipt ? (
          <div className="fig" style={{ marginTop: 22, padding: 20 }}>
            <div className="panel-head">
              <span className="panel-l">R</span>
              <h3>Receipt</h3>
            </div>
            <ReceiptBlock id="receipt" receipt={receipt} showMoment={false} />
          </div>
        ) : (
          <p style={{ marginTop: 16 }}>
            <span className="review">Receipt in review</span>
          </p>
        )}
        {receipt?.moment && (
          <div style={{ marginTop: 22, maxWidth: 640 }}>
            <Player videoId={receipt.moment.video} start={receipt.moment.t} label="the moment" />
          </div>
        )}
      </div>
    </section>
  );
}
