import dialogDifficultyHtml from './dialogDifficulty.html';
import dialogStartGameFooterHtml from './dialogStartGameFooter.html';
import dialogFriendsListItemSecondaryHtml from './dialogFriendsListItemSecondary.html';
import './dialogs.css';
import { myFriends } from '../../pages/games/gamesC';

// document.querySelector('.button__send').addEventListener('click', async () => {
async function sendInvitation() {
  console.log('Player hit the email send button.');
  inviteProgressContainer.classList.add('displayFlex');
  inviteProgressContainer.classList.remove('displayNone');
  inviteLoadSpinner.classList.add('is-active');
  const currentUser = getCurrentUserController();
  const gameStartParameters = {};
  const myUid = currentUser.uid;
  gameStartParameters.players = {};
  gameStartParameters.players[myUid] = {};
  gameStartParameters.players[myUid].bgColor = 'bgTransRed';
  gameStartParameters.viewableBy = [];
  gameStartParameters.viewableBy.push(myUid);
  // opponent - assume never signed in
  const oppName = firstName.value || 'Friend';
  const pendUid = await pendingPlayerController({ firstName: oppName });
  console.log('pendUid: ', pendUid);
  gameStartParameters.players[pendUid] = {};
  gameStartParameters.players[pendUid].bgColor = 'bgTransBlue';
  gameStartParameters.viewableBy.push(pendUid);
  // for first game, default to 'easy' game
  gameStartParameters.difficulty = 'easy';
  const gameId = await startNewGameController(gameStartParameters);
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

function clearDialogContent() {
  document.querySelector('.dialog__content--header').innerHTML = '';
  document.querySelector('.dialog__list ul').innerHTML = '';
  document.querySelector('.dialog__content--footer').innerHTML = '';
  document.querySelector('.dialog__activity').innerHTML = '';
}

function showGameStartDialog() {
  if (!myFriends) return;
  const dialogElement = document.querySelector('.dialog__shell');
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogDifficultyHtml;
  const headingDiv = document.createElement('div');
  headingDiv.className = 'heading';
  headingDiv.append('Choose your opponent below:');
  const footer = dialogElement.querySelector('.dialog__content--footer');
  footer.innerHTML = dialogStartGameFooterHtml;
  const list = dialogElement.querySelector('.dialog__list ul');
  list.append(loadFriendsList());
  dialogElement.showModal();
  document.querySelector('.dialog--close').addEventListener('click', () => {
    document.querySelector('.dialog__shell').close();
  });
}

/**
 * Load list of players friends into dialogList element.
 * @return {string} html string of list of friends for display
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
    providerElement.append(`${user.prefName || user.displayName}`);
    primaryContentSpan.append(avatar, nameElement, providerElement);
    userListItem.append(primaryContentSpan);
    userListItem.innerHTML += dialogFriendsListItemSecondaryHtml;
    userList.append(userListItem);
  }
  document.querySelector('.dialog__activity').innerHTML = '';
  return userList;
}

export { showErrorDialog, showGameStartDialog };
