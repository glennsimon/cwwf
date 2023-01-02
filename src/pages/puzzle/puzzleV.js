import {
  populateAllUsersController,
  playWordController,
  enterLetterController,
  populateFriendsController,
  columns,
  currentGame,
  savePuzzle,
} from './puzzleC.js';
import { route } from '../../router.js';
import { currentUser } from '../signin/signinC.js';
import { currentOpp } from '../puzzle/puzzleC.js';
import scoresHtml from '../../pageFrags/scores/scores.html';
import { cleanShell, closeDrawer } from '../../shellV.js';
import puzzleInfoHtml from '../../pageFrags/puzzleInfo/puzzleInfo.html';
import concedeHtml from '../../pageFrags/concede/concede.html';
import { showActivity } from '../../pageFrags/activity/activity.js';
import puzzleHtml from './puzzle.html';
import './puzzle.css';
import '../../pageFrags/scores/scores.css';
import {
  showConcedeDialog,
  showReplayDialog,
} from '../../pageFrags/dialogs/dialogsV.js';

//#region HTML element constants
// let abandonDialog = document.getElementById('abandonDialog');
//#endregion

let currentCell = null;
// let currentOpponent = null;
// let allUsers = null;

// returnToSignin.addEventListener('click', () => route('/signin'));

/** Removes puzzle from DOM */
function clearPuzzle() {
  console.log('Hello from clearPuzzle.');
  // clear out old puzzle and clues
  const svgGrid = document.querySelector('.grid__svg');
  if (svgGrid) svgGrid.remove();
  document.querySelector('.drawer__content').innerHTML = '';
  currentCell = null;
}

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
  document.querySelector('.container__app').innerHTML = puzzleHtml;
  document.querySelector('.drawer__concede').innerHTML = concedeHtml;
  document.querySelector('.scores').innerHTML = scoresHtml;
  document.querySelector('.drawer__content').innerHTML = puzzleInfoHtml;
  const puzTable = document.querySelector('.table__puzzle');
  // clear previous puzzle if it exists
  if (puzTable) {
    clearPuzzle();
  }
  loadPuzzleInfo(currentGame);

  const cellDim = getCellDim();
  let gridIndex = 0;
  const puzWidth = puzTable.offsetWidth;
  for (let rowIndex = 0; rowIndex < currentGame.puzzle.rows; rowIndex += 1) {
    const row = puzTable.insertRow(rowIndex);
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
        letterDiv.classList.add('margin--auto');
        if (squareData.status === 'locked') {
          cell.classList.remove('transparent');
          let bgColor = squareData.bgColor;
          if (bgColor === 'bgTransRed') bgColor = 'bg-color__red--translucent';
          if (bgColor === 'bgTransBlue')
            bgColor = 'bg-color__blue--translucent';
          cell.classList.add(bgColor);
        }
        const guess = squareData.guessArray
          ? squareData.guessArray[squareData.guessArray.length - 1]
          : '';
        letterDiv.innerText = guess;
        squareDiv.appendChild(letterDiv);
        cell.appendChild(squareDiv);
        if (clueNumber !== '') {
          const clueNumDiv = document.createElement('div');
          clueNumDiv.classList.add('clue-number');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          cell.appendChild(clueNumDiv);
        }
        if (squareData.circle) {
          const halfCell = cellDim / 2;
          const radius = halfCell - 1.5;
          let svgHtml = `\
<svg class='circle'>
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
<svg height='${cellDim}' width='${cellDim}' class='circle'>
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

  // kbContainer.classList.remove('displayNone');
  // kbContainer.classList.add('displayFlex');
  document.querySelector('.container__clues').classList.remove('displayNone');
  addConcedeHtml();
  // create contents for across clues div
  const acrossClues = document.querySelector('.clues--across');
  const downClues = document.querySelector('.clues--down');
  for (const clue of currentGame.puzzle.clues.across) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0]);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('clue');
    clueDiv.id = 'across' + clueNumber;
    if (currentGame.puzzle.completedClues.across.includes(clueNumber)) {
      clueDiv.classList.add('color__dark-gray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursor--pointer');

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
    textDiv.classList.add('cursor--pointer');
    clueDiv.appendChild(numDiv);
    clueDiv.appendChild(textDiv);
    acrossClues.appendChild(clueDiv);
  }

  // create contents for down clues div
  for (const clue of currentGame.puzzle.clues.down) {
    const parsedClue = clue.split('.');
    const clueNumber = parseInt(parsedClue[0]);
    const clueRef = parsedClue[0] + '.';
    const clueText = parsedClue.slice(1).join('.');
    const clueDiv = document.createElement('div');
    clueDiv.classList.add('clue');
    clueDiv.id = 'down' + clueNumber;
    if (currentGame.puzzle.completedClues.down.includes(clueNumber)) {
      clueDiv.classList.add('color__dark-gray');
    }

    const numDiv = document.createElement('div');
    numDiv.appendChild(document.createTextNode(clueRef));
    numDiv.classList.add('padRight', 'cursor--pointer');

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
    textDiv.classList.add('cursor--pointer');
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
    addConcedeHtml();
  }
  updateScoreboard(currentGame);
  console.log(currentGame);
  document.querySelector('.header__activity').innerHTML = '';
}

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
 * @returns HTML grid element that can be appended to puzTable
 */
function generateGridElement(puzWidth, puzHeight) {
  const svgGrid = document.createElement('div');
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
  document.querySelector('.header__activity').innerHTML = '';
  const puzTable = document.querySelector('.table__puzzle');
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
    clueNum.classList = 'clue-number';
    clueNum.innerText = cell.children[1] ? cell.children[1].textContent : '';
    animatedCell.appendChild(clueNum);
    document.querySelector('cell__animator').appendChild(animatedCell);

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
  while (!cell.classList.contains('cell__puzzle')) {
    cell = cell.parentElement;
  }
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  let acrossWord = getAcrossWordController();
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
  const cellIndex = currentGame.clueNumIndices[clueNumberText];
  const row = Math.floor(cellIndex / columns);
  const col = cellIndex - row * columns;
  document.querySelector('.table__puzzle').firstChild.children[row].children[
    col
  ];
  currentCell = cell;
  let elem = event.target;
  while (elem.id === '') elem = elem.parentElement;
  setAcrossWordController(elem.id.includes('across'));
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
      if (currentGame.puzzle.grid[idx].status !== 'locked') {
        row = Math.floor(idx / columns);
        col = idx - row * columns;
        currentCell =
          document.querySelector('.table__puzzle').children[0].children[row]
            .children[col];
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
  const puzTableWidth = document.querySelector('.table__puzzle').offsetWidth;
  return puzTableWidth / columns;
}

/** Clears letters when user changes to a different clue */
function clearLetters() {
  console.log('Hello from clearLetters.');
  const idxArray = getIdxArrayController();
  for (const index of idxArray) {
    if (currentGame.puzzle.grid[index].status === 'locked') continue;
    currentGame.puzzle.grid[index].guess = '';
    const row = Math.floor(index / columns);
    const col = index - row * columns;
    document.querySelector('.table__puzzle').firstChild.children[row].children[
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
  // const row = cell.parentElement.rowIndex;
  // const col = cell.cellIndex;
  // const rowOffset = row * columns;
  // const index = row * columns + col;
  const puzTable = document.querySelector('.table__puzzle');

  clearHighlights();
  const idxArray = getWordBlock(cell, direction);
  setIdxArrayController(idxArray);
  const clue = document.getElementById(
    direction + currentGame.puzzle.grid[idxArray[0]].clueNum
  );
  // for when clue lists are showing (landscape orientation)
  clue.classList.add('rangeHighlight', 'cluePop');
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
  document.querySelector('.clue--single').innerText =
    clue.children[1].textContent;

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
  let index = row * columns + col;
  const indexArray = [];
  if (direction === 'across') {
    while (index > row * columns && !currentGame.puzzle.grid[index - 1].black) {
      index--;
    }
    while (
      index < (row + 1) * columns &&
      !currentGame.puzzle.grid[index].black
    ) {
      indexArray.push(index);
      index++;
    }
  } else {
    while (
      index >= columns &&
      !currentGame.puzzle.grid[index - columns].black
    ) {
      index -= columns;
    }
    while (
      index < currentGame.puzzle.rows * columns &&
      !currentGame.puzzle.grid[index].black
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
  const rowArray =
    document.querySelector('.table__puzzle').children[0].children;

  for (const row of rowArray) {
    for (const cell of row.children) {
      if (cell.className !== 'black') {
        cell.classList.remove('rangeHighlight', 'currCellHighlight');
        cell.classList.add('transparent');
      }
    }
  }
  for (const clue of document.querySelector('.clues--across').children) {
    clue.classList.remove('rangeHighlight', 'cluePop');
  }
  for (const clue of document.querySelector('.clues--down').children) {
    clue.classList.remove('rangeHighlight', 'cluePop');
  }
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
  if (document.querySelector('.container__keyboard')) {
    if (event.keyCode === 13) {
      showActivity('.header__activity', 'Working...');
      playWordController();
      return;
    }
    let letter;
    if (event.key) {
      letter = event.key;
    } else {
      let node = event.target;
      while (!node.classList.contains('button__keyboard')) {
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

      if (currentGame.puzzle.grid[index].status === 'locked') {
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
        if (currentGame.puzzle.grid[idx].status !== 'locked') {
          row = Math.floor(idx / columns);
          col = idx - row * columns;
          currentCell =
            document.querySelector('.table__puzzle').children[0].children[row]
              .children[col];
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
  const puzTable = document.querySelector('.table__puzzle');
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
      const clueNumbers = cell.querySelector('.clue-number');
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
  document.querySelector('.grid__svg').remove();
  puzTable.appendChild(generateGridElement(puzWidth, puzHeight));
  if (currentCell) {
    const direction = getAcrossWordController() ? 'across' : 'down';
    selectBlock(direction, currentCell);
  }
}

document.addEventListener('keyup', enterLetter);
window.addEventListener('resize', resizePuzzle);
const keyList = document.getElementsByClassName('button__keyboard');
for (const node of keyList) {
  node.addEventListener('click', enterLetter);
}
// document.getElementById('enter').addEventListener('click', () => {
//   headerSpinner.classList.add('is-active');
//   headerMessage.innerText = 'Working...';
//   playWordController();
// });

export { showPuzzle, animateScoringView, clearPuzzle };
