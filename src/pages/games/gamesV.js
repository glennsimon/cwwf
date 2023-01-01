import gamesHtml from './games.html';
import { currentUser } from '../signin/signinC';
import './games.css';
import '../../pageFrags/dialogs/dialogs.css';
import { showActivity } from '../../pageFrags/activity/activity';
import { route } from '../../router';
import { showGameStartDialog } from '../../pageFrags/dialogs/dialogsV';
import { fetchPuzzle } from '../puzzle/puzzleC';
import { cleanShell } from '../../shellV';

const container__app = document.querySelector('.container__app');

/**
 * Fetch an existing game from firestore via the controller.
 * @param {MouseEvent} event
 * @returns void
 */
function loadGame(event) {
  console.log('User selected a game to view.');
  let eventTarget = event.target;
  while (eventTarget.nodeName.toLowerCase() !== 'li') {
    if (eventTarget.nodeName.toLowerCase() === 'ul') return;
    eventTarget = eventTarget.parentElement;
  }
  // if (eventTarget.nodeName.toLowerCase() === 'ul') return;
  // if (eventTarget.nodeName.toLowerCase() === 'li') {
  //   eventTarget = eventTarget.children[0];
  // }
  // const gameObj = {};
  // gameObj.gameId = eventTarget.id;
  // gameObj.opponentUid = eventTarget.children[0].id;
  showActivity('.header__activity', 'Fetching your game...');
  fetchPuzzle(eventTarget.id);
}

/**
 * Load game list with active and past games that the current user has
 * participated in.
 * @param {Array} myGames Object all games viewable by the current user
 * @param {object} userData Object with all public user data for users in myGames
 */
async function loadGames(myGames, userData) {
  console.log('Hello from loadGames.');
  cleanShell();
  container__app.innerHTML = gamesHtml;
  document
    .querySelector('.button__games--start')
    .addEventListener('click', startGameListener);
  const activityGames = document.querySelector('.activity__games');
  if (activityGames) activityGames.remove();
  const activeGamesContainer = document.querySelector(
    '.container__games--active'
  );
  const pastGamesContainer = document.querySelector('.container__games--past');
  activeGamesContainer.innerHTML = 'No active games. Start one!';
  pastGamesContainer.innerHTML = 'No completed games yet';
  if (myGames.length === 0) {
    // myGames doesn't exist or is empty
    console.warn('No games exist yet.');
    return;
  }
  if (!currentUser) return;
  const myUid = currentUser.uid;
  let activeGamesHtml = '';
  let pastGamesHtml = '';
  let pastGamesNumber = 0;
  for (const gameListItem of myGames) {
    if (
      !(
        gameListItem &&
        gameListItem.gameId &&
        gameListItem.start &&
        typeof gameListItem.start === 'number' &&
        isFinite(gameListItem.start) &&
        gameListItem.viewableBy &&
        gameListItem.viewableBy[0] &&
        gameListItem.viewableBy[1] &&
        gameListItem.status
      )
    )
      continue;
    const gameId = gameListItem.gameId;
    // const players = gameListItem.players;
    const startDate = new Date(gameListItem.start).toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
    });
    let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
    const oppUid =
      gameListItem.viewableBy[0] === myUid
        ? gameListItem.viewableBy[1]
        : gameListItem.viewableBy[0];
    if (gameListItem.status === 'started') {
      // displays up to 20 active and 10 past games.
      // Change query limit(30) in populateMyGames if different
      // number is desired.  See else below.
      const opponentPhotoUrl = userData[oppUid]
        ? userData[oppUid].prefAvatarUrl || userData[oppUid].photoURL
        : null;
      if (opponentPhotoUrl) {
        avatar = `<span class='user-photo__crop material-icons mdl-list__item-avatar'>
  <img src='${opponentPhotoUrl}' alt='profile picture'>
</span>`;
      }
      activeGamesHtml += `<li id='${gameId}' class='mdl-list__item mdl-list__item--two-line cursor--pointer'>
  <span id='${oppUid}' class='mdl-list__item-primary-content'>
    ${avatar}
    <span>${
      userData[oppUid]
        ? userData[oppUid].prefName || userData[oppUid].displayName
        : 'NoName'
    }</span>
    <span class='mdl-list__item-sub-title'>
      ${myUid === gameListItem.nextTurn ? 'Your' : 'Their'} turn
    </span>
  </span>
  <span class='mdl-list__item-secondary-content'>
  <span class='mdl-list__item-secondary-info'>Started</span>
  <span>${startDate}</span>
  </span>
</li>`;
    } else if (pastGamesNumber < 10) {
      const finishDate = new Date(gameListItem.finish).toLocaleDateString(
        'en-us',
        {
          day: 'numeric',
          month: 'short',
        }
      );
      // displays a max of 10 past games
      pastGamesNumber++;
      let result = 'Tie game!';
      if (gameListItem.status === 'finished' && gameListItem.winner !== 'tie') {
        result = myUid === gameListItem.winner ? 'You won!!' : 'They won';
      } else if (gameListItem.status === 'abandoned') {
        result = 'Game abandoned';
      }
      // pastGames[doc.id] = {};
      // pastGames[doc.id].difficulty = game.difficulty;
      const opponentPhotoUrl = userData[oppUid]
        ? userData[oppUid].prefAvatarUrl || userData[oppUid].photoURL
        : null;
      if (opponentPhotoUrl) {
        avatar = `<span class='user-photo__crop material-icons mdl-list__item-avatar'>
  <img src='${opponentPhotoUrl}' alt='profile picture'>
</span>`;
      }
      pastGamesHtml += `<li id='${gameId}' class='mdl-list__item mdl-list__item--two-line cursor--pointer'>
  <span id='${oppUid}' class='mdl-list__item-primary-content'>
    ${avatar}
    <span>${
      userData[oppUid]
        ? userData[oppUid].prefName || userData[oppUid].displayName
        : 'NoName'
    }</span>
    <span class='mdl-list__item-sub-title'>${result}</span>
  </span>
    <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Finished</span>
    <span>${finishDate}</span>
  </span>
</li>`;
    }
  }
  activeGamesContainer.innerHTML = activeGamesHtml;
  pastGamesContainer.innerHTML = pastGamesHtml;
  document.querySelector('.header__activity').innerHTML = '';
  // console.log(dialogList);
  activeGamesContainer.addEventListener('click', loadGame);
  pastGamesContainer.addEventListener('click', loadGame);
}

/**
 * Called when user clicks the startGameButton. Fires an event with user data
 * to populate, update and open the new game dialog in the view, or send user
 * to the login page if no one is logged in.
 */
function startGameListener() {
  console.log('startGameButton clicked.');
  if (currentUser) {
    // user is logged in
    showGameStartDialog();
  } else {
    // user is not logged in
    route('/signin');
  }
}

export { loadGames };
