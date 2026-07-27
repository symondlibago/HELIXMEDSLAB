import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";

const FONT = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" };

/* Bulk order tiers — index lines up with each product's prices array. */
const TIERS = ["20", "50", "100", "200"];

const VIALS = [
  { name: "B12", spec: "10 mg", prices: [22.5, 21.5, 20.5, 19.0] },
  { name: "BPC-157", spec: "5 mg", prices: [19.0, 18.0, 17.5, 16.0] },
  { name: "BPC-157", spec: "10 mg", prices: [34.5, 33.0, 31.5, 29.0] },
  { name: "CJC-1295 + IPA", spec: "5/5 mg", prices: [43.0, 41.0, 39.5, 36.0] },
  { name: "DSIP", spec: "5 mg", prices: [17.5, 17.0, 16.5, 15.0] },
  { name: "Epithalon", spec: "10 mg", prices: [17.5, 17.0, 16.5, 15.0] },
  { name: "GHK-Cu", spec: "50 mg", prices: [41.5, 40.0, 38.5, 35.0] },
  { name: "GLOW", spec: "10/10/50", prices: [73.0, 70.0, 67.0, 61.0] },
  { name: "Glutathione", spec: "1500 mg", prices: [37.0, 35.5, 34.0, 31.0] },
  { name: "Ipamorelin", spec: "10 mg", prices: [32.0, 31.0, 29.5, 27.0] },
  { name: "Kisspeptin", spec: "5 mg", prices: [22.5, 21.5, 20.5, 19.0] },
  { name: "KLOW", spec: "10/10/10/50", prices: [88.5, 85.0, 81.0, 74.0] },
  { name: "KPV", spec: "10 mg", prices: [28.5, 27.5, 26.0, 24.0] },
  { name: "MOTS-C", spec: "10 mg", prices: [40.5, 39.0, 37.0, 34.0] },
  { name: "MT2", spec: "10 mg", prices: [23.5, 22.5, 22.0, 20.0] },
  { name: "NAD+", spec: "500 mg", prices: [40.5, 39.0, 37.0, 34.0] },
  { name: "NAD+", spec: "1000 mg", prices: [53.5, 51.5, 49.5, 45.0] },
  { name: "Retatrutide", spec: "10 mg", prices: [52.5, 50.5, 48.0, 44.0], img: "/r10.avif" },
  { name: "Retatrutide", spec: "20 mg", prices: [63.0, 60.5, 58.0, 53.0], img: "/r20.avif" },
  { name: "Retatrutide", spec: "30 mg", prices: [79.0, 75.5, 72.5, 66.0], img: "/r30.avif" },
  { name: "Selank", spec: "10 mg", prices: [41.5, 40.0, 38.5, 35.0], img: "/sel10.avif" },
  { name: "Semax", spec: "10 mg", prices: [41.5, 40.0, 38.5, 35.0], img: "/sem10.avif" },
  { name: "Semaglutide", spec: "10 mg", prices: [29.5, 28.5, 27.5, 25.0], img: "/s10.avif" },
  { name: "Semaglutide", spec: "20 mg", prices: [35.5, 34.0, 33.0, 30.0], img: "/s20.avif" },
  { name: "Semaglutide", spec: "30 mg", prices: [55.0, 52.5, 50.5, 46.0] },
  { name: "TB-500", spec: "5 mg", prices: [33.0, 32.0, 30.5, 28.0], img: "/t5.avif" },
  { name: "TB-500", spec: "10 mg", prices: [46.5, 44.5, 42.5, 39.0], img: "/t10.avif" },
  { name: "Thymosin Alpha-1", spec: "5 mg", prices: [34.5, 33.0, 31.5, 29.0], img: "/ts5.avif" },
  { name: "Tirzepatide", spec: "10 mg", prices: [34.5, 33.0, 31.5, 29.0], img: "/tz10.avif" },
  { name: "Tirzepatide", spec: "20 mg", prices: [41.5, 40.0, 38.5, 35.0], img: "/tz20.avif" },
  { name: "Tirzepatide", spec: "30 mg", prices: [64.5, 62.0, 59.0, 54.0], img: "/tz30.avif" },
  { name: "Wolverine", spec: "10/10", prices: [53.5, 51.5, 49.5, 45.0], img: "/w10.avif" },
];

const PENS = [
  { name: "Tirzepatide Pen", spec: "40 mg", prices: [175, 165, 155, 145] },
  { name: "Retatrutide Pen", spec: "40 mg", prices: [175, 165, 155, 145] },
  { name: "Biotin Pen", spec: "40 mg", prices: [170, 160, 150, 140] },
  { name: "GLOW Pen", spec: "80 mg", prices: [175, 165, 155, 145] },
  { name: "KLOW Pen", spec: "80 mg", prices: [170, 160, 150, 140] },
  { name: "Glutathione Pen", spec: "1000 mg", prices: [170, 160, 150, 140] },
  { name: "NAD+ & B12 Pen", spec: "1000 mg", prices: [170, 160, 150, 140] },
  { name: "B Vitamin Complex Pen", spec: "1000 mg", prices: [170, 160, 150, 140] },
  { name: "Wolverine Pen", spec: "40 mg", prices: [175, 165, 155, 145] },
];

export default function Products() {
  const [tab, setTab] = useState("vials");
  const [tier, setTier] = useState(0);
  const [query, setQuery] = useState("");

  const source = tab === "vials" ? VIALS : PENS;
  const unit = tab === "vials" ? "vial" : "pen";
  const list = source.filter((p) =>
    `${p.name} ${p.spec}`.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-body" style={FONT}>
      {/* ─────────────────────── HEADER ─────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pt-16 pb-14 text-center"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% -10%, #e2eff9 0%, #f4f9fd 45%, #ffffff 78%)",
        }}
      >
        <HelixWave
          uid="products-wave"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-55"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
            Product Catalog
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-navy">
            Research peptides, priced for scale
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-body">
            Volume pricing on every batch — the larger the order, the lower the
            per-unit price. Every product ships with a batch-specific COA.
          </p>
        </motion.div>
      </section>

      {/* ─────────────────────── CONTROLS ─────────────────────── */}
      <div className="sticky top-16 z-40 border-y border-line bg-white/90 backdrop-blur">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-4">
          {/* vials / pens tabs */}
          <div className="flex rounded-full border border-line bg-ice-100 p-1 text-[13px]">
            {["vials", "pens"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-1.5 rounded-full capitalize transition-colors ${
                  tab === t
                    ? "bg-navy text-white font-semibold shadow-sm"
                    : "text-body hover:text-navy"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* order volume */}
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft">
              Order volume
            </span>
            <div className="flex rounded-full border border-line bg-ice-100 p-1 text-[13px]">
              {TIERS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setTier(i)}
                  className={`px-4 py-1.5 rounded-full transition-colors ${
                    tier === i
                      ? "bg-navy text-white font-semibold shadow-sm"
                      : "text-body hover:text-navy"
                  }`}
                >
                  {t}+
                </button>
              ))}
            </div>
          </div>

          {/* search */}
          <label className="ml-auto flex items-center gap-2 rounded-full border border-line bg-ice-100 px-4 py-2 focus-within:border-brand-cyan focus-within:bg-white transition-colors">
            <Search size={14} className="text-brand-cyan-deep" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${tab}`}
              className="w-36 md:w-44 bg-transparent text-sm text-navy placeholder:text-body-soft/70 outline-none"
            />
          </label>
        </div>
      </div>

      {/* ─────────────────────── GRID ─────────────────────── */}
      <section className="max-w-7xl mx-auto px-6 md:px-10 py-12">
        <p className="mb-6 text-[13px] text-body-soft">
          {list.length} {list.length === 1 ? "product" : "products"} · prices per{" "}
          {unit} at {TIERS[tier]}+ {unit}s
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p, i) => {
            const price = p.prices[tier];
            const save = Math.round((1 - price / p.prices[0]) * 100);
            return (
              <motion.div
                key={`${tab}-${p.name}-${p.spec}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.07, ease: "easeOut" }}
                className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm shadow-navy/5 transition-colors hover:border-brand-cyan/45"
              >
                {/* product photo — the render fills the frame; products without
                    their own render fall back to the same empty studio backdrop
                    so the grid stays consistent */}
                <div className="relative aspect-16/10 overflow-hidden bg-ice-200">
                  <img
                    src={p.img || "/vial-bg.avif"}
                    alt={p.img ? `${p.name} ${p.spec} ${unit}` : ""}
                    draggable="false"
                    className="h-full w-full object-cover select-none transition-transform duration-500 group-hover:scale-105"
                  />
                  {!p.img && (
                    <img
                      src="/helixmd-logo.png"
                      alt=""
                      draggable="false"
                      className="pointer-events-none absolute inset-0 m-auto h-5 w-auto opacity-25 select-none"
                    />
                  )}
                </div>

                {/* info */}
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-lg font-bold leading-tight tracking-tight text-navy">
                      {p.name}
                    </h3>
                    <span className="text-[11px] tracking-wide text-body-soft whitespace-nowrap">
                      {p.spec}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[11px] text-body-soft">
                    Lyophilized · COA included
                  </p>
                  <div className="mt-3 flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-navy">
                      ${price.toFixed(2)}
                      <span className="ml-1 text-[11px] font-medium text-body-soft">
                        / {unit}
                      </span>
                    </p>
                    {save > 0 && (
                      <span className="rounded-full bg-brand-teal/12 px-2 py-0.5 text-[11px] font-semibold text-brand-teal">
                        Save {save}%
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-body">No {tab} match “{query}”.</p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-navy hover:border-brand-cyan hover:text-brand-cyan-deep transition-colors"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      {/* ─────────────────── RESEARCH USE STRIP ─────────────────── */}
      <section className="border-t border-line bg-ice-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
          <p className="text-[12px] leading-relaxed text-body">
            All products are intended exclusively for laboratory research purposes.
            They are not intended for human consumption, therapeutic use, or
            diagnostic applications.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
