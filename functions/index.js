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
exports.userStatusChanged = functions.database
  .ref('/users/{uid}')
  .onUpdate(async (change, context) => {
    console.log('Hello from userStatusChanged.');
    // Get the data written to Realtime Database
    const eventStatus = change.after.val();
    const statusSnapshot = await change.after.ref.once('value');
    const status = statusSnapshot.val();
    // console.log('status: ', status);
    // console.log('eventStatus: ', eventStatus);
    // If the current timestamp for this data is newer than
    // the data that triggered this event, we exit this function.
    if (status.lastChanged > eventStatus.lastChanged) {
      return null;
    }
    // Otherwise, we write it to Firestore.
    const userStatusFirestoreRef = db.doc(`users/${context.params.uid}`);
    userStatusFirestoreRef.set(eventStatus, { merge: true });
    return null;
  });

exports.userOffline2 = functions.https.onCall(async (statusUpdate, context) => {
  console.log('Hello from userOffline2.');
  const uid = statusUpdate.uid;
  return admin
    .database()
    .ref(`/users/${uid}`)
    .set(statusUpdate.authState)
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
});

exports.authChange = functions.https.onCall(async (data, context) => {
  console.log('Hello from authChange.');
  if (context.auth && context.auth.token && context.auth.token.uid) {
    // console.log('auth token: ', context.auth.token);
    const uid = context.auth.token.uid;
    // Split data into two nested collections for public and private data
    const publicDataRef = db.collection('users').doc(uid);
    const privateDataRef = db
      .collection('users')
      .doc(uid)
      .collection('private')
      .doc('data');
    // User is signed in. User data updates every time the user signs in,
    // in case there are changes to photo or whatever.
    try {
      let publicData = null;
      db.runTransaction(async (tx) => {
        publicData = (await tx.get(publicDataRef)).data();
        let privateData = (await tx.get(privateDataRef)).data();
        if (!publicData)
          publicData = { friends: ['3eoDltvYiwYfjPviYRRQ2agbsAz1'] };
        publicData.blocked = publicData.blocked || [];
        publicData.displayName =
          context.auth.token.name || publicData.displayName || null;
        publicData.prefName =
          publicData.prefName || publicData.displayName || 'Anonymous';
        publicData.photoURL = context.auth.token.picture || null;
        publicData.signInProvider =
          context.auth.token.firebase.sign_in_provider || 'none';
        publicData.uid = uid;
        if (!privateData) privateData = {};
        privateData.email =
          context.auth.token.email || privateData.email || null;
        privateData.emailVerified =
          context.auth.token.email_verified ||
          privateData.emailVerified ||
          null;
        tx.set(publicDataRef, publicData, { merge: true }).set(
          privateDataRef,
          privateData,
          { merge: true }
        );
      });
      return publicData;
    } catch (error) {
      functions.logger.error('authChange transaction failure: ', error);
      return;
    }
  }
});

exports.updateFriends = functions.https.onCall(async (data, context) => {
  const publicDataRef = db.collection('users').doc(data.uid);
  try {
    await db.runTransaction(async (tx) => {
      const user = (await tx.get(publicDataRef)).data();
      user.friends = data.friends;
      user.blocked = data.blocked;
      tx.update(publicDataRef, user);
    });
    functions.logger.log('addFriends transaction success!');
  } catch (error) {
    functions.logger.error('addFriends transaction failure: ', error);
  }
  return null;
});

exports.pendingPlayer = functions.https.onCall(async (data, context) => {
  console.log('Hello from pendingPlayer.');
  if (context.auth && context.auth.token && context.auth.token.uid) {
    // console.log('auth token: ', context.auth.token);
    const uid = context.auth.token.uid;
    // Split data into two nested collections for public and private data
    const inviterRef = db.doc(`users/${uid}`);
    const inviteeRef = db.collection('users').doc();
    try {
      let inviteeId = inviteeRef.id;
      return db.runTransaction(async (tx) => {
        const inviter = (await tx.get(inviterRef)).data();
        if (inviter.friends) {
          inviter.friends.push(inviteeId);
        } else {
          inviter.friends = [inviteeId];
        }
        const invitee = {
          initiator: uid,
          uid: inviteeId,
          friends: [uid],
          photoURL: null,
          signInProvider: 'none',
          displayName: data.firstName + ' (pending)',
        };
        tx.update(inviterRef, inviter).set(inviteeRef, invitee);
        functions.logger.log('pendingPlayer transaction success!');
        return inviteeId;
      });
    } catch (error) {
      functions.logger.error('pendingPlayer transaction failure: ', error);
      return null;
    }
  }
  return null;
});

exports.updatePendingPlayer = functions.https.onCall(async (data, context) => {
  console.log('Hello from updatePendingPlayer.');
  // console.log('auth token: ', context.auth.token);
  const uid = context.auth.token.uid;
  const gameRef = db.doc(`games/${data.gameId}`);
  const gameListRef = db.doc(`gameListBuilder/${data.gameId}`);
  const pendingRef = db.doc(`users/${data.pendingUid}`);
  const newUserRef = db.doc(`users/${uid}`);
  try {
    return db.runTransaction(async (tx) => {
      const pendingUser = (await tx.get(pendingRef)).data();
      console.log('pendingUser: ', pendingUser);
      if (!pendingUser) {
        return null;
      }
      const initiatorUid = pendingUser.initiator;
      let newUser = (await tx.get(newUserRef)).data();
      console.log('newUser: ', newUser);
      // console.log('newUser before: ', newUser);
      // if (!newUser) {
      newUser = { friends: [initiatorUid] };
      newUser.displayName =
        newUser.displayName || pendingUser.displayName.split(' ')[0];
      newUser.uid = uid;
      newUser.photoURL = context.auth.token.picture || null;
      newUser.blocked = [];
      newUser.prefName = context.auth.token.name || null;
      newUser.signInProvider =
        context.auth.token.firebase.sign_in_provider || 'none';

      const game = (await tx.get(gameRef)).data();
      const gameListDoc = (await tx.get(gameListRef)).data();
      console.log('gameListDoc before: ', gameListDoc);
      if (game.players[data.pendingUid]) {
        game.players[uid] = game.players[data.pendingUid];
        delete game.players[data.pendingUid];
      }
      if (gameListDoc.players[data.pendingUid]) {
        gameListDoc.players[uid] = gameListDoc.players[data.pendingUid];
        delete gameListDoc.players[data.pendingUid];
        gameListDoc.viewableBy.splice(
          gameListDoc.viewableBy.indexOf(data.pendingUid),
          1,
          uid
        );
      }
      if (gameListDoc.nextTurn === data.pendingUid) gameListDoc.nextTurn = uid;
      if (gameListDoc.winner === data.pendingUid) gameListDoc.winner = uid;
      if (game.nextTurn === data.pendingUid) game.nextTurn = uid;
      if (game.winner === data.pendingUid) game.winner = uid;
      if (game.lastTurnCheckObj.playerUid === data.pendingUid)
        game.lastTurnCheckObj.playerUid = uid;
      console.log('gameListDoc after: ', gameListDoc);

      // } else {
      //   newUser.friends.push(initiatorUid);
      // }
      // console.log('newUser after: ', newUser);
      const initiatorRef = db.doc(`users/${initiatorUid}`);
      const initiator = (await tx.get(initiatorRef)).data();
      if (!initiator.friends) {
        initiator.friends = [uid];
      } else if (initiator.friends.includes(data.pendingUid)) {
        initiator.friends.splice(
          initiator.friends.indexOf(data.pendingUid),
          1,
          uid
        );
      } else {
        initiator.friends.push(uid);
      }

      tx.update(gameRef, game)
        .update(gameListRef, gameListDoc)
        .set(newUserRef, newUser)
        .update(initiatorRef, initiator)
        .delete(pendingRef);
      functions.logger.log('updatePendingPlayer transaction success!');
      return newUser;
    });
  } catch (error) {
    functions.logger.error('updatePendingPlayer transaction failure: ', error);
    return null;
  }
});

/**
 * Sends FCM message to player to notify them that it is their turn.
 * @param {string} uid uid of player
 * @param {string} gameId game id
 */
function notifyPlayer(uid, gameId) {
  console.log('Hello from notifyPlayer.');
  return db
    .doc(`users/${uid}/private/data`)
    .get()
    .then(async (doc) => {
      // console.log('msgTokens: ', doc.data().msgTokens);
      return await doc.data().msgTokens;
    })
    .then(async (toKeys) => {
      if (toKeys) {
        console.log('got users messagetoken(s): ', toKeys);

        const payload = {
          topic: 'xwwf',
          notification: {
            title: 'Your turn!',
            body: 'Your opponent has played their turn',
            // icon: './images/icon-128.png',
          },
          webpush: {
            fcmOptions: {
              link: `puzzle?gameId=${gameId}`,
            },
            notification: {
              headers: 'https://xwordswf.web.app/images/icon-128.png',
            },
          },
          android: {
            collapseKey: 'android-xwwf',
            ttl: 3600000,
            notification: {
              imageUrl: 'https://xwordswf.web.app/images/icon-128.png',
              tag: 'android-xwwf-tag',
            },
          },
          apns: {
            payload: {
              aps: {
                'mutable-content': 1,
              },
            },
            fcm_options: {
              image: 'https://xwordswf.web.app/images/icon-128.png',
            },
          },
          tokens: toKeys,
        };

        const messagingResponse = await admin
          .messaging()
          .sendMulticast(payload);
        // .sendToDevice(toKeys, payload);
        console.log(`messagingResponse: ${messagingResponse}`);
        // TODO: handle failed notifications
        // (see https://firebase.google.com/codelabs/firebase-cloud-functions#9)
        return messagingResponse;
      }
      console.log('no user key available');
      return;
    })
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
}

exports.deleteFailedGame = functions.https.onCall(async (idObj, context) => {
  const gamesHiddenRef = db
    .collection('games')
    .doc(idObj.gameId)
    .collection('hidden')
    .doc('answers');
  const gamesRef = db.collection('games').doc(idObj.gameId);
  const gameListRef = db.collection('gameListBuilder').doc(idObj.gameId);
  try {
    await db.runTransaction(async (tx) => {
      tx.delete(gamesHiddenRef).delete(gamesRef).delete(gameListRef);
    });
    functions.logger.log('deleteFailedGame transaction success!');
  } catch (error) {
    functions.logger.error('deleteFailedGame transaction failure: ', error);
  }
  return null;
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
  console.log('Hello from startGame.');
  const viewableBy = Object.keys(gameStartParameters.players);
  return (
    db
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
        gameListData.viewableBy = viewableBy;
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
        game.scoring = gameStartParameters.scoring;

        // console.log('New parsed puzzle: ', game);

        const gameId = gamesDocRef.id;
        batch.set(gamesDocRef, game);

        await batch.commit();
        return gameId;
      })
      // .then(async (gameId) => {
      //   const opponentUid =
      //     context.auth.uid === viewableBy[0] ? viewableBy[1] : viewableBy[0];
      //   const opponent = await db.doc(`users/${opponentUid}`).get();
      //   const gameObj = {};
      //   gameObj.opponent = opponent.data();
      //   gameObj.gameId = gameId;
      //   console.log('gameObj: ', gameObj);
      //   return gameObj;
      // })
      .catch((error) => {
        functions.logger.error('Error fetching puzzle date: ', error);
        // console.error('Error fetching puzzle date: ', error);
      })
  );
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
exports.checkAnswers = functions.https.onCall(async (answerObj, context) => {
  // console.log('Hello from checkAnswers. answerObj: ', answerObj);
  const uid = context.auth.uid;
  const privateDataRef = db.doc(`users/${uid}/private/data`);
  const gameRef = db.doc(`games/${answerObj.gameId}`);
  const answersRef = db.doc(`games/${answerObj.gameId}/hidden/answers`);
  const gameListRef = db.doc(`gameListBuilder/${answerObj.gameId}`);
  const answers = (await answersRef.get()).data();
  const lastTurnCheckObj = { correctAnswer: true };
  try {
    return db.runTransaction(async (tx) => {
      let game = (await tx.get(gameRef)).data();
      const gameList = (await tx.get(gameListRef)).data();
      const privateData = (await tx.get(privateDataRef)).data();
      if (!privateData.myGuesses) privateData.myGuesses = {};
      privateData.myGuesses[answerObj.gameId] = answerObj.myGuesses;
      const idxArray = answerObj.idxArray;
      const direction = answerObj.acrossWord ? 'across' : 'down';
      const clueNumber = game.puzzle.grid[idxArray[0]].clueNum;
      const player = uid;
      let bgColor = game.players[player].bgColor.match(/blue/i)
        ? 'bg-color__blue--translucent'
        : 'bg-color__red--translucent';
      // console.log('answerObj: ', answerObj);
      for (let index = 0; index < answerObj.guess.length; index++) {
        const correctValue = answers.answerKey[idxArray[index]];
        const guess = answerObj.guess[index];
        if (correctValue !== guess) {
          lastTurnCheckObj.correctAnswer = false;
        }
      }
      // console.log('lastTurnCheckObj: ', lastTurnCheckObj);
      const correctAnswer = lastTurnCheckObj.correctAnswer;
      if (correctAnswer) {
        game.puzzle.completedClues[direction].push(parseInt(clueNumber));
      }
      checkAnswerResult = [];
      if (!game.scoring) game.scoring = 'scrabble-scoring';
      for (let index = 0; index < answerObj.guess.length; index++) {
        const gridElement = game.puzzle.grid[idxArray[index]];
        const correctValue = answers.answerKey[idxArray[index]];
        const guess = answerObj.guess[index];
        if (!gridElement.guessArray) gridElement.guessArray = [];
        if (!gridElement.guessArray.includes(guess))
          gridElement.guessArray.push(guess);
        const cellResult = {};
        cellResult.guess = guess;
        cellResult.correctLetter = correctValue;
        cellResult.index = idxArray[index];
        cellResult.bgColor = bgColor;
        // console.log('Correct letter: ', correctValue);
        // console.log('Guess: ', guess);

        // DIFFERENTIATE HERE for scoring method:
        if (game.scoring === 'scrabble-scoring') {
          game = scrabbleScore(
            cellResult,
            correctAnswer,
            game,
            direction,
            player
          );
        } else {
          game = coverageScore(cellResult, game, player);
        }
      }
      const opponent =
        gameList.viewableBy[0] === uid
          ? gameList.viewableBy[1]
          : gameList.viewableBy[0];
      game.nextTurn = opponent;
      gameList.nextTurn = opponent;
      if (game.emptySquares === 0) {
        if (game.players[player].score > game.players[opponent].score) {
          game.winner = player;
        } else if (game.players[player].score < game.players[opponent].score) {
          game.winner = opponent;
        } else {
          game.winner = 'tie';
        }
        gameList.winner = game.winner;
        game.status = 'finished';
        const finishDate = Date.now();
        game.finish = finishDate;
        gameList.status = 'finished';
        gameList.finish = finishDate;
        if (privateData.myGuesses[answerObj.gameId])
          delete privateData.myGuesses[answerObj.gameId];
      }
      lastTurnCheckObj.checkAnswerResult = checkAnswerResult;
      lastTurnCheckObj.playerUid = uid;
      game.lastTurnCheckObj = lastTurnCheckObj;
      // save the modified game and the gameListBuilder doc
      tx.update(gameRef, game)
        .update(gameListRef, gameList)
        .set(privateDataRef, privateData);
      functions.logger.log('checkAnswers transaction success!');
      return notifyPlayer(opponent, answerObj.gameId);
    });
  } catch (error) {
    functions.logger.error('checkAnswers transaction failure: ', error);
  }
  return null;
});

/**
 * Calculates the score of the users guess for a single cell, based on
 * scrabble-like scoring.
 * @param {object} cellResult Contains parameters for cell based on player's guess
 * @param {boolean} correctAnswer Whether the player's entire guess was correct
 * @param {object} game Complete game object to be updated with score information
 * @param {string} direction 'across' or 'down'
 * @param {string} player Player's UID
 * @returns updated game object
 */
function scrabbleScore(cellResult, correctAnswer, game, direction, player) {
  const gridElement = game.puzzle.grid[cellResult.index];
  if (cellResult.correctLetter === cellResult.guess) {
    gridElement.value = cellResult.guess;
    if (gridElement.status === 'locked' && correctAnswer) {
      game.players[player].score += scoreValues[cellResult.guess];
      cellResult.score = scoreValues[cellResult.guess];
      checkAnswerResult.push(cellResult);
    } else if (gridElement.status !== 'locked') {
      const scoreObj = scoreCell(
        game,
        direction,
        cellResult.index,
        cellResult.bgColor
      );
      game.players[player].score += scoreObj.scoreChange;
      if (scoreObj.pushClue)
        game.puzzle.completedClues[scoreObj.dir].push(
          parseInt(scoreObj.pushClue)
        );
      cellResult.score = scoreValues[cellResult.guess];
      checkAnswerResult.push(cellResult);
      // console.log(
      //   'letter score: ',
      //   scoreCell(game, direction, cellResult.index)
      // );
      game.emptySquares--;
      gridElement.bgColor = cellResult.bgColor;
      gridElement.status = 'locked';
    }
  } else {
    cellResult.bgColor = 'red';
    cellResult.score = 0;
    checkAnswerResult.push(cellResult);
  }
  return game;
}

function coverageScore(cellResult, game, player) {
  const gridElement = game.puzzle.grid[cellResult.index];
  if (cellResult.correctLetter === cellResult.guess) {
    gridElement.value = cellResult.guess;
    if (gridElement.status !== 'locked') {
      game.players[player].score++;
      cellResult.score = 1;
      checkAnswerResult.push(cellResult);
      game.emptySquares--;
      gridElement.bgColor = cellResult.bgColor;
      gridElement.status = 'locked';
    }
  } else {
    cellResult.bgColor = 'red';
    cellResult.score = 0;
    checkAnswerResult.push(cellResult);
  }
  return game;
}

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
  // console.log('Hello from scoreCell.');
  // get direction for orthogonal word
  const orthoDir = direction === 'across' ? 'down' : 'across';
  const orthoWordArray = getOrthoWordArray(game, orthoDir, index);
  // console.log('direction: ', direction);
  let addedScore = 0;
  let addedResults = [];
  let clueNum = game.puzzle.grid[orthoWordArray[0]].clueNum;
  // console.log('ortho word array: ', orthoWordArray);
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
  // console.log('Hello from getOrthoWordArray.');
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

exports.abandonGame2 = functions.https.onCall(async (abandonObj, context) => {
  console.log('Hello from abandonGame2.');
  const gameRef = db.doc(`games/${abandonObj.gameId}`);
  const answersRef = db.doc(`games/${abandonObj.gameId}/hidden/answers`);
  const gameListRef = db.doc(`gameListBuilder/${abandonObj.gameId}`);
  const answers = (await answersRef.get()).data().answerKey;
  try {
    await db.runTransaction(async (tx) => {
      const game = (await tx.get(gameRef)).data();
      const gameListDoc = (await tx.get(gameListRef)).data();
      const playerOne = gameListDoc.viewableBy[0];
      const playerTwo = gameListDoc.viewableBy[1];
      const playerOneRef = db.doc(`users/${playerOne}/private/data`);
      const playerTwoRef = db.doc(`users/${playerTwo}/private/data`);
      const playerOnePrivateData = (await tx.get(playerOneRef)).data();
      const playerTwoPrivateData = (await tx.get(playerTwoRef)).data();
      if (
        playerOnePrivateData.myGuesses &&
        playerOnePrivateData.myGuesses[abandonObj.gameId]
      )
        delete playerOnePrivateData.myGuesses[abandonObj.gameId];
      if (
        playerTwoPrivateData.myGuesses &&
        playerTwoPrivateData.myGuesses[abandonObj.gameId]
      )
        delete playerTwoPrivateData.myGuesses[abandonObj.gameId];
      const myUid = context.auth.uid;
      const oppUid = abandonObj.opponentUid;
      gameListDoc.status = 'finished';
      for (let index = 0; index < answers.length; index++) {
        const letter = answers[index];
        if (letter === '.') continue;
        const square = game.puzzle.grid[index];
        if (square.status === 'locked') continue;
        square.value = letter;
        if (!square.guessArray) square.guessArray = [];
        if (!square.guessArray.includes(letter)) square.guessArray.push(letter);
        square.status = 'locked';
        let bgColor = game.players[oppUid].bgColor;
        if (bgColor === 'bgTransRed') bgColor = 'bg-color__red--translucent';
        if (bgColor === 'bgTransBlue') bgColor = 'bg-color__blue--translucent';
        square.bgColor = bgColor;
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
      tx.update(gameRef, game)
        .update(gameListRef, gameListDoc)
        .set(playerOneRef, playerOnePrivateData)
        .set(playerTwoRef, playerTwoPrivateData);
    });
    functions.logger.log('abandonGame2 transaction success!');
  } catch (error) {
    functions.logger.error('abandonGame2 transaction failure: ', error);
  }
  return;
});
