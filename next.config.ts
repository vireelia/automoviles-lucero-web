import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Fallo real detectado (02/11/2026, desplegando en Cloudflare Workers):
  // Cache Components usa un setTimeout() que el runtime de Workers no
  // soporta igual -- colgaba TODAS las peticiones (el propio Worker nunca
  // llegaba a responder, Cloudflare cancelaba la petición). Nunca se usa
  // "use cache" en este proyecto, así que se desactiva sin perder nada.
  cacheComponents: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
