import { db, auth, functions } from '../../firebase-init.js';
import { idxArray, acrossWord, disableEnter, displayGame } from './puzzleV.js';
import { getDoc, setDoc, doc, onSnapshot } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { showErrorDialog } from '../../pageFrags/dialogs/dialogsV.js';
import { currentUser, online } from '../signin/signinC.js';
import { route } from '../../router.js';

let currentOpp = null;
let currentGame = null;
let currentGameId = null;
let prevGameId = null;
let columns = null;
let myTurn = null;
let myGuesses = {};
let scoring = 'scrabble-scoring';
// TODO: should this be tracked, and what can be done while offline?
// let online = false;

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
let gameUnsubscribe = () => {};

/**
 * Resets local variables when leaving a game
 */
function clearGameParameters() {
  gameUnsubscribe();
  gameUnsubscribe = () => {};
  currentOpp = null;
  currentGame = null;
  currentGameId = null;
  columns = null;
  myTurn = null;
}

/**
 * Exported function that presenter uses to start a new game
 * @param {Object} gameStartParameters Parameters needed to start game
 * @returns
 */
function startNewGame(gameStartParameters) {
  console.log('Attempting to start a new game.');
  const startGame = httpsCallable(functions, 'startGame');
  return startGame(gameStartParameters)
    .then((gameIdObj) => {
      const gameId = gameIdObj.data;
      route(`/puzzle?gameId=${gameId}`);
      // subscribeToGame(gameId);
      return gameId;
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
}

/**
 * Unsubscribe from listening for changes on previous game, and start
 * listening for changes on gameObj game.
 * @param {string} gameId game id string
 */
function subscribeToGame(gameId) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  gameUnsubscribe();

  // Start listening to current puzzle changes
  gameUnsubscribe = onSnapshot(
    doc(db, 'games', gameId),
    async (gameSnap) => {
      if (!gameSnap.exists()) {
        showErrorDialog(
          `Either that game doesn't exist or you don't have permission ` +
            `to open it.`
        );
        route('/games');
        return;
      }
      prevGameId = currentGameId;
      currentGame = gameSnap.data();
      const playerUids = Object.keys(currentGame.players);
      try {
        if (!currentOpp || !playerUids.includes(currentOpp.uid)) {
          const opponentUid =
            playerUids[0] === auth.currentUser.uid
              ? playerUids[1]
              : playerUids[0];
          currentOpp = (await getDoc(doc(db, `users/${opponentUid}`))).data();
        }
      } catch (err) {
        console.log('User not logged in: ', err);
        route('/signin');
        return;
      }
      currentGameId = gameId;
      const privateData = (
        await getDoc(doc(db, `users/${auth.currentUser.uid}/private/data`))
      ).data();
      myGuesses =
        (privateData.myGuesses && privateData.myGuesses[gameId]) || {};
      columns = currentGame.puzzle.cols;
      myTurn = auth.currentUser.uid === currentGame.nextTurn;
      displayGame();
    },
    (error) => {
      console.error('Error subscribing to puzzle: ', error);
    }
  );
}

/**
 * Play currentUser's turn. Executed when the player clicks the enter
 * button
 */
function playWord() {
  console.log('Hello from playWord.');
  disableEnter();
  const answerObj = {};
  answerObj.myGuesses = myGuesses;
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentGameId;
  answerObj.acrossWord = acrossWord;
  answerObj.guess = [];
  for (const index of idxArray) {
    const guessArray = currentGame.puzzle.grid[index].guessArray;
    answerObj.guess.push(guessArray[guessArray.length - 1]);
  }
  const checkAnswers = httpsCallable(functions, 'checkAnswers');
  return checkAnswers(answerObj)
    .then(async (notificationResult) => {
      console.log('notification Result: ', await notificationResult.data);
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
}

/**
 * Checks if entry can be played
 * @returns true if ready to play, false otherwise
 */
function checkReadiness() {
  console.log('Hello from checkForProblems.');
  if (currentGame.status === 'finished') return false;
  if (incomplete()) {
    const errorMessage =
      `Entry is incomplete. No blank letters ` +
      `allowed in highlighted range. Try again!`;
    showErrorDialog(errorMessage);
    return false;
  }
  if (location.pathname.startsWith('/puzzle') && !myTurn) {
    const errorMessage =
      `Whoa there, Buckaroo... ` +
      `Your opponent hasn't played their turn yet!`;
    showErrorDialog(errorMessage);
    return false;
  }
  if (!online) {
    const errorMessage =
      `You are currently disconnected from the ` +
      `internet. When connection is restored you may have to ` +
      `play your turn again`;
    showErrorDialog(errorMessage);
    return false;
  }
  return true;
}

/**
 * Checks if array of cells has a letter in each square
 * @return {boolean} true if word is incomplete, false otherwise
 */
function incomplete() {
  console.log('Hello from incomplete. idxArray: ', idxArray);
  if (idxArray.length === 0) return true;
  for (const i of idxArray) {
    if (
      !currentGame.puzzle.grid[i].guessArray ||
      currentGame.puzzle.grid[i].guessArray.length === 0
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Enter a letter into the currentGame as a guess.
 * @param {string} letter Letter to be entered into the square
 * @param {number} index Index of square
 */
function enterGuess(letter, index) {
  myGuesses[index] = letter;
  if (
    currentGame.puzzle.grid[index].guessArray &&
    !currentGame.puzzle.grid[index].guessArray.includes(letter)
  ) {
    currentGame.puzzle.grid[index].guessArray.push(letter);
    return;
  }
  currentGame.puzzle.grid[index].guessArray = [letter];
}

/**
 * Update the controller currentGame variable and save the game.
 * @param {object} append Optional Object to append to game as game.append
 */
function savePuzzle(append) {
  console.log('Hello from savePuzzle.');
  if (append) {
    appendObject(currentGame, append);
  }
  setDoc(doc(db, `games/${currentGameId}`), currentGame, { merge: true }).catch(
    (err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    }
  );
}

/**
 * Appends the append Object to the base Object.
 * @param {object} base Base object to append to
 * @param {object} append Object to append to base
 */
function appendObject(base, append) {
  const keys = Object.keys(append);
  keys.forEach((key) => {
    base[key] = append[key];
  });
}

function concedeCurrentGame() {
  const concedeObj = {};
  concedeObj.gameId = currentGameId;
  concedeObj.opponentUid = currentOpp.uid;
  concedeObj.playerUid = currentUser.uid;
  const abandonGame2 = httpsCallable(functions, 'abandonGame2');
  abandonGame2(concedeObj).catch((err) => {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}

export {
  columns,
  currentGame,
  currentGameId,
  prevGameId,
  currentOpp,
  myGuesses,
  scoring,
  clearGameParameters,
  startNewGame,
  subscribeToGame,
  savePuzzle,
  playWord,
  enterGuess,
  concedeCurrentGame,
  checkReadiness,
};
