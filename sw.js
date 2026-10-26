// Bump this whenever a deployed static asset needs to replace an older cached copy.
const C = "py-v10";
const A = [
  "./",
  "index.html",
  "config.js",
  "logo.png",
  "GirSomnath.jfif.jpeg",
  "icon-192.png",
  "icon-512.png",
  "manifest.webmanifest"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(C).then(c => c.addAll(A)).catch(err => console.warn("Cache install warning:", err))
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== C).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  const url = e.request.url;
  if (url.includes("supabase.co") || url.includes("firestore.googleapis.com") || url.includes("firebasestorage.googleapis.com")) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      const networkFetch = fetch(e.request)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(C).then(cache => cache.put(e.request, clone));
          }
          return response;
        })
        .catch(() => cached);

      return cached || networkFetch;
    })
  );
});
