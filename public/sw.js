/* Lightweight service worker for faster repeat visits and a basic offline shell.
   - Network-first for navigations (HTML)
   - Stale-while-revalidate for same-origin static assets

   Notes:
   - Keep this simple to avoid surprises.
   - Bump CACHE_VERSION to invalidate.
*/

const CACHE_VERSION = 'v2';
const CACHE_NAME = `damra-static-${CACHE_VERSION}`;

const isHtmlResponse = (res) => {
  try {
    const ct = res.headers.get('content-type') || '';
    return ct.includes('text/html');
  } catch {
    return false;
  }
};

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

// Optional hook: allow the app to request immediate activation after an update.
// (No UI changes; nothing calls this unless you wire it up in the client.)
self.addEventListener('message', (event) => {
  const data = event.data;
  if (!data) return;
  if (data && typeof data === 'object' && data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle GET requests.
  if (req.method !== 'GET') return;

  // Don’t interfere with range requests (audio/video seeking, etc.).
  // Improper caching of partial content can cause broken playback.
  if (req.headers && req.headers.has('range')) return;

  const url = new URL(req.url);

  // Only cache same-origin requests.
  if (url.origin !== self.location.origin) return;

  // Navigations: network-first so content stays fresh.
  if (req.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(req);
          // Only cache HTML navigations.
          if (fresh && fresh.ok && isHtmlResponse(fresh)) {
            const cache = await caches.open(CACHE_NAME);
            cache.put(req, fresh.clone());
          }
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
          // Avoid caching HTML for asset requests (common when SPAs return index.html for 404s).
          if (res && res.ok && res.type === 'basic' && !isHtmlResponse(res)) {
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
