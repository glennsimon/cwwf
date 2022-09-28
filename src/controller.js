import { db, app, auth, functions, messaging } from './firebase-init.js';
import {
  authChangeView,
  signedOutView,
  showPuzzleView,
  loadGamesView,
} from './view.js';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import {
  onAuthStateChanged,
  beforeAuthStateChanged,
  signOut,
} from 'firebase/auth';
import { getToken } from 'firebase/messaging';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';

const dbRT = getDatabase(app);
const vapidKey =
  'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4' +
  'wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak';
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

let currentUser = null;
let previousUser = null;
let allUsers = {};
let allGames = {};
let currentGame = null;
let currentGameId = null;
let myOpponentUid = null;
let currentCell = null;
let acrossWord = true;
let columns = null;
let currentClue = null;
let idxArray = [];
let myTurn = null;
let clueNumIndices = {};
// TODO: should this be tracked, and what can be done while offline?
let online = false;

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
let gameUnsubscribe = () => {};

/**
 * Get the currentGame. Should be used by all external modules.
 * @returns {object} Returns currentGame or null
 */
function getCurrentGameController() {
  return currentGame;
}

/**
 * Set the currentGame. Should be used by all external modules.
 * @param {object} game Game with some parameters changed or added
 */
function setCurrentGameController(game) {
  currentGame = game;
}

/**
 * Get the value of acrossWord. Should be used by all external modules.
 * @returns {boolean} true if across, false if down
 */
function getAcrossWordController() {
  return acrossWord;
}

/**
 * Set acrossWord. Should be used by all external modules.
 * @param {boolean} across true if across, false if down
 */
function setAcrossWordController(across) {
  acrossWord = across;
}

/**
 * Get the currentUser. Should be used by all external modules.
 * @returns {Object} Returns currentUser or null
 */
function getCurrentUserController() {
  return currentUser;
}

/**
 * Get the allGames Object. Should be used by all external modules.
 * @returns {Object} Returns allGames Object
 */
function getAllGamesController() {
  return allGames;
}

/**
 * Get the columns Object. Should be used by all external modules.
 * @returns {number} Returns number of columns
 */
function getColumnsController() {
  return columns;
}

/**
 * Get the idxArray containing the indices of the currently selected word in the
 * puzzle. Should be used by all external modules.
 * @returns {array} Returns idxArray
 */
function getIdxArrayController() {
  return idxArray;
}

/**
 * Set the idxArray containing the indices of the currently selected word in the
 * puzzle. Should be used by all external modules.
 * @param {array} wordArray Array containing the indexes of the currently selected word.
 */
function setIdxArrayController(wordArray) {
  idxArray = wordArray;
}

/**
 * Helper function for creating state object.
 * @param {string} state
 * @returns State object to store for user on database
 */
function authState(state) {
  return { state: state, lastChanged: Date(serverTimestamp()) };
}

// Updates user online status only if user is logged in
// when connection/disconnection with app is made.
// If no user is logged in, this does nothing.
onValue(ref(dbRT, '.info/connected'), (snapshot) => {
  console.log('connected notification fired. Connected: ', `${snapshot.val()}`);
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  if (snapshot.val() === false) {
    return;
  } else if (uid) {
    onDisconnect(ref(dbRT, `/users/${uid}`))
      .set(authState('offline'))
      .then(() => {
        set(ref(dbRT, `/users/${uid}`), authState('online'));
        return;
      });
  }
});

// // handles change to database just before auth state changes,
// // allowing permission to make the change.
// beforeAuthStateChanged(auth, (user) => {
//   const uid = auth.currentUser ? auth.currentUser.uid : null;
//   if (uid) {
//     set(ref(dbRT, `/users/${uid}`), authState('offline'));
//   }
// });

onAuthStateChanged(auth, (user) => {
  const uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user ID: ', uid);
  authChangeView(user);
  previousUser = currentUser;
  currentUser = user;
  if (!uid) return;
  const authChanged = httpsCallable(functions, 'authChanged');
  authChanged()
    .then(async (result) => {
      console.log(result);
      if (result.data) {
        await set(ref(dbRT, `/users/${result.data}`), authState('online'));
      }
      return;
    })
    .then(() => {
      generateMessagingToken();
      return;
    })
    .then(() => {
      populateAllGamesController();
      return;
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
});

// Configure messaging credentials with FCM VAPID key
function generateMessagingToken() {
  getToken(messaging, {
    vapidKey: vapidKey,
  })
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // I don't think anything is needed here.
        // I think browser automatically asks for permission.
      }
      return;
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token: ', err);
    });
}

/**
 * Send cloud messaging token to server
 * @param {string} token Cloud messaging token
 */
async function sendTokenToServer(token) {
  console.log('Messaging permission granted. Token: ', token);
  const uid = auth.currentUser ? auth.currentUser.uid : null;
  if (uid) {
    await setDoc(
      doc(db, `/users/${uid}/`),
      { msgToken: token },
      { merge: true }
    );
  }
}

/**
 * Called by the view, signs the user out or takes them to the #signin page.
 */
function authButtonClickedController() {
  if (currentUser) {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // signedOutView();
        // location.hash = '#signin';
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    // keep this else - location should change only if signOut successful
    location.hash = '#signin';
  }
}

/**
 * Populate list of all users from firestore and return the list.
 * @returns Object containing all users by uid
 */
function populateAllUsersController() {
  return getDocs(query(collection(db, 'users')))
    .then((snapshot) => {
      if (snapshot.empty) {
        console.warn('No users exist yet.');
        return;
      }
      const usersObj = {};
      snapshot.docs.forEach((doc) => {
        // console.log(doc.data());
        const user = doc.data();
        usersObj[user.uid] = user;
      });
      allUsers = usersObj;
      return usersObj;
    })
    .catch((error) => console.log('Error getting list of users: ', error));
}

/**
 * Populate list of all games that is viewable to the current user
 * from firestore and return the list.
 * @returns Object containing all games by gameId
 */
function populateAllGamesController() {
  console.log('Hello from populateAllGamesController.');
  if (currentUser) {
    const q = query(
      collection(db, 'games'),
      where('viewableBy', 'array-contains', `${currentUser.uid}`),
      orderBy('start', 'desc'),
      limit(10)
    );
    return getDocs(q)
      .then((snapshot) => {
        if (snapshot.empty) {
          console.warn('No games exist yet.');
          return;
        }
        const gamesObj = {};
        snapshot.docs.forEach((doc) => {
          gamesObj[doc.id] = doc.data();
        });
        allGames = gamesObj;
        return gamesObj;
      })
      .then((gamesObj) => {
        loadGamesView(gamesObj);
      })
      .catch((error) => console.log('Error getting list of games: ', error));
  }
}

/**
 * This function fetches an active puzzle based on the user's selection
 * and then calls functions to format and display the puzzle
 * @param {String} puzzleId Firestore game (puzzle) id
 */
function fetchPuzzleController(puzzleId) {
  console.log('Hello from fetchPuzzleController.');
  subscribeToGame(puzzleId);
}

/**
 * Unsubscribe from listening for changes on previous game, and start listening
 * for changes on gameId game.
 * @param {string} gameId
 */
function subscribeToGame(gameId) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  try {
    gameUnsubscribe();
  } catch (error) {
    console.log('INFO: Error thrown trying to unsubscribe from current game.');
    // do nothing, already unsubscribed
  }

  // Start listening to current puzzle changes
  gameUnsubscribe = onSnapshot(
    doc(db, 'games', gameId),
    (doc) => {
      currentGame = doc.data();
      currentGameId = gameId;
      if (currentGame.status === 'started') {
        myOpponentUid =
          currentGame.initiator.uid === currentUser.uid
            ? currentGame.opponent.uid
            : currentGame.initiator.uid;
        columns = currentGame.puzzle.cols;
      }
      idxArray = [];
      clueNumIndices = {};
      columns = currentGame.puzzle.cols;
      myTurn = currentUser.uid === currentGame.nextTurn;
      showPuzzleView(currentGame);
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
function playWordController() {
  console.log('Hello from playWordController.');
  if (currentGame.status === 'finished') return;
  if (incomplete()) return;
  if (location.hash === '#puzzle' && !myTurn) {
    alert("Your opponent hasn't played their turn yet!");
    return;
  }
  // TODO: something like this?:
  // document.getElementById('puzTitle').innerText = 'Fetching data...';
  const answerObj = {};
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentGameId;
  answerObj.acrossWord = acrossWord;
  answerObj.guess = [];
  answerObj.myUid = currentUser.uid;
  answerObj.myOpponentUid = myOpponentUid;
  for (const index of idxArray) {
    answerObj.guess.push(currentGame.puzzle.grid[index].guess);
  }
  const checkAnswer = httpsCallable(functions, 'checkAnswer');
  checkAnswer(answerObj)
    .then((obj) => {
      console.log('isCorrect: ', `${obj.data.correctAnswer}`);
      return;
    })
    .then(() => {
      const notifyOpponent = httpsCallable(functions, 'notifyPlayer');
      return notifyOpponent(answerObj.myOpponentUid).then((result) => {
        console.log(result);
        return;
      });
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
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
      !currentGame.puzzle.grid[i].guess ||
      currentGame.puzzle.grid[i].guess === ''
    ) {
      return true;
    }
  }
  return false;
}

/**
 * Exported function that presenter uses to start a new game
 * @param {Object} gameStartParameters Parameters needed to start game
 */
function startNewGameController(gameStartParameters) {
  console.log('Attempting to start a new game.');
  const startGame = httpsCallable(functions, 'startGame');
  startGame(gameStartParameters)
    .then((gameObjData) => {
      subscribeToGame(gameObjData.data.gameId);
      return gameObjData.data.game;
    })
    .catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
}

/**
 * Enter a letter into the currentGame as a guess.
 * @param {string} letter Letter to be entered into the square
 * @param {number} index Index of square
 */
function enterLetterController(letter, index) {
  currentGame.puzzle.grid[index].guess = letter;
}

/**
 * Update the controller currentGame variable and save the game.
 * @param {object} append Optional Object to append to game as game.append
 */
function savePuzzleController(append) {
  console.log('Hello from savePuzzleController.');
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

function abandonCurrentGameController() {
  const abandonObj = {};
  abandonObj.gameId = currentGameId;
  abandonObj.opponentUid = myOpponentUid;
  abandonObj.myUid = currentUser.uid;
  const abandonGame = httpsCallable(functions, 'abandonGame');
  abandonGame(abandonObj).catch((err) => {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}

export {
  authButtonClickedController,
  startNewGameController,
  getCurrentUserController,
  populateAllUsersController,
  populateAllGamesController,
  getAllGamesController,
  fetchPuzzleController,
  savePuzzleController,
  playWordController,
  getColumnsController,
  getIdxArrayController,
  setIdxArrayController,
  getCurrentGameController,
  setCurrentGameController,
  enterLetterController,
  abandonCurrentGameController,
  getAcrossWordController,
  setAcrossWordController,
};
