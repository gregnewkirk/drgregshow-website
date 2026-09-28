const TZ = "America/Los_Angeles";

function ptParts(d: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: TZ, hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" })
    .formatToParts(d).map(x => [x.type, x.value]));
  return { y: +p.year, mo: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, s: +p.second };
}

function ptOffsetMs(d: Date) {
  const p = ptParts(d);
  return Date.UTC(p.y, p.mo - 1, p.d, p.h, p.mi, p.s) - Math.floor(d.getTime() / 1000) * 1000;
}

export function nextShowAt(now: Date): Date {
  const p = ptParts(now);
  let target = new Date(Date.UTC(p.y, p.mo - 1, p.d, 21, 0, 0) - ptOffsetMs(now));
  if (target.getTime() <= now.getTime()) {
    const t2 = new Date(Date.UTC(p.y, p.mo - 1, p.d + 1, 21, 0, 0));
    target = new Date(t2.getTime() - ptOffsetMs(t2));
  } else {
    // Refine using offset at target to handle DST transitions within the same day
    target = new Date(Date.UTC(p.y, p.mo - 1, p.d, 21, 0, 0) - ptOffsetMs(target));
  }
  return target;
}

export function isOnAir(now: Date): boolean {
  const h = ptParts(now).h;
  return h >= 21 && h < 23;
}

export function countdownParts(ms: number) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return { h: Math.floor(t / 3600), m: Math.floor((t % 3600) / 60), s: t % 60 };
}
