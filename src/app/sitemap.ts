import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.automoviles-lucero.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const rutas = ["", "/compramos-tu-coche", "/compramos-furgonetas"];
  return rutas.map((ruta) => ({
    url: `${SITE_URL}${ruta}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: ruta === "" ? 1 : 0.8,
  }));
}
