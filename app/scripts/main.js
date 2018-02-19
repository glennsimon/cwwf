/*!
 *
 *  Web Starter Kit
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
/* eslint-env es6, browser */
const puzzleWorker = (function(document, window) {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
  );

  if ('serviceWorker' in navigator &&
    (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        // updatefound is fired if service-worker.js changes.
        registration.onupdatefound = function() {
          // updatefound is also fired the very first time the SW is installed,
          // and there's no need to prompt for a reload at that point.
          // So check here to see if the page is already controlled,
          // i.e. whether there's an existing service worker.
          if (navigator.serviceWorker.controller) {
            // The updatefound event implies that registration.installing is set:
            // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
            var installingWorker = registration.installing;

            installingWorker.onstatechange = function() {
              switch (installingWorker.state) {
                case 'installed':
                  // At this point, the old content will have been purged and the
                  // fresh content will have been added to the cache.
                  // It's the perfect time to display a "New content is
                  // available; please refresh." message in the page's interface.
                  break;

                case 'redundant':
                  throw new Error('The installing ' +
                    'service worker became redundant.');

                default:
                  // Ignore
              }
            };
          }
        };
      }).catch(function(e) {
        console.error('Error during service worker registration:', e);
      });
  }

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
  const turnId = document.getElementById('turnId');
  const scores = document.getElementById('scores');
  const myName = document.getElementById('myName');
  const oppName = document.getElementById('oppName');
  const myScore = document.getElementById('myScore');
  const oppScore = document.getElementById('oppScore');
  const logo = document.getElementById('logo');
  const firebase = window.firebase;
  const db = firebase.firestore();

  let currentUser = firebase.auth().currentUser;
  let myOpponentUid = null;
  let currentCell = null;
  let acrossWord = true;
  let game = null;
  let columns = null;
  let currentClue = null;
  let idxArray = [];
  let puzzleId = null;
  let myTurn = null;
  let clueNumIndices = {};

  firebase.auth().onAuthStateChanged(user => {
    currentUser = user;
    // fillLists();
  });

  logo.addEventListener('click', () => {
    location.hash = '#games';
  });

  puzTitle.innerText = 'No puzzle loaded';

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
    // initial estimate of element size used to determine cellDim -> tableDim -> puzzle size
    if (game.puzzle.notepad) {
      // puzNotepad.style.width = '300px';
      puzNotepad.innerHTML = `<b>Notepad:</b>${game.puzzle.notepad}`;
      puzNotepad.classList.remove('displayNone');
    }
    puzTitle.innerText = game.puzzle.title ?
      game.puzzle.title : 'Untitled';
    puzAuthor.innerText =
      `by ${game.puzzle.author ? game.puzzle.author : 'Anonymous'}`;
    puzCopy.innerHTML =
      game.puzzle.copyright ?
        `&copy; ${game.puzzle.copyright}` : '';

    let cellDim = getCellDim();
    let tableDim = cellDim * game.puzzle.rows;
    let gridIndex = 0;
    for (let rowIndex = 0; rowIndex < game.puzzle.rows; rowIndex += 1) {
      let row = puzTable.insertRow(rowIndex);
      row.style.width = `${tableDim}px`;
      for (let colIndex = 0; colIndex < game.puzzle.cols; colIndex += 1) {
        let clueNumber = game.puzzle.grid[gridIndex].clueNum;
        let cell = row.insertCell(colIndex);
        let blackCell = game.puzzle.grid[gridIndex].black;

        cell.style.width = `${cellDim}px`;
        cell.style.height = `${cellDim}px`;
        cell.addEventListener('click', cellClicked);
        if (blackCell) {
          cell.className = 'black';
        } else {
          cell.classList.add('cursorPointer');
          let squareDiv = document.createElement('div');
          let letterDiv = document.createElement('div');
          squareDiv.classList.add('square');
          letterDiv.classList.add('marginAuto');
          if (game.puzzle.grid[gridIndex].status === 'locked') {
            cell.classList.add(game.puzzle.grid[gridIndex].bgColor);
            // letterDiv.innerText = game.puzzle.grid[gridIndex].guess;
          }
          // if (game.puzzle.grid[gridIndex].bgColor === 'bgTransGray') {
          //   cell.classList.add('bgTransGray');
          //   letterDiv.innerText = game.puzzle.grid[gridIndex].guess;
          // }
          let guess = game.puzzle.grid[gridIndex].guess;
          letterDiv.innerText = guess ? guess : '';
          squareDiv.appendChild(letterDiv);
          cell.appendChild(squareDiv);
          if (clueNumber !== '') {
            clueNumIndices[clueNumber.toString()] = gridIndex;
            let clueNumDiv = document.createElement('div');
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

    // create contents for across clues div
    for (let clue of game.puzzle.clues.across) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex', 'width50pct', 'cursorPointer');

      let numDiv = document.createElement('div');
      numDiv.appendChild(
        document.createTextNode(clue.slice(0, clue.indexOf('.') + 1))
      );
      numDiv.classList.add('padRight', 'cursorPointer');

      let textDiv = document.createElement('div');
      textDiv.appendChild(
        document.createTextNode(clue.slice(clue.indexOf('.') + 1))
      );
      textDiv.classList.add('cursorPointer');
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      // clueDiv.addEventListener('click', acrossClueClick);
      acrossClues.appendChild(clueDiv);
    }

    // create contents for down clues div
    for (let clue of game.puzzle.clues.down) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex', 'width50pct');

      let numDiv = document.createElement('div');
      numDiv.appendChild(
        document.createTextNode(clue.slice(0, clue.indexOf('.') + 1))
      );
      numDiv.classList.add('padRight', 'cursorPointer');

      let textDiv = document.createElement('div');
      textDiv.appendChild(
        document.createTextNode(clue.slice(clue.indexOf('.') + 1))
      );
      textDiv.classList.add('cursorPointer');
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      downClues.appendChild(clueDiv);
    }

    acrossClues.addEventListener('click', event => {
      if (event.target.innerText !== '') {
        clueClicked(event, 'across');
      }
    });

    downClues.addEventListener('click', event => {
      if (event.target.innerText !== '') {
        clueClicked(event, 'down');
      }
    });

    /**
     * When clue is clicked, this event fires
     * @param {Event} event Mouse click or screen touch event
     * @param {string} direction Clue direction (across or down)
     */
    function clueClicked(event, direction) {
      let clueNumberText = event.target.parentElement.firstChild.innerText;
      clueNumberText = clueNumberText.slice(0, clueNumberText.indexOf('.'));
      let cellIndex = clueNumIndices[clueNumberText];
      let row = Math.floor(cellIndex / columns);
      let col = cellIndex - row * columns;
      let cell = puzTable.firstChild.children[row].children[col];
      if (direction === 'across') {
        selectAcross(cell);
      } else {
        selectDown(cell);
      }
    }

    scores.classList.remove('displayNone');
    let me = currentUser.uid === game.initiator.uid ? 'initiator' : 'opponent';
    let they = me === 'initiator' ? 'opponent' : 'initiator';
    myName.innerText = game[me].displayName.slice(0,
      game[me].displayName.indexOf(' ') > 10 ?
        10 : game[me].displayName.indexOf(' '));
    oppName.innerText = game[they].displayName.slice(0,
      game[they].displayName.indexOf(' ') > 10 ?
        10 : game[they].displayName.indexOf(' '));
    myScore.innerText = game[me].score;
    oppScore.innerText = game[they].score;
    myName.classList.add(game[me].bgColor.replace('bg', 'font'));
    oppName.classList.add(game[they].bgColor.replace('bg', 'font'));
    if (game.emptySquares === 0) {
      let result = 'YOU WON!!';
      if (game[me].score > game[they].score) {
        game.winner = game[me].uid;
      } else {
        game.winner = game[they].uid;
        result = 'You lost';
      }
      game.status = 'finished';
      window.puzzleGames.showReplayDialog(game, result);
      savePuzzle();
    }
  }

  /**
   * Calculates width/height dimension of single cell in px
   * @return {number} dimension
   */
  function getCellDim() {
    let puzTableWidth = puzTable.offsetWidth;
    return Math.floor(puzTableWidth / game.puzzle.rows);
  }

  /**
   * Sets the variable currentCell to the cell the user clicked in
   * @param {Event} event Mouse click or screen touch event
   */
  function cellClicked(event) {
    let cell = event.target;
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let index = row * columns + col;
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

  /** Clears letters when user changes to a different clue */
  function clearLetters() {
    for (let index of idxArray) {
      if (game.puzzle.grid[index].status === 'locked') continue;
      game.puzzle.grid[index].guess = '';
      let row = Math.floor(index / columns);
      let col = index - row * columns;
      puzTable.firstChild.children[row].children[col]
        .firstChild.firstChild.innerText = '';
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
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let index = row * columns + col;
    let indexArray = [];
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
      while (index < game.puzzle.rows * columns &&
        !game.puzzle.grid[index].black) {
        indexArray.push(index);
        index += columns;
      }
    }
    return indexArray;
  }

  /**
   * Highlights an across clue and location in puzzle based on which cell
   * the user clicks
   * @param {Object} cell Cell the user clicked
   */
  function selectAcross(cell) {
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let rowOffset = row * columns;
    let index = row * columns + col;

    clearHighlights();
    idxArray = getWordBlock(cell, 'across');
    currentClue = game.puzzle.grid[idxArray[0]].clueNum;
    for (let clue of acrossClues.children) {
      let clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('rangeHighlight');
        singleClue.innerText = clue.children[1].textContent;
        break;
      }
    }
    let currentCol = index - rowOffset;
    let currentCell = cell.parentElement.children[currentCol];
    currentCell.classList.add('border2pxLeft');
    for (let idx of idxArray) {
      currentCol = idx - rowOffset;
      currentCell = cell.parentElement.children[currentCol];
      currentCell.classList.add('border2pxTop', 'border2pxBottom');
      currentCell.classList.add(currentCol === col ?
        'currCellHighlight' : 'rangeHighlight');
    }
    currentCell.classList.add('border2pxRight');
  }

  /**
   * Highlights a down clue and location in puzzle based on which cell
   * the user clicks
   * @param {Object} cell Cell the user clicked
   */
  function selectDown(cell) {
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let index = row * columns + col;

    clearHighlights();
    idxArray = getWordBlock(cell, 'down');
    // get the number of the clue number
    currentClue = game.puzzle.grid[idxArray[0]].clueNum;
    for (let clue of downClues.children) {
      let clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('rangeHighlight');
        singleClue.innerText = clue.children[1].textContent;
      }
    }
    let currentRow = Math.floor(index / columns);
    let currentCell = puzTable.children[0].children[currentRow].children[col];
    currentCell.classList.add('border2pxTop');
    for (let idx of idxArray) {
      currentRow = Math.floor(idx / columns);
      currentCell = puzTable.children[0].children[currentRow].children[col];
      currentCell.classList.add('border2pxLeft', 'border2pxRight');
      currentCell.classList.add(
        currentRow === row ? 'currCellHighlight' : 'rangeHighlight'
      );
    }
    currentCell.classList.add('border2pxBottom');
  }

  /** Removes clue cell highlighting from all cells */
  function clearHighlights() {
    // console.log(puzTable.children[0]);
    let rowArray = puzTable.children[0].children;

    for (let row of rowArray) {
      for (let cell of row.children) {
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
    for (let clue of acrossClues.children) {
      clue.classList.remove('rangeHighlight');
    }
    for (let clue of downClues.children) {
      clue.classList.remove('rangeHighlight');
    }
  }

  /**
   * This function fetches a puzzle based on the user's selection and then
   * calls functions to format and display the puzzle
   * @param {Object} paramObject Object with competitors and puzzle difficulty
   */
  function loadPuzzle(paramObject) {
    document.getElementById('puzTitle').innerText = 'Fetching data...';

    const difficulty = paramObject.difficulty;

    let directory = 'puzDirMed.json';
    let year = '1976';
    let month = '01';
    let day = '01';

    // Stop listening for previous puzzle changes
    if (puzzleId) {
      db.collection('games').doc(puzzleId).onSnapshot(() => {});
    }

    if (difficulty === 'hard') {
      directory = 'puzDirHard.json';
    } else if (difficulty === 'easy') {
      directory = 'puzDirEasy.json';
    }

    fetch(directory).then(response => {
      return response.json();
    }).then(dir => {
      const years = Object.getOwnPropertyNames(dir);
      year = years[Math.floor(Math.random() * years.length)];
      const months = Object.getOwnPropertyNames(dir[year]);
      month = months[Math.floor(Math.random() * months.length)];
      const days = dir[year][month];
      day = days[Math.floor(Math.random() * days.length)];
    }).then(() => {
      let baseUrl = 'https://raw.githubusercontent.com/doshea/nyt_crosswords/master';
      let url = `${baseUrl}/${year}/${month}/${day}`;
      fetch(url).then(response => {
        return response.json();
      }).then(obj => {
        parsePuzzle(obj);
        saveNewPuzzle(paramObject);
        showPuzzle();
        location.hash = '#puzzle';
      }).catch(error => {
        console.error('Error fetching puzzle: ', error);
      });
    }).catch(error => {
      console.error('Error fetching puzzle date: ', error);
    });
  }

  /**
   * This function fetches an active puzzle based on the user's selection
   * and then calls functions to format and display the puzzle
   * @param {String} newPuzzleId Firestore game (puzzle) id
   */
  function fetchPuzzle(newPuzzleId) {
    document.getElementById('puzTitle').innerText = 'Fetching data...';

    const db = window.firebase.firestore();
    const docRef = db.collection('games').doc(newPuzzleId);

    // Stop listening for previous puzzle changes
    if (puzzleId) {
      db.collection('games').doc(puzzleId).onSnapshot(() => {});
    }

    docRef.onSnapshot(doc => {
      game = doc.data();
      if (game.status === 'started') {
        myOpponentUid = game.initiator.uid === currentUser.uid ?
          game.opponent.uid : game.initiator.uid;
        columns = game.puzzle.cols;
        myTurn = game.nextTurn !== myOpponentUid;
        turnId.innerText = myTurn ? 'YOUR' : 'THEIR';
      } else {
        turnId.innerText = 'NO';
      }
      puzzleId = newPuzzleId;
      showPuzzle();
      location.hash = '#puzzle';
    }, error => {
      console.error('Error getting puzzle: ', error);
    });
  }

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
    game.puzzle.grid = [];
    for (var i = 0; i < puzzle.grid.length; i++) {
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
        game.puzzle.grid[i].circle =
          puzzle.circles && puzzle.circles[i] === 1;
      }
    }
    columns = cols;
    console.log(game.puzzle);
  }

  /** Saves new puzzle to firebase
   * @param {Object} paramObject Id and difficulty object passed to loadPuzzle from games.js
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
    game.start = firebase.firestore.FieldValue.serverTimestamp();
    game.status = 'started';
    game.winner = null;
    game.nextTurn = initiatorUid;
    db.collection('games').add(game).then(docRef => {
      console.log('game written to firestore with docRef: ', docRef);
      puzzleId = docRef.id;
      db.collection('games').doc(puzzleId).onSnapshot(doc => {
        game = doc.data();
        myTurn = game.nextTurn !== myOpponentUid;
        turnId.innerText = myTurn ? 'YOUR' : 'THEIR';
        showPuzzle();
      }, error => {
        console.error('Error getting puzzle: ', error);
      });
    }).catch(error => {
      console.error('Error writing file to firestore: ', error);
    });
  }

  /** Saves puzzle to firebase */
  function savePuzzle() {
    db.collection('games').doc(puzzleId)
      .set(game, {merge: true}).catch(error => {
        console.error('Error saving to firebase: ', error);
      });
  }

  /** Removes puzzle from DOM */
  function clearPuzzle() {
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
  }

  /** Resizes puzzle based on available space */
  function resizePuzzle() {
    if (puzTable.children.length === 0) return;
    // console.log(puzTable.children[0]);
    let cellDim = getCellDim();
    let tableDim = cellDim * game.puzzle.rows;
    let rowArray = puzTable.children[0].children;

    for (let row of rowArray) {
      row.style.width = tableDim + 'px';
      let cellArray = row.children;
      for (let cell of cellArray) {
        cell.style.width = cellDim + 'px';
        cell.style.height = cellDim + 'px';
      }
    }
    if (game.puzzle.notepad) {
      puzNotepad.style.width = tableDim + 'px';
      puzNotepad.classList.remove('displayNone');
    }
    if (currentCell) {
      if (acrossWord) {
        selectAcross(currentCell);
      } else {
        selectDown(currentCell);
      }
    }
  }

  /** Helper function for toggling drawer */
  function toggleDrawer() {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }

  /** Play currentUser's turn. Executed when the player clicks the enter button */
  function playWord() {
    if (!myTurn) return;
    if (!checkIfCorrect(idxArray)) {
      game.nextTurn = myOpponentUid;
      myTurn = !myTurn;
      savePuzzle();
      return;
    }
    for (let index of idxArray) {
      let gridElement = game.puzzle.grid[index];
      game.puzzle.grid[index] = setCellStatus(index, gridElement);
    }
    game.nextTurn = myOpponentUid;
    myTurn = !myTurn;
    savePuzzle();
  }

  /**
   * Checks if array of cells is filled in correctly
   * @param {array} indexArray Array of cell indices
   * @return {boolean} true if correct, false otherwise
   */
  function checkIfCorrect(indexArray) {
    for (let index of indexArray) {
      let gridElement = game.puzzle.grid[index];
      if (gridElement.guess !== gridElement.value) {
        return false;
      }
    }
    return true;
  }

  /**
   * Sets values for gridElement based on currentUser play
   * @param {number} index index of cell
   * @param {Object} gridElement game.puzzle grid array object
   * @return {Object} Updated grid element object
   */
  function setCellStatus(index, gridElement) {
    let player = game.initiator.uid === currentUser.uid ?
      'initiator' : 'opponent';
    if (gridElement.status === 'locked') {
      game[player].score += 1;
      return gridElement;
    }
    game[player].score += scoreCell(index);
    game[player].squaresWon.push(index);
    game.emptySquares--;
    gridElement.bgColor = game[player].bgColor;
    gridElement.status = 'locked';
    return gridElement;
  }

  /**
   * Adds to score if orthogonal word is completed by this play
   * @param {number} index index of cell
   * @return {number} additional score due to completion of orthogonal word
   */
  function scoreCell(index) {
    const row = Math.floor(index / columns);
    const col = index - row * columns;
    const cell = puzTable.children[0].children[row].children[col];
    const wordBlock = getWordBlock(cell, acrossWord ? 'down' : 'across');
    let addedScore = 0;

    for (let idx of wordBlock) {
      if (idx === index || game.puzzle.grid[idx].status === 'locked') {
        addedScore += 1;
      } else {
        return 1;
      }
    }
    return addedScore;
  }

  /**
   * Adds a letter to the puzzle from physical or virtual keyboard event and moves
   * forward one space
   * @param {Event} event Keyboard or touch event from physical or virtual keyboard
   */
  function enterLetter(event) {
    let letter = null;
    if (event.target.classList[0] === 'kbButton') {
      letter = event.target.children[0].innerText;
    } else if (event.target.innerText.match(/^[a-zA-Z]$/)) {
      letter = event.target.innerText;
    } else if (event.key) {
      letter = event.key;
    }
    if (letter && letter.toLowerCase() === 'backspace') {
      undoEntry();
      return;
    }
    if (letter && letter.toLowerCase() === 'enter') {
      playWord();
      return;
    }
    if (!letter || !letter.match(/^[a-zA-Z]$/)) return;
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      let index = row * columns + col;
      let nextCellIndex = idxArray.indexOf(index) + 1;
      let localIdxArray =
        idxArray.slice(nextCellIndex).concat(idxArray.slice(0, nextCellIndex));
      let letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (game.puzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      game.puzzle.grid[index].guess = letter.toUpperCase();
      letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
      letterDiv.classList.add('marginAuto');
      currentCell
        .children[0]
        .replaceChild(letterDiv, currentCell.children[0].children[0]);
      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');
      for (let idx of localIdxArray) {
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
   * Removes letter (if present) from current cell and moves
   * backward one space
   */
  function undoEntry() {
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      let index = row * columns + col;
      // reverse copy idxArray so we go backwards instead of forwards
      let localIdxArray = [];
      for (let i = 0, j = idxArray.length; i < idxArray.length; i++, j--) {
        localIdxArray[i] = idxArray[j - 1];
      }
      let nextCellIndex = localIdxArray.indexOf(index) + 1;
      localIdxArray =
        localIdxArray.slice(nextCellIndex)
          .concat(localIdxArray.slice(0, nextCellIndex));
      let letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (game.puzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      letterDiv.appendChild(document.createTextNode(''));
      letterDiv.classList.add('marginAuto');
      currentCell
        .children[0]
        .replaceChild(letterDiv, currentCell.children[0].children[0]);
      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');
      for (let idx of localIdxArray) {
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

  document.addEventListener('keyup', enterLetter);
  window.addEventListener('resize', resizePuzzle);
  let keyList = keyboard.getElementsByClassName('kbButton');
  for (let node of keyList) {
    node.addEventListener('click', enterLetter);
  }
  document.getElementById('backspace').addEventListener('click', undoEntry);
  document.getElementById('enter').addEventListener('click', playWord);
  document
    .getElementById('closeDrawer')
    .addEventListener('click', toggleDrawer);
  screenToggle.addEventListener('click', toggleScreen);

  /** Toggle between window and full screen */
  function toggleScreen() {
    if (window.screenfull.enabled) {
      window.screenfull.toggle();
    }
  }

  if (window.screenfull.enabled) {
    window.screenfull.on('change', () => {
      screenToggle.innerText =
        window.screenfull.isFullscreen ? 'fullscreen_exit' : 'fullscreen';
    });
  }

  /** Init in case we need it */
  function init() {
    console.log('The dude abides!');
  }

  return {
    // initPicker: initPicker,
    init: init,
    loadPuzzle: loadPuzzle,
    fetchPuzzle: fetchPuzzle,
    clearPuzzle: clearPuzzle
  };
})(document, window);

puzzleWorker.init();
