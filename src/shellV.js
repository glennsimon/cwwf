import { clearPuzzle } from './pages/puzzle/puzzleV.js';
import { currentUser } from './pages/signin/signinC.js';
import { route } from './router.js';
import './styles/shell.css';
import './styles/shared.css';
import './pageFrags/splash/splash.css';
import './pageFrags/dialogs/dialogs.css';

//#region HTML element constants
const headerSignin = document.querySelector('.header__signin');
//#endregion

/**
 * Clicking the sign in / sign out button on the drawer calls
 * routes to `/signin` which, if the user is signed in will sign out,
 * otherwise will just open the signin page
 */
document.querySelector('.button__auth').addEventListener('click', (event) => {
  closeDrawer();
  clearPuzzle();
  if (currentUser) route('/signin');
});

document.querySelector('.logo').addEventListener('click', (event) => {
  console.log('Navigating to list of games page');
  event.preventDefault();
  route('/games');
});

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', () => {
  headerSignin.querySelector('i').innerText = '';
  route('/signin');
});

document.querySelector('.drawer__close').addEventListener('click', closeDrawer);

// document.querySelector('.overflow__list').addEventListener('click', (event) => {
//   if (event.target.querySelector('i').innerText === 'refresh') {
//     location.reload();
//   }
//   if (event.target.querySelector('i').innerText === 'grid_on') {
//     route('/games');
//   }
//   if (event.target.querySelector('i').innerText === 'settings') {
//     route('/settings');
//   }
// });

document
  .querySelector('.overflow__refresh')
  .addEventListener('click', () => location.reload());

document
  .querySelector('.overflow__games')
  .addEventListener('click', () => route('/games'));

document
  .querySelector('.overflow__settings')
  .addEventListener('click', () => route('/settings'));

function closeDrawer() {
  if (document.querySelector('.drawer.is-visible'))
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

function enableGames() {
  document.querySelector('.overflow__games').removeAttribute('disabled');
}

function enableSettings() {
  document.querySelector('.overflow__settings').removeAttribute('disabled');
}

function disableGames() {
  document.querySelector('.overflow__games').setAttribute('disabled', '');
}

function disableSettings() {
  document.querySelector('.overflow__settings').setAttribute('disabled', '');
}

function cleanShell() {
  document.querySelector('.header__activity').innerHTML = '';
  document.querySelector('.scores').innerHTML = '';
  document.querySelector('.drawer__content').innerHTML = '';
  document.querySelector('.drawer__concede').innerHTML = '';
}

export {
  closeDrawer,
  enableGames,
  enableSettings,
  disableSettings,
  disableGames,
  cleanShell,
};
