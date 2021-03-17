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
    const concessionBtnContainer = querySelector('#concessionBtnContainer');
    const puzAuthor = querySelector('#puzAuthor');
    const puzCopy = querySelector('#puzCopy');

    window.addEventListener('hashchange', navigate);

    /**
     * Navigate based on hash change
     */
    function navigate() {
      if (location.hash === '#puzzle') {
        try {
          const replayButton = querySelector('#replayButton');
          if (!replayButton) {
            gamesDialog.close();
          }
        } catch (err) {
          // do nothing, error OK
        }
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        concessionBtnContainer.classList.remove('displayNone');
        puzAuthor.classList.remove('displayNone');
        puzCopy.classList.remove('displayNone');
      } else if (location.hash === '#signin') {
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
        scores.classList.remove('displayFlex');
        scores.classList.add('displayNone');
        concessionBtnContainer.classList.remove('displayNone');
        puzAuthor.classList.add('displayNone');
        puzCopy.classList.add('displayNone');
      } else if (location.hash === '#games') {
        try {
          gamesDialog.close();
        } catch (err) {
          // do nothing, error OK
        }
        window.puzzleGames.subscribe();
        gamesPanel.classList.remove('slideOut');
        appContainer.classList.remove('slideIn');
        scores.classList.remove('displayFlex');
        scores.classList.add('displayNone');
        puzAuthor.classList.add('displayNone');
        puzCopy.classList.add('displayNone');
      }
    }

    if (location.hash !== '#games') {
      location.hash = '#games';
    }
  }
})(document, window);
