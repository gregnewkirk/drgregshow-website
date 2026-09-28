#!/usr/bin/env bash
# Usage: scripts/fetch-stream-meta.sh OUT_DIR   (needs yt-dlp; text metadata only, no media)
set -euo pipefail
OUT="${1:?out dir}"; mkdir -p "$OUT"
yt-dlp --flat-playlist --print "%(id)s" "https://www.youtube.com/@DrGregShow/streams" \
  | sed 's#^#https://www.youtube.com/watch?v=#' > "$OUT/stream-urls.txt"
yt-dlp --skip-download --ignore-errors \
  --print "%(id)s|%(release_timestamp)s|%(upload_date)s|%(duration)s|%(availability)s|%(title)s" \
  -a "$OUT/stream-urls.txt" > "$OUT/stream-meta.txt"
yt-dlp --skip-download --write-auto-subs --sub-langs "en-orig,en" --sub-format vtt \
  --sleep-subtitles 2 --ignore-errors --no-overwrites -o "$OUT/yt-subs/%(id)s.%(ext)s" -a "$OUT/stream-urls.txt"
