import { db, auth, messaging } from './firebase-init.js';
import { onMessage, getToken } from 'firebase/messaging';
import { setDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import './styles/main.css';

const puzTitle = document.getElementById('puzTitle');
const logo = document.getElementById('logo');
let currentUser = auth.currentUser;

// Configure messaging credentials with FCM VAPID key
function generateMessagingToken() {
  getToken(messaging, {
    vapidKey:
      'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak',
  })
    .then((currentToken) => {
      if (currentToken) {
        sendTokenToServer(currentToken);
      } else {
        // I don't think anything is needed here.
        // I think it automatically asks for permission.
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token: ', err);
    });

  if (messaging) {
    onMessage(messaging, (payload) => {
      console.log('onMessage: ', payload);
    });
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUser = user;
    if (messaging) {
      generateMessagingToken();
    }
  }
});

/**
 * Send cloud messaging token to server
 * @param {string} token Cloud messaging token
 */
async function sendTokenToServer(token) {
  console.log('Messaging permission granted. Token: ', token);
  if (currentUser) {
    await setDoc(
      doc(db, `/users/${currentUser.uid}/`),
      { msgToken: token },
      { merge: true }
    );
  }
}

logo.addEventListener('click', () => {
  location.hash = '#games';
});

puzTitle.innerText = 'No puzzle loaded';

/** Init in case we need it */
function init() {
  console.log('The dude abides!');
}

export { init };
