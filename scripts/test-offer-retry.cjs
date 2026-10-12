const assert = require("node:assert/strict");
const { retryTransient } = require("../.test-build/retry.js");
const { offerBatches } = require("../.test-build/catalog.js");
const { products } = require("../.test-build/products.js");
(async () => {
  let calls = 0;
  const delays = [];
  const r = await retryTransient(
    async () => new Response("", { status: ++calls < 3 ? 429 : 200 }),
    async (ms) => {
      delays.push(ms);
    },
  );
  assert.equal(r.status, 200);
  assert.equal(calls, 3);
  assert.deepEqual(delays, [4000, 8000]);
  calls = 0;
  await retryTransient(
    async () => {
      calls++;
      return new Response("", { status: 401 });
    },
    async () => {},
  );
  assert.equal(calls, 1);
  calls = 0;
  const fail = await retryTransient(
    async () => {
      calls++;
      return new Response("", { status: 503 });
    },
    async () => {},
  );
  assert.equal(fail.status, 503);
  assert.equal(calls, 3);
  const one = offerBatches(
    products,
    products.slice(0, 18).map((p) => p.asin),
  );
  const two = offerBatches(
    products,
    products.slice(18, 36).map((p) => p.asin),
  );
  assert.deepEqual(one[1], two[0]);
  assert.ok([...one, ...two].every((b) => b.length <= 10));
  assert.deepEqual(offerBatches(products, ["INVALID"]), []);
  console.log(
    "Transient rate-limit retries, bounded failures, no credential retries and shared page-cache groups: PASS",
  );
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
