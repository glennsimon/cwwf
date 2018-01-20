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
        appContainer.classList.remove('displayFlex');
        appContainer.classList.add('displayNone');
        gamesPanel.classList.remove('displayNone');
      } else {
        gamesPanel.classList.add('displayNone');
        appContainer.classList.remove('displayNone');
        appContainer.classList.add('displayFlex');
      }
    }
  }
})();
