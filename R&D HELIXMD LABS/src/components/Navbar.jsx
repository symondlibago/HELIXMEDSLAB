import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";

const LINKS = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Navbar() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Compact the bar and switch to glass once the page moves off the top.
  useLenis(({ scroll }) => setScrolled(scroll > 8));

  // Home link — go home, or smooth-scroll to top if already there.
  const goHome = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== "/") navigate("/");
    else lenis?.scrollTo(0, { duration: 1.2 });
  };

  // Close the mobile panel whenever the route changes.
  useEffect(() => setOpen(false), [location.pathname]);

  // Freeze the page behind the open panel, and allow Esc to dismiss it.
  // Only ever touches lenis while open, so it can't clobber the intro's lock.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ${
          scrolled || open
            ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-14px_rgba(22,48,92,0.28)]"
            : "bg-white"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between transition-[height] duration-300 ${
            scrolled ? "h-14 md:h-16" : "h-16 md:h-18"
          }`}
        >
          <a href="/" onClick={goHome} className="inline-flex items-center shrink-0">
            <img
              src="/helixmd-logo.png"
              alt="HelixMD Labs"
              className={`w-auto transition-[height] duration-300 ${
                scrolled ? "h-7 md:h-8" : "h-8 md:h-10"
              }`}
            />
          </a>

          {/* ── desktop links ── */}
          <div className="hidden md:flex items-center gap-9 text-[15px] font-medium">
            {LINKS.map(({ label, to }) => {
              const active = isActive(to);
              const inner = (
                <>
                  {label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full bg-linear-to-r from-brand-cyan to-brand-teal"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="absolute -bottom-1.5 left-0 right-0 h-0.5 origin-left scale-x-0 rounded-full bg-line transition-transform duration-300 group-hover:scale-x-100" />
                </>
              );
              const cls = `group relative py-1 transition-colors ${
                active ? "text-navy" : "text-body hover:text-navy"
              }`;

              return to === "/" ? (
                <a key={to} href="/" onClick={goHome} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={to} to={to} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* ── desktop CTA ── */}
          <Link
            to="/products"
            className="group hidden md:inline-flex items-center gap-2 rounded-full bg-navy px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm shadow-navy/20 transition-all duration-300 hover:bg-navy-600 hover:shadow-lg hover:shadow-navy/30"
          >
            Browse products
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <path
                d="M3 8h10m0 0-4-4m4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* ── burger ── */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="md:hidden -mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-navy transition-colors hover:bg-navy/5"
          >
            <span className="relative block h-4 w-6">
              <motion.span
                className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
                animate={open ? { top: 7, rotate: 45 } : { top: 1, rotate: 0 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              />
              <motion.span
                className="absolute left-0 top-1.75 block h-0.5 w-6 rounded-full bg-current"
                animate={open ? { opacity: 0, scaleX: 0.4 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 block h-0.5 w-6 rounded-full bg-current"
                animate={open ? { top: 7, rotate: -45 } : { top: 13, rotate: 0 }}
                transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
              />
            </span>
          </button>
        </div>

        {/* hairline that fades out at the edges */}
        <div className="h-px bg-linear-to-r from-transparent via-brand-cyan/45 to-transparent" />
      </nav>

      {/* ── mobile drawer ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              key="scrim"
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-40 bg-navy-900/40 backdrop-blur-sm"
            />

            <motion.div
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 36, mass: 0.9 }}
              className="md:hidden fixed inset-y-0 right-0 z-45 flex w-[82%] max-w-xs flex-col bg-white shadow-[-16px_0_40px_-12px_rgba(22,48,92,0.3)]"
            >
              <div className="flex flex-col px-6 pb-8 pt-24">
                {LINKS.map(({ label, to }, i) => {
                  const active = isActive(to);
                  const cls = `flex items-center justify-between border-b border-line py-4 text-[17px] font-medium transition-colors ${
                    active ? "text-navy" : "text-body"
                  }`;
                  const row = (
                    <>
                      {label}
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" />
                      )}
                    </>
                  );

                  return (
                    <motion.div
                      key={to}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 24 }}
                      transition={{ delay: 0.08 + i * 0.07, duration: 0.35 }}
                    >
                      {to === "/" ? (
                        <a href="/" onClick={goHome} className={cls}>
                          {row}
                        </a>
                      ) : (
                        <Link to={to} className={cls}>
                          {row}
                        </Link>
                      )}
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ delay: 0.08 + LINKS.length * 0.07, duration: 0.35 }}
                >
                  <Link
                    to="/products"
                    className="mt-8 flex items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-white shadow-sm shadow-navy/20"
                  >
                    Browse products
                    <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden="true">
                      <path
                        d="M3 8h10m0 0-4-4m4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}