"""Build the full-year search index + topic stats.

Per public stream VOD, pick the best transcript:
  1. Ares Whisper SRT, matched by PT date + duration
  2. Vault Whisper SRT (DrGreg-Ops/30-Content/YYYY-MM-DD/...), matched by date + duration
  3. YouTube auto-captions (yt-subs/<id>.vtt)
A transcript counts only if its last timestamp is within max(10 min, 10%) of the VOD duration.

Writes src/content/generated/dataset.json and data/search-index.json.gz. Reads all
input paths from environment variables (see the DG_* defaults below); does not touch
mockup/ at all.
"""
import collections, datetime, gzip, html, json, os, re, zoneinfo

S = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(S)

DG_TRANSCRIPTS_ARES = os.environ.get("DG_TRANSCRIPTS_ARES", "")
DG_VAULT_CONTENT = os.environ.get("DG_VAULT_CONTENT", "/Volumes/vaults/Mnemosyne/DrGreg-Ops/30-Content")
DG_YT_SUBS = os.environ.get("DG_YT_SUBS", "")
DG_STREAM_META = os.environ.get("DG_STREAM_META", "")
DG_EXTRA_VIDEOS = os.environ.get("DG_EXTRA_VIDEOS", "")

PT = zoneinfo.ZoneInfo("America/Los_Angeles")

DATASET_OUT = os.path.join(ROOT, "src", "content", "generated", "dataset.json")
INDEX_OUT = os.path.join(ROOT, "data", "search-index.json.gz")

TAX = [
    ("vaccines", "Vaccines", "Autism, mRNA, ingredients, schedules, mandates.", "vaccine",
     r"\bvaccin|\bmmr\b|\bmrna\b|thimerosal|autism"),
    ("evolution", "Evolution", "New information, fossils, \"just a theory.\"", "evolution",
     r"\bevolution|darwin|creationis|natural selection|fossil"),
    ("climate", "Climate", "IPCC reports, CO2, weather extremes, and the data behind them.", "climate",
     r"\bclimate|global warming|\bco2\b|ipcc"),
    ("germ-terrain", "Germ vs terrain", "Do germs cause disease? Do viruses exist? Yes, and here is how we know.", "germ theory",
     r"germ theory|\bterrain|pasteur"),
    ("covid-origins", "COVID origins", "Market, lab, gain of function, and what the evidence can and cannot say.", "lab leak",
     r"lab leak|wuhan|gain of function"),
    ("cancer", "Cancer claims", "Cures, causes, and what the trials actually show.", "cancer",
     r"\bcancer|chemo"),
    ("ai", "AI and science", "What AI can and cannot do in research, and the claims people make about it.", "artificial intelligence",
     r"\bai\b|artificial intelligence|chatgpt"),
    ("gene-editing", "Gene editing", "CRISPR, gene therapy, and what editing a genome really involves.", "CRISPR",
     r"crispr|gene editing|gene therapy"),
    ("space", "Space and flat earth", "NASA, the moon landing, and the shape of the planet.", "flat earth",
     r"flat earth|moon landing|\bnasa\b"),
    ("nutrition", "Nutrition", "Supplements, seed oils, diets, and what the evidence supports.", "supplement",
     r"\bsupplement|seed oil|\bketo\b|carnivore diet|\bcreatine|\bprotein powder|\bdiet\b"),
    ("alt-medicine", "Alternative medicine", "Ivermectin, detoxes, homeopathy, and how to test a treatment.", "ivermectin",
     r"ivermectin|homeopath|naturopath|chiropract|essential oil|detox"),
    ("energy", "Energy and nuclear", "Nuclear, solar, fossil fuels, and the tradeoffs.", "nuclear",
     r"\bnuclear|solar panel|renewable|fossil fuel"),
    ("gmos-food", "GMOs and food", "Genetically modified crops, glyphosate, and pesticides.", "GMO",
     r"\bgmos?\b|glyphosate|pesticide|genetically modified"),
    ("origin-of-life", "Origin of life", "Abiogenesis, mostly from the creationist side.", "abiogenesis",
     r"abiogenesis|origin of life|primordial"),
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


def strip_dashes(t):
    return re.sub(r"\s*[\u2014\u2013]\s*", ": ", t).replace("\u2014", ", ").replace("\u2013", "-")


def clean(t):
    t = html.unescape(re.sub(r"<[^>]+>", "", t))
    t = re.sub(r"\s+", " ", t).strip()
    return t.replace("\u2014", ", ").replace("\u2013", "-")


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
    for l in open(DG_STREAM_META):
        i, rt, ud, du, av, title = l.rstrip("\n").split("|", 5)
        if av != "public":
            continue
        d = datetime.datetime.fromtimestamp(int(rt), PT).strftime("%Y%m%d") if rt not in ("NA", "") else ud
        vods.append({"id": i, "date": d, "dur": int(du) if du.isdigit() else 0,
                     "title": strip_dashes(title).replace("The Dr Greg Show: ", "")})
    by_date = collections.defaultdict(list)
    for v in vods:
        by_date[v["date"]].append(v)

    # candidate whisper transcripts by date
    cands = collections.defaultdict(list)
    if DG_TRANSCRIPTS_ARES:
        for f in glob_srt(f"{DG_TRANSCRIPTS_ARES}/2*.srt"):
            b = os.path.basename(f)
            if "highlight" in b or "rfk hearing" in b:
                continue
            cands[b[:8]].append(("ares", f))
    for f in glob_srt(f"{DG_VAULT_CONTENT}/2026-*/**/*.srt", recursive=True):
        rel = os.path.relpath(f, DG_VAULT_CONTENT)
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
            vtts = sorted(glob_srt(f"{DG_YT_SUBS}/{v['id']}.*.vtt"), key=os.path.getsize, reverse=True) if DG_YT_SUBS else []
            if vtts:
                cues = parse_vtt(vtts[0])
                if cues:
                    best = ("youtube", vtts[0], cues)
        if not best:
            report["none"] += 1
            continue
        report[best[0]] += 1
        text = " ".join(x for _, x in best[2]).lower()
        counts = {k: len(re.findall(p, text)) for k, _, _, _, p in TAX}
        top = max(counts, key=counts.get)
        d = v["date"]
        videos.append({"id": v["id"], "title": v["title"], "date": f"{d[:4]}-{d[4:6]}-{d[6:]}",
                       "topic": top, "source": best[0], "counts": counts,
                       "hours": round(v["dur"] / 3600, 2), "qs": {q: bool(re.search(p, text)) for q, p in QS.items()}})
        chunks += chunk(v["id"], best[2])

    # keep the non-stream caption videos from the old index, if supplied
    if DG_EXTRA_VIDEOS and os.path.exists(DG_EXTRA_VIDEOS):
        raw = open(DG_EXTRA_VIDEOS, encoding="utf-8").read()
        old = json.loads(raw[len("window.SEARCH_DATA="):-1])
        have = {v["id"] for v in videos}
        for ov in old["videos"]:
            if ov["id"] in have:
                continue
            videos.append({**ov, "title": strip_dashes(ov["title"]), "source": "youtube", "counts": None})
            chunks += [dict(c, x=clean(c["x"])) for c in old["chunks"] if c["v"] == ov["id"]]

    streams = [v for v in videos if v.get("counts")]
    print("sources", dict(report), "streams", len(streams), "chunks", len(chunks))
    print("range", streams[0]["date"], "to", streams[-1]["date"], "hours", round(sum(v["hours"] for v in streams)))

    search = {"videos": [{k: v[k] for k in ("id", "title", "date", "topic", "source")} for v in videos], "chunks": chunks}
    s = json.dumps(search, separators=(",", ":"), ensure_ascii=False)
    os.makedirs(os.path.dirname(INDEX_OUT), exist_ok=True)
    with gzip.GzipFile(INDEX_OUT, "wb", compresslevel=9, mtime=0) as gz:
        gz.write(s.encode("utf-8"))
    print("index MB", round(len(s) / 1e6, 1), "gz MB", round(os.path.getsize(INDEX_OUT) / 1e6, 1))

    n = len(streams)
    per = [{"date": v["date"], "video": v["id"], **v["counts"]} for v in streams]
    topics = []
    for slug, name, blurb, term, _ in TAX:
        topics.append({
            "slug": slug, "name": name, "blurb": blurb, "term": term,
            "streams": sum(1 for v in streams if v["counts"][slug] >= 3),
        })
    topics.sort(key=lambda x: -x["streams"])
    question_streams = {}
    for q in QS:
        question_streams[q] = sum(1 for v in streams if v["qs"].get(q))
    months = lambda d: datetime.date(int(d[:4]), int(d[5:7]), 1).strftime("%b %Y")
    summary = {
        "streams": n,
        "hours": round(sum(v["hours"] for v in streams)),
        "from": months(streams[0]["date"]),
        "to": months(streams[-1]["date"]),
        "sources": dict(report),
        "note": f"Nightly streams with a transcript, {months(streams[0]['date'])} to {months(streams[-1]['date'])}. "
                "A topic counts for a stream when its keywords come up 3 or more times. "
                "Question counts are streams where the matching phrase came up at least once.",
        "topicRule": "A topic counts for a stream when its keywords appear 3 or more times.",
    }
    dataset = {
        "summary": summary,
        "topics": topics,
        "perStream": per,
        "questionStreams": question_streams,
        "videos": [{k: v[k] for k in ("id", "title", "date", "topic", "source")} for v in videos],
    }
    out = json.dumps(dataset, ensure_ascii=False, indent=2)
    if re.search(r"[\u2013\u2014]", out):
        raise SystemExit("dataset.json still contains an en or em dash after cleaning")
    os.makedirs(os.path.dirname(DATASET_OUT), exist_ok=True)
    open(DATASET_OUT, "w", encoding="utf-8").write(out)
    print("topics", [(t["slug"], t["streams"]) for t in topics])
    print("questions", sorted(question_streams.items(), key=lambda x: -x[1]))


def glob_srt(pattern, recursive=False):
    import glob
    return glob.glob(pattern, recursive=recursive)


if __name__ == "__main__":
    main()
