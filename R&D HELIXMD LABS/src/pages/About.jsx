import React from "react";
import { motion } from "framer-motion";
import { Microscope, CreditCard } from "lucide-react";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";

const FONT = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" };

const PARAGRAPHS = [
  "HelixMD Labs is a trusted leader in the field of research and lab-use peptides. Peptides, composed of short chains of amino acids, are closely related to proteins, which consist of longer amino acid chains.",
  "For decades, peptides have been extensively studied worldwide, becoming invaluable resources for researchers and laboratories. Our mission is to empower academic and institutional research by offering an extensive catalog of high-quality, artificially synthesized peptide compounds.",
  "Based in the United States, our team specializes in the precise synthesis and lyophilization of these delicate structures. Synthesis involves constructing peptides through advanced chemical processes, while lyophilization—a freeze-drying method—preserves these fragile compounds, ensuring long-term stability and extended shelf life.",
  "HelixMD Labs is committed to providing research facilities with premium-quality peptides. Each batch undergoes rigorous testing to meet the highest industry standards. Our state-of-the-art analytical methods, including HPLC (High-Performance Liquid Chromatography), Mass Spectrometry, and Certificate of Analysis (COA) evaluations, help verify 99% or higher purity before products are released for research use.",
  "At HelixMD Labs, we prioritize exceptional quality in our products and unparalleled customer service. We go the extra mile to support researchers by delivering reliable, high-quality peptide compounds and creating an outstanding experience every time.",
];

const CARDS = [
  {
    icon: <Microscope size={26} strokeWidth={1.5} />,
    title: "Rigorous Quality Control",
    desc: "Liquid chromatography and mass spectrometry ensure purity >99%",
  },
  {
    icon: <CreditCard size={26} strokeWidth={1.5} />,
    title: "Same Day Shipping From The USA",
    desc: "Convenient payment methods and expedited shipping",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white" style={FONT}>
      {/* ─────────────────────── HERO ─────────────────────── */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative overflow-hidden border-b border-line rounded-b-[2rem] px-6 pt-24 pb-28 md:pt-28 md:pb-36 text-center"
          style={{
            backgroundImage:
              "radial-gradient(100% 80% at 50% -10%, #e2eff9 0%, #f2f7fc 42%, #ffffff 72%)",
          }}
        >
          <HelixWave
            uid="about-wave"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 w-full opacity-60"
          />

          <div className="relative mx-auto max-w-3xl px-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
              Our Story
            </p>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold tracking-tight text-navy">
              ABOUT HELIXMD LABS
            </h1>
            <p className="mt-6 text-sm md:text-base text-body">
              A research supplier built on precision and trust.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ─────────────────── INTRO PARAGRAPHS ─────────────────── */}
      <section className="max-w-4xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="space-y-6 text-[15px] leading-[1.8] text-body">
          {PARAGRAPHS.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      {/* ─────────────────── QUALITY / SHIPPING CARDS ─────────────────── */}
      <section className="px-4 md:px-6 pb-16 md:pb-24">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-line bg-linear-to-b from-white to-ice-100 grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-line shadow-sm shadow-navy/5">
          {CARDS.map((c) => (
            <div
              key={c.title}
              className="flex flex-col items-center text-center px-8 py-14 md:py-16"
            >
              <span className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-brand-cyan/35 bg-brand-cyan/8 text-brand-cyan-deep">
                {c.icon}
              </span>
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-navy">
                {c.title}
              </h3>
              <p className="mt-3 max-w-[230px] text-[13px] leading-relaxed text-body">
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
