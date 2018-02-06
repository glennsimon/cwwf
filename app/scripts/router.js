/* eslint-env es6, browser */
(function(document, window) {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    const querySelector = document.querySelector.bind(document);
    const appContainer = querySelector('#appContainer');
    const turnIndicator = querySelector('#turnIndicator');
    const gamesPanel = querySelector('#gamesPanel');
    const dialog = querySelector('#oppDialog');

    window.addEventListener('hashchange', navigate);

    /**
     * Navigate based on hash change
     */
    function navigate() {
      if (location.hash === '#puzzle') {
        try {
          dialog.close();
        } catch(err) {
          // do nothing, error occurs if dialog is not open
        }
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        turnIndicator.classList.remove('displayNone');
      } else if (location.hash === '#signin') {
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        turnIndicator.classList.add('displayNone');
      } else if (location.hash === '#games') {
        window.puzzleGames.subscribe();
        gamesPanel.classList.remove('slideOut');
        appContainer.classList.remove('slideIn');
        turnIndicator.classList.add('displayNone');
      }
    }

    if (location.hash !== '#games') {
      location.hash = '#games';
    }
  }
})(document, window);
