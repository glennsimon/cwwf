/* jshint esversion: 6 */

const fs = require("fs");

let stream = fs.createWriteStream('./BadEntryList.txt');
let directory = {};

stream.write('puzzles with TLAs:\n');

let years = fs.readdirSync('./puzzles/');
years.forEach(year => {
  directory[year.toString()] = {};
  let months = fs.readdirSync('./puzzles/' + year.toString() + '/');
  months.forEach(month => {
    directory[year.toString()][month.toString()] = [];
    let days = fs.readdirSync('./puzzles/' + year.toString() + '/' + month.toString() + '/');
    days.forEach(day => {
      let puzzle = fs.readFileSync('./puzzles/' + year.toString() + '/' + 
        month.toString() + '/' + day.toString(), 'utf8');
      let puzObject = JSON.parse(puzzle);
      // console.log(jsonPuzzle.date);
      if (puzzleOK(puzObject)) {
        directory[year.toString()][month.toString()].push(day);
      }
    });
  });
});

function puzzleOK(puzObject) { // puzObject is a javascript object
  let badLengthCount = 0;
  let badCharCount = 0;
  puzObject.grid.forEach(entry => {
    // console.log(entry);
    // console.log(entry.length);
    if (entry.length > 1) {
      if (badLengthCount < 1) stream.write(`${puzObject.date}\tTLAstring: ${entry}\n`);
      badLengthCount++;
    } else if (! entry.match(/[A-Z\.]+/)) {
      if (badCharCount < 1) stream.write(`${puzObject.date}\tTLAstring: ${entry}\n`);
      badCharCount++;
    }
  });
  let rows = puzObject.size.rows;
  let cols = puzObject.size.cols;
  if (rows > 15 || cols > 15 || rows !== cols) {
    stream.write(`${puzObject.date}\tsize issue: ${rows} x ${cols}\n`);
    return false;
  }
  if (badCharCount > 0 || badLengthCount > 0) {
    return false;
  }
  return true;
}

function writeFile() {
  fs.writeFile('./puzDir.json', JSON.stringify(directory), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

writeFile();