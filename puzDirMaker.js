/* jshint esversion: 6 */

var fs = require("fs");
var path = require("path");



  // if (req.url === "/") {
  //   fs.readFile("./index.html", "UTF-8", function(err, html) {
  //     res.writeHead(200, {"Content-Type": "text/html"});
  //     res.end(html);
  //   });
  // } else if (req.url.match(/.css$/)) {
  //   var cssPath = path.join(__dirname, 'styles', req.url);
  //   var fileStream = fs.createReadStream(cssPath, "UTF-8");
  //   res.writeHead(200, {"Content-Type": "text/css"});
  //   fileStream.pipe(res);
  // } else if (req.url.match(/.js$/)) {
  //   var jsPath = path.join(__dirname, 'scripts', req.url);
  //   var jsStream = fs.createReadStream(jsPath);
  //   res.writeHead(200, {"Content-Type": "text/javascript"});
  //   jsStream.pipe(res);
  // } else if (req.url.match(/.json$/)) {
  //   var jsonPath = path.join(__dirname, req.url);
  //   var jsonStream = fs.createReadStream(jsonPath);
  //   res.writeHead(200, {"Content-Type": "text/json"});
  //   jsonStream.pipe(res);
  // } else if (req.url.match(/year$/)) {
  //   fs.readdir('./puzzles/', (err, list) => {
  //     res.writeHead(200, {'Content-Type': 'text/json'});
  //     res.end(JSON.stringify(list));
  //   });
  // } else if (req.url.match(/[0-9]{4}$/)) {
  //   fs.readdir(path.join('./puzzles', req.url), (err, list) => {
  //     res.writeHead(200, {'Content-Type': 'text/json'});
  //     res.end(JSON.stringify(list));
  //   });
  // } else if (req.url.match(/[0-9]{2}$/)) {
  //   fs.readdir(path.join('./puzzles/', req.url), (err, list) => {
  //     res.writeHead(200, {'Content-Type': 'text/json'});
  //     res.end(JSON.stringify(list));
  //   });
  // } else {
  //   res.writeHead(404, {"Content-Type": "text/plain"});
  //   res.end("404 File Not Found");
  // }

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
