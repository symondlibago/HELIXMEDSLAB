import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Package,
  ShieldCheck,
  Dna,
  ClipboardList,
  ArrowRight,
  FlaskConical,
  BadgeCheck,
} from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import HelixWave from "./HelixWave";
import Footer from "./Footer";
import {
  createProductSlug,
  getProductBySlug,
  getSinglePrice,
} from "../data/productData";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const FEATURES = [
  ["Research First", "Every product is developed for laboratory research applications."],
  ["Third-Party Tested", "Each batch undergoes independent analytical testing."],
  ["High Purity", "Manufactured with strict quality control and documented consistency."],
  ["Fast & Secure Shipping", "Carefully packaged and shipped with reliability in mind."],
];

const PRODUCT_IMAGE_EXTENSION = "png";
const productImage = (filename) =>
  `/product images/vial/${filename}.${PRODUCT_IMAGE_EXTENSION}`;

/* Prices are read from the catalog rather than hard-coded, so the homepage
   can't drift out of step with /products. (It already had: this listed
   Retatrutide 20 mg at $52.50, which is the 10 mg base price.) */
const featured = (name, spec, filename) => {
  const product = getProductBySlug(createProductSlug(name, spec));
  return {
    name,
    dose: spec,
    price: product ? getSinglePrice(product).toFixed(2) : null,
    image: productImage(filename),
  };
};

const PRODUCTS = [
  featured("Retatrutide", "20 mg", "RETA (20)"),
  featured("Semaglutide", "20 mg", "SEMA (20)"),
  featured("NAD+", "1000 mg", "NAD+ (1000)"),
];

const PURITY_FEATURES = [
  {
    label: "High purity standards",
    icon: ShieldCheck,
  },
  {
    label: "Batch-specific COAs",
    icon: Dna,
  },
  {
    label: "Third-party laboratory testing",
    icon: ClipboardList,
  },
  {
    label: "Research use only",
    icon: FlaskConical,
  },
];

const COA_ROWS = [
  ["Lot", "HRL-2617"],
  ["Identity", "Confirmed"],
  ["Method", "HPLC / MS"],
  ["Appearance", "Lyophilized solid"],
  ["Intended Use", "Laboratory research"],
];

/* The badge row printed along the bottom of the carton. */
const HERO_BADGES = [
  [<FlaskConical size={15} key="i" />, "Advanced formulation"],
  [<Search size={15} key="i" />, "Research driven"],
  [<ShieldCheck size={15} key="i" />, "Third-party tested"],
  [<BadgeCheck size={15} key="i" />, "99%+ purity"],
];

const FAQS = [
  [
    "Are your peptides tested?",
    "Yes. Every batch undergoes analytical testing to verify purity and identity before becoming available.",
  ],
  [
    "Are Certificates of Analysis available?",
    "Yes. Batch-specific Certificates of Analysis are available so researchers can review testing data for each product.",
  ],
  [
    "Who are your products intended for?",
    "Our products are intended exclusively for qualified researchers and laboratory professionals.",
  ],
  [
    "How are products shipped?",
    "Orders are carefully packaged and shipped securely to help preserve product integrity in transit.",
  ],
];

const Eyebrow = ({ children, className = "" }) => (
  <p
    className={`text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cyan-deep ${className}`}
  >
    {children}
  </p>
);

const Section = ({ children, className = "", ...props }) => (
  <motion.section
    variants={reveal}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-80px" }}
    className={className}
    {...props}
  >
    {children}
  </motion.section>
);

export default function Home() {
  return (
    <div className="bg-white text-body antialiased">
      {/* ───────────────────────── HERO ───────────────────────── */}
      <header
        id="top"
        className="relative flex min-h-[86vh] items-start overflow-hidden bg-white md:min-h-[580px] md:items-center lg:min-h-[640px]"
      >
        {/* <picture> rather than two <img> tags so only the matching file is
            fetched — a display:none image still downloads. Both breakpoints now
            use the same treatment: a full-bleed backdrop with the copy laid
            over it, matching the partner site. No wash is needed — the left
            70% of the portrait artwork measures 189–248 luminance, so navy
            type clears 5.5:1 contrast against it at its darkest.

            object-bottom on desktop, not object-center: the box is ~2.2:1 but
            the artwork is 1.82:1, so ~15% has to be cropped vertically.
            Centred, that split the loss and sliced the base off the vial.
            Anchoring to the bottom takes it all off the empty top instead and
            keeps the vial and its reflection whole. */}
        <picture>
          <source media="(min-width: 768px)" srcSet="/newhero1.avif" />
          <img
            src="/mobile-hero.avif"
            alt="HelixMD Labs research-grade peptide vial"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center md:object-bottom"
          />
        </picture>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-12 pb-14 md:px-10 md:py-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="max-w-xl"
          >
            {/* written out rather than using <Eyebrow> so the phone size can be
                dialled down — the shared component hard-codes text-[11px], and
                a second font-size class beside it resolves unpredictably */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-cyan-deep sm:text-[11px] sm:tracking-[0.28em]">
              Premium Quality
            </p>
            <h1 className="mt-3 text-[26px] font-bold leading-[1.05] tracking-tight text-navy sm:mt-4 sm:text-4xl sm:leading-[0.95] md:mt-5 md:text-7xl">
              RESEARCH GRADE PEPTIDES
            </h1>
            {/* held to ~72% of a phone's width so the copy stays on the bright
                left side of the artwork rather than running across the vial */}
            <p className="mt-3 max-w-68 text-[13px] leading-relaxed text-body sm:mt-4 sm:max-w-sm sm:text-[15px] md:mt-6 md:max-w-md md:text-base">
              Precision-made peptides designed to support research with dependable
              quality and consistency.
            </p>

            {/* items-start, not items-stretch: stretched inside the 17rem
                column the pills were 272px wide and ran under the vial. Sized
                to their own labels they come in around 150px. */}
            <div className="mt-6 flex flex-col items-start gap-2.5 sm:mt-7 sm:flex-row sm:gap-4 md:mt-9">
              <Link
                to="/products"
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-lg shadow-navy/15 transition-colors hover:bg-navy-600 sm:min-h-12 sm:px-7 sm:text-sm"
              >
                Browse products
              </Link>
              <a
                href="#process"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white/70 px-6 text-[13px] font-semibold text-navy backdrop-blur-sm transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep sm:min-h-12 sm:px-7 sm:text-sm"
              >
                Learn our process
              </a>
            </div>

            {/* A grid rather than flex-wrap so all four sit on an even 2x2:
                wrapping laid them out by label length, which left ragged rows
                and no shared left edge between the two columns.
                items-start keeps the icon aligned to the first line when a
                label wraps, so every row starts at the same height. */}
            <ul className="mt-7 grid max-w-46 grid-cols-1 gap-x-5 gap-y-3 sm:mt-10 sm:max-w-lg sm:grid-cols-2">
              {HERO_BADGES.map(([icon, label]) => (
                <li
                  key={label}
                  className="flex items-start gap-2 text-[10px] font-semibold uppercase leading-tight tracking-[0.12em] text-body-soft sm:text-[11px] sm:tracking-[0.14em]"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-white/80 text-brand-cyan sm:h-7 sm:w-7">
                    {icon}
                  </span>
                  <span className="pt-1.5 sm:pt-2">{label}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </header>

      {/* ─────────────────── FEATURE STRIP ─────────────────── */}
      <section className="border-y border-line bg-ice-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map(([title, desc]) => (
            <div key={title}>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy">
                {title}
              </h3>
              <p className="mt-2 text-[13px] leading-relaxed text-body">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────── PRECISION / QUALITY STORY ─────────────── */}
      <Section id="difference" className="py-10 sm:py-12 lg:py-14">
        <div className="mx-auto w-full max-w-[1560px] px-3 sm:px-5 lg:px-6">
          <div className="relative isolate min-h-[620px] overflow-hidden rounded-[24px] border border-line bg-[#edf3fc] shadow-sm shadow-navy/5 sm:min-h-[590px] lg:min-h-[570px] xl:min-h-[540px]">
            {/* The artwork now fills the entire Precision card. */}
            <img
              src="/precision.avif"
              alt="Wolverine research vial displayed above a geometric laboratory pedestal"
              draggable="false"
              className="absolute inset-0 h-full w-full select-none object-cover object-[68%_50%] sm:object-[65%_50%] lg:object-center"
            />

            {/* Strong white coverage behind the content on mobile and tablet. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 lg:hidden"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.97) 67%, rgba(255,255,255,0.86) 82%, rgba(255,255,255,0.42) 100%)",
              }}
            />

            {/* Desktop fade: solid white on the left, gradually revealing the artwork. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden lg:block"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 44%, rgba(255,255,255,0.96) 51%, rgba(255,255,255,0.78) 59%, rgba(255,255,255,0.28) 69%, rgba(255,255,255,0) 79%)",
              }}
            />

            <div className="relative z-10 flex min-h-[inherit] items-center">
              <div className="w-full p-6 sm:p-8 lg:w-[62%] lg:max-w-[900px] lg:p-10 xl:w-[60%] xl:p-11">
                <div className="grid gap-7 md:grid-cols-[minmax(260px,1fr)_minmax(300px,350px)] md:items-center lg:gap-8 xl:gap-9">
                  <div className="min-w-0">
                    <Eyebrow>Quality you can trust</Eyebrow>
                    <span className="mt-3 block h-px w-8 bg-brand-cyan" />

                    <h2 className="mt-6 text-4xl font-semibold leading-none tracking-[-0.04em] text-navy sm:text-5xl lg:text-[50px]">
                      Precision
                    </h2>

                    <p className="mt-5 max-w-[430px] text-sm leading-6 text-body sm:text-[15px] sm:leading-7">
                      We pay attention at every step, from sourcing materials to final testing.
                      Good research needs reliable materials, so we make sure ours are
                      consistent, accurate, and easy to trace.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-line bg-white/80 p-4 shadow-sm shadow-navy/5 backdrop-blur-[2px] sm:p-5">
                    <div className="grid grid-cols-[116px_minmax(0,1fr)] items-center gap-4 sm:grid-cols-[126px_minmax(0,1fr)] sm:gap-5">
                      <div className="relative flex min-h-[132px] items-center justify-center border-r border-line pr-4 sm:min-h-[144px] sm:pr-5">
                        <span className="absolute h-24 w-24 rounded-full border border-brand-cyan/20 sm:h-28 sm:w-28" />
                        <span className="absolute h-[72px] w-[72px] rounded-full border border-brand-cyan/25 sm:h-20 sm:w-20" />
                        <div className="relative flex items-end">
                          <span className="text-[58px] font-bold leading-none tracking-[-0.07em] text-navy sm:text-[66px]">
                            99
                          </span>
                          <span className="mb-1.5 text-2xl font-bold text-brand-cyan-deep sm:text-[27px]">
                            %+
                          </span>
                        </div>
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-cyan-deep sm:text-[13px]">
                          Purity standard
                        </p>
                        <p className="mt-3 flex items-start gap-2 text-[11px] leading-[1.65] text-body sm:text-xs">
                          <BadgeCheck
                            aria-hidden="true"
                            className="mt-0.5 h-4 w-4 shrink-0 text-brand-cyan-deep"
                            strokeWidth={2}
                          />
                          Every batch follows strict manufacturing procedures and quality
                          assurance protocols before release.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-7 grid gap-6 border-t border-line/90 pt-6 sm:grid-cols-3 sm:gap-0 lg:mt-8 lg:pt-7">
                  <article className="sm:pr-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/80 text-brand-cyan-deep shadow-sm backdrop-blur-sm">
                      <Search aria-hidden="true" size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-navy">
                      Independent Testing
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-[1.65] text-body sm:text-xs">
                      Products are verified through third-party analytical testing to confirm
                      identity and purity.
                    </p>
                  </article>

                  <article className="sm:border-l sm:border-line sm:px-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/80 text-brand-cyan-deep shadow-sm backdrop-blur-sm">
                      <FileText aria-hidden="true" size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-navy">
                      Batch Documentation
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-[1.65] text-body sm:text-xs">
                      Access detailed Certificates of Analysis and batch-specific
                      documentation.
                    </p>
                  </article>

                  <article className="sm:border-l sm:border-line sm:pl-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white/80 text-brand-cyan-deep shadow-sm backdrop-blur-sm">
                      <Package aria-hidden="true" size={20} strokeWidth={1.8} />
                    </span>
                    <h3 className="mt-3.5 text-sm font-semibold text-navy">
                      Reliable Fulfillment
                    </h3>
                    <p className="mt-1.5 text-[11px] leading-[1.65] text-body sm:text-xs">
                      Orders are carefully packaged and shipped securely to help preserve
                      product integrity in transit.
                    </p>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────── PRODUCT CATALOG ─────────────────── */}
      <Section
        id="catalog"
        className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 md:px-8 lg:px-10"
      >
        <div className="mb-5 flex items-center justify-center gap-2.5 sm:mb-7 sm:gap-4">
          <span className="h-px min-w-5 flex-1 bg-linear-to-r from-transparent to-brand-cyan/70 sm:max-w-20" />
          <h2 className="whitespace-nowrap text-center text-[21px] font-bold leading-tight tracking-[-0.025em] text-navy min-[390px]:text-2xl sm:text-[28px] lg:text-3xl">
            Research. <span className="text-brand-cyan-deep">Reliable.</span> Results.
          </h2>
          <span className="h-px min-w-5 flex-1 bg-linear-to-l from-transparent to-brand-cyan/70 sm:max-w-20" />
        </div>

        {/* One spacious card on phones, two on tablets, and three only when
            there is enough desktop width. This prevents squeezed copy and
            keeps the product image at a consistent visual size. */}
        <div className="grid grid-cols-1 gap-x-4 gap-y-7 pb-4 md:grid-cols-2 xl:grid-cols-3">
          {PRODUCTS.map((p) => (
            <article
              key={`${p.name}-${p.dose}`}
              className="group relative isolate min-h-[260px] overflow-hidden rounded-xl border border-line bg-white px-5 py-5 shadow-sm shadow-navy/5 transition duration-300 hover:-translate-y-0.5 hover:border-brand-cyan/55 hover:shadow-md hover:shadow-navy/8 sm:min-h-[280px] sm:px-6 sm:py-6 md:min-h-[270px] xl:min-h-[290px]"
            >
              <div className="relative z-10 flex h-full max-w-[55%] flex-col items-start sm:max-w-[53%] xl:max-w-[52%]">
                <h3 className="text-lg font-bold leading-tight tracking-tight text-navy sm:text-xl">
                  {p.name}
                </h3>
                <p className="mt-1.5 text-base font-bold text-brand-cyan-deep sm:text-lg">
                  ${p.price}
                </p>

                <ul className="mt-4 space-y-1 text-[12px] leading-relaxed text-body sm:text-[13px]">
                  <li>• {p.dose} · Lyophilized</li>
                  <li>• COA included</li>
                </ul>

                <a
                  href="/products"
                  aria-label={`View ${p.name} details`}
                  className="mt-auto inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-lg border border-brand-cyan bg-white px-3.5 py-2.5 text-[11px] font-bold text-brand-cyan-deep shadow-sm transition-colors hover:bg-brand-cyan-deep hover:text-white sm:px-4 sm:text-xs"
                >
                  View Details <ArrowRight size={14} />
                </a>
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 z-0 w-[54%] rounded-r-xl bg-linear-to-l from-ice-100/85 to-transparent sm:w-[56%]" />

              <img
                src={p.image}
                alt={`${p.name} ${p.dose} vial`}
                draggable="false"
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = "/vial.avif";
                }}
                className="pointer-events-none absolute -bottom-15 -right-12 z-20 h-auto w-[285px] max-w-none origin-bottom select-none object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.025] min-[390px]:-right-14 min-[390px]:w-[310px] sm:-right-16 sm:w-[335px] md:-right-12 md:w-[290px] lg:-right-14 lg:w-[315px] xl:-right-16 xl:w-[350px]"
              />
            </article>
          ))}
        </div>
      </Section>

      {/* ─────────────────── BUILT AROUND PRECISION ─────────────────── */}
      <Section id="process" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-white shadow-sm shadow-navy/5">
          {/* Mobile/tablet artwork: keep the full image readable above the copy. */}
          <div
            role="img"
            aria-label="Researcher holding a HelixMD Labs research vial"
            className="aspect-[16/9] w-full bg-cover bg-left bg-no-repeat sm:aspect-[2/1] lg:hidden"
            style={{ backgroundImage: "url('/puritysection.avif')" }}
          />

          {/* Desktop artwork fills the section. The white gradient replaces the
              separate content card and softly hides the right half of the image. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-cover bg-left bg-no-repeat lg:block"
            style={{ backgroundImage: "url('/puritysection.avif')" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 34%, rgba(255,255,255,0.58) 45%, rgba(255,255,255,0.92) 56%, rgba(255,255,255,1) 68%, rgba(255,255,255,1) 100%)",
            }}
          />

          <div className="relative lg:grid lg:min-h-[480px] lg:grid-cols-[43%_57%] xl:min-h-[510px] xl:grid-cols-[45%_55%]">
            <div aria-hidden="true" className="hidden lg:block" />

            <div className="bg-white px-6 py-9 sm:px-9 sm:py-11 lg:flex lg:flex-col lg:justify-center lg:bg-transparent lg:px-10 lg:py-12 xl:px-14">
              <Eyebrow>Purity</Eyebrow>
              <h2 className="mt-3 text-3xl font-semibold leading-[1.05] tracking-tight text-navy sm:text-4xl lg:text-[42px] xl:text-5xl">
                Trusted Standards
              </h2>
              <span className="mt-4 h-0.5 w-9 bg-brand-cyan/50" />

              <p className="mt-4 max-w-xl text-sm leading-relaxed text-body sm:text-[15px]">
                Reliable research starts with dependable materials. That&rsquo;s why we
                make every batch the same way, test it independently, and keep clear
                records.
              </p>

              <ul className="mt-6 max-w-xl divide-y divide-line/80 sm:mt-7">
                {PURITY_FEATURES.map(({ label, icon: Icon }) => (
                  <li
                    key={label}
                    className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 sm:gap-5 sm:py-3.5"
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-ice-100/85 text-navy shadow-sm sm:h-11 sm:w-11 lg:h-12 lg:w-12">
                      <Icon
                        aria-hidden="true"
                        className="h-5 w-5 sm:h-[22px] sm:w-[22px]"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="text-sm font-semibold text-navy sm:text-[15px]">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────── TRANSPARENCY / CERTIFICATE OF ANALYSIS ─────────────── */}
      <Section id="documentation" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow>Verified</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-navy leading-[1.05]">
              Transparency
            </h2>
            <p className="mt-5 max-w-md text-body leading-relaxed">
              Every product is accompanied by detailed documentation, allowing researchers
              to review testing data and batch information with confidence.
            </p>
            <Link
              to="/coa"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-navy hover:border-brand-cyan hover:text-brand-cyan-deep transition-colors"
            >
              View documentation <ArrowRight size={15} />
            </Link>
          </div>

          {/* COA card */}
          <div className="rounded-2xl border border-line bg-white p-8 shadow-sm shadow-navy/5">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-body-soft">
                Certificate of Analysis
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-teal">
                <ShieldCheck size={13} /> Verified
              </span>
            </div>
            <dl className="mt-2 divide-y divide-line">
              {COA_ROWS.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between py-3.5">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft">
                    {k}
                  </dt>
                  <dd className="text-sm font-medium text-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ─────────────────────── FAQ ─────────────────────── */}
      <Section id="faq" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid lg:grid-cols-[0.9fr_1.4fr] gap-12">
          <div>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-navy leading-[1.05]">
              Common questions
            </h2>
            <p className="mt-5 text-body leading-relaxed">
              Everything researchers ask before their first order.
            </p>
          </div>

          <div>
            <Accordion type="single" collapsible defaultValue="faq-0" className="w-full">
              {FAQS.map(([q, a], i) => (
                <motion.div
                  key={q}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                >
                  <AccordionItem value={`faq-${i}`} className="border-line">
                    <AccordionTrigger className="py-5 text-base font-medium text-navy hover:no-underline">
                      {q}
                    </AccordionTrigger>
                    <AccordionContent className="text-[14px] leading-relaxed text-body">
                      {a}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>

            {/* research use only disclaimer */}
            <div className="mt-8 rounded-2xl border border-line bg-ice-100 p-6">
              <Eyebrow>Research Use Only</Eyebrow>
              <p className="mt-3 text-[13px] leading-relaxed text-body">
                All products available on this website are intended exclusively for
                laboratory research purposes. They are not intended for human consumption,
                therapeutic use, or diagnostic applications. Researchers are responsible
                for complying with all applicable laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────────── CLOSING CTA ─────────────────────── */}
      <Section className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="relative overflow-hidden rounded-3xl border border-line bg-linear-to-br from-white via-ice-100 to-ice-200 px-6 py-20 text-center">
          <HelixWave
            uid="cta-wave"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-full w-full opacity-45"
          />
          <div className="relative">
            <h2 className="mx-auto max-w-3xl text-4xl md:text-6xl font-semibold tracking-tight text-navy leading-[1.05]">
              Ready when you are
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-body leading-relaxed">
              Every peptide in our catalog is manufactured to consistent specifications,
              independently tested, and shipped with a batch-specific COA.
            </p>
            <Link
              to="/products"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-navy/20 hover:bg-navy-600 transition-colors"
            >
              Browse products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <Footer />
    </div>
  );
}