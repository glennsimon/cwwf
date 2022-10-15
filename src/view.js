import { getGlobal } from '@firebase/util';
import {
  authButtonClickedController,
  startNewGameController,
  populateAllUsersController,
  getCurrentUserController,
  fetchPuzzleController,
  playWordController,
  getColumnsController,
  getIdxArrayController,
  setIdxArrayController,
  getCurrentGameController,
  enterLetterController,
  abandonCurrentGameController,
  setCurrentGameController,
  savePuzzleController,
  setAcrossWordController,
  getAcrossWordController,
} from './controller.js';

import './styles/main.css';

//#region HTML element constants
const authButton = document.getElementById('authButton');
const drawer = document.getElementById('drawer');
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
const kbContainer = document.getElementById('kbContainer');
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
const returnToSignin = document.getElementById('returnToSignin');
//#endregion

let currentCell = null;
// let currentOpponent = null;
// let allUsers = null;

logo.addEventListener('click', () => {
  location.hash = '#games';
});

returnToSignin.addEventListener('click', () => (location.hash = '#signin'));

/**
 * Clicking the authButton on the drawer calls `authButtonClickedController`
 * from the controller, which signs the user in or out depending on
 * their current sign in status.
 */
authButton.addEventListener('click', (event) => {
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  authButtonClickedController();
});

/**
 * Called by the controller, updates the view
 * when there is an auth change.
 * @param {User} user Current logged in user or null
 */
function authChangeView(user) {
  if (user) {
    authButton.textContent = 'sign out';
    profileName.textContent = user.displayName;
    avatar.src = user.photoURL
      ? user.photoURL
      : 'images/avatar_circle_black.png';
    location.hash = '#games';
    headerSignin.classList.add('displayNone');
  } else {
    authButton.textContent = 'sign in';
    profileName.textContent = 'N. E. Person';
    avatar.src = 'images/avatar_circle_black.png';
    headerSignin.classList.remove('displayNone');
    puzTitle.innerText = 'No puzzle loaded';
    activeGamesContainer.innerHTML =
      'You must sign in to see your active games';
    pastGamesContainer.innerHTML =
      'You must sign in to see your completed games';
    clearPuzzle();
    if (location.hash !== '#tos' || location.hash !== '#privacy')
      location.hash = '#signin';
  }
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  // TODO: get rid of local variables - currentUser should be available only
  // in the controller
  // currentUser = user;
}

/**
 * Called by the controller, updates the view
 * when user has signed out.
 */
function signedOutView() {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  clearPuzzle();
}

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

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', () => {
  location.hash = '#signin';
});

/**
 * Start a new game with selected opponent
 * @param {MouseEvent} event Click event from dialogList
 */
dialogList.addEventListener('click', async (event) => {
  console.log('User selected opponent to start a new game.');
  const currentUser = getCurrentUserController();
  const userList = await populateAllUsersController();
  const gameStartParameters = {};
  gameStartParameters.initiator = {};
  gameStartParameters.initiator.uid = currentUser.uid;
  gameStartParameters.initiator.displayName = currentUser.displayName;
  gameStartParameters.initiator.photoURL = currentUser.photoURL
    ? currentUser.photoURL
    : null;
  // TODO: selecting the right target may need fixing - while loop?
  let target = event.target;
  // trying a fix
  while (target.id === '') {
    target = target.parentElement;
  }
  gameStartParameters.opponent = {};
  gameStartParameters.opponent.uid = userList[target.id].uid;
  gameStartParameters.opponent.displayName = userList[target.id].displayName;
  gameStartParameters.opponent.photoURL = userList[target.id].photoURL
    ? userList[target.id].photoURL
    : null;
  let difficulty = radioMed.parentElement.classList.contains('is-checked')
    ? 'medium'
    : 'easy';
  difficulty = radioHard.parentElement.classList.contains('is-checked')
    ? 'hard'
    : difficulty;
  gameStartParameters.difficulty = difficulty;
  closeGamesDialog();
  document.getElementById('puzTitle').innerText = 'Fetching new puzzle...';
  startNewGameController(gameStartParameters);
});

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
 * Fires an event with user data to populate, update and open the new game
 * dialog in the view, or send user to the login page if no one is logged in.
 */
startGameButton.addEventListener('click', async () => {
  console.log('startGameButton clicked.');
  const currentUser = getCurrentUserController();
  if (currentUser) {
    // user is logged in
    const usersObj = await populateAllUsersController();
    loadUserList(usersObj, currentUser);
    gameOverHeading.classList.add('displayNone');
    winMessage.classList.add('displayNone');
    gamesDialog.children[0].classList.add('padding0', 'height100pct');
    opponentHeading.classList.remove('displayNone');
    opponentList.classList.remove('displayNone');
    replayButton.classList.add('displayNone');
    gamesDialog.classList.add('height80pct');
    gamesDialog.showModal();
  } else {
    // user is not logged in
    location.hash = '#signin';
  }
});

/**
 * Load list of potential opponents with list of all firebase users.
 * @param {Object} usersObj Object containing all users by uid
 * @param {object} currentUser Current User
 */
function loadUserList(usersObj, currentUser) {
  console.log('Hello from loadUserList.');
  let userList = '';
  if (usersObj.empty) {
    console.warn('No users exist yet.');
    return;
  }
  let uids = Object.keys(usersObj);
  uids.forEach((uid) => {
    const user = usersObj[uid];
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    if (uid !== currentUser.uid) {
      let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
      if (user.photoURL) {
        avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
  <img src='${user.photoURL}' alt='profile picture'>
</span>`;
      }
      userList += `<li id='${uid}' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
  <span class='mdl-list__item-primary-content whiteSpaceNowrap'>
    ${avatar}
    <div class='overflowHidden' style='width: 115px;'>${user.displayName}</div>
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
  // allUsers = usersObj;
  // console.log(userList);
  dialogList.innerHTML = userList;
}

/**
 * Load game list with active and past games that the current user has
 * participated in.
 * @param {Object} gamesObj Object all games viewable by the current user
 */
async function loadGamesView(gamesObj) {
  console.log('Hello from loadGamesView.');
  const currentUser = getCurrentUserController();
  const allUsers = await populateAllUsersController();
  if (!currentUser) return;
  let activeGamesHtml = '';
  let pastGamesHtml = '';
  const keys = Object.keys(gamesObj);
  if (keys.length === 0) {
    // gamesObj doesn't exist or is empty
    activeGamesContainer.innerHTML = 'No active games. Start one!';
    pastGamesContainer.innerHTML = 'No completed games yet';
    console.warn('No games exist yet.');
    return;
  }
  keys.forEach((key) => {
    const game = gamesObj[key];
    const startDate = new Date(game.start).toLocaleDateString('en-us', {
      day: 'numeric',
      month: 'short',
    });
    let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
    if (game.status === 'started') {
      const myOpponent =
        game.initiator.uid === currentUser.uid ? game.opponent : game.initiator;
      const opponentPhoto =
        allUsers[myOpponent.uid] && allUsers[myOpponent.uid].photoURL;
      if (opponentPhoto) {
        avatar = `<span class='picContainer material-icons mdl-list__item-avatar'>
  <img src='${opponentPhoto}' alt='profile picture'>
</span>`;
      }
      activeGamesHtml += `<li id='${key}' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
  <span class='mdl-list__item-primary-content'>
    ${avatar}
    <span>${myOpponent.displayName}</span>
    <span class='mdl-list__item-sub-title'>
      ${currentUser.uid === game.nextTurn ? 'Your' : 'Their'} turn
    </span>
  </span>
  <span class='mdl-list__item-secondary-content'>
  <span class='mdl-list__item-secondary-info'>Started</span>
  <span>${startDate}</span>
  </span>
</li>`;
    } else {
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
  <img src='${opponentPhoto}' alt='profile picture'>
</span>`;
      }
      pastGamesHtml += `<li id='${key}' class='mdl-list__item mdl-list__item--two-line cursorPointer'>
  <span class='mdl-list__item-primary-content'>
    ${avatar}
    <span>${myOpponent.displayName}</span>
    <span class='mdl-list__item-sub-title'>${result}</span>
  </span>
    <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Started</span>
    <span>${startDate}</span>
  </span>
</li>`;
    }
  });
  activeGamesContainer.innerHTML = activeGamesHtml;
  pastGamesContainer.innerHTML = pastGamesHtml;

  // console.log(dialogList);
}

activeGamesContainer.addEventListener('click', loadGame);

pastGamesContainer.addEventListener('click', loadGame);

/**
 * Fetch an existing game from firestore via the controller.
 * @param {MouseEvent} event
 * @returns null
 */
function loadGame(event) {
  console.log('User selected a game to view.');
  let eventTarget = event.target;
  while (!eventTarget.id) {
    if (eventTarget.nodeName.toLowerCase() === 'ul') return;
    eventTarget = eventTarget.parentElement;
  }
  puzTitle.innerText = 'Fetching data...';
  fetchPuzzleController(eventTarget.id);
}

/**
 * This function takes the puzzle object returned from the fetch and displays
 * a grid and clues. The HTML table element is a placeholder and the rows and
 * cells are created on the fly. The fetched puzzle is stored as an object in
 * the variable "game".
 */
function showPuzzleView(game) {
  console.log('Hello from showPuzzleView.');
  // clear previous puzzle if it exists
  if (puzTable.children) {
    clearPuzzle();
  }
  if (game.puzzle.notepad) {
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
  const tableDim = cellDim * game.puzzle.cols;
  let gridIndex = 0;
  for (let rowIndex = 0; rowIndex < game.puzzle.rows; rowIndex += 1) {
    const row = puzTable.insertRow(rowIndex);
    row.style.width = `${tableDim}px`;
    for (let colIndex = 0; colIndex < game.puzzle.cols; colIndex += 1) {
      const squareData = game.puzzle.grid[gridIndex];
      const clueNumber = squareData.clueNum;
      const cell = row.insertCell(colIndex);
      const blackCell = squareData.black;

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
        if (squareData.status === 'locked') {
          cell.classList.add(squareData.bgColor);
        }
        const guess = squareData.guess;
        letterDiv.innerText = guess ? guess : '';
        squareDiv.appendChild(letterDiv);
        cell.appendChild(squareDiv);
        if (clueNumber !== '') {
          const clueNumDiv = document.createElement('div');
          clueNumDiv.classList.add('clueNumber');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          cell.appendChild(clueNumDiv);
        }
        if (squareData.circle) {
          const halfCell = cellDim / 2;
          const radius = halfCell - 1.5;
          let svgHtml = `<svg class='posAbsolute upperLeft'>
  <path d='M ${halfCell} ${halfCell}'/>
  <circle cx='${halfCell}' cy='${halfCell}' r='${radius}' stroke='black'
    fill='transparent'/>
</svg>`;
          if (squareData.clueNum) {
            // dimA and dimB values below are for 105 degree start point
            // dimA = (halfCell) * (1 - Math.cos((2 * Math.PI) / 24)) + 1.5;
            // dimB = (halfCell) * (1 - Math.sin((2 * Math.PI) / 24)) + 1.5;
            let dimA = radius * 0.03407 + 1.5;
            let dimB = radius * 0.74118 + 1.5;
            svgHtml = `\
<svg height='${cellDim}' width='${cellDim}' class='posAbsolute upperLeft'>
  <path d='M ${dimA} ${dimB} A ${radius} ${radius} 0 1 0 ${halfCell} 1.5'
    stroke='black' fill='transparent'/>
</svg>`;
          }
          cell.innerHTML += svgHtml;
        }
      }
      gridIndex += 1;
    }
  }
  setCurrentGameController(game);

  kbContainer.classList.remove('displayNone');
  kbContainer.classList.add('displayFlex');
  clueContainer.classList.remove('displayNone');
  splash.classList.add('displayNone');
  concessionBtnContainer.classList.remove('displayNone');

  // create contents for across clues div
  for (const clue of game.puzzle.clues.across) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0]);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('displayFlex', 'cursorPointer');
    clueDiv.id = 'across' + clueNumber;
    if (game.puzzle.completedClues.across.includes(clueNumber)) {
      clueDiv.classList.add('colorDarkGray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursorPointer');

    const textDiv = document.createElement('div');
    // unsafe:
    // textDiv.innerHTML = clueText;
    // safe: (setHTML sanitizes html) unfortunately, limited availablility, so
    try {
      textDiv.setHTML(clueText);
    } catch (err) {
      console.log('setHTML is not available in this browser');
      textDiv.textContent = clueText;
    }
    textDiv.classList.add('cursorPointer');
    clueDiv.appendChild(numDiv);
    clueDiv.appendChild(textDiv);
    acrossClues.appendChild(clueDiv);
  }

  // create contents for down clues div
  for (const clue of game.puzzle.clues.down) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0]);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('displayFlex', 'cursorPointer');
    clueDiv.id = 'down' + clueNumber;
    if (game.puzzle.completedClues.down.includes(clueNumber)) {
      clueDiv.classList.add('colorDarkGray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursorPointer');

    const textDiv = document.createElement('div');
    // unsafe:
    // textDiv.innerHTML = clueText;
    // safe: (setHTML sanitizes html) unfortunately, limited availablility
    try {
      textDiv.setHTML(clueText);
    } catch (err) {
      console.log('setHTML is not available in this browser');
      textDiv.textContent = clueText;
    }
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
  const me =
    getCurrentUserController().uid === game.initiator.uid
      ? 'initiator'
      : 'opponent';
  const they = me === 'initiator' ? 'opponent' : 'initiator';
  let myNickname = game[me].displayName;
  let oppNickname = game[they].displayName;

  myNickname = myNickname.split(' ')[0];
  myNickname = myNickname.length > 8 ? myNickname.slice(0, 8) : myNickname;
  myName.innerText = myNickname;
  oppNickname = oppNickname.split(' ')[0];
  oppNickname = oppNickname.length > 8 ? oppNickname.slice(0, 8) : oppNickname;
  oppName.innerText = oppNickname;
  if (game.emptySquares === 0) {
    let result = 'YOU WON!!';
    if (game[me].score < game[they].score) {
      result = 'You lost';
    } else {
      result = 'Tie game!';
    }
    if (!game.hideReplay) {
      showReplayDialog(game, result);
      savePuzzleController({ hideReplay: true });
    }
    concessionBtnContainer.classList.add('displayNone');
  } else {
    concessionBtnContainer.classList.remove('displayNone');
  }
  updateScoreboard(game);
  console.log(game);
  // TODO: should this go here?
  location.hash = '#puzzle';
}

/**
 * Animate scoring with
 * @param {*} scoreObj
 */
function animateScoringView(scoreObj) {
  console.log('scoreObj: ', scoreObj);
  if (scoreObj.newGame) return;
  const myUid = getCurrentUserController().uid;
  const scoreElem =
    myUid === scoreObj.playerUid ? scores.children[0] : scores.children[2];
  const playerScore = scoreElem.children[1];
  let animatedScore = parseInt(playerScore.textContent);
  let delay = 0;
  for (const letter of scoreObj.checkAnswerResult) {
    const index = letter.index;
    const columns = puzTable.firstChild.children.length;
    const row = Math.floor(index / columns);
    const col = index - row * columns;
    const cell = puzTable.firstChild.children[row].children[col];
    const cellBoundingRectangle = cell.getBoundingClientRect();
    const cellWidth = cellBoundingRectangle.width;
    const cellHeight = cellBoundingRectangle.height;
    const cellX = cellBoundingRectangle.x;
    const cellY = cellBoundingRectangle.y;
    const scoreBox = scoreElem.getBoundingClientRect();
    const scoreWidth = scoreBox.width;
    const scoreHeight = scoreBox.height;
    const scoreX = scoreBox.x;
    const scoreY = scoreBox.y;
    const animatedCell = document.createElement('div');
    animatedCell.style.width = cellWidth + 'px';
    animatedCell.style.height = cellHeight + 'px';
    animatedCell.style.left = cellX + 'px';
    animatedCell.style.top = cellY + 'px';
    animatedCell.style.zIndex = 99;
    animatedCell.classList =
      'displayFlex posFixed flexDirCol spaceAround animatedCell';
    const square = document.createElement('div');
    square.classList = 'square';
    const letterBox = document.createElement('div');
    letterBox.classList = 'marginAuto';
    letterBox.innerText = cell.children[0].children[0].textContent;
    square.appendChild(letterBox);
    animatedCell.appendChild(square);
    const clueNum = document.createElement('div');
    clueNum.classList = 'clueNumber';
    clueNum.innerText = cell.children[1] ? cell.children[1].textContent : '';
    animatedCell.appendChild(clueNum);
    const cellAnimator = document.getElementById('cellAnimator');
    cellAnimator.appendChild(animatedCell);

    if (letter.score === 0) {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      const horizontalBounce = windowWidth * (0.5 - Math.random());
      // animatedCell
      //   .animate (
      // [
      //   {
      //     backgroundColor: 'red',
      //     transform: 'rotate(0deg)',
      //   },
      //   {
      //     backgroundColor: 'red',
      //     iterations: Infinity,
      //     transform: 'rotate(720deg)',
      //   },
      // ],
      // { delay: delay, duration: 2000 }
      // );
      animatedCell.animate(
        [
          {
            backgroundColor: 'red',
            transform: 'scale(120%)',
            easing: 'linear',
            offset: 0.05,
          },
          {
            top: `${cellY}px`,
            transform: 'scale(110%) rotate(0deg)',
            easing: 'ease-in',
            offset: 0.1,
          },
          {
            top: `${windowHeight - cellHeight}px`,
            transform: 'scale(110%) rotate(720deg)',
            offset: 0.9,
          },
          {
            backgroundColor: 'red',
            top: `${windowHeight - cellHeight}px`,
            transform: 'scale(110%)',
            offset: 1,
          },
        ],
        {
          delay: delay,
          duration: 1000,
          fill: 'forwards',
        }
      );
      animatedCell.animate(
        [
          {
            backgroundColor: 'red',
            top: `${windowHeight - cellHeight}px`,
            transform: 'scale(110%)',
            easing: 'ease-out',
          },
          {
            top: `${cellHeight + (windowHeight - cellHeight) / 2}px`,
            transform: 'scale(110%)',
            offset: 0.5,
            easing: 'ease-in',
          },
          {
            top: `${windowHeight}px`,
            transform: 'scale(110%)',
            offset: 1,
          },
        ],
        {
          delay: delay + 1000,
          duration: 1000,
          fill: 'forwards',
        }
      );
      animatedCell.animate(
        [
          {
            left: `${cellX}px`,
            transform: 'rotate(0deg)',
          },
          {
            left: `${cellX + horizontalBounce}px`,
            transform: 'rotate(720deg)',
          },
        ],
        {
          delay: delay + 1000,
          duration: 1000,
          fill: 'forwards',
        }
      );
    } else {
      animatedCell.animate(
        [
          { transform: 'scale(120%)', easing: 'linear', offset: 0.05 },
          {
            left: `${cellX}px`,
            transform: 'scale(110%)',
            easing: 'ease-in',
            offset: 0.1,
          },
          {
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            transform: 'scale(110%)',
            offset: 0.9,
          },
          { transform: 'scale(120%)', easing: 'linear', offset: 0.95 },
          {
            transform: 'scale(10%)',
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            easing: 'linear',
          },
        ],
        {
          delay: delay,
          duration: 2000,
          fill: 'forwards',
        }
      );
      animatedCell.animate(
        [
          {
            top: `${cellY}px`,
            easing: 'ease-out',
            offset: 0.1,
          },
          {
            top: `${scoreY + (scoreHeight - cellHeight) / 2}px`,
            offset: 0.9,
          },
          {
            top: `${scoreY + (scoreHeight - cellHeight) / 2}px`,
          },
        ],
        {
          delay: delay,
          duration: 2000,
          fill: 'forwards',
        }
      );
    }
    setTimeout(() => {
      animatedCell.remove();
      animatedScore += letter.score;
      playerScore.innerText = '' + animatedScore;
    }, 2000 + delay);
    delay += 500;
  }
  return wait(1500 + delay);
}

/**
 * Promisify setTimeout so it can be used in a .then statement
 * @param {number} time Time in milliseconds
 * @returns Promise that resolves in `time`
 */
function wait(time) {
  return new Promise((resolve) => {
    setTimeout(resolve.bind(null), time);
  });
}

/**
 * Sets the variable currentCell to the cell the user clicked in
 * @param {Event} event Mouse click or screen touch event
 */
function cellClicked(event) {
  console.log('Hello from cellClicked.');
  let cell = event.target;
  while (!cell.classList.contains('cursorPointer')) {
    cell = cell.parentElement;
  }
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  let acrossWord = getAcrossWordController();
  // const index = row * getColumnsController() + col;
  // console.log(cell.cellIndex);
  // console.log(cell.parentElement.rowIndex);
  // console.log(event);

  if (cell.className === 'black') {
    return;
  }
  // TODO: uncomment below if clearing all letters from previous selection is desired
  // if (!getIdxArrayController().includes(index)) {
  //   clearLetters();
  // }
  if (currentCell && currentCell === cell) {
    // clearLetters();
    acrossWord = !acrossWord;
    setAcrossWordController(acrossWord);
  }
  setIdxArrayController([]);
  currentCell = cell;
  const direction = acrossWord ? 'across' : 'down';
  selectBlock(direction, cell);
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
  const game = getCurrentGameController();
  const columns = getColumnsController();
  const cellIndex = game.clueNumIndices[clueNumberText];
  const row = Math.floor(cellIndex / columns);
  const col = cellIndex - row * columns;
  const cell = puzTable.firstChild.children[row].children[col];
  currentCell = cell;
  let elem = event.target;
  while (elem.id === '') elem = elem.parentElement;
  setAcrossWordController(elem.id.includes('across'));
  selectBlock(direction, cell);
}

/**
 * Update scores in the scoreboard.
 * @param {object} game Current game object
 */
function updateScoreboard(game) {
  console.log('Hello from updateScoreboard.');
  const me =
    getCurrentUserController().uid === game.initiator.uid
      ? 'initiator'
      : 'opponent';
  const they = me === 'initiator' ? 'opponent' : 'initiator';
  myScore.innerText = game[me].score;
  oppScore.innerText = game[they].score;
  myName.classList.add(game[me].bgColor.replace('bg', 'font'));
  oppName.classList.add(game[they].bgColor.replace('bg', 'font'));
  if (game.nextTurn === game[me].uid) {
    scores.children[0].classList.remove('bgColorTransWhite');
    scores.children[0].classList.add('bgColorTransGold');
    scores.children[2].classList.remove('bgColorTransGold');
    scores.children[2].classList.add('bgColorTransWhite');
  } else {
    scores.children[0].classList.remove('bgColorTransGold');
    scores.children[0].classList.add('bgColorTransWhite');
    scores.children[2].classList.remove('bgColorTransWhite');
    scores.children[2].classList.add('bgColorTransGold');
  }
}

/**
 * Removes letter (if present) from current cell and moves
 * backward one space
 */
function undoEntry() {
  console.log('Hello from undoEntry.');
  const columns = getColumnsController();
  const game = getCurrentGameController();
  if (currentCell) {
    let row = currentCell.parentElement.rowIndex;
    let col = currentCell.cellIndex;
    const index = row * columns + col;
    // reverse copy idxArray so we go backwards instead of forwards
    let localIdxArray = [];
    const idxArray = getIdxArrayController();
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
  return Math.floor(puzTableWidth / getColumnsController());
}

/** Clears letters when user changes to a different clue */
function clearLetters() {
  console.log('Hello from clearLetters.');
  const idxArray = getIdxArrayController();
  const game = getCurrentGameController();
  const columns = getColumnsController();
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
 * Highlights a clue and location in puzzle based on which cell
 * the user clicks
 * @param {string} direction 'across' or 'down'
 * @param {Object} cell Cell the user clicked
 */
function selectBlock(direction, cell) {
  const game = getCurrentGameController();
  const columns = getColumnsController();
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  const rowOffset = row * columns;
  const index = row * columns + col;

  clearHighlights();
  const idxArray = getWordBlock(cell, direction);
  setIdxArrayController(idxArray);
  const clue = document.getElementById(
    direction + game.puzzle.grid[idxArray[0]].clueNum
  );
  clue.classList.add('rangeHighlight', 'cluePop');
  const clueList = direction === 'across' ? acrossClues : downClues;
  clueList.scrollBy({
    top: clue.offsetTop - 100 - clueList.scrollTop,
    left: 0,
    behavior: 'smooth',
  });
  singleClue.innerText = clue.children[1].textContent;

  const begin = direction === 'across' ? 'Left' : 'Top';
  const end = direction === 'across' ? 'Right' : 'Bottom';
  const sideA = direction === 'across' ? 'Top' : 'Left';
  const sideB = direction === 'across' ? 'Bottom' : 'Right';
  for (let idx = 0; idx < idxArray.length; idx++) {
    const idxRow = Math.floor(idxArray[idx] / columns);
    const idxCol = idxArray[idx] - idxRow * columns;
    const currentCell = puzTable.firstChild.children[idxRow].children[idxCol];
    currentCell.classList.add(
      currentCell === cell ? 'currCellHighlight' : 'rangeHighlight'
    );
    if (idx === 0) currentCell.classList.add(`border2px${begin}`);
    currentCell.classList.add(`border2px${sideA}`, `border2px${sideB}`);
    if (idx === idxArray.length - 1)
      currentCell.classList.add(`border2px${end}`);
  }
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
  const game = getCurrentGameController();
  const columns = getColumnsController();
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
  replayButton.classList.remove('displayNone');
  replayButton.addEventListener('click', replayOpponent);
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
  const currentUser = getCurrentUserController();
  const game = getCurrentGameController();
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
  startNewGameController({
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
  const idxArray = getIdxArrayController();
  const game = getCurrentGameController();
  const columns = getColumnsController();
  if (!kbContainer.classList.contains('displayNone')) {
    if (event.keyCode === 13) {
      playWordController();
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
      enterLetterController(letter.toUpperCase(), index);
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
 * Abandon the game immediately, adding all remaining
 * points to opponent's score
 */
concessionBtn.addEventListener('click', () => {
  toggleDrawer();
  concessionBtnContainer.classList.add('displayNone');
  abandonCurrentGameController();
});

/** Resizes puzzle based on available space */
function resizePuzzle() {
  if (puzTable.children.length === 0) return;
  // console.log(puzTable.children[0]);
  const cellDim = getCellDim();
  const tableDim = cellDim * getColumnsController();
  const rowArray = puzTable.children[0].children;

  const cells = puzTable.getElementsByTagName('td');

  for (const row of rowArray) {
    row.style.width = tableDim + 'px';
    const cellArray = row.children;
    for (const cell of cellArray) {
      cell.style.width = cellDim + 'px';
      cell.style.height = cellDim + 'px';
      // The only svg that could be in the cell is a circle, so this
      // Tests for a circle and resizes it
      const svgElements = cell.getElementsByTagName('svg');
      if (svgElements.length === 1) {
        const halfCell = cellDim / 2;
        const radius = halfCell - 1.5;
        let svgHtml = `<svg class='posAbsolute upperLeft'>
        <path d='M ${halfCell} ${halfCell}'/>
        <circle cx='${halfCell}' cy='${halfCell}' r='${radius}' stroke='black' fill='transparent'/>
        </svg>`;
        const clueNumbers = cell.getElementsByClassName('clueNumber');
        if (clueNumbers.length === 1) {
          // dimA = (halfCell) * (1 - Math.cos((2 * Math.PI) / 24)) + 1.5; // 30 deg each direction
          // dimB = (halfCell) * (1 - Math.sin((2 * Math.PI) / 24)) + 1.5; // from 135deg
          let dimA = radius * 0.03407 + 1.5;
          let dimB = radius * 0.74118 + 1.5;
          svgHtml = `<svg height='${cellDim}' width='${cellDim}' class='posAbsolute upperLeft'>
          <path d='M ${dimA} ${dimB}
          A ${radius} ${radius} 0 1 0 ${halfCell} 1.5'
          stroke='black' fill='transparent'/>
          </svg>`;
        }
        cell.removeChild(svgElements[0]);
        cell.innerHTML += svgHtml;
      }
    }
  }
  if (currentCell) {
    const direction = getAcrossWordController() ? 'across' : 'down';
    selectBlock(direction, currentCell);
  }
}

document.addEventListener('keyup', enterLetter);
window.addEventListener('resize', resizePuzzle);
const keyList = kbContainer.getElementsByClassName('kbButton');
for (const node of keyList) {
  node.addEventListener('click', enterLetter);
}
document.getElementById('enter').addEventListener('click', playWordController);
document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

export {
  authChangeView,
  signedOutView,
  showPuzzleView,
  loadGamesView,
  animateScoringView,
};
