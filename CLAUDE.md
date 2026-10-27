# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev              # Start dev server at http://localhost:3000
yarn build            # Production build (Next.js)
yarn start            # Serve the production build
yarn lint             # ESLint (eslint .)
yarn storybook        # Storybook dev server at http://localhost:6006 (design system catalog)
yarn build-storybook  # Static Storybook build
```

There is no test suite in this project. Package manager is **yarn** (see `yarn.lock`).

## Institutional site (`site/`)

`site/` is a **separate project** (own `package.json`, `yarn.lock`, Node 22.13+): the public, SEO-first
institutional website built with Next.js 16 App Router + Tailwind CSS 4. Its conventions differ from the
app below (Tailwind instead of styled-components, `src/` + `@/*` imports, Cache Components). See
`site/README.md` and `site/CLAUDE.md`. The root `tsconfig.json` and `eslint.config.mjs` exclude `site/`.
`ASSET_PREFIX` in this app's `next.config.js` exists so the app can be served behind the site's proxy.

## Environment

Copy `.env.example` to `.env`. Two groups of variables:
- `API` — base URL of the upstream backend, consumed **server-side only** (see BFF pattern below).
- `READING_PLANS_API` / `READING_PLANS_API_KEY` — base URL and Bearer key of the external reading-plans service (`services/readingPlans.ts`), consumed **server-side only** in the Home's `getStaticProps`. Reading plans no longer live in this app: the Home card links out to the service.

## Architecture

Next.js 16 (pages router, Turbopack) + React 19 app for a church (PIB Pará de Minas). It is a mobile-only app (no desktop layout: desktop visitors use the institutional site in `site/`) that runs **embedded inside a React Native / Expo WebView app**, which shapes much of the design.

### BFF / API proxy pattern (important)
The frontend never calls the upstream backend (`process.env.API`) directly. Two axios clients mediate every request:

- `services/api.ts` (`Api` class) — talks to the **real upstream backend**. Instantiated **only** inside `pages/api/*` route handlers and inside `getStaticProps`/`getServerSideProps` (server context, where `process.env.API` is available). Keeps the upstream URL and any secrets off the client.
- `services/apiLocal.ts` (`ApiLocal` class) — talks to `/api/*`, i.e. this app's own Next.js API routes. Instantiated in **client-side** code (components/hooks/contexts).

So the flow is: client component → `ApiLocal` → `pages/api/<route>` handler → `Api` → upstream backend. When adding a new backend call, you generally add a method to `Api`, create the matching `pages/api/*` handler, and add a method to `ApiLocal`.

The app has **no login or logged-in area** (the member area and the sign-in/sign-up screens were removed). Every endpoint is public, so there is no auth token handling or axios interceptor.

### WebView / native app integration
Because the site is embedded in a native shell, there is a `postMessage` bridge:
- `contexts/postMessage.tsx` listens for messages from the native app (actions: `goBack`, `expoToken` for push registration, `deviceInfo` for safe-area insets, `notification`/`page-handler` for deep-link navigation) under the `data.pibpam.action` protocol.
- `hooks/usePostMessage.tsx` sends messages **to** the native app.
- `hooks/useAppNavigation.tsx` is the standard way to navigate — do not call `router.push` directly. It maintains a `history` array in the query string (for the native back button), toggles the global loading overlay, and notifies the native app of route changes via `postMessage`.
- `contexts/app.tsx` exposes `isApp`/`isIos`/`isAndroid` (derived from a `?platform=` query param — **marked `@deprecated`**) and `isMobile` (from user agent). Prefer `isMobile` for new work.

### State
Global state is React Context only (no Redux). Providers are nested in `contexts/index.tsx` and wrap the whole app in `pages/_app.tsx`: `AppContext`, `LoadingContext`, `PostMessageContext`, `LivesContext`. Access via `useContext(...)` or the paired hooks in `hooks/`.

### Rendering & data fetching
Pages use `getStaticProps` (mostly, e.g. `index.tsx`) or `getServerSideProps` to fetch initial data through the `Api` class server-side. Client-side data fetching goes through `ApiLocal`.

### Directory layout
- `pages/` — routes + `pages/api/*` (the BFF handlers). Files here are routes, so page-level styled-components live in `styles/<PageName>.ts`, not colocated.
- `components/` — reusable presentational components, each a folder with `index.tsx` + `styles.ts`.
- `container/` — larger composed/screen-level pieces (e.g. `Home`, `Schedule`, `Tracking`), often extracted from a specific page's distinct sections (e.g. `Tracking/ParticipantItem`).
- `layout/` — page shells (e.g. `Website`).
- `contexts/`, `hooks/`, `services/`, `utils/`, `enum/`.
- `interfaces/` — TypeScript interfaces for API/domain models. These are imported broadly by `Api`/`ApiLocal`; keep them in sync when changing API shapes.
- `data/bibles/` — bundled offline Bible text (NVI translation) as JSON.

### Styling
The app's screens are **styled-components**. The only CSS file is `styles/tailwind.css` (Tailwind 4 via `postcss.config.mjs`), which exists solely to style components shared with the institutional site (see "Sharing with `site/`").

- **Component pattern**: every component is a folder with `index.tsx` + a colocated `styles.ts` that exports the styled elements, imported into `index.tsx` (e.g. `components/Button/`, `components/Header/`).
- **Page-level styles**: since every file directly under `pages/` is a route, styles for a page (or a group of pages sharing one visual language, e.g. `Events.ts`, now only used by `/inscricoes`) live in `styles/<PageName>.ts` instead of being colocated.
- **Design tokens**: `styles/theme.ts` exports `colors`, `fontFamily`, `spacing`, `radius`, `shadows` and `gradients`. Consume it via a direct `import theme from '.../styles/theme'` and reference `theme.colors.x` / `theme.spacing.x` / `theme.radius.x` inside template literals — there is **no** `ThemeProvider`. Reuse an existing token instead of hardcoding a hex/px value; only add a new token when a color/size is genuinely distinct or repeats 3+ times.
- **Font**: Plus Jakarta Sans (same as the site) through `next/font` in `styles/fonts.ts`; `GlobalStyle` publishes it as `--font-jakarta` on `:root` and `theme.fontFamily` consumes the variable. Do not add a `<link>` to Google Fonts.
- **Global styles**: `styles/GlobalStyle.ts` (a `createGlobalStyle`) replaces what would be a global stylesheet, rendered once in `pages/_app.tsx` and again in `.storybook/preview.tsx`.
- **Conditional styling**: use styled-components' transient prop convention (`$propName`) for props that control CSS but shouldn't leak to the DOM. Wrap any conditional block that references a `keyframes` result in the `css` helper (an untagged template string containing a keyframes interpolation throws at runtime in styled-components v6).
- **Page-internal sections**: when a page has a section with real visual/logical identity (not a trivial 1–2 line wrapper), extract it into its own `container/<Page>/<Section>/` component (`index.tsx` + `styles.ts`) rather than inlining it in the page file.
- `next.config.js` sets `compiler: { styledComponents: true }` — required for stable SSR/CSR className hashing; do not remove it.

### Sharing with `site/`
`@/*` resolves to `site/src/*` (tsconfig `paths`, picked up by Turbopack). Import only **presentational** site components (`@/components/ui/*`, `agenda`, `media`, `ambient`…): nothing that uses `server-only`, `"use cache"`, `next/navigation` or `next/cache`. Tailwind runs **without preflight** (`styles/tailwind.css` imports only `theme` + `utilities`), so legacy screens keep the `GlobalStyle` reset. Tokens come from `site/src/styles/theme.css` and `tailwind-theme.css` (single source for both projects; change colors there). `turbopack.resolveAlias` in `next.config.js` pins `react`, `react-dom` and `next` to the app's copy; without it site files would load `site/node_modules` duplicates. If a shared component imports a package that only `site/package.json` has (e.g. `lucide-react`), add it to the root `package.json` too.

**Wrappers (`components/App*`).** Site components link to site routes with `next/link`, so the app never imports them in screens directly when they navigate: use the wrappers instead. `AppLinkScope` intercepts clicks on any `<a href>` inside it and routes through `hooks/useSiteNavigation` (`useAppNavigation` for internal paths, `openLink` for external ones), translating site paths to app routes with `utils/siteRoutes.ts` (`/conteudos/video/:id` → `/event/:id`, `/agenda/:id` → `/schedule/:id`…). Available: `AppButton`, `AppContentTabs`, `AppVideoCard`, `AppSeriesCard`, `AppAgendaList`, `AppBackdrop` (feeds the site's `LiveContext` from the app's `LivesContext`). Components without links or site state (`Section`, `SectionHeader`, `LiveBadge`, `ServiceTimes`, `Container`) are imported directly; see `components/SitePrimitives.stories.tsx`. `AppHeader` is the single screen header (sticky, safe-area aware, `tone` light/dark); every screen uses it except `/inscricoes/*` (out of the redesign), which still use the legacy `Header` + `HeaderContainer` + `HeaderPage` + `DividerMobile` + `FooterPage` + `useHeader`; delete those once inscrições migrate. `tone="glass"` is for the Home gradient. Story mocks live in `components/storyData.ts`.

### Design system (Storybook)
`styles/*.stories.tsx` (`Colors`, `Spacing`, `Typography`) document the design tokens, and most `components/*` have an `index.stories.tsx`. Run `yarn storybook` to browse the catalog. When adding a new reusable component, add a matching story.

### Notable config
- `next.config.js` enables SVG-as-component imports via `turbopack.rules` + `@svgr/webpack` (`import Icon from './x.svg'`), sets `images.unoptimized`, `reactStrictMode: false`, and `compiler.styledComponents: true` (see Styling above). Node 22.13+ (`.nvmrc`). Storybook 10 still uses webpack, so its SVGR rule lives in `.storybook/main.ts`.
- `public/sw.js` is a cleanup service worker (no offline cache): it deletes caches and unregisters itself. `next-with-workbox` was removed; the old precache worker was never served compiled.
- `eslint.config.mjs` (flat config). The React Compiler rules of `eslint-config-next` 16 (`react-hooks/purity|immutability|set-state-in-effect`) are warnings, not errors.
- Google Analytics and Microsoft Clarity are initialized in `pages/_app.tsx`.
- The codebase is primarily in **Portuguese** (user-facing strings, commit messages, some identifiers). `tsconfig.json` targets ES5 with `strict: true`.
