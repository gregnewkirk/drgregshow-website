// Sync the latest booking/press documents into public/media with STABLE
// filenames, so the booking page always serves the newest versions without
// touching the page code.
//
// Update flow:
//   1. Rebuild your PDFs (talent-package / media kit) as usual.
//   2. Run:  npm run sync-media            (copy latest into the repo)
//      or:   npm run sync-media -- --push  (copy + commit + deploy)
//
// The canonical sources live on this machine (vault + headshots). Vercel can't
// reach them, so syncing happens locally and pushes to trigger a deploy.

import { copyFileSync, existsSync, statSync, mkdirSync } from 'node:fs'
import { execSync } from 'node:child_process'
import os from 'node:os'
import path from 'node:path'

const HOME = os.homedir()
const VAULT = '/Volumes/vaults/Mnemosyne/DrGreg-Ops/50-Assets'
const HEADSHOTS = path.join(HOME, 'workspace/headshots')

// Each entry copies the first source that exists into public/media/<dest>.
// List newest/most-canonical source first.
const MANIFEST = [
  { dest: 'resume.pdf', label: 'Acting resume', sources: [
    `${HEADSHOTS}/DrGreg_Talent_Resume.pdf`,
    `${VAULT}/DrGreg_Talent_Resume_2026-07.pdf`,
    `${VAULT}/DrGreg_Talent_Resume.pdf`,
  ] },
  { dest: 'one-sheet.pdf', label: 'Talent one-sheet', sources: [
    `${HEADSHOTS}/DrGreg_Talent_OneSheet.pdf`,
    `${VAULT}/DrGreg_Talent_OneSheet_2026-07.pdf`,
    `${VAULT}/DrGreg_Talent_OneSheet.pdf`,
  ] },
  { dest: 'media-kit.pdf', label: 'Media kit', sources: [
    `${VAULT}/DrGreg_Media_Kit.pdf`,
  ] },
  { dest: 'speaker-one-sheet.pdf', label: 'Speaker one-sheet', sources: [
    `${HEADSHOTS}/DrGreg_Speaker_OneSheet.pdf`,
    `${VAULT}/DrGreg_Speaker_OneSheet.pdf`,
  ] },
]

const OUT = path.join(process.cwd(), 'public/media')
mkdirSync(OUT, { recursive: true })

let copied = 0
for (const item of MANIFEST) {
  const src = item.sources.find(existsSync)
  if (!src) { console.warn(`SKIP  ${item.dest.padEnd(22)} no source found for "${item.label}"`); continue }
  copyFileSync(src, path.join(OUT, item.dest))
  const kb = Math.round(statSync(src).size / 1024)
  const mtime = statSync(src).mtime.toISOString().slice(0, 10)
  console.log(`OK    ${item.dest.padEnd(22)} <- ${path.basename(src)}  (${kb}KB, ${mtime})`)
  copied++
}
console.log(`\n${copied} file(s) synced into public/media/`)

if (process.argv.includes('--push')) {
  try {
    execSync('git add public/media', { stdio: 'inherit' })
    execSync('git commit -m "media: sync latest booking docs to public/media"', { stdio: 'inherit' })
    execSync('git push origin master', { stdio: 'inherit' })
    console.log('\nPushed. Vercel will deploy the updated docs in ~1 minute.')
  } catch {
    console.log('\nNothing to push (files unchanged) or git failed — check output above.')
  }
}
