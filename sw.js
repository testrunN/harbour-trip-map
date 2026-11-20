const CACHE='harbour-trip-offline-v1';
const offline=new URL('offline.html',self.registration.scope).href;
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.add(offline)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith('harbour-trip-offline-')&&key!==CACHE).map(key=>caches.delete(key)))),self.clients.claim()]));});
// Only navigations within our app: never intercept/cache map tiles or search traffic.
self.addEventListener('fetch',event=>{if(event.request.mode!=='navigate'||!event.request.url.startsWith(self.registration.scope))return;event.respondWith(fetch(event.request).catch(()=>caches.match(offline)));});
