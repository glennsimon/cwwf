"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["signin"],{

/***/ "./src/signin.js":
/*!***********************!*\
  !*** ./src/signin.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase-init.js */ "./src/firebase-init.js");
/* harmony import */ var firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/compat/app */ "./node_modules/firebase/compat/app/dist/index.esm.js");
/* harmony import */ var firebaseui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebaseui */ "./node_modules/firebaseui/dist/esm.js");
/* harmony import */ var firebaseui_dist_firebaseui_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebaseui/dist/firebaseui.css */ "./node_modules/firebaseui/dist/firebaseui.css");


/** Note: FirebaseUI is not compatible with the v9 modular SDK.
 * The v9 compatibility layer (specifically, the app-compat and
 * auth-compat packages) permits the usage of FirebaseUI alongside v9,
 * but without the app size reduction and other benefits of the v9 SDK.
 *
 * This is why the Node.js syntax is used below.
 */




window.addEventListener('load', function () {
  initApp();
});

/**
 *  See https://github.com/firebase/firebaseui-web/blob/master/README.md
 *  or https://firebase.google.com/docs/auth/web/firebaseui
 *  for documentation
 */

/** Initialize after document loads */
function initApp() {
  var ui = new firebaseui__WEBPACK_IMPORTED_MODULE_2__.auth.AuthUI(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth);

  var uiConfig = {
    signInSuccessUrl: './',
    signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.GoogleAuthProvider.PROVIDER_ID,
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.EmailAuthProvider.PROVIDER_ID,
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.FacebookAuthProvider.PROVIDER_ID,
    // firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    // firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase_compat_app__WEBPACK_IMPORTED_MODULE_1__["default"].auth.PhoneAuthProvider.PROVIDER_ID],

    // Terms of service url.
    tosUrl: function tosUrl() {return location.hash = '#tos';},
    // Privacy policy url.
    privacyPolicyUrl: function privacyPolicyUrl() {return location.hash = '#privacy';} };


  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseuiAuthContainer', uiConfig);
}

/***/ }),

/***/ "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo= ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+Cjxzdmcgd2lkdGg9IjEyIiBoZWlnaHQ9IjQiIHZpZXdQb3J0PSIwIDAgMTIgNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxlbGxpcHNlIGN4PSIyIiBjeT0iMiIgcng9IjIiIHJ5PSIyIj4KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9ImN4IiBmcm9tPSIyIiB0bz0iLTEwIiBkdXI9IjAuNnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIiAvPgogIDwvZWxsaXBzZT4KICA8ZWxsaXBzZSBjeD0iMTQiIGN5PSIyIiByeD0iMiIgcnk9IjIiIGNsYXNzPSJsb2FkZXIiPgogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iY3giIGZyb209IjE0IiB0bz0iMiIgZHVyPSIwLjZzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgLz4KICA8L2VsbGlwc2U+Cjwvc3ZnPgo=";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_firebaseui_dist_esm_js-node_modules_firebaseui_dist_firebaseui_css","init"], () => (__webpack_exec__("./src/signin.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmluLmNlNmJhZjUxMWM0ZDlkM2NjNWY0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUFHLE1BQU0sQ0FBQ0MsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBWTtFQUMxQ0MsT0FBTztBQUNSLENBRkQ7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFNBQVNBLE9BQVQsR0FBbUI7RUFDakIsSUFBTUMsRUFBRSxHQUFHLElBQUlKLG1EQUFKLENBQTJCRixtREFBM0IsQ0FBWDs7RUFFQSxJQUFNUSxRQUFRLEdBQUc7SUFDZkMsZ0JBQWdCLEVBQUUsSUFESDtJQUVmQyxhQUFhLEVBQUU7SUFDYjtJQUNBVCwrRkFGYTtJQUdiQSw4RkFIYTtJQUliQSxpR0FKYTtJQUtiO0lBQ0E7SUFDQUEsOEZBUGEsQ0FGQTs7SUFXZjtJQUNBZSxNQUFNLEVBQUUsMEJBQU9DLFFBQVEsQ0FBQ0MsSUFBVCxHQUFnQixNQUF2QixFQVpPO0lBYWY7SUFDQUMsZ0JBQWdCLEVBQUUsb0NBQU9GLFFBQVEsQ0FBQ0MsSUFBVCxHQUFnQixVQUF2QixFQWRILEVBQWpCOzs7RUFpQkE7RUFDQVosRUFBRSxDQUFDYyxLQUFILENBQVMsMEJBQVQsRUFBcUNaLFFBQXJDO0FBQ0QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2lnbmluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dGggfSBmcm9tICcuL2ZpcmViYXNlLWluaXQuanMnO1xyXG5cclxuLyoqIE5vdGU6IEZpcmViYXNlVUkgaXMgbm90IGNvbXBhdGlibGUgd2l0aCB0aGUgdjkgbW9kdWxhciBTREsuXHJcbiAqIFRoZSB2OSBjb21wYXRpYmlsaXR5IGxheWVyIChzcGVjaWZpY2FsbHksIHRoZSBhcHAtY29tcGF0IGFuZFxyXG4gKiBhdXRoLWNvbXBhdCBwYWNrYWdlcykgcGVybWl0cyB0aGUgdXNhZ2Ugb2YgRmlyZWJhc2VVSSBhbG9uZ3NpZGUgdjksXHJcbiAqIGJ1dCB3aXRob3V0IHRoZSBhcHAgc2l6ZSByZWR1Y3Rpb24gYW5kIG90aGVyIGJlbmVmaXRzIG9mIHRoZSB2OSBTREsuXHJcbiAqXHJcbiAqIFRoaXMgaXMgd2h5IHRoZSBOb2RlLmpzIHN5bnRheCBpcyB1c2VkIGJlbG93LlxyXG4gKi9cclxuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlL2NvbXBhdC9hcHAnO1xyXG5pbXBvcnQgKiBhcyBmaXJlYmFzZXVpIGZyb20gJ2ZpcmViYXNldWknO1xyXG5pbXBvcnQgJ2ZpcmViYXNldWkvZGlzdC9maXJlYmFzZXVpLmNzcyc7XHJcblxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICBpbml0QXBwKCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqICBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZpcmViYXNlL2ZpcmViYXNldWktd2ViL2Jsb2IvbWFzdGVyL1JFQURNRS5tZFxyXG4gKiAgb3IgaHR0cHM6Ly9maXJlYmFzZS5nb29nbGUuY29tL2RvY3MvYXV0aC93ZWIvZmlyZWJhc2V1aVxyXG4gKiAgZm9yIGRvY3VtZW50YXRpb25cclxuICovXHJcblxyXG4vKiogSW5pdGlhbGl6ZSBhZnRlciBkb2N1bWVudCBsb2FkcyAqL1xyXG5mdW5jdGlvbiBpbml0QXBwKCkge1xyXG4gIGNvbnN0IHVpID0gbmV3IGZpcmViYXNldWkuYXV0aC5BdXRoVUkoYXV0aCk7XHJcblxyXG4gIGNvbnN0IHVpQ29uZmlnID0ge1xyXG4gICAgc2lnbkluU3VjY2Vzc1VybDogJy4vJyxcclxuICAgIHNpZ25Jbk9wdGlvbnM6IFtcclxuICAgICAgLy8gTGVhdmUgdGhlIGxpbmVzIGFzIGlzIGZvciB0aGUgcHJvdmlkZXJzIHlvdSB3YW50IHRvIG9mZmVyIHlvdXIgdXNlcnMuXHJcbiAgICAgIGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICBmaXJlYmFzZS5hdXRoLkVtYWlsQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICBmaXJlYmFzZS5hdXRoLkZhY2Vib29rQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICAvLyBmaXJlYmFzZS5hdXRoLlR3aXR0ZXJBdXRoUHJvdmlkZXIuUFJPVklERVJfSUQsXHJcbiAgICAgIC8vIGZpcmViYXNlLmF1dGguR2l0aHViQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgICBmaXJlYmFzZS5hdXRoLlBob25lQXV0aFByb3ZpZGVyLlBST1ZJREVSX0lELFxyXG4gICAgXSxcclxuICAgIC8vIFRlcm1zIG9mIHNlcnZpY2UgdXJsLlxyXG4gICAgdG9zVXJsOiAoKSA9PiAobG9jYXRpb24uaGFzaCA9ICcjdG9zJyksXHJcbiAgICAvLyBQcml2YWN5IHBvbGljeSB1cmwuXHJcbiAgICBwcml2YWN5UG9saWN5VXJsOiAoKSA9PiAobG9jYXRpb24uaGFzaCA9ICcjcHJpdmFjeScpLFxyXG4gIH07XHJcblxyXG4gIC8vIFRoZSBzdGFydCBtZXRob2Qgd2lsbCB3YWl0IHVudGlsIHRoZSBET00gaXMgbG9hZGVkLlxyXG4gIHVpLnN0YXJ0KCcjZmlyZWJhc2V1aUF1dGhDb250YWluZXInLCB1aUNvbmZpZyk7XHJcbn1cclxuIl0sIm5hbWVzIjpbImF1dGgiLCJmaXJlYmFzZSIsImZpcmViYXNldWkiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiaW5pdEFwcCIsInVpIiwiQXV0aFVJIiwidWlDb25maWciLCJzaWduSW5TdWNjZXNzVXJsIiwic2lnbkluT3B0aW9ucyIsIkdvb2dsZUF1dGhQcm92aWRlciIsIlBST1ZJREVSX0lEIiwiRW1haWxBdXRoUHJvdmlkZXIiLCJGYWNlYm9va0F1dGhQcm92aWRlciIsIlBob25lQXV0aFByb3ZpZGVyIiwidG9zVXJsIiwibG9jYXRpb24iLCJoYXNoIiwicHJpdmFjeVBvbGljeVVybCIsInN0YXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==