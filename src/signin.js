import { app, auth } from './firebase-init.js';

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

const CLIENT_ID =
  '38205810024-ldpgeahe0cq1kt6r0am848qjqqu61fpd.apps.' +
  'googleusercontent.com';

/**
 * FOR PHONE LOGIN - see
 * https://firebase.google.com/docs/auth/web/phone-auth#web-version-8
 * */
// firebase.auth().useDeviceLanguage();
// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//   'sign-in-button',
//   {
//     size: 'invisible',
//     callback: (response) => {
//       // reCAPTCHA solved, allow signInWithPhoneNumber.
//       onSignInSubmit();
//     },
//   }
// );

// window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//   'recaptcha-container'
// );

// const phoneNumber = getPhoneNumberFromUserInput();
// const appVerifier = window.recaptchaVerifier;
// firebase
//   .auth()
//   .signInWithPhoneNumber(phoneNumber, appVerifier)
//   .then((confirmationResult) => {
//     // SMS sent. Prompt user to type the code from the message, then sign the
//     // user in with confirmationResult.confirm(code).
//     window.confirmationResult = confirmationResult;
//     // ...
//   })
//   .catch((error) => {
//     window.recaptchaVerifier.render().then(function (widgetId) {
//       grecaptcha.reset(widgetId);
//     });
//   });

// const code = getCodeFromUserInput();
// confirmationResult
//   .confirm(code)
//   .then((result) => {
//     // User signed in successfully.
//     const user = result.user;
//     // ...
//   })
//   .catch((error) => {
//     // User couldn't sign in (bad verification code?)
//     // ...
//   });

// var credential = firebase.auth.PhoneAuthProvider.credential(
//   confirmationResult.verificationId,
//   code
// );

// firebase.auth().signInWithCredential(credential);

/**
 *  See https://github.com/firebase/firebaseui-web/blob/master/README.md
 *  or https://firebase.google.com/docs/auth/web/firebaseui
 *  for documentation
 */

/** Initialize after document loads */
// function initApp() {
const ui = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      clientId: CLIENT_ID,
    },
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        // size: getRecaptchaMode(),
      },
    },
  ],
  // Terms of service url.
  tosUrl: '/#tos',
  // Privacy policy url.
  privacyPolicyUrl: '/#privacy',
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseuiAuthContainer', uiConfig);
