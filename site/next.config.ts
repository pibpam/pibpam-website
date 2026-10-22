import type { NextConfig } from "next";

// App legado (Next 12, WebView do app nativo), em app.pibpam.org. Quando definido,
// o que o site institucional não conhece cai nele — ver src/proxy.ts.
const LEGACY_APP_URL = process.env.LEGACY_APP_URL?.replace(/\/$/, "");

// Em produção o site assume pibpam.org, que o app nativo antigo ainda abre.
// Sem LEGACY_APP_URL esse app pararia de funcionar: melhor falhar o deploy.
if (process.env.VERCEL_ENV === "production" && !LEGACY_APP_URL) {
  throw new Error("LEGACY_APP_URL é obrigatório em produção (ex.: https://app.pibpam.org). Veja docs/migracao-dominio.md.");
}

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Desligado de propósito: uma URL de detalhe ainda não gerada renderiza
  // por inteiro na primeira visita (como fallback: 'blocking'), então
  // buscadores sempre recebem título, meta tags e conteúdo completos.
  partialPrefetching: false,
  // O proxy precisa ver `/_next/data/<buildId>/...json` como o app legado pediu.
  // Sem isto o Next normaliza para `/pagina` e o rewrite devolveria HTML no lugar
  // do JSON (cada navegação do app antigo viraria recarga completa).
  skipProxyUrlNormalize: true,
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
