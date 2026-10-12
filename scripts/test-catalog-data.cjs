const assert = require("node:assert/strict");
const {
  products,
  mattresses,
  accessories,
} = require("../.test-build/products.js");
assert.ok(mattresses.length >= 200);
assert.ok(accessories.length >= 50);
for (const key of ["asin", "slug", "modelKey"])
  assert.equal(
    new Set(products.map((p) => p[key])).size,
    products.length,
    key + " duplicate",
  );
const parents = products.map((p) => p.parentAsin).filter(Boolean);
assert.equal(new Set(parents).size, parents.length);
for (const p of products) {
  assert.match(p.asin, /^[A-Z0-9]{10}$/);
  assert.equal(p.source, "https://www.amazon.de/dp/" + p.asin);
  assert.ok(p.name && p.brand && p.caveat && p.features.length);
  assert.ok(!("price" in p) && !("image" in p));
  assert.equal(p.verifiedAt, "2026-10-12");
}
for (const p of mattresses) {
  const match = p.size.match(/^(\d+(?:\.\d+)?) × (\d+(?:\.\d+)?) cm$/);
  assert.ok(match, p.slug);
  assert.ok(Number(match[1]) >= 70 && Number(match[2]) >= 180);
  if (p.height) assert.ok(p.height >= 8 && p.height <= 45);
}
assert.equal(
  products.find(
    (p) => p.brand === "bett1" && p.name === "BODYGUARD Anti-Kartell",
  ).height,
  18.5,
);
assert.equal(
  products.find((p) => p.brand === "bett1" && p.name === "BODYGUARD Boxspring")
    .kind,
  "Kaltschaum",
);
console.log(
  `${mattresses.length} mattress families, ${accessories.length} accessories, unique ASINs/slugs/families and source-bound variant facts: PASS`,
);
