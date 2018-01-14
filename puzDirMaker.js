/* jshint esversion: 6 */

var fs = require("fs");
var path = require("path");

let directory = {};
fs.readdir('./puzzles/', (err, years) => {
  years.forEach(year => {
    directory[year.toString()] = {};
    fs.readdir('./puzzles/' + year.toString() + '/', (err, months) => {
      months.forEach(month => {
        fs.readdir('./puzzles/' + year.toString() + '/' + month.toString() + '/', (err, daylist) => {
          directory[year.toString()][month.toString()] = daylist;
        });
      });
    });
  });
});

setTimeout(writeFile, 3000);

function writeFile() {
  fs.writeFile('./public/puzDir.json', JSON.stringify(directory), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
