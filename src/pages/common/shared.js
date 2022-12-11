import activityHtml from './activity.html';
import './shared.css';

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

export { showActivity, toggleDrawer };
