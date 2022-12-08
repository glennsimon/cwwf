import { toggleDrawer } from './common/shared.js';
import { route } from './router.js';
import './styles/shell.css';

//#region HTML element constants
const drawer = document.getElementById('drawer');
const headerSignin = document.getElementById('headerSignin');
const logo = document.getElementById('logo');
const navList = document.getElementById('navList');
//#endregion

logo.addEventListener('click', (event) => {
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
