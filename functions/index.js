const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const gaxios = require('gaxios');
const { serverTimestamp } = require('firebase/firestore');
// admin.initializeApp();
admin.initializeApp();

const db = admin.firestore();
console.log('Hello from index.js');

const scoreValues = {
  A: 1,
  B: 4,
  C: 4,
  D: 2,
  E: 1,
  F: 4,
  G: 3,
  H: 4,
  I: 1,
  J: 10,
  K: 5,
  L: 2,
  M: 4,
  N: 2,
  O: 1,
  P: 4,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 2,
  V: 5,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10,
};

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
 * Sends FCM message to player to notify them that it is their turn.
 * @param {string} uid uid of player
 */
function notifyPlayer(uid) {
  db.doc(`users/${uid}`)
    .get()
    .then((doc) => {
      console.log('msgToken: ', doc.data().msgToken);
      return doc.data().msgToken;
    })
    .then((toKey) => {
      if (toKey) {
        // functions.logger.log('got users messagetoken: ', toKey);

        const payload = {
          notification: {
            title: 'Your turn!',
            body: 'Your opponent has played their turn',
            icon: 'assets/favicon.ico',
            clickAction: 'https://xwordswf.firebaseapp.com',
          },
        };

        return admin.messaging().sendToDevice(toKey, payload, {
          collapseKey: 'your-turn',
          timeToLive: 86400,
        });
      }
      return 'no user key available';
    })
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
}

/**
 * Firebase Cloud Function fetches a new game based on the gameInfo
 * parameter in
 * the client's https call and then calls functions to format, save,
 * and return the game from firestore (/games/{id}).  The id is included in
 * the returned game Object as game.docId, and the game is sent back to the
 * client when the client calls httpsCallable(functions, 'startGame')
 * @param {Object} gameInfo Object containing player and difficulty information
 * @return {Object} game
 */
exports.startGame = functions.https.onCall((gameInfo, context) => {
  return db
    .doc(`/gameCategories/${gameInfo.difficulty}/`)
    .get()
    .then((doc) => {
      return JSON.parse(doc.data().lookup);
    })
    .then((library) => {
      let seedObject = {};

      const years = Object.getOwnPropertyNames(library);
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
      // console.log(seedObject);
      return newPuzzle(seedObject);
    })
    .then((gameFromWeb) => {
      const game = parsePuzzle(gameFromWeb);
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
      game.start = Date(serverTimestamp());
      // console.log('New parsed puzzle: ', game);
      return newGameId(game);
    })
    .catch((error) => {
      console.error('Error fetching puzzle date: ', error);
    });
});

/**
 * Firebase Cloud Function which returns the result of checking
 * the if answer is correct
 * @param {Object} answerObj Object containing player and difficulty information
 * @return {Object} Object with result of the checked answer
 */
exports.isCorrect = functions.https.onCall((answerObj, context) => {
  return db
    .doc(`games/${answerObj.gameId}`)
    .get()
    .then((doc) => {
      const game = doc.data();
      // console.log(game);
      console.log('answerObj: ', answerObj);
      for (let index = 0; index < answerObj.guess.length; index++) {
        const correctValue = game.answers[answerObj.idxArray[index]];
        const guess = answerObj.guess[index];
        console.log('Correct answer: ', correctValue);
        console.log('Guess: ', guess);
        if (correctValue !== guess) {
          return false;
        }
      }
      return true;
    });
});

exports.abandonGame = functions.https.onCall((abandonObj, context) => {
  db.doc(`games/${abandonObj.gameId}`)
    .get()
    .then((doc) => {
      const game = doc.data();
      const answers = game.answers;
      const they =
        game.initiator.uid === abandonObj.opponentUid
          ? 'initiator'
          : 'opponent';
      const me = they === 'initiator' ? 'opponent' : 'initiator';
      // console.log('answerObj: ', abandonObj);
      for (let index = 0; index < answers.length; index++) {
        if (answers[index] === '.') continue;
        if (game.puzzle.grid[index].status === 'locked') continue;
        const letter = answers[index];
        game.puzzle.grid[index].value = answers[index];
        game.puzzle.grid[index].guess = answers[index];
        game.puzzle.grid[index].status = 'locked';
        game.puzzle.grid[index].bgColor = game[they].bgColor;
        game[they].score += scoreValues[letter];
      }
      game.status = 'finished';
      game.winner = 'tie';
      game.emptySquares = 0;
      if (game[me].score > game[they].score) {
        game.winner = abandonObj.myUid;
      } else if (game[me].score < game[they].score) {
        game.winner = abandonObj.opponentUid;
      }
      return game;
    })
    .then((game) => {
      db.doc(`games/${abandonObj.gameId}`).set(game, { merge: true });
      return;
    })
    .catch((err) => {
      console.log('Error abandoning game: ', err);
    });
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
      return response.data;
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
async function newGameId(game) {
  const docRef = await db
    .collection('/games/')
    .add(game)
    .catch((err) => {
      console.log('Error saving new game: ', err);
    });
  return docRef.id;
}
