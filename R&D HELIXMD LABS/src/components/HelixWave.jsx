import React from "react";

/**
 * The cyan → teal ribbon that sweeps across the face of the HelixMD Labs
 * carton, rebuilt as a scalable SVG so it can anchor sections the same way it
 * anchors the packaging. Each strand is the same curve nudged along Y, which
 * is what gives the bundle its woven look.
 */

const STRAND_COUNT = 14;

const strandPath = (i) => {
  const drift = i * 7;
  return [
    `M -60 ${188 + drift * 0.55}`,
    `C 210 ${96 + drift} 380 ${262 + drift * 0.35} 640 ${176 + drift * 0.7}`,
    `S 1080 ${52 + drift * 0.9} 1240 ${132 + drift * 0.6}`,
    `S 1420 ${196 + drift * 0.4} 1520 ${150 + drift * 0.5}`,
  ].join(" ");
};

export default function HelixWave({ className = "", uid = "hw", flip = false }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={`${uid}-stroke`} x1="0" y1="0" x2="1" y2="0.35">
          <stop offset="0%" stopColor="#17a8e0" stopOpacity="0" />
          <stop offset="18%" stopColor="#17a8e0" stopOpacity="0.9" />
          <stop offset="55%" stopColor="#1bb5c7" stopOpacity="0.95" />
          <stop offset="82%" stopColor="#1fbfae" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1fbfae" stopOpacity="0" />
        </linearGradient>
      </defs>

      {Array.from({ length: STRAND_COUNT }, (_, i) => (
        <path
          key={i}
          d={strandPath(i)}
          fill="none"
          stroke={`url(#${uid}-stroke)`}
          strokeWidth={i % 4 === 0 ? 1.6 : 1}
          strokeOpacity={0.9 - i * 0.045}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}
