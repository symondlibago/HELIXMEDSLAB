import React from "react";
import HelixWave from "./HelixWave";

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-cyan-deep">
        {title}
      </h4>
      <ul className="mt-5 space-y-3 text-[13px] text-body">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="hover:text-navy transition-colors">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

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
          links={["All products", "New arrivals", "Bulk orders"]}
        />
        <FooterCol
          title="Quality"
          links={["Certificates of Analysis", "Testing methods", "Our difference"]}
        />
        <FooterCol title="Support" links={["Contact", "Shipping", "Terms"]} />
      </div>

      {/* policies bar */}
      <div className="relative border-t border-line bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-body sm:gap-x-8">
          <span className="w-full font-semibold text-navy sm:w-auto">Our Policies</span>
          {[
            "Privacy Policy",
            "Shipping Policy",
            "Return and Refunds",
            "Terms and Condition",
            "Legal Disclaimer",
          ].map((p) => (
            <a key={p} href="#" className="py-0.5 hover:text-navy hover:underline">
              {p}
            </a>
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
