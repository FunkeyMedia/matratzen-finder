"use client";
import { useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/products";
export default function CompareSelector({
  products,
  initial = [],
}: {
  products: Product[];
  initial?: string[];
}) {
  const [selected, setSelected] = useState(initial);
  const [query, setQuery] = useState("");
  const matching = products.filter((p) =>
    `${p.brand} ${p.name} ${p.kind} ${p.size}`
      .toLocaleLowerCase("de-DE")
      .includes(query.trim().toLocaleLowerCase("de-DE")),
  );
  const visible = [
    ...products.filter((p) => selected.includes(p.asin)),
    ...matching.filter((p) => !selected.includes(p.asin)).slice(0, 12),
  ];
  return (
    <div className="compare-selector">
      <h2>Welche Modelle möchtest du vergleichen?</h2>
      <p>
        Wähle zwei bis vier Produkte. Verglichen werden die konkret
        recherchierten Ausführungen.
      </p>
      <label className="compare-search">
        Modell für Vergleich suchen
        <input
          type="search"
          placeholder="Marke, Modell oder Größe"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <p className="small-note">
        {matching.length} passende Modelle
        {matching.length > 12
          ? " · Die ersten zwölf Treffer werden angezeigt. Grenze deine Suche ein."
          : ""}
      </p>
      <div className="compare-options">
        {visible.map((p) => (
          <label key={p.asin}>
            <input
              type="checkbox"
              checked={selected.includes(p.asin)}
              disabled={!selected.includes(p.asin) && selected.length >= 4}
              onChange={() =>
                setSelected((s) =>
                  s.includes(p.asin)
                    ? s.filter((id) => id !== p.asin)
                    : [...s, p.asin],
                )
              }
            />
            <span>
              <strong>
                {p.brand} {p.name}
              </strong>
              <small>
                {p.size} · {p.kind}
              </small>
            </span>
          </label>
        ))}
      </div>
      {selected.length >= 2 ? (
        <Link
          className="button button-primary"
          href={`/vergleich?ids=${selected.join(",")}`}
        >
          Diese Modelle vergleichen →
        </Link>
      ) : (
        <p className="small-note" role="status">
          Wähle mindestens zwei Modelle.
        </p>
      )}
    </div>
  );
}
