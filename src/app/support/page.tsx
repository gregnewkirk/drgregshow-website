import type { Metadata } from "next";
import { site } from "@/content";

export const metadata: Metadata = {
  title: "Support the show",
};

export default function SupportPage() {
  return (
    <section className="page-head">
      <div className="wrap" style={{ maxWidth: 820 }}>
        <h1>Support the show</h1>
        <p className="lede" style={{ marginTop: 12 }}>
          The show is free, every night, and your support is what keeps it that way.
        </p>
        <div className="two" style={{ marginTop: 26 }}>
          <div className="card" style={{ padding: 24, display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: 24 }}>Monthly</h2>
            <p className="small">Patreon membership.</p>
            <div>
              <a className="btn primary" href={site.links.patreon} target="_blank" rel="noopener">
                Support on Patreon
              </a>
            </div>
          </div>
          <div className="card" style={{ padding: 24, display: "grid", gap: 12 }}>
            <h2 style={{ fontSize: 24 }}>One time</h2>
            <p className="small">Use whichever app you already have.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { label: "Venmo", href: site.links.venmo },
                { label: "PayPal", href: site.links.paypal },
                { label: "Cash App", href: site.links.cashapp },
                { label: "Card (Stripe)", href: site.links.stripe },
              ]
                .filter((l) => l.href)
                .map((l) => (
                  <a key={l.label} className="btn ghost" href={l.href} target="_blank" rel="noopener">
                    {l.label}
                  </a>
                ))}
            </div>
          </div>
        </div>
        <p className="small" style={{ marginTop: 20 }}>
          Prefer to help for free?{" "}
          <a href={site.links.subscribe} target="_blank" rel="noopener">
            Subscribe on YouTube
          </a>{" "}
          and share a clip.
        </p>
      </div>
    </section>
  );
}
