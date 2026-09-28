"use client";

import { useForm, ValidationError } from "@formspree/react";

const FORMSPREE_ID = "xwvrknog";

const INQUIRY_TYPES = [
  "Podcast Guest Appearance",
  "Keynote Speaking",
  "Live Debate",
  "Brand Spokesperson / Partnership",
  "Commercial / On-Camera Work",
  "Science Consulting (Film / TV / Media)",
  "Expert Commentary / Panel",
  "Corporate Science Communication",
  "Other",
];

type Props = {
  formatTitles: string[];
};

export default function BookingForm({ formatTitles }: Props) {
  const [state, handleSubmit] = useForm(FORMSPREE_ID);
  const types = formatTitles.length ? formatTitles : INQUIRY_TYPES;

  if (state.succeeded) {
    return (
      <div className="done" role="status" tabIndex={-1}>
        <h3>Inquiry received.</h3>
        <p style={{ marginTop: 6 }}>I reply within 2 business days.</p>
      </div>
    );
  }

  return (
    <form className="f card" style={{ padding: 24 }} onSubmit={handleSubmit} noValidate>
      <div className="fr">
        <div className="fg">
          <label htmlFor="b-name">Name</label>
          <input id="b-name" name="name" required autoComplete="name" />
          <ValidationError prefix="Name" field="name" errors={state.errors} className="small" />
        </div>
        <div className="fg">
          <label htmlFor="b-org">Organization or show</label>
          <input id="b-org" name="org" required />
        </div>
      </div>

      <div className="fr">
        <div className="fg">
          <label htmlFor="b-email">Email</label>
          <input id="b-email" name="email" type="email" required autoComplete="email" />
          <ValidationError prefix="Email" field="email" errors={state.errors} className="small" />
        </div>
        <div className="fg">
          <label htmlFor="b-type">Type of inquiry</label>
          <select id="b-type" name="type" required defaultValue="">
            <option value="">Choose one</option>
            {types.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="fr">
        <div className="fg">
          <label htmlFor="b-budget">
            Budget range <span className="hint">(optional)</span>
          </label>
          <input id="b-budget" name="budget" placeholder="e.g. $5,000 to $10,000" />
        </div>
        <div className="fg">
          <label htmlFor="b-dates">Proposed date(s)</label>
          <input id="b-dates" name="dates" placeholder="e.g. May 2026, flexible" />
        </div>
      </div>

      <div className="fg">
        <label htmlFor="b-msg">Tell me about the opportunity</label>
        <textarea id="b-msg" name="message" required />
        <ValidationError prefix="Message" field="message" errors={state.errors} className="small" />
      </div>

      <div className="hp" aria-hidden="true">
        <label htmlFor="b-web">Leave this empty</label>
        <input id="b-web" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <ValidationError errors={state.errors} className="small" />

      <div>
        <button className="btn primary" type="submit" disabled={state.submitting}>
          {state.submitting ? "Sending…" : "Send booking inquiry"}
        </button>
      </div>
    </form>
  );
}
