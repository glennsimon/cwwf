import {
  startNewGameController,
  populateAllUsersController,
  fetchPuzzleController,
  playWordController,
  enterLetterController,
  abandonCurrentGameController,
  populateFriendsController,
} from './puzzleC.js';
import { route } from '../../router.js';
import { toggleDrawer } from '../common/shared.js';
import { currentUser } from '../signin/signinC.js';
import { currentOpp } from '../games/gamesC.js';
import scoresHtml from './scores.html';
import activityHtml from '../common/activity.html';

//#region HTML element constants
const puzTable = document.getElementById('puzTable');
const puzAuthor = document.getElementById('puzAuthor');
const puzCopy = document.getElementById('puzCopy');
const puzNotepad = document.getElementById('puzNotepad');
const clueContainer = document.getElementById('clueContainer');
const acrossClues = document.getElementById('acrossClues');
const downClues = document.getElementById('downClues');
const singleClue = document.getElementById('singleClue');
const kbContainer = document.getElementById('kbContainer');
const puzTitle = document.getElementById('puzTitle');
const abandonDialog = document.getElementById('abandonDialog');
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
//#endregion

let currentCell = null;
// let currentOpponent = null;
// let allUsers = null;

// returnToSignin.addEventListener('click', () => route('/signin'));

/** Removes puzzle from DOM */
function clearPuzzle() {
  console.log('Hello from clearPuzzle.');
  puzTitle.innerText = 'Puzzle info will appear here';
  // clear out old puzzle and clues
  const svgGrid = document.getElementById('svgGrid');
  if (svgGrid) svgGrid.remove();
  puzTable.innerHTML = '';
  puzAuthor.innerText = '';
  puzNotepad.classList.add('displayNone');
  puzCopy.innerHTML = '';
  clueContainer.classList.add('displayNone');
  acrossClues.innerHTML = '';
  downClues.innerHTML = '';
  singleClue.innerText = 'Select in the puzzle to reveal clue';
  currentCell = null;
}

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', () => route('/signin'));

/**
 * This function takes the puzzle object returned from the fetch and displays
 * a grid and clues. The HTML table element is a placeholder and the rows and
 * cells are created on the fly. The fetched puzzle is stored as an object in
 * the variable "game".
 * @param {object} game current game object
 * @param {object} opponent current opponent user object
 */
function showPuzzleView(game, opponent) {
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
  let gridIndex = 0;
  // below won't work - puzTable is empty.
  const puzWidth = puzTable.offsetWidth;
  for (let rowIndex = 0; rowIndex < game.puzzle.rows; rowIndex += 1) {
    const row = puzTable.insertRow(rowIndex);
    row.style.width = `${puzWidth}px`;
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
        cell.classList.add('cursorPointer', 'transparent');
        const squareDiv = document.createElement('div');
        const letterDiv = document.createElement('div');
        squareDiv.classList.add('square');
        letterDiv.classList.add('marginAuto');
        if (squareData.status === 'locked') {
          cell.classList.remove('transparent');
          cell.classList.add(squareData.bgColor);
        }
        const guess = squareData.guessArray
          ? squareData.guessArray[squareData.guessArray.length - 1]
          : '';
        letterDiv.innerText = guess;
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
          let svgHtml = `\
<svg class='posAbsolute upperLeft'>
  <path d='M ${halfCell} ${halfCell}'/>
  <circle cx='${halfCell}' cy='${halfCell}' r='${radius}' stroke='black'
    fill='transparent' stroke-width='0.5'/>
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
    stroke='black' fill='transparent' stroke-width='0.5'/>
</svg>`;
          }
          cell.innerHTML += svgHtml;
        }
      }
      gridIndex += 1;
    }
  }
  const puzHeight = puzTable.offsetHeight;
  puzTable.appendChild(generateGridElement(puzWidth, puzHeight));
  setCurrentGameController(game);

  kbContainer.classList.remove('displayNone');
  kbContainer.classList.add('displayFlex');
  clueContainer.classList.remove('displayNone');
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

  document.querySelector('.scores').innerHTML = scoresHtml;
  const oppUid = currentOpp.uid;
  const myUid = currentUser.uid;
  let myNickname =
    currentUser.prefHandle || currentUser.prefName || currentUser.displayName;
  let oppNickname =
    opponent.prefHandle || opponent.prefName || opponent.displayName;

  myNickname = myNickname ? myNickname.split(' ')[0] : 'NoName';
  myNickname = myNickname.length > 8 ? myNickname.slice(0, 8) : myNickname;
  myName.innerText = myNickname;
  oppNickname = oppNickname ? oppNickname.split(' ')[0] : 'NoName';
  oppNickname = oppNickname.length > 8 ? oppNickname.slice(0, 8) : oppNickname;
  oppName.innerText = oppNickname;
  if (game.emptySquares === 0) {
    let result = 'YOU WON!!';
    if (game.players[myUid].score < game.players[oppUid].score) {
      result = 'You lost';
    } else if (game.players[myUid].score === game.players[oppUid].score) {
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
  document.querySelector('.activity__header').innerHTML = '';
  // TODO: should this go here?
  route('/puzzle');
}

/**
 * Generates a div with a SVG grid in it, sized for the puzzle and offset
 * to the correct location.
 * @param {number} puzWidth
 * @param {number} puzHeight
 * @returns HTML grid element that can be appended to puzTable
 */
function generateGridElement(puzWidth, puzHeight) {
  const svgGrid = document.createElement('div');
  svgGrid.id = 'svgGrid';
  svgGrid.style = `translate: 0px -${puzHeight}px;`;
  let innerHTML = `<svg height='${puzHeight}' width='${puzWidth}'>
  <path d='`;

  const columns = getColumnsController();
  const cellWidth = puzWidth / columns;
  const cellHeight = puzHeight / columns;
  for (let i = 0; i <= columns; i++) {
    const lineY = cellHeight * i;
    innerHTML += `M 0 ${lineY} L ${puzWidth} ${lineY} `;
  }
  for (let i = 0; i <= columns; i++) {
    const lineX = cellWidth * i;
    innerHTML += `M ${lineX} 0 L ${lineX} ${puzHeight} `;
  }
  innerHTML += `' stroke='black' fill='transparent' stroke-width='0.5'/>
  </svg>`;
  svgGrid.innerHTML = innerHTML;
  return svgGrid;
}

/**
 * Animate scoring with
 * @param {*} scoreObj
 */
function animateScoringView(scoreObj) {
  console.log('scoreObj: ', scoreObj);
  document.querySelector('.activity__header').innerHTML = '';
  if (scoreObj.newGame || scoreObj.abandoned) return;
  const myUid = currentUser.uid;
  const scoreElem =
    myUid === scoreObj.playerUid ? scores.children[0] : scores.children[2];
  const playerScore = scoreElem.children[1];
  let animatedScore = parseInt(playerScore.textContent);
  let delay = 0;
  let zIndex = 99;
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
    animatedCell.style.zIndex = (zIndex--).toString();
    // animatedCell.style.backgroundColor = letter.bgColor;
    animatedCell.classList = `displayFlex posFixed flexDirCol spaceAround animatedCell`;
    const square = document.createElement('div');
    square.classList = 'square';
    const letterBox = document.createElement('div');
    letterBox.classList = 'marginAuto';
    const letterContent = letter.guess || letter.correctLetter;
    cell.children[0].children[0].innerText = letterContent;
    letterBox.innerText = letterContent;
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
      animatedCell.animate(
        [
          { backgroundColor: 'white' },
          {
            transform: 'scale(130%)',
            easing: 'linear',
            offset: 0.05,
            backgroundColor: 'white',
          },
          {
            top: `${cellY}px`,
            transform: 'scale(110%) rotate(0deg)',
            easing: 'ease-in',
            offset: 0.1,
            backgroundColor: 'red',
          },
          {
            top: `${windowHeight - cellHeight}px`,
            transform: 'scale(110%) rotate(720deg)',
            offset: 0.9,
          },
          {
            top: `${windowHeight - cellHeight}px`,
            transform: 'scale(110%)',
            offset: 1,
            backgroundColor: 'red',
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
            backgroundColor: 'red',
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
      if (!cell.classList.value.match(/(blue|red)/i)) {
        cell.style.backgroundColor = letter.bgColor;
      }
      animatedCell.animate(
        [
          { backgroundColor: 'white' },
          {
            transform: 'scale(130%)',
            easing: 'linear',
            offset: 0.05,
            backgroundColor: 'white',
          },
          {
            left: `${cellX}px`,
            transform: 'scale(110%)',
            easing: 'ease-in',
            offset: 0.1,
            backgroundColor: `${letter.bgColor}`,
          },
          {
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            transform: 'scale(110%)',
            offset: 0.9,
          },
          // { transform: 'scale(130%)', easing: 'linear', offset: 0.95 },
          {
            transform: 'scale(10%)',
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            easing: 'linear',
            backgroundColor: `${letter.bgColor}`,
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
  const myUid = currentUser.uid;
  const oppUid = currentOpp.uid;
  myScore.innerText = game.players[myUid].score;
  oppScore.innerText = game.players[oppUid].score;
  myName.classList.remove('fontRed', 'fontBlue');
  myName.classList.add(game.players[myUid].bgColor.replace(/bgTrans/, 'font'));
  oppName.classList.remove('fontRed', 'fontBlue');
  oppName.classList.add(
    game.players[oppUid].bgColor.replace(/bgTrans/, 'font')
  );
  if (game.nextTurn === myUid) {
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
  const game = getCurrentGameController();
  const columns = game.puzzle.cols;
  if (currentCell) {
    let row = currentCell.parentElement.rowIndex;
    let col = currentCell.cellIndex;
    const index = row * columns + col;
    const idxArray = getIdxArrayController();
    // Reverse copy idxArray so we step through backwards instead of forwards
    let idxArrayRev = [...idxArray].reverse();

    // Move all elements of idxArrayRev up to and including the current index
    // to the end of idxArrayRev (leapfrog)
    const nextCellIndex = idxArrayRev.indexOf(index) + 1;
    idxArrayRev = idxArrayRev
      .slice(nextCellIndex)
      .concat(idxArrayRev.slice(0, nextCellIndex));

    const letterDiv = document.createElement('div');
    letterDiv.appendChild(document.createTextNode(''));
    letterDiv.classList.add('marginAuto');

    // Replace letter div in the current cell with new empty letter div
    currentCell.children[0].replaceChild(
      letterDiv,
      currentCell.children[0].children[0]
    );
    currentCell.classList.remove('currCellHighlight');
    currentCell.classList.add('rangeHighlight');
    for (const idx of idxArrayRev) {
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
  return puzTableWidth / getColumnsController();
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
  // for when clue lists are showing (landscape orientation)
  clue.classList.add('rangeHighlight', 'cluePop');
  const clueList = direction === 'across' ? acrossClues : downClues;
  clueList.scrollBy({
    top: clue.offsetTop - 100 - clueList.scrollTop,
    left: 0,
    behavior: 'smooth',
  });
  // for when only a single clue is showing (portrait orientation)
  singleClue.innerText = clue.children[1].textContent;

  const highlighter = document.createElement('div');
  highlighter.id = 'highlighter';
  highlighter.classList.add('highlightBorder'); //, 'displayFlex');
  const cellDim = getCellDim();
  const clueLength = idxArray.length;
  if (direction === 'across') {
    highlighter.style.width = `${clueLength * cellDim}px`;
    highlighter.style.height = `${cellDim}px`;
  } else {
    highlighter.style.width = `${cellDim}px`;
    highlighter.style.height = `${clueLength * cellDim}px`;
    // highlighter.classList.add('flexDirCol');
  }
  const firstCellRow = Math.floor(idxArray[0] / columns);
  const firstCellCol = idxArray[0] - firstCellRow * columns;
  highlighter.style.translate = `${cellDim * firstCellCol - 2}px -${
    puzTable.offsetHeight - cellDim * firstCellRow + 2
  }px`;

  for (let idx = 0; idx < clueLength; idx++) {
    const idxRow = Math.floor(idxArray[idx] / columns);
    const idxCol = idxArray[idx] - idxRow * columns;
    const currentCell = puzTable.firstChild.children[idxRow].children[idxCol];
    currentCell.classList.remove('transparent');
    currentCell.classList.add(
      currentCell === cell ? 'currCellHighlight' : 'rangeHighlight'
    );
  }
  puzTable.appendChild(highlighter);
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
  const highlighter = document.getElementById('highlighter');
  if (highlighter) highlighter.remove();
  // console.log(puzTable.children[0]);
  const rowArray = puzTable.children[0].children;

  for (const row of rowArray) {
    for (const cell of row.children) {
      if (cell.className !== 'black') {
        cell.classList.remove('rangeHighlight', 'currCellHighlight');
        cell.classList.add('transparent');
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

// /**
//  * Show dialog for user to decide if they want to replay the opponent
//  * @param {Object} game Previous game versus the opponent
//  * @param {string} result Message about who won
//  */
// function showReplayDialog(game, result) {
//   console.log('Hello from showReplayDialog.');
//   winMessage.innerText = result;
//   gameOverHeading.classList.remove('displayNone');
//   friendsChooser.classList.add('displayNone');
//   friendsChooser.classList.remove('displayFlex');
//   dialogList.classList.add('displayNone');
//   gamesDialog.querySelector('footer').classList.add('displayNone');
//   gamesDialog.classList.remove('maxHeight85pct');
//   gamesDialog.children[0].classList.remove('padding0', 'height100pct');
//   replayButton.classList.remove('displayNone');
//   replayButton.addEventListener('click', replayOpponent);
//   if (game.difficulty === 'medium') {
//     radioEasy.removeAttribute('checked');
//     radioHard.removeAttribute('checked');
//     radioMed.setAttribute('checked', true);
//   } else if (game.difficulty === 'hard') {
//     radioEasy.removeAttribute('checked');
//     radioMed.removeAttribute('checked');
//     radioHard.setAttribute('checked', true);
//   } else {
//     radioMed.removeAttribute('checked');
//     radioHard.removeAttribute('checked');
//     radioEasy.setAttribute('checked', true);
//   }
//   if (!gamesDialog.open) gamesDialog.showModal();
// }

// /** Load game based on user selection */
// function replayOpponent() {
//   const game = getCurrentGameController();
//   let difficulty = radioMed.parentElement.classList.contains('is-checked')
//     ? 'medium'
//     : 'easy';
//   difficulty = radioHard.parentElement.classList.contains('is-checked')
//     ? 'hard'
//     : difficulty;
//   closeGamesDialog();
//   headerSpinner.classList.add('is-active');
//   headerMessage.innerText = 'Getting new game...';
//   // load puzzle based on uids of players
//   const startGameParameters = {};
//   startGameParameters.difficulty = difficulty;
//   startGameParameters.players = game.players;
//   startNewGameController(startGameParameters);
// }

// /**
//  * Shows an error dialog with appropriate messaging
//  * @param {string} message Type of error
//  */
// function showErrorDialogView(message) {
//   headerMessage.innerText = '';
//   headerSpinner.classList.remove('is-active');
//   errorMessage.innerText = message;
//   okButton.addEventListener('click', () => {
//     errorDialog.close();
//   });
//   errorDialog.querySelector('.close').addEventListener('click', () => {
//     errorDialog.close();
//   });
//   errorDialog.showModal();
// }

/**
 * Open the abandonDialog, giving the user one more chance
 * to decide if they want to abandon the game.
 */
concessionBtn.addEventListener('click', () => {
  toggleDrawer();
  abandonDialog.showModal();
  abandonDialog.querySelector('.close').addEventListener('click', () => {
    abandonDialog.close();
  });
  yesButton.addEventListener('click', () => {
    document.querySelector('.activity__header').innerHTML = activityHtml;
    document.querySelector('activity__message').innerText = 'Working on it...';
    concessionBtnContainer.classList.add('displayNone');
    abandonCurrentGameController();
    abandonDialog.close();
  });
  noButton.addEventListener('click', () => {
    abandonDialog.close();
  });
});

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
      document.querySelector('.activity__header').innerHTML = activityHtml;
      document.querySelector('activity__message').innerText = 'Working...';
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

/** Resizes puzzle based on available space */
function resizePuzzle() {
  console.log('Hello from resizePuzzle.');
  if (puzTable.children.length === 0) return;
  // console.log(puzTable.children[0]);
  const cellDim = getCellDim();
  const puzWidth = puzTable.offsetWidth;

  const cells = puzTable.getElementsByTagName('td');

  for (const cell of cells) {
    cell.style.width = cellDim + 'px';
    cell.style.height = cellDim + 'px';
    // The only svg that could be in the cell is a circle, so this
    // Tests for a circle and resizes it
    const svgElements = cell.getElementsByTagName('svg');
    if (svgElements.length === 1) {
      const halfCell = cellDim / 2;
      const radius = halfCell - 1.5;
      let svgHtml = `<svg height='${cellDim}' width='${cellDim}' class='posAbsolute upperLeft'>
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
  const puzHeight = puzTable.offsetHeight;
  document.getElementById('svgGrid').remove();
  puzTable.appendChild(generateGridElement(puzWidth, puzHeight));
  if (currentCell) {
    const direction = getAcrossWordController() ? 'across' : 'down';
    selectBlock(direction, currentCell);
  }
}

// document.addEventListener('keyup', enterLetter);
// window.addEventListener('resize', resizePuzzle);
// const keyList = kbContainer.getElementsByClassName('kbButton');
// for (const node of keyList) {
//   node.addEventListener('click', enterLetter);
// }
// document.getElementById('enter').addEventListener('click', () => {
//   headerSpinner.classList.add('is-active');
//   headerMessage.innerText = 'Working...';
//   playWordController();
// });
// document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);

export { showPuzzleView, animateScoringView, clearPuzzle };
