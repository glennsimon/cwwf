import { eventBus, eventType } from './event-bus.js';
import { db, app, auth, functions, messaging } from './firebase-init.js';
import { onMessage, getToken } from 'firebase/messaging';
import { collection, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

const scoreValues = {
  A: 1,
  B: 4,
  C: 4,
  D: 2,
  E: 1,
  F: 4,
  G: 3,
  H: 4,
  I: 1,
  J: 10,
  K: 5,
  L: 2,
  M: 4,
  N: 2,
  O: 1,
  P: 4,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 2,
  V: 5,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

let currentUser = null;
let previousUser = null;
let dialogList = '';
let allUsers = {};
let game = null;
let myOpponentUid = null;
let currentCell = null;
let acrossWord = true;
let columns = null;
let currentClue = null;
let idxArray = [];
let currentPuzzleId = null;
let myTurn = null;
let clueNumIndices = {};
let gameUnsubscribe = null;

// Empty eventBus template - delete later
eventBus.on(eventType, (data) => {
  if (condition) {
  } else {
  }
});

/**
 * EventBus event that triggers on any auth change.
 * Callback parameter is `User` who is currently signed in.
 * */
eventBus.on(eventType.authChange, (user) => {
  currentUser = user;
});

/**
 * EventBus event that triggers after user is signed out.
 * Callback parameter is `User` who was previously signed in.
 */
eventBus.on(eventType.signedOut, (user) => {
  previousUser = user;
  if (condition) {
  } else {
  }
});

/**
 * EventBus event that triggers when user starts a new game from
 * the new game dialog or from the replay dialog.
 * @param {Object} gameStartParameters Parameters needed to start game
 */
eventBus.on(eventType.startNewGame, (gameStartParameters) => {
  console.log('Attempting to start a new game.');
  const startGame = httpsCallable(functions, 'startGame');
  startGame(gameStartParameters)
    .then((gameId) => {
      subscribeToGame(gameId.data);
      return;
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
});

function subscribeToGame(puzzleId) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  gameUnsubscribe();

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

/** Saves puzzle to firebase */
async function savePuzzle() {
  console.log('Hello from savePuzzle.');
  await setDoc(doc(db, 'games', currentPuzzleId), game, { merge: true });
}

export {};
