/**
 * Minimal build script — copies src/ + public/ → dist/
 * No bundler required for a pure HTML/CSS/JS site.
 *
 * Usage:
 *   node scripts/build.js           # one-shot build
 *   node scripts/build.js --watch   # rebuild on file changes
 */

const fs   = require('fs');
const path = require('path');

const ROOT   = path.resolve(__dirname, '..');
const SRC    = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');
const DIST   = path.join(ROOT, 'dist');

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

function build() {
  console.time('build');
  fs.rmSync(DIST, { recursive: true, force: true });

  // Copy src → dist
  if (fs.existsSync(SRC)) copyDir(SRC, DIST);

  // Copy public → dist (static assets, overrides src if same name)
  if (fs.existsSync(PUBLIC)) {
    for (const entry of fs.readdirSync(PUBLIC, { withFileTypes: true })) {
      if (entry.name === '.gitkeep') continue;
      const s = path.join(PUBLIC, entry.name);
      const d = path.join(DIST, entry.name);
      if (entry.isDirectory()) copyDir(s, d);
      else fs.copyFileSync(s, d);
    }
  }

  console.timeEnd('build');
  console.log(`→ dist/ ready (${countFiles(DIST)} files)`);
}

function countFiles(dir) {
  let n = 0;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? countFiles(path.join(dir, e.name)) : 1;
  }
  return n;
}

build();

if (process.argv.includes('--watch')) {
  console.log('Watching src/ and public/ for changes…');
  for (const dir of [SRC, PUBLIC]) {
    if (fs.existsSync(dir)) {
      fs.watch(dir, { recursive: true }, (_, file) => {
        console.log(`Changed: ${file}`);
        build();
      });
    }
  }
}
