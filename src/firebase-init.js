import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getMessaging } from 'firebase/messaging';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAnalytics } from 'firebase/analytics';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { constants } from './constants';

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

if (location.hostname === 'localhost') {
  firebaseConfig.databaseURL = 'http://localhost:9000?ns=xwordswf';
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);
const auth = getAuth();
const storage = getStorage(app);

if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectStorageEmulator(storage, 'localhost', 9091);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

console.log('document.cookie: ', document.cookie);

// if there is a search string and no xwwf_invite cookie, create cookie
const searchString = document.location.search;
console.log('document.location: ', document.location);
console.log('document.location.search: ', searchString);
if (
  document.location.search &&
  document.location.search.includes('pending') &&
  document.location.search.includes('game')
) {
  // cookie will only last one week max
  document.cookie =
    `xwwf_invite=${document.location.search}; ` +
    `max-age=${constants.COOKIE_MAX_AGE_INVITE}; path=/`;
}

// Check to make sure service workers are supported in the current browser,
// and that the current page is accessed from a secure origin. Using a
// service worker from an insecure origin will trigger JS console errors. See
// http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    window.location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

if (
  'serviceWorker' in navigator &&
  (window.location.protocol === 'https:' || isLocalhost)
) {
  navigator.serviceWorker
    .register('./service-worker.js')
    .then(function (registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function () {
        // updatefound is also fired the very first time the SW is
        // installed, and there's no need to prompt for a reload at
        // that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is
          // set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          const installingWorker = registration.installing;

          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged
                // and the fresh content will have been added to the
                // cache. It's the perfect time to display a "New
                // content is available; please refresh." message in
                // the page's interface.
                break;

              case 'redundant':
                throw new Error(
                  'The installing service worker became redundant.'
                );

              default:
              // Ignore
            }
          };
        }
      };
    })
    .catch(function (e) {
      console.error('Error during service worker registration:', e);
    });
}

export { auth, app, db, analytics, functions, messaging, storage };
