type Props = { title: string; target: number; raised: number; updated: string; href: string };

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function GoalBar({ title, target, raised, updated, href }: Props) {
  const pct = Math.max(0, Math.min(100, Math.round((raised / target) * 100)));
  return (
    <a className="goal" href={href} target="_blank" rel="noopener">
      <span className="goal-top">
        <b>{title}</b>
        <span className="num">{pct}%</span>
      </span>
      <span className="goal-bar" role="progressbar" aria-valuemin={0} aria-valuemax={target} aria-valuenow={raised} aria-label={title}>
        <i style={{ width: `${pct}%` }} />
      </span>
      <span className="goal-sub small">
        {usd(raised)} of {usd(target)} raised · updated {updated}
      </span>
    </a>
  );
}
