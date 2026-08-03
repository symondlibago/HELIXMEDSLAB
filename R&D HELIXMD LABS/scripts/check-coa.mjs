/**
 * Reports which products still have no certificate in public/coa/, and which
 * of the files present are still the watermarked placeholders. Run this after
 * dropping real lab PDFs in, to confirm nothing was missed or misnamed.
 *
 * Run from the repo root with: node scripts/check-coa.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const { VIALS } = await import("../src/data/productData.js");

const DIR = join("public", "coa");
const missing = [];
const placeholder = [];
const real = [];

for (const product of VIALS) {
  const file = join(DIR, `${product.slug}.pdf`);
  const label = `${product.name} ${product.spec}`.padEnd(28);

  if (!existsSync(file)) {
    missing.push(`${label} ${product.slug}.pdf`);
    continue;
  }
  // The generator stamps this word into the page content stream.
  const isPlaceholder = readFileSync(file, "latin1").includes("(SPECIMEN)");
  (isPlaceholder ? placeholder : real).push(
    `${label} ${(statSync(file).size / 1024).toFixed(0)} KB`,
  );
}

const report = (title, rows) => {
  if (!rows.length) return;
  console.log(`\n${title} (${rows.length})`);
  rows.forEach((row) => console.log(`  ${row}`));
};

report("Missing — no PDF at the expected filename", missing);
report("Placeholder — still the generated specimen", placeholder);
report("Real — lab-issued document in place", real);

// Files that don't match any product slug are dead weight in the build.
const known = new Set(VIALS.map((p) => `${p.slug}.pdf`));
const orphans = existsSync(DIR)
  ? readdirSync(DIR).filter((f) => f.endsWith(".pdf") && !known.has(f))
  : [];
report("Orphaned — no product uses this file", orphans);

console.log(
  `\n${real.length}/${VIALS.length} products have a real COA.` +
    (missing.length ? ` ${missing.length} missing.` : ""),
);
