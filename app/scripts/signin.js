import { app, db } from './firebase-init.js';
import { clearLists } from './games';
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
  signOut,
  signInAnonymously,
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

// let firebaseConfig = {
//   apiKey: 'AIzaSyDNheDAGRrSjCgic20dgnuawMILWBrTNUk',
//   authDomain: 'xwordswf.firebaseapp.com',
//   databaseURL: 'https://xwordswf.firebaseio.com',
//   projectId: 'xwordswf',
//   storageBucket: 'xwordswf.appspot.com',
//   messagingSenderId: '38205810024',
//   appId: '1:38205810024:web:d3d48e2fbc2d1c17bee2dd',
// };

// if (location.hostname === 'localhost') {
//   firebaseConfig.databaseURL = 'http://localhost:9000?ns=emulatorui';
// }
// const app = firebase.initializeApp(firebaseConfig);

let auth = getAuth();
let unsubscribeUser = () => {};
const dbRT = getDatabase();

window.addEventListener('load', function () {
  initApp();
  // if (location.hostname === 'localhost') loadUsers();
});

// const gs_goog = JSON.parse(`{
//   "state": "online",
//   "lastChanged": 100000,
//   "displayName": "Glenn Simon",
//   "photoURL": "https://lh5.googleusercontent.com/-rYlKFe3k7Ws/AAAAAAAAAAI/AAAAAAAAXJU/ONxtyayEM7s/photo.jpg",
//   "providerId": "google.com",
//   "uid": "3eoDltvYiwYfjPviYRRQ2agbsAz1",
//   "privateData": {
//       "email": "glenncochransimon@gmail.com",
//       "emailVerified": true,
//       "phoneNumber": null,
//       "providerData": [
//           {
//               "uid": "104090209296416096492",
//               "displayName": "Glenn Simon",
//               "photoURL": "https://lh3.googleusercontent.com/a-/AFdZucrige7GvukBS3FfesyAIb7djUVPgOO4EoHMveVN9LY=s96-c",
//               "email": "glenncochransimon@gmail.com",
//               "phoneNumber": null,
//               "providerId": "google.com"
//           }
//       ],
//       "providerId": "firebase"
//   }
// }`);

// const gs_hpe = JSON.parse(`{
//   "state": "online",
//   "lastChanged": 100000,
//   "displayName": "Glenn Simon",
//   "photoURL": null,
//   "providerId": "password",
//   "uid": "XmnG5tbuZNXjgICv8SyyOuqvtkj2",
//   "privateData": {
//       "email": "glenn.simon@hpe.com",
//       "emailVerified": false,
//       "phoneNumber": null,
//       "providerData": [
//           {
//               "uid": "glenn.simon@hpe.com",
//               "displayName": "Glenn Simon",
//               "photoURL": null,
//               "email": "glenn.simon@hpe.com",
//               "phoneNumber": null,
//               "providerId": "password"
//           }
//       ],
//       "providerId": "firebase"
//   }
// }`);

/** Initialize after document loads */
function initApp() {
  const authButton = document.getElementById('authButton');
  const authContainer = document.getElementById('firebaseuiAuthContainer');
  const profileName = document.getElementById('profileName');
  const avatar = document.getElementById('avatar');
  const puzTable = document.getElementById('puzTable');
  const clueContainer = document.getElementById('clueContainer');
  const kbContainer = document.getElementById('kbContainer');
  const splash = document.getElementById('splash');
  const ui = new firebaseui.auth.AuthUI(auth);
  let uid = null;
  let userStatusDatabaseRef;
  let userStatusFirestoreRef;

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

  // const unsubscribeUser = onAuthStateChanged(auth, (user) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in.
      uid = user.uid;
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

      authButton.textContent = 'sign out';
      profileName.textContent = user.displayName;
      avatar.src = user.photoURL
        ? user.photoURL
        : 'images/avatar_circle_black.png';

      // Create a reference to this user's specific status node.
      // This is where we will store data about being online/offline.
      setDoc(doc(db, `/users/${uid}`), userData, { merge: true }).then(
        set(ref(dbRT, `/users/${uid}`), {
          timestamp: serverTimestamp(),
          state: 'online',
        })
      );
      authContainer.classList.add('displayNone');
    } else {
      // User is signed out.
      uid = null;
      // if (uid) {
      //   set(ref(dbRT, `/users/${uid}`), {
      //     timestamp: serverTimestamp(),
      //     state: 'offline',
      //   });
      //   setDoc(
      //     doc(db, `/users/${uid}`),
      //     { timestamp: serverTimestamp(), state: 'offline' },
      //     { merge: true }
      //   );
      // }
      // uid = null;
      // authButton.textContent = 'sign in';
      // authContainer.classList.remove('displayNone');
      // profileName.textContent = 'N. E. Person';
      // avatar.src = 'images/avatar_circle_black.png';
    }
  });

  onValue(ref(dbRT, '.info/connected'), (snapshot) => {
    if (snapshot.val() === true) {
      let isOnline = {
        state: 'online',
        lastChanged: serverTimestamp(),
      };
      set(
        ref(dbRT, `/users/${uid}`),
        { timestamp: serverTimestamp(), state: 'online' },
        { merge: true }
      );
      // setDoc(doc(db, `/users/${uid}`), {
      //   timestamp: serverTimestamp(),
      //   state: 'online',
      // });

      onDisconnect(ref(dbRT, `/users/${uid}`)).set({
        timestamp: serverTimestamp(),
        state: 'offline',
      });
      authContainer.classList.add('displayNone');
    }
    // else if (uid) {
    //   uid = null;
    //   authContainer.classList.remove('displayNone');
    //   clearLists();
    // }
  });

  authButton.addEventListener('click', () => {
    document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    puzTable.classList.add('displayNone');
    clueContainer.classList.add('displayNone');
    kbContainer.classList.add('displayNone');
    splash.classList.remove('displayNone');
    if (authButton.textContent === 'sign out') {
      // set(
      //   ref(dbRT, `/users/${uid}`),
      //   { timestamp: serverTimestamp(), state: 'offline' },
      //   { merge: true }
      // );
      // setDoc(doc(db, `/users/${uid}`), {
      //   timestamp: serverTimestamp(),
      //   state: 'offline',
      // });
      uid = null;
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          clearLists();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      location.hash = '#signin';
    }
  });
  // signInAnonymously(auth);
}

// function loadUsers() {
//   setDoc(doc(db, '/users/user1'), gs_goog);
//   setDoc(doc(db, '/users/user2'), gs_hpe);
// }

// export { loadUsers, unsubscribeUser };
// export { unsubscribeUser };
