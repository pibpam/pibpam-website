// public/sw.js
import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst } from 'workbox-strategies'
import packageJson from '../package.json'
import { setCacheNameDetails } from 'workbox-core'

setCacheNameDetails({
  prefix: 'pibpam-website',
  suffix: packageJson.version,
})

// Precache automático (HTML, JS, CSS)
precacheAndRoute(self.__WB_MANIFEST)

// Cache de navegação (SPA / páginas HTML)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  new StaleWhileRevalidate({
    cacheName: 'pages-v1',
  })
)