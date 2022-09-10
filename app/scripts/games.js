import { db, app, functions } from './firebase-init.js';
import { clearPuzzle } from './main.js';
import {
  collection,
  addDoc,
  setDoc,
  serverTimestamp,
  doc,
  getDoc,
  onSnapshot,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { httpsCallable } from 'firebase/functions';

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
// const messaging = getMessaging(app);
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

const auth = getAuth(app);

let currentUser = auth.currentUser;
// let difficulty = 'medium';
let dialogList = '';
let activeGamesHtml = '';
let pastGamesHtml = '';
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
 * This function fetches a puzzle based on the user's selection and then
 * calls functions to format and display the puzzle
 * @param {Object} paramObject Object with competitors and puzzle difficulty
 */
function loadPuzzle(paramObject) {
  document.getElementById('puzTitle').innerText = 'Fetching data...';
  const startGame = httpsCallable(functions, 'startGame', { mode: 'no-cors' });
  startGame(paramObject)
    .then((returnObj) => {
      game = returnObj.data;
      game.start = serverTimestamp();
      console.log('game: ', game);
      return;
    })
    .then(() => {
      showPuzzle();
      location.hash = '#puzzle';
      return;
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
}

/**
 * This function takes the puzzle object returned from the fetch and displays
 * a grid and clues. The HTML table element is a placeholder and the rows and
 * cells are created on the fly. The fetched puzzle is stored as an object in
 * the variable "game".
 */
function showPuzzle() {
  // clear previous puzzle if it exists
  if (puzTable.children) {
    clearPuzzle();
  }
  idxArray = [];
  clueNumIndices = {};
  currentPuzzleId = game.docId;
  columns = game.puzzle.cols;
  myTurn = true;
  // initial estimate of element size used to determine
  // cellDim -> tableDim -> puzzle size
  if (game.puzzle.notepad) {
    // puzNotepad.style.width = '300px';
    puzNotepad.innerHTML = `<b>Notepad:</b>${game.puzzle.notepad}`;
    puzNotepad.classList.remove('displayNone');
  }
  puzTitle.innerText = game.puzzle.title ? game.puzzle.title : 'Untitled';
  puzAuthor.innerText = `by ${
    game.puzzle.author ? game.puzzle.author : 'Anonymous'
  }`;
  puzCopy.innerHTML = game.puzzle.copyright
    ? `&copy; ${game.puzzle.copyright}`
    : '';

  const cellDim = getCellDim();
  const tableDim = cellDim * game.puzzle.rows;
  let gridIndex = 0;
  for (let rowIndex = 0; rowIndex < game.puzzle.rows; rowIndex += 1) {
    const row = puzTable.insertRow(rowIndex);
    row.style.width = `${tableDim}px`;
    for (let colIndex = 0; colIndex < game.puzzle.cols; colIndex += 1) {
      const clueNumber = game.puzzle.grid[gridIndex].clueNum;
      const cell = row.insertCell(colIndex);
      const blackCell = game.puzzle.grid[gridIndex].black;

      cell.style.width = `${cellDim}px`;
      cell.style.height = `${cellDim}px`;
      cell.addEventListener('click', cellClicked);
      if (blackCell) {
        cell.className = 'black';
      } else {
        cell.classList.add('cursorPointer');
        const squareDiv = document.createElement('div');
        const letterDiv = document.createElement('div');
        squareDiv.classList.add('square');
        letterDiv.classList.add('marginAuto');
        if (game.puzzle.grid[gridIndex].status === 'locked') {
          cell.classList.add(game.puzzle.grid[gridIndex].bgColor);
        }
        const guess = game.puzzle.grid[gridIndex].guess;
        letterDiv.innerText = guess ? guess : '';
        squareDiv.appendChild(letterDiv);
        cell.appendChild(squareDiv);
        if (clueNumber !== '') {
          clueNumIndices[clueNumber.toString()] = gridIndex;
          const clueNumDiv = document.createElement('div');
          clueNumDiv.classList.add('clueNumber');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          cell.appendChild(clueNumDiv);
        }
        if (game.puzzle.grid[gridIndex].circle) {
          cell.children[0].classList.add('circle');
        }
      }
      gridIndex += 1;
    }
  }

  keyboard.classList.remove('displayNone');
  keyboard.classList.add('displayFlex');
  clueContainer.classList.remove('displayNone');
  splash.classList.add('displayNone');

  if (!game.puzzle.completedClues) {
    game.puzzle.completedClues = {};
    game.puzzle.completedClues.across = [];
    game.puzzle.completedClues.down = [];
  }

  // create contents for across clues div
  for (const clue of game.puzzle.clues.across) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0], 10);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('displayFlex', 'cursorPointer');
    clueDiv.id = 'across' + clueNumber;
    if (game.puzzle.completedClues.across.includes(clueNumber)) {
      clueDiv.classList.add('colorLightGray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursorPointer');

    const textDiv = document.createElement('div');
    textDiv.appendChild(document.createTextNode(clueText));
    textDiv.classList.add('cursorPointer');
    clueDiv.appendChild(numDiv);
    clueDiv.appendChild(textDiv);
    // clueDiv.addEventListener('click', acrossClueClick);
    acrossClues.appendChild(clueDiv);
  }

  // create contents for down clues div
  for (const clue of game.puzzle.clues.down) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0], 10);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('displayFlex', 'cursorPointer');
    clueDiv.id = 'down' + clueNumber;
    if (game.puzzle.completedClues.down.includes(clueNumber)) {
      clueDiv.classList.add('colorLightGray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursorPointer');

    const textDiv = document.createElement('div');
    textDiv.appendChild(document.createTextNode(clueText));
    textDiv.classList.add('cursorPointer');
    clueDiv.appendChild(numDiv);
    clueDiv.appendChild(textDiv);
    downClues.appendChild(clueDiv);
  }

  acrossClues.addEventListener('click', (event) => {
    if (event.target.innerText !== '') {
      clueClicked(event, 'across');
    }
  });

  downClues.addEventListener('click', (event) => {
    if (event.target.innerText !== '') {
      clueClicked(event, 'down');
    }
  });

  scores.classList.remove('displayNone');
  scores.classList.add('displayFlex');
  const me = currentUser.uid === game.initiator.uid ? 'initiator' : 'opponent';
  const they = me === 'initiator' ? 'opponent' : 'initiator';
  let myNickname = game[me].displayName;
  let oppNickname = game[they].displayName;

  myNickname =
    myNickname.indexOf(' ') === -1
      ? myNickname
      : myNickname.slice(0, myNickname.indexOf(' '));
  myNickname = myNickname.length > 8 ? myNickname.slice(0, 8) : myNickname;
  myName.innerText = myNickname;
  oppNickname =
    oppNickname.indexOf(' ') === -1
      ? oppNickname
      : oppNickname.slice(0, oppNickname.indexOf(' '));
  oppNickname = oppNickname.length > 8 ? oppNickname.slice(0, 8) : oppNickname;
  oppName.innerText = oppNickname;
  myScore.innerText = game[me].score;
  oppScore.innerText = game[they].score;
  myName.classList.add(game[me].bgColor.replace('bg', 'font'));
  oppName.classList.add(game[they].bgColor.replace('bg', 'font'));
  updateScoreHighlighting();
  if (game.emptySquares === 0) {
    let result = 'YOU WON!!';
    if (game[me].score > game[they].score) {
      game.winner = game[me].uid;
    } else {
      game.winner = game[they].uid;
      result = 'You lost';
    }
    game.status = 'finished';
    showReplayDialog(game, result);
    savePuzzle();
  }
}

/**
 * Removes letter (if present) from current cell and moves
 * backward one space
 */
function undoEntry() {
  if (currentCell) {
    let row = currentCell.parentElement.rowIndex;
    let col = currentCell.cellIndex;
    const index = row * columns + col;
    // reverse copy idxArray so we go backwards instead of forwards
    let localIdxArray = [];
    for (let i = 0, j = idxArray.length; i < idxArray.length; i++, j--) {
      localIdxArray[i] = idxArray[j - 1];
    }
    const nextCellIndex = localIdxArray.indexOf(index) + 1;
    localIdxArray = localIdxArray
      .slice(nextCellIndex)
      .concat(localIdxArray.slice(0, nextCellIndex));
    const letterDiv = document.createElement('div');
    // console.log(idxArray);
    // console.log(localIdxArray);

    if (game.puzzle.grid[index].status === 'locked') {
      // alert('Sorry, that square is locked by a previous answer');
      return;
    }
    letterDiv.appendChild(document.createTextNode(''));
    letterDiv.classList.add('marginAuto');
    currentCell.children[0].replaceChild(
      letterDiv,
      currentCell.children[0].children[0]
    );
    currentCell.classList.remove('currCellHighlight');
    currentCell.classList.add('rangeHighlight');
    for (const idx of localIdxArray) {
      if (game.puzzle.grid[idx].status !== 'locked') {
        row = Math.floor(idx / columns);
        col = idx - row * columns;
        currentCell = puzTable.children[0].children[row].children[col];
        currentCell.classList.remove('rangeHighlight');
        currentCell.classList.add('currCellHighlight');
        break;
      }
    }
  }
}

/**
 * Calculates width/height dimension of single cell in px
 * @return {number} dimension
 */
function getCellDim() {
  const puzTableWidth = puzTable.offsetWidth;
  return Math.floor(puzTableWidth / game.puzzle.rows);
}

/** Saves puzzle to firebase */
async function savePuzzle() {
  await setDoc(doc(db, 'games', currentPuzzleId), game, { merge: true });
}

/**
 * Sets the variable currentCell to the cell the user clicked in
 * @param {Event} event Mouse click or screen touch event
 */
function cellClicked(event) {
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

/** Clears letters when user changes to a different clue */
function clearLetters() {
  for (const index of idxArray) {
    if (game.puzzle.grid[index].status === 'locked') continue;
    game.puzzle.grid[index].guess = '';
    const row = Math.floor(index / columns);
    const col = index - row * columns;
    puzTable.firstChild.children[row].children[
      col
    ].firstChild.firstChild.innerText = '';
  }
}

/** Utility function to update score display */
function updateScoreHighlighting() {
  scores.children[0].classList.remove(
    myTurn ? 'bgColorTransWhite' : 'bgColorTransGold'
  );
  scores.children[0].classList.add(
    myTurn ? 'bgColorTransGold' : 'bgColorTransWhite'
  );
  scores.children[2].classList.remove(
    myTurn ? 'bgColorTransGold' : 'bgColorTransWhite'
  );
  scores.children[2].classList.add(
    myTurn ? 'bgColorTransWhite' : 'bgColorTransGold'
  );
}

/**
 * Highlights an across clue and location in puzzle based on which cell
 * the user clicks
 * @param {Object} cell Cell the user clicked
 */
function selectAcross(cell) {
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  const rowOffset = row * columns;
  const index = row * columns + col;

  clearHighlights();
  idxArray = getWordBlock(cell, 'across');
  currentClue = game.puzzle.grid[idxArray[0]].clueNum;
  for (const clue of acrossClues.children) {
    const clueNumStr = clue.children[0].textContent.split('.')[0];
    if (clueNumStr === currentClue.toString()) {
      clue.classList.add('rangeHighlight', 'cluePop');
      acrossClues.scrollBy({
        top: clue.offsetTop - 100 - acrossClues.scrollTop,
        left: 0,
        behavior: 'smooth',
      });
      singleClue.innerText = clue.children[1].textContent;
      break;
    }
  }
  let currentCol = index - rowOffset;
  let currentCell = cell.parentElement.children[currentCol];
  cell.parentElement.children[idxArray[0] - rowOffset].classList.add(
    'border2pxLeft'
  );
  for (const idx of idxArray) {
    currentCol = idx - rowOffset;
    currentCell = cell.parentElement.children[currentCol];
    currentCell.classList.add('border2pxTop', 'border2pxBottom');
    currentCell.classList.add(
      currentCol === col ? 'currCellHighlight' : 'rangeHighlight'
    );
  }
  cell.parentElement.children[
    idxArray[idxArray.length - 1] - rowOffset
  ].classList.add('border2pxRight');
}

/**
 * Highlights a down clue and location in puzzle based on which cell
 * the user clicks
 * @param {Object} cell Cell the user clicked
 */
function selectDown(cell) {
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  const index = row * columns + col;

  clearHighlights();
  idxArray = getWordBlock(cell, 'down');
  // get the number of the clue number
  currentClue = game.puzzle.grid[idxArray[0]].clueNum;
  for (const clue of downClues.children) {
    const clueNumStr = clue.children[0].textContent.split('.')[0];
    if (clueNumStr === currentClue.toString()) {
      clue.classList.add('rangeHighlight', 'cluePop');
      downClues.scrollBy({
        top: clue.offsetTop - 100 - downClues.scrollTop,
        left: 0,
        behavior: 'smooth',
      });
      singleClue.innerText = clue.children[1].textContent;
    }
  }
  let currentRow = Math.floor(index / columns);
  let currentCell = puzTable.children[0].children[currentRow].children[col];
  puzTable.children[0].children[Math.floor(idxArray[0] / columns)].children[
    col
  ].classList.add('border2pxTop');
  for (const idx of idxArray) {
    currentRow = Math.floor(idx / columns);
    currentCell = puzTable.children[0].children[currentRow].children[col];
    currentCell.classList.add('border2pxLeft', 'border2pxRight');
    currentCell.classList.add(
      currentRow === row ? 'currCellHighlight' : 'rangeHighlight'
    );
  }
  puzTable.children[0].children[
    Math.floor(idxArray[idxArray.length - 1] / columns)
  ].children[col].classList.add('border2pxBottom');
}

/**
 * Returns an array of indices of cells that make up a word block in
 * the current puzzle.
 * @param {Object} cell Cell in puzzle
 * @param {string} direction Direction (across or down)
 * @return {array} Array of indices that make up a word block
 */
function getWordBlock(cell, direction) {
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  let index = row * columns + col;
  const indexArray = [];
  if (direction === 'across') {
    while (index > row * columns && !game.puzzle.grid[index - 1].black) {
      index--;
    }
    while (index < (row + 1) * columns && !game.puzzle.grid[index].black) {
      indexArray.push(index);
      index++;
    }
  } else {
    while (index >= columns && !game.puzzle.grid[index - columns].black) {
      index -= columns;
    }
    while (
      index < game.puzzle.rows * columns &&
      !game.puzzle.grid[index].black
    ) {
      indexArray.push(index);
      index += columns;
    }
  }
  return indexArray;
}

/** Removes clue cell highlighting from all cells */
function clearHighlights() {
  // console.log(puzTable.children[0]);
  const rowArray = puzTable.children[0].children;

  for (const row of rowArray) {
    for (const cell of row.children) {
      if (cell.className !== 'black') {
        cell.classList.remove(
          'rangeHighlight',
          'currCellHighlight',
          'border2pxBottom',
          'border2pxRight',
          'border2pxLeft',
          'border2pxTop'
        );
      }
    }
  }
  for (const clue of acrossClues.children) {
    clue.classList.remove('rangeHighlight', 'cluePop');
  }
  for (const clue of downClues.children) {
    clue.classList.remove('rangeHighlight', 'cluePop');
  }
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

/**
 * This function fetches an active puzzle based on the user's selection
 * and then calls functions to format and display the puzzle
 * @param {String} puzzleId Firestore game (puzzle) id
 */
function fetchPuzzle(puzzleId) {
  puzTitle.innerText = 'Fetching data...';
  subscribeToGame(puzzleId);
}

/**
 * Adds a letter to the puzzle from physical or virtual keyboard event and
 * moves forward one space
 * @param {Event} event Keyboard or touch event from physical or virtual
 * keyboard
 */
function enterLetter(event) {
  if (!keyboard.classList.contains('displayNone')) {
    if (event.keyCode === 13) {
      playWord();
      return;
    }
    let letter;
    if (event.key) {
      letter = event.key;
    } else {
      let node = event.target;
      while (node.classList[0] !== 'kbButton') {
        node = node.parentNode;
      }
      letter = node.childNodes[0].childNodes[0].data;
    }
    if (letter && letter.toLowerCase() === 'backspace') {
      undoEntry();
      return;
    }
    if (!letter || !letter.match(/^[a-zA-Z]$/)) return;
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      const index = row * columns + col;
      const nextCellIndex = idxArray.indexOf(index) + 1;
      const localIdxArray = idxArray
        .slice(nextCellIndex)
        .concat(idxArray.slice(0, nextCellIndex));
      const letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (game.puzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      game.puzzle.grid[index].guess = letter.toUpperCase();
      letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
      letterDiv.classList.add('marginAuto');
      currentCell.children[0].replaceChild(
        letterDiv,
        currentCell.children[0].children[0]
      );
      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');
      for (const idx of localIdxArray) {
        if (game.puzzle.grid[idx].status !== 'locked') {
          row = Math.floor(idx / columns);
          col = idx - row * columns;
          currentCell = puzTable.children[0].children[row].children[col];
          currentCell.classList.remove('rangeHighlight');
          currentCell.classList.add('currCellHighlight');
          break;
        }
      }
    }
  }
}

// concessionBtn.addEventListener('click', concede);
document.addEventListener('keyup', enterLetter);
// window.addEventListener('resize', resizePuzzle);
const keyList = keyboard.getElementsByClassName('kbButton');
for (const node of keyList) {
  node.addEventListener('click', enterLetter);
}
document.getElementById('backspace').addEventListener('click', undoEntry);
// document.getElementById('enter').addEventListener('click', playWord);
// document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

export { game, init, clearLists, showReplayDialog };
