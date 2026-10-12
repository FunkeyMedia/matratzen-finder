const assert = require("node:assert/strict");
const {
  filterProducts,
  comparisonProducts,
} = require("../.test-build/catalog.js");
const { products } = require("../.test-build/products.js");
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
