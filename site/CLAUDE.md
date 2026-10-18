# CLAUDE.md — site institucional

Projeto Next.js **16** (App Router, `cacheComponents`), React 19 e Tailwind CSS 4. Visão geral, variáveis
de ambiente e go-live em `README.md`.

- Esta versão do Next tem APIs diferentes das versões antigas: antes de usar algo novo, leia o guia em
  `node_modules/next/dist/docs/` (`middleware` virou `src/proxy.ts`; cache é via `"use cache"` +
  `cacheLife`/`cacheTag`; `searchParams`/`cookies()` precisam ficar dentro de `<Suspense>`; rotas
  dinâmicas exigem ao menos um item em `generateStaticParams`, veja `src/lib/static-params.ts`).
- Comandos (Node 22.13, `.nvmrc`): `yarn dev -p 3001`, `yarn build`, `yarn lint`.
- Dados do backend só em `src/lib/api.ts` (`server-only`). O cliente usa apenas `/api/site/*`.
- Cores: só tokens de `src/styles/theme.css` (`bg-brand`, `text-ink`, `bg-pine`…), nunca hex nos componentes.
- Copy em português, voz ativa, sem caixa-alta em rótulos.
- SEO: toda página exporta metadata via `buildMetadata` (`src/lib/seo.ts`) e usa um único `h1`.
  Páginas internas abrem com `PageHeader`, que também emite o JSON-LD de breadcrumb.
