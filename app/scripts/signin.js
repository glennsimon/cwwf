/* eslint-env es6, browser */
(function() {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
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

    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
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
        // User is signed in.
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const uid = user.uid;
        const phoneNumber = user.phoneNumber;
        const providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          document.getElementById('sign-in-status').textContent = 'Signed in';
          document.getElementById('sign-in').textContent = 'Sign out';
          document.getElementById('account-details').textContent =
            JSON.stringify({
              displayName: displayName,
              email: email,
              emailVerified: emailVerified,
              phoneNumber: phoneNumber,
              photoURL: photoURL,
              uid: uid,
              accessToken: accessToken,
              providerData: providerData
            }, null, '  ');
          // Fetch the current user's ID from Firebase Authentication.
          // const uid = firebase.auth().currentUser.uid;

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
              console.log('connected! Does this fire multiple times?');
              return;
            }
            userStatusDatabaseRef.onDisconnect()
              .set(isOfflineForDatabase).then(() => {
                userStatusDatabaseRef.set(isOnlineForDatabase);
                userStatusFirestoreRef.set(isOnlineForFirestore);
              });
          });
        });
        document.getElementById('firebaseui-auth-container')
          .classList.add('displayNone');
        document.getElementById('sign-in').addEventListener('click', () => {
          firebase.database().ref(`/status/${uid}`).set(isOfflineForDatabase);
          firebase.auth().signOut().then(() => {
            // Sign-out successful.
          }).catch(error => {
            console.log(error);
          });
        });
      } else {
        // User is signed out.
        document.getElementById('sign-in-status').textContent = 'Signed out';
        document.getElementById('sign-in').textContent = 'Sign in';
        document.getElementById('account-details').textContent = 'null';
        document.getElementById('firebaseui-auth-container')
          .classList.remove('displayNone');
      }
    }, function(error) {
      console.log(error);
    });
  }
})();
