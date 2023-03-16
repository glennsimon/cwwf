import { authState, currentUser } from './pages/signin/signinC.js';
import { route } from './router.js';
import './styles/shell.css';
import './styles/shared.css';
import './pageFrags/splash/splash.css';
import './pageFrags/dialogs/dialogs.css';
import { httpsCallable } from 'firebase/functions';
import { auth, functions } from './firebase-init.js';
import { authChangeView } from './pages/signin/signinV.js';
import { signOut } from 'firebase/auth';
import { replayAnimation } from './pages/puzzle/puzzleV.js';

const headerSignin = document.querySelector('.header__signin');

/**
 * Clicking the sign in / sign out button on the drawer calls
 * routes to `/signin` which, if the user is signed in will sign out,
 * otherwise will just open the signin page
 */
document.querySelector('.button__auth').addEventListener('click', (event) => {
  closeDrawer();
  cleanShell();
  if (currentUser) {
    signOut(auth)
      .then(() => {
        authChangeView(null);
        route('/signin');
      })
      .then(() => {
        const statusUpdate = {};
        statusUpdate.uid = currentUser.uid;
        statusUpdate.authState = authState('offline');
        const userOffline2 = httpsCallable(functions, 'userOffline2');
        userOffline2(statusUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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

document.querySelector('.overflow__list').addEventListener('click', (event) => {
  let target = event.target;
  if (target.classList.contains('overflow__list')) return;
  while (!target.classList.contains('overflow')) target = target.parentElement;
  if (target.classList.contains('overflow__back')) history.back();
  if (target.classList.contains('overflow__refresh')) location.reload();
  if (target.classList.contains('overflow__games')) route('/games');
  if (target.classList.contains('overflow__replay')) replayAnimation();
  if (target.classList.contains('overflow__settings')) route('/settings');
});

function closeDrawer() {
  if (document.querySelector('.drawer.is-visible'))
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

function enableGamesOverflow() {
  document.querySelector('.overflow__games').removeAttribute('disabled');
  document.querySelector('.overflow__replay').removeAttribute('disabled');
}

function enableSettingsOverflow() {
  document.querySelector('.overflow__settings').removeAttribute('disabled');
}

function disableGamesOverflow() {
  document.querySelector('.overflow__games').setAttribute('disabled', '');
  document.querySelector('.overflow__replay').setAttribute('disabled', '');
}

function disableSettingsOverflow() {
  document.querySelector('.overflow__settings').setAttribute('disabled', '');
}

/**
 * Convenience method to remove activity indictor (if present) and all game
 * meta data (scores, game info, concession button)
 */
function cleanShell() {
  hideActivity();
  document.querySelector('.scores').innerHTML = '';
  document.querySelector('.drawer__content').innerHTML = '';
  document.querySelector('.drawer__concede').innerHTML = '';
}

function hideActivity() {
  document.querySelector('.header__activity').innerHTML = '';
  document.querySelector('.dialog__activity').innerHTML = '';
}

export {
  closeDrawer,
  enableGamesOverflow,
  enableSettingsOverflow,
  disableSettingsOverflow,
  disableGamesOverflow,
  cleanShell,
  hideActivity,
};
