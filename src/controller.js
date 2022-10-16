import { db, app, auth, functions, messaging } from './firebase-init.js';
import {
  authChangeView,
  showPuzzleView,
  loadGamesView,
  animateScoringView,
} from './view.js';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import { onAuthStateChanged, signOut } from 'firebase/auth'; //, signOut } from 'firebase/auth';
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

let currentUser = null;
let userStatusFirestoreRef = null;
let userStatusDatabaseRef = null;
let allGames = {};
let currentGame = null;
let currentGameId = null;
let myOpponentUid = null;
let acrossWord = true;
let columns = null;
let idxArray = [];
let myTurn = null;
let gameListParameters = {};
// TODO: should this be tracked, and what can be done while offline?
let online = false;

// webpack dynamic imports:
// let mySignOut = () => {};

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
let gameUnsubscribe = () => {};
let connectionUnsubscribe = () => {};

/**
 * Get the currentGame. Should be used by all external modules.
 * @returns {object} Returns currentGame or null
 */
function getCurrentGameController() {
  return currentGame;
}

/**
 * Get myOpponentUid. Should be used by all external modules.
 * @returns {object} Returns myOpponentUid or null
 */
function getMyOpponentUidController() {
  return myOpponentUid;
}

/**
 * Get gameListParameters. Should be used by all external modules.
 * @returns {object} Returns gameListParameters or null
 */
function getGameListParametersController() {
  return gameListParameters;
}

/**
 * Set the currentGame. Should be used by all external modules.
 * @param {object} game Game with some parameters changed or added
 */
function setCurrentGameController(game) {
  currentGame = game;
}

/**
 * Set the currentGameId. Should be used by all external modules.
 * @param {object} gameId gameId | null
 */
function setCurrentGameIdController(gameId) {
  currentGameId = gameId;
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
  return { state: state, lastChanged: serverTimestamp() };
}

// Updates user online status only if user is logged in
// when connection/disconnection with app is made.
// If no user is logged in, this does nothing.
onValue(ref(dbRT, '.info/connected'), (snapshot) => {
  console.log(
    'connected notification change fired. Connected: ',
    `${snapshot.val()}`
  );
  // const uid = auth.currentUser ? auth.currentUser.uid : null;
  if (!currentUser) {
    connectionUnsubscribe();
    connectionUnsubscribe = () => {};
    return;
  }
  if (snapshot.val() === false) {
    setDoc(userStatusFirestoreRef, authState('offline'), { merge: true });
    return;
  }
  // else if (uid) {
  onDisconnect(userStatusDatabaseRef)
    .set(authState('offline'))
    .then(() => {
      set(userStatusDatabaseRef, authState('online'));
      // setDoc(userStatusFirestoreRef, authState('online'), { merge: true });
      // return;
    });
  // }
});

/**
 * Subscribe user to listen to monitor online status. Executing
 * `connectionUnsubscribe` unsubscribes the user.
 */
connectionUnsubscribe = () => {
  if (!userStatusFirestoreRef) return;
  return onSnapshot(userStatusFirestoreRef, (snapshot) => {
    let isOnline = snapshot.data().state === 'online';
    // use isOnline if we need it...
  });
};

/**
 * Firestore function that monitors auth state.
 */
onAuthStateChanged(auth, async (user) => {
  const uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user: ', user);
  authChangeView(user);
  currentUser = user;
  if (!uid) return;
  // previousUser = currentUser;
  userStatusFirestoreRef = doc(db, `/users/${uid}`);
  userStatusDatabaseRef = ref(dbRT, `/users/${uid}`);
  try {
    const authChanged = httpsCallable(functions, 'authChanged');
    await authChanged();
    await generateMessagingToken(uid);
    await populateAllGamesController(uid);
  } catch (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  }
});

/**
 * Configure messaging credentials with FCM VAPID key
 * @param {string} uid User ID
 */
async function generateMessagingToken(uid) {
  try {
    const messagingToken = await getToken(messaging, {
      vapidKey: vapidKey,
    });
    if (messagingToken) {
      sendTokenToServer(messagingToken, uid);
    }
    return;
  } catch (err) {
    console.log('An error occurred while retrieving token: ', err);
  }
}

/**
 * Send cloud messaging token to server
 * @param {string} messagingToken Cloud messaging token
 * @param {string} uid User ID
 */
async function sendTokenToServer(messagingToken, uid) {
  console.log('Messaging permission granted. Token: ', messagingToken);
  if (uid) {
    await setDoc(
      doc(db, `/users/${uid}/`),
      { msgToken: messagingToken },
      { merge: true }
    );
    return;
  }
}

/**
 * Called by the view, signs the user out or takes them to the #signin page.
 */
async function authButtonClickedController() {
  // const { signOut } = await import('firebase/auth');

  if (currentUser) {
    const uid = currentUser.uid;
    signOut(auth)
      .then(() => {
        const statusUpdate = {};
        statusUpdate.uid = uid;
        statusUpdate.authState = authState('offline');
        const userOffline = httpsCallable(functions, 'userOffline');
        userOffline(statusUpdate);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // else {
  //   // keep this else - location should change only if signOut successful
  //   location.hash = '#signin';
  // }
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
      return usersObj;
    })
    .catch((error) => console.log('Error getting list of users: ', error));
}

/**
 * Populate list of all games that is viewable to the current user
 * from firestore and return the list.
 * @param {string} uid User ID
 * @returns Object containing all games by gameId
 */
async function populateAllGamesController(uid) {
  console.log('Hello from populateAllGamesController.');
  try {
    const q = query(
      collection(db, 'gameListBuilder'),
      where('viewableBy', 'array-contains', `${uid}`),
      orderBy('start', 'desc'),
      limit(10)
    );
    const querySnapshot = await getDocs(q);
    allGames = {};
    if (querySnapshot.empty) {
      console.warn('No games exist yet.');
    } else {
      querySnapshot.docs.forEach((doc) => {
        allGames[doc.id] = doc.data();
      });
    }
    loadGamesView(allGames);
  } catch (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
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
    async (doc) => {
      const prevGameId = currentGameId;
      currentGame = doc.data();
      currentGameId = gameId;
      if (currentGame.status === 'started') {
        const keys = Object.keys(currentGame.players);
        for (const key of keys) {
          if (key !== currentUser.uid) myOpponentUid = key;
        }
      }
      idxArray = [];
      columns = currentGame.puzzle.cols;
      myTurn = currentUser.uid === currentGame.nextTurn;
      if (prevGameId === gameId) {
        await animateScoringView(currentGame.lastTurnCheckObj);
      }
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
  answerObj.playerUid = currentUser.uid;
  answerObj.myOpponentUid = myOpponentUid;
  for (const index of idxArray) {
    answerObj.guess.push(currentGame.puzzle.grid[index].guess);
  }
  const checkAnswer = httpsCallable(functions, 'checkAnswer');
  checkAnswer(answerObj)
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
  abandonObj.playerUid = currentUser.uid;
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
  setCurrentGameIdController,
  enterLetterController,
  abandonCurrentGameController,
  getAcrossWordController,
  setAcrossWordController,
  getMyOpponentUidController,
  getGameListParametersController,
};
