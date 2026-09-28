"use client";

import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_ID = "xwvrknog";
const PLATFORMS = ["YouTube", "TikTok", "Instagram", "X", "Other"];

type Props = {
  topics: { slug: string; name: string }[];
};

export default function ChallengeForm({ topics }: Props) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);

  if (state.succeeded) {
    return (
      <div className="done" role="status" tabIndex={-1}>
        <h3>Challenge sent. I read every one.</h3>
      </div>
    );
  }

  return (
    <form className="f card" style={{ padding: 24 }} onSubmit={handleSubmit} noValidate>
      <input type="hidden" name="_subject" value="Show challenge" />

      <div className="fr">
        <div className="fg">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" required autoComplete="name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="small" />
        </div>
        <div className="fg">
          <label htmlFor="c-handle">Handle</label>
          <input id="c-handle" name="handle" required placeholder="@yourname" />
        </div>
      </div>

      <div className="fr">
        <div className="fg">
          <label htmlFor="c-plat">Platform</label>
          <select id="c-plat" name="platform" required defaultValue="">
            <option value="">Choose one</option>
            {PLATFORMS.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
        <div className="fg">
          <label htmlFor="c-topic">Topic</label>
          <select id="c-topic" name="topic" required defaultValue="">
            <option value="">Choose one</option>
            {topics.map((t) => (
              <option key={t.slug} value={t.name}>
                {t.name}
              </option>
            ))}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className="fg">
        <label htmlFor="c-claim">The claim you will defend</label>
        <textarea id="c-claim" name="claim" required />
        <ValidationError prefix="Claim" field="claim" errors={state.errors} className="small" />
      </div>

      <div className="fg">
        <label htmlFor="c-ev">Best evidence link</label>
        <input id="c-ev" name="evidence" type="url" placeholder="https://" required />
        <span className="hint">A paper, dataset or report works best.</span>
      </div>

      <div className="fg">
        <label htmlFor="c-av">Availability</label>
        <input id="c-av" name="availability" placeholder="Weeknights after 9 PM Pacific" required />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="c-web">Leave this empty</label>
        <input id="c-web" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <ValidationError errors={state.errors} className="small" />

      <div>
        <button className="btn primary" type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending…" : "Send challenge"}
        </button>
      </div>
    </form>
  );
}
