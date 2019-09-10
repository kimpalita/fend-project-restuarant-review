console.log('service worker registered!');

var cacheVersion = 'restRev-v2';

// listen for INSTALL events for new service worker
self.addEventListener('install', function(event) {
  console.log('Install event in progress');
  event.waitUntil(
    caches.open(cacheVersion).then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/restaurant.html',
        '/js/main.js',
        '/js/dbhelper.js',
        '/js/restaurant_info.js',
        '/data/restaurants.json',
        '/css/styles.css',
        '/img/1.jpg',
        '/img/2.jpg',
        '/img/3.jpg',
        '/img/4.jpg',
        '/img/5.jpg',
        '/img/6.jpg',
        '/img/7.jpg',
        '/img/8.jpg',
        '/img/9.jpg',
        '/img/10.jpg'
      ]);
    }).then(function() {
      console.log('Cache install completed');
    })
  );
});

// listen for FETCH events within service worker scope
self.addEventListener('fetch', function(event) {
  console.log('Fetch event in progress');

  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// listen for ACTIVATE event for new service worker
self.addEventListener("activate", function(event) {
  console.log('activate event in progress.');

  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(
          keys.filter(function (key) {
              return !key.startsWith('restRev-') && key != cacheVersion;
            }).map(function (key) {
              return caches.delete(key);
            })
        );
      })
      .then(function() {
        console.log('activate completed.');
      })
  );
});
