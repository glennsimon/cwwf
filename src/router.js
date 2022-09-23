import { populateAllGamesController } from './controller.js';

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
  const puzTitle = querySelector('#puzTitle');
  const puzAuthor = querySelector('#puzAuthor');
  const puzCopy = querySelector('#puzCopy');
  const puzTable = document.getElementById('puzTable');
  const clueContainer = document.getElementById('clueContainer');
  const kbContainer = document.getElementById('kbContainer');
  const splash = document.getElementById('splash');
  const headerSignin = document.getElementById('headerSignin');

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
      puzAuthor.classList.remove('displayNone');
      puzCopy.classList.remove('displayNone');
    } else if (location.hash === '#signin') {
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      concessionBtnContainer.classList.add('displayNone');
      puzTitle.classList.add('displayNone');
      puzAuthor.classList.add('displayNone');
      puzCopy.classList.add('displayNone');
      puzTable.classList.add('displayNone');
      clueContainer.classList.add('displayNone');
      kbContainer.classList.add('displayNone');
      splash.classList.remove('displayNone');
      headerSignin.classList.add('displayNone');
    } else if (location.hash === '#games') {
      try {
        gamesDialog.close();
      } catch (err) {
        // do nothing, error OK
      }
      gamesPanel.classList.remove('slideOut');
      appContainer.classList.remove('slideIn');
      concessionBtnContainer.classList.add('displayNone');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      puzTitle.classList.add('displayNone');
      puzAuthor.classList.add('displayNone');
      puzCopy.classList.add('displayNone');
      headerSignin.classList.remove('displayNone');
      populateAllGamesController();
    }
  }

  if (location.hash !== '#games') {
    location.hash = '#games';
  }
}
