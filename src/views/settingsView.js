import {
  storeSettingsController,
  handleCheckController,
  getCurrentUserController,
} from '../controller.js';
import { showErrorDialogView } from '../view.js';

const settingsContainer = document.getElementById('settingsContainer');
const avatarButton = document.getElementById('avatarButton');
const avatar = document.getElementById('avatar');
const profileName = document.getElementById('profileName');
const myName = document.getElementById('myName');
const checkAvailability = document.getElementById('checkAvailability');
const saveSettings = document.getElementById('saveSettings');
const cancelButton = document.getElementById('cancelButton');
const avatarSettings = document.getElementById('avatarSettings');
const settingsName = document.getElementById('settingsName');
const settingsHandle = document.getElementById('settingsHandle');
const handleEntry = document.getElementById('handleEntry');
const okLabel = document.getElementById('okLabel');

let prefAvatar = null;
let prefAvatarUrl = null;
let handleCheck = false;
let initialHandle = '';

/**
 * Displays settings card for user to personalize settings
 */
function showSettingsView() {
  handleCheck = false;
  const currentUser = getCurrentUserController();
  avatarSettings.src =
    currentUser.prefAvatarUrl ||
    currentUser.photoURL ||
    './images/avatar_circle_black.png';
  settingsName.value = currentUser.prefName || currentUser.displayName;
  settingsName.parentElement.classList.add('is-dirty');
  let nickname = currentUser.prefName || currentUser.displayName;
  nickname = nickname.split(' ')[0];
  settingsHandle.value = currentUser.prefHandle || nickname;
  initialHandle = settingsHandle.value.toLowerCase();
  settingsHandle.parentElement.classList.add('is-dirty');
  settingsContainer.classList.remove('displayNone');
  settingsContainer.classList.add('displayFlex');
}

settingsHandle.addEventListener('input', (event) => {
  handleCheck = false;
  handleEntry.classList.remove('is-invalid');
  okLabel.innerText = '';
  if (settingsHandle.value.length > 20) {
    showErrorDialogView(
      'Maximum length for Game Persona is 20 characters, and only' +
        ' the first 6-8 characters will be displayed on the scoreboard.' +
        ' Please shorten your Game Persona to 20 characters or less.'
    );
  }
});

checkAvailability.addEventListener('click', async (event) => {
  okLabel.innerText = '';
  const available = await Promise.resolve(
    handleCheckController(settingsHandle.value.trim())
  );
  if (!available) {
    handleEntry.classList.add('is-invalid');
    handleCheck = false;
  } else {
    handleEntry.classList.remove('is-invalid');
    okLabel.innerText = 'OK!';
    handleCheck = true;
  }
});

saveSettings.addEventListener('click', (event) => {
  if (
    !handleCheck &&
    settingsHandle.value.trim().toLowerCase() !== initialHandle
  ) {
    showErrorDialogView(
      'Please check availability of your Game Persona ' +
        'by tapping the "CHECK" button'
    );
    return;
  }
  settingsHandle.value = settingsHandle.value.trim();
  settingsName.value = settingsName.value.trim();
  updateSettings();
  settingsContainer.classList.remove('displayFlex');
  settingsContainer.classList.add('displayNone');
  okLabel.innerText = '';
});

cancelButton.addEventListener('click', (event) => {
  settingsContainer.classList.remove('displayFlex');
  settingsContainer.classList.add('displayNone');
  okLabel.innerText = '';
});

/**
 * Capture settings values and initiate save.
 */
function updateSettings() {
  console.log('settingsName: ', settingsName.value);
  console.log('settingsHandle: ', settingsHandle.value);
  const settingsPrefs = {};
  settingsPrefs.prefAvatar = prefAvatar;
  settingsPrefs.prefName = settingsName.value;
  let nickname = settingsHandle.value;
  nickname = nickname.length > 8 ? nickname.slice(0, 8) : nickname;
  myName.innerText = nickname;
  settingsPrefs.prefHandle = settingsHandle.value;
  if (prefAvatarUrl) avatar.src = prefAvatarUrl;
  profileName.innerText = settingsName.value;
  myName.innerText = settingsHandle.value.slice(0, 8);
  storeSettingsController(settingsPrefs);
  prefAvatarUrl = null;
  prefAvatar = null;
}

/**
 * When user changes their preferred avatar image, display new image in
 * settings card, and upload new preferred avatar image to storage.
 */
avatarButton.addEventListener('change', async (event) => {
  const photo = event.target.files[0];
  const bitmap = await createImageBitmap(photo);
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
});

export { showSettingsView };
