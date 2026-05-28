import type { MetadataRoute } from "next";

const BASE_URL = "https://masserre.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Bloquea el styleguide y cualquier ruta interna que pueda añadirse en el futuro
        disallow: ["/styleguide", "/styleguide/", "/api/", "/_next/"],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
