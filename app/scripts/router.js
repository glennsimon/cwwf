/* eslint-env es6, browser */
(function() {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    const querySelector = document.querySelector.bind(document);
    const appContainer = querySelector('#appContainer');
    const gamesPanel = querySelector('#gamesPanel');

    window.addEventListener('hashchange', navigate);

    /**
     * Navigate based on hash change
     */
    function navigate() {
      if (location.hash === '#home') {
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
      } else {
        gamesPanel.classList.remove('slideOut');
        appContainer.classList.remove('slideIn');
      }
    }

    location.hash = '#games';
  }
})();
