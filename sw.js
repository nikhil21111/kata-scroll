/* The Kata Scroll — the offline shelf
   Caches the book (chapters + cover + fonts + icons) so it reads without a network.
   Additive only: when served as plain files (no https), this never runs. */
var CACHE = 'kata-scroll-v2';

var ASSETS = [
  './',
  './index.html',
  './review.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './ch01-why-indians-dont-attempt.html',
  './ch02-career-advice-lost.html',
  './ch03-social-pressure-depression.html',
  './ch04-get-hired-faster.html',
  './ch05-how-i-use-ai.html',
  './ch06-most-valuable-skill-after-ai.html',
  './ch07-manage-projects-end-to-end.html',
  './ch08-scaling-zero-funding.html',
  './ch09-companies-break-after-50-people.html',
  './ch10-why-startups-unprofitable.html',
  './ch11-distribution-10x-luck.html',
  './ch12-simplifying-everything.html',
  './ch13-risk-like-rich-people.html',
  './ch14-think-like-rich-people.html'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (ks) {
        return Promise.all(ks.filter(function (k) { return k !== CACHE; })
          .map(function (k) { return caches.delete(k); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);

  if (url.origin === location.origin) {
    /* the book itself: cache-first, network as backfill, cover as offline fallback */
    e.respondWith(
      caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
        if (hit) return hit;
        return fetch(e.request).then(function (res) {
          if (res && res.ok) {
            var cp = res.clone();
            caches.open(CACHE).then(function (c) { c.put(e.request, cp); });
          }
          return res;
        }).catch(function () {
          return caches.match('./index.html');
        });
      })
    );
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    /* the ink: fonts cached so offline pages keep their typography */
    e.respondWith(
      caches.match(e.request).then(function (hit) {
        if (hit) return hit;
        return fetch(e.request).then(function (res) {
          if (res && (res.ok || res.status === 0)) {
            var cp = res.clone();
            caches.open(CACHE).then(function (c) { c.put(e.request, cp); });
          }
          return res;
        });
      })
    );
  }
});
