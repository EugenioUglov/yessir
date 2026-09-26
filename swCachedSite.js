const cacheName = 'site-store';

// Установка Service Worker
self.addEventListener('install', function(e) {
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

// Активация и очистка старых кэшей
self.addEventListener('activate', function(e) {
    console.log('Service Worker: Activated');

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker: Clearing old cache ' + cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
    return self.clients.claim();
});

// Перехват запросов (Fetch)
self.addEventListener('fetch', e => {
    // Кэш API поддерживает только метод GET. 
    // POST, PUT, DELETE и т.д. кэшировать нельзя — их пропускаем мимо кэша.
    if (e.request.method !== 'GET') {
        return;
    }

    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Проверяем, валидный ли ответ получили
                if (!res || res.status !== 200 || res.type !== 'basic') {
                    return res;
                }

                // Делаем копию ответа, так как поток тела можно прочитать только 1 раз
                const resClone = res.clone();

                caches.open(cacheName).then(cache => {
                    cache.put(e.request, resClone);
                });

                return res;
            })
            .catch(() => caches.match(e.request))
    );
});