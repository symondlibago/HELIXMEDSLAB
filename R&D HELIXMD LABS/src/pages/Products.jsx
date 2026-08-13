import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";
import PriceTag from "../components/PriceTag";
import { PENS, VIALS } from "../data/productData";

export default function Products() {
  const [tab, setTab] = useState("vials");
  // const [tier, setTier] = useState(0);
  const [query, setQuery] = useState("");

  const source = tab === "vials" ? VIALS : PENS;
  const unit = tab === "vials" ? "vial" : "pen";
  const list = source.filter((product) =>
    `${product.name} ${product.spec}`
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-white text-body">
      <section
        className="relative overflow-hidden px-6 pb-14 pt-16 text-center"
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
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy md:text-6xl">
            Research peptides, priced for scale
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-body md:text-base">
            Volume pricing on every batch — the larger the order, the lower the
            per-unit price. Every product ships with a batch-specific COA.
          </p>
        </motion.div>
      </section>
      <div className="sticky top-14 z-30 border-y border-line bg-white/90 backdrop-blur md:top-16">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-2.5 px-4 py-3 sm:px-6 md:flex md:flex-wrap md:gap-4 md:px-10 md:py-4">
          <div className="flex shrink-0 rounded-full border border-line bg-ice-100 p-1 text-[13px] md:order-1">
            {["vials", "pens"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setTab(type)}
                className={`min-h-9 rounded-full px-4 capitalize transition-colors sm:px-5 ${
                  tab === type
                    ? "bg-navy font-semibold text-white shadow-sm"
                    : "text-body hover:text-navy"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          <label className="flex min-w-0 items-center gap-2 rounded-full border border-line bg-ice-100 px-4 py-2 transition-colors focus-within:border-brand-cyan focus-within:bg-white md:order-3 md:ml-auto">
            <Search size={14} className="shrink-0 text-brand-cyan-deep" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${tab}`}
              className="w-full min-w-0 bg-transparent text-sm text-navy outline-none placeholder:text-body-soft/70 md:w-44"
            />
          </label>

          {/* ── Order volume (20+/50+/100+/200+) ──────────────────────────
              Disabled for the R&D site, which sells singles only. To restore:
              uncomment this block, the TIERS import, the `tier` state, and the
              tier-based price/saving lines in the grid below.

          <div className="col-span-2 flex items-center gap-3 md:order-2 md:col-span-1">
            <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft sm:inline">
              Order volume
            </span>
            {/* tiers stretch to fill the row on a phone so each is an easy tap *\/}
            <div className="flex w-full rounded-full border border-line bg-ice-100 p-1 text-[13px] md:w-auto">
              {TIERS.map((amount, index) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTier(index)}
                  className={`min-h-9 flex-1 rounded-full px-3 transition-colors sm:px-4 md:flex-none ${
                    tier === index
                      ? "bg-navy font-semibold text-white shadow-sm"
                      : "text-body hover:text-navy"
                  }`}
                >
                  {amount}+
                </button>
              ))}
            </div>
          </div>
          ──────────────────────────────────────────────────────────────── */}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 md:px-10">
        <p className="mb-4 text-[12px] text-body-soft sm:mb-6 sm:text-[13px]">
          {list.length} {list.length === 1 ? "product" : "products"} · price per
          single {unit}
        </p>

        {/* two up on phones so the catalog stays short to scroll */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3">
          {list.map((product, index) => {
            // Volume pricing disabled — no tier discount to advertise.
            // const saving = Math.round((1 - price / product.prices[0]) * 100);

            return (
              <motion.article
                key={product.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.4,
                  delay: (index % 3) * 0.07,
                  ease: "easeOut",
                }}
                className="group flex flex-col overflow-hidden rounded-xl border border-line bg-white shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/45 hover:shadow-[0_20px_50px_-28px_rgba(22,48,92,0.45)] sm:rounded-2xl"
              >
                {/* square on phones — a 16:10 letterbox wastes the little
                    width there is and shrinks an upright vial to nothing */}
                <Link
                  to={`/products/${product.slug}`}
                  aria-label={`View ${product.name} ${product.spec} details`}
                  className="relative block aspect-square overflow-hidden border-b border-line/70 bg-linear-to-br from-white via-ice-100 to-ice-200 sm:aspect-16/10"
                >
                  <img
                    src={product.image || "/vial.avif"}
                    alt={`${product.name} ${product.spec} ${unit}`}
                    draggable="false"
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/vial.avif";
                    }}
                    className="h-full w-full select-none object-contain p-2 transition-transform duration-500 group-hover:scale-105 sm:p-4"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <Link
                    to={`/products/${product.slug}`}
                    className="transition-colors hover:text-brand-cyan-deep"
                  >
                    <h2 className="text-[13px] font-bold leading-snug tracking-tight text-navy sm:text-base">
                      {product.name}
                    </h2>
                  </Link>

                  {/* dose folded into the meta line — as its own element it
                      either collided with the name or cost a whole extra row */}
                  <p className="mt-1 text-[10px] leading-normal text-body-soft sm:text-[11px]">
                    {product.spec}
                    <span className="hidden sm:inline"> · {product.format}</span> · COA
                    included
                  </p>

                  <div className="mt-2 mb-3 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:mt-3">
                    <PriceTag product={product} unit={unit} size="sm" />
                    {/* Tier discount badge — restore with volume pricing:
                    {saving > 0 && (
                      <span className="ml-auto rounded-full bg-brand-teal/12 px-1.5 py-0.5 text-[10px] font-semibold text-brand-teal">
                        Save {saving}%
                      </span>
                    )} */}
                  </div>

                  {/* Quiet outline rather than a solid navy slab: repeated down
                      a two-column grid the filled version out-shouted the
                      product shots. It fills in on hover/press.
                      mt-auto keeps buttons aligned when a name wraps. */}
                  <Link
                    to={`/products/${product.slug}`}
                    className="mt-auto inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-line bg-white px-3 text-[11px] font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white sm:min-h-11 sm:text-[12px]"
                  >
                    <span className="sm:hidden">View details</span>
                    <span className="hidden sm:inline">View product details</span>
                    <ArrowRight
                      size={13}
                      aria-hidden="true"
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {list.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-body">
              No {tab} match “{query}”.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 rounded-full border border-line bg-white px-5 py-2 text-sm font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep"
            >
              Clear search
            </button>
          </div>
        )}
      </section>

      <section className="border-t border-line bg-ice-100">
        <div className="mx-auto max-w-7xl px-6 py-8 md:px-10">
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