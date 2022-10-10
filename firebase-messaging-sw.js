import { initializeApp } from 'firebase/app';
import { getMessaging, onBackgroundMessage } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: 'AIzaSyDNheDAGRrSjCgic20dgnuawMILWBrTNUk',
  authDomain: 'xwordswf.firebaseapp.com',
  databaseURL: 'https://xwordswf.firebaseio.com',
  projectId: 'xwordswf',
  storageBucket: 'xwordswf.appspot.com',
  messagingSenderId: '38205810024',
  appId: '1:38205810024:web:d3d48e2fbc2d1c17bee2dd',
  measurementId: 'G-measurement-id',
};

// if (location.hostname === 'localhost') {
//   firebaseConfig.databaseURL = 'http://localhost:9000?ns=emulatorui';
// }
if (location.hostname === 'localhost') {
  firebaseConfig.databaseURL = 'http://localhost:9000?ns=xwordswf';
}

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // payload is sent from index.js in functions
  const notificationTitle = payload.notification.title;
  const notificationOptions = payload.notification;

  self.registration.showNotification(notificationTitle, notificationOptions);
});
