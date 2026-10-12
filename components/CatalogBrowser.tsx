"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { catalogPage, CATALOG_PAGE_SIZE, type Filters } from "@/lib/catalog";
import type { Product } from "@/lib/products";
import type { Offer } from "@/lib/amazon";
export default function CatalogBrowser({
  products,
  offers,
  initial,
  initialPage = 1,
}: {
  products: Product[];
  offers: Offer[];
  initial: Filters;
  initialPage?: number;
}) {
  const [filters, setFilters] = useState<Filters>(initial);
  const [page, setPage] = useState(initialPage);
  const [selected, setSelected] = useState<string[]>([]);
  const [offerMap, setOfferMap] = useState<Record<string, Offer>>(() =>
    Object.fromEntries(offers.map((o) => [o.asin, o])),
  );
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const current = catalogPage(products, filters, page);
  const visible = current.visible;
  const ids = visible.map((p) => p.asin).join(",");
  useEffect(() => {
    const missing = ids.split(",").filter((id) => id && !offerMap[id]);
    if (!missing.length) {
      setLoading(false);
      setFailed(false);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    fetch("/api/offers?ids=" + missing.join(","), { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("offers_unavailable");
        return r.json();
      })
      .then((data) =>
        setOfferMap((s) => ({
          ...s,
          ...Object.fromEntries(
            (data.items || []).map((o: Offer) => [o.asin, o]),
          ),
        })),
      )
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [ids]);
  function update(key: keyof Filters, value: string) {
    setFilters((s) => ({ ...s, [key]: value }));
    setPage(1);
  }
  function category(value: string) {
    setFilters({ category: value });
    setPage(1);
  }
  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 4
          ? [...s, id]
          : s,
    );
  }
  const options = (key: "brand" | "material" | "size" | "kind") =>
    [
      ...new Set(
        products
          .filter((p) => !filters.category || p.category === filters.category)
          .map((p) => p[key])
          .filter((s): s is string => Boolean(s) && s !== "Nicht angegeben"),
      ),
    ].sort((a, b) => a.localeCompare(b, "de", { numeric: true }));
  return (
    <>
      <div className="catalog-tools" role="group" aria-label="Produktkategorie">
        {[
          ["", "Alle Produkte"],
          ["matratze", "Matratzen"],
          ["zubehoer", "Zubehör"],
        ].map(([value, label]) => (
          <button
            type="button"
            aria-pressed={(filters.category || "") === value}
            className={(filters.category || "") === value ? "active" : ""}
            key={value}
            onClick={() => category(value)}
          >
            {label} (
            {products.filter((p) => !value || p.category === value).length})
          </button>
        ))}
      </div>
      <div className="filter-bar">
        <label>
          Modell suchen
          <input
            type="search"
            placeholder="Marke oder Modell"
            value={filters.query || ""}
            onChange={(e) => update("query", e.target.value)}
          />
        </label>
        <label>
          Marke
          <select
            value={filters.brand || ""}
            onChange={(e) => update("brand", e.target.value)}
          >
            <option value="">Alle Marken</option>
            {options("brand").map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Material
          <select
            value={filters.material || ""}
            onChange={(e) => update("material", e.target.value)}
          >
            <option value="">Alle Materialien</option>
            {options("material").map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Größe
          <select
            value={filters.size || ""}
            onChange={(e) => update("size", e.target.value)}
          >
            <option value="">Alle Größen</option>
            {options("size").map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
        <label>
          Härtegrad
          <select
            value={filters.firmness || ""}
            onChange={(e) => update("firmness", e.target.value)}
          >
            <option value="">Alle Härtegrade</option>
            {[...new Set(products.flatMap((p) => p.firmness || []))]
              .sort()
              .map((x) => (
                <option key={x}>{x}</option>
              ))}
          </select>
        </label>
        <label>
          Produktart
          <select
            value={filters.kind || ""}
            onChange={(e) => update("kind", e.target.value)}
          >
            <option value="">Alle Produktarten</option>
            {options("kind").map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="catalog-count">
        <p role="status">
          {current.filtered.length}{" "}
          {current.filtered.length === 1 ? "Produkt" : "Produkte"} in deiner
          Auswahl
          {current.filtered.length > CATALOG_PAGE_SIZE
            ? ` · Seite ${current.page} von ${current.pages}`
            : ""}
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => {
            setFilters({ category: initial.category });
            setPage(1);
          }}
        >
          Filter zurücksetzen
        </button>
      </div>
      {loading && (
        <p className="small-note" role="status">
          Aktuelle Amazon-Angebote werden geladen …
        </p>
      )}
      {failed && (
        <p className="small-note" role="status">
          Angebotsdaten sind gerade nicht abrufbar. Prüfe Preis und
          Verfügbarkeit direkt bei Amazon.
        </p>
      )}
      {visible.length ? (
        <div className="product-grid">
          {visible.map((p) => (
            <div className="selectable-card" key={p.asin}>
              <ProductCard product={p} offer={offerMap[p.asin]} />
              <label className="compare-check">
                <input
                  type="checkbox"
                  checked={selected.includes(p.asin)}
                  disabled={!selected.includes(p.asin) && selected.length >= 4}
                  onChange={() => toggle(p.asin)}
                />
                {selected.includes(p.asin)
                  ? "Im Vergleich"
                  : "Zum Vergleich hinzufügen"}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <div className="notice">
          <h2>Kein Modell mit diesen Angaben.</h2>
          <p>
            Diese Kombination ist im aktuellen Katalog nicht belegt. Ändere
            deine Filter oder nutze den Finder.
          </p>
        </div>
      )}
      {current.pages > 1 && (
        <nav className="catalog-pages" aria-label="Katalogseiten">
          <button
            type="button"
            disabled={current.page === 1}
            onClick={() => setPage(current.page - 1)}
          >
            ← Zurück
          </button>
          {Array.from({ length: current.pages }, (_, i) => i + 1).map((n) => (
            <button
              type="button"
              key={n}
              aria-current={n === current.page ? "page" : undefined}
              className={n === current.page ? "active" : ""}
              onClick={() => setPage(n)}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={current.page === current.pages}
            onClick={() => setPage(current.page + 1)}
          >
            Weiter →
          </button>
        </nav>
      )}
      {selected.length > 0 && (
        <div className="compare-tray" role="status">
          <div>
            <strong>{selected.length} von 4 Modellen ausgewählt</strong>
            <span>
              {selected
                .map((id) => products.find((p) => p.asin === id)?.brand)
                .join(" · ")}
            </span>
          </div>
          {selected.length >= 2 ? (
            <Link
              className="button button-primary"
              href={`/vergleich?ids=${selected.join(",")}`}
            >
              Jetzt vergleichen →
            </Link>
          ) : (
            <span>Wähle ein zweites Modell.</span>
          )}
          <button
            type="button"
            className="text-link"
            onClick={() => setSelected([])}
          >
            Auswahl leeren
          </button>
        </div>
      )}
    </>
  );
}
