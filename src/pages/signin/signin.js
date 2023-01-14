import { auth } from '../../firebase-init.js';

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
import { route } from '../../router.js';

const CLIENT_ID =
  '38205810024-ldpgeahe0cq1kt6r0am848qjqqu61fpd.apps.' +
  'googleusercontent.com';

const ui = new firebaseui.auth.AuthUI(auth);

const uiConfig = {
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  // Url to redirect to after a successful sign-in.
  signInSuccessUrl: './',
  callbacks: {
    signInSuccessWithAuthResult: function (user, credential, redirectUrl) {
      if (window.opener) {
        // The widget has been opened in a popup, so close the window
        // and return false to not redirect the opener.
        window.close();
        return false;
      } else {
        // The widget has been used in redirect mode, so we redirect to the signInSuccessUrl.
        return true;
      }
    },
  },
  signInOptions: [
    // TODO(developer): Remove the providers you don't need for your app.
    {
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      // Required to enable ID token credentials for this provider.
      clientId: CLIENT_ID,
    },
    // TODO: Maybe later...
    // firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    // // To add phone signin, uncomment the object below and
    // // prompt the user for a unique name in the onAuthStateChanged
    // // function in controller.js.  Phone signin returns nothing but the
    // // phone number as identification.
    // {
    //   provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    //   recaptchaParameters: {
    //     size: getRecaptchaMode(),
    //   },
    // },
    // TODO: Maybe later...
    // {
    //   provider: 'microsoft.com',
    //   loginHintKey: 'login_hint',
    // },
    // {
    //   provider: 'apple.com',
    // },
    // firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: () => route('/tos'),
  // Privacy policy url.
  privacyPolicyUrl: () => route('/privacy'),
};

/**
 * @return {string} The reCAPTCHA rendering mode from the configuration.
 */
function getRecaptchaMode() {
  var config = parseQueryString(location.hash);
  return config['recaptcha'] === 'invisible' ? 'invisible' : 'normal';
}

/**
 * @return {boolean} The disable sign up status from the configuration.
 */
function getDisableSignUpStatus() {
  var config = parseQueryString(location.hash);
  return config['disableEmailSignUpStatus'] === 'true';
}

/**
 * @param {string} queryString The full query string.
 * @return {!Object<string, string>} The parsed query parameters.
 */
function parseQueryString(queryString) {
  // Remove first character if it is ? or #.
  if (
    queryString.length &&
    (queryString.charAt(0) == '#' || queryString.charAt(0) == '?')
  ) {
    queryString = queryString.substring(1);
  }
  var config = {};
  var pairs = queryString.split('&');
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i].split('=');
    if (pair.length == 2) {
      config[pair[0]] = pair[1];
    }
  }
  return config;
}

// let uiStarted = false;

const uiStart = () => {
  // if (uiStarted) return;
  // The start method will wait until the DOM is loaded.
  ui.start('.container__firebase-auth', uiConfig);
  // uiStarted = true;
};

export { uiStart };
