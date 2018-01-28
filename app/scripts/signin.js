/* eslint-env es6, browser */
(function() {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    let uid;
    let userStatusDatabaseRef;
    let userStatusFirestoreRef;

    const firebase = window.firebase;
    const firebaseui = window.firebaseui;
    // const db = firebase.firestore;
    // Initialize the FirebaseUI Widget using Firebase.
    const ui = new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      signInSuccessUrl: './',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
        // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        // firebase.auth.GithubAuthProvider.PROVIDER_ID,
        // firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      // Terms of service url.
      tosUrl: './#tos'
    };

    // We'll create two constants which we will write to
    // the Realtime database when this device is offline
    // or online.
    const isOfflineForDatabase = {
      state: 'offline',
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    };
    const isOnlineForDatabase = {
      state: 'online',
      lastChanged: firebase.database.ServerValue.TIMESTAMP
    };
    // Firestore uses a different server timestamp value, so we'll
    // create two more constants for Firestore state.
    const isOfflineForFirestore = {
      state: 'offline',
      lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    };
    const isOnlineForFirestore = {
      state: 'online',
      lastChanged: firebase.firestore.FieldValue.serverTimestamp()
    };

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseuiAuthContainer', uiConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        uid = user.uid;
        isOnlineForFirestore.displayName = user.displayName;
        isOnlineForFirestore.photoURL = user.photoURL;
        isOnlineForFirestore.providerId = user.providerData[0].providerId;
        isOnlineForFirestore.uid = uid;
        isOnlineForFirestore.privateData = {
          email: user.email,
          emailVerified: user.emailVerified,
          phoneNumber: user.phoneNumber,
          providerData: user.providerData,
          providerId: user.providerId
        };

        document.getElementById('authButton').textContent = 'sign out';
        document.getElementById('profileName').textContent = user.displayName;
        document.getElementById('avatar').src =
          user.photoURL ? user.photoURL : 'images/avatar_circle_black.png';

        // Create a reference to this user's specific status node.
        // This is where we will store data about being online/offline.
        userStatusDatabaseRef = firebase.database().ref(`/users/${uid}`);
        userStatusFirestoreRef = firebase.firestore().doc(`/users/${uid}`);

        firebase.database().ref('.info/connected').on('value', snapshot => {
          if (snapshot.val() === false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to "offline". This ensures that our Firestore cache is aware
            // of the switch to "offline."
            userStatusFirestoreRef.set(isOfflineForFirestore, {merge: true});
            return;
          }
          userStatusDatabaseRef.onDisconnect()
            .set(isOfflineForDatabase).then(() => {
              userStatusDatabaseRef.set(isOnlineForDatabase);
              userStatusFirestoreRef.set(isOnlineForFirestore, {merge: true});
            });
        });
        document.getElementById('firebaseuiAuthContainer')
          .classList.add('displayNone');
      } else {
        // User is signed out.
        document.getElementById('authButton').textContent = 'sign in';
        document.getElementById('firebaseuiAuthContainer')
          .classList.remove('displayNone');
        document.getElementById('profileName').textContent = 'N. E. Person';
        document.getElementById('avatar')
          .src = 'images/avatar_circle_black.png';
      }
    }, function(error) {
      console.log(error);
    });

    document.getElementById('authButton').addEventListener('click', () => {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
      if (uid) {
        userStatusFirestoreRef
          .set(isOfflineForFirestore, {merge: true}).then(() => {
            firebase.auth().signOut();
          }).then(() => {
            // Sign-out successful.
            uid = undefined;
            userStatusDatabaseRef = undefined;
            userStatusFirestoreRef = undefined;
          }).catch(error => {
            console.log(error);
          });
      }
    });
  }
})();
