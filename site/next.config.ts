import type { NextConfig } from "next";

// App legado (Next 12, WebView do app nativo). Quando definido, tudo o que o
// site institucional não conhece cai nele — ver src/proxy.ts.
const LEGACY_APP_URL = process.env.LEGACY_APP_URL?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Desligado de propósito: uma URL de detalhe ainda não gerada renderiza
  // por inteiro na primeira visita (como fallback: 'blocking'), então
  // buscadores sempre recebem título, meta tags e conteúdo completos.
  partialPrefetching: false,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "pibpam.s3.us-east-1.amazonaws.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],
  },
  async rewrites() {
    if (!LEGACY_APP_URL) return [];
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [
        { source: "/:path*", destination: `${LEGACY_APP_URL}/:path*` },
      ],
    };
  },
};

export default nextConfig;
