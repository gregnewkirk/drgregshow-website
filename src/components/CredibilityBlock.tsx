const CREDENTIALS = [
  { label: "PhD Molecular Biology" },
  { label: "Biotech Patent Strategist" },
  { label: "Founder, SAFE (501c4 pending)" },
  { label: "San Diego, CA" },
  { label: "Available Nationwide" },
];

export default function CredibilityBlock() {
  return (
    <section id="about" className="py-20 bg-bg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12">
          <span className="section-rule"></span>
          <span className="section-label">Background</span>
          <h2 className="text-3xl md:text-4xl font-heading text-text-primary mt-3">
            The Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Bio */}
          <div className="space-y-5">
            <p className="text-text-secondary leading-relaxed">
              Dr. Gregory Michael Newkirk holds a PhD in molecular biology and has
              spent his career at the intersection of science, communication, and
              public accountability. He founded Science and Freedom for Everyone
              (SAFE), a nonprofit dedicated to science advocacy and policy.
            </p>
            <p className="text-text-secondary leading-relaxed">
              Unlike most science communicators, Dr. Greg shows up to the debate
              on camera, in real time, against the people actively spreading
              misinformation. His background in patent strategy and biotech
              consulting gives him depth that goes beyond the lab.
            </p>
          </div>

          {/* Right: Credential badges */}
          <div className="flex flex-col gap-3">
            {CREDENTIALS.map((cred) => (
              <div
                key={cred.label}
                className="flex items-center gap-3 bg-bg-surface border border-white/10 rounded-lg px-5 py-4"
              >
                <div className="w-2 h-2 rounded-full bg-accent-cyan flex-shrink-0" />
                <span className="text-text-primary font-semibold">{cred.label}</span>
              </div>
            ))}
            <div className="mt-6 p-4 rounded-lg bg-bg-surface border border-white/5">
              <p className="text-text-secondary text-sm leading-relaxed">
                Off screen: dad of four, married since 2014, Brazilian jiu-jitsu practitioner.
                The same discipline that keeps him standing in a debate keeps him grounded at home.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
