import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { ArrowRight, Clock, X } from "lucide-react";
import { useAccount } from "../context/AccountContext";
import { REVIEW_WINDOW_HOURS } from "../data/registrationConfig";

/* The registration prompt that greets a first-time visitor.

   Shown once per browser: dismissing it sets a flag, and anyone who already
   has an account never sees it at all. */

const SEEN_KEY = "helixmd.welcome.seen.v1";
const OPEN_DELAY_MS = 700;

const Strong = ({ children }) => (
  <strong className="font-semibold text-navy">{children}</strong>
);

const STEPS = [
  {
    title: "Step 1:",
    lines: [
      <>Enter your email address and the referral code you were given.</>,
      <>
        Select <Strong>Next</Strong>.
      </>,
    ],
  },
  {
    title: "Step 2:",
    lines: [
      <>
        Complete the form and select <Strong>Next</Strong>.
      </>,
    ],
  },
  {
    title: "Step 3:",
    lines: [
      <>
        Complete the form and select <Strong>Submit</Strong>.
      </>,
    ],
  },
];

export default function WelcomeModal() {
  const { isRegistered } = useAccount();
  const lenis = useLenis();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isRegistered) return undefined;
    try {
      if (window.localStorage.getItem(SEEN_KEY)) return undefined;
    } catch {
      return undefined; // storage blocked — don't nag on every page view
    }
    // A beat of delay so the page paints first and it doesn't feel like a
    // popup ad fired before the site loaded.
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, [isRegistered]);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to persist */
    }
  };

  // Freeze the page behind the dialog and let Esc close it.
  useEffect(() => {
    if (!open) return undefined;
    lenis?.stop();
    const onKey = (event) => event.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="welcome-scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={dismiss}
            className="fixed inset-0 z-60 bg-navy-900/45 backdrop-blur-sm"
          />

          <motion.div
            key="welcome-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="welcome-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            /* The panel scrolls inside itself on short screens rather than
               letting the frozen page behind it scroll. */
            className="fixed inset-x-4 top-1/2 z-60 mx-auto max-h-[88vh] w-auto max-w-lg -translate-y-1/2 overflow-y-auto overscroll-contain rounded-3xl border border-line bg-white p-6 shadow-[0_40px_90px_-30px_rgba(22,48,92,0.5)] sm:inset-x-0 sm:w-full sm:p-8"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-body-soft transition-colors hover:bg-ice-100 hover:text-navy"
            >
              <X size={18} />
            </button>

            <img
              src="/helixmd-logo.png"
              alt="HelixMD Labs"
              className="mx-auto h-9 w-auto select-none"
              draggable="false"
            />

            <h2
              id="welcome-title"
              className="mt-6 text-center text-xl font-bold tracking-tight text-navy sm:text-2xl"
            >
              Welcome! Let’s register your account.
            </h2>
             <p className="mx-auto mt-3 max-w-sm text-center text-[13px] leading-relaxed text-body">
              HelixMD Labs supplies research-grade peptides to approved clients
              only.
            </p>

            <ol className="mt-6 space-y-4 border-t border-line pt-6">
              {STEPS.map(({ title, lines }, index) => (
                <li key={title} className="flex gap-3.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-cyan/10 text-[12px] font-bold text-brand-cyan-deep">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-navy">{title}</p>
                    {lines.map((line, lineIndex) => (
                      <p
                        // Lines are fixed copy, so the index is a stable key.
                        key={lineIndex}
                        className="text-[13px] leading-relaxed text-body"
                      >
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-ice-100 p-3.5">
              <Clock size={15} className="mt-0.5 shrink-0 text-brand-cyan-deep" />
              <p className="text-[12px] leading-relaxed text-body">
                Please allow up to {REVIEW_WINDOW_HOURS} hours for your account
                to be reviewed and approved. Upon approval, you will receive an
                email with a link to create your password.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2.5 sm:flex-row-reverse">
              <Link
                to="/register"
                onClick={dismiss}
                className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full bg-navy px-6 text-[14px] font-semibold text-white shadow-sm shadow-navy/20 transition-colors hover:bg-navy-600"
              >
                Register now <ArrowRight size={15} />
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-white px-6 text-[14px] font-semibold text-navy transition-colors hover:border-brand-cyan hover:text-brand-cyan-deep sm:flex-1"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
