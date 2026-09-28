import type { Figure, Receipt } from "@/content/types";
import { doiUrl, hms } from "@/lib/format";
import Forest from "./Forest";
import Bars from "./Bars";
import Timeline from "./Timeline";

export function FigureView({ figure }: { figure: Figure }) {
  return (
    <>
      {figure.type === "forest" && <Forest f={figure} />}
      {figure.type === "bars" && <Bars f={figure} />}
      {figure.type === "timeline" && <Timeline f={figure} />}
      <p className="redrawn">Redrawn from published values.</p>
    </>
  );
}

type Props = {
  id: string;
  receipt: Receipt;
  figNo?: string;
  showMoment?: boolean;
};

export function ReceiptBlock({ id, receipt, figNo, showMoment = true }: Props) {
  if (!receipt) {
    return <span className="review">Receipt in review</span>;
  }

  const href = receipt.doi ? doiUrl(receipt.doi) : (receipt.url ?? "#");
  const linkLabel = receipt.doi ? `doi:${receipt.doi}` : "Read the report";

  return (
    <div id={id} aria-label={figNo ? `Figure ${figNo}` : undefined}>
      {receipt.figure ? (
        <FigureView figure={receipt.figure} />
      ) : receipt.quote ? (
        <p className="quote">&quot;{receipt.quote}.&quot;</p>
      ) : null}
      <p className="cite">
        {receipt.cite} <a href={href} target="_blank" rel="noopener">{linkLabel}</a>
      </p>
      {!receipt.figure && !receipt.quote && (
        <p className="small">
          No figure redrawn for this paper. The key result is in the answer above, the citation links to the
          source.
        </p>
      )}
      {receipt.moment && showMoment && (
        <p>
          <a
            className="btn quiet"
            style={{ padding: 0 }}
            href={`https://www.youtube.com/watch?v=${receipt.moment.video}&t=${receipt.moment.t}s`}
            target="_blank"
            rel="noopener"
          >
            Watch me cite it on stream at {hms(receipt.moment.t)}
          </a>
        </p>
      )}
    </div>
  );
}
