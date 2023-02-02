import './signin.css';
import { clearPuzzle } from '../puzzle/puzzleV.js';
import { closeDrawer } from '../../shellV.js';

const name = document.querySelector('.user-name');
const avatar = document.querySelector('.user-photo');
const activeGamesContainer = document.querySelector(
  '.container__games--active'
);
const pastGamesContainer = document.querySelector('.container__games--past');

/**
 * Called by the controller, updates the view
 * when there is an auth change.
 * @param {User} user Current logged in user or null
 */
function authChangeView(user) {
  if (user) {
    document.querySelector('.button__auth').innerHTML =
      `sign out<span class='spacer--10px'></span>` +
      `<span class='material-icons'>logout </span>`;
    name.textContent = user.prefName || user.displayName;
    avatar.src =
      user.prefAvatarUrl || user.photoURL || 'images/avatar_circle_black.png';
  } else {
    document.querySelector('.button__auth').innerHTML =
      `sign in<span class='spacer--10px'></span>` +
      `<span class='material-icons'>login </span>`;
    name.textContent = 'N. E. Person';
    avatar.src = '../../images/avatar_circle_black.png';
  }
  closeDrawer();
}

/**
 * Called by the controller, updates the view
 * when user has signed out.
 */
function signedOutView() {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  closeDrawer();
  clearPuzzle();
}

export { authChangeView, signedOutView };
