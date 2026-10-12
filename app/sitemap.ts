import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { guides } from "@/lib/guides";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  const site = siteUrl;
  const paths = [
    "",
    "finder",
    "katalog",
    "vergleich",
    "ratgeber",
    "methode",
    "ueber-uns",
    "kontakt",
    "impressum",
    "datenschutz",
    "affiliate",
  ];
  return [
    ...guides.map((g) => ({
      url: `${site}/ratgeber/${g.slug}`,
      lastModified: new Date("2026-10-12"),
    })),
    ...paths.map((path) => ({
      url: `${site}/${path}`,
      lastModified: new Date(),
    })),
    ...products.map((p) => ({
      url: `${site}/produkt/${p.slug}`,
      lastModified: new Date(p.verifiedAt),
    })),
  ];
}
