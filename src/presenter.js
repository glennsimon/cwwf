import { eventBus } from './event-bus.js';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import {
  getAuth,
  onAuthStateChanged,
  beforeAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { onMessage, getToken } from 'firebase/messaging';
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { db, app, auth, functions, messaging } from './firebase-init.js';
import { EventBus } from './event-bus';

const dbRT = getDatabase(app);
const vapidKey =
  'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4' +
  'wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak';
const eventTypes = {
  authChange: 'authChange',
  turnPlayed: 'turnPlayed',
  letterEntered: 'letterEntered',
  startNewGame: 'startNewGame',
  getGame: 'getGame',
};
// local uid for auth state tracking
let uid = null;

function authState(state) {
  return { state: state, lastChanged: Date(serverTimestamp()) };
}

// Updates user online status only if user is logged in
// when connection/disconnection with app is made.
// If no user is logged in, this does nothing.
onValue(ref(dbRT, '.info/connected'), (snapshot) => {
  uid = auth.currentUser ? auth.currentUser.uid : null;
  if (snapshot.val() === false) {
    return;
  } else if (uid) {
    onDisconnect(ref(dbRT, `/users/${uid}`))
      .set(authState('offline'))
      .then(() => {
        set(ref(dbRT, `/users/${uid}`), authState('online'));
        return;
      });
  }
});

// handles change to database just before auth state changes,
// allowing permission to make the change.
beforeAuthStateChanged(auth, (user) => {
  if (uid) {
    set(ref(dbRT, `/users/${uid}`), authState('offline'));
  }
});

onAuthStateChanged(auth, (user) => {
  uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user ID: ', uid);
  const authStateChanged = httpsCallable(functions, 'authStateChanged');
  authStateChanged(user)
    .then((result) => {
      console.log(result);
      return;
    })
    .then(() => {
      // Create a reference to this user's specific status node.
      // This is where we will store data about being online/offline.
      set(ref(dbRT, `/users/${uid}`), authState('online'));
      return;
    })
    .then(() => {
      eventBus.emit(eventTypes.authChange, user.uid);
      return;
    })
    .then(() => {
      generateMessagingToken();
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

// Configure messaging credentials with FCM VAPID key
function generateMessagingToken() {
  getToken(messaging, {
    vapidKey: vapidKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // I don't think anything is needed here.
        // I think it automatically asks for permission.
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token: ', err);
    });
}

/**
 * Send cloud messaging token to server
 * @param {string} token Cloud messaging token
 */
async function sendTokenToServer(token) {
  console.log('Messaging permission granted. Token: ', token);
  if (uid) {
    await setDoc(
      doc(db, `/users/${uid}/`),
      { msgToken: token },
      { merge: true }
    );
  }
}

authButton.addEventListener('click', () => {
  toggleDrawer();
  if (authButton.textContent === 'sign out') {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        clearLists();
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  }
  location.hash = '#signin';
});

/** Subscribe to firestore listeners. */
onSnapshot(
  collection(db, 'users'),
  (snapshot) => {
    console.log('user list changed.');
    loadUserList(snapshot);
  },
  (error) => {
    console.error('Error getting Users: ', error);
  }
);
onSnapshot(
  collection(db, 'games'),
  (snapshot) => {
    console.log('Game list changed.');
    loadGames(snapshot);
  },
  (error) => {
    console.error('Error getting games: ', error);
  }
);

/**
 * Display a past game in the puzzle window
 * @param {Object} event Click event from replayButton in dialog
 */
function showPastGame(event) {
  console.log('Hello from showPastGame.');
  let eventTarget = event.target;
  while (!eventTarget.id) {
    if (eventTarget.nodeName.toLowerCase() === 'ul') return;
    eventTarget = eventTarget.parentElement;
  }
  concessionBtnContainer.classList.add('displayNone');
  fetchPuzzle(eventTarget.id);
}

/**
 * Sets the variable currentCell to the cell the user clicked in
 * @param {Event} event Mouse click or screen touch event
 */
function cellClicked(event) {
  console.log('Hello from cellClicked.');
  const cell = event.target;
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  const index = row * columns + col;
  // console.log(cell.cellIndex);
  // console.log(cell.parentElement.rowIndex);
  // console.log(event);

  if (cell.className === 'black') {
    return;
  }
  if (!idxArray.includes(index)) {
    clearLetters();
  }
  if (currentCell && currentCell === cell) {
    clearLetters();
    acrossWord = !acrossWord;
  }
  idxArray = [];
  currentCell = cell;
  if (acrossWord) {
    selectAcross(cell);
  } else {
    selectDown(cell);
  }
}

/**
 * When clue is clicked, this event fires
 * @param {Event} event Mouse click or screen touch event
 * @param {string} direction Clue direction (across or down)
 */
function clueClicked(event, direction) {
  console.log('Hello from clueClicked.');
  let clueNumberText = event.target.parentElement.firstChild.innerText;
  clueNumberText = clueNumberText.slice(0, clueNumberText.indexOf('.'));
  const cellIndex = clueNumIndices[clueNumberText];
  const row = Math.floor(cellIndex / columns);
  const col = cellIndex - row * columns;
  const cell = puzTable.firstChild.children[row].children[col];
  if (direction === 'across') {
    selectAcross(cell);
  } else {
    selectDown(cell);
  }
}

/**
 * Load game based on user selection
 * @param {Object} event Click event from dialogListContainer
 */
function loadNewGame(event) {
  console.log('Hello from loadNewGame.');
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
 * Load game based on user selection
 * @param {Object} event Click event from dialogListContainer
 */
function loadActiveGame(event) {
  console.log('Hello from loadActiveGame.');
  let target = event.target;
  while (target.id === '') {
    target = target.parentElement;
  }
  concessionBtnContainer.classList.remove('displayNone');
  fetchPuzzle(target.id);
}

/**
 * This function fetches an active puzzle based on the user's selection
 * and then calls functions to format and display the puzzle
 * @param {String} puzzleId Firestore game (puzzle) id
 */
function fetchPuzzle(puzzleId) {
  console.log('Hello from fetchPuzzle.');
  puzTitle.innerText = 'Fetching data...';
  subscribeToGame(puzzleId);
}

function subscribeToGame(puzzleId) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  unsubscribe();

  // Start listening to current puzzle changes
  gameUnsubscribe = onSnapshot(
    doc(db, 'games', puzzleId),
    (doc) => {
      game = doc.data();
      if (game.status === 'started') {
        myOpponentUid =
          game.initiator.uid === currentUser.uid
            ? game.opponent.uid
            : game.initiator.uid;
        columns = game.puzzle.cols;
        // myTurn = game.nextTurn !== myOpponentUid;
        // updateScoreboard();
      }
      currentPuzzleId = puzzleId;
      showPuzzle();
      location.hash = '#puzzle';
    },
    (error) => {
      console.error('Error getting puzzle: ', error);
    }
  );
}

function unsubscribe() {
  console.log('Hello from unsubscribe.');
  if (gameUnsubscribe) {
    gameUnsubscribe();
    gameUnsubscribe = null;
  }
}

/**
 * Play currentUser's turn. Executed when the player clicks the enter
 * button
 */
function playWord() {
  if (game.status === 'finished') return;
  console.log('Hello from playWord.');
  if (location.hash === '#puzzle' && !myTurn) {
    alert("Your opponent hasn't played their turn yet!");
    return;
  }
  if (incomplete()) return;
  // TODO: something like this?:
  // document.getElementById('puzTitle').innerText = 'Fetching data...';
  const answerObj = {};
  console.log('game: ', game);
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentPuzzleId;
  answerObj.guess = [];
  for (const index of idxArray) {
    answerObj.guess.push(game.puzzle.grid[index].guess);
  }
  const checkAnswer = httpsCallable(functions, 'isCorrect');
  checkAnswer(answerObj)
    .then((isCorrect) => {
      // console.log('isCorrect: ', isCorrect);
      clearHighlights();
      if (isCorrect.data) {
        const direction = acrossWord ? 'across' : 'down';
        const clueNumber = game.puzzle.grid[idxArray[0]].clueNum;
        game.puzzle.completedClues[direction].push(clueNumber);
        document
          .getElementById(direction + clueNumber)
          .classList.add('colorLightGray');
        for (let index = 0; index < idxArray.length; index++) {
          const gridElement = game.puzzle.grid[idxArray[index]];
          const value = answerObj.guess[index];
          game.puzzle.grid[idxArray[index]] = setCellStatus(
            idxArray[index],
            gridElement,
            value
          );
        }
      }
      game.nextTurn = myOpponentUid;
      // myTurn = !myTurn;
      // updateScoreboard();
      savePuzzle();
      return;
    })
    .then(() => {
      const notifyOpponent = httpsCallable(functions, 'notifyPlayer');
      return notifyOpponent(myOpponentUid).then((result) => {
        console.log(result);
        return;
      });
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
}

/**
 * Adds to score if orthogonal word is completed by this play
 * @param {number} index index of cell
 * @return {number} additional score due to completion of orthogonal word
 */
function scoreCell(index) {
  console.log('Hello from scoreCell.');
  const row = Math.floor(index / columns);
  const col = index - row * columns;
  const cell = puzTable.children[0].children[row].children[col];
  const direction = acrossWord ? 'down' : 'across';
  const wordBlock = getWordBlock(cell, direction);
  let addedScore = 0;

  for (const idx of wordBlock) {
    if (idx === index) {
      addedScore += 2 * scoreValues[game.puzzle.grid[idx].value];
    } else if (game.puzzle.grid[idx].status === 'locked') {
      addedScore += scoreValues[game.puzzle.grid[idx].value];
    } else {
      return scoreValues[game.puzzle.grid[index].value];
    }
  }
  const clueNumber = game.puzzle.grid[wordBlock[0]].clueNum;
  game.puzzle.completedClues[direction].push(clueNumber);
  return addedScore;
}

/**
 * Checks if array of cells has a letter in each square
 * @return {boolean} true if word is incomplete, false otherwise
 */
function incomplete() {
  console.log('Hello from incomplete. idxArray: ', idxArray);
  if (idxArray.length === 0) return true;
  for (const i of idxArray) {
    if (!game.puzzle.grid[i].guess || game.puzzle.grid[i].guess === '') {
      return true;
    }
  }
  return false;
}

concessionBtn.addEventListener('click', abandon);
document.addEventListener('keyup', enterLetter);
window.addEventListener('resize', resizePuzzle);
const keyList = keyboard.getElementsByClassName('kbButton');
for (const node of keyList) {
  node.addEventListener('click', enterLetter);
}
document.getElementById('backspace').addEventListener('click', undoEntry);
document.getElementById('enter').addEventListener('click', playWord);
document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

export { eventTypes };
