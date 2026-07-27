import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Package,
  ShieldCheck,
  Check,
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

/* Card fill lifted from the carton stock: a cool ice wash with the faintest
   cyan bloom in the upper-left, the way the print catches light. */
const CARD_BG = {
  backgroundImage:
    "radial-gradient(85% 65% at 16% 6%, rgba(23,168,224,0.10), rgba(23,168,224,0) 58%), linear-gradient(180deg, #ffffff 0%, #f2f7fc 100%)",
};

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

const PRODUCTS = [
  { name: "Retatrutide", price: "52.50", spec: "10 mg · lyophilized · COA included", img: "/r10.avif" },
  { name: "Semaglutide", price: "29.50", spec: "10 mg · lyophilized · COA included", img: "/s10.avif" },
  { name: "MOTS-C", price: "40.50", spec: "10 mg · lyophilized · COA included" },
];

const CHECKLIST = [
  "High purity standards",
  "Batch-specific COAs",
  "Third-party laboratory testing",
  "Research use only",
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
    <div
      className="bg-white text-body antialiased"
      style={{ fontFamily: "'Space Grotesk', 'Inter', sans-serif" }}
    >
      {/* ───────────────────────── HERO ───────────────────────── */}
      <header
        id="top"
        className="relative flex items-start md:items-center overflow-hidden min-h-[78vh] md:min-h-[90vh]"
      >
        {/* mobile.avif takes over below 768px, hero-sec.avif above */}
        <picture>
          <source media="(max-width: 767px)" srcSet="/mobile.avif" />
          <img
            src="/hero-sec.avif"
            alt="HelixMD Labs research-grade peptide vial"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        </picture>

        {/* navy wash — brand ink rather than flat black — keeps the copy legible:
            top-down on mobile where the text sits above the vial, left-to-right
            on desktop where it sits beside it */}
        <div className="absolute inset-0 bg-linear-to-b from-navy-900/85 via-navy-900/45 to-navy-900/30 md:bg-linear-to-r md:from-navy-900/90 md:via-navy-900/50 md:to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-24 pb-16 md:py-36">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={reveal}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-cyan">
              Premium Quality
            </p>
            <h1 className="mt-4 md:mt-5 text-4xl md:text-7xl font-bold leading-[0.95] tracking-tight text-white">
              RESEARCH GRADE PEPTIDES
            </h1>
            <p className="mt-5 md:mt-6 max-w-60 md:max-w-md text-sm md:text-base leading-relaxed text-white/85">
              Precision-made peptides designed to support research with dependable
              quality and consistency.
            </p>

            <div className="mt-7 md:mt-9 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
              <a
                href="#catalog"
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-navy hover:bg-ice-100 transition-colors"
              >
                Browse products
              </a>
              <a
                href="#process"
                className="rounded-full border border-white/45 px-7 py-3.5 text-sm font-semibold text-white hover:border-brand-cyan hover:bg-white/10 transition-colors"
              >
                Learn our process
              </a>
            </div>

            {/* carton badge row */}
            <ul className="mt-10 hidden flex-wrap gap-x-6 gap-y-3 sm:flex">
              {HERO_BADGES.map(([icon, label]) => (
                <li
                  key={label}
                  className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/75"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-brand-cyan">
                    {icon}
                  </span>
                  {label}
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

      {/* ─────────────── CONFIDENCE / QUALITY CARDS ─────────────── */}
      {/* the section itself spans the full width so the ribbon can run edge to
          edge; the copy and cards keep their own max-w-7xl container inside */}
      <Section id="difference" className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-end">
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-navy leading-[1.05]">
              Precision
            </h2>
            <p className="text-body leading-relaxed">
              We pay attention at every step, from sourcing materials to final testing.
              Good research needs reliable materials, so we make sure ours are
              consistent, accurate, and easy to trace
            </p>
          </div>
        </div>

        {/* the ribbon runs behind the grid — the cards are opaque, so it reads
            through the gutters and the open bottom-right quadrant */}
        <div className="relative mt-12 overflow-hidden">
          <HelixWave
            uid="difference-wave"
            className="pointer-events-none absolute inset-x-0 top-1/2 h-[135%] w-full -translate-y-1/2 opacity-70"
          />

          <div className="relative max-w-7xl mx-auto px-6 md:px-10">
            <div className="grid gap-5 md:grid-cols-4">
              {/* purity standard – large card, spans two columns; tall via min-height */}
              <div
                style={CARD_BG}
                className="md:col-span-2 rounded-2xl border border-line p-8 flex flex-col justify-between min-h-[300px] shadow-sm shadow-navy/5"
              >
                <Eyebrow>Purity Standard</Eyebrow>
                <div>
                  <div className="flex items-end gap-1">
                    <span className="text-8xl md:text-9xl font-bold text-navy leading-[0.85]">
                      99
                    </span>
                    <span className="text-4xl font-semibold text-brand-cyan mb-3">%+</span>
                  </div>
                  <p className="mt-6 max-w-md text-[13px] leading-relaxed text-body">
                    Every production batch follows strict manufacturing procedures and quality
                    assurance protocols before it is released.
                  </p>
                </div>
              </div>

              {/* independent testing – top right */}
              <InfoCard
                icon={<Search size={16} />}
                title="Independent testing"
                desc="Products are verified through third-party analytical testing to confirm identity and purity."
              />

              {/* batch documentation – top right */}
              <InfoCard
                icon={<FileText size={16} />}
                title="Batch documentation"
                desc="Access detailed Certificates of Analysis and batch-specific documentation."
              />

              {/* reliable fulfillment – bottom left, leaving open space at bottom right */}
              <InfoCard
                icon={<Package size={16} />}
                title="Reliable fulfillment"
                desc="Orders are carefully packaged and shipped securely to help preserve product integrity in transit."
                className="md:col-span-2"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ─────────────────── PRODUCT CATALOG ─────────────────── */}
      <Section id="catalog" className="max-w-7xl mx-auto px-6 md:px-10 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p) => (
            <div
              key={p.name}
              className="group relative overflow-hidden rounded-2xl h-36 px-6 flex flex-col justify-center border border-line bg-linear-to-br from-white via-ice-100 to-ice-200 transition-colors hover:border-brand-cyan/45"
            >
              {/* large vial cropped by the card's top, right and bottom edges */}
              {p.img && (
                <img
                  src={p.img}
                  alt={`${p.name} vial`}
                  draggable="false"
                  className="pointer-events-none select-none absolute -right-1 -top-[16%] h-[132%] w-auto object-contain transition-transform duration-500 group-hover:-translate-y-1"
                />
              )}
              <div className="relative z-10 max-w-[62%]">
                <h3 className="text-2xl font-bold tracking-tight text-navy">{p.name}</h3>
                <p className="mt-1 text-lg font-semibold text-brand-cyan-deep">
                  ${p.price}
                </p>
                <p className="mt-2 text-[11px] tracking-wide text-body">{p.spec}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─────────────────── BUILT AROUND PRECISION ─────────────────── */}
      <Section id="process" className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        {/* ice frame, the way the carton floats its panels on white stock */}
        <div className="relative overflow-hidden rounded-3xl border border-line bg-ice-100 p-4 md:p-6">
          {/* the cutout is bottom-anchored and bleeds past the frame's left and
              bottom edges, so the forearm runs off the corner rather than
              sitting in a box */}
          <img
            src="/han.avif"
            alt="Researcher holding a HelixMD Labs GIP/GLP-1 vial"
            className="hidden lg:block absolute -left-20 -bottom-2 h-130 w-auto object-contain select-none"
            draggable="false"
          />

          {/* stacked photo for small screens — scaled to the card width and cut
              off at the wrist so the forearm runs behind the panel below, the
              same bottom-anchored composition the desktop layout uses */}
          <div className="lg:hidden relative mx-auto w-full max-w-md aspect-5/4 overflow-hidden">
            <img
              src="/han.avif"
              alt="Researcher holding a HelixMD Labs GIP/GLP-1 vial"
              className="absolute inset-x-0 top-0 w-full select-none"
              draggable="false"
            />
          </div>

          <div className="relative">
            <div className="lg:w-3/5 lg:ml-auto rounded-2xl border border-line bg-white p-8 md:p-12 shadow-sm shadow-navy/5">
              <Eyebrow>Purity</Eyebrow>
              <h2 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight text-navy leading-[1.05]">
                Trusted Standards
              </h2>
              <p className="mt-5 text-body leading-relaxed">
                Reliable research starts with dependable materials. That&rsquo;s why we
                make every batch the same way, test it independently, and keep clear
                records
              </p>
              <ul className="mt-8 space-y-4">
                {CHECKLIST.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-cyan/12 text-brand-cyan-deep">
                      <Check size={13} />
                    </span>
                    <span className="text-sm text-navy">{item}</span>
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
            <a
              href="#faq"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-navy hover:border-brand-cyan hover:text-brand-cyan-deep transition-colors"
            >
              View documentation <ArrowRight size={15} />
            </a>
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
            <a
              href="#catalog"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-navy/20 hover:bg-navy-600 transition-colors"
            >
              Browse products <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </Section>

      {/* ─────────────────────── FOOTER ─────────────────────── */}
      <Footer />
    </div>
  );
}

/* ─────────────────────── helpers ─────────────────────── */

function InfoCard({ icon, title, desc, className = "" }) {
  return (
    <div
      style={CARD_BG}
      className={`rounded-2xl border border-line p-7 flex flex-col shadow-sm shadow-navy/5 ${className}`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-cyan/10 text-brand-cyan-deep">
        {icon}
      </span>
      <h3 className="mt-5 text-base font-semibold text-navy">{title}</h3>
      <p className="mt-2 text-[13px] leading-relaxed text-body">{desc}</p>
    </div>
  );
}
