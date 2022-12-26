import { route } from './router.js';
import signinHtml from './pages/signin/signin.html';
import splashHtml from './pageFrags/splash/splash.html';
import settingsHtml from './pages/settings/settings.html';
// import { uiStart } from './pages/signin/signin.js';
import { auth, functions } from './firebase-init.js';
import { authState, currentUser } from './pages/signin/signinC.js';
import { signOut } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';
import { authChangeView } from './pages/signin/signinV.js';
import { uiStart } from './pages/signin/signin.js';
import { showSettings } from './pages/settings/settingsV.js';
import { populateMyGames } from './pages/games/gamesC.js';

let shellHandlerObj = null;
let gamesHandlerObj = null;
let puzzleHandlerObj = null;
let settingsHandlerObj = null;
let signinHandlerObj = null;
let tosHandlerObj = null;
let privacyHandlerObj = null;
let helpHandlerObj = null;
// let user = null;

/**
 * Creates a new HTML element from the string `html`
 * @param {string} html String of innerHTML
 * @returns HTML element
 */
function createElementFromHtml(html) {
  let temp = document.createElement('template');
  html = html.trim();
  temp.innerHTML = html;
  return temp.content.firstChild;
}

/**
 * Called by the router, fetches resources necessary for the shell
 * and initiates the display of the shell
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function shellHandler(urlString, htmlPath) {
  if (auth.currentUser) {
    route('/games');
  } else {
    route('/signin');
  }
}

/**
 * Called by the router, fetches resources necessary for the games page
 * and initiates the display of the games page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function gamesHandler(urlString, htmlPath) {
  populateMyGames(currentUser.uid);
}

/**
 * Called by the router, fetches resources necessary for the puzzle page
 * and initiates the display of the puzzle page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function puzzleHandler(urlString, htmlPath) {}

/**
 * Called by the router, fetches resources necessary for the settings page
 * and initiates the display of the settings page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function settingsHandler(urlString, htmlPath) {
  if (auth.currentUser) {
    // const uid = auth.currentUser.uid;
    document.querySelector('.container__app').innerHTML = settingsHtml;
    showSettings();
  }
}

/**
 * Called by the router, fetches resources necessary for the signin page
 * and initiates the display of the signin page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function signinHandler(urlString, htmlPath) {
  if (auth.currentUser) {
    const uid = auth.currentUser.uid;
    signOut(auth)
      .then(() => {
        const statusUpdate = {};
        statusUpdate.uid = uid;
        statusUpdate.authState = authState('offline');
        const userOffline2 = httpsCallable(functions, 'userOffline2');
        userOffline2(statusUpdate);
        authChangeView(null);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  document.querySelector('.container__app').innerHTML = splashHtml;
  document.querySelector('.container__app').innerHTML += signinHtml;
  uiStart();
}

/**
 * Called by the router, fetches resources necessary for the privacy page
 * and initiates the display of the privacy page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function privacyHandler(urlString, htmlPath) {}

/**
 * Called by the router, fetches resources necessary for the tos page
 * and initiates the display of the tos page
 * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function tosHandler(urlString, htmlPath) {}

/**
 * Called by the router, fetches resources necessary for the help page
 * and initiates the display of the help page
 * @param {string} urlString * @param {string} urlString route passed to `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function helpHandler(urlString, htmlPath) {}

// shellHandler();

export {
  shellHandler,
  gamesHandler,
  puzzleHandler,
  settingsHandler,
  signinHandler,
  tosHandler,
  privacyHandler,
  helpHandler,
};
