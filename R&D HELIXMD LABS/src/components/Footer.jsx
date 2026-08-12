import React from "react";
import { Link } from "react-router-dom";
import HelixWave from "./HelixWave";

/* Links are {label, to} for in-app routes, or {label} alone for the ones that
   have no destination yet — those stay inert rather than pretending to work. */
function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cyan-deep">
        {title}
      </h4>
      <ul className="mt-5 space-y-3 text-[13px] text-body">
        {links.map(({ label, to }) => (
          <li key={label}>
            {to ? (
              <Link to={to} className="hover:text-navy transition-colors">
                {label}
              </Link>
            ) : (
              <span className="text-body-soft">{label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const POLICY_LINKS = [
  { label: "Privacy Policy", to: "/legal#privacy" },
  { label: "Shipping Policy", to: "/legal#shipping" },
  { label: "Refund Policy", to: "/legal#refunds" },
  { label: "Terms of Service", to: "/legal#terms" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ice-100">
      {/* the carton's ribbon, washed back so it reads as watermark */}
      <HelixWave
        uid="footer-wave"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 w-full opacity-35"
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10 py-16 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <img
            src="/helixmd-logo.png"
            alt="HelixMD Labs"
            className="h-8 w-auto select-none"
            draggable="false"
          />
          <h3 className="mt-6 text-lg font-semibold text-navy">
            Precision · Quality · Transparency
          </h3>
          <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-body">
            Supporting scientific research with dependable research-grade peptides.
          </p>
        </div>

        <FooterCol
          title="Catalog"
          links={[
            { label: "All products", to: "/products" },
            { label: "New arrivals" },
            { label: "Bulk orders" },
          ]}
        />
        <FooterCol
          title="Quality"
          links={[
            { label: "Certificates of Analysis" },
            { label: "Testing methods" },
            { label: "Our difference", to: "/about" },
          ]}
        />
        <FooterCol
          title="Support"
          links={[
            { label: "Client registration", to: "/register" },
            { label: "Contact", to: "/contact" },
            { label: "Shipping", to: "/legal#shipping" },
            { label: "Terms", to: "/legal#terms" },
          ]}
        />
      </div>

      {/* policies bar */}
      <div className="relative border-t border-line bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-body sm:gap-x-8">
          <span className="w-full font-semibold text-navy sm:w-auto">Our Policies</span>
          {POLICY_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              className="py-0.5 hover:text-navy hover:underline"
            >
              {label}
            </Link>
          ))}
          {/* full-width and left-aligned on a phone — ml-auto alone stranded it
              on its own line, flush right, under a left-aligned list */}
          <span className="w-full text-body-soft sm:ml-auto sm:w-auto">
            © {new Date().getFullYear()} HelixMD Labs
          </span>
        </div>
      </div>
    </footer>
  );
}
