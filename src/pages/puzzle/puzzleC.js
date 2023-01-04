import {
  db,
  app,
  auth,
  functions,
  messaging,
  storage,
} from '../../firebase-init.js';
import {
  authChangeView,
  showPuzzle,
  animateScoringView,
  showHeaderActivityView,
  idxArray,
  acrossWord,
} from './puzzleV.js';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
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
import { showErrorDialog } from '../../pageFrags/dialogs/dialogsV.js';
import { currentUser, online } from '../signin/signinC.js';
import { route } from '../../router.js';

let currentOpp = null;
let userStatusDatabaseRef = null;
let myGames = [];
let currentGame = null;
let currentGameId = null;
let columns = null;
// let idxArray = [];
let myTurn = null;
let gameListParameters = {};
// TODO: should this be tracked, and what can be done while offline?
// let online = false;
let myFriends = {};

// webpack dynamic imports:
// let mySignOut = () => {};

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
let gameUnsubscribe = () => {};
let myGamesUnsubscribe = () => {};

function cleanGameParameters() {
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
 */
function startNewGame(gameStartParameters) {
  console.log('Attempting to start a new game.');
  const startGame = httpsCallable(functions, 'startGame');
  startGame(gameStartParameters)
    .then((gameIdObj) => {
      const gameId = gameIdObj.data;
      route(`/puzzle?gameId=${gameId}`);
      // subscribeToGame(gameId);
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
      const prevGameId = currentGameId;
      currentGame = gameSnap.data();
      const playerUids = Object.keys(currentGame.players);
      if (!currentOpp || !playerUids.includes(currentOpp.uid)) {
        const opponentUid =
          playerUids[0] === currentUser.uid ? playerUids[1] : playerUids[0];
        currentOpp = (await getDoc(doc(db, `users/${opponentUid}`))).data();
      }
      currentGameId = gameId;
      // idxArray = [];
      columns = currentGame.puzzle.cols;
      myTurn = currentUser.uid === currentGame.nextTurn;
      if (prevGameId === gameId) {
        await animateScoringView(currentGame.lastTurnCheckObj);
      }
      // route(`/puzzle?gameId=${gameId}`);
      showPuzzle();
    },
    (error) => {
      console.error('Error subscribing to puzzle: ', error);
    }
  );
}

// async function checkForPendingPlayer() {
//   // if there is a 'xwwf_invite' cookie, use it to create a new user from
//   // the pending player object in Firestore
//   console.log('document.cookie: ', document.cookie);
//   console.log('auth.currentUser: ', auth.currentUser);
//   if (document.cookie.includes('xwwf_invite')) {
//     const cookies = document.cookie.split(';');
//     console.log('cookies array: ', cookies);
//     for (const cookie of cookies) {
//       if (cookie.trim().startsWith('xwwf_invite=')) {
//         const uidStrings = cookie.slice(13).split('&');
//         const pendingUid = uidStrings[0].split('=')[1];
//         const gameId = uidStrings[1].split('=')[1];
//         const newUserObject = {};
//         newUserObject.pendingUid = pendingUid;
//         newUserObject.gameId = gameId;
//         console.log('newUserObject: ', newUserObject);
//         const updatePendingPlayer = httpsCallable(
//           functions,
//           'updatePendingPlayer'
//         );
//         currentUser = (await updatePendingPlayer(newUserObject)).data;
//         console.log('currentUser: ', currentUser);
//         if (currentUser) document.cookie = 'xwwf_invite=done; max-age=0';
//         return 'xwwf_invite cookie used and deleted';
//       }
//     }
//   }
//   return 'No xwwf_invite cookie found.';
// }

// /**
//  * Configure messaging credentials with FCM VAPID key
//  */
// async function generateMessagingToken() {
//   try {
//     const messagingToken = await getToken(messaging); //, {
//     //   vapidKey: vapidKey,
//     // });
//     if (messagingToken) {
//       sendTokenToServer(messagingToken);
//       onMessage(messaging, (message) => {
//         console.log('New message from FCM: ', message.notification);
//       });
//     } else {
//       requestNotificationsPermissions();
//     }
//   } catch (err) {
//     console.log('An error occurred while retrieving token: ', err);
//   }
// }

// // Requests permissions to show notifications.
// async function requestNotificationsPermissions() {
//   console.log('Requesting notifications permission...');
//   const permission = await Notification.requestPermission();

//   if (permission === 'granted') {
//     console.log('Notification permission granted.');
//     // Notification permission granted.
//     await generateMessagingToken();
//   } else {
//     console.log('Unable to get permission to notify.');
//   }
// }

// /**
//  * Send cloud messaging token to server
//  * @param {string} messagingToken Cloud messaging token
//  */
// async function sendTokenToServer(messagingToken) {
//   console.log('Messaging permission granted. Token: ', messagingToken);
//   if (currentUser.uid) {
//     await setDoc(
//       doc(db, `/users/${currentUser.uid}/`),
//       { msgToken: messagingToken },
//       { merge: true }
//     );
//     return;
//   }
// }

// /**
//  * Populate list of all users from firestore and return the list.
//  * @returns Object containing all users by uid
//  */
// function populateAllUsersController() {
//   return getDocs(query(collection(db, 'users')))
//     .then((snapshot) => {
//       if (snapshot.empty) {
//         console.warn('No users exist yet.');
//         return;
//       }
//       const usersObj = {};
//       snapshot.docs.forEach((doc) => {
//         // console.log(doc.data());
//         const user = doc.data();
//         if (user.uid !== currentUser.uid) usersObj[user.uid] = user;
//       });
//       return usersObj;
//     })
//     .catch((error) => console.log('Error getting list of users: ', error));
// }

// /**
//  * Update the users friends and blocked values in Firestore via cloud function
//  * @param {object} adjustedFriendsObject contains friends and blocked uid arrays
//  */
// async function updateFriendsController(adjustedFriendsObject) {
//   currentUser.friends = adjustedFriendsObject.friends;
//   currentUser.blocked = adjustedFriendsObject.blocked;
//   adjustedFriendsObject.uid = currentUser.uid;
//   const updateFriends = httpsCallable(functions, 'updateFriends');
//   updateFriends(adjustedFriendsObject);
//   await populateMyFriends();
//   loadFriendsSettingsView(myFriends);
// }

// /**
//  * Populate list of all users from firestore and return the list.
//  * @returns Object containing friends of currentUser
//  */
// function populateMyFriends() {
//   console.log('Hello from populateMyFriends');
//   if (!currentUser) return;
//   if (currentUser.friends.length === 0) return;
//   const q = query(
//     collection(db, 'users'),
//     where('uid', 'in', currentUser.friends)
//   );
//   return getDocs(q).then((snapshot) => {
//     if (snapshot.empty) {
//       console.log('No friends added yet.');
//       return {};
//     }
//     snapshot.docs.forEach((doc) => {
//       // console.log(doc.data());
//       const user = doc.data();
//       if (doc.id !== currentUser.uid) myFriends[doc.id] = user;
//     });
//     for (const key of Object.keys(myFriends)) {
//       if (!currentUser.friends.includes(key)) delete myFriends[key];
//     }
//     return;
//   });
// }

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
    showErrorDialog(errorMessage);
    return;
  }
  if (location.pathname.startsWith('/puzzle') && !myTurn) {
    const errorMessage =
      `Whoa there, Buckaroo... ` +
      `Your opponent hasn't played their turn yet!`;
    showErrorDialog(errorMessage);
    return;
  }
  if (!online) {
    const errorMessage =
      `You are currently disconnected from the ` +
      `internet. When connection is restored you may have to ` +
      `play your turn again`;
    showErrorDialog(errorMessage);
  }
  const answerObj = {};
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentGameId;
  answerObj.acrossWord = acrossWord;
  answerObj.guess = [];
  // answerObj.playerUid = currentUser.uid;
  // answerObj.opponentUid = currentOpp.uid;
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
 * Enter a letter into the currentGame as a guess.
 * @param {string} letter Letter to be entered into the square
 * @param {number} index Index of square
 */
function enterGuess(letter, index) {
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
  currentOpp,
  cleanGameParameters,
  startNewGame,
  subscribeToGame,
  savePuzzle,
  playWordController,
  enterGuess,
  concedeCurrentGame,
};
