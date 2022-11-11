import {
  storeSettingsController,
  handleCheckController,
} from './controller.js';

const settingsContainer = document.getElementById('settingsContainer');
const avatarButton = document.getElementById('avatarButton');
const checkAvailability = document.getElementById('checkAvailability');
const saveSettings = document.getElementById('saveSettings');
const cancelButton = document.getElementById('cancelButton');
const avatarSettings = document.getElementById('avatarSettings');
const settingsName = document.getElementById('settingsName');
const settingsHandle = document.getElementById('settingsHandle');
const handleEntry = document.getElementById('handleEntry');
const handleContainer = document.getElementById('handleContainer');
const okLabel = document.getElementById('okLabel');

let prefAvatar = null;

/**
 * Capture settings values and initiate save.
 */
function updateSettings() {
  console.log('settingsName: ', settingsName.value);
  console.log('settingsHandle: ', settingsHandle.value);
  const settingsPrefs = {};
  settingsPrefs.prefAvatar = prefAvatar;
  settingsPrefs.prefName = settingsName.value;
  settingsPrefs.prefHandle = settingsHandle.value;
  storeSettingsController(settingsPrefs);
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
});

function showSettings(settingsObj) {
  const userData = settingsObj.userData;
  if (settingsObj.prefAvatarURL) {
    avatarSettings.src = settingsObj.prefAvatarURL;
  } else {
    avatarSettings.src = './images/avatar_circle_black.png';
  }
  settingsName.value = userData.prefName || userData.displayName;
  settingsName.parentElement.classList.add('is-dirty');
  let nickname = userData.displayName.split(' ')[0];
  nickname = nickname.length > 8 ? nickname.slice(0, 8) : nickname;
  settingsHandle.value = userData.prefHandle || nickname;
  settingsHandle.parentElement.classList.add('is-dirty');
  settingsContainer.classList.remove('displayNone');
  settingsContainer.classList.add('displayFlex');
  checkAvailability.addEventListener('click', (event) => {
    okLabel.innerText = '';
    const available = handleCheckController(settingsHandle.value);
    if (!available) {
      handleEntry.classList.add('is-invalid');
    } else {
      handleEntry.classList.remove('is-invalid');
      okLabel.innerText = 'OK!';
    }
  });
  saveSettings.addEventListener('click', (event) => {
    updateSettings();
    settingsContainer.classList.remove('displayFlex');
    settingsContainer.classList.add('displayNone');
  });
  cancelButton.addEventListener('click', (event) => {
    settingsContainer.classList.remove('displayFlex');
    settingsContainer.classList.add('displayNone');
  });
}

export { showSettings };
