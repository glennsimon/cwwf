import { db } from './firebase-init.js';
import { clearPuzzle, loadPuzzle, fetchPuzzle } from './main.js';
import { onSnapshot, collection } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const querySelector = document.querySelector.bind(document);
const gamesDialog = querySelector('#gamesDialog');
const startGameButton = querySelector('#startGameButton');
const headerSignin = querySelector('#headerSignin');
// const turnIndicator = querySelector('#turnIndicator');
const gameOverHeading = querySelector('#gameOverHeading');
const winMessage = querySelector('#winMessage');
const opponentHeading = querySelector('#opponentHeading');
const opponentList = querySelector('#opponentList');
const radioEasy = querySelector('#radioEasy');
const radioMed = querySelector('#radioMed');
const radioHard = querySelector('#radioHard');
const dialogListContainer = querySelector('#dialogList');
const activeGamesContainer = querySelector('#activeGamesContainer');
const pastGamesContainer = querySelector('#pastGamesContainer');
const auth = getAuth();

let currentUser = auth.currentUser;
// let difficulty = 'medium';
let dialogList = '';
let activeGamesHtml = '';
let pastGamesHtml = '';
let allUsers = {};
// let pastGames = {};
// holder variable for function

onAuthStateChanged(auth, (user) => {
  currentUser = user;
  // fillLists();
  if (user) {
    headerSignin.classList.add('displayNone');
  } else {
    headerSignin.classList.remove('displayNone');
    // turnIndicator.classList.add('displayNone');
  }
});

startGameButton.addEventListener('click', initNewGame);
headerSignin.addEventListener('click', () => {
  location.hash = '#signin';
});

gamesDialog.querySelector('.close').addEventListener('click', closeGamesDialog);

/** Reset radio buttons and close dialog */
function closeGamesDialog() {
  radioMed.removeAttribute('checked');
  radioHard.removeAttribute('checked');
  radioEasy.setAttribute('checked', true);
  gamesDialog.close();
}

/** Start a new game or send user to the login page */
function initNewGame() {
  if (currentUser) {
    // user is logged in
    gameOverHeading.classList.add('displayNone');
    winMessage.classList.add('displayNone');
    gamesDialog.showModal();
    gamesDialog.children[0].classList.add('padding0', 'height100pct');
    opponentHeading.classList.remove('displayNone');
    opponentList.classList.remove('displayNone');
    const replayButton = querySelector('#replayButton');
    if (replayButton) {
      try {
        gamesDialog.children[0].removeChild(replayButton);
      } catch (err) {
        // do nothing.  replayButton not attached
      }
    }
    gamesDialog.classList.add('height80pct');
  } else {
    // user is not logged in
    location.hash = '#signin';
  }
}

/** Subscribe to firestore listeners. */
onSnapshot(
  collection(db, 'users'),
  (snapshot) => {
    loadUserList(snapshot);
  },
  (error) => {
    console.error('Error getting Users: ', error);
  }
);
onSnapshot(
  collection(db, 'games'),
  (snapshot) => {
    loadGames(snapshot);
  },
  (error) => {
    console.error('Error getting games: ', error);
  }
);

/**
 * Snapshot of firebase 'user' collection
 * @param {Object} snapshot Collection of users
 */
function loadUserList(snapshot) {
  if (!currentUser) return;
  dialogListContainer.innerHTML = '';
  dialogListContainer.removeEventListener('click', loadNewGame);
  dialogList = '';
  if (snapshot.empty) {
    console.warn('No users exist yet.');
    return;
  }
  const usersObj = {};
  snapshot.docs.forEach((doc) => {
    const uid = doc.id;
    const user = doc.data();
    usersObj[uid] = user;
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    if (uid !== currentUser.uid) {
      let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
      if (user.photoURL) {
        avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${user.photoURL}' alt='profile picture'>
  </div>
</span>`;
      }
      dialogList += `<li id='${uid}' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${user.displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${user.providerId ? user.providerId.split('.')[0] : 'none'}
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <i class='material-icons'>grid_on</i>
   </span>
 </li>`;
    }
  });
  allUsers = usersObj;
  // console.log(dialogList);
  dialogListContainer.innerHTML = dialogList;
  dialogListContainer.addEventListener('click', loadNewGame);
}

/**
 * Snapshot of firebase 'games' collection
 * @param {Object} snapshot Collection of games
 */
function loadGames(snapshot) {
  if (!currentUser) return;
  activeGamesContainer.innerHTML = 'No active games yet. Start one!';
  pastGamesContainer.innerHTML = 'No completed games yet';
  activeGamesContainer.removeEventListener('click', loadActiveGame);
  activeGamesHtml = '';
  pastGamesHtml = '';
  if (snapshot.empty) {
    console.warn('No games exist yet.');
    return;
  }
  snapshot.docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    const game = doc.data();
    let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
    if (
      game.status === 'started' &&
      (game.initiator.uid === currentUser.uid ||
        game.opponent.uid === currentUser.uid)
    ) {
      const myOpponent =
        game.initiator.uid === currentUser.uid ? game.opponent : game.initiator;
      const opponentPhoto =
        allUsers[myOpponent.uid] && allUsers[myOpponent.uid].photoURL;
      if (opponentPhoto) {
        avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${opponentPhoto}' alt='profile picture'>
  </div>
</span>`;
      }
      activeGamesHtml +=
        // eslint-disable-next-line max-len
        `<li id='${
          doc.id
        }' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${myOpponent.displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${currentUser.uid === game.nextTurn ? 'Your' : 'Their'} turn
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <i class='material-icons'>grid_on</i>
   </span>
 </li>`;
    } else if (
      game.initiator.uid === currentUser.uid ||
      game.opponent.uid === currentUser.uid
    ) {
      const myOpponent =
        game.initiator.uid === currentUser.uid ? game.opponent : game.initiator;
      let result = 'Game cancelled';
      if (game.status === 'finished') {
        result = currentUser.uid === game.winner ? 'You won!!' : 'They won';
      } else if (game.status === 'abandoned') {
        result = 'Game abandoned';
      }
      // pastGames[doc.id] = {};
      // pastGames[doc.id].difficulty = game.difficulty;
      const opponentPhoto =
        allUsers[myOpponent.uid] && allUsers[myOpponent.uid].photoURL;
      if (opponentPhoto) {
        avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${opponentPhoto}' alt='profile picture'>
  </div>
</span>`;
      }
      pastGamesHtml += `<li id='${doc.id}' class='mdl-list__item mdl-list__item--two-line\
 cursorPointer'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${myOpponent.displayName}</span>
     <span class='mdl-list__item-sub-title'>${result}</span>
   </span>
 </li>`;
    }
  });
  // console.log(dialogList);
  activeGamesContainer.innerHTML =
    activeGamesHtml === ''
      ? 'No active games yet. Start one!'
      : activeGamesHtml;
  pastGamesContainer.innerHTML =
    pastGamesHtml === '' ? 'No completed games yet' : pastGamesHtml;
  activeGamesContainer.addEventListener('click', loadActiveGame);
  pastGamesContainer.addEventListener('click', showPastGame);
}

/**
 * Show dialog for user to decide if they want to replay the opponent
 * @param {Object} event Click event from replayButton in dialog
 */
function showPastGame(event) {
  let eventTarget = event.target;
  while (!eventTarget.id) {
    if (eventTarget.nodeName.toLowerCase() === 'ul') return;
    eventTarget = eventTarget.parentElement;
  }
  fetchPuzzle(eventTarget.id);
}

/**
 * Load game based on user selection
 * @param {Object} event Click event from dialogListContainer
 */
function loadNewGame(event) {
  let target = event.target.parentElement;
  if (target.id === '') {
    target = target.parentElement;
  }
  let difficulty = radioMed.parentElement.classList.contains('is-checked')
    ? 'medium'
    : 'easy';
  difficulty = radioHard.parentElement.classList.contains('is-checked')
    ? 'hard'
    : difficulty;
  closeGamesDialog();

  loadPuzzle({
    initiator: {
      uid: currentUser.uid,
      displayName: currentUser.displayName,
    },
    opponent: {
      uid: target.id,
      displayName: allUsers[target.id].displayName,
    },
    difficulty: difficulty,
  });
}

/**
 * Show dialog for user to decide if they want to replay the opponent
 * @param {Object} game Previous game versus the opponent
 * @param {string} result Message about who won
 */
function showReplayDialog(game, result) {
  winMessage.innerText = result;
  gameOverHeading.classList.remove('displayNone');
  winMessage.classList.remove('displayNone');
  opponentHeading.classList.add('displayNone');
  opponentList.classList.add('displayNone');
  gamesDialog.classList.remove('height80pct');
  gamesDialog.children[0].classList.remove('padding0', 'height100pct');
  let replayButton = querySelector('#replayButton');
  if (!replayButton) {
    replayButton = document.createElement('button');
    replayButton.setAttribute('id', 'replayButton');
    replayButton.classList.add(
      'mdl-button',
      'mdl-js-button',
      'mdl-button--raised',
      'mdl-js-ripple-effect',
      'mdl-button--accent',
      'cursorPointer'
    );
    replayButton.innerText = 'Play Again!';
    gamesDialog.children[0].appendChild(replayButton);
    replayButton.addEventListener('click', replayOpponent);
  }
  if (game.difficulty === 'medium') {
    radioEasy.removeAttribute('checked');
    radioHard.removeAttribute('checked');
    radioMed.setAttribute('checked', true);
  } else if (game.difficulty === 'hard') {
    radioEasy.removeAttribute('checked');
    radioMed.removeAttribute('checked');
    radioHard.setAttribute('checked', true);
  } else {
    radioMed.removeAttribute('checked');
    radioHard.removeAttribute('checked');
    radioEasy.setAttribute('checked', true);
  }
  if (!gamesDialog.open) gamesDialog.showModal();

  /** Load game based on user selection */
  function replayOpponent() {
    let difficulty = radioMed.parentElement.classList.contains('is-checked')
      ? 'medium'
      : 'easy';
    difficulty = radioHard.parentElement.classList.contains('is-checked')
      ? 'hard'
      : difficulty;
    const they =
      currentUser.uid === game.initiator.uid ? 'opponent' : 'initiator';
    closeGamesDialog();

    // load puzzle based on uids of players
    loadPuzzle({
      initiator: {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
      },
      opponent: {
        uid: game[they].uid,
        displayName: game[they].displayName,
      },
      difficulty: difficulty,
    });
  }
}

/**
 * Load game based on user selection
 * @param {Object} event Click event from dialogListContainer
 */
function loadActiveGame(event) {
  const target = event.target.parentElement;
  if (target.id === '') {
    fetchPuzzle(target.parentElement.id);
  } else {
    fetchPuzzle(target.id);
  }
}

/** Clear lists on games view */
function clearLists() {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  clearPuzzle();
}

/** Init in case we need it */
function init() {
  console.log('puzzleWorker here!');
}

export { init, clearLists, showReplayDialog };
