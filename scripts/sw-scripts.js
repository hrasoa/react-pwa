self.addEventListener('message', function(event){
  caches.open(cacheName).then(function(cache) {
    var req = new Request(event.data.url);
    toolbox.cache(req.url);
  });
});