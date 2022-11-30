import {
  db,
  app,
  auth,
  functions,
  messaging,
  storage,
} from './firebase-init.js';
import {
  authChangeView,
  showPuzzleView,
  loadGamesView,
  animateScoringView,
  showErrorDialogView,
  stopAllSpinnersView,
  showHeaderActivityView,
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
import { getToken, onMessage } from 'firebase/messaging';
import {
  collection,
  getDoc,
  getDocs,
  setDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  runTransaction,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from 'firebase/storage';
import { settings } from 'firebase/analytics';
import { loadFriendsSettingsView } from './views/settingsView.js';
// import { runtime } from 'webpack';
// import { settings } from 'firebase/analytics';

const dbRT = getDatabase(app);
const vapidKey =
  'BJ2DYpKmkCOjApNtK7gzaj5JAAC3ec6SkndGANE5QSavKz-sIzF_Z1IxTw_g7lhrbx6RuJORRfmWzEpcjYda14E';
// 'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak'

let currentUser = null;
let currentOpp = null;
let userStatusDatabaseRef = null;
let myGames = [];
let currentGame = null;
let currentGameId = null;
let acrossWord = true;
let columns = null;
let idxArray = [];
let myTurn = null;
let gameListParameters = {};
// TODO: should this be tracked, and what can be done while offline?
let online = false;
let myFriends = {};

// webpack dynamic imports:
// let mySignOut = () => {};

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
let gameUnsubscribe = () => {};
let myGamesUnsubscribe = () => {};

/**
 * Get myFriends. Should be used by all external modules.
 * @returns {object} Returns my friends users objects
 */
function getMyFriendsController() {
  return myFriends;
}

/**
 * Get the currentGame. Should be used by all external modules.
 * @returns {object} Returns currentGame or null
 */
function getCurrentGameController() {
  return currentGame;
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
 * Get currentOpp. Should be used by all external modules.
 * @returns {object} Returns currentOpp user object
 */
function getCurrentOppController() {
  return currentOpp;
}

/**
 * Get the myGames Object. Should be used by all external modules.
 * @returns {Array} Returns myGames Array
 */
function getAllGamesController() {
  return myGames;
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
  online = snapshot.val();
  console.log('connected notification change fired. Connected: ', `${online}`);
  // const uid = auth.currentUser ? auth.currentUser.uid : null;
  if (!currentUser) {
    return;
  }
  onDisconnect(userStatusDatabaseRef)
    .set(authState('offline'))
    .then(() => {
      set(userStatusDatabaseRef, authState('online'));
    });
});

/**
 * Firestore function that monitors auth state.
 */
onAuthStateChanged(auth, async (user) => {
  const uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user: ', user);
  if (!uid) return;
  showHeaderActivityView('Signing in, fetching games...');
  let userFirestoreRef = doc(db, `/users/${uid}`);
  const snapshot = await getDoc(userFirestoreRef);
  if (snapshot.exists()) {
    currentUser = snapshot.data();
  }
  userStatusDatabaseRef = ref(dbRT, `/users/${uid}`);
  myFriends = {};
  try {
    const authChange = httpsCallable(functions, 'authChange');
    let authChangeData = await authChange().data;
    console.log('authChangeData: ', authChangeData);
    // currentUser.uid = uid;
    const pendingResult = await checkForPendingPlayer();
    authChangeView(currentUser);
    generateMessagingToken();
    populateMyGames(uid);
    await populateMyFriends();
  } catch (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  }
});

async function checkForPendingPlayer() {
  // if there is a 'xwwf_invite' cookie, use it to create a new user from
  // the pending player object in Firestore
  console.log('document.cookie: ', document.cookie);
  console.log('auth.currentUser: ', auth.currentUser);
  if (document.cookie.includes('xwwf_invite')) {
    const cookies = document.cookie.split(';');
    console.log('cookies array: ', cookies);
    for (const cookie of cookies) {
      if (cookie.trim().startsWith('xwwf_invite=')) {
        const uidStrings = cookie.slice(13).split('&');
        const pendingUid = uidStrings[0].split('=')[1];
        const gameId = uidStrings[1].split('=')[1];
        const newUserObject = {};
        newUserObject.pendingUid = pendingUid;
        newUserObject.gameId = gameId;
        console.log('newUserObject: ', newUserObject);
        const updatePendingPlayer = httpsCallable(
          functions,
          'updatePendingPlayer'
        );
        currentUser = (await updatePendingPlayer(newUserObject)).data;
        console.log('currentUser: ', currentUser);
        if (currentUser) document.cookie = 'xwwf_invite=done; max-age=0';
        return 'xwwf_invite cookie used and deleted';
      }
    }
  }
  return 'No xwwf_invite cookie found.';
}

/**
 * Configure messaging credentials with FCM VAPID key
 */
async function generateMessagingToken() {
  try {
    const messagingToken = await getToken(messaging); //, {
    //   vapidKey: vapidKey,
    // });
    if (messagingToken) {
      sendTokenToServer(messagingToken);
      onMessage(messaging, (message) => {
        console.log('New message from FCM: ', message.notification);
      });
    } else {
      requestNotificationsPermissions();
    }
  } catch (err) {
    console.log('An error occurred while retrieving token: ', err);
  }
}

// Requests permissions to show notifications.
async function requestNotificationsPermissions() {
  console.log('Requesting notifications permission...');
  const permission = await Notification.requestPermission();

  if (permission === 'granted') {
    console.log('Notification permission granted.');
    // Notification permission granted.
    await generateMessagingToken();
  } else {
    console.log('Unable to get permission to notify.');
  }
}

/**
 * Send cloud messaging token to server
 * @param {string} messagingToken Cloud messaging token
 */
async function sendTokenToServer(messagingToken) {
  console.log('Messaging permission granted. Token: ', messagingToken);
  if (currentUser.uid) {
    await setDoc(
      doc(db, `/users/${currentUser.uid}/`),
      { msgToken: messagingToken },
      { merge: true }
    );
    return;
  }
}

/**
 * Called by the view, signs the user out or takes them to the #signin page.
 */
function authButtonClickedController() {
  if (currentUser) {
    const uid = currentUser.uid;
    signOut(auth)
      .then(() => {
        const statusUpdate = {};
        statusUpdate.uid = uid;
        statusUpdate.authState = authState('offline');
        const userOffline2 = httpsCallable(functions, 'userOffline2');
        userOffline2(statusUpdate);
        currentUser = null;
        authChangeView(null);
      })
      .catch((error) => {
        console.log(error);
      });
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
        if (user.uid !== currentUser.uid) usersObj[user.uid] = user;
      });
      return usersObj;
    })
    .catch((error) => console.log('Error getting list of users: ', error));
}

/**
 * Update the users friends and blocked values in Firestore via cloud function
 * @param {object} adjustedFriendsObject contains friends and blocked uid arrays
 */
async function updateFriendsController(adjustedFriendsObject) {
  currentUser.friends = adjustedFriendsObject.friends;
  currentUser.blocked = adjustedFriendsObject.blocked;
  adjustedFriendsObject.uid = currentUser.uid;
  const updateFriends = httpsCallable(functions, 'updateFriends');
  updateFriends(adjustedFriendsObject);
  await populateMyFriends();
  loadFriendsSettingsView(myFriends);
}

/**
 * Populate list of all users from firestore and return the list.
 * @returns Object containing friends of currentUser
 */
function populateMyFriends() {
  console.log('Hello from populateMyFriends');
  if (!currentUser) return;
  if (currentUser.friends.length === 0) return;
  const q = query(
    collection(db, 'users'),
    where('uid', 'in', currentUser.friends)
  );
  return getDocs(q).then((snapshot) => {
    if (snapshot.empty) {
      console.log('No friends added yet.');
      return {};
    }
    snapshot.docs.forEach((doc) => {
      // console.log(doc.data());
      const user = doc.data();
      if (doc.id !== currentUser.uid) myFriends[doc.id] = user;
    });
    for (const key of Object.keys(myFriends)) {
      if (!currentUser.friends.includes(key)) delete myFriends[key];
    }
    return;
  });
}

/**
 * Populate list of all games that is viewable to the current user
 * from firestore when auth changes or when something changes in that list.
 * @param {string} uid User ID
 */
async function populateMyGames(uid) {
  console.log('Hello from populateMyGames.');
  if (!uid) return;
  myGamesUnsubscribe();
  // try {
  const q = query(
    collection(db, 'gameListBuilder'),
    where('viewableBy', 'array-contains', `${uid}`)
    // TODO: add later when bug is fixed (soon): orderBy('start', 'desc'),
    // limit(30)
  );
  myGamesUnsubscribe = onSnapshot(q, async (snapshot) => {
    const myPastGames = [];
    const myCurrGames = [];
    const userIds = [];
    snapshot.forEach((doc) => {
      // console.log('query snapshot doc.data(): ', doc.data());
      const gameListItem = doc.data();
      gameListItem.gameId = doc.id;
      if (gameListItem.finish) {
        myPastGames.push(gameListItem);
      } else {
        myCurrGames.push(gameListItem);
      }
      for (const uid of gameListItem.viewableBy) {
        if (!userIds.includes(uid)) userIds.push(uid);
      }
    });
    myPastGames.sort((a, b) => {
      return b.finish - a.finish;
    });
    myCurrGames.sort((a, b) => {
      return b.start - a.start;
    });
    // const userIds = [];
    myGames = myCurrGames.concat(myPastGames);
    // for (const gameListItem of myGames) {
    //   for (const uid of gameListItem.viewableBy) {
    //     if (!userIds.includes(uid)) userIds.push(uid);
    //   }
    // }
    if (userIds.length !== 0) {
      const q2 = query(collection(db, 'users'), where('uid', 'in', userIds));
      const userDocs = await getDocs(q2);
      const count = userDocs.size;
      console.log('count: ', count);
      let userData = {};
      userDocs.forEach((doc) => {
        userData[doc.id] = doc.data();
      });
      loadGamesView(myGames, userData);
    }
    return;
  });
}

/**
 * This function fetches an active puzzle based on the user's selection
 * and then calls functions to format and display the puzzle
 * @param {object} gameObj Object with gameId and opponentUid
 */
async function fetchPuzzleController(gameObj) {
  console.log('Hello from fetchPuzzleController.');
  currentOpp = (await getDoc(doc(db, `users/${gameObj.opponentUid}`))).data();
  if (currentOpp) {
    subscribeToGame(gameObj.gameId);
  } else {
    showErrorDialogView(
      'That game is not accessible. Try another or start a new one.'
    );
    stopAllSpinnersView();
    const deleteFailedGame = httpsCallable(functions, 'deleteFailedGame');
    await deleteFailedGame({ gameId: gameObj.gameId }).catch((err) => {
      console.log('Error code: ', err.code);
      console.log('Error message: ', err.message);
      console.log('Error details: ', err.details);
    });
  }
}

/**
 * Unsubscribe from listening for changes on previous game, and start listening
 * for changes on gameObj game.
 * @param {string} gameId game id string
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
    async (gameSnap) => {
      const prevGameId = currentGameId;
      currentGame = gameSnap.data();
      if (!currentGame) return;
      currentGameId = gameId;
      idxArray = [];
      columns = currentGame.puzzle.cols;
      myTurn = currentUser.uid === currentGame.nextTurn;
      if (prevGameId === gameId) {
        await animateScoringView(currentGame.lastTurnCheckObj);
      }
      showPuzzleView(currentGame, currentOpp);
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
async function playWordController() {
  console.log('Hello from playWordController.');
  if (currentGame.status === 'finished') return;
  if (incomplete()) {
    const errorMessage =
      `Entry is incomplete. No blank letters ` +
      `allowed in highlighted range. Try again!`;
    showErrorDialogView(errorMessage);
    return;
  }
  if (location.hash === '#puzzle' && !myTurn) {
    const errorMessage =
      `Whoa there, Buckaroo... ` +
      `Your opponent hasn't played their turn yet!`;
    showErrorDialogView(errorMessage);
    return;
  }
  if (!online) {
    const errorMessage =
      `You are currently disconnected from the ` +
      `internet. When connection is restored you may have to ` +
      `play your turn again`;
    showErrorDialogView(errorMessage);
  }
  // TODO: something like this?:
  // document.getElementById('puzTitle').innerText = 'Fetching data...';
  const answerObj = {};
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentGameId;
  answerObj.acrossWord = acrossWord;
  answerObj.guess = [];
  answerObj.playerUid = currentUser.uid;
  answerObj.opponentUid = currentOpp.uid;
  for (const index of idxArray) {
    answerObj.guess.push(
      currentGame.puzzle.grid[index].guessArray[
        currentGame.puzzle.grid[index].guessArray.length - 1
      ]
    );
  }
  const checkAnswers = httpsCallable(functions, 'checkAnswers');
  await checkAnswers(answerObj)
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
 * Exported function that presenter uses to start a new game
 * @param {Object} gameStartParameters Parameters needed to start game
 */
function startNewGameController(gameStartParameters) {
  console.log('Attempting to start a new game.');
  const startGame = httpsCallable(functions, 'startGame');
  return startGame(gameStartParameters)
    .then((gameObjData) => {
      const gameObj = gameObjData.data;
      currentOpp = gameObj.opponent;
      currentGameId = gameObj.gameId;
      subscribeToGame(currentGameId);
      return currentGameId; // gameObjData.data.game;
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
  if (currentGame.puzzle.grid[index].guessArray) {
    currentGame.puzzle.grid[index].guessArray.push(letter);
  } else {
    currentGame.puzzle.grid[index].guessArray = [letter];
  }
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
  abandonObj.opponentUid = currentOpp.uid;
  abandonObj.playerUid = currentUser.uid;
  const abandonGame2 = httpsCallable(functions, 'abandonGame2');
  abandonGame2(abandonObj).catch((err) => {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}

async function storeSettingsController(settingsPrefs) {
  let prefAvatarUrl = null;
  if (settingsPrefs.prefAvatar) {
    const settingsRef = refStorage(
      storage,
      `users/${currentUser.uid}/avatar.png`
    );
    const metaData = { contentType: 'image/png' };
    await uploadBytes(settingsRef, settingsPrefs.prefAvatar, metaData).catch(
      (error) => {
        console.log('Error uploading photo to storage: ', error);
      }
    );
    prefAvatarUrl = await getDownloadURL(settingsRef);
  }
  const refUserData = doc(db, 'users', currentUser.uid);
  try {
    await runTransaction(db, async (transaction) => {
      const userDoc = await transaction.get(refUserData);
      if (!userDoc.exists()) throw 'User document does not exist!';

      currentUser.prefName = settingsPrefs.prefName || null;
      currentUser.prefHandle = settingsPrefs.prefHandle || null;
      const updateData = {
        prefName: currentUser.prefName,
        prefHandle: currentUser.prefHandle,
      };
      if (prefAvatarUrl) {
        currentUser.prefAvatarUrl = prefAvatarUrl;
        updateData.prefAvatarUrl = prefAvatarUrl;
      }
      transaction.update(refUserData, updateData);
    });
  } catch (error) {
    console.log('UserData update transaction failed: ', error);
  }
}

/**
 * Check availability of unique handle for for users preferred handle.
 * @param {string} handle
 * @returns {boolean} true if handle is available, false otherwise
 */
async function handleCheckController(handle) {
  const q = query(collection(db, 'users'), where('prefHandle', '==', handle));
  const docs = await getDocs(q);
  let available = true;
  docs.forEach((doc) => {
    if (doc.id !== currentUser.uid) available = false;
  });
  return available;
}

/**
 * Creates a minimal pendingPlayer and adds to Firestore, then returns the
 * document id for the pendingPlayer.
 * @param {object} nameObject object with `firstName` for pending player
 * @returns document id for pendingPlayer
 */
async function pendingPlayerController(nameObject) {
  const pendingPlayer = httpsCallable(functions, 'pendingPlayer');
  return pendingPlayer(nameObject).then((docId) => {
    return docId.data;
  });
}

export {
  authButtonClickedController,
  startNewGameController,
  getCurrentUserController,
  getCurrentOppController,
  populateAllUsersController,
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
  getGameListParametersController,
  // populateSettingsController,
  storeSettingsController,
  handleCheckController,
  // populateFriendsController,
  updateFriendsController,
  getMyFriendsController,
  pendingPlayerController,
};
