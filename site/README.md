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
| `LEGACY_APP_URL` | App legado (`https://app.pibpam.org`). Liga o proxy, os redirects e o fallback. **Obrigatório em produção**: sem ele o deploy falha |
| `CONTACT_ENABLED` | `true` envia o formulário de contato para `POST {API}/v1/contact-messages`, repassando o IP do visitante em `x-visitor-ip`. **Só ligue depois que esse endpoint estiver publicado no backend**; sem isso o formulário oferece o WhatsApp |
| `READING_PLANS_API` / `READING_PLANS_API_KEY` | URL base e chave (Bearer) do serviço de planos de leitura, as mesmas do app. Mostram a leitura do dia na home; sem elas a seção fica só com o link para o plano |

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

## Convivência com o app (domínio)

`pibpam.org` é o site; o app legado (Next 16, pages router, usado no WebView do app nativo) vai para `app.pibpam.org`. As versões antigas do
app nativo ainda abrem `https://www.pibpam.org?platform=ios|android`, então o site as atende por um proxy até todos atualizarem.

- `src/proxy.ts`: `?platform=` (ou o cookie `pibpam_app`) repassa o tráfego do WebView ao app legado mantendo a URL; navegadores
  que abrem páginas só do app (`/bible`, `/inscricoes/…`) recebem 308 para `app.pibpam.org`; links antigos
  (`/about`, `/event/:id`…) recebem 301 para o site; `/sw.js` é um kill-switch do service worker antigo.
- `next.config.ts`: `fallback` repassa ao app o que o site não tem (`/api/*`, `/auth/*`, arquivos de `public/`), e o deploy de
  produção **falha sem `LEGACY_APP_URL`**.
- No app legado, `ASSET_PREFIX=https://app.pibpam.org` evita colisão de `/_next/static` (com CORS liberado em `/_next/*`).

Passo a passo, testes, rollback e como encerrar o suporte: [docs/migracao-dominio.md](docs/migracao-dominio.md).
