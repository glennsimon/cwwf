import {
  getCurrentUserController,
  setCurrentGameIdController,
} from './controller.js';

/** Initialize after document loads */
// function initRouter() {
const querySelector = document.querySelector.bind(document);
const appContainer = querySelector('#appContainer');
const gamesPanel = querySelector('#gamesPanel');
const gamesDialog = querySelector('#gamesDialog');
const scores = querySelector('#scores');
const concessionBtnContainer = querySelector('#concessionBtnContainer');
const puzzleInfo = document.getElementById('puzzleInfo');
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
const gamesNav = document.getElementById('gamesNav');

window.addEventListener('hashchange', navigate);

let signin = null;

/**
 * Navigate based on hash change
 */
async function navigate() {
  if (location.hash === '#puzzle') {
    splash.classList.remove('displayFlex');
    splash.classList.add('displayNone');
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    puzzleInfo.classList.remove('displayNone');
    headerSignin.classList.add('displayNone');
    gamesNav.removeAttribute('disabled');
  } else if (location.hash === '#signin') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.remove('displayFlex');
    puzzleInfo.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    splash.classList.add('displayFlex');
    headerSignin.classList.add('displayNone');
    signinMessage.classList.remove('displayNone');
    tos.classList.add('displayNone');
    privacy.classList.add('displayNone');
    returnToSignin.classList.add('displayNone');
    if (!signin) {
      await loadSigninModule();
    }
    firebaseuiAuthContainer.classList.remove('displayNone');
    setCurrentGameIdController(null);
    gamesNav.setAttribute('disabled', '');
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
    puzzleInfo.classList.add('displayNone');
    const currentUser = getCurrentUserController();
    if (!currentUser) {
      headerSignin.classList.remove('displayNone');
    }
    setCurrentGameIdController(null);
    gamesNav.setAttribute('disabled', '');
  } else if (location.hash === '#tos') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    splash.classList.add('displayFlex');
    tos.classList.remove('displayNone');
    returnToSignin.classList.remove('displayNone');
    signinMessage.classList.add('displayNone');
    firebaseuiAuthContainer.classList.add('displayNone');
    setCurrentGameIdController(null);
  } else if (location.hash === '#privacy') {
    gamesPanel.classList.add('slideOut');
    appContainer.classList.add('slideIn');
    scores.classList.remove('displayFlex');
    scores.classList.add('displayNone');
    concessionBtnContainer.classList.add('displayNone');
    puzzleInfo.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    splash.classList.add('displayFlex');
    privacy.classList.remove('displayNone');
    returnToSignin.classList.remove('displayNone');
    signinMessage.classList.add('displayNone');
    firebaseuiAuthContainer.classList.add('displayNone');
    setCurrentGameIdController(null);
  }
}

/**
 * Lazy load signin module only if user needs to log in.
 */
function loadSigninModule() {
  console.log('Hello from loadSigninModule.');
  import(/* webpackChunkName: 'signin' */ './signin.js').then((module) => {
    signin = module.default;
  });
}

navigate();
