export const ACCOUNT_TYPES = [
  {
    slug: "retail",
    label: "Retail",
    tagline: "Individual researchers and small labs",
    blurb:
      "Standard catalog pricing, no minimum order. Best if you order for a single lab or project.",
    points: ["Catalog pricing", "No order minimum", "Ships to a single address"],
  },
  {
    slug: "wholesale",
    label: "Wholesale",
    tagline: "Clinics, pharmacies and distributors",
    blurb:
      "Tiered pricing that scales with volume. Requires business details and a short review before approval.",
    points: ["Volume pricing tiers", "Dedicated account manager", "Net terms available"],
  },
];

export const REFERRAL_TEAMS = [
  { id: "atlas", name: "Team Atlas", reps: ["A. Rivera", "M. Chen", "J. Okafor"] },
  { id: "meridian", name: "Team Meridian", reps: ["S. Delacroix", "P. Nakamura"] },
  { id: "vertex", name: "Team Vertex", reps: ["R. Alvarez", "T. Brennan", "K. Osei"] },
  { id: "direct", name: "HelixMD Labs — direct", reps: [] },
];

export const HEARD_FROM = [
  "Referred by a colleague",
  "Conference or trade show",
  "Search engine",
  "Social media",
  "Existing customer",
  "Other",
];

export const BUSINESS_TYPES = [
  "Clinic or medical practice",
  "Med spa or wellness center",
  "Compounding pharmacy",
  "Research laboratory",
  "University or institution",
  "Distributor or reseller",
  "Other",
];

export const MONTHLY_VOLUMES = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $50,000",
  "Over $50,000",
];

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID",
  "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO",
  "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA",
  "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
];

/* Shown on the confirmation screen — matches the review window we promise. */
export const REVIEW_WINDOW_HOURS = 48;
