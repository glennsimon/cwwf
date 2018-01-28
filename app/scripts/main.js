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
(function() {
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

  const yearPicker = document.getElementById('pickYear');
  const monthPicker = document.getElementById('pickMonth');
  const dayPicker = document.getElementById('pickDay');
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

  let currentCell = null;
  let acrossWord = true;
  let parsedPuzzle = null;
  let columns = null;
  let currentClue = null;
  let idxArray = [];
  let puzDir = null;

  puzTitle.innerText = 'Select a date above to load puzzle';

  /**
   * This function takes the puzzle object returned from the fetch and displays a grid and clues.
   * The HTML table exists ahead of time but rows and cells are created on the fly.
   */
  function showPuzzle() {
    // clear previous puzzle if it exists
    if (puzTable.children) {
      clearPuzzle();
    }
    // initial estimate of element size used to determine cellDim -> tableDim -> puzzle size
    if (parsedPuzzle.notepad) {
      // puzNotepad.style.width = '300px';
      puzNotepad.innerHTML = `<b>Notepad:</b>${parsedPuzzle.notepad}`;
      puzNotepad.classList.remove('displayNone');
    }
    puzTitle.innerText = parsedPuzzle.title ? parsedPuzzle.title : 'Untitled';
    puzAuthor.innerText =
      `by ${parsedPuzzle.author ? parsedPuzzle.author : 'Anonymous'}`;
    puzCopy.innerHTML =
      parsedPuzzle.copyright ? `&copy; ${parsedPuzzle.copyright}` : '';

    let cellDim = getCellDim();
    let tableDim = cellDim * parsedPuzzle.rows;
    let gridIndex = 0;
    for (let rowIndex = 0; rowIndex < parsedPuzzle.rows; rowIndex += 1) {
      let row = puzTable.insertRow(rowIndex);
      row.style.width = `${tableDim}px`;
      for (let colIndex = 0; colIndex < parsedPuzzle.cols; colIndex += 1) {
        let clueNumber = parsedPuzzle.grid[gridIndex].clueNum;
        let cell = row.insertCell(colIndex);
        let blackCell = parsedPuzzle.grid[gridIndex].black;

        cell.style.width = `${cellDim}px`;
        cell.style.height = `${cellDim}px`;
        cell.addEventListener('click', cellClicked);
        if (blackCell) {
          cell.className = 'black';
        } else {
          let squareDiv = document.createElement('div');
          let letterDiv = document.createElement('div');
          let clueNumDiv = document.createElement('div');
          squareDiv.classList.add('square');
          letterDiv.classList.add('letter');
          clueNumDiv.classList.add('clueNumber');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          squareDiv.appendChild(letterDiv);
          cell.appendChild(squareDiv);
          cell.appendChild(clueNumDiv);
          if (parsedPuzzle.grid[gridIndex].circle) {
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
    for (let clue of parsedPuzzle.clues.across) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex');

      let numDiv = document.createElement('div');
      numDiv.appendChild(
        document.createTextNode(clue.slice(0, clue.indexOf('.') + 1))
      );
      numDiv.classList.add('padRight');

      let textDiv = document.createElement('div');
      textDiv.appendChild(
        document.createTextNode(clue.slice(clue.indexOf('.') + 1))
      );
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      acrossClues.appendChild(clueDiv);
    }

    // create contents for down clues div
    for (let clue of parsedPuzzle.clues.down) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex');

      let numDiv = document.createElement('div');
      numDiv.appendChild(
        document.createTextNode(clue.slice(0, clue.indexOf('.') + 1))
      );
      numDiv.classList.add('padRight');

      let textDiv = document.createElement('div');
      textDiv.appendChild(
        document.createTextNode(clue.slice(clue.indexOf('.') + 1))
      );
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      downClues.appendChild(clueDiv);
    }
  }

  /**
   * Calculates width/height dimension of single cell in px
   * @return {number} dimension
   */
  function getCellDim() {
    let puzTableWidth = puzTable.offsetWidth;
    return Math.floor(puzTableWidth / parsedPuzzle.rows);
  }

  /**
   * Sets the variable currentCell to the cell the user clicked in
   * @param {Event} event Mouse click or screen touch event
   */
  function cellClicked(event) {
    let cell = event.srcElement;
    // console.log(cell.cellIndex);
    // console.log(cell.parentElement.rowIndex);
    // console.log(event);

    idxArray = [];
    if (cell.className === 'black') {
      return;
    }
    if (currentCell && currentCell === cell) {
      acrossWord = !acrossWord;
    }
    currentCell = cell;
    if (acrossWord) {
      selectAcross(cell);
    } else {
      selectDown(cell);
    }
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
    while (index > row * columns && !parsedPuzzle.grid[index - 1].black) {
      index--;
    }
    currentClue = parsedPuzzle.grid[index].clueNum;
    for (let clue of acrossClues.children) {
      let clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('currCellHighlight');
        singleClue.innerText = clue.children[1].textContent;
      }
    }
    while (index < (row + 1) * columns && !parsedPuzzle.grid[index].black) {
      let currentCol = index - rowOffset;
      let currentCell = cell.parentElement.children[currentCol];

      idxArray.push(index);
      currentCell.classList.add(
        currentCol === col ? 'currCellHighlight' : 'rangeHighlight'
      );
      index++;
    }
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
    // move to the first letter of the word
    while (index >= columns && !parsedPuzzle.grid[index - columns].black) {
      index -= columns;
    }
    // get the number of the clue number
    currentClue = parsedPuzzle.grid[index].clueNum;
    for (let clue of downClues.children) {
      let clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('currCellHighlight');
        singleClue.innerText = clue.children[1].textContent;
      }
    }
    while (index < parsedPuzzle.rows * columns &&
      !parsedPuzzle.grid[index].black) {
      let currentRow = Math.floor(index / columns);
      let currentCell = puzTable.children[0].children[currentRow].children[col];

      idxArray.push(index);
      currentCell.classList.add(
        currentRow === row ? 'currCellHighlight' : 'rangeHighlight'
      );
      index += columns;
    }
  }

  /** Removes clue cell highlighting from all cells */
  function clearHighlights() {
    // console.log(puzTable.children[0]);
    let rowArray = puzTable.children[0].children;

    for (let row of rowArray) {
      for (let cell of row.children) {
        if (cell.className !== 'black') {
          cell.classList.remove('rangeHighlight');
          cell.classList.remove('currCellHighlight');
        }
      }
    }
    for (let clue of acrossClues.children) {
      clue.classList.remove('currCellHighlight');
    }
    for (let clue of downClues.children) {
      clue.classList.remove('currCellHighlight');
    }
  }

  /**
   * This function fetches a puzle based on the user's selection and then
   * calls functions to format and display the puzzle
   */
  function loadPuzzle() {
    document.getElementById('puzTitle').innerText = 'Fetching data...';
    let baseUrl = 'https://raw.githubusercontent.com/doshea/nyt_crosswords/master';
    let url = `${baseUrl}/${yearPicker.value}/` +
      `${monthPicker.value}/${dayPicker.value}.json`;
    // var url = './puzzles/2015/01/07.json';  //TODO:  remove for deployment and uncomment above line
    fetch(url).then(response => {
      return response.json();
    }).then(obj => {
      parsePuzzle(obj);
      showPuzzle();
      toggleDrawer();
    });
  }

  /**
   * Parse the fetched puzzle into a more compact form
   * @param {Object} puzzle Puzzle object returned from fetch
   */
  function parsePuzzle(puzzle) {
    parsedPuzzle = {};
    parsedPuzzle.cols = puzzle.size.cols;
    parsedPuzzle.rows = puzzle.size.rows;
    parsedPuzzle.author = puzzle.author;
    parsedPuzzle.clues = puzzle.clues;
    parsedPuzzle.copyright = puzzle.copyright;
    parsedPuzzle.date = puzzle.date;
    parsedPuzzle.dow = puzzle.dow;
    parsedPuzzle.editor = puzzle.editor;
    parsedPuzzle.notepad = puzzle.notepad;
    parsedPuzzle.title = puzzle.title;
    parsedPuzzle.grid = [];
    for (var i = 0; i < puzzle.grid.length; i++) {
      parsedPuzzle.grid[i] = {};
      if (puzzle.grid[i] === '.') {
        parsedPuzzle.grid[i].black = true;
      } else {
        parsedPuzzle.grid[i].black = false;
        parsedPuzzle.grid[i].value = puzzle.grid[i];
        parsedPuzzle.grid[i].clueNum =
          puzzle.gridnums[i] === 0 ? '' : puzzle.gridnums[i];
        parsedPuzzle.grid[i].status = 'free';
        parsedPuzzle.grid[i].circle = puzzle.circles && puzzle.circles[i] === 1;
      }
    }
    columns = puzzle.size.cols;
    console.log(parsedPuzzle);
  }

  /** Removes puzzle from DOM */
  function clearPuzzle() {
    puzTitle.innerText = 'Select a date above to load puzzle';
    // clear out old puzzle and clues
    let remRows = puzTable.rows.length;
    while (remRows > 0) {
      puzTable.deleteRow(--remRows);
    }
    puzAuthor.innerText = '';
    puzNotepad.classList.add('displayNone');
    puzCopy.innerHTML = '';
    clueContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    acrossClues.innerText = '';
    downClues.innerText = '';
    singleClue.innerText = 'Select in the puzzle to reveal clue';
  }

  /** Initialize values in year selector drop-down */
  function initPicker() {
    fetch('./puzDir.json'). then(response => {
      return response.json();
    }).then(pd => {
      puzDir = pd;
      populatePicker(Object.getOwnPropertyNames(puzDir), yearPicker);
    });
    // loadPuzzle(); //TODO: remove for deployment
  }

  /**
   * Populates values in drop-down selector (picker)
   * @param {Array} items Array of values for the picker choices
   * @param {Object} picker Selector object, could be yearPicker, monthPicker, or dayPicker
   */
  function populatePicker(items, picker) {
    picker.value = picker.children[0].value;
    while (picker.children[1]) {
      picker.removeChild(picker.children[1]);
    }
    items.sort();
    items.forEach(item => {
      // if item is '<day>.json', get rid of the '.json'
      item = item.split('.')[0];
      let option = document.createElement('option');
      option.value = item;
      option.text = item;
      picker.appendChild(option);
    });
  }

  yearPicker.addEventListener('change', changeYear);
  monthPicker.addEventListener('change', changeMonth);
  dayPicker.addEventListener('change', changeDay);

  /**
   * When user selects a different year, clears puzzle and sets up
   * monthPicker values for the new year
   */
  function changeYear() {
    monthPicker.value = 'month';
    monthPicker.disabled = true;
    dayPicker.value = 'day';
    dayPicker.disabled = true;
    clearPuzzle();
    if (yearPicker.value !== 'year') {
      populatePicker(
        Object.getOwnPropertyNames(puzDir[yearPicker.value]), monthPicker
      );
      monthPicker.disabled = false;
    }
  }

  /**
   * When user selects a different month, clears puzzle and sets up
   * dayPicker values for the new month
   */
  function changeMonth() {
    dayPicker.disabled = true;
    clearPuzzle();
    if (monthPicker.value !== 'month') {
      populatePicker(puzDir[yearPicker.value][monthPicker.value], dayPicker);
      dayPicker.disabled = false;
    }
  }

  /**
   * When user selects a different day, clears puzzle and calls function
   * to load the new puzzle
   */
  function changeDay() {
    clearPuzzle();
    loadPuzzle();
  }

  /** Resizes puzzle based on available space */
  function resizePuzzle() {
    if (puzTable.children.length === 0) return;
    // console.log(puzTable.children[0]);
    let cellDim = getCellDim();
    let tableDim = cellDim * parsedPuzzle.rows;
    let rowArray = puzTable.children[0].children;

    for (let row of rowArray) {
      row.style.width = tableDim + 'px';
      let cellArray = row.children;
      for (let cell of cellArray) {
        cell.style.width = cellDim + 'px';
        cell.style.height = cellDim + 'px';
      }
    }
    if (parsedPuzzle.notepad) {
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

  /** The big kahuna!  Yet to implement */
  function playWord() {
    // TODO: implement function
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
    } else if (event.target.classList[0] === 'buttonContents') {
      letter = event.target.innerText;
    } else if (event.key) {
      letter = event.key;
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

      if (parsedPuzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
      letterDiv.classList.add('letter');
      currentCell
        .children[0]
        .replaceChild(letterDiv, currentCell.children[0].children[0]);
      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');
      for (let idx of localIdxArray) {
        if (parsedPuzzle.grid[idx].status !== 'locked') {
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
      for (let i = 0, j = idxArray.length; i > 0; i++, j--) {
        localIdxArray[i] = idxArray[j - 1];
      }
      let nextCellIndex = idxArray.indexOf(index) - 1;
      localIdxArray =
        idxArray.slice(nextCellIndex).concat(idxArray.slice(0, nextCellIndex));
      let letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (parsedPuzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      letterDiv.appendChild(document.createTextNode(''));
      letterDiv.classList.add('letter');
      currentCell
        .children[0]
        .replaceChild(letterDiv, currentCell.children[0].children[0]);
      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');
      for (let idx of localIdxArray) {
        if (parsedPuzzle.grid[idx].status !== 'locked') {
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

  initPicker();
})();
