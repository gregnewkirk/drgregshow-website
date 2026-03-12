import Image from "next/image";

const FACTS = [
  { label: "PhD", value: "Molecular Biology" },
  { label: "Family", value: "Married since 2014 · 4 kids" },
  { label: "Training", value: "Brazilian Jiu-Jitsu" },
  { label: "Based", value: "San Diego, CA" },
];

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-bg-surface/50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold tracking-[0.2em] text-accent-cyan uppercase mb-3">
            The Person Behind the Science
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold">
            About Dr. Greg
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-12">
          {/* Photo */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="w-52 h-52 rounded-2xl border border-accent-cyan/20 overflow-hidden bg-bg-surface">
              <Image
                src="/images/headshot.png"
                alt="Dr. Greg"
                width={208}
                height={208}
                className="w-full h-full object-cover object-top"
              />
            </div>
            {/* Quick facts */}
            <div className="mt-5 space-y-2">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-wide w-16 shrink-0">
                    {f.label}
                  </span>
                  <span className="text-sm text-text-secondary">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="flex-1 space-y-5">
            <p className="text-lg text-text-primary leading-relaxed">
              For a lot of people, Dr. Greg is their gladiator — the scientist in the arena,
              fighting the battles they can&apos;t fight themselves. In a world flooded with
              conspiracy theories, health misinformation, and anti-science politics, he goes
              looking for the hardest conversations and doesn&apos;t walk away from them.
            </p>

            <p className="text-text-secondary leading-relaxed">
              That&apos;s the public side. Off stream, he&apos;s a dad of four, a husband,
              and a Brazilian jiu-jitsu practitioner who has been with his wife since 2010.
              The same discipline that keeps him standing in a debate keeps him grounded at home.
            </p>

            <p className="text-text-secondary leading-relaxed">
              But what sets him apart from every other scientist online isn&apos;t just the content —
              it&apos;s what he&apos;s building behind it. Dr. Greg founded{" "}
              <a
                href="https://scienceandfreedom.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-cyan hover:underline"
              >
                Science and Freedom
              </a>
              , a nonprofit organization with both a 501(c)(3) education arm and a 501(c)(4)
              political action arm — creating real tools for real people to fight back against
              misinformation at the policy level. Nobody else on the internet is doing this.
              The stream is the front line. The institution is the long game.
            </p>

            <p className="text-text-secondary leading-relaxed">
              If you found him through TikTok or YouTube, you saw someone hold a bad-faith
              argument to the fire. What you&apos;re looking at here is the rest of the operation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
