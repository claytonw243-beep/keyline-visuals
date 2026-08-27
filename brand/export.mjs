/* Rasterise the logo SVGs to print-resolution transparent PNGs at 300 DPI,
   and build a proof sheet. Run with: node brand/export.mjs */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = dirname(fileURLToPath(import.meta.url));
const DPI = 300;

const jobs = [
  // 3600px @ 300dpi = 12 inches wide.
  ['keyline-horizontal-fullcolor', 3600],
  ['keyline-horizontal-white', 3600],
  ['keyline-horizontal-ink', 3600],
];

for (const [name, width] of jobs) {
  const out = join(DIR, `${name}-${width}px.png`);
  await sharp(readFileSync(join(DIR, `${name}.svg`)))
    .resize({ width })
    .png({ compressionLevel: 9 })
    .withMetadata({ density: DPI })
    .toFile(out);
  const { width: w, height: h } = await sharp(out).metadata();
  console.log(`${name}-${width}px.png  ${w}x${h}  (${(w / DPI).toFixed(1)}" x ${(h / DPI).toFixed(1)}" at ${DPI}dpi)`);
}
