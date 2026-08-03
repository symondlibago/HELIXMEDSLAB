/* ─────────────────────────── COA library ───────────────────────────────
   Every vial product resolves to a PDF in `public/coa/`, named after the
   product slug (e.g. /coa/bpc-157-5-mg.pdf).

   ⚠ The files currently in public/coa/ are SPECIMEN placeholders. They are
   watermarked and their result cells read "XX.XX" so nobody mistakes them
   for real analytical data. To go live, drop the lab-issued PDF over the
   matching filename — no code change is needed anywhere.

   To confirm which slugs need a file:  node scripts/check-coa.mjs
   ──────────────────────────────────────────────────────────────────────── */

export const COA_DIR = "/coa";

/** Public path to a product's certificate. */
export const coaHref = (product) => `${COA_DIR}/${product.slug}.pdf`;

/** A representative document, used for the "sample COA" link on /coa. */
export const SAMPLE_COA_SLUG = "bpc-157-5-mg";
export const SAMPLE_COA_HREF = `${COA_DIR}/${SAMPLE_COA_SLUG}.pdf`;
