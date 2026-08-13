import React from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAccount } from "../context/AccountContext";
import { getPriceFor } from "../data/productData";

export default function PriceTag({
  product,
  unit,
  size = "md",
  className = "",
}) {
  const { canSeePricing, accountType } = useAccount();

  const scale = {
    sm: { price: "text-base sm:text-xl", unit: "text-[10px]", lock: "text-[11px]" },
    md: { price: "text-xl sm:text-2xl", unit: "text-[11px]", lock: "text-[12px]" },
    lg: { price: "text-3xl sm:text-4xl", unit: "text-[13px]", lock: "text-[13px]" },
  }[size];

  if (!canSeePricing) {
    return (
      <Link
        to="/register"
        className={`inline-flex items-center gap-1.5 font-semibold text-brand-cyan-deep transition-colors hover:text-navy ${scale.lock} ${className}`}
      >
        <Lock size={12} aria-hidden="true" className="shrink-0" />
        Register to see pricing
      </Link>
    );
  }

  const price = getPriceFor(product, accountType);

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 ${className}`}>
      <span className={`font-bold text-navy ${scale.price}`}>
        ${price.toFixed(2)}
      </span>
      {unit && (
        <span className={`font-medium text-body-soft ${scale.unit}`}>/ {unit}</span>
      )}
    </span>
  );
}
