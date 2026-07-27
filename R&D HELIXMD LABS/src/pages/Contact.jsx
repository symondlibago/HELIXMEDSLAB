import React from "react";
import { motion } from "framer-motion";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";

const FONT = { fontFamily: "'Space Grotesk', 'Inter', sans-serif" };

const FEATURES = [
  ["Research First", "Every product is developed for laboratory research applications."],
  ["Third-Party Tested", "Each batch undergoes independent analytical testing."],
  ["Secure Shipping", "Carefully packaged and shipped with reliability in mind."],
];

function Field({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-line bg-ice px-4 py-3 text-sm text-navy placeholder:text-body-soft/70 outline-none transition-colors focus:border-brand-cyan focus:bg-white"
      />
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-white" style={FONT}>
      {/* ─────────────────────── HEADER ─────────────────────── */}
      <section
        className="relative overflow-hidden px-6 pt-20 md:pt-24 pb-14 text-center"
        style={{
          backgroundImage:
            "radial-gradient(70% 80% at 50% -10%, #e2eff9 0%, #f4f9fd 45%, #ffffff 78%)",
        }}
      >
        <HelixWave
          uid="contact-wave"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-55"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
            Support
          </p>
          <h1 className="mt-4 text-4xl md:text-6xl font-bold tracking-tight text-navy">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm md:text-base leading-relaxed text-body">
            Questions about product specifications, batch documentation, or an existing
            order — our team responds to every inquiry within one business day.
          </p>
        </motion.div>
      </section>

      {/* ─────────────────────── FORM ─────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-3xl border border-line bg-white p-6 md:p-10 shadow-lg shadow-navy/5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name" placeholder="Jane Doe" />
            <Field label="Email" type="email" placeholder="jane@lab.org" />
          </div>

          <div className="mt-5">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-body-soft mb-2">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="How can we help?"
              className="w-full resize-none rounded-xl border border-line bg-ice px-4 py-3 text-sm text-navy placeholder:text-body-soft/70 outline-none transition-colors focus:border-brand-cyan focus:bg-white"
            />
          </div>

          <label className="mt-6 flex items-start gap-3 text-[13px] leading-relaxed text-body">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand-cyan"
            />
            I confirm these materials are intended for laboratory research use only and not
            for human or veterinary use.
          </label>

          <div className="mt-7 flex flex-wrap items-center gap-5">
            <button
              type="submit"
              className="rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy/15 hover:bg-navy-600 transition-colors"
            >
              Send message
            </button>
            <span className="text-[13px] text-body-soft">
              Typical reply within 1 business day
            </span>
          </div>
        </form>
      </section>

      {/* ─────────────────── FEATURE STRIP ─────────────────── */}
      <section className="border-t border-line bg-ice-100">
        <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
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

      <Footer />
    </div>
  );
}
