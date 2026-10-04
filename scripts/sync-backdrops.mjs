// Copy the science backdrop figures from the vault into public/backdrops.
// Canonical source: the portrait TV "art window" figures in the vault. The same files run on the TV
// (mode=tv) and behind /links (mode=backdrop). Edit them there, then run: npm run sync-backdrops
import { copyFileSync, mkdirSync, existsSync } from 'node:fs'
import path from 'node:path'

const SRC = '/Volumes/vaults/Mnemosyne/DrGreg-Ops/50-Assets/portrait-ambient-20261001/v7-rotation/figures'
const DEST = path.join(process.cwd(), 'public/backdrops')
// Only figures that size themselves to any screen and carry no heavy data files.
const FILES = ['fig.js', 'gl.js', 'figure.css', 'attractors.html', 'turing.html', 'galaxies.html', 'climate.html', 'gistemp-data.js', 'primes.html', 'waves.html']

if (!existsSync(SRC)) { console.error(`Source missing: ${SRC}`); process.exit(1) }
mkdirSync(DEST, { recursive: true })
for (const f of FILES) { copyFileSync(path.join(SRC, f), path.join(DEST, f)); console.log('copied', f) }
