/**
 * Cross-checks the three things that have to agree: the slugs listed in
 * src/data/coaLibrary.js, the PDFs sitting in public/coa/, and the catalog in
 * src/data/productData.js. Run it after adding or replacing a certificate.
 *
 * Run from the repo root with: node scripts/check-coa.mjs
 */
import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const { VIALS } = await import("../src/data/productData.js");
const { withCoa, coaHref, COA_SLUGS } = await import(
  "../src/data/coaLibrary.js"
);

const DIR = join("public", "coa");
const documented = withCoa(VIALS);
const listed = [];
const brokenLinks = [];

for (const product of documented) {
  const file = join(DIR, `${product.slug}.pdf`);
  const label = `${product.name} ${product.spec}`.padEnd(24);
  if (existsSync(file)) {
    listed.push(`${label} ${(statSync(file).size / 1024).toFixed(0)} KB`);
  } else {
    brokenLinks.push(`${label} expected ${product.slug}.pdf`);
  }
}

// A slug in coaLibrary that no catalog product matches shows up nowhere.
const catalogSlugs = new Set(VIALS.map((p) => p.slug));
const unmatched = COA_SLUGS.filter((slug) => !catalogSlugs.has(slug));

// A PDF nothing points at just adds weight to the build.
const wanted = new Set(documented.map((p) => `${p.slug}.pdf`));
const orphans = existsSync(DIR)
  ? readdirSync(DIR).filter((f) => f.endsWith(".pdf") && !wanted.has(f))
  : [];

const undocumented = VIALS.filter((p) => !coaHref(p)).map(
  (p) => `${p.name} ${p.spec}`,
);

const report = (title, rows) => {
  if (!rows.length) return;
  console.log(`\n${title} (${rows.length})`);
  rows.forEach((row) => console.log(`  ${row}`));
};

report("Published — live in the library", listed);
report("BROKEN — listed in coaLibrary but no PDF on disk", brokenLinks);
report("BROKEN — slug in coaLibrary matches no catalog product", unmatched);
report("Orphaned — PDF nothing links to", orphans);
report("No document yet — hidden from the library", undocumented);

const problems = brokenLinks.length + unmatched.length + orphans.length;
console.log(
  `\n${listed.length}/${VIALS.length} products documented.` +
    (problems ? ` ${problems} problem(s) above.` : " No problems."),
);
