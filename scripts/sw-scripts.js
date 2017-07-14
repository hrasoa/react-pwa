self.addEventListener('message', function(event) {
  if (event.data && event.data.action === 'navigate') {
    caches.open(cacheName).then(function(cache) {
      var req = new Request(event.data.url);
      toolbox.cache(req.url);
    });
  }
});
