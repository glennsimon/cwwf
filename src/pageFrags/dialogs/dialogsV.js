import dialogDifficultyHtml from './dialogDifficulty.html';
import dialogStartGameFooterHtml from './dialogStartGameFooter.html';
import dialogFriendsListItemSecondaryHtml from './dialogFriendsListItemSecondary.html';
import dialogAddBlockHeaderHtml from './dialogAddBlockHeader.html';
import dialogAddBlockFooterHtml from './dialogAddBlockFooter.html';
import dialogAddBlockListItemHtml from './dialogAddBlockListItem.html';
import dialogInviteHtml from './dialogInvite.html';
import './dialogs.css';
// import { myFriends, populateAllUsers } from '../../pages/games/gamesC';
import {
  currentUser,
  initPendingPlayer,
  myFriends,
  populateAllUsers,
  updateMyFriends,
} from '../../pages/signin/signinC';
import { showActivity } from '../activity/activity';
import { startNewGame } from '../../pages/puzzle/puzzleC';

let adjustedFriendsObject = {};

function resetDialog() {
  document.querySelector('.dialog__content--header').innerHTML = '';
  document.querySelector('.dialog__list').innerHTML = '';
  document.querySelector('.dialog__content--footer').innerHTML = '';
  document.querySelector('.dialog__activity').innerHTML = '';
  document.querySelector('.dialog__shell').close();
}

/**
 * Opens invitation dialog
 */
function showInviteDialog() {
  resetDialog();
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogInviteHtml;
  const textFieldElements = dialogElement.querySelectorAll('.mdl-textfield');
  for (const elem of textFieldElements) componentHandler.upgradeElement(elem);
  // showActivity('.dialog__activity', 'Doing stuff...');
  dialogElement.showModal();
  document.querySelector('.dialog--close').addEventListener('click', () => {
    dialogElement.close();
  });
  document
    .querySelector('.dialog__button--mail')
    .addEventListener('click', () => {
      dialogElement.close();
      sendInvitation();
    });
}

// document.querySelector('.button__send').addEventListener('click', async () => {
async function sendInvitation() {
  console.log('Player hit the email send button.');
  showActivity('.dialog__activity', 'Preparing email and game...');
  const gameStartParameters = {};
  const myUid = currentUser.uid;
  gameStartParameters.players = {};
  gameStartParameters.players[myUid] = {};
  gameStartParameters.players[myUid].bgColor = 'bg-color__red--translucent';
  gameStartParameters.viewableBy = [];
  gameStartParameters.viewableBy.push(myUid);
  // opponent - assume never signed in
  const oppName = firstName.value || 'Friend';
  const pendUid = await initPendingPlayer({ firstName: oppName });
  console.log('pendUid: ', pendUid);
  gameStartParameters.players[pendUid] = {};
  gameStartParameters.players[pendUid].bgColor = 'bg-color__blue--translucent';
  gameStartParameters.viewableBy.push(pendUid);
  // for first game, default to 'easy' game
  gameStartParameters.difficulty = 'easy';
  const gameId = await startNewGame(gameStartParameters);
  inviteProgressContainer.classList.add('displayNone');
  inviteProgressContainer.classList.remove('displayFlex');
  inviteLoadSpinner.classList.remove('is-active');
  inviteDialog.close();

  const encodedSubj = encodeURIComponent(
    `I've invited you to play a Crossword game!`
  );
  const encodedBody = encodeURIComponent(
    `${oppName},\n\nI found a crossword game that two people can play ` +
      `against each other, and I'd like to try playing it with you.\n\n` +
      `Here is the link to the game I started:\n` +
      `${document.location.origin}?pending=${pendUid}&game=${gameId}#signin` +
      `\n\nIf you click on the link and sign in, the game will show up in ` +
      `your Active Games list so we can play.\n\nLet's try it!`
  );

  window.location.href =
    `mailto:${inviteEmail.value}?subject=${encodedSubj}` +
    `&body=${encodedBody}`;
}

/**
 * Shows an error dialog with appropriate messaging
 * @param {string} message Type of error
 */
function showErrorDialog(message) {
  resetDialog();
  document.querySelector('.header__activity').innerHTML = '';
  document.querySelector('.dialog__error--message').innerText = message;
  document
    .querySelector('.dialog__button--ok')
    .addEventListener('click', () => {
      // document.querySelector('.mdl-dialog__content').innerHTML = '';
      document.querySelector('.dialog__shell').close();
    });
  document.querySelector('.dialog--close').addEventListener('click', () => {
    document.querySelector('.dialog__shell').close();
  });
  document.querySelector('.dialog__shell').showModal();
}

/**
 * Populates Game Start dialog and displays it
 */
function showGameStartDialog() {
  resetDialog();
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
  document.querySelector('.dialog--close').addEventListener('click', () => {
    dialogElement.close();
  });
  document
    .querySelector('.dialog__button--footer-1')
    .addEventListener('click', () => {
      dialogElement.close();
      showAddBlockDialog();
    });
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
    nameElement.append(`${user.prefName || user.displayName}`);
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
  document.querySelector('.dialog__activity').innerHTML = '';
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
 * @return {DocumentFragment} html list of users with Add/Block radio buttons
 */
async function loadAddBlockList() {
  console.log('Hello from loadAddBlockList.');
  adjustedFriendsObject = {};
  adjustedFriendsObject.friends = currentUser.friends || [];
  adjustedFriendsObject.blocked = currentUser.blocked || [];
  return populateAllUsers().then((allUsers) => {
    let uids = Object.keys(allUsers);
    let userList = new DocumentFragment();
    if (uids.length === 0) {
      console.warn('No users exist.');
      return;
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
        user.displayName;
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
    document.querySelector('.dialog__activity').innerHTML = '';
    return userList;
  });
}

/**
 * Populates Add/Block dialog and displays it
 */
function showAddBlockDialog() {
  resetDialog();
  // if (!myFriends) return;
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogAddBlockHeaderHtml;
  const footer = dialogElement.querySelector('.dialog__content--footer');
  footer.innerHTML = dialogAddBlockFooterHtml;
  const listContainer = dialogElement.querySelector('.dialog__list');
  const list = document.createElement('ul');
  list.className = 'mdl-list';
  listContainer.append(list);
  list.innerHTML = '';
  loadAddBlockList().then((contents) => list.append(contents));
  // list.append(loadAddBlockList());
  dialogElement.showModal();
  document
    .querySelector('.dialog--close')
    .addEventListener('click', resetDialog);
  document
    .querySelector('.dialog__button--footer-1')
    .addEventListener('click', () => {
      updateMyFriends(adjustedFriendsObject).then(() => showGameStartDialog());
    });
  document
    .querySelector('.dialog__button--footer-2')
    .addEventListener('click', showInviteDialog);
}

export { showErrorDialog, showGameStartDialog };
