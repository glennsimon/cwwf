import activityHtml from './activity.html';
import './activity.css';

/**
 * Display activity spinner and message
 * @param {string} classSelector html selector for class (begins with '.')
 * @param {string} message message to display
 */
function showActivity(classSelector, message) {
  const activityParent = document.querySelector(classSelector);
  activityParent.innerHTML = activityHtml;
  const pElement = activityParent.querySelector('p');
  componentHandler.upgradeElement(pElement);
  activityParent.querySelector('.activity__message').innerText = message;
}

export { showActivity };
