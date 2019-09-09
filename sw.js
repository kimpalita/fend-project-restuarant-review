console.log('service worker registered!');

var staticCacheName = 'rest-rev-static-v2';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        '/',
        'js/main.js',
        'css/styles.css',
        'img/'
      ]);
    })
  );
});
