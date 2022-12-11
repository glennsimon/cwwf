import { db, app, auth, functions, messaging } from '../../firebase-init.js';
import { authChangeView, showHeaderActivityView } from './signinV.js';
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
import { getDoc, setDoc, doc } from 'firebase/firestore';
import { httpsCallable } from 'firebase/functions';
import { showActivity } from '../common/shared.js';
import { populateMyFriends, populateMyGames } from '../games/gamesC.js';

// let myFriends = {};

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
  let userFirestoreRef = doc(db, `/users/${uid}`);
  const snapshot = await getDoc(userFirestoreRef);
  if (snapshot.exists()) {
    currentUser = snapshot.data();
  }
  userStatusDatabaseRef = ref(dbRT, `/users/${uid}`);
  // myFriends = {};
  try {
    const authChange = httpsCallable(functions, 'authChange');
    let authChangeData = await authChange().data;
    console.log('authChangeData: ', authChangeData);
    // currentUser.uid = uid;
    await checkForPendingPlayer();
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
 * Configure messaging credentials
 */
async function generateMessagingToken() {
  try {
    const messagingToken = await getToken(messaging);
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

export { authButtonClickedController, pendingPlayerController, currentUser };
