// Service Worker for aggressive caching
// Cache name with version for easy updates
const CACHE_VERSION = 'v1';
const CACHE_NAME = `praana-coil-${CACHE_VERSION}`;

// Assets to cache immediately on install
const PRECACHE_URLS = [
    '/',
    '/index.html',
];

// Cache strategies
const CACHE_STRATEGIES = {
    // Cache first, fallback to network (for static assets)
    CACHE_FIRST: 'cache-first',
    // Network first, fallback to cache (for API calls)
    NETWORK_FIRST: 'network-first',
    // Cache only (for precached assets)
    CACHE_ONLY: 'cache-only',
    // Network only (for dynamic content)
    NETWORK_ONLY: 'network-only',
};

// Determine strategy based on request
function getStrategy(request) {
    const url = new URL(request.url);

    // External resources - network first
    if (!url.origin.includes(self.location.origin)) {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }

    // API calls - network first
    if (url.pathname.startsWith('/api/')) {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }

    // Static assets (images, videos, fonts, JS, CSS) - cache first
    if (
        url.pathname.match(/\.(png|jpg|jpeg|gif|svg|webp|mp4|webm|woff2?|ttf|otf|eot|js|css)$/i) ||
        url.pathname.startsWith('/assets/')
    ) {
        return CACHE_STRATEGIES.CACHE_FIRST;
    }

    // HTML files - network first
    if (url.pathname.endsWith('.html') || url.pathname === '/') {
        return CACHE_STRATEGIES.NETWORK_FIRST;
    }

    // Default - cache first
    return CACHE_STRATEGIES.CACHE_FIRST;
}

// Install event - precache essential assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing service worker...');

    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[SW] Precaching essential assets');
            return cache.addAll(PRECACHE_URLS);
        }).then(() => {
            // Force the waiting service worker to become the active service worker
            return self.skipWaiting();
        })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating service worker...');

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('[SW] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return self.clients.claim();
        })
    );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const strategy = getStrategy(request);

    // Only handle GET requests
    if (request.method !== 'GET') {
        return;
    }

    event.respondWith(
        handleFetch(request, strategy)
    );
});

// Handle fetch with appropriate strategy
async function handleFetch(request, strategy) {
    const cache = await caches.open(CACHE_NAME);

    switch (strategy) {
        case CACHE_STRATEGIES.CACHE_FIRST:
            return cacheFirst(request, cache);

        case CACHE_STRATEGIES.NETWORK_FIRST:
            return networkFirst(request, cache);

        case CACHE_STRATEGIES.CACHE_ONLY:
            return cacheOnly(request, cache);

        case CACHE_STRATEGIES.NETWORK_ONLY:
            return networkOnly(request);

        default:
            return cacheFirst(request, cache);
    }
}

// Cache first strategy - best for static assets
async function cacheFirst(request, cache) {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        // Return cached response immediately
        return cachedResponse;
    }

    try {
        // Fetch from network
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            // Clone the response before caching
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.error('[SW] Fetch failed:', error);

        // Return offline page or error response
        return new Response('Offline - Asset not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
        });
    }
}

// Network first strategy - best for dynamic content
async function networkFirst(request, cache) {
    try {
        // Try network first
        const networkResponse = await fetch(request);

        // Cache successful responses
        if (networkResponse && networkResponse.status === 200) {
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);

        // Fallback to cache
        const cachedResponse = await cache.match(request);

        if (cachedResponse) {
            return cachedResponse;
        }

        // Return error response
        return new Response('Offline - Content not available', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain',
            }),
        });
    }
}

// Cache only strategy
async function cacheOnly(request, cache) {
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
        return cachedResponse;
    }

    return new Response('Not in cache', {
        status: 404,
        statusText: 'Not Found',
    });
}

// Network only strategy
async function networkOnly(request) {
    return fetch(request);
}

// Listen for messages from the client
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});
