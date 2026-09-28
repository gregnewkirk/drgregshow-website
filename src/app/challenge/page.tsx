import type { Metadata } from "next";
import { topTopics } from "@/lib/topics";
import ChallengeForm from "@/components/forms/ChallengeForm";

export const metadata: Metadata = {
  title: "Challenge me",
};

export default function ChallengePage() {
  const topics = topTopics(8).map((t) => ({ slug: t.slug, name: t.name }));

  return (
    <section className="page-head">
      <div className="wrap">
        <h1>Think you can win?</h1>
        <p className="lede" style={{ marginBottom: 24 }}>
          Tell me the claim you will defend and the best evidence you have. I read every one. Strong challenges get
          booked on the live show.
        </p>
        <div>
          <ChallengeForm topics={topics} />
        </div>
      </div>
    </section>
  );
}
