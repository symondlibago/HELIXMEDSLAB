import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { useLocation } from "react-router-dom";

import Home from "../components/Home";
import { Toaster } from "../components/ui/toaster";

const HomePage = () => {
  // Intro plays once per browser session (not on every return to home).
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem("introSeen")
  );
  const lenis = useLenis();
  const location = useLocation();

  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("introSeen", "1");
    }, 1600);
    return () => clearTimeout(timer);
  }, [loading]);

  // Lock scrolling while the intro overlay is visible.
  useEffect(() => {
    if (!lenis) return;
    if (loading) lenis.stop();
    else lenis.start();
  }, [loading, lenis]);

  // When arriving from another page with a #section hash, glide to it.
  useEffect(() => {
    if (!lenis || loading || !location.hash) return;
    lenis.scrollTo(location.hash, { offset: -64, duration: 1.2 });
  }, [location.hash, loading, lenis]);

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="intro"
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            <motion.img
              src="/helixmd-logo.png"
              alt="HelixMD Labs"
              className="h-10 md:h-12 w-auto select-none"
              draggable="false"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
            <motion.span
              className="mt-6 block h-px w-40 origin-left bg-linear-to-r from-brand-cyan to-brand-teal"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.35, ease: "easeOut" }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fade the page in as the curtain lifts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Home />
      </motion.div>

      <Toaster />
    </div>
  );
};

export default HomePage;
