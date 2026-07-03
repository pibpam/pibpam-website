# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
yarn dev      # Start dev server at http://localhost:3000
yarn build    # Production build (Next.js)
yarn start    # Serve the production build
yarn lint     # ESLint (next lint)
```

There is no test suite in this project. Package manager is **yarn** (see `yarn.lock`).

## Environment

Copy `.env.example` to `.env`. Two groups of variables:
- `API` — base URL of the upstream backend, consumed **server-side only** (see BFF pattern below).
- `NEXT_PUBLIC_FIREBASE_*` — Firebase web config, used client-side for auth.

## Architecture

Next.js 12 (pages router) app for a church (PIB Pará de Minas). It is a mobile-first website that also runs **embedded inside a React Native / Expo WebView app**, which shapes much of the design.

### BFF / API proxy pattern (important)
The frontend never calls the upstream backend (`process.env.API`) directly. Two axios clients mediate every request:

- `services/api.ts` (`Api` class) — talks to the **real upstream backend**. Instantiated **only** inside `pages/api/*` route handlers and inside `getStaticProps`/`getServerSideProps` (server context, where `process.env.API` is available). Keeps the upstream URL and any secrets off the client.
- `services/apiLocal.ts` (`ApiLocal` class) — talks to `/api/*`, i.e. this app's own Next.js API routes. Instantiated in **client-side** code (components/hooks/contexts).

So the flow is: client component → `ApiLocal` → `pages/api/<route>` handler → `Api` → upstream backend. When adding a new backend call, you generally add a method to `Api`, create the matching `pages/api/*` handler, and add a method to `ApiLocal`.

Authenticated endpoints pass a bearer token explicitly as a method argument (`getRotations(token)`, `getMe(token)`, etc.); there is no axios interceptor. Tokens are stored via `utils/LocalStorage.ts`.

### Authentication
Firebase Auth (email/password + Google popup) runs client-side in `services/firebaseClient.ts`. `services/auth.ts` orchestrates the flow: sign in with Firebase → get Firebase idToken → exchange it via `ApiLocal` (`/api/auth` or `/api/auth/third-party`) for the app's own `accessToken` → save token to localStorage. `firebaseClient.ts` throws if run server-side or if env vars are missing.

### WebView / native app integration
Because the site is embedded in a native shell, there is a `postMessage` bridge:
- `contexts/postMessage.tsx` listens for messages from the native app (actions: `goBack`, `expoToken` for push registration, `deviceInfo` for safe-area insets, `notification`/`page-handler` for deep-link navigation) under the `data.pibpam.action` protocol.
- `hooks/usePostMessage.tsx` sends messages **to** the native app.
- `hooks/useAppNavigation.tsx` is the standard way to navigate — do not call `router.push` directly. It maintains a `history` array in the query string (for the native back button), toggles the global loading overlay, and notifies the native app of route changes via `postMessage`.
- `contexts/app.tsx` exposes `isApp`/`isIos`/`isAndroid` (derived from a `?platform=` query param — **marked `@deprecated`**) and `isMobile` (from user agent). Prefer `isMobile` for new work.

### State
Global state is React Context only (no Redux). Providers are nested in `contexts/index.tsx` and wrap the whole app in `pages/_app.tsx`: `AppContext`, `LoadingContext`, `UserContext`, `PostMessageContext`, `LivesContext`, `NoticesContext`. Access via `useContext(...)` or the paired hooks in `hooks/`.

### Rendering & data fetching
Pages use `getStaticProps` (mostly, e.g. `index.tsx`) or `getServerSideProps` to fetch initial data through the `Api` class server-side. Client-side data fetching goes through `ApiLocal`.

### Directory layout
- `pages/` — routes + `pages/api/*` (the BFF handlers).
- `components/` — reusable presentational components (each usually a folder with `index.tsx` + styles).
- `container/` — larger composed/screen-level pieces (e.g. `Desktop/HomeDesktop`, `ReadingPlan`, `Schedule`), often with desktop/mobile split.
- `layout/` — page shells (e.g. `Website`).
- `contexts/`, `hooks/`, `services/`, `utils/`, `enum/`.
- `interfaces/` — TypeScript interfaces for API/domain models. These are imported broadly by `Api`/`ApiLocal`; keep them in sync when changing API shapes.
- `data/bibles/` — bundled offline Bible text (NVI translation) as JSON.

### Styling
Two systems coexist:
- **SCSS modules** (`styles/*.module.scss`) — used by most pages.
- **styled-components** — used by many components/containers (`styles.ts`/`styles.tsx` files alongside the component).
Match whichever the file/area already uses.

### Notable config
- `next.config.js` wraps config with `next-with-workbox` (PWA service worker, source `public/sw.js`), enables SVG-as-component imports via `@svgr/webpack` (`import Icon from './x.svg'`), sets `images.unoptimized`, and `reactStrictMode: false`.
- Google Analytics and Microsoft Clarity are initialized in `pages/_app.tsx`.
- The codebase is primarily in **Portuguese** (user-facing strings, commit messages, some identifiers). `tsconfig.json` targets ES5 with `strict: true`.
