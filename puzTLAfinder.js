/* jshint esversion: 6 */

const fs = require("fs");
const path = require('path');

let stream = fs.createWriteStream('./TLAList.txt');
let stream2 = fs.createWriteStream('./funkyCharList.txt');

let funkyCharList = '';

stream.write('puzzles with TLAs:\n');

let years = fs.readdirSync('./puzzles/');
years.forEach(year => {
  let months = fs.readdirSync('./puzzles/' + year.toString() + '/');
  months.forEach(month => {
    let days = fs.readdirSync('./puzzles/' + year.toString() + '/' + month.toString() + '/');
    days.forEach(day => {
      let puzzle = fs.readFileSync('./puzzles/' + year.toString() + '/' + 
        month.toString() + '/' + day.toString(), 'utf8');
      let jsonPuzzle = JSON.parse(puzzle);
      // console.log(jsonPuzzle.date);
      checkForTLAs(jsonPuzzle);
    });
  });
});

function checkForTLAs(puzzle) { // puzzle is a JSON file
  let count = 0;
  puzzle.grid.forEach(entry => {
    // console.log(entry);
    // console.log(entry.length);
    if (entry.length > 1) {
      if (count < 1) stream.write(`${puzzle.date}\tTLAstring: ${entry}\n`);
      count++;
      console.log(`should return now, count = ${count}`);
      return;
    } else if (! entry.match(/[A-Z\.]+/)) {
      if (count < 1 && funkyCharList.indexOf(entry) === -1) stream2.write(entry);
      funkyCharList += entry;
      count++;
      return;
    }
  });
}

