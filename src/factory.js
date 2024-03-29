import { route } from './router.js';
import signinHtml from './pages/signin/signin.html';
import pageNotFoundHtml from './pages/404/404.html';
import tosHtml from './pages/tos/tos.html';
import privacyHtml from './pages/privacy/privacy.html';
import splashHtml from './pageFrags/splash/splash.html';
// import { uiStart } from './pages/signin/signin.js';
import { auth } from './firebase-init.js';
import { uiStart } from './pages/signin/signin.js';
import { showSettings } from './pages/settings/settingsV.js';
import { clearGameList, populateMyGames } from './pages/games/gamesC.js';
import {
  clearGameParameters,
  subscribeToGame,
} from './pages/puzzle/puzzleC.js';
import {
  disableGamesOverflow,
  disableSettingsOverflow,
  enableGamesOverflow,
  enableSettingsOverflow,
} from './shellV.js';
import './pages/404/404.css';
import './pages/tos/tos.css';
import './pages/privacy/privacy.css';

/**
 * Called by the router, fetches resources necessary for the shell
 * and initiates the display of the shell
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function shellHandler(urlString, htmlPath) {
  route('/signin');
}

/**
 * Called by the router, fetches resources necessary for the games page
 * and initiates the display of the games page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function gamesHandler(urlString, htmlPath) {
  // if (auth.currentUser && auth.currentUser.uid) {
  try {
    // clearGameParameters();
    // clearGameList();
    populateMyGames(auth.currentUser.uid);
    disableGamesOverflow();
    enableSettingsOverflow();
  } catch (err) {
    console.log('Error fetching games: ', err);
    route('/signin');
  }
}

/**
 * Called by the router, fetches resources necessary for the puzzle page
 * and initiates the display of the puzzle page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function puzzleHandler(urlString, htmlPath) {
  try {
    const gameId = urlString.split('=')[1];
    subscribeToGame(gameId);
    enableGamesOverflow();
    enableSettingsOverflow();
  } catch (error) {
    console.log('Problem loading puzzle: ', error);
    route('/signin');
  }
}

/**
 * Called by the router, fetches resources necessary for the settings page
 * and initiates the display of the settings page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function settingsHandler(urlString, htmlPath) {
  try {
    // const uid = auth.currentUser.uid;
    showSettings();
    disableSettingsOverflow();
    enableGamesOverflow();
  } catch (error) {
    console.log('Problem loading settings: ', error);
    route('/signin');
  }
}

/**
 * Called by the router, fetches resources necessary for the signin page
 * and initiates the display of the signin page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function signinHandler(urlString, htmlPath) {
  if (auth.currentUser) {
    route('/games');
    return;
  }
  document.querySelector('.container__app').innerHTML = splashHtml;
  document.querySelector('.container__app').innerHTML += signinHtml;
  uiStart();
  disableGamesOverflow();
  disableSettingsOverflow();
}

/**
 * Called by the router, fetches resources necessary for the privacy page
 * and initiates the display of the privacy page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function privacyHandler(urlString, htmlPath) {
  document.querySelector('.container__app').innerHTML = splashHtml;
  document.querySelector('.container__app').innerHTML += privacyHtml;
  document.querySelector('.go-to-signin').addEventListener('click', () => {
    route('/signin');
  });
}

/**
 * Called by the router, fetches resources necessary for the tos page
 * and initiates the display of the tos page
 * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function tosHandler(urlString, htmlPath) {
  document.querySelector('.container__app').innerHTML = splashHtml;
  document.querySelector('.container__app').innerHTML += tosHtml;
  document.querySelector('.go-to-signin').addEventListener('click', () => {
    route('/signin');
  });
}

/**
 * Called by the router, fetches resources necessary for the help page
 * and initiates the display of the help page
 * @param {string} urlString * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function helpHandler(urlString, htmlPath) {}

/**
 * Called by the router, fetches resources necessary for the 404 page
 * and initiates the display of the 404 page
 * @param {string} urlString * @param {string} urlString route passed from `route` function
 * @param {string} htmlPath path to html to be fetched and loaded by handler
 */
function pageNotFoundHandler(urlString, htmlPath) {
  document.querySelector('.container__app').innerHTML =
    splashHtml + pageNotFoundHtml;
}

export {
  shellHandler,
  gamesHandler,
  puzzleHandler,
  settingsHandler,
  signinHandler,
  tosHandler,
  privacyHandler,
  helpHandler,
  pageNotFoundHandler,
};
