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

    console.log('oldValue: ', oldValue);
    console.log('newValue: ', newValue);
    // console.log(context);
    // functions.logger.log('oldValue: ', oldValue);
    // functions.logger.log('newValue: ', newValue);
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (
      context.params.uid === null ||
      oldValue.lastChanged > newValue.lastChanged
    ) {
      return null;
    }
    // Otherwise, we convert the lastChanged field to a Date
    // newValue.lastChanged = new Date(newValue.lastChanged);

    // ... and write it to Firestore.
    return db.doc(`users/${context.params.uid}`).set(newValue, { merge: true });
  });

exports.authChanged = functions.https.onCall(async (data, context) => {
  if (context.auth && context.auth.token && context.auth.token.uid) {
    // User is signed in. Updates every time the user signs in, in case there
    // are changes to photo or whatever.
    const uid = context.auth.token.uid;
    const userData = {};
    userData.displayName = context.auth.token.name
      ? context.auth.token.name
      : null;
    userData.photoURL = context.auth.token.picture
      ? context.auth.token.picture
      : null;
    userData.uid = uid;
    userData.privateData = {
      email: context.auth.token.email ? context.auth.token.email : null,
      emailVerified: context.auth.token.email_verified
        ? context.auth.token.email_verified
        : null,
    };
    await db
      .doc(`/users/${uid}`)
      .set(userData, { merge: true })
      .then(() => {
        return uid;
      })
      .catch((err) => {
        console.log('error: ', err);
      });
    return uid;
  }
  return null;
});

/**
 * Sends FCM message to player to notify them that it is their turn.
 * @param {string} uid uid of player
 */
exports.notifyPlayer = functions.https.onCall((uid, context) => {
  return db
    .doc(`users/${uid}`)
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
            icon: 'images/favicon.ico',
            clickAction: 'https://xwordswf.firebaseapp.com',
          },
        };

        admin.messaging().sendToDevice(toKey, payload, {
          collapseKey: 'your-turn',
          timeToLive: 86400,
        });
        return `sent notification to ${uid}`;
      }
      return 'no user key available';
    })
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
});

/**
 * Firebase Cloud Function fetches a new game based on the gameStartParameters
 * parameter in
 * the client's https call and then calls functions to format, save,
 * and return the game from firestore (/games/{id}).  The id is included in
 * the returned game Object as game.docId, and the game is sent back to the
 * client when the client calls httpsCallable(functions, 'startGame')
 * @param {Object} gameStartParameters Object containing player and difficulty information
 * @return {Object} game
 */
exports.startGame = functions.https.onCall((gameStartParameters, context) => {
  return db
    .doc(`/gameCategories/${gameStartParameters.difficulty}/`)
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
    .then(async (gameFromWeb) => {
      const game = parsePuzzle(gameFromWeb);
      game.viewableBy = [
        `${gameStartParameters.initiator.uid}`,
        `${gameStartParameters.opponent.uid}`,
      ];
      game.initiator = {};
      game.initiator.uid = gameStartParameters.initiator.uid;
      game.initiator.displayName = gameStartParameters.initiator.displayName;
      game.initiator.bgColor = 'bgTransRed';
      game.initiator.score = 0;
      game.opponent = {};
      game.opponent.uid = gameStartParameters.opponent.uid;
      game.opponent.displayName = gameStartParameters.opponent.displayName;
      game.opponent.bgColor = 'bgTransBlue';
      game.opponent.score = 0;
      game.difficulty = gameStartParameters.difficulty;
      game.status = 'started';
      game.winner = null;
      game.nextTurn = gameStartParameters.initiator.uid;
      game.start = Date.now();
      // console.log('New parsed puzzle: ', game);
      const gameObj = {};
      gameObj.game = game;
      gameObj.gameId = await newGameId(game);
      return gameObj;
    })
    .catch((error) => {
      console.error('Error fetching puzzle date: ', error);
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
      // TODO: sanitize response to make sure it is safe
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
  // TODO: move below back inside client
  // columns = cols;
  // console.log('parsed puzzle: ', game);
  return game;
}

/**
 * Adds puzzle difficulty and initiator and opponent information.
 * Returns the game id from firestore (/games/{id}).
 * @param {Object} game
 * @returns {string}
 */
function newGameId(game) {
  return db
    .collection('/games/')
    .add(game)
    .then((docRef) => {
      return docRef.id;
    })
    .catch((err) => {
      console.log('Error saving new game: ', err);
    });
}
/**
 * Firebase Cloud Function which returns the result of checking
 * the if answer is correct
 * @param {Object} answerObj Object containing player and difficulty information
 * @return {Object} Object with result of the checked answer
 */
exports.checkAnswer = functions.https.onCall((answerObj, context) => {
  return db
    .doc(`games/${answerObj.gameId}`)
    .get()
    .then((snap) => {
      const game = snap.data();
      const idxArray = answerObj.idxArray;
      const returnObj = { correctAnswer: true };
      const direction = answerObj.acrossWord ? 'across' : 'down';
      const clueNumber = game.puzzle.grid[idxArray[0]].clueNum;
      const player =
        game.initiator.uid === answerObj.myUid ? 'initiator' : 'opponent';
      console.log('answerObj: ', answerObj);
      for (let index = 0; index < answerObj.guess.length; index++) {
        const correctValue = game.answers[idxArray[index]];
        const guess = answerObj.guess[index];
        if (correctValue !== guess) {
          returnObj.correctAnswer = false;
        }
      }
      if (returnObj.correctAnswer) {
        game.puzzle.completedClues[direction].push(clueNumber);
      }
      for (let index = 0; index < answerObj.guess.length; index++) {
        const gridElement = game.puzzle.grid[idxArray[index]];
        const correctValue = game.answers[idxArray[index]];
        const guess = answerObj.guess[index];
        gridElement.guess = guess;
        console.log('Correct letter: ', correctValue);
        console.log('Guess: ', guess);
        if (correctValue === guess) {
          gridElement.value = guess;
          if (gridElement.status === 'locked' && returnObj.correctAnswer) {
            game[player].score += scoreValues[guess];
            console.log('letter score: ', scoreValues[guess]);
          } else if (gridElement.status !== 'locked') {
            game[player].score += scoreCell(game, direction, idxArray[index]);
            // console.log(
            //   'letter score: ',
            //   scoreCell(game, direction, idxArray[index])
            // );
            game.emptySquares--;
            gridElement.bgColor = game[player].bgColor;
            gridElement.status = 'locked';
          }
        }
      }
      if (game.emptySquares === 0) {
        if (game[me].score > game[they].score) {
          game.winner = game[me].uid;
        } else if (game[me].score < game[they].score) {
          game.winner = game[they].uid;
        } else {
          game.winner = 'tie';
        }
        game.status = 'finished';
      }
      game.nextTurn = answerObj.myOpponentUid;
      // save the modified game
      snap.ref.set(game, { merge: true });
      return returnObj;
    });
});

/**
 * Adds score for current cell and adds to score if orthogonal word is completed by
 * this turn.
 * @param {object} game game Object
 * @param {string} direction Direction of clue being solved ('across' or 'down')
 * @param {number} index index of puzzle grid square
 * @return {number} additional score due to completion of orthogonal word
 */
function scoreCell(game, direction, index) {
  console.log('Hello from scoreCell.');
  // get direction for orthogonal word
  const orthoDir = direction === 'across' ? 'down' : 'across';
  const orthoWordArray = getOrthoWordArray(game, orthoDir, index);
  // console.log(orthoWordArray);
  // console.log('direction: ', direction);
  let addedScore = 0;
  for (const idx of orthoWordArray) {
    if (idx !== index && game.puzzle.grid[idx].status !== 'locked') {
      addedScore = 0;
      break;
    }
    addedScore += scoreValues[game.puzzle.grid[idx].value];
  }
  console.log('game.puzzle.grid[index].value: ', game.puzzle.grid[index].value);
  console.log(
    'scoreValues[game.puzzle.grid[index].value: ',
    scoreValues[game.puzzle.grid[index].value]
  );
  console.log('added score: ', addedScore);
  console.log(
    'returned score: ',
    addedScore + scoreValues[game.puzzle.grid[index].value]
  );
  return addedScore + scoreValues[game.puzzle.grid[index].value];
}

/**
 * Returns an array of indices of cells that make up a word block in
 * the current puzzle.
 * @param {object} game game Object
 * @param {string} direction Direction (across or down)
 * @param {number} index index of puzzle grid square
 * @return {array} Array of indices that make up a word block
 */
function getOrthoWordArray(game, direction, index) {
  console.log('Hello from getOrthoWordArray.');
  const rows = game.puzzle.rows;
  const cols = game.puzzle.cols;
  const orthoWordArray = [];
  if (direction === 'across') {
    while (index % cols > 0 && !game.puzzle.grid[index - 1].black) {
      index--;
    }
    while ((index + 1) % cols > 0 * cols && !game.puzzle.grid[index].black) {
      orthoWordArray.push(index);
      index++;
    }
  } else {
    while (index >= cols && !game.puzzle.grid[index - cols].black) {
      index -= cols;
    }
    while (index < rows * cols && !game.puzzle.grid[index].black) {
      orthoWordArray.push(index);
      index += cols;
    }
  }
  return orthoWordArray;
}

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
