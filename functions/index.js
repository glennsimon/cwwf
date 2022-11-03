const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const gaxios = require('gaxios');
// const cors = require('cors')({
//   origin: true,
// });
// const { serverTimestamp } = require('firebase/firestore');

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
  .onUpdate(async (change, context) => {
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();
    const statusSnapshot = await change.after.ref.once('value');
    const status = statusSnapshot.val();
    console.log('status: ', status);
    console.log('eventStatus: ', eventStatus);
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (status.lastChanged > eventStatus.lastChanged) {
      return null;
    }
    // Otherwise, we write it to Firestore.
    const userStatusFirestoreRef = db.doc(`users/${context.params.uid}`);
    return userStatusFirestoreRef.set(eventStatus, { merge: true });
  });

exports.userOffline = functions.https.onCall((statusUpdate, context) => {
  const uid = statusUpdate.uid;
  return admin
    .database()
    .ref(`/users/${uid}`)
    .set(statusUpdate.authState)
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
});

exports.authChanged = functions.https.onCall(async (data, context) => {
  if (context.auth && context.auth.token && context.auth.token.uid) {
    console.log('auth token: ', context.auth.token);
    const uid = context.auth.token.uid;
    // Split data into two nested collections for public and private data
    const batch = db.batch();
    const publicDataRef = db.collection('users').doc(uid);
    const privateDataRef = db
      .collection('users')
      .doc(uid)
      .collection('private')
      .doc('data');
    // User is signed in. Updates every time the user signs in, in case there
    // are changes to photo or whatever.
    const publicData = {};
    publicData.displayName = context.auth.token.name
      ? context.auth.token.name
      : null;
    publicData.photoURL = context.auth.token.picture
      ? context.auth.token.picture
      : null;
    publicData.uid = uid;
    publicData.signInProvider = context.auth.token.firebase.sign_in_provider;
    const privateData = {
      email: context.auth.token.email ? context.auth.token.email : null,
      emailVerified: context.auth.token.email_verified
        ? context.auth.token.email_verified
        : null,
    };
    batch.set(publicDataRef, publicData, { merge: true });
    batch.set(privateDataRef, privateData, { merge: true });
    await batch.commit();
    return;
  }
  return;
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
  // console.log('context: ', context);
  return db
    .doc(`/gameCategories/${gameStartParameters.difficulty}/`)
    .get()
    .then((doc) => {
      return JSON.parse(doc.data().dates);
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
      const batch = db.batch();
      const gamesDocRef = db.collection('games').doc();
      const gameListDataRef = db.doc(`gameListBuilder/${gamesDocRef.id}`);
      const gameHiddenAnswersRef = db.doc(
        `games/${gamesDocRef.id}/hidden/answers/`
      );

      const gameListData = {};
      gameListData.players = gameStartParameters.players;
      gameListData.viewableBy = Object.keys(gameStartParameters.players);
      gameListData.start = Date.now();
      gameListData.status = 'started';
      gameListData.nextTurn = context.auth.uid;
      batch.set(gameListDataRef, gameListData);

      const answersObj = {};
      answersObj.answerKey = gameFromWeb.grid;
      batch.set(gameHiddenAnswersRef, answersObj);

      const game = parsePuzzle(gameFromWeb);
      game.players = gameStartParameters.players;
      const players = Object.keys(game.players);
      for (const player of players) {
        game.players[player].score = 0;
      }
      game.difficulty = gameStartParameters.difficulty;
      game.status = 'started';
      game.winner = null;
      game.nextTurn = context.auth.uid;
      game.start = gameListData.start;
      game.lastTurnCheckObj = { newGame: true };

      // console.log('New parsed puzzle: ', game);

      batch.set(gamesDocRef, game);

      await batch.commit();

      const gameObj = {};
      gameObj.game = game;
      // gameObj.gameListData = gameListData;
      gameObj.gameId = gamesDocRef.id;
      return gameObj;
    })
    .catch((error) => {
      functions.logger.error('Error fetching puzzle date: ', error);
      // console.error('Error fetching puzzle date: ', error);
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
  game.clueNumIndices = {};
  for (let i = 0; i < puzzle.grid.length; i++) {
    game.puzzle.grid[i] = {};
    if (puzzle.grid[i] === '.') {
      game.puzzle.grid[i].black = true;
      game.emptySquares--;
    } else {
      game.puzzle.grid[i].black = false;
      game.puzzle.grid[i].value = '';
      if (puzzle.gridnums[i] === 0) {
        game.puzzle.grid[i].clueNum = '';
      } else {
        game.puzzle.grid[i].clueNum = puzzle.gridnums[i].toString();
        game.clueNumIndices[puzzle.gridnums[i].toString()] = i;
      }
      game.puzzle.grid[i].status = 'free';
      game.puzzle.grid[i].circle = puzzle.circles && puzzle.circles[i] === 1;
    }
  }
  // console.log('parsed puzzle: ', game);
  return game;
}

let checkAnswerResult = [];

/**
 * Firebase Cloud Function which returns the result of checking
 * the if answer is correct
 * @param {Object} answerObj Object containing player and difficulty information
 * @return {Object} Object with result of the checked answer
 */
exports.checkAnswer = functions.https.onCall(async (answerObj, context) => {
  const gameRef = db.doc(`games/${answerObj.gameId}`);
  const answersRef = db.doc(`games/${answerObj.gameId}/hidden/answers`);
  const gameListRef = db.doc(`gameListBuilder/${answerObj.gameId}`);
  const lastTurnCheckObj = { correctAnswer: true };
  try {
    await db.runTransaction(async (tx) => {
      const game = (await tx.get(gameRef)).data();
      const answers = (await tx.get(answersRef)).data();
      const gameList = (await tx.get(gameListRef)).data();
      const idxArray = answerObj.idxArray;
      const direction = answerObj.acrossWord ? 'across' : 'down';
      const clueNumber = game.puzzle.grid[idxArray[0]].clueNum;
      const player = answerObj.playerUid;
      const bgColor = game.players[player].bgColor.match(/blue/i)
        ? 'rgba(0, 0, 255, 0.5)'
        : 'rgba(255, 0, 0, 0.5)';
      console.log('answerObj: ', answerObj);
      for (let index = 0; index < answerObj.guess.length; index++) {
        const correctValue = answers.answerKey[idxArray[index]];
        const guess = answerObj.guess[index];
        if (correctValue !== guess) {
          lastTurnCheckObj.correctAnswer = false;
        }
      }
      console.log('lastTurnCheckObj: ', lastTurnCheckObj);
      if (lastTurnCheckObj.correctAnswer) {
        game.puzzle.completedClues[direction].push(parseInt(clueNumber));
      }
      checkAnswerResult = [];
      for (let index = 0; index < answerObj.guess.length; index++) {
        const gridElement = game.puzzle.grid[idxArray[index]];
        const correctValue = answers.answerKey[idxArray[index]];
        const guess = answerObj.guess[index];
        if (gridElement.guessArray) {
          gridElement.guessArray.push(guess);
        } else {
          gridElement.guessArray = [guess];
        }
        const cellResult = {};
        cellResult.guess = guess;
        cellResult.correctLetter = correctValue;
        cellResult.index = idxArray[index];
        console.log('Correct letter: ', correctValue);
        console.log('Guess: ', guess);
        if (correctValue === guess) {
          gridElement.value = guess;
          cellResult.bgColor = bgColor;
          if (
            gridElement.status === 'locked' &&
            lastTurnCheckObj.correctAnswer
          ) {
            game.players[player].score += scoreValues[guess];
            cellResult.score = scoreValues[guess];
            checkAnswerResult.push(cellResult);
            console.log('letter score: ', scoreValues[guess]);
          } else if (gridElement.status !== 'locked') {
            const scoreObj = scoreCell(
              game,
              direction,
              idxArray[index],
              bgColor
            );
            game.players[player].score += scoreObj.scoreChange;
            if (scoreObj.pushClue)
              game.puzzle.completedClues[scoreObj.dir].push(
                parseInt(scoreObj.pushClue)
              );
            cellResult.score = scoreValues[guess];
            checkAnswerResult.push(cellResult);
            // console.log(
            //   'letter score: ',
            //   scoreCell(game, direction, idxArray[index])
            // );
            game.emptySquares--;
            gridElement.bgColor = game.players[player].bgColor;
            gridElement.status = 'locked';
          }
        } else {
          cellResult.bgColor = 'red';
          cellResult.score = 0;
          checkAnswerResult.push(cellResult);
        }
      }
      game.nextTurn = answerObj.myOpponentUid;
      gameList.nextTurn = answerObj.myOpponentUid;
      if (game.emptySquares === 0) {
        if (game[me].score > game[they].score) {
          game.winner = game[me].uid;
        } else if (game[me].score < game[they].score) {
          game.winner = game[they].uid;
        } else {
          game.winner = 'tie';
        }
        gameList.winner = game.winner;
        game.status = 'finished';
        const finishDate = Date.now();
        game.finish = finishDate;
        gameList.status = 'finished';
        gameList.finish = finishDate;
      }
      lastTurnCheckObj.checkAnswerResult = checkAnswerResult;
      lastTurnCheckObj.playerUid = answerObj.playerUid;
      game.lastTurnCheckObj = lastTurnCheckObj;
      // save the modified game and the gameListBuilder doc
      tx.update(gameRef, game).update(gameListRef, gameList);
    });
    functions.logger.log('checkAnswer transaction success!');
  } catch (error) {
    functions.logger.error('checkAnswer transaction failure: ', error);
  }
  return;
});

/**
 * Adds score for current cell and adds to score if orthogonal word is completed by
 * this turn.
 * @param {object} game game Object
 * @param {string} direction Direction of clue being solved ('across' or 'down')
 * @param {number} index index of puzzle grid square
 * @param {string} bgColor Background color, css color or html color
 * @return {number} additional score due to completion of orthogonal word
 */
function scoreCell(game, direction, index, bgColor) {
  console.log('Hello from scoreCell.');
  // get direction for orthogonal word
  const orthoDir = direction === 'across' ? 'down' : 'across';
  const orthoWordArray = getOrthoWordArray(game, orthoDir, index);
  // console.log('direction: ', direction);
  let addedScore = 0;
  let addedResults = [];
  let clueNum = game.puzzle.grid[orthoWordArray[0]].clueNum;
  console.log('ortho word array: ', orthoWordArray);
  for (const idx of orthoWordArray) {
    const correctLetter = game.puzzle.grid[idx].value;
    const cellResult = {};
    cellResult.correctLetter = correctLetter;
    cellResult.index = idx;
    cellResult.score = scoreValues[correctLetter];
    cellResult.bgColor = bgColor;
    if (idx !== index && game.puzzle.grid[idx].status !== 'locked') {
      addedScore = 0;
      addedResults = [];
      clueNum = null;
      break;
    }
    addedScore += scoreValues[correctLetter];
    addedResults.push(cellResult);
  }
  checkAnswerResult = checkAnswerResult.concat(addedResults);
  console.log('game.puzzle.grid[index].value: ', game.puzzle.grid[index].value);
  console.log(
    'scoreValues[game.puzzle.grid[index].value]: ',
    scoreValues[game.puzzle.grid[index].value]
  );
  console.log('added score: ', addedScore);
  console.log('addedResults: ', addedResults);
  console.log(
    'returned score: ',
    addedScore + scoreValues[game.puzzle.grid[index].value]
  );
  return {
    scoreChange: addedScore + scoreValues[game.puzzle.grid[index].value],
    pushClue: clueNum,
    dir: orthoDir,
  };
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
    do {
      orthoWordArray.push(index);
      index++;
    } while (index % cols > 0 && !game.puzzle.grid[index].black);
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

exports.abandonGame = functions.https.onCall(async (abandonObj, context) => {
  const gameRef = db.doc(`games/${abandonObj.gameId}`);
  const answersRef = db.doc(`games/${abandonObj.gameId}/hidden/answers`);
  const gameListRef = db.doc(`gameListBuilder/${abandonObj.gameId}`);
  try {
    await db.runTransaction(async (tx) => {
      const game = (await tx.get(gameRef)).data();
      const answers = (await tx.get(answersRef)).data().answerKey;
      const gameListDoc = (await tx.get(gameListRef)).data();
      const myUid = context.auth.uid;
      const oppUid = abandonObj.opponentUid;
      gameListDoc.status = 'finished';
      // console.log('gameListDoc: ', gameListDoc);
      // const they =
      //   game.initiator.uid === abandonObj.opponentUid
      //     ? 'initiator'
      //     : 'opponent';
      // const me = they === 'initiator' ? 'opponent' : 'initiator';
      // console.log('abandonObj: ', abandonObj);
      for (let index = 0; index < answers.length; index++) {
        if (answers[index] === '.') continue;
        if (game.puzzle.grid[index].status === 'locked') continue;
        const letter = answers[index];
        game.puzzle.grid[index].value = answers[index];
        if (game.puzzle.grid[index].guessArray) {
          game.puzzle.grid[index].guessArray.push(answers[index]);
        } else {
          game.puzzle.grid[index].guessArray = [answers[index]];
        }
        game.puzzle.grid[index].status = 'locked';
        game.puzzle.grid[index].bgColor = game.players[oppUid].bgColor;
        game.players[oppUid].score += scoreValues[letter];
      }
      game.status = 'finished';
      const finishDate = Date.now();
      game.finish = finishDate;
      game.winner = 'tie';
      game.emptySquares = 0;
      if (game.players[myUid].score > game.players[oppUid].score) {
        game.winner = myUid;
      } else if (game.players[myUid].score < game.players[oppUid].score) {
        game.winner = oppUid;
      }
      gameListDoc.winner = game.winner;
      gameListDoc.finish = finishDate;
      game.lastTurnCheckObj = { abandoned: true };
      // save the modified game and the gameListBuilder doc
      tx.update(gameRef, game).update(gameListRef, gameListDoc);
    });
    functions.logger.log('abandonGame transaction success!');
  } catch (error) {
    functions.logger.error('abandonGame transaction failure: ', error);
  }
  return;
});

// exports.updateData = functions.https.onRequest((req, res) => {
//   cors(req, res, async () => {
//     const gamesRef = db.collection('games');
//     const snapshot = await gamesRef.get();
//     if (snapshot.empty) {
//       console.log('No matching documents.');
//       return;
//     }
//     snapshot.forEach(async (doc) => {
//       const gameId = doc.id;
//       const gameRef = db.doc(`games/${gameId}`);
//       const answersRef = db.doc(`games/${gameId}/hidden/answers`);
//       const gameListRef = db.doc(`gameListBuilder/${gameId}`);
//       try {
//         await db.runTransaction(async (tx) => {
//           const game = (await tx.get(gameRef)).data();
//           const answers = (await tx.get(answersRef)).data().answerKey || [];
//           console.log('answers: ', answers);
//           const gameListDoc = (await tx.get(gameListRef)).data();
//           console.log('gameListDoc: ', gameListDoc);

//           // for (let index = 0; index < 225; index++) {
//           //   const gridIndex = game.puzzle.grid[index];
//           //   if (gridIndex.black) {
//           //     answers.push('.');
//           //   } else {
//           //     answers.push(game.puzzle.grid[index].value);
//           //   }
//           //   if (gridIndex.status !== 'locked') {
//           //     gridIndex.guessArray = [gridIndex.guess];
//           //   } else {
//           //     gridIndex.value = '';
//           //   }
//           //   const clueNumIndices = {};
//           //   if (gridIndex.clueNum !== '') {
//           //     clueNumIndices[gridIndex.clueNum] = index;
//           //   }
//           // }
//           // game.clueNumIndices = clueNumIndices;
//           // game.finish = game.start;

//           // const players = {};
//           // players[game.initiator.uid] = {};
//           // players[game.initiator.uid].bgColor = game.initiator.bgColor;
//           // players[game.initiator.uid].displayName = game.initiator.displayName;
//           // players[game.initiator.uid].photoURL = game.initiator.photoURL;
//           // players[game.opponent.uid] = {};
//           // players[game.opponent.uid].bgColor = game.opponent.bgColor;
//           // players[game.opponent.uid].displayName = game.opponent.displayName;
//           // players[game.opponent.uid].photoURL = game.opponent.photoURL;
//           // game.players = players;
//           // gameListDoc.players = players;
//           // gameListDoc.nextTurn = game.nextTurn;
//           // game.viewableBy = [game.initiator.uid, game.opponent.uid];
//           // gameListDoc.viewableBy = [game.initiator.uid, game.opponent.uid];
//           // gameListDoc.winner = game.winner;

//           tx.update(gameRef, game)
//             .update(gameListRef, gameListDoc)
//             .update(answersRef, answers);
//         });
//         functions.logger.log('updateData transaction success!');
//       } catch (error) {
//         functions.logger.error('updateData transaction failure: ', error);
//       }
//     });
//     res.status(200).send('{"updateData": "Success!"}'); //(formattedDate);
//   });
// });
