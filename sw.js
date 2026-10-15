// Bump the version number so the browser knows there is a new update
const CACHE_NAME = 'jonesies-ridgebacks-v1';
const OFFLINE_URL = '/offline.html';

// Core files cached up front so the app works offline straight after install
const PRECACHE = [
  '/',
  '/offline.html',
  '/css/site.css',
  '/js/main.js',
  '/favicon.svg'
];

// Install and cache the offline page + shell immediately
self.addEventListener('install', function (event) {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  var request = event.request;
  if (request.method !== 'GET') return;

  // Page loads are network-first with an offline fallback trap door
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(function (networkResponse) {
          var copy = networkResponse.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(request, copy);
          });
          return networkResponse;
        })
        .catch(function () {
          return caches.match(request).then(function (cachedResponse) {
            return cachedResponse || caches.match(OFFLINE_URL);
          });
        })
    );
    return;
  }

  // CSS, JS, images and icons: serve from cache, refresh in the background
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.match(request).then(function (cachedResponse) {
        var network = fetch(request).then(function (networkResponse) {
          if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });
        if (cachedResponse) {
          network.catch(function () {});
          return cachedResponse;
        }
        return network;
      });
    })
  );
});
