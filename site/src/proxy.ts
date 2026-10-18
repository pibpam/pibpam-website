import { NextResponse, type NextRequest } from "next/server";

/**
 * pibpam.org serve o site institucional e, no mesmo domínio, o app legado
 * (Next 12) que roda no WebView do app nativo.
 *
 * - O app nativo abre `https://www.pibpam.org?platform=ios|android`. Nessa
 *   primeira requisição gravamos um cookie e, a partir daí, toda requisição
 *   desse WebView é repassada (rewrite) para LEGACY_APP_URL.
 * - Para os demais visitantes, links antigos já compartilhados recebem 301
 *   para as páginas equivalentes do site novo.
 * - O que o site não conhece cai no `fallback` de next.config.ts (Bíblia,
 *   inscrições, área de membros…), que também aponta para o app legado.
 */

const LEGACY_APP_URL = process.env.LEGACY_APP_URL?.replace(/\/$/, "");
const APP_COOKIE = "pibpam_app";
const PLATFORMS = new Set(["ios", "android"]);

const REDIRECTS: [RegExp, (match: RegExpMatchArray) => string][] = [
  [/^\/about\/?$/, () => "/sobre"],
  [/^\/live\/?$/, () => "/ao-vivo"],
  [/^\/ministries\/?$/, () => "/ministerios"],
  [/^\/ministry\/[^/]+\/?$/, () => "/ministerios"],
  [/^\/broadcast\/[^/]+\/?$/, () => "/ao-vivo"],
  [/^\/schedule(\/.*)?$/, () => "/agenda"],
  [/^\/events\/?$/, () => "/conteudos/transmissoes"],
  [/^\/preaches\/?$/, () => "/conteudos/transmissoes"],
  [/^\/series\/?$/, () => "/conteudos/series"],
  [/^\/series\/([^/]+)\/?$/, (match) => `/conteudos/series/${match[1]}`],
  [/^\/event\/([^/]+)\/?$/, (match) => `/conteudos/video/${match[1]}`],
];

/** Desregistra o service worker antigo do app nos navegadores comuns. */
const KILL_SWITCH_SW = `self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    for (const key of await caches.keys()) await caches.delete(key);
    await self.registration.unregister();
    for (const client of await self.clients.matchAll({ type: "window" })) client.navigate(client.url);
  })());
});`;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const platform = searchParams.get("platform");
  const fromApp = (platform && PLATFORMS.has(platform)) || request.cookies.get(APP_COOKIE)?.value === "1";

  if (LEGACY_APP_URL && (fromApp || pathname.startsWith("/_next/data/"))) {
    const target = new URL(`${pathname}${request.nextUrl.search}`, LEGACY_APP_URL);
    const response = NextResponse.rewrite(target);
    if (platform && PLATFORMS.has(platform)) {
      response.cookies.set(APP_COOKIE, "1", { maxAge: 60 * 60 * 24 * 365, sameSite: "lax", secure: true, path: "/" });
    }
    return response;
  }

  if (pathname === "/sw.js") {
    return new NextResponse(KILL_SWITCH_SW, {
      headers: { "Content-Type": "application/javascript", "Cache-Control": "no-cache" },
    });
  }

  for (const [pattern, to] of REDIRECTS) {
    const match = pathname.match(pattern);
    if (match) return NextResponse.redirect(new URL(to(match), request.url), 301);
  }

  return NextResponse.next();
}

export const config = {
  // Fora: assets do próprio site. Dentro: páginas, /api, /_next/data e /sw.js.
  matcher: ["/((?!_next/static|_next/image|.*\\.(?:png|jpe?g|svg|webp|ico|woff2?)$).*)"],
};
