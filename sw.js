const CACHE_NAME = 'Copy Text Ai';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    './icon.png'
];

// Install Service Worker dan simpan file ke cache (Memori HP)
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Aktifkan Service Worker dan hapus cache versi lama jika ada
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Cegat permintaan jaringan (Sihir Offline + Share Target Support)
self.addEventListener('fetch', event => {
    event.respondWith(
        // ignoreSearch: true = Abaikan teks tambahan di belakang link saat fitur Share dipakai
        caches.match(event.request, { ignoreSearch: true })
            .then(response => {
                // Kalau ada di cache, langsung tampilkan (0 kuota). Kalau nggak ada, ambil dari internet.
                return response || fetch(event.request);
            })
    );
});