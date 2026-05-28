import type { MetadataRoute } from "next";

const BASE_URL = "https://masserre.com";

/**
 * Lista explícita de rutas públicas.
 * NUNCA añadir aquí /styleguide u otras páginas internas.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    // Cuando se creen rutas adicionales (por ej. /suite-vinya), añadirlas aquí
    // siguiendo el mismo formato. La página /styleguide queda fuera a propósito.
  ];
}
