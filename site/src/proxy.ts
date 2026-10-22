import { NextResponse, type NextRequest } from "next/server";

/**
 * Convivência entre o site institucional (este projeto) e o app legado (Next 12).
 *
 * - pibpam.org e www.pibpam.org → este site.
 * - LEGACY_APP_URL (app.pibpam.org) → o app legado. O app nativo novo abre esse
 *   endereço direto e nunca passa por aqui.
 *
 * Suporte às versões antigas do app nativo, que ainda abrem
 * `https://www.pibpam.org?platform=ios|android` dentro do WebView:
 *
 * 1. `?platform=` (ou o cookie `pibpam_app`, gravado na primeira abertura) faz
 *    o tráfego do WebView ser repassado (rewrite) ao app legado, mantendo a URL.
 * 2. `/_next/data/*` (dados das páginas do Next 12), `/api/*`, `/auth/*` e
 *    arquivos que só o app legado tem são repassados sem redirecionar: o app
 *    antigo baixa imagens e faz login (Google) nesses endereços sem cookie.
 * 3. Navegadores comuns, em páginas que só existem no app, recebem 308 para o
 *    mesmo caminho em LEGACY_APP_URL (links antigos continuam funcionando).
 *
 * Para encerrar o suporte quando todos atualizarem: ver docs/migracao-dominio.md.
 */

const LEGACY_APP_URL = process.env.LEGACY_APP_URL?.replace(/\/$/, "");
const APP_COOKIE = "pibpam_app";
const PLATFORMS = new Set(["ios", "android"]);

/** Links antigos que têm página equivalente no site novo. */
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

/**
 * Páginas que só existem no app legado. Para navegadores comuns viram 308 para
 * LEGACY_APP_URL, preservando caminho e query (ex.: o link de acompanhamento
 * de inscrição enviado por e-mail). `/auth` e `/api` ficam de fora de
 * propósito: o app nativo antigo os usa sem cookie (ver item 2 acima).
 */
const LEGACY_ONLY_PREFIXES = [
  "/bible",
  "/birthdays",
  "/cadastro",
  "/collection",
  "/collections",
  "/devotional",
  "/devotionals",
  "/groups",
  "/inscricoes",
  "/login",
  "/lyrics",
  "/member",
  "/notices",
  "/privacy",
  "/reading-plan",
  "/recuperar-senha",
];

const isLegacyOnly = (pathname: string) =>
  LEGACY_ONLY_PREFIXES.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

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
  const { pathname, search, searchParams } = request.nextUrl;
  const platform = searchParams.get("platform");
  const isAppLaunch = Boolean(platform && PLATFORMS.has(platform));
  const fromApp = isAppLaunch || request.cookies.get(APP_COOKIE)?.value === "1";
  // Dados das páginas do Next 12 (`/_next/data/<buildId>/pagina.json`). O site
  // (App Router) não tem essas rotas, então só podem ser do app legado. Isso só
  // chega aqui como foi pedido por causa de `skipProxyUrlNormalize` (next.config.ts).
  const isLegacyData = pathname.startsWith("/_next/data/");

  if (LEGACY_APP_URL && (fromApp || isLegacyData)) {
    if (isAppLaunch && pathname === "/") {
      // Uma linha por abertura do app em versão antiga. Contar esses logs na
      // Vercel mostra quando o suporte pode ser encerrado (chegou perto de zero).
      console.info(JSON.stringify({ event: "legacy-app-launch", platform }));
    }
    const response = NextResponse.rewrite(new URL(`${pathname}${search}`, LEGACY_APP_URL));
    if (isAppLaunch) {
      response.cookies.set(APP_COOKIE, "1", { maxAge: 60 * 60 * 24 * 365, sameSite: "lax", secure: true, path: "/" });
    }
    return response;
  }

  if (LEGACY_APP_URL && isLegacyOnly(pathname)) {
    return NextResponse.redirect(new URL(`${pathname}${search}`, LEGACY_APP_URL), 308);
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
