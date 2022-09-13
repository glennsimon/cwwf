import { unsubscribe } from './games.js';

window.addEventListener('load', function () {
  initRouter();
});

/** Initialize after document loads */
function initRouter() {
  const querySelector = document.querySelector.bind(document);
  const appContainer = querySelector('#appContainer');
  const gamesPanel = querySelector('#gamesPanel');
  const gamesDialog = querySelector('#gamesDialog');
  const scores = querySelector('#scores');
  const concessionBtnContainer = querySelector('#concessionBtnContainer');
  const puzAuthor = querySelector('#puzAuthor');
  const puzCopy = querySelector('#puzCopy');
  const puzTable = document.getElementById('puzTable');
  const clueContainer = document.getElementById('clueContainer');
  const kbContainer = document.getElementById('kbContainer');
  const splash = document.getElementById('splash');

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
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      concessionBtnContainer.classList.remove('displayNone');
      puzAuthor.classList.remove('displayNone');
      puzCopy.classList.remove('displayNone');
    } else if (location.hash === '#signin') {
      unsubscribe();
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      concessionBtnContainer.classList.add('displayNone');
      puzAuthor.classList.add('displayNone');
      puzCopy.classList.add('displayNone');
      puzTable.classList.add('displayNone');
      clueContainer.classList.add('displayNone');
      kbContainer.classList.add('displayNone');
      splash.classList.remove('displayNone');
    } else if (location.hash === '#games') {
      try {
        gamesDialog.close();
      } catch (err) {
        // do nothing, error OK
      }
      unsubscribe();
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
