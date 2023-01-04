import { db, functions } from '../../firebase-init.js';
import { loadGames } from './gamesV.js';
import {
  collection,
  getDoc,
  getDocs,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { currentUser } from '../signin/signinC.js';
import { showActivity } from '../../pageFrags/activity/activity.js';
import { currentOpp, startNewGame } from '../puzzle/puzzleC.js';
// import { httpsCallable } from 'firebase/functions';
// import {
//   getDownloadURL,
//   ref as refStorage,
//   uploadBytes,
// } from 'firebase/storage';
// import { settings } from 'firebase/analytics';
// import { loadFriendsSettingsView } from '../settings/settingsV.js';
// // import { runtime } from 'webpack';
// // import { settings } from 'firebase/analytics';

// const dbRT = getDatabase(app);
// const vapidKey =
//   'BJ2DYpKmkCOjApNtK7gzaj5JAAC3ec6SkndGANE5QSavKz-sIzF_Z1IxTw_g7lhrbx6RuJORRfmWzEpcjYda14E';
// // 'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak'

// let currentUser = null;
// let currentOpp = null;
// let userStatusDatabaseRef = null;
let myGames = [];
// let currentGame = null;
// let currentGameId = null;
// let acrossWord = true;
// let columns = null;
// let idxArray = [];
// let myTurn = null;
// let gameListParameters = {};
// // TODO: should this be tracked, and what can be done while offline?
// let online = false;
// let myFriends = {};

// // webpack dynamic imports:
// // let mySignOut = () => {};

// /**
//  * Unsubscribe from listening for changes on current game. Does nothing
//  * if not subscribed to any game.
//  */
// let gameUnsubscribe = () => {};
let myGamesUnsubscribe = () => {};

// /**
//  * Get myFriends. Should be used by all external modules.
//  * @returns {object} Returns my friends users objects
//  */
// function getMyFriendsController() {
//   return myFriends;
// }

// /**
//  * Get gameListParameters. Should be used by all external modules.
//  * @returns {object} Returns gameListParameters or null
//  */
// function getGameListParametersController() {
//   return gameListParameters;
// }

// /**
//  * Set the currentGame. Should be used by all external modules.
//  * @param {object} game Game with some parameters changed or added
//  */
// function setCurrentGameController(game) {
//   currentGame = game;
// }

// /**
//  * Set the currentGameId. Should be used by all external modules.
//  * @param {object} gameId gameId | null
//  */
// function setCurrentGameIdController(gameId) {
//   currentGameId = gameId;
// }

// /**
//  * Get the value of acrossWord. Should be used by all external modules.
//  * @returns {boolean} true if across, false if down
//  */
// function getAcrossWordController() {
//   return acrossWord;
// }

// /**
//  * Set acrossWord. Should be used by all external modules.
//  * @param {boolean} across true if across, false if down
//  */
// function setAcrossWordController(across) {
//   acrossWord = across;
// }

// /**
//  * Get the currentUser. Should be used by all external modules.
//  * @returns {Object} Returns currentUser or null
//  */
// function getCurrentUserController() {
//   return currentUser;
// }

// /**
//  * Get currentOpp. Should be used by all external modules.
//  * @returns {object} Returns currentOpp user object
//  */
// function getCurrentOppController() {
//   return currentOpp;
// }

// /**
//  * Get the myGames Object. Should be used by all external modules.
//  * @returns {Array} Returns myGames Array
//  */
// function getAllGamesController() {
//   return myGames;
// }

// /**
//  * Get the columns Object. Should be used by all external modules.
//  * @returns {number} Returns number of columns
//  */
// function getColumnsController() {
//   return columns;
// }

// /**
//  * Get the idxArray containing the indices of the currently selected word in the
//  * puzzle. Should be used by all external modules.
//  * @returns {array} Returns idxArray
//  */
// function getIdxArrayController() {
//   return idxArray;
// }

// /**
//  * Set the idxArray containing the indices of the currently selected word in the
//  * puzzle. Should be used by all external modules.
//  * @param {array} wordArray Array containing the indexes of the currently selected word.
//  */
// function setIdxArrayController(wordArray) {
//   idxArray = wordArray;
// }

// /**
//  * Helper function for creating state object.
//  * @param {string} state
//  * @returns State object to store for user on database
//  */
// function authState(state) {
//   return { state: state, lastChanged: serverTimestamp() };
// }

// // Updates user online status only if user is logged in
// // when connection/disconnection with app is made.
// // If no user is logged in, this does nothing.
// onValue(ref(dbRT, '.info/connected'), (snapshot) => {
//   online = snapshot.val();
//   console.log('connected notification change fired. Connected: ', `${online}`);
//   // const uid = auth.currentUser ? auth.currentUser.uid : null;
//   if (!currentUser) {
//     return;
//   }
//   onDisconnect(userStatusDatabaseRef)
//     .set(authState('offline'))
//     .then(() => {
//       set(userStatusDatabaseRef, authState('online'));
//     });
// });

// /**
//  * Firestore function that monitors auth state.
//  */
// onAuthStateChanged(auth, async (user) => {
//   const uid = user ? user.uid : null;
//   console.log('Hello from onAuthStateChanged. Current user: ', user);
//   if (!uid) return;
//   showHeaderActivityView('Signing in, fetching games...');
//   let userFirestoreRef = doc(db, `/users/${uid}`);
//   const snapshot = await getDoc(userFirestoreRef);
//   if (snapshot.exists()) {
//     currentUser = snapshot.data();
//   }
//   userStatusDatabaseRef = ref(dbRT, `/users/${uid}`);
//   myFriends = {};
//   try {
//     const authChange = httpsCallable(functions, 'authChange');
//     let authChangeData = await authChange().data;
//     console.log('authChangeData: ', authChangeData);
//     // currentUser.uid = uid;
//     await checkForPendingPlayer();
//     authChangeView(currentUser);
//     generateMessagingToken();
//     populateMyGames(uid);
//     await populateMyFriends();
//   } catch (err) {
//     console.log('Error code: ', err.code);
//     console.log('Error message: ', err.message);
//     console.log('Error details: ', err.details);
//   }
// });

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

/**
 * Populate list of all games that is viewable to the current user
 * from firestore when auth changes or when something changes in that list.
 * @param {string} uid User ID
 */
async function populateMyGames(uid) {
  console.log('Hello from populateMyGames.');
  if (!uid) return;
  showActivity('.header__activity', 'Fetching games...');
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
    const myActiveGames = [];
    const userIds = [];
    // let currentOpponentUid = null;
    snapshot.forEach((doc) => {
      // console.log('query snapshot doc.data(): ', doc.data());
      const gameListItem = doc.data();
      gameListItem.gameId = doc.id;
      if (gameListItem.finish) {
        myPastGames.push(gameListItem);
      } else {
        myActiveGames.push(gameListItem);
      }
      for (const uid of gameListItem.viewableBy) {
        if (!userIds.includes(uid)) userIds.push(uid);
      }
      // if (doc.id === currentGameId) {
      //   currentOpponentUid =
      //     gameListItem.viewableBy[0] === currentUser.uid
      //       ? gameListItem.viewableBy[1]
      //       : gameListItem.viewableBy[0];
      // }
    });
    myPastGames.sort((a, b) => {
      return b.finish - a.finish;
    });
    myActiveGames.sort((a, b) => {
      return b.start - a.start;
    });
    // const userIds = [];
    myGames = myActiveGames.concat(myPastGames);
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
      loadGames(myGames, userData);
    }
    return;
  });
}

/** Load game based on user selection */
function replayOpponent(game, difficulty) {
  showActivity('.header__activity', 'Getting new game...');
  // load puzzle based on uids of players
  const gameStartParameters = {};
  gameStartParameters.difficulty = difficulty;
  gameStartParameters.players = game.players;
  gameStartParameters.viewableBy = Object.keys(game.players);
  startNewGame(gameStartParameters);
}

// /**
//  * Checks if array of cells has a letter in each square
//  * @return {boolean} true if word is incomplete, false otherwise
//  */
// function incomplete() {
//   console.log('Hello from incomplete. idxArray: ', idxArray);
//   if (idxArray.length === 0) return true;
//   for (const i of idxArray) {
//     if (
//       !currentGame.puzzle.grid[i].guessArray ||
//       currentGame.puzzle.grid[i].guessArray.length === 0
//     ) {
//       return true;
//     }
//   }
//   return false;
// }

// /**
//  * Appends the append Object to the base Object.
//  * @param {object} base Base object to append to
//  * @param {object} append Object to append to base
//  */
// function appendObject(base, append) {
//   const keys = Object.keys(append);
//   keys.forEach((key) => {
//     base[key] = append[key];
//   });
// }

// function abandonCurrentGameController() {
//   const abandonObj = {};
//   abandonObj.gameId = currentGameId;
//   abandonObj.opponentUid = currentOpp.uid;
//   abandonObj.playerUid = currentUser.uid;
//   const abandonGame2 = httpsCallable(functions, 'abandonGame2');
//   abandonGame2(abandonObj).catch((err) => {
//     console.log('Error code: ', err.code);
//     console.log('Error message: ', err.message);
//     console.log('Error details: ', err.details);
//   });
// }

// async function storeSettingsController(settingsPrefs) {
//   let prefAvatarUrl = null;
//   if (settingsPrefs.prefAvatar) {
//     const settingsRef = refStorage(
//       storage,
//       `users/${currentUser.uid}/avatar.png`
//     );
//     const metaData = { contentType: 'image/png' };
//     await uploadBytes(settingsRef, settingsPrefs.prefAvatar, metaData).catch(
//       (error) => {
//         console.log('Error uploading photo to storage: ', error);
//       }
//     );
//     prefAvatarUrl = await getDownloadURL(settingsRef);
//   }
//   const refUserData = doc(db, 'users', currentUser.uid);
//   try {
//     await runTransaction(db, async (transaction) => {
//       const userDoc = await transaction.get(refUserData);
//       if (!userDoc.exists()) throw 'User document does not exist!';

//       currentUser.prefName = settingsPrefs.prefName || null;
//       currentUser.prefHandle = settingsPrefs.prefHandle || null;
//       const updateData = {
//         prefName: currentUser.prefName,
//         prefHandle: currentUser.prefHandle,
//       };
//       if (prefAvatarUrl) {
//         currentUser.prefAvatarUrl = prefAvatarUrl;
//         updateData.prefAvatarUrl = prefAvatarUrl;
//       }
//       transaction.update(refUserData, updateData);
//     });
//   } catch (error) {
//     console.log('UserData update transaction failed: ', error);
//   }
// }

// /**
//  * Check availability of unique handle for for users preferred handle.
//  * @param {string} handle
//  * @returns {boolean} true if handle is available, false otherwise
//  */
// async function handleCheckController(handle) {
//   const q = query(collection(db, 'users'), where('prefHandle', '==', handle));
//   const docs = await getDocs(q);
//   let available = true;
//   docs.forEach((doc) => {
//     if (doc.id !== currentUser.uid) available = false;
//   });
//   return available;
// }

// /**
//  * Creates a minimal pendingPlayer and adds to Firestore, then returns the
//  * document id for the pendingPlayer.
//  * @param {object} nameObject object with `firstName` for pending player
//  * @returns document id for pendingPlayer
//  */
// async function pendingPlayerController(nameObject) {
//   const pendingPlayer = httpsCallable(functions, 'pendingPlayer');
//   return pendingPlayer(nameObject).then((docId) => {
//     return docId.data;
//   });
// }

export {
  populateMyGames,
  replayOpponent,
  // populateMyFriends,
  // populateAllUsers,
  // currentGame,
  // currentGameId,
  // currentOpp,
  // myFriends,
  myGames,
};
//   startNewGameController,
//   getCurrentUserController,
//   getCurrentOppController,
//   populateAllUsersController,
//   getAllGamesController,
//   getColumnsController,
//   getIdxArrayController,
//   setIdxArrayController,
//   setCurrentGameController,
//   setCurrentGameIdController,
//   abandonCurrentGameController,
//   getAcrossWordController,
//   setAcrossWordController,
//   getGameListParametersController,
//   // populateSettingsController,
//   storeSettingsController,
//   handleCheckController,
//   // populateFriendsController,
//   getMyFriendsController,
//   pendingPlayerController,
//   currentUser,
//   currentGameId,
// };
