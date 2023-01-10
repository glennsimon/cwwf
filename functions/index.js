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
  await admin
    .database()
    .ref(`/users/${uid}`)
    .set(statusUpdate.authState)
    .catch((error) => {
      functions.logger.log('Error: ', error);
    });
  return null;
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
      return db.runTransaction(async (tx) => {
        let publicData = (await tx.get(publicDataRef)).data();
        let privateData = (await tx.get(privateDataRef)).data();
        if (!publicData)
          publicData = { friends: ['3eoDltvYiwYfjPviYRRQ2agbsAz1'] };
        publicData.blocked = publicData.blocked || [];
        publicData.displayName =
          context.auth.token.name || publicData.displayName || null;
        publicData.prefName = publicData.prefName || publicData.displayName;
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
    } catch (error) {
      functions.logger.error('authChange transaction failure: ', error);
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
    const publicDataRef = db.collection('users').doc();
    const user = {
      initiator: uid,
      uid: publicDataRef.id,
      friends: [uid],
      photoURL: null,
      signInProvider: 'none',
      displayName: data.firstName + ' (pending)',
    };
    return await publicDataRef.set(user).then(() => {
      return publicDataRef.id;
    });
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
      const game = (await tx.get(gameRef)).data();
      const gameListDoc = (await tx.get(gameListRef)).data();
      console.log('gameListDoc before: ', gameListDoc);
      game.players[uid] = game.players[data.pendingUid];
      delete game.players[data.pendingUid];
      gameListDoc.players[uid] = gameListDoc.players[data.pendingUid];
      delete gameListDoc.players[data.pendingUid];
      gameListDoc.viewableBy.splice(
        gameListDoc.viewableBy.indexOf(data.pendingUid),
        1,
        uid
      );
      if (gameListDoc.nextTurn === data.pendingUid) gameListDoc.nextTurn = uid;
      if (gameListDoc.winner === data.pendingUid) gameListDoc.winner = uid;
      if (game.nextTurn === data.pendingUid) game.nextTurn = uid;
      if (game.winner === data.pendingUid) game.winner = uid;
      if (game.lastTurnCheckObj.playerUid === data.pendingUid)
        game.lastTurnCheckObj.playerUid = uid;
      console.log('gameListDoc after: ', gameListDoc);

      const pendingUser = (await tx.get(pendingRef)).data();
      console.log('pendingUser: ', pendingUser);
      if (!pendingUser) return null;
      // console.log('pendingUser: ', pendingUser);
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
      newUser.prefName = newUser.displayName;
      newUser.signInProvider =
        context.auth.token.firebase.sign_in_provider || 'none';
      // } else {
      //   newUser.friends.push(initiatorUid);
      // }
      // console.log('newUser after: ', newUser);
      const initiatorRef = db.doc(`users/${initiatorUid}`);
      const initiator = (await tx.get(initiatorRef)).data();
      if (initiator.friends && initiator.friends.includes(data.pendingUid))
        initiator.friends.splice(
          initiator.friends.indexOf(data.pendingUid),
          1,
          uid
        );
      if (initiator.blocked && initiator.blocked.includes(data.pendingUid))
        initiator.blocked.splice(
          initiator.blocked.indexOf(data.pendingUid),
          1,
          uid
        );

      tx.update(gameRef, game)
        .update(gameListRef, gameListDoc)
        .update(newUserRef, newUser)
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
 */
function notifyPlayer(uid) {
  console.log('Hello from notifyPlayer.');
  return db
    .doc(`users/${uid}`)
    .get()
    .then(async (doc) => {
      // console.log('msgToken: ', doc.data().msgToken);
      return await doc.data().msgToken;
    })
    .then(async (toKey) => {
      if (toKey) {
        console.log('got users messagetoken: ', toKey);

        const payload = {
          notification: {
            title: 'Your turn!',
            body: 'Your opponent has played their turn',
            icon: 'images/favicon.ico',
            clickAction: 'https://xwordswf.web.app',
          },
        };

        const messagingResponse = await admin
          .messaging()
          .sendToDevice(toKey, payload, {
            collapseKey: 'your-turn',
            timeToLive: 86400,
          });
        console.log(`messagingResponse.results: ${messagingResponse.results}`);
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
  const gameRef = db.doc(`games/${answerObj.gameId}`);
  const answersRef = db.doc(`games/${answerObj.gameId}/hidden/answers`);
  const gameListRef = db.doc(`gameListBuilder/${answerObj.gameId}`);
  const answers = (await answersRef.get()).data();
  const lastTurnCheckObj = { correctAnswer: true };
  try {
    return db.runTransaction(async (tx) => {
      const game = (await tx.get(gameRef)).data();
      const gameList = (await tx.get(gameListRef)).data();
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
      if (lastTurnCheckObj.correctAnswer) {
        game.puzzle.completedClues[direction].push(parseInt(clueNumber));
      }
      checkAnswerResult = [];
      for (let index = 0; index < answerObj.guess.length; index++) {
        const gridElement = game.puzzle.grid[idxArray[index]];
        const correctValue = answers.answerKey[idxArray[index]];
        let guess = answerObj.guess[index];
        let guessArray = gridElement.guessArray;
        if (guessArray && !guessArray.includes(guess)) {
          guessArray.push(guess);
        } else {
          guessArray = [guess];
        }
        gridElement.guessArray = guessArray;
        const cellResult = {};
        cellResult.guess = guess;
        cellResult.correctLetter = correctValue;
        cellResult.index = idxArray[index];
        // console.log('Correct letter: ', correctValue);
        // console.log('Guess: ', guess);
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
            // console.log('letter score: ', scoreValues[guess]);
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
            gridElement.bgColor = bgColor;
            gridElement.status = 'locked';
          }
        } else {
          cellResult.bgColor = 'red';
          cellResult.score = 0;
          checkAnswerResult.push(cellResult);
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
      }
      lastTurnCheckObj.checkAnswerResult = checkAnswerResult;
      lastTurnCheckObj.playerUid = uid;
      game.lastTurnCheckObj = lastTurnCheckObj;
      // save the modified game and the gameListBuilder doc
      tx.update(gameRef, game).update(gameListRef, gameList);
      functions.logger.log('checkAnswers transaction success!');
      return notifyPlayer(opponent);
    });
  } catch (error) {
    functions.logger.error('checkAnswers transaction failure: ', error);
  }
  return null;
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
  // console.log('game.puzzle.grid[index].value: ', game.puzzle.grid[index].value);
  // console.log(
  //   'scoreValues[game.puzzle.grid[index].value]: ',
  //   scoreValues[game.puzzle.grid[index].value]
  // );
  // console.log('added score: ', addedScore);
  // console.log('addedResults: ', addedResults);
  // console.log(
  //   'returned score: ',
  //   addedScore + scoreValues[game.puzzle.grid[index].value]
  // );
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
      const myUid = context.auth.uid;
      const oppUid = abandonObj.opponentUid;
      gameListDoc.status = 'finished';
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
        let bgColor = game.players[oppUid].bgColor;
        if (bgColor === 'bgTransRed') bgColor = 'bg-color__red--translucent';
        if (bgColor === 'bgTransBlue') bgColor = 'bg-color__blue--translucent';
        game.puzzle.grid[index].bgColor = bgColor;
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
    functions.logger.log('abandonGame2 transaction success!');
  } catch (error) {
    functions.logger.error('abandonGame2 transaction failure: ', error);
  }
  return;
});
