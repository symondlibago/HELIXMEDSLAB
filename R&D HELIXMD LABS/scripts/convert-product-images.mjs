import sharp from "sharp";
import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from "fs";
import path from "path";

const INCOMING = "public/NEW PRODUCT IMAGES";
const VIALS = "public/product images/vial";
const PENS = "public/product images/pen";
const ORIGINALS = "originals/product images";

const MAX_WIDTH = 1000; // renders display at ~600px at the very largest
const QUALITY = 72;

/* new file (no extension) → existing base name in public/product images/vial */
const NEW_ARTWORK = {
  "b12": "B12 (1)",
  "BPC 5": "BPC (5)",
  "BPC 10": "BPC (10)",
  "CJC": "CJC",
  "DSIP": "DSIP (1)",
  "ghk-cu": "GHK-CU (1)",
  "GLOW": "GLOW (1)",
  "GLUTA": "GLUTA",
  "Ipamorelin": "IPAMORELIN (1)",
  "KISSPEPTIN 5": "KISSPEPTIN (1)",
  "KLOW": "KLOW",
  "KPV": "KPV",
  "MOTS-C": "MOTS-C",
  "MT 2": "MT 2",
  "nad 500": "NAD+ (500)",
  "Nad 1000": "NAD+ (1000)",
  "Reta 20": "RETA (20)",
  "Reta 30": "RETA (30)",
  "Sema 20": "SEMA (20)",
  "Sema 30": "SEMA (30)",
  "TB 5": "TB (5)",
  "TB 10": "TB (10)",
  "Tirzepatide 10": "Tirze (10)",
  "Tirzepatide 20": "Tirze (20)",
  "Tirzepatide 30": "Tirze (30)",
  "Wolverine": "Wolverine",
};

mkdirSync(path.join(ORIGINALS, "vial"), { recursive: true });
mkdirSync(path.join(ORIGINALS, "pen"), { recursive: true });

let pngBytes = 0;
let avifBytes = 0;
let count = 0;

/* AVIF keeps the alpha channel, which these renders rely on — the cards sit
   the vial straight on a gradient with no plate behind it. */
const toAvif = async (source, destination) => {
  await sharp(source)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .avif({ quality: QUALITY, effort: 7, chromaSubsampling: "4:4:4" })
    .toFile(destination);

  pngBytes += statSync(source).size;
  avifBytes += statSync(destination).size;
  count += 1;
};

// 1. New artwork, written under the name the catalog already points at.
if (existsSync(INCOMING)) {
  for (const file of readdirSync(INCOMING)) {
    const stem = path.parse(file).name;
    const target = NEW_ARTWORK[stem];
    if (!target) {
      console.warn(`  ! "${file}" isn't in NEW_ARTWORK — skipped`);
      continue;
    }
    await toAvif(path.join(INCOMING, file), path.join(VIALS, `${target}.avif`));
  }
}

// 2. Everything still on a PNG (Semax, and every pen) converted in place.
for (const [folder, bucket] of [
  [VIALS, "vial"],
  [PENS, "pen"],
]) {
  for (const file of readdirSync(folder)) {
    if (!file.toLowerCase().endsWith(".png")) continue;
    const stem = path.parse(file).name;
    const destination = path.join(folder, `${stem}.avif`);
    if (!existsSync(destination)) await toAvif(path.join(folder, file), destination);
    renameSync(path.join(folder, file), path.join(ORIGINALS, bucket, file));
  }
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
console.log(
  `\n${count} images → AVIF: ${mb(pngBytes)} → ${mb(avifBytes)} ` +
    `(${Math.round((1 - avifBytes / pngBytes) * 100)}% smaller)`,
);
