import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import {
  ArrowRight,
  Download,
  FileCheck2,
  FileText,
  FlaskConical,
  Microscope,
  Search,
  ShieldCheck,
} from "lucide-react";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";
import { VIALS } from "../data/productData";
import { SUPPORT_EMAIL } from "../data/legalContent";
import { coaHref, SAMPLE_COA_HREF, withCoa } from "../data/coaLibrary";

/* Read off the Semax 10 mg certificate (SAMPLE_COA_SLUG) — keep the two in
   step, this panel is meant to quote a document a visitor can open. */
const SAMPLE_COA = [
  ["Product", "Semax 10 mg"],
  ["Lot", "10B"],
  ["Identity (LC-MS)", "Confirmed"],
  ["Purity (HPLC-UV)", "99.20 %"],
  ["Net content", "10.02 mg"],
  ["Appearance", "White lyophilized powder"],
];

const WHAT_IS_TESTED = [
  {
    icon: Microscope,
    title: "Identity",
    text: "Mass spectrometry confirms the compound matches its stated sequence.",
  },
  {
    icon: FlaskConical,
    title: "Purity",
    text: "High-performance liquid chromatography quantifies purity against specification.",
  },
  {
    icon: FileCheck2,
    title: "Appearance & handling",
    text: "Physical form and packaging are checked before a batch is released.",
  },
];

export default function COA() {
  const lenis = useLenis();
  const [query, setQuery] = useState("");

  const jumpToLibrary = () => {
    const target = document.getElementById("library");
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -80, duration: 1 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  // Only products with a document on file — the rest would be dead links.
  const documented = useMemo(() => withCoa(VIALS), []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return documented;
    return documented.filter((p) =>
      `${p.name} ${p.spec}`.toLowerCase().includes(q),
    );
  }, [documented, query]);

  return (
    <div className="min-h-screen bg-white">
      {/* ─────────────────────── HEADER ─────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pb-14 pt-16 text-center"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% -10%, #e2eff9 0%, #f4f9fd 45%, #ffffff 78%)",
        }}
      >
        <HelixWave
          uid="coa-wave"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-55"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
            Documentation
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
            Certificates of Analysis
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-body md:text-base">
            Third-party analysis, published as issued by the testing lab. Open
            any document below — for a product that isn’t listed yet, send us
            the lot number and we’ll return its certificate.
          </p>

          {/* Lenis owns the scroll, and a bare #hash href fights it — so jump
              through lenis and fall back to the native behaviour. */}
          <button
            type="button"
            onClick={jumpToLibrary}
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600 sm:text-sm"
          >
            <FileText size={15} />
            Browse the COA library
          </button>
        </motion.div>
      </section>

      {/* ─────────────────── WHAT EVERY COA COVERS ─────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-5">
          {WHAT_IS_TESTED.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-line bg-linear-to-b from-white to-ice-100 p-5 shadow-sm shadow-navy/5 sm:p-6"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan-deep">
                <Icon size={16} />
              </span>
              <h2 className="mt-4 text-sm font-bold text-navy sm:text-base">
                {title}
              </h2>
              <p className="mt-1.5 text-[13px] leading-relaxed text-body">{text}</p>
            </div>
          ))}
        </div>

        {/* ─────────────── SAMPLE DOCUMENT ─────────────── */}
        <div className="mt-10 grid items-center gap-8 md:mt-14 lg:grid-cols-2 lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cyan-deep">
              What you receive
            </p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-navy sm:text-3xl md:text-4xl">
              A document tied to your batch
            </h2>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-body sm:text-[15px]">
              A COA is issued against the specific lot you received — not a
              generic specification sheet. It records the identity and purity
              results for that batch, the analytical methods used, and the
              intended use of the material.
            </p>
            <p className="mt-4 max-w-md text-[13px] leading-relaxed text-body-soft">
              If the lot printed on your vial differs from the document below,
              send us the lot number and we will return the matching certificate.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={SAMPLE_COA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600 sm:text-sm"
              >
                <FileText size={15} />
                Open a sample COA
              </a>
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Certificate%20of%20Analysis%20request`}
                className="text-[13px] font-semibold text-brand-cyan-deep transition-colors hover:text-navy sm:text-sm"
              >
                Request a specific lot
              </a>
            </div>
          </div>

          {/* specimen card */}
          <div className="rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5 sm:p-8">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-body-soft">
                Certificate of Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-teal">
                <ShieldCheck size={13} /> Verified
              </span>
            </div>
            <dl className="mt-2 divide-y divide-line">
              {SAMPLE_COA.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft">
                    {k}
                  </dt>
                  <dd className="text-sm font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-4 rounded-lg bg-ice-100 px-3 py-2 text-[11px] leading-relaxed text-body-soft">
              Read from the Semax 10 mg certificate. Figures on your COA reflect
              the batch you received.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────── PER-PRODUCT INDEX ─────────────────── */}
      <section id="library" className="scroll-mt-24 border-t border-line bg-ice-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl">
                COA library for each product
              </h2>
              <p className="mt-1.5 text-[13px] text-body">
                {list.length} {list.length === 1 ? "document" : "documents"} ·
                opens as a PDF in a new tab
              </p>
            </div>

            {/* A search box over a list this short is just chrome — it earns
                its place once the library outgrows a glance. */}
            {documented.length > 12 && (
              <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-line bg-white px-4 py-2 transition-colors focus-within:border-brand-cyan sm:max-w-xs">
                <Search size={14} className="shrink-0 text-brand-cyan-deep" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search products"
                  className="w-full min-w-0 bg-transparent text-sm text-navy outline-none placeholder:text-body-soft/70"
                />
              </label>
            )}
          </div>

          {/* Whole card is the link — the PDF is the only thing anyone comes
              to this list for, so a small "view" target would just be a
              smaller tap area for the same action. */}
          <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((product) => (
              <li key={product.slug}>
                <a
                  href={coaHref(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open the Certificate of Analysis for ${product.name} ${product.spec} (PDF, new tab)`}
                  className="group flex h-full items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/45 hover:shadow-[0_18px_40px_-26px_rgba(22,48,92,0.5)] sm:p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan-deep transition-colors group-hover:bg-brand-cyan group-hover:text-white">
                    <FileCheck2 size={15} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-bold text-navy sm:text-sm">
                      {product.name}
                    </p>
                    <p className="text-[11px] text-body-soft">
                      {product.spec} · PDF
                    </p>
                  </div>
                  <Download
                    size={15}
                    aria-hidden="true"
                    className="shrink-0 text-body-soft transition-colors group-hover:text-brand-cyan-deep"
                  />
                </a>
              </li>
            ))}
          </ul>

          {list.length === 0 && (
            <div className="py-14 text-center">
              <p className="text-body">No products match “{query}”.</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep"
              >
                Clear search
              </button>
            </div>
          )}

          <p className="mt-6 text-[12px] leading-relaxed text-body-soft">
            Working through the rest of the catalog. For a product not listed
            here,{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Certificate%20of%20Analysis%20request`}
              className="font-semibold text-brand-cyan-deep transition-colors hover:text-navy"
            >
              ask us for the certificate
            </a>{" "}
            covering your lot.
          </p>
        </div>
      </section>

      {/* ─────────────────── CLOSING ─────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:px-10">
        <div className="rounded-2xl border border-line bg-white p-6 text-center shadow-sm shadow-navy/5 sm:p-10">
          <h2 className="text-xl font-semibold tracking-tight text-navy sm:text-2xl">
            Need documentation before ordering?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-[14px] leading-relaxed text-body">
            Our team can share the analytical documentation for a current batch so
            you can review it ahead of time.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600 sm:text-sm"
            >
              Contact our team <ArrowRight size={15} />
            </Link>
            <Link
              to="/products"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-6 text-[13px] font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep sm:text-sm"
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
