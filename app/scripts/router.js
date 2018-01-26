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
      if (location.hash === '#games') {
        appContainer.classList.add('slideOut');
        gamesPanel.classList.add('slideIn');
      } else {
        appContainer.classList.remove('slideOut');
        gamesPanel.classList.remove('slideIn');
      }
    }

    location.hash = '#home';
  }
})();
