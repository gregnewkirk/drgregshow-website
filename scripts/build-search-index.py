"""Build the full-year search index + topic stats.

Per public stream VOD, pick the best transcript:
  1. Ares Whisper SRT (Z:\\Audio Transcription Library), matched by PT date + duration
  2. Vault Whisper SRT (DrGreg-Ops/30-Content/YYYY-MM-DD/...), matched by date + duration
  3. YouTube auto-captions (yt-subs/<id>.vtt)
A transcript counts only if its last timestamp is within max(10 min, 10%) of the VOD duration.
"""
import collections, datetime, glob, html, json, os, re, zoneinfo

S = os.path.dirname(os.path.abspath(__file__))
VAULT = "/Volumes/vaults/Mnemosyne/DrGreg-Ops/30-Content"
MOCK = os.path.expanduser("~/workspace/projects/drgregshow-website/mockup")
PT = zoneinfo.ZoneInfo("America/Los_Angeles")

TAX = [
    ("vaccines", r"\bvaccin|\bmmr\b|\bmrna\b|thimerosal|autism"),
    ("evolution", r"\bevolution|darwin|creationis|natural selection|fossil"),
    ("climate", r"\bclimate|global warming|\bco2\b|ipcc"),
    ("germ-terrain", r"germ theory|\bterrain|pasteur"),
    ("covid-origins", r"lab leak|wuhan|gain of function"),
    ("cancer", r"\bcancer|chemo"),
    ("ai", r"\bai\b|artificial intelligence|chatgpt"),
    ("gene-editing", r"crispr|gene editing|gene therapy"),
    ("space", r"flat earth|moon landing|\bnasa\b"),
    ("nutrition", r"\bsupplement|seed oil|\bketo\b|carnivore diet|\bcreatine|\bprotein powder|\bdiet\b"),
    ("alt-medicine", r"ivermectin|homeopath|naturopath|chiropract|essential oil|detox"),
    ("energy", r"\bnuclear|solar panel|renewable|fossil fuel"),
    ("gmos-food", r"\bgmos?\b|glyphosate|pesticide|genetically modified"),
    ("origin-of-life", r"abiogenesis|origin of life|primordial"),
]
QS = {
    "Are mRNA vaccines safe?": r"\bmrna\b",
    "Did COVID come from a lab?": r"lab leak|wuhan",
    "Do vaccines cause autism?": r"autism",
    "Is climate change real?": r"climate change",
    "Is fluoride dangerous?": r"fluorid",
    "Is raw milk healthier?": r"raw milk",
    "Do viruses exist?": r"viruses? (?:don'?t|do not|doesn'?t) exist|do viruses exist|isolat\w+ (?:the )?virus",
    "Can mutations add new information?": r"new information",
}


def clean(t):
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    return re.sub(r"\s+", " ", t).strip()


def ts(h, m, s):
    return int(h) * 3600 + int(m) * 60 + float(s)


def parse_srt(path):
    raw = open(path, encoding="utf-8", errors="ignore").read()
    out = []
    for h, m, s, txt in re.findall(r"(\d+):(\d\d):(\d\d)[,.]\d+ --> [^\n]+\n(.*?)(?:\n\s*\n|\Z)", raw, re.S):
        t = clean(txt)
        if t:
            out.append((ts(h, m, s), t))
    return out


def parse_vtt(path):
    raw = open(path, encoding="utf-8", errors="ignore").read()
    out, last = [], ""
    for st, txt in re.findall(r"(\d+:\d\d:\d\d\.\d+) --> [^\n]*\n(.*?)(?:\n\n|\Z)", raw, re.S):
        h, m, s = st.split(":")
        for ln in clean_lines(txt):
            if ln == last:
                continue
            new = ln[len(last):].strip() if last and ln.startswith(last) else ln
            last = ln
            if new:
                out.append((ts(h, m, s), new))
    return out


def clean_lines(txt):
    return [clean(x) for x in txt.split("\n") if clean(x)]


def chunk(vid, cues, width=30):
    chunks, cur = [], None
    for t, x in cues:
        if cur is None or t - cur["s"] >= width:
            if cur:
                chunks.append(cur)
            cur = {"v": vid, "s": int(t), "x": ""}
        cur["x"] = (cur["x"] + " " + x).strip()
    if cur:
        chunks.append(cur)
    for c in chunks:
        c["x"] = c["x"].replace("[Music]", "").strip()[:420]
    return [c for c in chunks if c["x"]]


def main():
    vods = []
    for l in open(f"{S}/stream-meta.txt"):
        i, rt, ud, du, av, title = l.rstrip("\n").split("|", 5)
        if av != "public":
            continue
        d = datetime.datetime.fromtimestamp(int(rt), PT).strftime("%Y%m%d") if rt not in ("NA", "") else ud
        vods.append({"id": i, "date": d, "dur": int(du) if du.isdigit() else 0,
                     "title": re.sub(r"\s*[\u2014\u2013]\s*", ": ", title).replace("The Dr Greg Show: ", "")})
    by_date = collections.defaultdict(list)
    for v in vods:
        by_date[v["date"]].append(v)

    # candidate whisper transcripts by date
    cands = collections.defaultdict(list)
    for f in glob.glob(f"{S}/ares-srt/2*.srt"):
        b = os.path.basename(f)
        if "highlight" in b or "rfk hearing" in b:
            continue
        cands[b[:8]].append(("ares", f))
    for f in glob.glob(f"{VAULT}/2026-*/**/*.srt", recursive=True):
        rel = os.path.relpath(f, VAULT)
        if re.search(r"short|clip|trailer|hl_|arcs|part\d|trimmed|longform/|segment", rel, re.I):
            continue
        d = rel[:10].replace("-", "")
        if re.match(r"\d{8}$", d):
            cands[d].append(("vault", f))

    def fits(cues, dur):
        return cues and dur and abs(cues[-1][0] - dur) <= max(600, 0.10 * dur)

    videos, chunks, report = [], [], collections.Counter()
    used = set()
    for v in sorted(vods, key=lambda x: x["date"]):
        best = None
        for src, f in cands.get(v["date"], []):
            if f in used:
                continue
            cues = parse_srt(f)
            if fits(cues, v["dur"]) and (best is None or len(cues) > len(best[2])):
                best = (src, f, cues)
        if best:
            used.add(best[1])
        else:
            vtts = sorted(glob.glob(f"{S}/yt-subs/{v['id']}.*.vtt"), key=os.path.getsize, reverse=True)
            if vtts:
                cues = parse_vtt(vtts[0])
                if cues:
                    best = ("youtube", vtts[0], cues)
        if not best:
            report["none"] += 1
            continue
        report[best[0]] += 1
        text = " ".join(x for _, x in best[2]).lower()
        counts = {k: len(re.findall(p, text)) for k, p in TAX}
        top = max(counts, key=counts.get)
        d = v["date"]
        videos.append({"id": v["id"], "title": v["title"], "date": f"{d[:4]}-{d[4:6]}-{d[6:]}",
                       "topic": top, "source": best[0], "counts": counts,
                       "hours": round(v["dur"] / 3600, 2), "qs": {q: bool(re.search(p, text)) for q, p in QS.items()}})
        chunks += chunk(v["id"], best[2])

    # keep the 12 non-stream caption videos from the first index
    old = json.loads(open(f"{S}/search-data-16.js").read()[len("window.SEARCH_DATA="):-1])
    have = {v["id"] for v in videos}
    for ov in old["videos"]:
        if ov["id"] in have:
            continue
        videos.append({**ov, "source": "youtube", "counts": None})
        chunks += [dict(c, x=clean(c["x"]).replace("\u2013", "-")) for c in old["chunks"] if c["v"] == ov["id"]]
        for c in chunks[-1:]:
            pass

    streams = [v for v in videos if v.get("counts")]
    print("sources", dict(report), "streams", len(streams), "chunks", len(chunks))
    print("range", streams[0]["date"], "to", streams[-1]["date"], "hours", round(sum(v["hours"] for v in streams)))

    search = {"videos": [{k: v[k] for k in ("id", "title", "date", "topic", "source")} for v in videos], "chunks": chunks}
    s = json.dumps(search, separators=(",", ":"), ensure_ascii=False).replace("\u2014", ", ").replace("\u2013", "-")
    open(f"{MOCK}/search-data.js", "w").write("window.SEARCH_DATA=" + s + ";")
    print("index MB", round(len(s) / 1e6, 1))

    # content.js stats
    c = json.loads(open(f"{MOCK}/content.js").read()[len("window.CONTENT="):-1])
    n = len(streams)
    per = [{"date": v["date"], "video": v["id"], **v["counts"]} for v in streams]
    for t in c["topics"]:
        t["streams"] = sum(1 for v in streams if v["counts"][t["slug"]] >= 3)
    c["topics"].sort(key=lambda x: -x["streams"])
    for q in c["questions"]:
        q["streams"] = sum(1 for v in streams if v["qs"].get(q["q"]))
    c["questions"].sort(key=lambda x: -x["streams"])
    months = lambda d: datetime.date(int(d[:4]), int(d[5:7]), 1).strftime("%b %Y")
    c["dataset"].update({"streams": n, "hours": round(sum(v["hours"] for v in streams)),
                         "from": months(streams[0]["date"]), "to": months(streams[-1]["date"]),
                         "sources": dict(report),
                         "note": f"Nightly streams with a transcript, {months(streams[0]['date'])} to {months(streams[-1]['date'])}. "
                                 "A topic counts for a stream when its keywords come up 3 or more times. "
                                 "Question counts are streams where the matching phrase came up at least once."})
    c["dataset"]["searchable"] = {"streams": n, "note": f"All {n} streams are searchable, plus {len(videos) - n} other videos."}
    c["perStream"] = per
    open(f"{MOCK}/content.js", "w").write("window.CONTENT=" + json.dumps(c, ensure_ascii=False) + ";")
    print("topics", [(t["slug"], t["streams"]) for t in c["topics"]])
    print("questions", [(q["q"], q["streams"]) for q in c["questions"]])


if __name__ == "__main__":
    main()
