self.addEventListener('message', function(event){
  caches.open(cacheName).then(function(cache) {
    var req = new Request(event.data.url);
    return cache.add(req).then(function() {
      urlsToCacheKeys.set(req.url, req.url);
    });
  });
});