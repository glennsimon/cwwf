/* eslint-env es6, browser */
(function() {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    let uid;

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

        document.getElementById('authButton').textContent = 'sign out';
        document.getElementById('profileName').textContent = user.displayName;
        document.getElementById('avatar').src = user.photoURL;

        // Create a reference to this user's specific status node.
        // This is where we will store data about being online/offline.
        const userStatusDatabaseRef =
          firebase.database().ref(`/status/${uid}`);
        const userStatusFirestoreRef =
          firebase.firestore().doc(`/status/${uid}`);

        firebase.database().ref('.info/connected').on('value', snapshot => {
          if (snapshot.val() === false) {
            // Instead of simply returning, we'll also set Firestore's state
            // to "offline". This ensures that our Firestore cache is aware
            // of the switch to "offline."
            userStatusFirestoreRef.set(isOfflineForFirestore);
            return;
          }
          userStatusDatabaseRef.onDisconnect()
            .set(isOfflineForDatabase).then(() => {
              userStatusDatabaseRef.set(isOnlineForDatabase);
              userStatusFirestoreRef.set(isOnlineForFirestore);
            });
        });
        document.getElementById('firebaseuiAuthContainer')
          .classList.add('displayNone');
      } else {
        // User is signed out.
        uid = undefined;
        document.getElementById('authButton').textContent = 'sign in';
        document.getElementById('firebaseuiAuthContainer')
          .classList.remove('displayNone');
        document.getElementById('profileName').textContent = 'N. E. Person';
        document.getElementById('avatar').src = 'images/user.jpg';
      }
    }, function(error) {
      console.log(error);
    });

    document.getElementById('authButton').addEventListener('click', () => {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
      if (uid) {
        firebase.firestore().doc(`/status/${uid}`).set(isOfflineForFirestore);
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
        }).catch(error => {
          console.log(error);
        });
      }
    });
  }
})();
