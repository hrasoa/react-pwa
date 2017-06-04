self.addEventListener('message', function(event){
  caches.open(cacheName).then(function(cache) {
    var req = new Request(event.data.url);
    var url = req.url;
    if (!urlsToCacheKeys.has(url)) {
      return cache.add(req).then(function() {
        urlsToCacheKeys.set(url, url);
      });
    }
  });
});