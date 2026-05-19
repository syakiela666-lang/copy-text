const CACHE_NAME = 'copy-text';
const urlsToCache = [
    './index.html',
    './manifest.json',
    './icon.png'
];

// Pasang memori cache saat aplikasi pertama kali diinstall
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
    );
});

// Pakai memori lokal kalau HP lagi offline/ga ada sinyal
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => response || fetch(event.request))
    );
});