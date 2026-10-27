// Service worker de limpeza. O app não usa mais cache offline: o antigo
// `sw.js` (workbox via next-with-workbox) nunca chegou a ser servido já
// compilado. Este arquivo apenas remove caches e se desregistra em quem
// ainda tiver um worker instalado. Mesmo contrato do kill-switch do site.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) await caches.delete(key);
      await self.registration.unregister();
    })()
  );
});
