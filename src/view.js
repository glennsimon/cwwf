import { db, auth, messaging } from './firebase-init.js';
import { onMessage, getToken } from 'firebase/messaging';
import { setDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

import './styles/main.css';
import { eventBus, eventType } from './event-bus.js';
import { QuerySnapshot } from '@google-cloud/firestore';

const authButton = document.getElementById('authButton');
const profileName = document.getElementById('profileName');
const avatar = document.getElementById('avatar');
const gamesDialog = document.getElementById('gamesDialog');
const headerSignin = document.getElementById('headerSignin');
const gameOverHeading = document.getElementById('gameOverHeading');
const winMessage = document.getElementById('winMessage');
const opponentHeading = document.getElementById('opponentHeading');
const opponentList = document.getElementById('opponentList');
const radioEasy = document.getElementById('radioEasy');
const radioMed = document.getElementById('radioMed');
const radioHard = document.getElementById('radioHard');
const dialogList = document.getElementById('dialogList');
const activeGamesContainer = document.getElementById('activeGamesContainer');
const pastGamesContainer = document.getElementById('pastGamesContainer');
const puzTable = document.getElementById('puzTable');
const puzAuthor = document.getElementById('puzAuthor');
const puzCopy = document.getElementById('puzCopy');
const puzNotepad = document.getElementById('puzNotepad');
const clueContainer = document.getElementById('clueContainer');
const acrossClues = document.getElementById('acrossClues');
const downClues = document.getElementById('downClues');
const singleClue = document.getElementById('singleClue');
const keyboard = document.getElementById('kbContainer');
const splash = document.getElementById('splash');
const scores = document.getElementById('scores');
const myName = document.getElementById('myName');
const oppName = document.getElementById('oppName');
const myScore = document.getElementById('myScore');
const oppScore = document.getElementById('oppScore');
const concessionBtn = document.getElementById('concessionBtn');
const concessionBtnContainer = document.getElementById(
  'concessionBtnContainer'
);
const puzTitle = document.getElementById('puzTitle');
const logo = document.getElementById('logo');
const replayButton = document.getElementById('replayButton');

let currentUser = null;
let currentOpponent = null;
let allUsers = null;

let activeGamesHtml = '';
let pastGamesHtml = '';

logo.addEventListener('click', () => {
  location.hash = '#games';
});

/**
 * EventBus event that triggers on
 * @param {} paramName
 */
eventBus.on(eventType, (data) => {
  if (condition) {
  } else {
  }
});

/**
 * EventBus event that triggers on any auth change
 * @param {User} user Current logged in user or null
 */
eventBus.on(eventType.authChange, (user) => {
  if (user) {
    authButton.textContent = 'sign out';
    profileName.textContent = user.displayName;
    avatar.src = user.photoURL
      ? user.photoURL
      : 'images/avatar_circle_black.png';
    location.hash = '#games';
    headerSignin.classList.add('displayNone');
  } else {
    authButton.textContent = 'sign out';
    profileName.textContent = 'N. E. Person';
    avatar.src = user.photoURL = 'images/avatar_circle_black.png';
    headerSignin.classList.remove('displayNone');
    puzTitle.innerText = 'No puzzle loaded';
    location.hash = '#signin';
  }
  currentUser = user;
});

/**
 * EventBus event that triggers after user is signed out
 */
eventBus.on(eventType.signedOut, () => {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  toggleDrawer();
  clearPuzzle();
});

/** Helper function for toggling drawer */
function toggleDrawer() {
  document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

/** Removes puzzle from DOM */
function clearPuzzle() {
  console.log('Hello from clearPuzzle.');
  puzTitle.innerText = 'Puzzle info will appear here';
  // clear out old puzzle and clues
  puzTable.innerHTML = '';
  puzAuthor.innerText = '';
  puzNotepad.classList.add('displayNone');
  puzCopy.innerHTML = '';
  clueContainer.classList.add('displayNone');
  splash.classList.remove('displayNone');
  acrossClues.innerHTML = '';
  downClues.innerHTML = '';
  singleClue.innerText = 'Select in the puzzle to reveal clue';
  currentCell = null;
}

gamesDialog.querySelector('.close').addEventListener('click', closeGamesDialog);

/** Reset radio buttons and close dialog */
function closeGamesDialog() {
  console.log('Hello from closeGamesDialog.');
  radioMed.removeAttribute('checked');
  radioHard.removeAttribute('checked');
  radioEasy.setAttribute('checked', true);
  gamesDialog.close();
}

/**
 * EventBus event that triggers when user clicks the new game button,
 * which causes the gamesDialog to open.
 * @param {QuerySnapshot} snapshot Snapshot of all users
 */
eventBus.on(eventType.openNewGameDialog, (snapshot) => {
  loadUserList(snapshot);
  gameOverHeading.classList.add('displayNone');
  winMessage.classList.add('displayNone');
  gamesDialog.children[0].classList.add('padding0', 'height100pct');
  opponentHeading.classList.remove('displayNone');
  opponentList.classList.remove('displayNone');
  replayButton.classList.add('displayNone');
  gamesDialog.classList.add('height80pct');
  gamesDialog.showModal();
});

/**
 * Load list of potential opponents with snapshot of all firebase users.
 * @param {Object} snapshot Collection of users
 */
function loadUserList(snapshot) {
  console.log('Hello from loadUserList.');
  let userList = '';
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
      userList += `<li id='${uid}' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
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
  // console.log(userList);
  dialogList.innerHTML = userList;
}

/**
 * Snapshot of firebase 'games' collection
 * @param {Object} snapshot Collection of games
 */
function loadGames(snapshot) {
  console.log('Hello from loadGames.');
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
      let result = 'Tie game!';
      if (game.status === 'finished' && game.winner !== 'tie') {
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
 * This function takes the puzzle object returned from the fetch and displays
 * a grid and clues. The HTML table element is a placeholder and the rows and
 * cells are created on the fly. The fetched puzzle is stored as an object in
 * the variable "game".
 */
function showPuzzle(game) {
  console.log('Hello from showPuzzle.');
  // clear previous puzzle if it exists
  if (puzTable.children) {
    clearPuzzle();
  }
  idxArray = [];
  clueNumIndices = {};
  columns = game.puzzle.cols;
  myTurn = currentUser.uid === game.nextTurn;
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
  updateScoreboard();
  if (game.emptySquares === 0) {
    let result = 'YOU WON!!';
    if (game[me].score > game[they].score) {
      game.winner = game[me].uid;
    } else if (game[me].score < game[they].score) {
      game.winner = game[they].uid;
      result = 'You lost';
    } else {
      game.winner = 'tie';
      result = 'Tie game!';
    }
    game.status = 'finished';
    if (!game.hideReplay) {
      showReplayDialog(game, result);
      game.hideReplay = true;
    }
    savePuzzle();
  }
  // TODO: should this go here?
  location.hash = '#puzzle';
}

function updateScoreboard() {
  console.log('Hello from updateScoreboard.');
  const me = currentUser.uid === game.initiator.uid ? 'initiator' : 'opponent';
  const they = me === 'initiator' ? 'opponent' : 'initiator';
  myScore.innerText = game[me].score;
  oppScore.innerText = game[they].score;
  myName.classList.add(game[me].bgColor.replace('bg', 'font'));
  oppName.classList.add(game[they].bgColor.replace('bg', 'font'));
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
 * Removes letter (if present) from current cell and moves
 * backward one space
 */
function undoEntry() {
  console.log('Hello from undoEntry.');
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
  console.log('Hello from getCellDim.');
  const puzTableWidth = puzTable.offsetWidth;
  return Math.floor(puzTableWidth / game.puzzle.cols);
}

/** Clears letters when user changes to a different clue */
function clearLetters() {
  console.log('Hello from clearLetters.');
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

/**
 * Highlights an across clue and location in puzzle based on which cell
 * the user clicks
 * @param {Object} cell Cell the user clicked
 */
function selectAcross(cell) {
  console.log('Hello from selectAcross.');
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
  console.log('Hello from selectDown.');
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
  console.log('Hello from getWordBlock.');
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
  console.log('Hello from clearHighlights.');
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
 * Show dialog for user to decide if they want to replay the opponent
 * @param {Object} game Previous game versus the opponent
 * @param {string} result Message about who won
 */
function showReplayDialog(game, result) {
  console.log('Hello from showReplayDialog.');
  winMessage.innerText = result;
  gameOverHeading.classList.remove('displayNone');
  winMessage.classList.remove('displayNone');
  opponentHeading.classList.add('displayNone');
  opponentList.classList.add('displayNone');
  gamesDialog.classList.remove('height80pct');
  gamesDialog.children[0].classList.remove('padding0', 'height100pct');
  let replayButton = document.getElementById('replayButton');
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
}

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
  // Emit startNewGame event from eventBus
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

/**
 * Adds a letter to the puzzle from physical or virtual keyboard event and
 * moves forward one space
 * @param {Event} event Keyboard or touch event from physical or virtual
 * keyboard
 */
function enterLetter(event) {
  console.log('Hello from enterLetter.');
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
      while (!node.classList.contains('kbButton')) {
        node = node.parentNode;
      }
      letter = node.children[0].firstChild.data.trim();
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

/**
 * Sets values for gridElement based on currentUser play
 * @param {number} index index of cell
 * @param {Object} gridElement game.puzzle grid array object
 * @return {Object} Updated grid element object
 */
function setCellStatus(index, gridElement, value) {
  console.log('Hello from setCellStatus.');
  const player =
    game.initiator.uid === currentUser.uid ? 'initiator' : 'opponent';
  gridElement.value = value;
  if (gridElement.status === 'locked') {
    game[player].score += scoreValues[gridElement.value];
    return gridElement;
  }
  game[player].score += scoreCell(index);
  game.emptySquares--;
  gridElement.bgColor = game[player].bgColor;
  gridElement.status = 'locked';
  return gridElement;
}

/** Abandon the game immediately, adding all remaining
 * points to opponent's score
 * @param {string} gameId
 */
function abandon() {
  toggleDrawer();
  concessionBtnContainer.classList.add('displayNone');
  const abandonObj = {};
  abandonObj.gameId = currentPuzzleId;
  abandonObj.opponentUid = myOpponentUid;
  abandonObj.myUid = currentUser.uid;
  const abandonGame = httpsCallable(functions, 'abandonGame');
  abandonGame(abandonObj).catch((err) => {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
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

export { showPuzzle };
