import { auth } from './firebase-init.js';

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

window.addEventListener('load', function () {
  initApp();
});

/** Initialize after document loads */
function initApp() {
  const ui = new firebaseui.auth.AuthUI(auth);

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
}
