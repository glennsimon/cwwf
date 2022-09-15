import { app, db } from './firebase-init.js';
import { clearLists, toggleDrawer } from './games.js';
import { setDoc, doc } from 'firebase/firestore';
import {
  getDatabase,
  ref,
  onValue,
  onDisconnect,
  set,
  serverTimestamp,
} from 'firebase/database';
import {
  getAuth,
  onAuthStateChanged,
  beforeAuthStateChanged,
  signOut,
} from 'firebase/auth';

/** Note: FirebaseUI is not compatible with the v9 modular SDK.
 * The v9 compatibility layer (specifically, the app-compat and
 * auth-compat packages) permits the usage of FirebaseUI alongside v9,
 * but without the app size reduction and other benefits of the v9 SDK.
 *
 * This is why the Node.js syntax is used below.
 */
import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

let auth = getAuth();
let unsubscribeUser = () => {};
const dbRT = getDatabase(app);

window.addEventListener('load', function () {
  initApp();
  // if (location.hostname === 'localhost') loadUsers();
});

/** Initialize after document loads */
function initApp() {
  const authButton = document.getElementById('authButton');
  // const authContainer = document.getElementById('firebaseuiAuthContainer');
  const profileName = document.getElementById('profileName');
  const avatar = document.getElementById('avatar');
  const ui = new firebaseui.auth.AuthUI(auth);
  let uid = null;

  const uiConfig = {
    signInSuccessUrl: './',
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GithubAuthProvider.PROVIDER_ID,
      // firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: './#tos',
    // Privacy policy url.
    privacyPolicyUrl: './#privacy',
  };

  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseuiAuthContainer', uiConfig);

  // handles change to database just before auth state changes,
  // allowing permission to make the change.
  beforeAuthStateChanged(auth, (user) => {
    if (uid) {
      set(ref(dbRT, `/users/${uid}`), {
        lastChanged: serverTimestamp(),
        state: 'offline',
      });
    }
  });

  // const unsubscribeUser = onAuthStateChanged(auth, (user) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      const uid = user.uid;
      const userData = {};
      userData.displayName = user.displayName;
      userData.photoURL = user.photoURL;
      userData.providerId = user.providerData[0].providerId;
      userData.uid = uid;
      userData.privateData = {
        email: user.email,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        providerData: user.providerData,
        providerId: user.providerId,
      };
      setDoc(doc(db, `/users/${uid}`), userData, { merge: true })
        .then(() => {
          authButton.textContent = 'sign out';
          profileName.textContent = user.displayName;
          avatar.src = user.photoURL
            ? user.photoURL
            : 'assets/avatar_circle_black.png';

          // Create a reference to this user's specific status node.
          // This is where we will store data about being online/offline.
          set(ref(dbRT, `/users/${uid}`), {
            lastChanged: serverTimestamp(),
            state: 'online',
          });
          return;
        })
        .catch((err) => {
          console.log('error: ', err);
        });
    }
  });

  // Updates user online status only if user is logged in
  // when connection/disconnection with app is made.
  // If no user is logged in, this does nothing.
  onValue(ref(dbRT, '.info/connected'), (snapshot) => {
    uid = auth.currentUser ? auth.currentUser.uid : null;
    if (snapshot.val() === false) {
      return;
    } else if (uid) {
      let online = {
        state: 'online',
        lastChanged: serverTimestamp(),
      };
      let offline = {
        state: 'offline',
        lastChanged: serverTimestamp(),
      };

      onDisconnect(ref(dbRT, `/users/${uid}`))
        .set(offline)
        .then(() => {
          set(ref(dbRT, `/users/${uid}`), online);
          return;
        });
    }
  });

  authButton.addEventListener('click', () => {
    toggleDrawer();
    if (authButton.textContent === 'sign out') {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          clearLists();
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    }
    location.hash = '#signin';
  });
}
