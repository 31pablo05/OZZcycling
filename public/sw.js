// Service Worker para OZZcycling PWA
const CACHE_NAME = 'ozzcycling-v2';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/LOGO/logo2.webp',
  '/OZZimages/bicicleteria.jpg',
  '/OZZimages/clases.jpg',
  '/OZZimages/taller.jpg'
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Error al cachear:', error);
      })
  );
});

// Activar Service Worker
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

// Interceptar requests
self.addEventListener('fetch', (event) => {
  // Filtrar solo HTTP/HTTPS requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  // Ignorar requests de extensiones de Chrome
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // NO interceptar assets de Vite para evitar problemas de MIME type
  if (event.request.url.includes('/assets/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - devolver respuesta del cache
        if (response) {
          return response;
        }
        
        // Hacer fetch de la red
        return fetch(event.request)
          .then((response) => {
            // Verificar si recibimos una respuesta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Solo cachear GET requests
            if (event.request.method !== 'GET') {
              return response;
            }

            // NO cachear archivos JS/CSS de assets para evitar problemas
            if (event.request.url.includes('/assets/')) {
              return response;
            }

            // Clonar la respuesta
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Verificar nuevamente antes de guardar en cache
                if (event.request.url.startsWith('http')) {
                  cache.put(event.request, responseToCache);
                }
              })
              .catch((error) => {
                console.log('Error al guardar en cache:', error);
              });

            return response;
          })
          .catch(() => {
            // Si falla la red, intentar servir página offline
            if (event.request.destination === 'document') {
              return caches.match('/');
            }
          });
      })
  );
});

// Manejar actualizaciones
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
