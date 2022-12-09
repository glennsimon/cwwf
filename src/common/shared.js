import activityHtml from './activity.html';

const gameLoadSpinner = document.getElementById('gameLoadSpinner');
const headerSpinner = document.getElementById('headerSpinner');
const friendsLoadSpinner = document.getElementById('friendsLoadSpinner');
const gameLoadMessage = document.getElementById('gameLoadMessage');
const headerMessage = document.getElementById('headerMessage');
const friendsLoadMessage = document.getElementById('friendsLoadMessage');

/**
 * Stop and hide all activity messages
 */
function stopAllSpinners() {
  if (gameLoadSpinner) {
    gameLoadSpinner.classList.remove('is-active');
    gameLoadMessage.innerText = '';
  }
  if (headerSpinner) {
    headerSpinner.classList.remove('is-active');
    headerMessage.innerText = '';
  }
  if (friendsLoadSpinner) {
    friendsLoadSpinner.classList.remove('is-active');
    friendsLoadMessage.innerText = '';
  }
}

/**
 * Display activity spinner and message
 * @param {string} classSelector html selector for class (begins with '.')
 * @param {string} message message to display
 */
function showActivity(classSelector, message) {
  document.querySelector(classSelector).innerHTML = activityHtml;
  document.querySelector('.activity__message').innerText = message;
}

/** Helper function for toggling drawer in layout*/
function toggleDrawer() {
  document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

export { stopAllSpinners, showActivity, toggleDrawer };
