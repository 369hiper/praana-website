// Service Worker Registration
// This file registers the service worker for aggressive caching

export function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('/sw.js')
                .then((registration) => {
                    console.log('✅ Service Worker registered successfully:', registration.scope);

                    // Check for updates periodically
                    setInterval(() => {
                        registration.update();
                    }, 60 * 60 * 1000); // Check every hour

                    // Handle updates
                    registration.addEventListener('updatefound', () => {
                        const newWorker = registration.installing;

                        if (newWorker) {
                            newWorker.addEventListener('statechange', () => {
                                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                                    // New service worker available
                                    console.log('🔄 New version available! Refresh to update.');

                                    // Optionally auto-update (uncomment to enable)
                                    // newWorker.postMessage({ type: 'SKIP_WAITING' });
                                    // window.location.reload();
                                }
                            });
                        }
                    });
                })
                .catch((error) => {
                    console.error('❌ Service Worker registration failed:', error);
                });
        });

        // Handle controller change (new service worker activated)
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            console.log('🔄 Service Worker controller changed, reloading page...');
            // Optionally reload the page when a new service worker takes control
            // window.location.reload();
        });
    } else {
        console.warn('⚠️ Service Workers are not supported in this browser');
    }
}

// Function to unregister service worker (for debugging)
export async function unregisterServiceWorker() {
    if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        for (const registration of registrations) {
            await registration.unregister();
        }
        console.log('Service Worker unregistered');
    }
}

// Function to clear all caches (for debugging)
export async function clearAllCaches() {
    if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map((name) => caches.delete(name)));
        console.log('All caches cleared');
    }
}
