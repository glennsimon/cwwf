/* jshint esversion: 6 */

var app = ((document) => {
  'use strict';
  const yearPicker = document.getElementById('pickYear');
  const monthPicker = document.getElementById('pickMonth');
  const dayPicker = document.getElementById('pickDay');
  const puzTitle = document.getElementById('puzTitle');
  const puzTable = document.getElementById('puzTable');
  const puzAuthor = document.getElementById('puzAuthor');
  const puzCopy = document.getElementById('puzCopy');
  const puzNotepad = document.getElementById('puzNotepad');
  const across = document.getElementById('across');
  const down = document.getElementById('down');
  const clue1 = document.getElementById('clue1');
  const clue2 = document.getElementById('clue2');

  let currentCell = null;
  let acrossWord = true;
  let currentPuzzle = null;
  let parsedPuzzle = null;
  let columns = null;

  puzTitle.innerText = 'Select a date above to load puzzle';
  // This function takes the puzzle object returned from the fetch and displays a grid and clues.
  // The HTML table exists ahead of time but rows and cells are created on the fly.
  
  function showPuzzle(puzzle) {  
    puzTitle.innerText = puzzle.title;
    puzAuthor.innerText = "by " + puzzle.author;
    puzCopy.innerHTML = "&copy; " + puzzle.copyright;
  
    var gridnumIndex = 0;
    var clueIndex = 0;
    var rowIndex, row, colIndex, cell, gridNumber, val;
  
    for (rowIndex = 0; rowIndex < puzzle.size.rows; rowIndex += 1) {
      row = puzTable.insertRow(rowIndex);
      for (colIndex = 0; colIndex < puzzle.size.cols; colIndex += 1) {
        cell = row.insertCell(colIndex);
        cell.addEventListener('click', cellClicked);
        gridNumber = puzzle.gridnums[gridnumIndex];
        if (gridNumber === 0) { // 0 means no grid number at this location
          gridNumber = " ";
        }
        val = puzzle.grid[gridnumIndex];
        if (val === ".") {
          cell.className = "black";
        } else {
          cell.innerHTML = "<div class='grid'>" + gridNumber + "</div>" + "<div class='letter'>"  + "</div>";  
          //cell.innerHTML = "<div class='grid'>" + gridNumber + "</div>" + "<div class='letter'>" + val + "</div>";  
          if (puzzle.circles && puzzle.circles[gridnumIndex] === 1) {  
            cell.className = puzzle.shadecircles ? "shade" : "circle";  
            // TODO:  fix circles!
          }  
        }  
        gridnumIndex += 1;
      }
    }
  
    if (puzzle.notepad) {
      var notepad = document.getElementById("puzNotepad");
      notepad.innerHTML = "<b>Notepad:</b> " + puzzle.notepad;
      notepad.style.display = "block";
  
      var w = puzTable.clientWidth;
      notepad.style.width = (w - 10) + "px";
    }
  
    document.getElementById("clue1").style.visibility = "visible";
    var across = document.getElementById("across");
    for (clueIndex in puzzle.clues.across) {
      across.innerHTML += (puzzle.clues.across[clueIndex] + "<br />");
    }
  
    document.getElementById("clue2").style.visibility = "visible";
    var down = document.getElementById("down");
    for (clueIndex in puzzle.clues.down) {
      down.innerHTML += (puzzle.clues.down[clueIndex] + "<br />");
    }
  }
  
  function cellClicked(event) {
    let cell = event.srcElement;
    // console.log(cell.cellIndex);
    // console.log(cell.parentElement.rowIndex);
    // console.log(event);
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
    while (index < (row + 1) * columns && ! parsedPuzzle.grid[index].black) {
      let currentCol = index - rowOffset;
      let currentCell = cell.parentElement.children[currentCol];

      currentCell.style.backgroundColor = currentCol !== col ? 'LightYellow' : 'Yellow';
      index++;
    }
  }

  function selectDown(cell) {
    let row = cell.parentElement.rowIndex;
    let col = cell.cellIndex;
    let index = row * columns + col;

    clearHighlights();
    while (index > columns && ! parsedPuzzle.grid[index - columns].black) {
      index -= columns;
    }
    while (index < parsedPuzzle.rows * columns && ! parsedPuzzle.grid[index].black) {
      let currentRow = Math.floor(index / columns);
      let currentCell = puzTable.firstChild.children[currentRow].children[col];

      currentCell.style.backgroundColor = currentRow !== row ? 'LightYellow' : 'Yellow';
      index += columns;
    }
  }

  function clearHighlights() {
    // console.log(puzTable.firstChild);
    let rowArray = puzTable.firstChild.children;
    for (var row of rowArray) {
      let cellArray = row.children;
      for (var cell of cellArray) {
        if (cell.className !== 'black') {
          cell.style.backgroundColor = 'white';
        }
      }
    }
  }
  
  // This function makes the AJAX call, waits for the response, turns it into a puzzle object and calls   showPuzzle()  
  function loadPuzzle() {
    clearPuzzle();
    document.getElementById("puzTitle").innerText = "Fetching data...";
    //var url = './puzzles/' + yearPicker.value + '/' + monthPicker.value + '/' + dayPicker.value + '.json';
    var url = './puzzles/1977/07/07.json';  //TODO:  remove for deployment and uncomment above line
    fetch(url).then((response) => {
      return response.json();
    }).then((obj) => {
      currentPuzzle = obj;
      parsePuzzle(obj);
      showPuzzle(obj);
    });
  }

  function parsePuzzle(puzzle) {
    parsedPuzzle = {};
    parsedPuzzle.cols = puzzle.size.cols;
    parsedPuzzle.rows = puzzle.size.rows;
    parsedPuzzle.grid = [];
    for (var i = 0; i < puzzle.grid.length; i++) {
      parsedPuzzle.grid[i] = {};
      if (puzzle.grid[i] === '.') {
        parsedPuzzle.grid[i].black = true;
      } else {
        parsedPuzzle.grid[i].value = puzzle.grid[i];
        parsedPuzzle.grid[i].clueNum = puzzle.gridnums[i] === 0 ? '' : puzzle.gridnums[i];
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
    puzNotepad.style.display = "none";
    puzCopy.innerHTML = "";
    across.innerHTML = "";
    down.innerHTML = "";
    clue1.style.visibility = "hidden";
    clue2.style.visibility = "hidden";
  }
  
  function initPicker() {
    populatePicker('year', yearPicker);
    loadPuzzle(); //TODO: remove for deployment
  }
  
  function populatePicker(url, picker) {
    picker.value = picker.children[0].value;
    while (picker.children[1]) {
      picker.removeChild(picker.children[1]);
    }
    fetch(url).then((response) => {
      return response.json();
    }).then((list) => {
      //Create and append the options
      for (var item of list) {
        if (item.includes('.json')) item = item.slice(0, 2);
        let option = document.createElement('option');
        option.value = item;
        option.text = item;
        picker.appendChild(option);
      }
    });
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
      populatePicker(yearPicker.value, monthPicker);
      monthPicker.disabled = false;
    }
  }
  
  function changeMonth(event) {
    dayPicker.disabled = true;
    clearPuzzle();
    if (monthPicker.value !== 'month') {
      populatePicker(yearPicker.value + '/' + monthPicker.value, dayPicker);
      dayPicker.disabled = false;
    }
  }
  
  function changeDay(event) {
    clearPuzzle();
    loadPuzzle(); 
  }
  
  initPicker(); 

  document.addEventListener('keyup', enterLetter);

  function enterLetter(event) {
    if (currentCell) {
      let row = currentCell.parentElement.rowIndex;
      let col = currentCell.cellIndex;
      let index = row * columns + col;

      currentCell.innerText = event.key.toUpperCase();
      clearHighlights();
      if (acrossWord) {
        currentCell = puzTable.firstChild.children[row].children[col + 1];
        selectAcross(currentCell);
      } else {
        currentCell = puzTable.firstChild.children[row + 1].children[col];
        selectDown(currentCell);
      }
    }
  }

})(document);