import type { Product } from "./products";
export type Filters = {
  category?: string;
  size?: string;
  material?: string;
  firmness?: string;
  query?: string;
  brand?: string;
  kind?: string;
};
export function filterProducts(items: Product[], filters: Filters): Product[] {
  const query = filters.query?.trim().toLocaleLowerCase("de-DE");
  return items.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.brand || p.brand === filters.brand) &&
      (!filters.kind || p.kind === filters.kind) &&
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

export const CATALOG_PAGE_SIZE = 18;
export function catalogPage(
  items: Product[],
  filters: Filters,
  requested: number,
) {
  const filtered = filterProducts(items, filters);
  const pages = Math.max(1, Math.ceil(filtered.length / CATALOG_PAGE_SIZE));
  const page = Number.isInteger(requested)
    ? Math.max(1, Math.min(pages, requested))
    : 1;
  return {
    filtered,
    page,
    pages,
    visible: filtered.slice(
      (page - 1) * CATALOG_PAGE_SIZE,
      page * CATALOG_PAGE_SIZE,
    ),
  };
}

/** Stable ten-ASIN groups make overlapping pages share persistent offer cache entries. */
export function offerBatches(
  items: Product[],
  requested: string[],
): string[][] {
  const index = new Map(items.map((p, i) => [p.asin, i]));
  const groups = new Set<number>();
  for (const asin of requested) {
    const i = index.get(asin);
    if (i !== undefined) groups.add(Math.floor(i / 10));
  }
  return [...groups]
    .sort((a, b) => a - b)
    .map((n) => items.slice(n * 10, n * 10 + 10).map((p) => p.asin));
}
