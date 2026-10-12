const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const render = (TZ, date) =>
  execFileSync(
    process.execPath,
    [
      "-e",
      `console.log(require('./.test-build/format.js').formatOfferDate('${date}'))`,
    ],
    { env: { ...process.env, TZ }, encoding: "utf8" },
  ).trim();
for (const date of ["2026-10-12T10:00:00.000Z", "2026-12-12T10:00:00.000Z"]) {
  const server = render("UTC", date);
  assert.equal(render("Europe/Berlin", date), server);
  assert.equal(render("America/New_York", date), server);
}
assert.match(render("UTC", "2026-10-12T10:00:00.000Z"), /12:00:00/);
assert.match(render("UTC", "2026-12-12T10:00:00.000Z"), /11:00:00/);
console.log(
  "Offer dates: stable across server/browser timezones and daylight saving PASS",
);
