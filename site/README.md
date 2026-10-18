# Site institucional — PIB Pará de Minas

Site público (web-first, SEO) da Primeira Igreja Batista em Pará de Minas. É um projeto
independente dentro do repositório do app (`../`), com `package.json` próprio.

- **Stack:** Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS 4, TypeScript.
- **Fonte:** Plus Jakarta Sans via `next/font` (self-hosted, sem layout shift).
- **Node:** 22.13+ (veja `.nvmrc`).

## Rodando

```bash
cd site
nvm use            # Node 22.13
cp .env.example .env.local
yarn
yarn dev -p 3001   # http://localhost:3001
yarn build && yarn start
yarn lint
```

| Variável | Uso |
|---|---|
| `API` | URL do backend upstream (só no servidor). Padrão: `https://api.pibpam.org/` |
| `SITE_URL` | URL canônica pública (canonical, sitemap, Open Graph). Padrão: `https://www.pibpam.org` |
| `LEGACY_APP_URL` | App legado (WebView). Liga o proxy do app e o fallback de rotas. Ex.: `https://app.pibpam.org` |
| `CONTACT_ENABLED` | `true` envia o formulário para `POST {API}/v1/contact-messages`. Sem isso, o form oferece o WhatsApp |

## Páginas

| Rota | Conteúdo |
|---|---|
| `/` | Hero com horários (próximo culto destacado), ao vivo, última mensagem, séries, agenda, história, visita |
| `/sobre` | História, linha do tempo, planeje sua visita (mapa), primeira vez |
| `/conteudos` | Hub; `/transmissoes` (paginada com `?pagina=`), `/series`, `/series/[id]`, `/video/[id]` |
| `/ministerios` | Ministérios com logo, descrição e liderança, e convite para servir |
| `/agenda`, `/agenda/[id]` | Próximas datas agrupadas por mês, destaques e detalhe (JSON-LD `Event`) |
| `/ao-vivo` | Player quando há transmissão; senão próximo culto e última transmissão |
| `/contato` | Formulário, canais diretos e mapa |

## Como trocar as cores (tema)

Todas as cores ficam em **`src/styles/theme.css`** como variáveis CSS semânticas (`--brand`,
`--accent`, `--pine`, `--ink`…). `src/app/globals.css` as expõe ao Tailwind via `@theme inline`,
gerando utilitários como `bg-brand`, `text-ink`, `bg-pine`. Os componentes **nunca** usam hex direto,
então basta editar o `theme.css`. Para um tema alternativo, redefina as variáveis em
`[data-theme="nome"]` e aplique o atributo no `<html>`.

## Arquitetura

- **Dados:** `src/lib/api.ts` (`server-only`) chama o upstream com `"use cache"` + `cacheLife`/`cacheTag`.
  As páginas são estáticas e se revalidam sozinhas (ISR): conteúdo e agenda a cada minuto, informações da
  igreja e séries a cada hora. A URL da API nunca vai para o browser; o cliente só fala com `/api/site/*`.
- **Ao vivo:** `LiveProvider` consulta `/api/site/live` a cada 60s (e ao voltar para a aba) e acende a
  faixa no topo, o ponto no menu, a seção da home e o player em `/ao-vivo`.
- **SEO:** metadata por página (`buildMetadata` em `src/lib/seo.ts`), canonical, Open Graph/Twitter,
  JSON-LD (`Church`, `WebSite`, `BreadcrumbList`, `VideoObject`, `Event`), `sitemap.xml` dinâmico,
  `robots.txt`, HTML semântico e links reais (`next/link`). `partialPrefetching` está desligado para
  que URLs novas renderizem por completo já na primeira visita.
- **Fundo imersivo (WebGL):** `src/components/ambient/` traz o `AmbientGradient`, um degradê de malha
  animado com um fragment shader em WebGL puro (sem biblioteca) nas cores de `theme.css`, e o `Backdrop`,
  que empilha foto (opcional), véu pine e degradê. Ele é usado no hero, em "Conheça nossa história", no convite
  dos ministérios e na página ao vivo; em qualquer `Section`, use `backdrop={<Backdrop … />}`. O degradê começa
  depois do carregamento, anima a 30 fps em meia resolução em telas ≥ 768px e pausa fora da tela; no mobile
  e com `prefers-reduced-motion` é estático. Durante uma transmissão ao vivo ele acelera, fica mais intenso e
  puxa para o lime.
- **Componentes:** `src/components/{ui,media,agenda,layout,live,contact,seo}` e seções da home em
  `src/sections/home`.

## Convivência com o app (go-live em pibpam.org)

O app nativo abre `https://www.pibpam.org?platform=ios|android`. Com o site na raiz do domínio:

1. Publique o app legado num domínio próprio (ex.: `app.pibpam.org`) com
   `ASSET_PREFIX=https://app.pibpam.org`. Assim os assets dele não colidem com os do site, e o CORS
   de `/_next/*` já é liberado no `next.config.js` do app.
2. Publique este site (projeto Vercel com Root Directory `site`) com `LEGACY_APP_URL=https://app.pibpam.org`.
3. `src/proxy.ts`:
   - `?platform=` grava o cookie `pibpam_app`, e daí em diante todo o tráfego do WebView vai para o
     app legado (páginas, `/api/*`, `/_next/data/*`, `/sw.js`).
   - Para navegadores, links antigos recebem 301 (`/about`→`/sobre`, `/event/:id`→`/conteudos/video/:id`…).
   - `/sw.js` é um kill-switch que remove o service worker antigo dos navegadores.
4. O `fallback` de `next.config.ts` manda para o app tudo o que o site não tem (`/bible`, `/inscricoes`,
   `/member`, `/auth/*`, `/devotional/*`…).

Antes de trocar o DNS, valide em staging que o cookie persiste no WebView (iOS e Android) e que o
login com Google (`/auth/google` → `/auth/code`) funciona pelo proxy.
