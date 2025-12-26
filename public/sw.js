/* Lightweight service worker for faster repeat visits and a basic offline shell.
   - Network-first for navigations (HTML)
   - Stale-while-revalidate for same-origin static assets

   Notes:
   - Keep this simple to avoid surprises.
   - Bump CACHE_VERSION to invalidate.
*/

const CACHE_VERSION = 'v1';
const CACHE_NAME = `damra-static-${CACHE_VERSION}`;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      // Pre-cache a minimal shell. Route HTML pages will still be cached on-demand.
      await cache.addAll([
        // Root (works for most static hosting setups)
        './',
        './site.webmanifest',
        './favicon.svg',
      ]);

      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => k.startsWith('damra-static-') && k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      );
      self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Only cache same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first so content stays fresh.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          const cache = await caches.open(CACHE_NAME);
          cache.put(req, fresh.clone());
          return fresh;
        } catch {
          const cached = await caches.match(req);
          return cached || caches.match('./');
        }
      })()
    );
    return;
  }

  // Static assets: stale-while-revalidate.
  event.respondWith(
    (async () => {
      const cached = await caches.match(req);
      const fetchPromise = fetch(req)
        .then(async (res) => {
          // Cache successful, basic responses.
          if (res && res.ok) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(req, res.clone());
          }
          return res;
        })
        .catch(() => undefined);

      return cached || (await fetchPromise) || cached;
    })()
  );
});
