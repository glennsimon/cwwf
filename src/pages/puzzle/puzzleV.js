import {
  playWord,
  enterGuess,
  columns,
  currentGame,
  savePuzzle,
  checkReadiness,
  myGuesses,
  currentGameId,
} from './puzzleC.js';
import { currentUser } from '../signin/signinC.js';
import { currentOpp } from '../puzzle/puzzleC.js';
import scoresHtml from '../../pageFrags/scores/scores.html';
import { cleanShell, closeDrawer, hideActivity } from '../../shellV.js';
import puzzleInfoHtml from '../../pageFrags/puzzleInfo/puzzleInfo.html';
import concedeHtml from '../../pageFrags/concede/concede.html';
import { showActivity } from '../../pageFrags/activity/activity.js';
import puzzleHtml from './puzzle.html';
import keyFragHtml from './keyFrag.html';
import './puzzle.css';
import '../../pageFrags/scores/scores.css';
import {
  showConcedeDialog,
  showReplayDialog,
} from '../../pageFrags/dialogs/dialogsV.js';
import { constants } from '../../constants.js';

let currentCell = null;
let idxArray = [];
let acrossWord = true;
let turnInProgress = false;

let highlighter = document.createElement('div');
highlighter.className = 'puzzle__highlighter';

/** Removes puzzle and clues from DOM */
function clearPuzzle() {
  console.log('Hello from clearPuzzle.');
  // clear out old puzzle and clues
  const svgGrid = document.querySelector('.grid__svg');
  if (svgGrid) svgGrid.remove();
  document.querySelector('.drawer__content').innerHTML = '';
  document.querySelector('.clues--across').innerHTML = '';
  document.querySelector('.clues--down').innerHTML = '';
  currentCell = null;
}

/**
 * Loads drawer info data for current puzzle
 */
function loadPuzzleInfo() {
  document.querySelector('.drawer__content').innerHTML = puzzleInfoHtml;
  document.querySelector('.puzzle__title').innerText = currentGame.puzzle.title
    ? currentGame.puzzle.title
    : 'Untitled';
  document.querySelector('.puzzle__author').innerText = `by ${
    currentGame.puzzle.author ? currentGame.puzzle.author : 'Anonymous'
  }`;
  document.querySelector('.puzzle__copyright').innerHTML = currentGame.puzzle
    .copyright
    ? `&copy; ${currentGame.puzzle.copyright}`
    : '';
  if (currentGame.puzzle.notepad) {
    document.querySelector(
      '.puzzle__notepad'
    ).innerHTML = `<b>Notepad:</b>${currentGame.puzzle.notepad}`;
  }
}

/**
 * This function displays the grid and clues for the current game.
 */
function showPuzzle() {
  console.log('Hello from showPuzzleView.');
  cleanShell();
  let puzzleGrid = document.querySelector('.table__puzzle');
  // if not currently playing a game, load puzzle HTML and initialize
  if (!puzzleGrid) {
    document.querySelector('.container__app').innerHTML = puzzleHtml;
    buildKeyboard();
    puzzleGrid = document.querySelector('.table__puzzle');
    document.addEventListener('keyup', directKeyAction);
    window.addEventListener('resize', showPuzzle);
    let keyList = document.querySelectorAll('.button__keyboard');
    for (const target of keyList) {
      target.addEventListener('click', directKeyAction);
    }
  } else {
    puzzleGrid.innerHTML = '';
  }
  document.querySelector('.scores').innerHTML = scoresHtml;
  document.querySelector('.drawer__content').innerHTML = puzzleInfoHtml;
  loadPuzzleInfo(currentGame);

  const cellDim = getCellDim();
  let gridIndex = 0;
  const puzWidth = puzzleGrid.offsetWidth;
  for (let rowIndex = 0; rowIndex < currentGame.puzzle.rows; rowIndex += 1) {
    const row = puzzleGrid.insertRow(rowIndex);
    row.style.width = `${puzWidth}px`;
    for (let colIndex = 0; colIndex < currentGame.puzzle.cols; colIndex += 1) {
      const squareData = currentGame.puzzle.grid[gridIndex];
      const clueNumber = squareData.clueNum;
      const cell = row.insertCell(colIndex);
      const blackCell = squareData.black;

      cell.style.width = `${cellDim}px`;
      cell.style.height = `${cellDim}px`;
      cell.addEventListener('click', cellClicked);
      if (blackCell) {
        cell.className = 'black';
      } else {
        cell.classList.add('cell__puzzle', 'transparent');
        const squareDiv = document.createElement('div');
        const letterDiv = document.createElement('div');
        squareDiv.classList.add('square');
        letterDiv.classList.add('puzzle__letter');
        if (squareData.status === 'locked') {
          cell.classList.remove('transparent');
          let bgColor = squareData.bgColor;
          if (bgColor === 'bgTransRed') bgColor = 'bg-color__red--translucent';
          if (bgColor === 'bgTransBlue')
            bgColor = 'bg-color__blue--translucent';
          cell.classList.add(bgColor);
          letterDiv.innerText = squareData.value;
        } else if (squareData.guessArray) {
          const guess = squareData.guessArray
            ? squareData.guessArray[squareData.guessArray.length - 1]
            : '';
          letterDiv.innerText = guess;
        } else if (myGuesses[gridIndex]) {
          letterDiv.innerText = myGuesses[gridIndex];
          letterDiv.classList.add('color__dark-gray');
        }
        squareDiv.appendChild(letterDiv);
        cell.appendChild(squareDiv);
        if (clueNumber !== '') {
          const clueNumDiv = document.createElement('div');
          clueNumDiv.classList.add('clue-number');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          cell.appendChild(clueNumDiv);
        }
        if (squareData.circle) {
          cell.innerHTML += circleHtml(cellDim, squareData.clueNum);
        }
      }
      gridIndex += 1;
    }
  }
  const puzHeight = puzzleGrid.offsetHeight;
  puzzleGrid.appendChild(generateGridElement(puzWidth, puzHeight));

  loadClues('across');
  loadClues('down');

  document.querySelector('.scores').innerHTML = scoresHtml;
  const oppUid = currentOpp.uid;
  const myUid = currentUser.uid;
  let myNickname =
    currentUser.prefHandle || currentUser.prefName || currentUser.displayName;
  let oppNickname =
    currentOpp.prefHandle || currentOpp.prefName || currentOpp.displayName;

  myNickname = myNickname ? myNickname.split(' ')[0] : 'NoName';
  myNickname = myNickname.length > 8 ? myNickname.slice(0, 8) : myNickname;
  document.querySelector('.name--me').innerText = myNickname;
  oppNickname = oppNickname ? oppNickname.split(' ')[0] : 'NoName';
  oppNickname = oppNickname.length > 8 ? oppNickname.slice(0, 8) : oppNickname;
  document.querySelector('.name--opponent').innerText = oppNickname;
  if (currentGame.emptySquares === 0) {
    let result = 'YOU WON!!';
    if (currentGame.players[myUid].score < currentGame.players[oppUid].score) {
      result = 'You lost';
    } else if (
      currentGame.players[myUid].score === currentGame.players[oppUid].score
    ) {
      result = 'Tie game!';
    }
    if (!currentGame.hideReplay) {
      showReplayDialog(currentGame, result);
      savePuzzle({ hideReplay: true });
    }
    document.querySelector('.drawer__concede').innerHTML = '';
  } else {
    document.querySelector('.drawer__concede').innerHTML = concedeHtml;
    addConcedeHtml();
  }
  updateScoreboard(currentGame);
  console.log(currentGame);
  hideActivity();
  document
    .querySelector('.button__keyboard--enter')
    .classList.remove('button--disabled');
}

function buildKeyboard() {
  const coverageScoring =
    currentGame.scoring === 'coverage-scoring' ? true : false;
  const containerKeyboard = document.querySelector('.container__keyboard');
  for (const row of constants.KEYBOARD) {
    const keyboardRow = document.createElement('div');
    keyboardRow.className = 'keyboard__row';
    for (const key of row) {
      const isLetter = key !== 'ENTER' && key !== 'BACKSPACE';
      const keyButton = document.createElement('div');
      const keyboardKey = document.createElement('div');
      keyboardKey.className = 'keyboard__key';
      if (isLetter) {
        keyButton.className = 'button__keyboard button__keyboard--letter';
        keyboardKey.innerText = key;
        if (!coverageScoring) {
          const subscript = document.createElement('div');
          subscript.className = 'subscript';
          subscript.innerText = constants.SCORE_VALUES[key];
          keyboardKey.appendChild(subscript);
        }
      } else if (key === 'ENTER') {
        keyButton.className = 'button__keyboard button__keyboard--enter';
        keyboardKey.innerText = 'ENTER';
      } else {
        keyButton.className = 'button__keyboard button__keyboard--backspace';
        const backspaceElement = document.createElement('i');
        backspaceElement.className = 'material-icons';
        backspaceElement.innerText = 'backspace';
        keyboardKey.appendChild(backspaceElement);
      }
      keyButton.appendChild(keyboardKey);
      keyboardRow.appendChild(keyButton);
    }
    containerKeyboard.appendChild(keyboardRow);
  }
}

/**
 * Take action based on virtual or physical keyboard
 * @param {event} event Either a keyboard event or a click event
 * @returns void
 */
async function directKeyAction(event) {
  if (!document.querySelector('.table__puzzle')) return;
  let target = event.target;
  if (event.type === 'click') {
    while (!target.classList.contains('button__keyboard')) {
      target = target.parentNode;
      if (target.classList.contains('container__keyboard')) return;
    }
  }
  if (
    event.key === 'Enter' ||
    target.classList.contains('button__keyboard--enter')
  ) {
    if (turnInProgress) return;
    if (checkReadiness()) {
      turnInProgress = true;
      showActivity('.header__activity', 'Working...');
      turnInProgress = await playWord().then(() => {
        return false;
      });
    }
    return;
  }
  if (
    event.key === 'Backspace' ||
    target.classList.contains('button__keyboard--backspace')
  ) {
    undoEntry();
    return;
  }
  let letter = event.key;
  if (event.type === 'keyup' && !letter.match(/^[a-zA-Z]$/)) {
    return;
  }
  if (event.type === 'click') {
    letter = target.querySelector('.keyboard__key').innerText.trim();
    letter = letter.slice(0, 1);
    if (!letter.match(/^[a-zA-Z]$/)) return;
  }
  enterLetter(letter);
}

/**
 * Loads clues into direction-specific list for larger displays
 * @param {string} direction 'across' or 'down'
 */
function loadClues(direction) {
  const clueSelector =
    direction === 'across' ? '.clues--across' : '.clues--down';
  const clues = document.querySelector(clueSelector);
  clues.innerHTML = '';
  for (const clue of currentGame.puzzle.clues[direction]) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0]);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('clue');
    clueDiv.id = direction + clueNumber;
    if (currentGame.puzzle.completedClues[direction].includes(clueNumber)) {
      clueDiv.classList.add('color__dark-gray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padding__right--5px', 'cursor--pointer');

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
    // textDiv.classList.add('cursor--pointer');
    clueDiv.appendChild(numDiv);
    clueDiv.appendChild(textDiv);
    clues.appendChild(clueDiv);
    clues.addEventListener('click', (event) => {
      if (event.target.innerText !== '') {
        clueClicked(event, direction);
      }
    });
  }
}

/**
 * Create and return SVG HTML for cells with circles
 * @param {Number} cellDim Size of cell width and height in px
 * @param {Number} clueNum Clue number if clue number is in cell, or null
 * @returns HTML for circle
 */
function circleHtml(cellDim, clueNum) {
  const halfCell = cellDim / 2;
  const radius = halfCell - 1.5;
  let svgHtml = `<svg height='${cellDim}' width='${cellDim}' class='circle'>
  <path d='M ${halfCell} ${halfCell}'/>
  <circle cx='${halfCell}' cy='${halfCell}' r='${radius}' stroke='black'
    fill='transparent' stroke-width='0.5'/>
</svg>`;
  if (clueNum) {
    // dimA and dimB values below are for 105 degree start point
    // dimA = (halfCell) * (1 - Math.cos((2 * Math.PI) / 24)) + 1.5;
    // dimB = (halfCell) * (1 - Math.sin((2 * Math.PI) / 24)) + 1.5;
    let dimA = radius * 0.03407 + 1.5;
    let dimB = radius * 0.74118 + 1.5;
    svgHtml = `<svg height='${cellDim}' width='${cellDim}' class='circle'>
  <path d='M ${dimA} ${dimB} A ${radius} ${radius} 0 1 0 ${halfCell} 1.5'
    stroke='black' fill='transparent' stroke-width='0.5'/>
</svg>`;
  }
  return svgHtml;
}

/**
 * Adds concede button to drawer with click listener
 */
function addConcedeHtml() {
  document.querySelector('.drawer__concede').innerHTML = concedeHtml;
  // Give the user one more chance to decide if they want to abandon the game.
  document.querySelector('.button__concede').addEventListener('click', () => {
    showConcedeDialog();
    closeDrawer();
  });
}

/**
 * Generates a div with a SVG grid in it, sized for the puzzle and offset
 * to the correct location.
 * @param {number} puzWidth
 * @param {number} puzHeight
 * @returns HTML grid element that can be appended to puzzleGrid
 */
function generateGridElement(puzWidth, puzHeight) {
  let svgGrid = document.querySelector('.grid__svg');
  if (svgGrid) svgGrid.remove();
  svgGrid = document.createElement('div');
  svgGrid.className = 'grid__svg';
  svgGrid.style = `translate: 0px -${puzHeight}px;`;
  let innerHTML = `<svg height='${puzHeight}' width='${puzWidth}'>
  <path d='`;

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
  hideActivity();
  const puzzleGrid = document.querySelector('.table__puzzle');
  if (scoreObj.newGame || scoreObj.abandoned) return;
  const scores = document.querySelector('.scores');
  const myUid = currentUser.uid;
  const scoreElem =
    myUid === scoreObj.playerUid ? scores.children[0] : scores.children[2];
  const playerScore = scoreElem.children[1];
  let animatedScore = parseInt(playerScore.textContent);
  let delay = 0;
  let zIndex = 99;
  for (const letter of scoreObj.checkAnswerResult) {
    const index = letter.index;
    const row = Math.floor(index / columns);
    const col = index - row * columns;
    const cell = puzzleGrid.firstChild.children[row].children[col];
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
    animatedCell.className = 'puzzle--animated-cell';
    const square = document.createElement('div');
    square.className = 'square';
    const letterBox = document.createElement('div');
    letterBox.classList = 'margin--auto';
    const letterContent = letter.guess || letter.correctLetter;
    cell.children[0].children[0].innerText = letterContent;
    letterBox.innerText = letterContent;
    square.appendChild(letterBox);
    animatedCell.appendChild(square);
    const clueNum = document.createElement('div');
    clueNum.classList = 'clue-number';
    clueNum.innerText = cell.children[1] ? cell.children[1].textContent : '';
    animatedCell.appendChild(clueNum);
    document.querySelector('.cell__animator').appendChild(animatedCell);

    let animateBgColor = letter.bgColor.match(/blue/i)
      ? 'rgba(0,0,255,0.5)'
      : 'rgba(255,0,0,0.5)';

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
        cell.classList.remove('transparent');
        cell.classList.add(letter.bgColor);
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
            backgroundColor: `${animateBgColor}`,
          },
          {
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            transform: 'scale(110%)',
            offset: 0.9,
          },
          {
            transform: 'scale(10%)',
            left: `${scoreX + (scoreWidth - cellWidth) / 2}px`,
            easing: 'linear',
            backgroundColor: `${animateBgColor}`,
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
  while (!cell.classList.contains('cell__puzzle')) {
    cell = cell.parentElement;
  }
  if (cell.className === 'black') {
    return;
  }
  if (currentCell && currentCell === cell) {
    acrossWord = !acrossWord;
  }
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
  let clue = event.target;
  while (!clue.id) {
    clue = clue.parentElement;
  }
  let clueNumberText = clue.children[0].innerText;
  clueNumberText = clueNumberText.slice(0, clueNumberText.indexOf('.'));
  const cellIndex = currentGame.clueNumIndices[clueNumberText];
  const row = Math.floor(cellIndex / columns);
  const col = cellIndex - row * columns;
  const cell = document.querySelector('.table__puzzle tbody').children[row]
    .children[col];
  currentCell = cell;
  acrossWord = clue.id.includes('across');
  selectBlock(direction, cell);
}

/**
 * Update scores in the scoreboard.
 */
function updateScoreboard() {
  console.log('Hello from updateScoreboard.');
  const myUid = currentUser.uid;
  const oppUid = currentOpp.uid;
  document.querySelector('.score--me').innerText =
    currentGame.players[myUid].score;
  document.querySelector('.score--opponent').innerText =
    currentGame.players[oppUid].score;
  // TODO: Below is way more complex than it needs to be. Fix later.
  document
    .querySelector('.name--me')
    .classList.remove('color__red', 'color__blue');
  let fontColor = currentGame.players[myUid].bgColor;
  fontColor = fontColor.match(/blue/i) ? 'color__blue' : 'color__red';
  document.querySelector('.name--me').classList.add(fontColor);
  document
    .querySelector('.name--opponent')
    .classList.remove('color__red', 'color__blue');
  fontColor = currentGame.players[oppUid].bgColor;
  fontColor = fontColor.match(/blue/i) ? 'color__blue' : 'color__red';
  document.querySelector('.name--opponent').classList.add(fontColor);
  const scores = document.querySelector('.scores');
  if (currentGame.nextTurn === myUid) {
    scores.children[0].classList.remove('bg-color__white--translucent');
    scores.children[0].classList.add('bg-color__gold--translucent');
    scores.children[2].classList.remove('bg-color__gold--translucent');
    scores.children[2].classList.add('bg-color__white--translucent');
  } else {
    scores.children[0].classList.remove('bg-color__gold--translucent');
    scores.children[0].classList.add('bg-color__white--translucent');
    scores.children[2].classList.remove('bg-color__white--translucent');
    scores.children[2].classList.add('bg-color__gold--translucent');
  }
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
    letterDiv.classList.add('puzzle__letter');

    // Replace letter div in the current cell with new empty letter div
    currentCell
      .querySelector('.square')
      .replaceChild(letterDiv, currentCell.querySelector('.puzzle__letter'));
    currentCell.classList.remove('puzzle__highlight--cell-current');
    currentCell.classList.add('puzzle__highlight--cell-range');
    for (const idx of idxArrayRev) {
      if (currentGame.puzzle.grid[idx].status !== 'locked') {
        row = Math.floor(idx / columns);
        col = idx - row * columns;
        currentCell =
          document.querySelector('.table__puzzle').children[0].children[row]
            .children[col];
        currentCell.classList.remove('puzzle__highlight--cell-range');
        currentCell.classList.add('puzzle__highlight--cell-current');
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
  const puzzleGridWidth = document.querySelector('.table__puzzle').offsetWidth;
  return puzzleGridWidth / columns;
}

/**
 * Highlights a clue and location in puzzle based on which cell
 * the user clicks
 * @param {string} direction 'across' or 'down'
 * @param {Object} cell Cell the user clicked
 */
function selectBlock(direction, cell) {
  const puzzleGrid = document.querySelector('.table__puzzle');
  clearHighlights();
  idxArray = [];
  // fill idxArray
  getWordBlock(cell, direction);
  const clue = document.getElementById(
    direction + currentGame.puzzle.grid[idxArray[0]].clueNum
  );
  // for when clue lists are showing (landscape orientation)
  clue.classList.add('puzzle__highlight--cell-range', 'puzzle__clue-pop');
  const clueList =
    direction === 'across'
      ? document.querySelector('.clues--across')
      : document.querySelector('.clues--down');
  clueList.scrollBy({
    top: clue.offsetTop - 100 - clueList.scrollTop,
    left: 0,
    behavior: 'smooth',
  });
  // for when only a single clue is showing (portrait orientation)
  document.querySelector('.clue--single').innerHTML =
    clue.children[0].textContent + '&nbsp;' + clue.children[1].innerHTML;

  const cellDim = getCellDim();
  const clueLength = idxArray.length;
  highlighter.style.width =
    direction === 'across' ? `${clueLength * cellDim}px` : `${cellDim}px`;
  highlighter.style.height =
    direction === 'across' ? `${cellDim}px` : `${clueLength * cellDim}px`;
  const firstCellRow = Math.floor(idxArray[0] / columns);
  const firstCellCol = idxArray[0] - firstCellRow * columns;
  highlighter.style.translate = `${cellDim * firstCellCol - 2}px -${
    puzzleGrid.offsetHeight - cellDim * firstCellRow + 2
  }px`;

  for (const index of idxArray) {
    const idxRow = Math.floor(index / columns);
    const idxCol = index - idxRow * columns;
    const currentCell = puzzleGrid.firstChild.children[idxRow].children[idxCol];
    if (currentGame.puzzle.grid[index].status !== 'locked') {
      currentCell.classList.remove('transparent');
      currentCell.classList.add(
        currentCell === cell
          ? 'puzzle__highlight--cell-current'
          : 'puzzle__highlight--cell-range'
      );
    }
  }
  puzzleGrid.appendChild(highlighter);
}

/**
 * Returns an array of indices of cells that make up a word block in
 * the current puzzle.
 * @param {Object} cell Cell in puzzle
 * @return {array} Array of indices that make up a word block
 */
function getWordBlock(cell) {
  console.log('Hello from getWordBlock.');
  const row = cell.parentElement.rowIndex;
  if (row < 0) return;
  const col = cell.cellIndex;
  let index = row * columns + col;
  const lowLimit = acrossWord ? row * columns : columns - 1;
  const highLimit = acrossWord ? (row + 1) * columns : columns ** 2;
  const increment = acrossWord ? 1 : columns;
  const puzzle = currentGame.puzzle;
  while (index > lowLimit && !puzzle.grid[index - increment].black)
    index = index - increment;
  while (index < highLimit && !puzzle.grid[index].black) {
    idxArray.push(index);
    index = index + increment;
  }
}

/** Removes clue cell highlighting from all cells */
function clearHighlights() {
  console.log('Hello from clearHighlights.');
  try {
    highlighter = document
      .querySelector('.table__puzzle')
      .removeChild(highlighter);
  } catch (err) {
    console.log('INFO: highlighter not previously attached.');
  }
  for (const idx of idxArray) {
    const row = Math.floor(idx / columns);
    const column = idx - row * columns;
    const cell = document.querySelector('.table__puzzle tbody').children[row]
      .children[column];
    cell.classList.remove(
      'puzzle__highlight--cell-range',
      'puzzle__highlight--cell-current'
    );
    cell.classList.add('transparent');
  }
  for (const clue of document.querySelector('.clues--across').children) {
    clue.classList.remove('puzzle__highlight--cell-range', 'puzzle__clue-pop');
  }
  for (const clue of document.querySelector('.clues--down').children) {
    clue.classList.remove('puzzle__highlight--cell-range', 'puzzle__clue-pop');
  }
}

/**
 * Adds a letter to the puzzle from physical or virtual keyboard event and
 * moves forward one space
 * @param {string} letter Letter to enter into the grid
 * keyboard
 */
function enterLetter(letter) {
  console.log('Hello from enterLetter.');
  // check if puzzle HTML is loaded
  if (idxArray.length !== 0) {
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

    if (currentGame.puzzle.grid[index].status === 'locked') {
      // alert('Sorry, that square is locked by a previous answer');
      return;
    }
    enterGuess(letter.toUpperCase(), index);
    letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
    letterDiv.classList.add('puzzle__letter');
    currentCell
      .querySelector('.square')
      .replaceChild(letterDiv, currentCell.querySelector('.puzzle__letter'));
    currentCell.classList.remove('puzzle__highlight--cell-current');
    currentCell.classList.add('puzzle__highlight--cell-range');
    for (const idx of localIdxArray) {
      if (currentGame.puzzle.grid[idx].status !== 'locked') {
        row = Math.floor(idx / columns);
        col = idx - row * columns;
        currentCell = document.querySelector('.table__puzzle tbody').children[
          row
        ].children[col];
        currentCell.classList.remove('puzzle__highlight--cell-range');
        currentCell.classList.add('puzzle__highlight--cell-current');
        break;
      }
    }
  }
}

/**
 * Disables the enter key to prevent multiple entries on a single turn
 */
function disableEnter() {
  document
    .querySelector('.button__keyboard--enter')
    .classList.add('button--disabled');
}

export {
  showPuzzle,
  animateScoringView,
  clearPuzzle,
  disableEnter,
  idxArray,
  acrossWord,
};
