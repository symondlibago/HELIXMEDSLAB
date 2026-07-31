// useEffect/useState come back with the order-volume selector below.
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronRight,
  FileCheck2,
  FlaskConical,
  Microscope,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import Footer from "../components/Footer";
import {
  ALL_PRODUCTS,
  getProductBySlug,
  getSinglePrice,
} from "../data/productData";
// Volume pricing is off for the R&D site — restore with the “Select order
// volume” block below: add TIERS back to the import above.

const QUALITY_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Quality focused",
    text: "Every batch follows defined quality-control and documentation workflows.",
  },
  {
    icon: FileCheck2,
    title: "Batch-specific COA",
    text: "Analytical documentation is associated with the relevant production batch.",
  },
  {
    icon: PackageCheck,
    title: "Research-ready supply",
    text: "Designed for organized handling, storage, and qualified laboratory workflows.",
  },
];

export default function ProductDetails() {
  const { productSlug } = useParams();
  const product = getProductBySlug(productSlug);
  // const [tier, setTier] = useState(0);
  //
  // useEffect(() => {
  //   setTier(0);
  // }, [productSlug]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return ALL_PRODUCTS.filter(
      (item) =>
        item.category === product.category && item.slug !== product.slug,
    ).slice(0, 3);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-ice text-body">
        <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-20 text-center">
          <div className="w-full rounded-3xl border border-line bg-white p-8 shadow-[0_24px_80px_-48px_rgba(22,48,92,0.45)] sm:p-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cyan-deep">
              Product not found
            </p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              This product detail page is unavailable.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-base">
              The product may have been renamed or removed from the current catalog.
            </p>
            <Link
              to="/products"
              className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-6 text-sm font-semibold text-white transition-colors hover:bg-navy-600"
            >
              <ArrowLeft size={16} />
              Return to catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const price = getSinglePrice(product);
  // const price = product.prices[tier];
  // const saving = Math.round((1 - price / product.prices[0]) * 100);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-body">
      <main>
        <section className="border-b border-line/80 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-5 md:px-10">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-[12px] font-medium text-body-soft"
            >
              <Link
                to="/products"
                className="transition-colors hover:text-navy"
              >
                Products
              </Link>
              <ChevronRight size={13} aria-hidden="true" />
              <span className="capitalize">{product.category}</span>
              <ChevronRight size={13} aria-hidden="true" />
              <span className="text-navy">{product.name}</span>
            </nav>
          </div>
        </section>

        <section className="relative overflow-hidden bg-white">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_10%,rgba(23,168,224,0.11),transparent_34%)]" />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative min-h-[390px] overflow-hidden rounded-[30px] border border-line bg-linear-to-br from-white via-ice-100 to-ice-200 shadow-[0_30px_90px_-52px_rgba(22,48,92,0.55)] sm:min-h-[500px]">
                <div className="absolute left-5 top-5 z-10 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold text-navy shadow-sm backdrop-blur">
                    <BadgeCheck size={14} className="text-brand-cyan-deep" />
                    Batch COA included
                  </span>
                  <span className="rounded-full border border-white/80 bg-white/90 px-3 py-1.5 text-[11px] font-semibold capitalize text-navy shadow-sm backdrop-blur">
                    {product.category}
                  </span>
                </div>

                <div className="absolute inset-x-[12%] bottom-5 top-16 rounded-full bg-white/45 blur-3xl" />

                <img
                  src={product.image || "/vial.avif"}
                  alt={`${product.name} ${product.spec} ${product.unit}`}
                  draggable="false"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/vial.avif";
                  }}
                  className="relative z-[1] h-full min-h-[390px] w-full select-none object-contain p-8 sm:min-h-[500px] sm:p-12"
                />
              </div>

              <div className="mt-4 flex items-center justify-between px-1 text-[11px] text-body-soft">
                <span>Product image for reference</span>
                <span className="uppercase tracking-[0.14em]">Research use only</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: "easeOut" }}
              className="flex flex-col justify-center"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-brand-cyan/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-cyan-deep">
                  {product.format}
                </span>
                <span className="rounded-full border border-line bg-white px-3 py-1.5 text-[11px] font-semibold text-body">
                  {product.spec}
                </span>
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-[-0.045em] text-navy sm:text-5xl lg:text-[58px] lg:leading-[1.02]">
                {product.name}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-body sm:text-base">
                {product.summary}
              </p>

              <div className="mt-8 rounded-2xl border border-line bg-[#fbfdff] p-4 sm:p-5">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-body-soft">
                      Price per single {product.unit}
                    </p>
                    <p className="mt-1 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                      ${price.toFixed(2)}
                    </p>
                  </div>

                  {/* Tier discount badge — restore with volume pricing:
                  {saving > 0 && (
                    <span className="rounded-full bg-brand-teal/10 px-3 py-1.5 text-xs font-semibold text-brand-teal">
                      Save {saving}%
                    </span>
                  )} */}
                </div>

                {/* ── Select order volume ─────────────────────────────
                    Disabled for the R&D site (singles only). Restore this
                    block together with the TIERS import, the `tier` state
                    and the tier-based price/saving lines above.
                ──────────────────────────────────────────────────── */}
              </div>

              <ul className="mt-6 grid gap-3 text-[13px] text-navy sm:grid-cols-2">
                {[
                  "Batch-specific COA",
                  "Single-unit pricing",
                  "Controlled packaging",
                  "Research use only",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-brand-cyan-deep">
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/contact"
                  className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-navy px-6 text-sm font-semibold text-white shadow-[0_14px_34px_-16px_rgba(22,48,92,0.65)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy-600"
                >
                  Request product information
                  <ArrowRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </Link>

                <Link
                  to="/products"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 text-sm font-semibold text-navy transition-colors hover:border-brand-cyan/50 hover:bg-ice"
                >
                  <ArrowLeft size={15} />
                  Back to catalog
                </Link>
              </div>

              <p className="mt-4 text-[11px] leading-relaxed text-body-soft">
                Pricing shown is per single {product.unit}. Availability and batch
                documentation can be confirmed before ordering.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="border-y border-line bg-[#f8fafc]">
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cyan-deep">
                Product standards
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy sm:text-4xl">
                Designed for confident research procurement
              </h2>
              <p className="mt-4 text-sm leading-7 text-body sm:text-base">
                Clear product information, transparent volume pricing, and
                quality documentation are presented together so research teams
                can evaluate each catalog item efficiently.
              </p>
            </div>

            <div className="mt-9 grid gap-4 md:grid-cols-3">
              {QUALITY_ITEMS.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-line bg-white p-6 shadow-sm shadow-navy/5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ice-100 text-navy">
                    <Icon size={21} strokeWidth={1.8} />
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-navy">{title}</h3>
                  <p className="mt-2 text-[13px] leading-6 text-body">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-6 py-14 md:px-10 md:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cyan-deep">
                Handling overview
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">
                Clear details at a glance
              </h2>
              <p className="mt-4 text-sm leading-7 text-body">
                Product-specific handling requirements should follow the
                accompanying documentation and your laboratory’s validated
                procedures.
              </p>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-line bg-white sm:grid-cols-2">
              {[
                {
                  icon: FlaskConical,
                  label: "Format",
                  value: product.format,
                },
                {
                  icon: Microscope,
                  label: "Intended context",
                  value: "Qualified laboratory research",
                },
                {
                  icon: BadgeCheck,
                  label: "Documentation",
                  value: "Batch-specific COA included",
                },
                {
                  icon: ShieldCheck,
                  label: "Use restriction",
                  value: "Not for human consumption",
                },
              ].map(({ icon: Icon, label, value }, index) => (
                <div
                  key={label}
                  className={`flex gap-4 p-5 sm:p-6 ${
                    index < 2 ? "border-b border-line" : ""
                  } ${
                    index % 2 === 0
                      ? "sm:border-r sm:border-line"
                      : ""
                  }`}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-ice-100 text-brand-cyan-deep">
                    <Icon size={18} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-body-soft">
                      {label}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-navy">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="border-t border-line bg-ice-100/70">
            <div className="mx-auto max-w-7xl px-6 py-14 md:px-10 md:py-20">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-cyan-deep">
                    Continue exploring
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-navy">
                    Related products
                  </h2>
                </div>

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-cyan-deep"
                >
                  View full catalog
                  <ArrowRight size={15} />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/products/${item.slug}`}
                    className="group overflow-hidden rounded-2xl border border-line bg-white shadow-sm shadow-navy/5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-cyan/45 hover:shadow-lg"
                  >
                    <div className="aspect-16/10 bg-linear-to-br from-white via-ice-100 to-ice-200">
                      <img
                        src={item.image || "/vial.avif"}
                        alt={`${item.name} ${item.spec}`}
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/vial.avif";
                        }}
                        className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-4 p-5">
                      <div>
                        <h3 className="font-bold text-navy">{item.name}</h3>
                        <p className="mt-1 text-xs text-body-soft">{item.spec}</p>
                      </div>
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-navy transition-colors group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                        <ArrowRight size={15} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="border-t border-line bg-navy">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-8 text-white md:px-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-brand-cyan">
                Important notice
              </p>
              <p className="mt-2 max-w-3xl text-[12px] leading-relaxed text-white/70">
                This product is intended exclusively for laboratory research.
                It is not intended for human consumption, therapeutic use, or
                diagnostic applications.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/8 px-5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-navy"
            >
              Contact our team
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}