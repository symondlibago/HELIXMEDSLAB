import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLenis } from "lenis/react";

export default function Navbar() {
  const lenis = useLenis();
  const navigate = useNavigate();
  const location = useLocation();

  // Home link — go home, or smooth-scroll to top if already there.
  const goHome = (e) => {
    e.preventDefault();
    if (location.pathname !== "/") navigate("/");
    else lenis?.scrollTo(0, { duration: 1.2 });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-white/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="/"
          onClick={goHome}
          className="inline-flex items-center"
          aria-label="HelixMD Labs — home"
        >
          <img
            src="/helixmd-logo.png"
            alt="HelixMD Labs"
            className="h-7 md:h-8 w-auto select-none"
            draggable="false"
          />
        </a>

        <div className="hidden md:flex items-center gap-8 text-[13px] font-medium text-body">
          <a href="/" onClick={goHome} className="hover:text-navy transition-colors">
            Home
          </a>
          <Link to="/about" className="hover:text-navy transition-colors">
            About
          </Link>
          <Link to="/contact" className="hover:text-navy transition-colors">
            Contact
          </Link>
        </div>

        <Link
          to="/products"
          className="rounded-full bg-navy px-5 py-2 text-[13px] font-semibold text-white shadow-sm shadow-navy/15 hover:bg-navy-600 transition-colors"
        >
          Browse products
        </Link>
      </div>

      {/* hairline in the packaging's cyan → teal sweep */}
      <div className="h-px w-full bg-linear-to-r from-brand-cyan via-brand-teal to-transparent opacity-70" />
    </nav>
  );
}
