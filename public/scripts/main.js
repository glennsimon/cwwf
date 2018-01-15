/* jshint esversion: 6 */

var app = (() => {
  'use strict';
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
  const provider = new firebase.auth.GoogleAuthProvider();
  
  let currentCell = null;
  let acrossWord = true;
  let currentPuzzle = null;
  let parsedPuzzle = null;
  let columns = null;
  let currentClue = null;
  let idxArray = [];
  let puzDir = null;

  firebase.auth().signInWithRedirect(provider);

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

  puzTitle.innerText = 'Select a date above to load puzzle';
  // This function takes the puzzle object returned from the fetch and displays a grid and clues.
  // The HTML table exists ahead of time but rows and cells are created on the fly.
  
  function showPuzzle() {
    if (puzTable.children) clearPuzzle(); // clear previous puzzle if it exists

    // initial estimate of element size used to determine cellDim -> tableDim -> puzzle size  
    if (parsedPuzzle.notepad) {
      // puzNotepad.style.width = '300px';
      puzNotepad.innerHTML = "<b>Notepad:</b> " + parsedPuzzle.notepad;
      puzNotepad.classList.remove('displayNone');
    }
    if (parsedPuzzle.title) puzTitle.innerText = parsedPuzzle.title;
    if (parsedPuzzle.author) puzAuthor.innerText = "by " + parsedPuzzle.author;
    if (parsedPuzzle.copyright) puzCopy.innerHTML = "&copy; " + parsedPuzzle.copyright;
    
    let cellDim = getCellDim();
    let tableDim = cellDim * parsedPuzzle.rows;
    let gridIndex = 0;
    for (let rowIndex = 0; rowIndex < parsedPuzzle.rows; rowIndex += 1) {
      let row = puzTable.insertRow(rowIndex);
      row.style.width = tableDim + 'px';
      for (let colIndex = 0; colIndex < parsedPuzzle.cols; colIndex += 1) {
        let clueNumber = parsedPuzzle.grid[gridIndex].clueNum;
        let cell = row.insertCell(colIndex);
        let blackCell = parsedPuzzle.grid[gridIndex].black;

        cell.style.width = cellDim + 'px';
        cell.style.height = cellDim + 'px';
        cell.addEventListener('click', cellClicked);
        if (blackCell) {
          cell.className = "black";
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
  
    // reset width of notepad to width of the puzzle
    // if (parsedPuzzle.notepad) {
    //   puzNotepad.style.width = document.getElementById('puzTable').offsetWidth + 'px';
    // }

    keyboard.classList.remove('displayNone');
    keyboard.classList.add('displayFlex');
    clueContainer.classList.remove('displayNone');
    splash.classList.add('displayNone');

    // create contents for across clues div
    for (let clue of parsedPuzzle.clues.across) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex');

      let numDiv = document.createElement('div');
      numDiv.appendChild(document.createTextNode(clue.slice(0, clue.indexOf('.') + 1)));
      numDiv.classList.add('padRight');

      let textDiv = document.createElement('div');
      textDiv.appendChild(document.createTextNode(clue.slice(clue.indexOf('.') + 1)));
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      acrossClues.appendChild(clueDiv);
    }
  
    // create contents for down clues div
    for (let clue of parsedPuzzle.clues.down) {
      let clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex');

      let numDiv = document.createElement('div');
      numDiv.appendChild(document.createTextNode(clue.slice(0, clue.indexOf('.') + 1)));
      numDiv.classList.add('padRight');

      let textDiv = document.createElement('div');
      textDiv.appendChild(document.createTextNode(clue.slice(clue.indexOf('.') + 1)));
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      downClues.appendChild(clueDiv);
    }
  }

  function getCellDim() {
    let puzTableWidth = puzTable.offsetWidth;
    // for (let child of document.getElementById('gridContainer').children) {
    //   if (child.nodeName.toLowerCase() === 'div') {
    //     puzTableWidth -= child.offsetHeight;
    //   }
    // }
    return Math.floor(puzTableWidth / parsedPuzzle.rows);
  }
  
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

  function selectAcross(cell) {
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let rowOffset = row * columns;
    let index = row * columns + col;

    clearHighlights();
    while (index > row * columns && ! parsedPuzzle.grid[index - 1].black) {
      index--;
    }
    currentClue = parsedPuzzle.grid[index].clueNum;
    for (let clue of acrossClues.children) {
      let numNode = clue.children[0];
      if (numNode.textContent.slice(0, numNode.textContent.indexOf('.')) === currentClue.toString()) {
        clue.classList.add('currCellHighlight');
        singleClue.innerText = clue.children[1].textContent;
      }
    }
    while (index < (row + 1) * columns && ! parsedPuzzle.grid[index].black) {
      let currentCol = index - rowOffset;
      let currentCell = cell.parentElement.children[currentCol];

      idxArray.push(index);
      currentCell.classList.add(currentCol !== col ? 'rangeHighlight' : 'currCellHighlight');
      index++;
    }
  }

  function selectDown(cell) {
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let index = row * columns + col;

    clearHighlights();
    // move to the first letter of the word
    while (index >= columns && ! parsedPuzzle.grid[index - columns].black) {
      index -= columns;
    }
    // get the number of the clue number
    currentClue = parsedPuzzle.grid[index].clueNum;
    for (let clue of downClues.children) {
      let numNode = clue.children[0];
      if (numNode.textContent.slice(0, numNode.textContent.indexOf('.')) === currentClue.toString()) {
        clue.classList.add('currCellHighlight');
        singleClue.innerText = clue.children[1].textContent;
      }
    }
    while (index < parsedPuzzle.rows * columns && ! parsedPuzzle.grid[index].black) {
      let currentRow = Math.floor(index / columns);
      let currentCell = puzTable.children[0].children[currentRow].children[col];

      idxArray.push(index);
      currentCell.classList.add(currentRow !== row ? 'rangeHighlight' : 'currCellHighlight');
      index += columns;
    }
  }

  function clearHighlights() {
    // console.log(puzTable.children[0]);
    let cellDim = getCellDim();
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
  
  // This function makes the AJAX call, waits for the response, turns it into a puzzle object and calls   showPuzzle()  
  function loadPuzzle() {
    document.getElementById("puzTitle").innerText = "Fetching data...";
    let baseUrl = 'https://raw.githubusercontent.com/doshea/nyt_crosswords/master';
    let url = `${baseUrl}/${yearPicker.value}/${monthPicker.value}/${dayPicker.value}.json`;
    // var url = './puzzles/2015/01/07.json';  //TODO:  remove for deployment and uncomment above line
    fetch(url).then((response) => {
      return response.json();
    }).then((obj) => {
      currentPuzzle = obj;
      parsePuzzle(obj);
      showPuzzle();
      toggleDrawer();
    });
  }

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
        parsedPuzzle.grid[i].clueNum = puzzle.gridnums[i] === 0 ? '' : puzzle.gridnums[i];
        parsedPuzzle.grid[i].status = 'free';
        parsedPuzzle.grid[i].circle = puzzle.circles && puzzle.circles[i] === 1 ? true : false;
      }
    }
    columns = puzzle.size.cols;
    // console.log(parsedPuzzle);
  }
  
  function clearPuzzle() {
    puzTitle.innerText = 'Select a date above to load puzzle';
    // clear out old puzzle and clues
    let remRows = puzTable.rows.length;
    while (remRows > 0) {
      puzTable.deleteRow(--remRows);
    }
    puzAuthor.innerText = "";
    puzNotepad.classList.add('displayNone');
    puzCopy.innerHTML = "";
    clueContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    acrossClues.innerText = '';
    downClues.innerText = '';
    singleClue.innerText='Select in the puzzle to reveal clue';
  }
  
  function initPicker() {
    // populatePicker('year', yearPicker);
    fetch('./puzDir.json'). then(response => {
      return response.json();
    }).then(pd => {
      puzDir = pd;
      populatePicker(Object.getOwnPropertyNames(puzDir), yearPicker);
    });
    // loadPuzzle(); //TODO: remove for deployment
  }
  
  function populatePicker(items, picker) {
    picker.value = picker.children[0].value;
    while (picker.children[1]) {
      picker.removeChild(picker.children[1]);
    }
    items.sort();
    items.forEach(item => {
      if (item.includes('.json')) item = item.slice(0, 2);
      let option = document.createElement('option');
      option.value = item;
      option.text = item;
      picker.appendChild(option);
    });
    // fetch(url).then((response) => {
    //   console.log(response);
    //   return response.json();
    // }).then((list) => {
    //   //Create and append the options
    //   for (var item of list) {
    //     if (item.includes('.json')) item = item.slice(0, 2);
    //     
    //     picker.appendChild(option);
    //   }
    // });
  }
  
  yearPicker.addEventListener('change', changeYear);
  monthPicker.addEventListener('change', changeMonth);
  dayPicker.addEventListener('change', changeDay);
  
  function changeYear(event) {
    monthPicker.value = 'month';
    monthPicker.disabled = true;
    dayPicker.value = 'day';
    dayPicker.disabled = true;
    clearPuzzle();
    if (yearPicker.value !== 'year') {
      populatePicker(Object.getOwnPropertyNames(puzDir[yearPicker.value]), monthPicker);
      monthPicker.disabled = false;
    }
  }
  
  function changeMonth(event) {
    dayPicker.disabled = true;
    clearPuzzle();
    if (monthPicker.value !== 'month') {
      populatePicker(puzDir[yearPicker.value][monthPicker.value], dayPicker);
      dayPicker.disabled = false;
    }
  }
  
  function changeDay(event) {
    clearPuzzle();
    loadPuzzle(); 
  }
  
  function resizePuzzle() {
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
      if (acrossWord) {selectAcross(currentCell);} else {selectDown(currentCell);}
    }
  }

  function toggleDrawer() {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
  }

  function playWord() {
    // TODO: implement function
  }

  function enterLetter(event) {
    let letter = null;
    if (event.target.classList[0] === 'kbButton') {
      letter = event.target.children[0].innerText;
    } else if (event.target.classList[0] === 'buttonContents') {
      letter = event.target.innerText;
    } else if (event.key) {
      letter = event.key;
    }
    if (! letter || ! letter.match(/^[a-zA-Z]$/)) return;
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      let index = row * columns + col;
      let nextCellIndex = idxArray.indexOf(index) + 1;
      let localIdxArray = idxArray.slice(nextCellIndex).concat(idxArray.slice(0, nextCellIndex));
      let letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (parsedPuzzle.grid[index].status === 'locked') {
        alert('Sorry, that square is locked by a previous answer');
        return;
      }
      letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
      letterDiv.classList.add('letter');
      currentCell.children[0].replaceChild(letterDiv, currentCell.children[0].children[0]);
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

  function undoEntry(event) {
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      let index = row * columns + col;
      // reverse copy idxArray so we go backwards instead of forwards
      let localIdxArray = [];
      for (let i =0, j= idxArray.length; i > 0; i++, j--) {
        localIdxArray[i] = idxArray[j - 1];
      }
      let nextCellIndex = idxArray.indexOf(index) - 1;
      localIdxArray = idxArray.slice(nextCellIndex).concat(idxArray.slice(0, nextCellIndex));
      let letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (parsedPuzzle.grid[index].status === 'locked') {
        alert('Sorry, that square is locked by a previous answer');
        return;
      }
      letterDiv.appendChild(document.createTextNode(''));
      letterDiv.classList.add('letter');
      currentCell.children[0].replaceChild(letterDiv, currentCell.children[0].children[0]);
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
  document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);
  screenToggle.addEventListener('click', toggleScreen);

  function toggleScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }

  if (screenfull.enabled) {
    screenfull.on('change', () => {
      screenToggle.innerText = screenfull.isFullscreen ? 'fullscreen_exit' : 'fullscreen';
    });
  }

  initPicker(); 

})();