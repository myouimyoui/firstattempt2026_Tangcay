const CACHE_NAME = "pwa-cache-v5";
const OFFLINE_URL = "/offline.html";

const PRECACHE_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/icons/addu-seal-192.png",
  "/icons/addu-seal-512.png"
];

// ── INSTALL ────────────────────────────────────────────────────────────────
// Precache all known assets immediately on install
self.addEventListener("install", (event) => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn("[SW] Precache failed:", err);
      });
    })
  );
});

// ── ACTIVATE ───────────────────────────────────────────────────────────────
// Delete any old caches from previous SW versions
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", key);
            return caches.delete(key);
          }
        })
      )
    )
  );

  self.clients.claim();
});

// ── FETCH ──────────────────────────────────────────────────────────────────
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== "GET" || url.origin !== self.location.origin) {
    return;
  }

  // API routes → Network First (fresh data, cache as fallback)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Everything else → Cache First (instant loads, offline-ready)
  event.respondWith(cacheFirst(request));
});

// ── STRATEGIES ─────────────────────────────────────────────────────────────

/**
 * Cache First — serve from cache instantly.
 * On miss: fetch from network, cache the response, return it.
 * If both fail (offline + not cached): show offline page.
 */
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);

    // Only cache valid responses
    if (response && response.status === 200 && response.type !== "opaque") {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    // Offline and not in cache — show offline fallback for navigation
    if (request.mode === "navigate") {
      const fallback = await caches.match(OFFLINE_URL);
      if (fallback) return fallback;
    }

    return new Response("Offline — resource not cached.", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}

/**
 * Network First — always try the network for fresh data.
 * Falls back to cache if the network fails (offline).
 * Used for API routes where stale data is worse than no data.
 */
async function networkFirst(request) {
  try {
    const response = await fetch(request);

    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }

    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;

    return new Response(JSON.stringify({ error: "Offline — no cached data." }), {
      status: 503,
      headers: { "Content-Type": "application/json" },
    });
  }
}