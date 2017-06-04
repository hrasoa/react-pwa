self.addEventListener('message', function(event){
  caches.open(cacheName).then(function(cache) {
    var req = new Request(event.data.url);
    console.log(req);
    return cache.add(req).then(function() {
      console.log(req.url, 'added');
      urlsToCacheKeys.set(req.url, req.url);
    });
  });
});