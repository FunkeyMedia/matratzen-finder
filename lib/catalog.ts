import type { Product } from "./products";
export type Filters = {
  category?: string;
  size?: string;
  material?: string;
  firmness?: string;
  query?: string;
};
export function filterProducts(items: Product[], filters: Filters): Product[] {
  const query = filters.query?.trim().toLocaleLowerCase("de-DE");
  return items.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.size || p.size === filters.size) &&
      (!filters.material || p.material === filters.material) &&
      (!filters.firmness || p.firmness?.includes(filters.firmness)) &&
      (!query ||
        `${p.brand} ${p.name} ${p.kind}`
          .toLocaleLowerCase("de-DE")
          .includes(query)),
  );
}
export function comparisonProducts(items: Product[], ids: string): Product[] {
  return [...new Set(ids.split(","))]
    .map((id) => items.find((p) => p.asin === id))
    .filter((p): p is Product => Boolean(p))
    .slice(0, 4);
}
