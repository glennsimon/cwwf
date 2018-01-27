/* jshint esversion: 6 */

const fs = require('fs');

let easyDir = {};
let medDir = {};
let hardDir = {};

let directory = fs.readFileSync('./app/puzDir.json', 'utf8');
// console.log(directory);
let dir = JSON.parse(directory);

let years = Object.getOwnPropertyNames(dir);
years.forEach(year => {
  easyDir[year.toString()] = {};
  medDir[year.toString()] = {};
  hardDir[year.toString()] = {};
  let months = Object.getOwnPropertyNames(dir[year.toString()]);
  months.forEach(month => {
    easyDir[year.toString()][month.toString()] = [];
    medDir[year.toString()][month.toString()] = [];
    hardDir[year.toString()][month.toString()] = [];
    let days = dir[year.toString()][month.toString()];
    console.log(days);
    days.forEach(day => {
      let puzzle = fs.readFileSync('./puzzles/' + year.toString() + '/' +
        month.toString() + '/' + day.toString(), 'utf8');
      let puzObject = JSON.parse(puzzle);
      // console.log(jsonPuzzle.date);
      let dow = puzObject.dow.toLowerCase();
      if (dow === 'monday' || dow === 'tuesday') {
        easyDir[year.toString()][month.toString()].push(day);
      } else if (dow === 'wednesday' || dow === 'thursday') {
        medDir[year.toString()][month.toString()].push(day);
      } else {
        hardDir[year.toString()][month.toString()].push(day);
      }
    });
  });
});

function writeFile() {
  fs.writeFile('./easyDir.json', JSON.stringify(easyDir), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  fs.writeFile('./medDir.json', JSON.stringify(medDir), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
  fs.writeFile('./hardDir.json', JSON.stringify(hardDir), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

writeFile();
