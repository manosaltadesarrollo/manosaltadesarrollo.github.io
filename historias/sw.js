// M.A.N.O · Historias Clínicas: permite abrir la app sin internet.
// Sólo guarda los archivos de la app (nunca datos de pacientes: esos viven cifrados en el dispositivo).
const CACHE = 'mano-app-v15';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'favicon.png', 'apple-touch-icon.png', 'icono-app-192.png', 'icono-app-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // Supabase y otros: directo a la red
  // Primero la red (para recibir siempre la última versión); sin conexión, la copia guardada
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('index.html'))));
});
