import { currentUser } from '../signin/signinC';
import { showErrorDialog } from '../../pageFrags/dialogs/dialogsV';
import './settings.css';
import { handleAvailable, storeSettings } from './settingsC';
import { cleanShell } from '../../shellV';

let prefAvatar = null;
let prefAvatarUrl = null;
let handleCheck = false;
let initialHandle = '';

/**
 * Displays settings card for user to personalize settings
 */
function showSettings() {
  cleanShell();
  handleCheck = false;
  document.querySelector('.avatar__settings').src =
    currentUser.prefAvatarUrl ||
    currentUser.photoURL ||
    './images/avatar_circle_black.png';
  const nameInput = document.getElementById('name__input');
  nameInput.value = currentUser.prefName || currentUser.displayName;
  nameInput.parentElement.classList.add('is-dirty');
  componentHandler.upgradeElement(nameInput.parentElement);
  let nickname = currentUser.prefName || currentUser.displayName || 'NoName';
  nickname = nickname.split(' ')[0];
  const handleInput = document.getElementById('handle__input');
  handleInput.value = currentUser.prefHandle || nickname;
  initialHandle = handleInput.value.toLowerCase();
  handleInput.parentElement.classList.add('is-dirty');
  handleInput.addEventListener('input', checkHandle);
  componentHandler.upgradeElement(handleInput.parentElement);
  const buttonAvailability = document.querySelector('.button--availability');
  buttonAvailability.addEventListener('click', checkAvailability);
  const buttonSave = document.querySelector('.button--save');
  buttonSave.addEventListener('click', saveSettings);
  const buttonCancel = document.querySelector('.button--cancel');
  buttonCancel.addEventListener('click', cancel);
  const buttonAvatar = document.getElementById('button--avatar');
  buttonAvatar.addEventListener('change', changeAvatar);
}

function checkHandle() {
  handleCheck = false;
  const handleEntry = document.querySelector('.handle__entry');
  handleEntry.classList.remove('is-invalid');
  const okLabel = document.querySelector('.label--ok');
  okLabel.innerText = '';
  const handleInput = document.getElementById('handle__input');
  if (handleInput.value.length > 20) {
    showErrorDialog(
      'Maximum length for Game Persona is 20 characters, and only' +
        ' the first 6-8 characters will be displayed on the scoreboard.' +
        ' Please shorten your Game Persona to 20 characters or less.'
    );
  }
}

async function checkAvailability() {
  const okLabel = document.querySelector('.label--ok');
  const handleInput = document.getElementById('handle__input');
  okLabel.innerText = '';
  const available = await Promise.resolve(
    handleAvailable(handleInput.value.trim())
  );
  const handleEntry = document.querySelector('.handle__entry');
  if (!available) {
    handleEntry.classList.add('is-invalid');
    handleCheck = false;
  } else {
    handleEntry.classList.remove('is-invalid');
    okLabel.innerText = 'OK!';
    handleCheck = true;
  }
}

function saveSettings() {
  const handleInput = document.getElementById('handle__input');
  if (
    !handleCheck &&
    handleInput.value.trim().toLowerCase() !== initialHandle
  ) {
    showErrorDialog(
      'Please check availability of your Game Persona ' +
        'by tapping the "CHECK" button'
    );
    return;
  }
  handleInput.value = handleInput.value.trim();
  const settingsName = document.getElementById('name__input');
  settingsName.value = settingsName.value.trim();
  updateSettings();
  document.querySelector('.label--ok').innerText = '';
}

function cancel() {
  document.querySelector('.label--ok').innerText = '';
  history.back();
}

/**
 * Capture settings values and initiate save.
 */
async function updateSettings() {
  const settingsName = document.getElementById('name__input');
  const handleInput = document.getElementById('handle__input');
  const avatar = document.querySelector('.avatar__settings');
  console.log('settingsName: ', settingsName.value);
  console.log('handleInput: ', handleInput.value);
  const settingsPrefs = {};
  settingsPrefs.prefAvatar = prefAvatar;
  settingsPrefs.prefName = settingsName.value;
  settingsPrefs.prefHandle = handleInput.value;
  if (prefAvatarUrl) avatar.src = prefAvatarUrl;
  document.querySelector('.user-photo').src = prefAvatarUrl;
  document.querySelector('.user-name').innerText = settingsName.value;
  storeSettings(settingsPrefs).then(history.back());
}

/**
 * When user changes their preferred avatar image, display new image in
 * settings card, and upload new preferred avatar image to storage.
 */
async function changeAvatar(event) {
  const photo = event.target.files[0];
  try {
    const bitmap = await createImageBitmap(photo);
    const avatarSettings = document.querySelector('.avatar__settings');
    if (!photo) {
      avatarSettings.src = './images/avatar_circle_black.png';
      return;
    }
    // Get size information about raw image file
    const width = bitmap.width;
    const height = bitmap.height;
    const ratio = height / width;
    let xOffset = 0;
    let yOffset = 0;
    let size = 0;
    if (ratio < 1) {
      xOffset = (width - height) / 2;
      size = height;
    } else {
      yOffset = (height - width) / 2;
      size = width;
    }
    // Create a correctly sized canvas to hold avatar image
    const bgCanvas = document.createElement('canvas');
    bgCanvas.width = 100;
    bgCanvas.height = 100;
    const context = bgCanvas.getContext('2d');
    // Resize and crop image
    context.drawImage(bitmap, xOffset, yOffset, size, size, 0, 0, 100, 100);
    // Get data url for updating settings image
    const url = bgCanvas.toDataURL();
    // Send image to storage and delete canvas
    bgCanvas.toBlob((blob) => {
      prefAvatar = blob;
      bgCanvas.remove();
    });
    avatarSettings.src = url;
    prefAvatarUrl = url;
  } catch (error) {
    console.log('Error while changing avatar photo: ', error);
  }
}

export { showSettings };
