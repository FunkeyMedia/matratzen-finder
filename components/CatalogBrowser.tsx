"use client";
import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { filterProducts, type Filters } from "@/lib/catalog";
import type { Product } from "@/lib/products";
import type { Offer } from "@/lib/amazon";
export default function CatalogBrowser({
  products,
  offers,
  initial,
}: {
  products: Product[];
  offers: Offer[];
  initial: Filters;
}) {
  const [filters, setFilters] = useState<Filters>(initial);
  const [selected, setSelected] = useState<string[]>([]);
  const visible = filterProducts(products, filters);
  const update = (key: keyof Filters, value: string) =>
    setFilters((s) => ({ ...s, [key]: value }));
  function toggle(id: string) {
    setSelected((s) =>
      s.includes(id)
        ? s.filter((x) => x !== id)
        : s.length < 4
          ? [...s, id]
          : s,
    );
  }
  return (
    <>
      <div className="catalog-tools" role="group" aria-label="Produktkategorie">
        {[
          ["", "Alle Produkte"],
          ["matratze", "Matratzen"],
          ["zubehoer", "Zubehör"],
        ].map(([value, label]) => (
          <Link
            aria-current={
              (filters.category || "") === value ? "page" : undefined
            }
            className={(filters.category || "") === value ? "active" : ""}
            key={value}
            href={
              value === "matratze"
                ? "/katalog?typ=matratzen"
                : value === "zubehoer"
                  ? "/katalog?typ=zubehoer"
                  : "/katalog"
            }
          >
            {label}
          </Link>
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
          Material
          <select
            value={filters.material || ""}
            onChange={(e) => update("material", e.target.value)}
          >
            <option value="">Alle Materialien</option>
            {[...new Set(products.map((p) => p.material).filter(Boolean))].map(
              (x) => (
                <option key={x}>{x}</option>
              ),
            )}
          </select>
        </label>
        <label>
          Größe
          <select
            value={filters.size || ""}
            onChange={(e) => update("size", e.target.value)}
          >
            <option value="">Alle Größen</option>
            {[...new Set(products.map((p) => p.size))].map((x) => (
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
            <option>H2</option>
            <option>H3</option>
          </select>
        </label>
      </div>
      <div className="catalog-count">
        <p role="status">
          {visible.length} {visible.length === 1 ? "Produkt" : "Produkte"} in
          deiner Auswahl
        </p>
        <button
          type="button"
          className="text-link"
          onClick={() => setFilters({ category: initial.category })}
        >
          Filter zurücksetzen
        </button>
      </div>
      {visible.length ? (
        <div className="product-grid">
          {visible.map((p) => (
            <div className="selectable-card" key={p.asin}>
              <ProductCard
                product={p}
                offer={offers.find((o) => o.asin === p.asin)}
              />
              <label className="compare-check">
                <input
                  type="checkbox"
                  checked={selected.includes(p.asin)}
                  disabled={!selected.includes(p.asin) && selected.length >= 4}
                  onChange={() => toggle(p.asin)}
                />{" "}
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
            Im aktuellen Katalog ist diese Kombination nicht belegt. Ändere
            deine Filter oder nutze den Finder für eine erste Orientierung.
          </p>
        </div>
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
