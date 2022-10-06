import {
  getCurrentUserController,
  populateAllGamesController,
} from './controller.js';
import { auth } from './firebase-init.js';

// window.addEventListener('load', function () {
//   initRouter();
// });

/** Initialize after document loads */
// function initRouter() {
const querySelector = document.querySelector.bind(document);
const appContainer = querySelector('#appContainer');
const gamesPanel = querySelector('#gamesPanel');
const gamesDialog = querySelector('#gamesDialog');
const scores = querySelector('#scores');
const concessionBtnContainer = querySelector('#concessionBtnContainer');
const puzzleInfo = document.getElementById('puzzleInfo');
// const puzTable = document.getElementById('puzTable');
const clueContainer = document.getElementById('clueContainer');
const kbContainer = document.getElementById('kbContainer');
const splash = document.getElementById('splash');
const headerSignin = document.getElementById('headerSignin');
const signinMessage = document.getElementById('signinMessage');
const tos = document.getElementById('tos');
const privacy = document.getElementById('privacy');
const returnToSignin = document.getElementById('returnToSignin');
const firebaseuiAuthContainer = document.getElementById(
  'firebaseuiAuthContainer'
);

window.addEventListener('hashchange', navigate);

/**
 * Navigate based on hash change
 */
function navigate() {
  if (location.hash === '#puzzle') {
    // try {
    //   const replayButton = querySelector('#replayButton');
    //   if (!replayButton) {
    //     gamesDialog.close();
    //   }
    // } catch (err) {
    //   // do nothing, error OK
    // }
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    puzzleInfo.classList.remove('displayNone');
    // puzTable.classList.remove('displayNone');
    headerSignin.classList.add('displayNone');
  } else if (location.hash === '#signin') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.remove('displayFlex');
    puzzleInfo.classList.add('displayNone');
    // puzTable.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    headerSignin.classList.add('displayNone');
    signinMessage.classList.remove('displayNone');
    tos.classList.add('displayNone');
    privacy.classList.add('displayNone');
    returnToSignin.classList.add('displayNone');
    firebaseuiAuthContainer.classList.remove('displayNone');
  } else if (location.hash === '#games') {
    try {
      gamesDialog.close();
    } catch (err) {
      // do nothing, error OK
    }
    if (!getCurrentUserController()) {
      headerSignin.classList.remove('displayNone');
    }
    gamesPanel.classList.remove('slideOut');
    appContainer.classList.remove('slideIn');
    concessionBtnContainer.classList.add('displayNone');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    puzzleInfo.classList.add('displayNone');
    // puzTable.classList.add('displayNone');
    populateAllGamesController();
  } else if (location.hash === '#tos') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.add('displayNone');
    // puzTable.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    tos.classList.remove('displayNone');
    returnToSignin.classList.remove('displayNone');
    signinMessage.classList.add('displayNone');
    firebaseuiAuthContainer.classList.add('displayNone');
  } else if (location.hash === '#privacy') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.add('displayNone');
    // puzTable.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    privacy.classList.remove('displayNone');
    returnToSignin.classList.remove('displayNone');
    signinMessage.classList.add('displayNone');
    firebaseuiAuthContainer.classList.add('displayNone');
  }
}
// navigate();
// }
