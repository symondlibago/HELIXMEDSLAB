export const TIERS = ["20", "50", "100", "200"];

export const SINGLE_UNIT_MULTIPLIER = 2.5;

export const PRICE_MULTIPLIERS = {
  retail: SINGLE_UNIT_MULTIPLIER,
  wholesale: 1.75,
};

/** Price for a given account type, defaulting to retail. */
export const getPriceFor = (product, accountType) =>
  product.prices[0] * (PRICE_MULTIPLIERS[accountType] ?? SINGLE_UNIT_MULTIPLIER);

const PRODUCT_IMAGE_EXTENSION = "png";

const productImage = (folder, filename) =>
  `/product images/${folder}/${filename}.${PRODUCT_IMAGE_EXTENSION}`;

export const createProductSlug = (name, spec) =>
  `${name}-${spec}`
    .toLowerCase()
    .replace(/\+/g, " plus ")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const makeProduct = ({
  name,
  spec,
  prices,
  image,
  category,
  format,
}) => ({
  name,
  spec,
  prices,
  image,
  category,
  format,
  unit: category === "vials" ? "vial" : "pen",
  slug: createProductSlug(name, spec),
  summary:
    category === "vials"
      ? `${name} is supplied as a research-grade lyophilized preparation in a ${spec} vial format for qualified laboratory workflows.`
      : `${name} is supplied in a ${spec} pen format for qualified laboratory research and controlled handling workflows.`,
});

export const VIALS = [
  makeProduct({ name: "B12", spec: "10 mg", prices: [22.5, 21.5, 20.5, 19.0], image: productImage("vial", "B12 (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "BPC-157", spec: "5 mg", prices: [19.0, 18.0, 17.5, 16.0], image: productImage("vial", "BPC (5)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "BPC-157", spec: "10 mg", prices: [34.5, 33.0, 31.5, 29.0], image: productImage("vial", "BPC (10)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "CJC-1295 + IPA", spec: "5/5 mg", prices: [43.0, 41.0, 39.5, 36.0], image: productImage("vial", "CJC"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "DSIP", spec: "5 mg", prices: [17.5, 17.0, 16.5, 15.0], image: productImage("vial", "DSIP (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Epithalon", spec: "10 mg", prices: [17.5, 17.0, 16.5, 15.0], category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "GHK-Cu", spec: "50 mg", prices: [41.5, 40.0, 38.5, 35.0], image: productImage("vial", "GHK-CU (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "GLOW", spec: "10/10/50", prices: [73.0, 70.0, 67.0, 61.0], image: productImage("vial", "GLOW (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Glutathione", spec: "1500 mg", prices: [37.0, 35.5, 34.0, 31.0], image: productImage("vial", "GLUTA"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Ipamorelin", spec: "10 mg", prices: [32.0, 31.0, 29.5, 27.0], image: productImage("vial", "IPAMORELIN (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Kisspeptin", spec: "5 mg", prices: [22.5, 21.5, 20.5, 19.0], image: productImage("vial", "KISSPEPTIN (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "KLOW", spec: "10/10/10/50", prices: [88.5, 85.0, 81.0, 74.0], image: productImage("vial", "KLOW"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "KPV", spec: "10 mg", prices: [28.5, 27.5, 26.0, 24.0], image: productImage("vial", "KPV"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "MOTS-C", spec: "10 mg", prices: [40.5, 39.0, 37.0, 34.0], image: productImage("vial", "MOTS-C"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "MT2", spec: "10 mg", prices: [23.5, 22.5, 22.0, 20.0], image: productImage("vial", "MT 2"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "NAD+", spec: "500 mg", prices: [40.5, 39.0, 37.0, 34.0], image: productImage("vial", "NAD+ (500)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "NAD+", spec: "1000 mg", prices: [53.5, 51.5, 49.5, 45.0], image: productImage("vial", "NAD+ (1000)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Retatrutide", spec: "10 mg", prices: [52.5, 50.5, 48.0, 44.0], category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Retatrutide", spec: "20 mg", prices: [63.0, 60.5, 58.0, 53.0], image: productImage("vial", "RETA (20)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Retatrutide", spec: "30 mg", prices: [79.0, 75.5, 72.5, 66.0], image: productImage("vial", "RETA (30)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Selank", spec: "10 mg", prices: [41.5, 40.0, 38.5, 35.0], category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Semax", spec: "10 mg", prices: [41.5, 40.0, 38.5, 35.0], image: productImage("vial", "SEMAX (1)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Semaglutide", spec: "10 mg", prices: [29.5, 28.5, 27.5, 25.0], category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Semaglutide", spec: "20 mg", prices: [35.5, 34.0, 33.0, 30.0], image: productImage("vial", "SEMA (20)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Semaglutide", spec: "30 mg", prices: [55.0, 52.5, 50.5, 46.0], image: productImage("vial", "SEMA (30)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "TB-500", spec: "5 mg", prices: [33.0, 32.0, 30.5, 28.0], image: productImage("vial", "TB (5)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "TB-500", spec: "10 mg", prices: [46.5, 44.5, 42.5, 39.0], image: productImage("vial", "TB (10)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Thymosin Alpha-1", spec: "5 mg", prices: [34.5, 33.0, 31.5, 29.0], category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Tirzepatide", spec: "10 mg", prices: [34.5, 33.0, 31.5, 29.0], image: productImage("vial", "Tirze (10)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Tirzepatide", spec: "20 mg", prices: [41.5, 40.0, 38.5, 35.0], image: productImage("vial", "Tirze (20)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Tirzepatide", spec: "30 mg", prices: [64.5, 62.0, 59.0, 54.0], image: productImage("vial", "Tirze (30)"), category: "vials", format: "Lyophilized vial" }),
  makeProduct({ name: "Wolverine", spec: "10/10", prices: [53.5, 51.5, 49.5, 45.0], image: productImage("vial", "Wolverine"), category: "vials", format: "Lyophilized vial" }),
];

export const PENS = [
  makeProduct({ name: "Tirzepatide Pen", spec: "40 mg", prices: [175, 165, 155, 145], image: productImage("pen", "Tirze Pen"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "Retatrutide Pen", spec: "40 mg", prices: [175, 165, 155, 145], image: productImage("pen", "Reta Pen"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "Biotin Pen", spec: "40 mg", prices: [170, 160, 150, 140], image: productImage("pen", "Biotin Pen"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "GLOW Pen", spec: "80 mg", prices: [175, 165, 155, 145], image: productImage("pen", "GLOW"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "KLOW Pen", spec: "80 mg", prices: [170, 160, 150, 140], image: productImage("pen", "KLOW Pen"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "Glutathione Pen", spec: "1000 mg", prices: [170, 160, 150, 140], image: productImage("pen", "Glutathione Pen"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "NAD+ & B12 Pen", spec: "1000 mg", prices: [170, 160, 150, 140], image: productImage("pen", "NAD+B12"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "B Vitamin Complex Pen", spec: "1000 mg", prices: [170, 160, 150, 140], image: productImage("pen", "B VITAMIN"), category: "pens", format: "Research pen" }),
  makeProduct({ name: "Wolverine Pen", spec: "40 mg", prices: [175, 165, 155, 145], image: productImage("pen", "WOLVERINE"), category: "pens", format: "Research pen" }),
];

export const ALL_PRODUCTS = [...VIALS, ...PENS];

export const getProductBySlug = (slug) =>
  ALL_PRODUCTS.find((product) => product.slug === slug);