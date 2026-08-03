/**
 * Generates one placeholder COA PDF per vial product — laid out like a real
 * lab certificate, but watermarked SPECIMEN with every measured value written
 * as X so it can never be mistaken for analytical data. These exist purely so
 * the /coa library is wired end to end; replace public/coa/<slug>.pdf with the
 * lab-issued document and nothing else has to change.
 *
 * Run from the repo root with: node scripts/make-placeholder-coas.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const { VIALS } = await import("../src/data/productData.js");

const OUT = join("public", "coa");
mkdirSync(OUT, { recursive: true });

// ── geometry ──────────────────────────────────────────────────────────────
const W = 612;
const H = 792;
const M = 50;
const R = W - M; // right edge

// ── colours ───────────────────────────────────────────────────────────────
const NAVY = "0.086 0.188 0.361";
const CYAN = "0.055 0.549 0.769";
const BODY = "0.353 0.420 0.529";
const SOFT = "0.486 0.541 0.639";
const LINE = "0.847 0.894 0.937";
const BAND = "0.898 0.945 0.980";
const ZEBRA = "0.973 0.984 0.992";

// Helvetica advance widths (per 1000 units) for printable ASCII 32..126.
const WIDTHS = [
  278, 278, 355, 556, 556, 889, 667, 191, 333, 333, 389, 584, 278, 333, 278,
  278, 556, 556, 556, 556, 556, 556, 556, 556, 556, 556, 278, 278, 584, 584,
  584, 556, 1015, 667, 667, 722, 722, 667, 611, 778, 722, 278, 500, 667, 556,
  833, 722, 778, 667, 778, 722, 667, 611, 722, 667, 944, 667, 667, 611, 278,
  278, 278, 469, 556, 333, 556, 556, 500, 556, 556, 278, 556, 556, 222, 222,
  500, 222, 833, 556, 556, 556, 556, 333, 500, 278, 556, 500, 722, 500, 500,
  500, 334, 260, 334, 584,
];
// Helvetica-Bold deltas: bold is wider; scale is close enough for centring.
const textWidth = (str, size, bold) => {
  let total = 0;
  for (const ch of String(str)) {
    const code = ch.charCodeAt(0);
    total += code >= 32 && code <= 126 ? WIDTHS[code - 32] : 556;
  }
  return (total / 1000) * size * (bold ? 1.08 : 1);
};

// ── content-stream builders ───────────────────────────────────────────────
/* The file is written as latin1, so anything outside WinAnsi has to become an
   octal escape (or plain ASCII) here or it silently turns into a wrong byte. */
const esc = (s) =>
  String(s)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    .replace(/—/g, "\\227") // em dash
    .replace(/≥/g, ">=")
    .replace(/·/g, "\\267"); // middle dot

const ops = [];
const put = (line) => ops.push(line);

const text = (str, x, y, { size = 9, bold = false, color = BODY, align = "left" } = {}) => {
  const font = bold ? "/F2" : "/F1";
  const w = textWidth(str, size, bold);
  const tx = align === "center" ? x - w / 2 : align === "right" ? x - w : x;
  put(`BT ${color} rg ${font} ${size} Tf 1 0 0 1 ${tx.toFixed(2)} ${y.toFixed(2)} Tm (${esc(str)}) Tj ET`);
};

const rect = (x, y, w, h, color) =>
  put(`${color} rg ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);

const hline = (x1, x2, y, color = LINE, width = 0.7) =>
  put(
    `${color} RG ${width} w ${x1.toFixed(2)} ${y.toFixed(2)} m ${x2.toFixed(2)} ${y.toFixed(2)} l S`,
  );

const box = (x, y, w, h, color = LINE, width = 0.7) =>
  put(`${color} RG ${width} w ${x.toFixed(2)} ${y.toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re S`);

// ── one document ──────────────────────────────────────────────────────────
function buildPage(product) {
  ops.length = 0;
  const title = `${product.name} ${product.spec}`;

  /* ── watermark, drawn first so everything else sits on top ── */
  put("q 0.925 0.949 0.969 rg BT /F2 62 Tf 0.766 0.643 -0.643 0.766 96 250 Tm (SPECIMEN) Tj ET Q");

  let y = H - M;

  /* ── letterhead ── */
  text("HELIXMD", M, y - 20, { size: 21, bold: true, color: NAVY });
  text("LABS", M + textWidth("HELIXMD ", 21, true), y - 20, { size: 21, bold: true, color: CYAN });
  text("RESEARCH PEPTIDES", M + 1, y - 32, { size: 6.5, bold: true, color: SOFT });

  text("Certificate of Analysis", R, y - 18, { size: 17, bold: true, color: CYAN, align: "right" });
  text("helixmdlabs.com", R, y - 31, { size: 7.5, color: SOFT, align: "right" });
  text("support@helixmdlabs.com", R, y - 41, { size: 7.5, color: CYAN, align: "right" });

  y -= 52;
  hline(M, R, y, CYAN, 1.4);

  /* ── specimen notice ── */
  y -= 26;
  rect(M, y - 4, R - M, 30, "0.996 0.953 0.918");
  box(M, y - 4, R - M, 30, "0.949 0.788 0.639");
  text("SPECIMEN — layout placeholder, not a certificate.", M + 12, y + 15, {
    size: 8.5,
    bold: true,
    color: "0.639 0.376 0.086",
  });
  text(
    "Replace this file with the lab-issued COA for the lot supplied. Values shown as X are placeholders.",
    M + 12, y + 4, { size: 7.5, color: "0.639 0.427 0.208" },
  );

  /* ── accession block ── */
  y -= 22;
  const rows = [
    ["Client", "HelixMD Labs"],
    ["Accession #", "XXXXXXXXXX"],
    ["Search Code", "PeptXXXXXXXXXX"],
    ["Received", "XX / XX / XXXX"],
    ["Reported", "XX / XX / XXXX"],
    ["Lot", "XXXX"],
  ];
  const blockTop = y;
  const blockH = rows.length * 15 + 10;
  box(M, y - blockH, R - M, blockH);

  const labelX = R - 150;
  rows.forEach(([k, v], i) => {
    const ry = blockTop - 17 - i * 15;
    text(`${k}:`, labelX, ry, { size: 8.5, bold: true, color: NAVY, align: "right" });
    text(v, labelX + 20, ry, { size: 8.5, color: BODY });
  });

  // product identity sits to the left of the accession rows
  text(title, M + 14, blockTop - 26, { size: 13, bold: true, color: NAVY });
  text(product.format, M + 14, blockTop - 40, { size: 8.5, color: BODY });
  text("Research use only", M + 14, blockTop - 52, { size: 8.5, color: SOFT });

  y = blockTop - blockH;

  /* ── sample summary ── */
  const band = (label, yTop) => {
    rect(M, yTop - 17, R - M, 17, BAND);
    text(label, (M + R) / 2, yTop - 12.5, { size: 9, bold: true, color: CYAN, align: "center" });
    return yTop - 17;
  };

  y = band("Sample Summary", y - 20);

  const mid = M + (R - M) * 0.58;
  const summary = [
    ["Product", title, "Purity", "XX.XX %"],
    ["Identity", "Confirmed", "Net Content", "XX.XX mg"],
    ["Appearance", "White lyophilized powder", "Method", "HPLC-UV / LC-MS"],
  ];
  summary.forEach(([k1, v1, k2, v2], i) => {
    const rowY = y - i * 20;
    if (i % 2 === 1) rect(M, rowY - 20, R - M, 20, ZEBRA);
    hline(M, R, rowY - 20);
    text(k1, M + 10, rowY - 13.5, { size: 8.5, bold: true, color: NAVY });
    text(v1, M + 82, rowY - 13.5, { size: 8.5, color: BODY });
    text(k2, mid + 10, rowY - 13.5, { size: 8.5, bold: true, color: NAVY });
    text(v2, mid + 78, rowY - 13.5, { size: 8.5, color: BODY });
  });
  y -= summary.length * 20;
  box(M, y, R - M, summary.length * 20);
  put(`${LINE} RG 0.7 w ${mid.toFixed(2)} ${y.toFixed(2)} m ${mid.toFixed(2)} ${(y + summary.length * 20).toFixed(2)} l S`);

  /* ── analytical results ── */
  y = band("Analytical Results", y - 22);

  const results = [
    ["Test", "Method", "Result", "Specification"],
    ["Identity", "LC-MS", product.name, "Conforms"],
    ["Purity", "HPLC-UV", "XX.XX %", "\u2265 98.0 %"],
    ["Net content", "Gravimetric", "XX.XX mg", product.spec],
    ["Appearance", "Visual", "White lyophilized powder", "Conforms"],
    ["Endotoxin", "LAL", "XX.X EU/mg", "Report result"],
  ];
  const cols = [M + 10, M + 150, M + 290, R - 10];
  results.forEach((row, i) => {
    const rowY = y - i * 19;
    if (i === 0) rect(M, rowY - 19, R - M, 19, ZEBRA);
    hline(M, R, rowY - 19);
    row.forEach((cell, c) => {
      text(cell, cols[c], rowY - 12.5, {
        size: 8.5,
        bold: i === 0,
        color: i === 0 ? NAVY : c === 0 ? NAVY : BODY,
        align: c === 3 ? "right" : "left",
      });
    });
  });
  y -= results.length * 19;
  box(M, y, R - M, results.length * 19);

  /* ── method note ── */
  y -= 26;
  rect(M, y - 3, R - M, 20, ZEBRA);
  text("Method:", M + 10, y + 4, { size: 8, bold: true, color: NAVY });
  text(
    "High-performance liquid chromatography with UV detection, coupled with mass spectrometry (LC-MS).",
    M + 48, y + 4, { size: 8, color: BODY },
  );

  /* ── chromatogram placeholder ── */
  y -= 20;
  text("Chromatogram", M, y - 4, { size: 8, bold: true, color: NAVY });
  const chartH = 110;
  y -= 12;
  box(M, y - chartH, R - M, chartH);
  // axes
  put(`${LINE} RG 0.7 w ${(M + 40).toFixed(2)} ${(y - chartH + 26).toFixed(2)} m ${(R - 24).toFixed(2)} ${(y - chartH + 26).toFixed(2)} l S`);
  put(`${LINE} RG 0.7 w ${(M + 40).toFixed(2)} ${(y - chartH + 26).toFixed(2)} m ${(M + 40).toFixed(2)} ${(y - 16).toFixed(2)} l S`);
  text("mAU", M + 14, y - 22, { size: 7, color: SOFT });
  text("min", R - 40, y - chartH + 14, { size: 7, color: SOFT });
  text("Chromatogram from the lab-issued report appears here.", (M + R) / 2, y - chartH / 2, {
    size: 8.5,
    color: SOFT,
    align: "center",
  });

  /* ── footer ── */
  const fy = M + 26;
  hline(M, R, fy + 22, LINE);
  text(
    "This document is issued against a single production lot. For research use only \u2014 not for human or veterinary use,",
    M, fy + 10, { size: 7.5, color: SOFT },
  );
  text(
    "food, drug, or household purposes. HelixMD Labs \u00b7 helixmdlabs.com \u00b7 support@helixmdlabs.com",
    M, fy, { size: 7.5, color: SOFT },
  );
  text(title, R, fy, { size: 7.5, bold: true, color: SOFT, align: "right" });

  return ops.join("\n");
}

// ── PDF assembly ──────────────────────────────────────────────────────────
function toPdf(stream, title) {
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>`,
    `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Title (${esc(title)}) /Producer (HelixMD Labs) >>`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];
  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xref = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((o) => {
    pdf += `${String(o).padStart(10, "0")} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R /Info ${objects.length} 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}

let bytes = 0;
for (const product of VIALS) {
  const buf = toPdf(buildPage(product), `HelixMD Labs COA \u2014 ${product.name} ${product.spec}`);
  writeFileSync(join(OUT, `${product.slug}.pdf`), buf);
  bytes += buf.length;
}
console.log(`wrote ${VIALS.length} PDFs, ${(bytes / 1024).toFixed(0)} KB total`);
