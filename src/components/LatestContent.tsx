import { getLatestVideos, YouTubeVideo } from "@/lib/youtube";
import { FaYoutube, FaPlay, FaEye } from "react-icons/fa";

function formatViewCount(count: string): string {
  const num = parseInt(count, 10);
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return count;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function LatestContent() {
  const videos = await getLatestVideos();

  return (
    <section id="content" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
          Latest Content
        </h2>
        <p className="text-text-secondary text-center mb-12">
          Fresh from the lab — my most recent videos
        </p>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-bg-surface rounded-xl overflow-hidden border border-white/5 hover:border-accent-cyan/30 transition-all hover:-translate-y-1"
              >
                <div className="relative aspect-video">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <FaPlay className="text-white text-2xl" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-accent-cyan transition-colors">
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-3 text-text-secondary text-xs">
                    <span className="flex items-center gap-1">
                      <FaEye /> {formatViewCount(video.viewCount)}
                    </span>
                    <span>{formatDate(video.publishedAt)}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FaYoutube className="text-4xl text-red-500 mx-auto mb-4" />
            <p className="text-text-secondary">
              Videos loading... Check back soon!
            </p>
            <a
              href="https://www.youtube.com/@DrGregShow"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-accent-cyan hover:underline"
            >
              Visit YouTube Channel →
            </a>
          </div>
        )}

        <div className="text-center mt-8">
          <a
            href="https://www.youtube.com/@DrGregShow?sub_confirmation=1"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
          >
            <FaYoutube /> Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
