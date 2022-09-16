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

let currentUser = auth.currentUser;
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

/** Start a new game or send user to the login page */
function initNewGame() {
  console.log('Hello from initNewGame.');
  if (currentUser) {
    // user is logged in
    gameOverHeading.classList.add('displayNone');
    winMessage.classList.add('displayNone');
    gamesDialog.showModal();
    gamesDialog.children[0].classList.add('padding0', 'height100pct');
    opponentHeading.classList.remove('displayNone');
    opponentList.classList.remove('displayNone');
    const replayButton = document.getElementById('replayButton');
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

/** Saves puzzle to firebase */
async function savePuzzle() {
  console.log('Hello from savePuzzle.');
  await setDoc(doc(db, 'games', currentPuzzleId), game, { merge: true });
}

export {};
