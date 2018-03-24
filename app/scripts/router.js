/* eslint-env es6, browser */
(function(document, window) {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    const querySelector = document.querySelector.bind(document);
    const appContainer = querySelector('#appContainer');
    const gamesPanel = querySelector('#gamesPanel');
    const gamesDialog = querySelector('#gamesDialog');
    const scores = querySelector('#scores');

    window.addEventListener('hashchange', navigate);

    /**
     * Navigate based on hash change
     */
    function navigate() {
      if (location.hash === '#puzzle') {
        try {
          let replayButton = querySelector('#replayButton');
          if (!replayButton) {
            gamesDialog.close();
          }
        } catch(err) {
          // do nothing, error OK
        }
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        // turnIndicator.classList.remove('displayNone');
      } else if (location.hash === '#signin') {
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        // turnIndicator.classList.add('displayNone');
        scores.classList.remove('displayFlex');
        scores.classList.add('displayNone');
      } else if (location.hash === '#games') {
        try {
          gamesDialog.close();
        } catch (err) {
          // do nothing, error OK
        }
        window.puzzleGames.subscribe();
        gamesPanel.classList.remove('slideOut');
        appContainer.classList.remove('slideIn');
        // turnIndicator.classList.add('displayNone');
        scores.classList.remove('displayFlex');
        scores.classList.add('displayNone');
      }
    }

    if (location.hash !== '#games') {
      location.hash = '#games';
    }
  }
})(document, window);
