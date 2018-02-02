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
    const dialog = querySelector('#oppDialog');

    window.addEventListener('hashchange', navigate);

    /**
     * Navigate based on hash change
     */
    function navigate() {
      if (location.hash === '#puzzle') {
        dialog.close();
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
      } else if (location.hash === '#signin') {
        window.puzzleGames.unsubscribe();
        gamesPanel.classList.add('slideOut');
        appContainer.classList.add('slideIn');
      } else if (location.hash === '#games') {
        window.puzzleGames.subscribe();
        gamesPanel.classList.remove('slideOut');
        appContainer.classList.remove('slideIn');
      }
    }

    if (location.hash !== '#games') {
      location.hash = '#games';
    }
  }
})();
