// NusaAngka: entry for the make.fun national statistics site bounty
// (Node 22, standard library only). The site is static files in app/:
// index.html opens in desktop Chrome and on a phone and works with no
// network request. This program hands that site in: it copies app/ and
// screenshots/ from beside this file to /output and writes
// /output/dossier.json, the summary the judge reads (screenshots, files
// and first-load bytes, and source), using the vendored make.fun library.
// Leave vendor/makefun-frontend.ts untouched: the scorer requires
// dossier.json to match byte for byte what its copy of the library writes.
//
// Run outside the grader with MAKEFUN_OUTPUT_DIR instead of /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Handing in the same entry twice must write the same bytes: no time
// stamp or random number in the output, and directory copies always in
// the same order. Keep that true when changing this file.
if (!existsSync(join(here, 'app', 'index.html'))) {
  throw new Error('app/index.html not found: run from the entry repository root');
}

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

// The scorer's own limits (reference/gate.json): only text_max_bytes
// shapes bytes; the rest rejects entries the scorer also rejects (more
// than 4 screenshots or one over 256 KiB; more than 993 files and
// directories in app/ or 16 MiB of app/ files: app/ counts with the
// 1000-entry /output limit, screenshots and dossier.json included).
writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
