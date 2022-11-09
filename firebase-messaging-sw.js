// Import and configure the Firebase SDK
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseConfig = {
  apiKey: 'AIzaSyDNheDAGRrSjCgic20dgnuawMILWBrTNUk',
  authDomain: 'xwordswf.firebaseapp.com',
  databaseURL: 'https://xwordswf.firebaseio.com',
  projectId: 'xwordswf',
  storageBucket: 'xwordswf.appspot.com',
  messagingSenderId: '38205810024',
  appId: '1:38205810024:web:d3d48e2fbc2d1c17bee2dd',
  measurementId: 'G-357VX1P634',
};
const firebaseApp = initializeApp(firebaseConfig);
getMessaging(firebaseApp);
console.info('Firebase messaging service worker is set up');
