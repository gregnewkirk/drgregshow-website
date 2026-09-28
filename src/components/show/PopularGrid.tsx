import { fmtViews } from "@/lib/format";
import type { PopularSection } from "@/content/types";

type Props = {
  popular: PopularSection;
};

// Server component (no interactivity). Port of the mockup's popularHTML(), Figure 3 on the
// home page. All 6 videos render at equal size in the existing .pop grid (2 cols at 760px,
// 3 cols at 1100px, so 6 items form an even grid rather than a ranked single column). Plain
// <img loading="lazy"> for i.ytimg.com thumbnails: next/image would need remotePatterns added
// for that host, and the brief allows a plain img here.
export default function PopularGrid({ popular }: Props) {
  const videos = [...popular.videos].sort((a, b) => b.views - a.views);

  if (!videos.length) {
    return null;
  }

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="fig" style={{ padding: "20px 20px 16px" }}>
          <div className="fig-title">
            <span className="fig-no">Figure 3.</span>
            <h2 style={{ fontSize: "clamp(20px,2.2vw,24px)" }}>Most popular videos</h2>
          </div>
          <ol className="pop">
            {videos.map((v, i) => (
              <li key={v.id}>
                <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" rel="noopener">
                  <span className="pr">{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    width={112}
                    height={63}
                  />
                  <span>
                    <span className="pt">{v.title}</span>
                    <span className="pv">{fmtViews(v.views)}</span>
                  </span>
                </a>
              </li>
            ))}
          </ol>
          <p className="legend-cap" style={{ fontSize: 14 }}>
            <b>Figure 3.</b> Views as of {popular.asOf}. Source: {popular.source}.
          </p>
        </div>
      </div>
    </section>
  );
}
