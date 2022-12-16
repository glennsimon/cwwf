import dialogShellHtml from './dialogShell.html';
import dialogDifficultyHtml from './dialogDifficulty.html';
import dialogStartGameFooterHtml from './dialogStartGameFooter.html';
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
function showErrorDialogView(message) {
  document.querySelector('.header__activity').innerHTML = '';
  document.querySelector('.dialog__error--message').innerText = message;
  document
    .querySelector('.dialog__button--ok')
    .addEventListener('click', () => {
      // document.querySelector('.mdl-dialog__content').innerHTML = '';
      document.querySelector('.dialog__shell').close();
    });
  document
    .querySelector('.dialog__shell.close')
    .addEventListener('click', () => {
      document.querySelector('.dialog__shell').close();
    });
  document.querySelector('.dialog__shell').showModal();
}

function showGameStartDialog() {
  if (!myFriends) return;
  // TODO: Use <template> to create HTML here?
  let dialogElement = document.querySelector('.dialog__shell');
  if (!dialogElement) {
    dialogElement = document.createElement('div');
    dialogElement.innerHTML = dialogShellHtml;
  }
  const header = dialogElement.querySelector('.dialog__content--header');
  header.innerHTML = dialogDifficultyHtml;
  header.innerHTML += `<div class="heading">Choose your opponent below:<div>`;
  const footer = dialogElement.querySelector('.dialog__content--footer');
  footer.innerHTML = dialogStartGameFooterHtml;
  document.querySelector('body').appendChild(dialogElement);
  const list = dialogElement.querySelector('.dialog__list ul');
  list.innerHTML = loadFriendsList();
  dialogElement.firstChild.showModal();
}

/**
 * Load list of players friends into dialogList element.
 * @return {string} html string of list of friends for display
 */
function loadFriendsList() {
  console.log('Hello from loadFriendsList.');
  let userList = '';
  let uids = Object.keys(myFriends);
  if (uids.length === 0) {
    console.warn('No users in list.');
    return;
  }
  for (const uid of uids) {
    if (!(uid && myFriends[uid])) continue;
    const user = myFriends[uid];
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
    if (user.prefAvatarUrl || user.photoURL) {
      avatar = `<span class='container--picture material-icons mdl-list__item-avatar'>
  <img src='${user.prefAvatarUrl || user.photoURL}' alt='profile picture'>
</span>`;
    }
    userList += `<li id='${uid}' class='mdl-list__item mdl-list__item--two-line cursor--pointer'>
  <span class='mdl-list__item-primary-content white-space--nowrap'>
    ${avatar}
    <div class='container__name--list'>${
      user.prefName || user.displayName
    }</div>
    <span class='mdl-list__item-sub-title'>
      ${user.signInProvider ? user.signInProvider.split('.')[0] : 'none'}
    </span>
  </span>
  <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Play</span>
    <i class='material-icons'>grid_on</i>
  </span>
</li>`;
  }
  document.querySelector('.dialog__activity').innerHTML = '';
  return userList;
}

export { showErrorDialogView, showGameStartDialog };
