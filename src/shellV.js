import { toggleDrawer } from './pages/common/shared.js';
import { clearPuzzle } from './pages/puzzle/puzzleV.js';
import { route } from './router.js';
import './styles/shell.css';

//#region HTML element constants
const drawer = document.getElementById('drawer');
const headerSignin = document.getElementById('headerSignin');
const navList = document.getElementById('navList');
//#endregion

/**
 * Clicking the authButton on the drawer calls `authButtonClickedController`
 * from the controller, which signs the user in or out depending on
 * their current sign in status.
 */
authButton.addEventListener('click', (event) => {
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  clearPuzzle();
  // authButtonClickedController();
});

document.querySelector('.logo').addEventListener('click', (event) => {
  console.log('Navigating to list of games page');
  event.preventDefault();
  route('/games');
});

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', () => {
  route('/signin');
});

document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

navList.addEventListener('click', (event) => {
  if (event.target.querySelector('i').innerText === 'refresh') {
    location.reload();
  }
  if (event.target.querySelector('i').innerText === 'grid_on') {
    route('/games');
  }
  if (event.target.querySelector('i').innerText === 'settings') {
    route('/settings');
  }
});
