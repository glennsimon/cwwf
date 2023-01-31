import { currentUser } from '../signin/signinC';
import { showErrorDialog } from '../../pageFrags/dialogs/dialogsV';
import './settings.css';
import { handleAvailable, storeSettings } from './settingsC';
import { cleanShell } from '../../shellV';

// const settingsContainer = document.getElementById('settingsContainer');
// const avatarButton = document.getElementById('avatarButton');
// const avatar = document.getElementById('avatar');
// const checkAvailability = document.getElementById('checkAvailability');
// const saveSettings = document.getElementById('saveSettings');
// const cancelButton = document.getElementById('cancelButton');
// const avatarSettings = document.getElementById('avatarSettings');
// const settingsName = document.getElementById('settingsName');
// const settingsHandle = document.getElementById('settingsHandle');
// const handleEntry = document.getElementById('handleEntry');
// const okLabel = document.getElementById('okLabel');
// const addFriendsButton = document.getElementById('addFriendsButton');
// const friendsProgressContainer = document.getElementById(
//   'friendsProgressContainer'
// );
// const firstName = document.getElementById('firstName');

let prefAvatar = null;
let prefAvatarUrl = null;
let handleCheck = false;
let initialHandle = '';
// let adjustedFriendsObject = {};

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
  // let nickname = handleInput.value || 'NoName';
  // nickname = nickname.length > 8 ? nickname.slice(0, 8) : nickname;
  // myName.innerText = nickname;
  settingsPrefs.prefHandle = handleInput.value;
  if (prefAvatarUrl) avatar.src = prefAvatarUrl;
  // myName.innerText = handleInput.value.slice(0, 8);
  document.querySelector('.user-photo').src = prefAvatarUrl;
  document.querySelector('.user-name').innerText = settingsName.value;
  storeSettings(settingsPrefs).then(history.back());
  // prefAvatarUrl = null;
  // prefAvatar = null;
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

// addFriendsButton.addEventListener('click', async (event) => {
//   gamesDialog.close();
//   friendsDialog.showModal();
//   initFriendsList();
//   const usersObj = await populateAllUsersController();
//   loadUserSelectionList(usersObj);
// });

// /**
//  * Initializes `adjustedFriendsObject` with only the friends currently has
//  */
// function initFriendsList() {
//   const currentUser = getCurrentUserController();
//   adjustedFriendsObject.friends = currentUser.friends || [];
//   adjustedFriendsObject.blocked = currentUser.blocked || [];
// }

// /**
//  * Load list of potential opponents with list of all firebase users.
//  */
// function loadUserSelectionList(usersObj) {
//   console.log('Hello from loadUserSelectionList.');
//   let userList = '';
//   let uids = Object.keys(usersObj);
//   if (uids.length === 0) {
//     console.warn('No users yet.');
//     return;
//   }
//   let itemNumber = 0;
//   for (const uid of uids) {
//     if (!(uid && usersObj[uid])) continue;
//     const friend = adjustedFriendsObject.friends.includes(uid);
//     const block = adjustedFriendsObject.blocked.includes(uid);
//     const user = usersObj[uid];
//     let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
//     if (user.prefAvatarUrl || user.photoURL) {
//       avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
//   <img src='${user.prefAvatarUrl || user.photoURL}' alt='profile picture'>
// </span>`;
//     }
//     let friendChecked = friend ? 'checked' : ' ';
//     let blockChecked = block ? 'checked' : ' ';
//     userList += `<li id='${uid}'
//       class='mdl-list__item mdl-list__item--two-line'
//       style='background-color: inherit'>
//   <span class='mdl-list__item-primary-content whiteSpaceNowrap'>
//     ${avatar}
//     <div class='overflowHidden' style='width: 115px;'>${user.displayName}</div>
//     <span class='mdl-list__item-sub-title'>
//       ${user.signInProvider ? user.signInProvider.split('.')[0] : 'none'}
//     </span>
//   </span>
//   <span class='mdl-list__item-secondary-action'>
//     <div class="displayFlex flexDirCol">
//       <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
//           for="addFriend${itemNumber}"
//           style="font-size: 12px;display: flex;align-items: center;">
//         <input type="radio" id="addFriend${itemNumber}"
//             class="mdl-radio__button" name='friends${itemNumber}'
//             value='friend' ${friendChecked}>
//         <div class="margin5px"></div>
//         <span class="material-icons" style="font-size: 20px;">add</span>
//       </label>
//       <label class="mdl-radio mdl-js-radio mdl-js-ripple-effect"
//           for="blockPest${itemNumber}"
//           style="font-size: 12px;display: flex;align-items: center;">
//         <input type="radio" id="blockPest${itemNumber}"
//             class="mdl-radio__button" name='friends${itemNumber}'
//             value='block' ${blockChecked}>
//         <div class="margin5px"></div>
//         <span class="material-icons" style="font-size: 20px;">block</span>
//       </label>
//     </div>
//   </span>
// </li>`;
//     itemNumber++;
//   }
//   friendsDialogList.innerHTML = userList;
//   const radioButtons = friendsDialogList.querySelectorAll('label input');
//   for (const radioButton of radioButtons) {
//     radioButton.addEventListener('change', adjustFriendsList);
//   }
// }

// /**
//  * Adds or removes ids from
//  * @param {Event} changeEvent event on one of the checkboxes
//  */
// function adjustFriendsList(changeEvent) {
//   let target = changeEvent.target;
//   const radioId = target.id;
//   do {
//     target = target.parentElement;
//   } while (!target.id);
//   const uid = target.id;
//   if (changeEvent.target.checked && radioId.includes('addFriend')) {
//     if (!adjustedFriendsObject.friends.includes(uid)) {
//       adjustedFriendsObject.friends.push(uid);
//     }
//     if (adjustedFriendsObject.blocked.includes(uid)) {
//       const index = adjustedFriendsObject.blocked.indexOf(uid);
//       adjustedFriendsObject.blocked.splice(index, 1);
//     }
//   }
//   if (changeEvent.target.checked && radioId.includes('blockPest')) {
//     if (!adjustedFriendsObject.blocked.includes(uid)) {
//       adjustedFriendsObject.blocked.push(uid);
//     }
//     if (adjustedFriendsObject.friends.includes(uid)) {
//       const index = adjustedFriendsObject.friends.indexOf(uid);
//       adjustedFriendsObject.friends.splice(index, 1);
//     }
//   }
//   console.log('friends: ', adjustedFriendsObject.friends);
//   console.log('blocked: ', adjustedFriendsObject.blocked);
// }

// doneButton.addEventListener('click', () => {
//   friendsDialog.close();
//   gamesDialog.showModal();
//   updateFriendsController(adjustedFriendsObject);
// });

// friendsDialog.querySelector('.close').addEventListener('click', () => {
//   friendsDialog.close();
// });

// inviteDialog.querySelector('.close').addEventListener('click', () => {
//   inviteDialog.close();
// });

// inviteFriendButton.addEventListener('click', (event) => {
//   friendsDialog.close();
//   inviteDialog.showModal();
// });

// inviteEmail.addEventListener('focusout', (event) => {
//   // TODO: optionally validate email address format
// });

export { showSettings };
