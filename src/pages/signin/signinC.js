import { db, app, auth, functions, messaging } from '../../firebase-init.js';
import { authChangeView } from './signinV.js';
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
  setDoc,
  doc,
  getDocs,
  query,
  collection,
  where,
  onSnapshot,
  runTransaction,
} from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import {
  disableGamesOverflow,
  disableSettingsOverflow,
  enableGamesOverflow,
  enableSettingsOverflow,
} from '../../shellV.js';
import { route } from '../../router.js';
import { showActivity } from '../../pageFrags/activity/activity.js';
import { constants } from '../../constants.js';

let myFriends = {};
let currentUserUnsubscribe = () => {};

const dbRT = getDatabase(app);
let currentUser = null;
let userStatusDatabaseRef = null;
// TODO: should this be tracked, and what can be done while offline?
let online = false;

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
  if (!auth.currentUser) return;
  onDisconnect(userStatusDatabaseRef)
    .set(authState('offline'))
    .then(() => {
      set(userStatusDatabaseRef, authState('online'));
    });
});

let timeoutId = null;

/**
 * Firestore function that monitors auth state.
 */
onAuthStateChanged(auth, async (user) => {
  const uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user: ', user);
  if (!uid) {
    disableSettingsOverflow();
    disableGamesOverflow();
    currentUserUnsubscribe();
    timeoutId = setTimeout(() => {
      route('/signin');
    }, 1000);
    return;
  }
  await checkForPendingPlayer();
  userStatusDatabaseRef = ref(dbRT, `/users/${uid}`);
  currentUserSubscribe(user);
});

/**
 * Listen for changes on current user.
 * @param {object} user
 */
function currentUserSubscribe(user) {
  console.log('Hello from subscribeToGame.');
  clearTimeout(timeoutId);
  // Start listening to current user changes
  currentUserUnsubscribe = onSnapshot(
    doc(db, 'users', user.uid),
    async (userSnap) => {
      // should never happen
      if (!userSnap.exists()) {
        currentUser = null;
        route('/signin');
        return;
      }
      currentUser = userSnap.data();
      myFriends = {};
      try {
        const authChange = httpsCallable(functions, 'authChange');
        await authChange().data;
        // await checkForPendingPlayer();
        authChangeView(currentUser);
        generateMessagingToken();
        await populateMyFriends();
        enableSettingsOverflow();
        enableGamesOverflow();
        route(location.href);
      } catch (err) {
        console.log('Error code: ', err.code);
        console.log('Error message: ', err.message);
        console.log('Error details: ', err.details);
      }
      // depending on what is showing, upadate the display
    },
    (error) => {
      console.error('Error subscribing to current user: ', error);
    }
  );
}

async function checkForPendingPlayer() {
  // if there is a 'xwwf_invite' cookie, use it to create a new user from
  // the pending player object in Firestore
  console.log('document.cookie: ', document.cookie);
  console.log('auth.currentUser: ', auth.currentUser);
  if (document.cookie.includes('xwwf_invite')) {
    showActivity('.header__activity', 'Working...');
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
 * Configure messaging credentials
 */
function generateMessagingToken() {
  console.log('Hello from generateMessagingToken');
  try {
    getToken(messaging, {
      vapidKey: constants.VAPID_KEY,
    }).then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
        onMessage(messaging, (message) => {
          console.log('New message from FCM: ', message.notification);
        });
      } else {
        requestNotificationsPermissions();
      }
    });
  } catch (err) {
    console.log('An error occurred while retrieving token: ', err);
  }
}

// Requests permissions to show notifications.
async function requestNotificationsPermissions() {
  console.log('Requesting notifications permission...');
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      console.log('Notification permission granted.');
      // Notification permission granted.
      generateMessagingToken();
    } else {
      console.log('Unable to get permission to notify.');
    }
  });
}

/**
 * Send cloud messaging token to server
 * @param {string} messagingToken Cloud messaging token
 */
async function sendTokenToServer(messagingToken) {
  console.log('Messaging permission granted. Token: ', messagingToken);
  const refUserPrivateData = doc(db, `/users/${currentUser.uid}/private/data/`);
  try {
    return runTransaction(db, async (transaction) => {
      const userData = await transaction.get(refUserPrivateData);
      if (!userData.exists()) throw 'User document does not exist!';
      const privateData = userData.data();
      let tokens = privateData.msgTokens || [];
      for (const token of tokens) {
        if (token.split(':')[0] === messagingToken.split(':')[0]) {
          tokens.splice(tokens.indexOf(token), 1);
        }
      }
      tokens.push(messagingToken);
      const updateData = {};
      updateData.msgTokens = tokens;
      transaction.update(refUserPrivateData, updateData);
    });
  } catch (error) {
    console.log('UserData update transaction failed: ', error);
  }
}

/**
 * Creates a minimal pendingPlayer and adds to Firestore, then returns the
 * document id for the pendingPlayer.
 * @param {object} nameObject object with `firstName` for pending player
 * @returns document id for pendingPlayer
 */
function initPendingPlayer(nameObject) {
  const pendingPlayer = httpsCallable(functions, 'pendingPlayer');
  return pendingPlayer(nameObject).then((docId) => {
    return docId.data;
  });
}

/**
 * Update the users friends and blocked values in Firestore via cloud function
 * @param {object} adjustedFriendsObject contains friends and blocked uid arrays
 * @returns {Promise<myFriends>} promise resolving to new myFriends object
 */
function updateMyFriends(adjustedFriendsObject) {
  currentUser.friends = adjustedFriendsObject.friends;
  currentUser.blocked = adjustedFriendsObject.blocked;
  adjustedFriendsObject.uid = currentUser.uid;
  const updateFriends = httpsCallable(functions, 'updateFriends');
  return updateFriends(adjustedFriendsObject).then(() => {
    return populateMyFriends();
  });
}

/**
 * Populate list of all users from firestore and return the list.
 * @returns Object containing all users by uid
 */
function populateAllUsers() {
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
 * Populate list of all users from firestore and return the list.
 * @returns Object containing friends of currentUser
 */
function populateMyFriends() {
  console.log('Hello from populateMyFriends');
  if (!currentUser) return;
  myFriends = {};
  if (currentUser.friends.length === 0) return;
  const q = query(
    // TODO: Should this query be done as a function on the server side?
    collection(db, 'users')
    // , where('uid', 'in', currentUser.friends)
  );
  return getDocs(q).then((snapshot) => {
    if (snapshot.empty) {
      console.log('No friends added yet.');
      return {};
    }
    snapshot.docs.forEach((doc) => {
      // console.log(doc.data());
      const user = doc.data();
      if (doc.id !== currentUser.uid && currentUser.friends.includes(doc.id)) {
        myFriends[doc.id] = user;
      }
    });
    for (const key of Object.keys(myFriends)) {
      if (!currentUser.friends.includes(key)) delete myFriends[key];
    }
    return myFriends;
  });
}

export {
  initPendingPlayer,
  authState,
  updateMyFriends,
  populateAllUsers,
  populateMyFriends,
  currentUser,
  myFriends,
  online,
};
