/* !
 * screenfull
 * v3.3.2 - 2017-10-27
 * (c) Sindre Sorhus; MIT License
 */
/* eslint-env es6, browser */
(function() {
  'use strict';

  let document;
  if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
    document = window.document;
  } else {
    document = {};
  }
  const isCommonjs = typeof module !== 'undefined' && module.exports;
  const keyboardAllowed =
    typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  const fn = (function() {
    let val;

    const fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror',
      ],
      // New WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror',

      ],
      // Old WebKit (Safari 5.1)
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror',

      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror',
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError',
      ],
    ];

    let i = 0;
    const l = fnMap.length;
    const ret = {};

    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0; i < val.length; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  })();

  const eventNameMap = {
    change: fn.fullscreenchange,
    error: fn.fullscreenerror,
  };

  const screenfull = {
    request: function(elem) {
      const request = fn.requestFullscreen;

      elem = elem || document.documentElement;

      // Work around Safari 5.1 bug: reports support for
      // keyboard in fullscreen even though it doesn't.
      // Browser sniffing, since the alternative with
      // setTimeout is even worse.
      if (/ Version\/5\.1(?:\.\d+)? Safari\//.test(navigator.userAgent)) {
        elem[request]();
      } else {
        elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
      }
    },
    exit: function() {
      document[fn.exitFullscreen]();
    },
    toggle: function(elem) {
      if (this.isFullscreen) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    onchange: function(callback) {
      this.on('change', callback);
    },
    onerror: function(callback) {
      this.on('error', callback);
    },
    on: function(event, callback) {
      const eventName = eventNameMap[event];
      if (eventName) {
        document.addEventListener(eventName, callback, false);
      }
    },
    off: function(event, callback) {
      const eventName = eventNameMap[event];
      if (eventName) {
        document.removeEventListener(eventName, callback, false);
      }
    },
    raw: fn,
  };

  if (!fn) {
    if (isCommonjs) {
      module.exports = false;
    } else {
      window.screenfull = false;
    }

    return;
  }

  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function() {
        return Boolean(document[fn.fullscreenElement]);
      },
    },
    element: {
      enumerable: true,
      get: function() {
        return document[fn.fullscreenElement];
      },
    },
    enabled: {
      enumerable: true,
      get: function() {
        // Coerce to boolean in case of old WebKit
        return Boolean(document[fn.fullscreenEnabled]);
      },
    },
  });

  if (isCommonjs) {
    module.exports = screenfull;
  } else {
    window.screenfull = screenfull;
  }
})();
