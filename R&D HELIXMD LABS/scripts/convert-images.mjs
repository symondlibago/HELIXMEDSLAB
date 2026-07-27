/**
 * Converts every PNG in /public to a downsized AVIF, then parks the heavy
 * originals in /originals so they don't ship with the build.
 *
 * Run with: node scripts/convert-images.mjs
 */
import sharp from "sharp";
import { readdirSync, mkdirSync, renameSync, statSync } from "fs";
import path from "path";

const PUBLIC = "public";
const ORIGINALS = "originals";

// Max width per image (product renders don't need 4500px)
const WIDTHS = {
  "hero-sec.png": 2560,
  "Mobile.png": 1200,
  "han.png": 1200,
  "splash.png": 1200,
  "bot.png": 900,
};
const DEFAULT_WIDTH = 1000; // product studio renders
const QUALITY = 55;

mkdirSync(ORIGINALS, { recursive: true });

const pngs = readdirSync(PUBLIC).filter((f) => f.toLowerCase().endsWith(".png"));

for (const file of pngs) {
  const input = path.join(PUBLIC, file);
  const outName = file.replace(/\.png$/i, "").toLowerCase() + ".avif";
  const output = path.join(PUBLIC, outName);
  const width = WIDTHS[file] ?? DEFAULT_WIDTH;

  const kbIn = Math.round(statSync(input).size / 1024);
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .avif({ quality: QUALITY, effort: 4 })
    .toFile(output);
  const kbOut = Math.round(statSync(output).size / 1024);
  console.log(`${file} (${kbIn} KB) -> ${outName} (${kbOut} KB)`);

  renameSync(input, path.join(ORIGINALS, file));
}

console.log(`\nDone. ${pngs.length} originals moved to /${ORIGINALS}.`);
