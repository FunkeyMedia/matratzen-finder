const assert = require("node:assert/strict");
const {
  filterProducts,
  comparisonProducts,
} = require("../.test-build/catalog.js");
const { products: allProducts } = require("../.test-build/products.js");
const products = allProducts.filter((p) =>
  [
    "B07QY18HWP",
    "B0C8Z79P4L",
    "B07ZRQFB5S",
    "B01N6QMZED",
    "B09XR49YJF",
    "B07KCF3LHR",
  ].includes(p.asin),
);
assert.equal(
  filterProducts(products, {
    category: "matratze",
    size: "90 × 200 cm",
    material: "Taschenfederkern",
  }).length,
  1,
);
assert.equal(
  filterProducts(products, { category: "matratze", size: "180 × 200 cm" })
    .length,
  0,
);
assert.equal(filterProducts(products, { firmness: "H2" }).length, 2);
assert.equal(filterProducts(products, { query: "EMMA" }).length, 1);
assert.equal(filterProducts(products, { category: "zubehoer" }).length, 2);
assert.equal(
  comparisonProducts(products, "B07QY18HWP,B07QY18HWP,unknown,B07ZRQFB5S")
    .length,
  2,
);
assert.equal(
  comparisonProducts(products, products.map((p) => p.asin).join(",")).length,
  4,
);
console.log(
  "Catalog filters, exact sizes, search, unique comparison and maximum selection: PASS",
);

const { catalogPage, CATALOG_PAGE_SIZE } = require("../.test-build/catalog.js");
const synthetic = Array.from({ length: 45 }, (_, i) => ({
  ...products[0],
  asin: String(i),
  brand: i === 44 ? "Last Brand" : "Other",
}));
assert.equal(
  catalogPage(synthetic, { query: "Last Brand" }, 1).visible[0].asin,
  "44",
);
assert.equal(catalogPage(synthetic, {}, 2).visible[0].asin, "18");
assert.equal(catalogPage(synthetic, {}, 99).visible.length, 9);
assert.equal(catalogPage(synthetic, {}, NaN).page, 1);
assert.equal(CATALOG_PAGE_SIZE, 18);
console.log(
  "Whole-catalog filters before pagination, page clamping and 18-card offer limit: PASS",
);
