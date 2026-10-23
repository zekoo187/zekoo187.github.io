// Kill switch. This origin once served the Vantage PWA from "/", and its
// service worker kept answering every path on zekoo187.github.io from cache,
// including /symmetry-accountability/. A browser that still holds that worker
// fetches this file on its next visit; this version removes itself, clears
// every cache, and reloads the open pages so they come from the network.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of clients) c.navigate(c.url);
  })());
});
