import { FaFlask, FaBullhorn, FaSyringe, FaBookOpen } from "react-icons/fa";

const RESOURCES = [
  {
    name: "SAFE Research Institute",
    description: "Science And Freedom for Everyone Foundation — advancing science policy research",
    url: "https://saferi.org",
    icon: FaFlask,
  },
  {
    name: "Science & Freedom Action",
    description: "Get involved at the intersection of science and politics",
    url: "https://scienceandfreedom.com",
    icon: FaBullhorn,
  },
  {
    name: "Vaccination Resources",
    description: "Evidence-based vaccination information from vaccines.gov",
    url: "https://www.vaccines.gov/en",
    icon: FaSyringe,
  },
  {
    name: "Research Publications",
    description: "My published research and academic papers",
    url: "https://paperpile.com/shared/Newkirk-Publications-tUTY9rHQySBiS1BQ97grKCg",
    icon: FaBookOpen,
  },
];

export default function Resources() {
  return (
    <section id="resources" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading mb-4">
          Resources
        </h2>
        <p className="text-text-secondary mb-12">
          Tools, research, and information worth sharing
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map((resource) => (
            <a
              key={resource.name}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center p-8 bg-bg-surface rounded-xl border border-white/5 hover:border-accent-cyan/30 transition-all hover:-translate-y-1"
            >
              <resource.icon className="text-3xl mb-4 text-accent-cyan" />
              <h3 className="font-heading font-semibold mb-2">
                {resource.name}
              </h3>
              <p className="text-text-secondary text-sm">
                {resource.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
