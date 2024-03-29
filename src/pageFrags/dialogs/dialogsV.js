import dialogDifficultyHtml from './dialogDifficulty.html';
import dialogStartGameFooterHtml from './dialogStartGameFooter.html';
import dialogFriendsListItemSecondaryHtml from './dialogFriendsListItemSecondary.html';
import dialogAddBlockHeaderHtml from './dialogAddBlockHeader.html';
import dialogAddBlockFooterHtml from './dialogAddBlockFooter.html';
import dialogAddBlockListItemHtml from './dialogAddBlockListItem.html';
import dialogInviteHtml from './dialogInvite.html';
import dialogAbandonHtml from './dialogAbandon.html';
import dialogGameOverHtml from './dialogGameOver.html';
import dialogReplayHtml from './dialogReplay.html';
import dialogErrorHtml from './dialogError.html';
import './dialogs.css';
import {
  currentUser,
  myFriends,
  populateAllUsers,
  updateMyFriends,
} from '../../pages/signin/signinC';
import { showActivity } from '../activity/activity';
import { concedeCurrentGame, startNewGame } from '../../pages/puzzle/puzzleC';
import { replayOpponent } from '../../pages/games/gamesC';
import { hideActivity } from '../../shellV';
import { sendInvitation } from './dialogsC';

let adjustedFriendsObject = {};

document.querySelector('.dialog--close').addEventListener('click', resetDialog);

function resetDialog() {
  document.querySelector('.dialog__content--header').innerHTML = '';
  document.querySelector('.dialog__list').innerHTML = '';
  document.querySelector('.dialog__content--footer').innerHTML = '';
  hideActivity();
  document.querySelector('.dialog__shell').close();
}

/**
 * Opens invitation dialog
 */
function showInviteDialog() {
  resetDialog();
  showActivity('.header__activity', 'Working...');
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogInviteHtml;
  const textFieldElements = dialogElement.querySelectorAll('.mdl-textfield');
  for (const elem of textFieldElements) componentHandler.upgradeElement(elem);
  hideActivity();
  dialogElement.showModal();
  document
    .querySelector('.dialog__button--mail')
    .addEventListener('click', () => {
      // showActivity('.header__activity', 'Working...');
      dialogElement.close();
      sendInvitation();
    });
}

/**
 * Opens concede dialog
 */
function showConcedeDialog() {
  resetDialog();
  showActivity('.header__activity', 'Working...');
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogAbandonHtml;
  header
    .querySelector('.dialog__button--no')
    .addEventListener('click', () => dialogElement.close());
  header.querySelector('.dialog__button--yes').addEventListener('click', () => {
    // showActivity('.header__activity', 'Working...');
    dialogElement.close();
    concedeCurrentGame();
  });
  // const textFieldElements = dialogElement.querySelectorAll('.mdl-textfield');
  // for (const elem of textFieldElements) componentHandler.upgradeElement(elem);
  dialogElement.showModal();
}

/**
 * Show dialog for user to decide if they want to replay the opponent
 * @param {Object} game Game that just ended vs. opponent
 * @param {string} result Message about who won
 */
function showReplayDialog(game, result) {
  resetDialog();
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogGameOverHtml;
  header.innerHTML += dialogDifficultyHtml;
  let difficulty = game.difficulty;
  const radioButtons = document.querySelectorAll(
    '.dialog__radios--difficulty label input'
  );
  for (const radioButton of radioButtons) {
    if (difficulty === radioButton.value) radioButton.checked = true;
  }
  dialogElement.querySelector('.dialog__heading--big').innerText = result;
  dialogElement.querySelector('.dialog__content--footer').innerHTML =
    dialogReplayHtml;
  dialogElement.showModal();
  document
    .querySelector('.dialog__button--replay')
    .addEventListener('click', (event) => {
      for (const radioButton of radioButtons) {
        if (radioButton.checked) difficulty = radioButton.value;
      }
      replayOpponent(game, difficulty);
      dialogElement.close();
    });
}

/**
 * Shows an error dialog with appropriate messaging
 * @param {string} message Type of error
 */
function showErrorDialog(message) {
  resetDialog();
  hideActivity();
  const dialogShell = document.querySelector('.dialog__shell');
  const header = dialogShell.querySelector('.dialog__content--header');
  header.innerHTML = dialogErrorHtml;
  document.querySelector('.dialog__error--message').innerText = message;
  document
    .querySelector('.dialog__button--ok')
    .addEventListener('click', () => {
      // document.querySelector('.mdl-dialog__content').innerHTML = '';
      dialogShell.close();
    });
  dialogShell.showModal();
}

/**
 * Populates Game Start dialog and displays it
 */
function showGameStartDialog() {
  resetDialog();
  showActivity('.header__activity', 'Working...');
  // if (!myFriends) return;
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogDifficultyHtml;
  const headingDiv = document.createElement('div');
  headingDiv.className = 'heading';
  headingDiv.append('Choose your opponent below:');
  const footer = dialogElement.querySelector('.dialog__content--footer');
  footer.innerHTML = dialogStartGameFooterHtml;
  const listContainer = dialogElement.querySelector('.dialog__list');
  const list = document.createElement('ul');
  list.className = 'mdl-list';
  listContainer.append(list);
  list.innerHTML = '';
  list.append(loadFriendsList());
  dialogElement.showModal();
  hideActivity();
  document
    .querySelector('.dialog__list ul')
    .addEventListener('click', (event) => {
      selectOpponent(event);
      dialogElement.close();
    });
  document
    .querySelector('.dialog__button--footer-1')
    .addEventListener('click', () => {
      dialogElement.close();
      showAddBlockDialog();
    });
}

function selectOpponent(event) {
  let eventTarget = event.target;
  while (eventTarget.nodeName.toLowerCase() !== 'li') {
    eventTarget = eventTarget.parentElement;
    if (eventTarget.classList.contains('dialog__shell')) return;
  }
  showActivity('.header__activity', 'Fetching new game...');
  const gameStartParameters = {};
  const myUid = currentUser.uid;
  gameStartParameters.players = {};
  gameStartParameters.players[myUid] = {};
  gameStartParameters.players[myUid].bgColor = 'bg-color__red--translucent';
  gameStartParameters.viewableBy = [];
  gameStartParameters.viewableBy.push(myUid);
  const oppUid = eventTarget.id;
  gameStartParameters.players[oppUid] = {};
  gameStartParameters.players[oppUid].bgColor = 'bg-color__blue--translucent';
  gameStartParameters.viewableBy.push(oppUid);
  const radioButtons = document.querySelectorAll(
    '.dialog__radios--difficulty label input'
  );
  for (const radioButton of radioButtons) {
    if (radioButton.checked) {
      gameStartParameters.difficulty = radioButton.value;
      break;
    }
  }
  gameStartParameters.scoring = currentUser.prefScoring;
  startNewGame(gameStartParameters);
}

/**
 * Instantiate and return HTML list of players friends to be appended
 * in the Start Game dialogList element.
 * @return {DocumentFragment} html list of friends for display
 */
function loadFriendsList() {
  console.log('Hello from loadFriendsList.');
  let userList = new DocumentFragment();
  let uids = Object.keys(myFriends);
  if (uids.length === 0) {
    console.warn('No users in list.');
    return;
  }
  for (const uid of uids) {
    if (!(uid && myFriends[uid])) continue;
    const user = myFriends[uid];
    let avatar = document.createElement('i');
    avatar.className = 'material-icons mdl-list__item-avatar';
    avatar.append('person');
    if (user.prefAvatarUrl || user.photoURL) {
      avatar = document.createElement('span');
      avatar.className =
        'container--picture material-icons mdl-list__item-avatar';
      const userPhoto = document.createElement('img');
      userPhoto.src = `${user.prefAvatarUrl || user.photoURL}`;
      userPhoto.alt = 'profile picture';
      avatar.append(userPhoto);
    }
    const userListItem = document.createElement('li');
    userListItem.id = uid;
    userListItem.className =
      'mdl-list__item mdl-list__item--two-line cursor--pointer';
    const primaryContentSpan = document.createElement('span');
    primaryContentSpan.className =
      'mdl-list__item-primary-content white-space--nowrap';
    const nameElement = document.createElement('div');
    nameElement.className = 'container__name--list';
    nameElement.append(`${user.prefName || user.displayName || 'Anonymous'}`);
    const providerElement = document.createElement('span');
    providerElement.className = 'mdl-list__item-sub-title';
    providerElement.innerText = user.signInProvider
      ? user.signInProvider.split('.')[0]
      : 'none';
    primaryContentSpan.append(avatar, nameElement, providerElement);
    userListItem.append(primaryContentSpan);
    userListItem.innerHTML += dialogFriendsListItemSecondaryHtml;
    userList.append(userListItem);
  }
  // hideActivity();
  return userList;
}

/**
 * Instantiate and return avatar element
 * @returns {Element} avatar element to insert into document
 */
function instantiateAvatar(user) {
  let avatar = null;
  if (user.prefAvatarUrl || user.photoURL) {
    avatar = document.createElement('span');
    avatar.className =
      'container--picture material-icons mdl-list__item-avatar';
    const userPhoto = document.createElement('img');
    userPhoto.src = `${user.prefAvatarUrl || user.photoURL}`;
    userPhoto.alt = 'profile picture';
    avatar.append(userPhoto);
  } else {
    avatar = document.createElement('i');
    avatar.className = 'material-icons mdl-list__item-avatar';
    avatar.append('person');
  }
  return avatar;
}

/**
 * Instantiate and return HTML list of all users to be appended in the
 * Add/Block dialog.
 * @returns {Promise<DocumentFragment>} html list of users with Add/Block radio buttons
 */
function loadAddBlockList() {
  console.log('Hello from loadAddBlockList.');
  adjustedFriendsObject = {};
  adjustedFriendsObject.friends = currentUser.friends || [];
  adjustedFriendsObject.blocked = currentUser.blocked || [];
  return populateAllUsers().then((allUsers) => {
    let uids = Object.keys(allUsers);
    let userList = new DocumentFragment();
    if (uids.length === 0) {
      console.warn('No users exist.');
      return null;
    }
    let itemNumber = 0;
    for (const uid of uids) {
      if (!(uid && allUsers[uid])) continue;
      const user = allUsers[uid];
      const friend = currentUser.friends && currentUser.friends.includes(uid);
      const block = currentUser.blocked && currentUser.blocked.includes(uid);
      const userListItem = document.createElement('li');
      userListItem.setAttribute('id', uid);
      userListItem.className = 'mdl-list__item mdl-list__item--two-line';
      userListItem.style = 'background-color: inherit';
      userListItem.innerHTML = dialogAddBlockListItemHtml;
      userListItem
        .querySelector('.mdl-list__item-primary-content')
        .insertBefore(
          instantiateAvatar(user),
          userListItem.querySelector('.container__name--list')
        );
      userListItem.querySelector('.container__name--list').innerText =
        user.prefName || user.displayName || 'Anonymous';
      userListItem.querySelector('.mdl-list__item-sub-title').innerText =
        user.signInProvider ? user.signInProvider.split('.')[0] : 'none';
      const dialogRadioElements = userListItem.querySelector(
        '.dialog__radios--add-block'
      );
      // set friend radio button attributes
      const firstRadioLabel = dialogRadioElements.children[0];
      firstRadioLabel.setAttribute('for', `addFriend${itemNumber}`);
      const firstRadioButton = firstRadioLabel.querySelector('input');
      firstRadioButton.id = `addFriend${itemNumber}`;
      firstRadioButton.setAttribute('name', `friends${itemNumber}`);
      if (friend) firstRadioButton.setAttribute('checked', '');
      firstRadioButton.addEventListener('click', () => {
        firstRadioButton.setAttribute('checked', '');
        if (!adjustedFriendsObject.friends.includes(uid))
          adjustedFriendsObject.friends.push(uid);
        if (adjustedFriendsObject.blocked.includes(uid))
          adjustedFriendsObject.blocked.splice(
            adjustedFriendsObject.blocked.indexOf(uid),
            1
          );
      });
      // set blocked radio button attributes
      const secondRadioLabel = dialogRadioElements.children[1];
      secondRadioLabel.setAttribute('for', `blockPest${itemNumber}`);
      const secondRadioButton = secondRadioLabel.querySelector('input');
      secondRadioButton.id = `blockPest${itemNumber}`;
      secondRadioButton.setAttribute('name', `friends${itemNumber}`);
      if (block) secondRadioButton.setAttribute('checked', '');
      secondRadioButton.addEventListener('click', () => {
        secondRadioButton.setAttribute('checked', '');
        if (!adjustedFriendsObject.blocked.includes(uid))
          adjustedFriendsObject.blocked.push(uid);
        if (adjustedFriendsObject.friends.includes(uid))
          adjustedFriendsObject.friends.splice(
            adjustedFriendsObject.friends.indexOf(uid),
            1
          );
      });
      userList.append(userListItem);
      itemNumber++;
    }
    return userList;
  });
}

/**
 * Populates Add/Block dialog and displays it
 */
function showAddBlockDialog() {
  resetDialog();
  showActivity('.header__activity', 'Working...');
  // if (!myFriends) return;
  loadAddBlockList().then((contents) => {
    const dialogElement = document.querySelector('.dialog__shell');
    const header = dialogElement.querySelector('.dialog__content--header');
    header.innerHTML = dialogAddBlockHeaderHtml;
    const footer = dialogElement.querySelector('.dialog__content--footer');
    footer.innerHTML = dialogAddBlockFooterHtml;
    const listContainer = dialogElement.querySelector('.dialog__list');
    const list = document.createElement('ul');
    list.className = 'mdl-list';
    listContainer.append(list);
    // list.innerHTML = '';
    list.append(contents);
    dialogElement.showModal();
    hideActivity();
    document
      .querySelector('.dialog__button--footer-1')
      .addEventListener('click', () => {
        showActivity('.header__activity', 'Working...');
        updateMyFriends(adjustedFriendsObject).then(() => {
          showGameStartDialog();
        });
      });
    document
      .querySelector('.dialog__button--footer-2')
      .addEventListener('click', showInviteDialog);
  });
  // list.append(loadAddBlockList());
}

export {
  showErrorDialog,
  showGameStartDialog,
  showConcedeDialog,
  showReplayDialog,
};
