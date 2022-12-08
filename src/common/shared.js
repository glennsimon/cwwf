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
  gameLoadSpinner.classList.remove('is-active');
  headerSpinner.classList.remove('is-active');
  friendsLoadSpinner.classList.remove('is-active');
  gameLoadMessage.innerText = '';
  headerMessage.innerText = '';
  friendsLoadMessage.innerText = '';
}

/**
 * Display activity spinner and message
 * @param {HTMLElement} spinnerElem activity spinner element
 * @param {HTMLElement} messageElem activity message element
 * @param {string} message message to display
 */
function showActivity(spinnerElem, messageElem, message) {
  spinnerElem.classList.add('is-active');
  messageElem.innerText = message;
}

/** Helper function for toggling drawer in layout*/
function toggleDrawer() {
  document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

export { stopAllSpinners, showActivity, toggleDrawer };
