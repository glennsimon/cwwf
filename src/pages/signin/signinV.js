import { authButtonClickedController } from './signinC.js';
import { showActivity, toggleDrawer } from '../../common/shared.js';
import '../../styles/signin.css';
import { route } from '../../router.js';
import { clearPuzzle } from '../puzzle/puzzleV.js';

//#region HTML element constants
const authButton = document.getElementById('authButton');
const profileName = document.getElementById('profileName');
const avatar = document.getElementById('avatar');
const headerSignin = document.getElementById('headerSignin');
const headerSpinner = document.getElementById('headerSpinner');
const headerMessage = document.getElementById('headerMessage');
const gameLoadSpinner = document.getElementById('gameLoadSpinner');
const gameLoadMessage = document.getElementById('gameLoadMessage');
//#endregion

/**
 * Clicking the authButton on the drawer calls `authButtonClickedController`
 * from the controller, which signs the user in or out depending on
 * their current sign in status.
 */
authButton.addEventListener('click', (event) => {
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  clearPuzzle();
  authButtonClickedController();
});

/**
 * Called by the controller, updates the view
 * when there is an auth change.
 * @param {User} user Current logged in user or null
 */
function authChangeView(user) {
  if (user) {
    showActivity('.activity__header', 'Signing in, fetching games...');
    // gameLoadSpinner.classList.add('is-active');
    // gameLoadMessage.innerText = 'Loading your games...';
    // authButton.textContent = 'sign out';
    authButton.innerHTML = `sign out&nbsp;<span class='material-icons'>logout </span>`;
    profileName.textContent = user.prefName || user.displayName;
    avatar.src =
      user.prefAvatarUrl || user.photoURL || 'images/avatar_circle_black.png';
    route('/games');
    headerSignin.classList.add('displayNone');
  } else {
    // authButton.textContent = 'sign in';
    authButton.innerHTML = `sign in&nbsp;<span class='material-symbols-outlined signInOut'>login </span>`;
    profileName.textContent = 'N. E. Person';
    avatar.src = 'images/avatar_circle_black.png';
    route('/signin');
    // headerSignin.classList.remove('displayNone');
    puzTitle.innerText = 'No puzzle loaded';
    activeGamesContainer.innerHTML = `You must sign in to see your active games`;
    pastGamesContainer.innerHTML = `You must sign in to see your completed games`;
    clearPuzzle();
  }
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  // TODO: get rid of local variables - currentUser should be available only
  // in the controller
  // currentUser = user;
}

/**
 * Called by the controller, updates the view
 * when user has signed out.
 */
function signedOutView() {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  clearPuzzle();
}

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', () => {
  route('/signin');
});

export { authChangeView, signedOutView };
