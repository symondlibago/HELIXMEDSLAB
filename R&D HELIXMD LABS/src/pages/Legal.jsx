import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import HelixWave from "../components/HelixWave";
import Footer from "../components/Footer";
import {
  LEGAL_LAST_UPDATED,
  POLICIES,
  SUPPORT_EMAIL,
} from "../data/legalContent";

/* Turns the support address inside a policy paragraph into a mailto link
   without touching the surrounding wording. */
function Paragraph({ text }) {
  if (!text.includes(SUPPORT_EMAIL)) return <>{text}</>;

  return text.split(SUPPORT_EMAIL).map((chunk, i, all) => (
    <React.Fragment key={i}>
      {chunk}
      {i < all.length - 1 && (
        <a
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-medium text-brand-cyan-deep underline decoration-brand-cyan/40 underline-offset-2 hover:decoration-brand-cyan"
        >
          {SUPPORT_EMAIL}
        </a>
      )}
    </React.Fragment>
  ));
}

export default function Legal() {
  const { hash } = useLocation();
  const lenis = useLenis();

  /* App's ScrollToTop deliberately ignores hash navigations, so each policy
     link from the footer is scrolled into place here instead. The offset
     clears the sticky navbar. */
  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    if (!target) return;

    if (lenis) lenis.scrollTo(target, { offset: -88, duration: 1 });
    else target.scrollIntoView({ behavior: "smooth" });
  }, [hash, lenis]);

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
          uid="legal-wave"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 w-full opacity-55"
        />

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand-cyan-deep">
            Legal
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-navy md:text-5xl">
            Policies &amp; Terms
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-body md:text-base">
            The policies governing your use of this site, your orders, and how we
            handle your information.
          </p>
          <p className="mt-4 text-[12px] text-body-soft">
            Last updated: {LEGAL_LAST_UPDATED}
          </p>
        </motion.div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:px-10 md:py-14">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
          {/* ── index: horizontal chips on mobile, sticky rail on desktop ── */}
          <nav
            aria-label="Policies"
            className="mb-8 lg:mb-0 lg:sticky lg:top-24 lg:self-start"
          >
            <p className="mb-3 hidden text-[11px] font-semibold uppercase tracking-[0.16em] text-body-soft lg:block">
              On this page
            </p>
            <ul className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-1 lg:overflow-visible lg:pb-0">
              {POLICIES.map((policy) => (
                <li key={policy.id} className="shrink-0 lg:shrink">
                  <a
                    href={`#${policy.id}`}
                    className="block whitespace-nowrap rounded-full border border-line bg-ice-100 px-4 py-2 text-[12px] font-semibold text-body transition-colors hover:border-brand-cyan hover:text-navy lg:whitespace-normal lg:rounded-lg lg:border-0 lg:border-l-2 lg:border-line lg:bg-transparent lg:px-3 lg:py-2 lg:text-[13px] lg:hover:border-brand-cyan lg:hover:bg-ice-100"
                  >
                    {policy.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* ── the policies ── */}
          <div className="space-y-10 md:space-y-14">
            {POLICIES.map((policy) => (
              <motion.article
                key={policy.id}
                id={policy.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                /* scroll-mt keeps the heading clear of the sticky navbar when
                   linked to directly or on a hard refresh with a hash */
                className="scroll-mt-24 rounded-2xl border border-line bg-white p-5 shadow-sm shadow-navy/5 sm:p-8 md:p-10"
              >
                <header className="border-b border-line pb-5">
                  <h2 className="text-xl font-bold tracking-tight text-navy sm:text-2xl md:text-3xl">
                    {policy.title}
                  </h2>
                  <p className="mt-2 text-[13px] text-body-soft">
                    {policy.summary}
                  </p>
                </header>

                {policy.intro && (
                  <p className="mt-6 text-[14px] leading-[1.75] text-body sm:text-[15px]">
                    <Paragraph text={policy.intro} />
                  </p>
                )}

                <div className="mt-6 space-y-6">
                  {policy.sections.map((section) => (
                    <section key={section.heading}>
                      <h3 className="text-[13px] font-bold uppercase tracking-[0.1em] text-navy sm:text-sm">
                        {section.heading}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.75] text-body sm:text-[15px]">
                        <Paragraph text={section.body} />
                      </p>
                    </section>
                  ))}
                </div>
              </motion.article>
            ))}

            {/* ── contact ── */}
            <div className="rounded-2xl border border-line bg-ice-100 p-5 sm:p-8">
              <h2 className="text-base font-bold text-navy sm:text-lg">
                Questions about these policies?
              </h2>
              <p className="mt-2 text-[14px] leading-relaxed text-body">
                Our team can help clarify anything on this page.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[13px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600"
              >
                <Mail size={15} />
                {SUPPORT_EMAIL}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
