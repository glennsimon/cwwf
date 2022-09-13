import { app, db } from './firebase-init.js';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import {
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  doc,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// const yearPicker = document.getElementById('pickYear');
// const monthPicker = document.getElementById('pickMonth');
// const dayPicker = document.getElementById('pickDay');
const puzTitle = document.getElementById('puzTitle');
const puzTable = document.getElementById('puzTable');
const puzAuthor = document.getElementById('puzAuthor');
const puzCopy = document.getElementById('puzCopy');
const puzNotepad = document.getElementById('puzNotepad');
const clueContainer = document.getElementById('clueContainer');
const acrossClues = document.getElementById('acrossClues');
const downClues = document.getElementById('downClues');
const singleClue = document.getElementById('singleClue');
const keyboard = document.getElementById('kbContainer');
const screenToggle = document.getElementById('screenToggle');
const splash = document.getElementById('splash');
const scores = document.getElementById('scores');
const myName = document.getElementById('myName');
const oppName = document.getElementById('oppName');
const myScore = document.getElementById('myScore');
const oppScore = document.getElementById('oppScore');
const logo = document.getElementById('logo');
const concessionBtn = document.getElementById('concessionBtn');
const messaging = getMessaging(app);
const auth = getAuth();
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

// Configure Web credentials with FCM VAPID key
getToken(messaging, {
  vapidKey:
    'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak',
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

if (messaging) {
  onMessage(messaging, (payload) => {
    console.log('onMessage: ', payload);
  });
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    // if (messaging) {
    //   sendTokenToServer();
    // }
  }
});

/**
 * Send cloud messaging token to server
 * @param {string} token Cloud messaging token
 */
async function sendTokenToServer(token) {
  console.log('Messaging permission granted. Token: ', token);
  if (currentUser) {
    await setDoc(doc(db, `/users/${currentUser.uid}`), token);
  }
}

logo.addEventListener('click', () => {
  location.hash = '#games';
});

puzTitle.innerText = 'No puzzle loaded';

/**
 * Parse the fetched puzzle into a more compact form
 * @param {Object} puzzle Puzzle object returned from fetch
 */
function parsePuzzle(puzzle) {
  const rows = puzzle.size.rows;
  const cols = puzzle.size.cols;
  game = {};
  game.emptySquares = rows * cols;
  game.puzzle = {};
  game.puzzle.cols = cols;
  game.puzzle.rows = rows;
  game.puzzle.author = puzzle.author;
  game.puzzle.clues = puzzle.clues;
  game.puzzle.copyright = puzzle.copyright;
  game.puzzle.date = puzzle.date;
  game.puzzle.dow = puzzle.dow;
  game.puzzle.editor = puzzle.editor;
  game.puzzle.notepad = puzzle.notepad;
  game.puzzle.title = puzzle.title;
  game.puzzle.completedClues = {};
  game.puzzle.completedClues.across = [];
  game.puzzle.completedClues.down = [];
  game.puzzle.grid = [];
  for (let i = 0; i < puzzle.grid.length; i++) {
    game.puzzle.grid[i] = {};
    if (puzzle.grid[i] === '.') {
      game.puzzle.grid[i].black = true;
      game.emptySquares--;
    } else {
      game.puzzle.grid[i].black = false;
      game.puzzle.grid[i].value = puzzle.grid[i];
      game.puzzle.grid[i].clueNum =
        puzzle.gridnums[i] === 0 ? '' : puzzle.gridnums[i];
      game.puzzle.grid[i].status = 'free';
      game.puzzle.grid[i].circle = puzzle.circles && puzzle.circles[i] === 1;
    }
  }
  columns = cols;
  console.log(game.puzzle);
}

/** Saves new puzzle to firebase
 * @param {Object} paramObject Id and difficulty object passed to loadPuzzle
 * from games.js
 */
function saveNewPuzzle(paramObject) {
  const initiatorUid = paramObject.initiator.uid;
  const iDisplayName = paramObject.initiator.displayName;
  myOpponentUid = paramObject.opponent.uid;
  const oDisplayName = paramObject.opponent.displayName;

  myTurn = true;
  game.initiator = {};
  game.initiator.uid = initiatorUid;
  game.initiator.displayName = iDisplayName;
  game.initiator.bgColor = 'bgTransRed';
  game.initiator.score = 0;
  game.initiator.squaresWon = [];
  game.initiator.errors = 0;
  game.opponent = {};
  game.opponent.uid = myOpponentUid;
  game.opponent.displayName = oDisplayName;
  game.opponent.bgColor = 'bgTransBlue';
  game.opponent.score = 0;
  game.opponent.squaresWon = [];
  game.opponent.errors = 0;
  game.difficulty = paramObject.difficulty;
  game.start = serverTimestamp();
  game.status = 'started';
  game.winner = null;
  game.nextTurn = initiatorUid;
  addDoc(collection(db, 'games'), game)
    .then((docRef) => {
      currentPuzzleId = docRef.id;
      console.log('game written to firestore with docRef: ', currentPuzzleId);
      return currentPuzzleId;
    })
    .then((puzzleId) => {
      subscribeToGame(puzzleId);
    });
}

/** Resizes puzzle based on available space */
function resizePuzzle() {
  if (puzTable.children.length === 0) return;
  // console.log(puzTable.children[0]);
  const cellDim = getCellDim();
  const tableDim = cellDim * game.puzzle.rows;
  const rowArray = puzTable.children[0].children;

  for (const row of rowArray) {
    row.style.width = tableDim + 'px';
    const cellArray = row.children;
    for (const cell of cellArray) {
      cell.style.width = cellDim + 'px';
      cell.style.height = cellDim + 'px';
    }
  }
  if (currentCell) {
    if (acrossWord) {
      selectAcross(currentCell);
    } else {
      selectDown(currentCell);
    }
  }
}

/**
 * Checks if array of cells is filled in correctly
 * @return {boolean} true if correct, false otherwise
 */
function correctAnswer() {
  for (const index of idxArray) {
    const gridElement = game.puzzle.grid[index];
    if (gridElement.guess !== gridElement.value) {
      return false;
    }
  }
  return true;
}

/** Concede the game immediately */
function concede() {
  const me = currentUser.uid === game.initiator.uid ? 'initiator' : 'opponent';
  const they = me === 'initiator' ? 'opponent' : 'initiator';

  game.emptySquares = 0;
  for (const square of game.puzzle.grid) {
    if (square.status && square.status === 'free') {
      square.status = 'locked';
      square.guess = square.value;
      square.bgColor = game[they].bgColor;
      game[they].score += scoreValues[square.value];
    }
  }
  savePuzzle();
}

/** Init in case we need it */
function init() {
  console.log('The dude abides!');
}

export { init };
