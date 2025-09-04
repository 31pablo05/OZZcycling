const CACHE_NAME = 'ozzcycling-v3.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/LOGO/logo2.webp',

  '/manifest.json'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar requests y servir desde cache
self.addEventListener('fetch', (event) => {
  // No cachear en desarrollo o archivos con parámetros de timestamp
  if (event.request.url.includes('localhost') && 
      (event.request.url.includes('?t=') || event.request.url.includes('.jsx'))) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Filtrar requests problemáticos
  if (event.request.url.startsWith('chrome-extension://') ||
      event.request.url.startsWith('moz-extension://') ||
      event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - devolver respuesta desde cache
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Verificar que tengamos una respuesta válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clonar la respuesta
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              try {
                cache.put(event.request, responseToCache);
              } catch (error) {
                console.log('Error caching request:', error);
              }
            });

          return response;
        }).catch((error) => {
          console.log('Fetch failed:', error);
          throw error;
        });
      })
  );
});

// Manejar notificaciones push
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Nueva notificación de OZZcycling',
    icon: '/LOGO/logo2.webp',
    badge: '/LOGO/logo2.webp',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/LOGO/logo2.webp'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/LOGO/logo2.webp'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('OZZcycling', options)
  );
});

// Manejar clicks en notificaciones
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    // Abrir la aplicación
    event.waitUntil(
      self.clients.openWindow('/')
    );
  }
});
