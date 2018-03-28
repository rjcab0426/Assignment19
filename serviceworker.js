// cache the site assets
const staticAssets = [
    './',
    './app.js',
    './style.css'
]

self.addEventListener('install', async event => {
    const cache = await caches.open('static-data')
    cache.addAll(staticAssets)
})

self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);

    if(url.origin === location.origin) {
        event.respondWith(cacheFirst(request));
    } else {
        event.respondWith(networkFirst(request));
    }    
})

async function networkFirst(request) {
    const dynamicCache = await caches.open('dynamic-data');

    try {
        const res = await fetch(request);
        dynamicCache.put(request, res.clone());
        return res;
    } catch(e) {
        const res = await dynamicCache.match(request);
        return res;
    }    
}

async function cacheFirst(request) {
    const response = await caches.match(request);
    return response || fetch(request);
}