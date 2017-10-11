(function() {
  'use strict';

  // quick way to determine whether a css file has been cached locally
  function fileIsCached(href) {
    return window.localStorage && localStorage.font_css_cache && (localStorage.font_css_cache_file === href);
  }

  // time to get the actual css file
  function injectFontsStylesheet(css_href) {
    // if this is an older browser
    if (!window.localStorage || !window.XMLHttpRequest) {
      var stylesheet = document.createElement('link');
      stylesheet.href = css_href;
      stylesheet.rel = 'stylesheet';
      stylesheet.type = 'text/css';
      document.head.appendChild(stylesheet);
      // just use the native browser cache
      // this requires a good expires header on the server
      document.cookie = 'font_css_cache';
      // if this isn't an old browser
    } else {
      // use the cached version if we already have it
      if (fileIsCached(css_href)) {
        injectRawStyle(localStorage.font_css_cache);
        // otherwise, load it with ajax
      } else {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', function () {
          if (xhr.readyState === 4) {
            // once we have the content, quickly inject the css rules
            injectRawStyle(xhr.responseText);
            // and cache the text content for further use
            // notice that this overwrites anything that might have already been previously cached
            localStorage.font_css_cache = xhr.responseText;
            localStorage.font_css_cache_file = css_href;
          }
        });
        xhr.open('GET', css_href);
        xhr.send();
      }
    }
  }

  // this is the simple utitily that injects the cached or loaded css text
  function injectRawStyle(text) {
    var style = document.createElement('style');
    style.innerHTML = text;
    document.head.appendChild(style);
  }

  // once cached, the css file is stored on the client forever unless
  // the URL below is changed. Any change will invalidate the cache
  window.loadFont = injectFontsStylesheet;
})();