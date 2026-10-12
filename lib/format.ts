/** Stable German display in SSR and browsers regardless of their local timezone. */
export function formatOfferDate(value: string): string {
  return new Date(value).toLocaleString("de-DE", { timeZone: "Europe/Berlin" });
}
