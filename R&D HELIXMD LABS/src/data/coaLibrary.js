/* ─────────────────────────── COA library ───────────────────────────────
   Only the products listed here have a certificate on file. The library on
   /coa is built from this list, so a product without a document is simply
   absent rather than shown as a dead link.

   To add one: drop the PDF in public/coa/ named after the product slug and
   add the slug below. `node scripts/check-coa.mjs` verifies both halves line
   up — it flags slugs with no file, files no product points at, and catalog
   products still waiting on a document.
   ──────────────────────────────────────────────────────────────────────── */

export const COA_DIR = "/coa";

export const COA_SLUGS = [
  "bpc-157-10-mg",
  "ghk-cu-50-mg", // ⚠ document covers a 100 mg vial; our listing is 50 mg
  "klow-10-10-10-50", // ⚠ document covers a 20 mg blend
  "nad-plus-500-mg",
  "retatrutide-10-mg",
  "retatrutide-30-mg",
  "semax-10-mg",
  "tb-500-10-mg",
  "wolverine-10-10", // supplied as "BLEND 20MG" — BPC-157 + TB-500
];

const DOCUMENTED_SET = new Set(COA_SLUGS);

/** Public path to a product's certificate, or null if there isn't one. */
export const coaHref = (product) =>
  DOCUMENTED_SET.has(product.slug) ? `${COA_DIR}/${product.slug}.pdf` : null;

export const hasCoa = (product) => DOCUMENTED_SET.has(product.slug);

/** Narrows a product list to the documented ones, in catalog order. */
export const withCoa = (products) => products.filter(hasCoa);

/* The document quoted in the "what you receive" panel on /coa. The figures
   rendered beside it are read off this certificate, so the two have to move
   together — swap this slug and update SAMPLE_COA in pages/COA.jsx. */
export const SAMPLE_COA_SLUG = "semax-10-mg";
export const SAMPLE_COA_HREF = `${COA_DIR}/${SAMPLE_COA_SLUG}.pdf`;
