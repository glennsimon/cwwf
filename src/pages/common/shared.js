import './shared.css';

/**
 * Display activity spinner and message
 * @param {string} classSelector html selector for class (begins with '.')
 * @param {string} message message to display
 */
function showActivity(classSelector, message) {
  const activityParent = document.querySelector(classSelector);
  const pElement = document.createElement('p');
  pElement.classList.add(
    'mdl-spinner',
    'mdl-js-spinner',
    'activity__spinner',
    'is-active'
  );
  componentHandler.upgradeElement(pElement);
  activityParent.appendChild(pElement);
  const spacerElement = document.createElement('div');
  spacerElement.classList.add('spacer--10px');
  activityParent.appendChild(spacerElement);
  const spanElement = document.createElement('span');
  spanElement.classList.add('activity__message');
  spanElement.innerText = message;
  activityParent.appendChild(spanElement);
}

export { showActivity };
