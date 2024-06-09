const cacheName = "sw-v1";

// Daftar file yang perlu di-cache
const cacheFiles = [
  "/imk-v3/",

  "/imk-v3/index.html",
  "/imk-v3/manifest.json",

  "/imk-v3/pages/menu.html",
  "/imk-v3/pages/math-quiz.html",
  "/imk-v3/pages/common-knowledge-quiz.html",

  "/imk-v3/scripts/math-quiz.js",
  "/imk-v3/scripts/common-knowledge-quiz.js",
  "/imk-v3/scripts/tts.js",
  "/imk-v3/scripts/sidebar.js",

  "/imk-v3/styles/home.css",
  "/imk-v3/styles/math-quiz.css",
  "/imk-v3/styles/common-knowledge-quiz.css",
  "/imk-v3/styles/menu.css",
  "/imk-v3/styles/sidebar.css",

  "/imk-v3/assets/bootstrap-5.3.3-dist/css/bootstrap.min.css",
  "/imk-v3/assets/bootstrap-5.3.3-dist/js/bootstrap.bundle.min.js",

  "/imk-v3/assets/blurry-gradient-haikei.svg",
  // "/imk-v3/assets/blurry-gradient-haikei.png",
  "/imk-v3/assets/body-bg.jpg",

  "/imk-v3/assets/gold-trophy.svg",
  "/imk-v3/assets/settings.svg",
  // "/imk-v3/assets/accessibility.svg",

  // "/imk-v3/assets/DrawKit Vector Illustration Fun & Playful Finn Character (11).png",
  // "/imk-v3/assets/DrawKit Vector Illustration Fun & Playful Finn Character (13).png",

  "/imk-v3/assets/icon-192.png",
  "/imk-v3/assets/icon-512.png",
  "/imk-v3/assets/maskable-icon.png",

  "/imk-v3/assets/animal/kucing1.svg",
  "/imk-v3/assets/animal/kucing2.svg",

  "/imk-v3/assets/sound/correct.wav",
  "/imk-v3/assets/sound/incorrect.wav",
  "/imk-v3/assets/sound/finish.wav",
  "/imk-v3/assets/sound/error.wav",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(cacheFiles))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== cacheName)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        const responseToCache = networkResponse.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
      // .catch(() => {
      //   return caches.match('/imk-v3/offline.html');
      // });
    })
  );
});
