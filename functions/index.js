const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const gaxios = require('gaxios');
// admin.initializeApp();
admin.initializeApp();

const db = admin.firestore();
console.log('Hello from index.js');

// Create a new function which is triggered on changes to /users/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
  .ref('/users/{uid}')
  .onUpdate((change, context) => {
    // Get the data written to Realtime Database
    const newValue = change.after.val();
    const oldValue = change.before.val();

    // console.log('oldValue: ', oldValue);
    // console.log('newValue: ', newValue);
    // console.log(context);
    functions.logger.log('oldValue: ', oldValue);
    functions.logger.log('newValue: ', newValue);
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (context.params.uid === null) {
      return null;
    }

    // Otherwise, we convert the lastChanged field to a Date
    // newValue.lastChanged = new Date(newValue.lastChanged);

    // ... and write it to Firestore.
    return db.doc(`users/${context.params.uid}`).set(newValue, { merge: true });
  });

exports.updateUser = functions.firestore
  .document('games/{gameId}')
  .onUpdate((change, context) => {
    const newValue = change.after.data();
    const previousValue = change.before.data();

    if (newValue.nextTurn !== previousValue.nextTurn) {
      notifyPlayer(newValue.nextTurn);
      return 'success!';
    }
    return 'no change';
  });

/**
 * Sends   to player
 * @param {string} uid uid of player
 */
function notifyPlayer(uid) {
  db.doc(`users/${uid}`)
    .get()
    .then((doc) => {
      return doc.data().msgToken;
    })
    .then((toKey) => {
      if (toKey) {
        functions.logger.log('got users messagetoken: ', toKey);

        const notification = {
          topic: 'your-turn',
          notification: {
            title: 'Your turn!',
            body: 'Your opponent has played their turn',
            icon: 'favicon.ico',
            click_action: 'https://xwordswf.firebaseapp.com',
          },
        };

        return admin.messaging().sendToDevice(toKey, notification);
      }
      return 'no user key available';
    })
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
}

/**
 * This function fetches a new game based on the data value (gameInfo) in
 * the user's https call and then calls functions to format, save,
 * and return the game id from firestore (/games/{id}).
 */
exports.startGame = functions.https.onCall((gameInfo, context) => {
  // TODO: move this back inside client
  // document.getElementById('puzTitle').innerText = 'Fetching data...';
  // TODO: move this back inside client
  // location.hash = '#puzzle';
  // TODO: move this back inside client
  // myTurn = true;
  // columns = cols;
  // console.log(game.puzzle);

  // gameInfo contains game difficulty level and information about
  // the players.
  // console.log('startGame triggered. gameInfo: ', gameInfo);

  return db
    .doc(`/gameCategories/${gameInfo.difficulty}/`)
    .get()
    .then((doc) => {
      return JSON.parse(doc.data().lookup);
    })
    .then((library) => {
      // console.log(library);

      let seedObject = {};

      const years = Object.getOwnPropertyNames(library);
      // console.log(years);
      const year = years[Math.floor(Math.random() * years.length)];
      const months = Object.getOwnPropertyNames(library[year]);
      const month = months[Math.floor(Math.random() * months.length)];
      const days = library[year][month];
      const day = days[Math.floor(Math.random() * days.length)];

      seedObject.day = day;
      seedObject.month = month;
      seedObject.year = year;
      return seedObject;
    })
    .then((seedObject) => {
      seedObject.difficulty = gameInfo.difficulty;
      seedObject.initiator = gameInfo.initiator;
      seedObject.opponent = gameInfo.opponent;
      // console.log(seedObject);
      // const returnedPuz = newPuzzle(seedObject);
      return newPuzzle(seedObject);
    })
    .then((game) => {
      // console.log('New parsed puzzle: ', game);
      return saveNewPuzzle(game, gameInfo);
    })
    .then((saveObj) => {
      const game = saveObj.game;
      game.docId = saveObj.docRef.id;
      delete game.answers;
      console.log('game: ', game);
      return game;
    })
    .catch((error) => {
      console.error('Error fetching puzzle date: ', error);
    });
});

exports.playTurn = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
});

exports.abandonGame = functions.https.onCall((data, context) => {
  const uid = context.auth.uid;
});

/**
 * Randomly select a new puzzle based on seedObject.difficulty value.
 * Returns puzzle parsed for use in the app.
 * @param {Object} seedObject
 * @return {Object}
 */
function newPuzzle(seedObject) {
  const baseUrl =
    'https://raw.githubusercontent.com/doshea/nyt_crosswords/master';
  const url = `${baseUrl}/${seedObject.year}/${seedObject.month}/${seedObject.day}`;
  return gaxios
    .request({ url: url })
    .then((response) => {
      // console.log('fetched puzzle: ', response.data);
      return parsePuzzle(response.data);
    })
    .catch((err) => {
      console.log('Error fetching from CDN: ', err);
    });
}

/**
 * Parses puzzle from CDN for use in game app, returns parsed puzzle.
 * @param {Object} puzzle
 * @returns {Object}
 */
function parsePuzzle(puzzle) {
  const rows = puzzle.size.rows;
  const cols = puzzle.size.cols;
  const game = {};
  game.answers = puzzle.grid;
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
  game.puzzle.completedClues = {};
  game.puzzle.completedClues.across = [];
  game.puzzle.completedClues.down = [];
  game.puzzle.grid = [];
  for (let i = 0; i < puzzle.grid.length; i++) {
    game.puzzle.grid[i] = {};
    if (puzzle.grid[i] === '.') {
      game.puzzle.grid[i].black = true;
      game.emptySquares--;
    } else {
      game.puzzle.grid[i].black = false;
      game.puzzle.grid[i].value = '';
      game.puzzle.grid[i].clueNum =
        puzzle.gridnums[i] === 0 ? '' : puzzle.gridnums[i];
      game.puzzle.grid[i].status = 'free';
      game.puzzle.grid[i].circle = puzzle.circles && puzzle.circles[i] === 1;
    }
  }
  // TODO: move this back inside client
  // columns = cols;
  // console.log('parsed puzzle: ', game);

  return game;
}

/**
 * Adds puzzle difficulty and initiator and opponent information.
 * Returns the game id from firestore (/games/{id}).
 * @param {Object} game
 * @param {Object} gameInfo
 * @returns {string}
 */
async function saveNewPuzzle(game, gameInfo) {
  game.initiator = {};
  game.initiator.uid = gameInfo.initiator.uid;
  game.initiator.displayName = gameInfo.initiator.displayName;
  game.initiator.bgColor = 'bgTransRed';
  game.initiator.score = 0;
  game.opponent = {};
  game.opponent.uid = gameInfo.opponent.uid;
  game.opponent.displayName = gameInfo.opponent.displayName;
  game.opponent.bgColor = 'bgTransBlue';
  game.opponent.score = 0;
  game.difficulty = gameInfo.difficulty;
  game.status = 'started';
  game.winner = null;
  game.nextTurn = gameInfo.initiator.uid;
  const docRef = await db
    .collection('/games/')
    .add(game)
    .catch((err) => {
      console.log('Error saving new game: ', err);
    });
  return { docRef: docRef, game: game };
}
