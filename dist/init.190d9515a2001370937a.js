"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["init"],{

/***/ "./src/firebase-init.js":
/*!******************************!*\
  !*** ./src/firebase-init.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "analytics": () => (/* binding */ analytics),
/* harmony export */   "app": () => (/* binding */ app),
/* harmony export */   "auth": () => (/* binding */ auth),
/* harmony export */   "db": () => (/* binding */ db),
/* harmony export */   "functions": () => (/* binding */ functions),
/* harmony export */   "messaging": () => (/* binding */ messaging)
/* harmony export */ });
/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ "./node_modules/firebase/app/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_messaging__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/messaging */ "./node_modules/firebase/messaging/dist/index.esm.js");
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/functions */ "./node_modules/firebase/functions/dist/index.esm.js");
/* harmony import */ var firebase_analytics__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/analytics */ "./node_modules/firebase/analytics/dist/index.esm.js");







var firebaseConfig = {
  apiKey: 'AIzaSyDNheDAGRrSjCgic20dgnuawMILWBrTNUk',
  authDomain: 'xwordswf.firebaseapp.com',
  databaseURL: 'https://xwordswf.firebaseio.com',
  projectId: 'xwordswf',
  storageBucket: 'xwordswf.appspot.com',
  messagingSenderId: '38205810024',
  appId: '1:38205810024:web:d3d48e2fbc2d1c17bee2dd',
  measurementId: 'G-357VX1P634' };


if (location.hostname === 'localhost') {
  firebaseConfig.databaseURL = 'http://localhost:9000?ns=xwordswf';
}

var app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);
var analytics = (0,firebase_analytics__WEBPACK_IMPORTED_MODULE_5__.getAnalytics)(app);
var db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.getFirestore)(app);
var functions = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_4__.getFunctions)(app);
var messaging = (0,firebase_messaging__WEBPACK_IMPORTED_MODULE_3__.getMessaging)(app);
var auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_2__.getAuth)();

if (location.hostname === 'localhost') {
  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_1__.connectFirestoreEmulator)(db, 'localhost', 8080);
  (0,firebase_functions__WEBPACK_IMPORTED_MODULE_4__.connectFunctionsEmulator)(functions, 'localhost', 5001);
}

// Check to make sure service workers are supported in the current browser,
// and that the current page is accessed from a secure origin. Using a
// service worker from an insecure origin will trigger JS console errors. See
// http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
var isLocalhost = Boolean(
window.location.hostname === 'localhost' ||
// [::1] is the IPv6 localhost address.
window.location.hostname === '[::1]' ||
// 127.0.0.1/8 is considered localhost for IPv4.
window.location.hostname.match(
/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));



if (
'serviceWorker' in navigator && (
window.location.protocol === 'https:' || isLocalhost))
{
  navigator.serviceWorker.
  register('service-worker.js').
  then(function (registration) {
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
        var installingWorker = registration.installing;

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
              'The installing service worker became redundant.');


            default:
            // Ignore
          }
        };
      }
    };
  })["catch"](
  function (e) {
    console.error('Error during service worker registration:', e);
  });
}



/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/firebase-init.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC4xOTBkOTUxNWEyMDAxMzcwOTM3YS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBSVEsY0FBYyxHQUFHO0VBQ25CQyxNQUFNLEVBQUUseUNBRFc7RUFFbkJDLFVBQVUsRUFBRSwwQkFGTztFQUduQkMsV0FBVyxFQUFFLGlDQUhNO0VBSW5CQyxTQUFTLEVBQUUsVUFKUTtFQUtuQkMsYUFBYSxFQUFFLHNCQUxJO0VBTW5CQyxpQkFBaUIsRUFBRSxhQU5BO0VBT25CQyxLQUFLLEVBQUUsMENBUFk7RUFRbkJDLGFBQWEsRUFBRSxjQVJJLEVBQXJCOzs7QUFXQSxJQUFJQyxRQUFRLENBQUNDLFFBQVQsS0FBc0IsV0FBMUIsRUFBdUM7RUFDckNWLGNBQWMsQ0FBQ0csV0FBZixHQUE2QixtQ0FBN0I7QUFDRDs7QUFFRCxJQUFNUSxHQUFHLEdBQUduQiwyREFBYSxDQUFDUSxjQUFELENBQXpCO0FBQ0EsSUFBTVksU0FBUyxHQUFHYixnRUFBWSxDQUFDWSxHQUFELENBQTlCO0FBQ0EsSUFBTUUsRUFBRSxHQUFHbkIsZ0VBQVksQ0FBQ2lCLEdBQUQsQ0FBdkI7QUFDQSxJQUFNRyxTQUFTLEdBQUdqQixnRUFBWSxDQUFDYyxHQUFELENBQTlCO0FBQ0EsSUFBTUksU0FBUyxHQUFHbkIsZ0VBQVksQ0FBQ2UsR0FBRCxDQUE5QjtBQUNBLElBQU1LLElBQUksR0FBR3JCLHNEQUFPLEVBQXBCOztBQUVBLElBQUljLFFBQVEsQ0FBQ0MsUUFBVCxLQUFzQixXQUExQixFQUF1QztFQUNyQ2pCLDRFQUF3QixDQUFDb0IsRUFBRCxFQUFLLFdBQUwsRUFBa0IsSUFBbEIsQ0FBeEI7RUFDQWYsNEVBQXdCLENBQUNnQixTQUFELEVBQVksV0FBWixFQUF5QixJQUF6QixDQUF4QjtBQUNEOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBTUcsV0FBVyxHQUFHQyxPQUFPO0FBQ3pCQyxNQUFNLENBQUNWLFFBQVAsQ0FBZ0JDLFFBQWhCLEtBQTZCLFdBQTdCO0FBQ0U7QUFDQVMsTUFBTSxDQUFDVixRQUFQLENBQWdCQyxRQUFoQixLQUE2QixPQUYvQjtBQUdFO0FBQ0FTLE1BQU0sQ0FBQ1YsUUFBUCxDQUFnQkMsUUFBaEIsQ0FBeUJVLEtBQXpCO0FBQ0Usd0RBREYsQ0FMdUIsQ0FBM0I7Ozs7QUFVQTtBQUNFLG1CQUFtQkMsU0FBbkI7QUFDQ0YsTUFBTSxDQUFDVixRQUFQLENBQWdCYSxRQUFoQixLQUE2QixRQUE3QixJQUF5Q0wsV0FEMUMsQ0FERjtBQUdFO0VBQ0FJLFNBQVMsQ0FBQ0UsYUFBVjtFQUNHQyxRQURILENBQ1ksbUJBRFo7RUFFR0MsSUFGSCxDQUVRLFVBQVVDLFlBQVYsRUFBd0I7SUFDNUI7SUFDQUEsWUFBWSxDQUFDQyxhQUFiLEdBQTZCLFlBQVk7TUFDdkM7TUFDQTtNQUNBO01BQ0E7TUFDQTtNQUNBLElBQUlOLFNBQVMsQ0FBQ0UsYUFBVixDQUF3QkssVUFBNUIsRUFBd0M7UUFDdEM7UUFDQTtRQUNBO1FBQ0EsSUFBTUMsZ0JBQWdCLEdBQUdILFlBQVksQ0FBQ0ksVUFBdEM7O1FBRUFELGdCQUFnQixDQUFDRSxhQUFqQixHQUFpQyxZQUFZO1VBQzNDLFFBQVFGLGdCQUFnQixDQUFDRyxLQUF6QjtZQUNFLEtBQUssV0FBTDtjQUNFO2NBQ0E7Y0FDQTtjQUNBO2NBQ0E7Y0FDQTs7WUFFRixLQUFLLFdBQUw7Y0FDRSxNQUFNLElBQUlDLEtBQUo7Y0FDSixpREFESSxDQUFOOzs7WUFJRjtZQUNBO1VBZkY7UUFpQkQsQ0FsQkQ7TUFtQkQ7SUFDRixDQWhDRDtFQWlDRCxDQXJDSDtFQXNDUyxVQUFVQyxDQUFWLEVBQWE7SUFDbEJDLE9BQU8sQ0FBQ0MsS0FBUixDQUFjLDJDQUFkLEVBQTJERixDQUEzRDtFQUNELENBeENIO0FBeUNEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2ZpcmViYXNlLWluaXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwcCB9IGZyb20gJ2ZpcmViYXNlL2FwcCc7XHJcbmltcG9ydCB7IGNvbm5lY3RGaXJlc3RvcmVFbXVsYXRvciwgZ2V0RmlyZXN0b3JlIH0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgZ2V0QXV0aCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnO1xyXG5pbXBvcnQgeyBnZXRNZXNzYWdpbmcgfSBmcm9tICdmaXJlYmFzZS9tZXNzYWdpbmcnO1xyXG5pbXBvcnQgeyBnZXRGdW5jdGlvbnMsIGNvbm5lY3RGdW5jdGlvbnNFbXVsYXRvciB9IGZyb20gJ2ZpcmViYXNlL2Z1bmN0aW9ucyc7XHJcbmltcG9ydCB7IGdldEFuYWx5dGljcyB9IGZyb20gJ2ZpcmViYXNlL2FuYWx5dGljcyc7XHJcblxyXG5sZXQgZmlyZWJhc2VDb25maWcgPSB7XHJcbiAgYXBpS2V5OiAnQUl6YVN5RE5oZURBR1JyU2pDZ2ljMjBkZ251YXdNSUxXQnJUTlVrJyxcclxuICBhdXRoRG9tYWluOiAneHdvcmRzd2YuZmlyZWJhc2VhcHAuY29tJyxcclxuICBkYXRhYmFzZVVSTDogJ2h0dHBzOi8veHdvcmRzd2YuZmlyZWJhc2Vpby5jb20nLFxyXG4gIHByb2plY3RJZDogJ3h3b3Jkc3dmJyxcclxuICBzdG9yYWdlQnVja2V0OiAneHdvcmRzd2YuYXBwc3BvdC5jb20nLFxyXG4gIG1lc3NhZ2luZ1NlbmRlcklkOiAnMzgyMDU4MTAwMjQnLFxyXG4gIGFwcElkOiAnMTozODIwNTgxMDAyNDp3ZWI6ZDNkNDhlMmZiYzJkMWMxN2JlZTJkZCcsXHJcbiAgbWVhc3VyZW1lbnRJZDogJ0ctMzU3VlgxUDYzNCcsXHJcbn07XHJcblxyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnKSB7XHJcbiAgZmlyZWJhc2VDb25maWcuZGF0YWJhc2VVUkwgPSAnaHR0cDovL2xvY2FsaG9zdDo5MDAwP25zPXh3b3Jkc3dmJztcclxufVxyXG5cclxuY29uc3QgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbmNvbnN0IGFuYWx5dGljcyA9IGdldEFuYWx5dGljcyhhcHApO1xyXG5jb25zdCBkYiA9IGdldEZpcmVzdG9yZShhcHApO1xyXG5jb25zdCBmdW5jdGlvbnMgPSBnZXRGdW5jdGlvbnMoYXBwKTtcclxuY29uc3QgbWVzc2FnaW5nID0gZ2V0TWVzc2FnaW5nKGFwcCk7XHJcbmNvbnN0IGF1dGggPSBnZXRBdXRoKCk7XHJcblxyXG5pZiAobG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnKSB7XHJcbiAgY29ubmVjdEZpcmVzdG9yZUVtdWxhdG9yKGRiLCAnbG9jYWxob3N0JywgODA4MCk7XHJcbiAgY29ubmVjdEZ1bmN0aW9uc0VtdWxhdG9yKGZ1bmN0aW9ucywgJ2xvY2FsaG9zdCcsIDUwMDEpO1xyXG59XHJcblxyXG4vLyBDaGVjayB0byBtYWtlIHN1cmUgc2VydmljZSB3b3JrZXJzIGFyZSBzdXBwb3J0ZWQgaW4gdGhlIGN1cnJlbnQgYnJvd3NlcixcclxuLy8gYW5kIHRoYXQgdGhlIGN1cnJlbnQgcGFnZSBpcyBhY2Nlc3NlZCBmcm9tIGEgc2VjdXJlIG9yaWdpbi4gVXNpbmcgYVxyXG4vLyBzZXJ2aWNlIHdvcmtlciBmcm9tIGFuIGluc2VjdXJlIG9yaWdpbiB3aWxsIHRyaWdnZXIgSlMgY29uc29sZSBlcnJvcnMuIFNlZVxyXG4vLyBodHRwOi8vd3d3LmNocm9taXVtLm9yZy9Ib21lL2Nocm9taXVtLXNlY3VyaXR5L3ByZWZlci1zZWN1cmUtb3JpZ2lucy1mb3ItcG93ZXJmdWwtbmV3LWZlYXR1cmVzXHJcbmNvbnN0IGlzTG9jYWxob3N0ID0gQm9vbGVhbihcclxuICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUgPT09ICdsb2NhbGhvc3QnIHx8XHJcbiAgICAvLyBbOjoxXSBpcyB0aGUgSVB2NiBsb2NhbGhvc3QgYWRkcmVzcy5cclxuICAgIHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZSA9PT0gJ1s6OjFdJyB8fFxyXG4gICAgLy8gMTI3LjAuMC4xLzggaXMgY29uc2lkZXJlZCBsb2NhbGhvc3QgZm9yIElQdjQuXHJcbiAgICB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUubWF0Y2goXHJcbiAgICAgIC9eMTI3KD86XFwuKD86MjVbMC01XXwyWzAtNF1bMC05XXxbMDFdP1swLTldWzAtOV0/KSl7M30kL1xyXG4gICAgKVxyXG4pO1xyXG5cclxuaWYgKFxyXG4gICdzZXJ2aWNlV29ya2VyJyBpbiBuYXZpZ2F0b3IgJiZcclxuICAod2luZG93LmxvY2F0aW9uLnByb3RvY29sID09PSAnaHR0cHM6JyB8fCBpc0xvY2FsaG9zdClcclxuKSB7XHJcbiAgbmF2aWdhdG9yLnNlcnZpY2VXb3JrZXJcclxuICAgIC5yZWdpc3Rlcignc2VydmljZS13b3JrZXIuanMnKVxyXG4gICAgLnRoZW4oZnVuY3Rpb24gKHJlZ2lzdHJhdGlvbikge1xyXG4gICAgICAvLyB1cGRhdGVmb3VuZCBpcyBmaXJlZCBpZiBzZXJ2aWNlLXdvcmtlci5qcyBjaGFuZ2VzLlxyXG4gICAgICByZWdpc3RyYXRpb24ub251cGRhdGVmb3VuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAvLyB1cGRhdGVmb3VuZCBpcyBhbHNvIGZpcmVkIHRoZSB2ZXJ5IGZpcnN0IHRpbWUgdGhlIFNXIGlzXHJcbiAgICAgICAgLy8gaW5zdGFsbGVkLCBhbmQgdGhlcmUncyBubyBuZWVkIHRvIHByb21wdCBmb3IgYSByZWxvYWQgYXRcclxuICAgICAgICAvLyB0aGF0IHBvaW50LlxyXG4gICAgICAgIC8vIFNvIGNoZWNrIGhlcmUgdG8gc2VlIGlmIHRoZSBwYWdlIGlzIGFscmVhZHkgY29udHJvbGxlZCxcclxuICAgICAgICAvLyBpLmUuIHdoZXRoZXIgdGhlcmUncyBhbiBleGlzdGluZyBzZXJ2aWNlIHdvcmtlci5cclxuICAgICAgICBpZiAobmF2aWdhdG9yLnNlcnZpY2VXb3JrZXIuY29udHJvbGxlcikge1xyXG4gICAgICAgICAgLy8gVGhlIHVwZGF0ZWZvdW5kIGV2ZW50IGltcGxpZXMgdGhhdCByZWdpc3RyYXRpb24uaW5zdGFsbGluZyBpc1xyXG4gICAgICAgICAgLy8gc2V0OlxyXG4gICAgICAgICAgLy8gaHR0cHM6Ly9zbGlnaHRseW9mZi5naXRodWIuaW8vU2VydmljZVdvcmtlci9zcGVjL3NlcnZpY2Vfd29ya2VyL2luZGV4Lmh0bWwjc2VydmljZS13b3JrZXItY29udGFpbmVyLXVwZGF0ZWZvdW5kLWV2ZW50XHJcbiAgICAgICAgICBjb25zdCBpbnN0YWxsaW5nV29ya2VyID0gcmVnaXN0cmF0aW9uLmluc3RhbGxpbmc7XHJcblxyXG4gICAgICAgICAgaW5zdGFsbGluZ1dvcmtlci5vbnN0YXRlY2hhbmdlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKGluc3RhbGxpbmdXb3JrZXIuc3RhdGUpIHtcclxuICAgICAgICAgICAgICBjYXNlICdpbnN0YWxsZWQnOlxyXG4gICAgICAgICAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgdGhlIG9sZCBjb250ZW50IHdpbGwgaGF2ZSBiZWVuIHB1cmdlZFxyXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZSBmcmVzaCBjb250ZW50IHdpbGwgaGF2ZSBiZWVuIGFkZGVkIHRvIHRoZVxyXG4gICAgICAgICAgICAgICAgLy8gY2FjaGUuIEl0J3MgdGhlIHBlcmZlY3QgdGltZSB0byBkaXNwbGF5IGEgXCJOZXdcclxuICAgICAgICAgICAgICAgIC8vIGNvbnRlbnQgaXMgYXZhaWxhYmxlOyBwbGVhc2UgcmVmcmVzaC5cIiBtZXNzYWdlIGluXHJcbiAgICAgICAgICAgICAgICAvLyB0aGUgcGFnZSdzIGludGVyZmFjZS5cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICBjYXNlICdyZWR1bmRhbnQnOlxyXG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICAgICAgICAgICAgICAnVGhlIGluc3RhbGxpbmcgc2VydmljZSB3b3JrZXIgYmVjYW1lIHJlZHVuZGFudC4nXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgIC8vIElnbm9yZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goZnVuY3Rpb24gKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZHVyaW5nIHNlcnZpY2Ugd29ya2VyIHJlZ2lzdHJhdGlvbjonLCBlKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBhdXRoLCBhcHAsIGRiLCBhbmFseXRpY3MsIGZ1bmN0aW9ucywgbWVzc2FnaW5nIH07XHJcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiY29ubmVjdEZpcmVzdG9yZUVtdWxhdG9yIiwiZ2V0RmlyZXN0b3JlIiwiZ2V0QXV0aCIsImdldE1lc3NhZ2luZyIsImdldEZ1bmN0aW9ucyIsImNvbm5lY3RGdW5jdGlvbnNFbXVsYXRvciIsImdldEFuYWx5dGljcyIsImZpcmViYXNlQ29uZmlnIiwiYXBpS2V5IiwiYXV0aERvbWFpbiIsImRhdGFiYXNlVVJMIiwicHJvamVjdElkIiwic3RvcmFnZUJ1Y2tldCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiYXBwSWQiLCJtZWFzdXJlbWVudElkIiwibG9jYXRpb24iLCJob3N0bmFtZSIsImFwcCIsImFuYWx5dGljcyIsImRiIiwiZnVuY3Rpb25zIiwibWVzc2FnaW5nIiwiYXV0aCIsImlzTG9jYWxob3N0IiwiQm9vbGVhbiIsIndpbmRvdyIsIm1hdGNoIiwibmF2aWdhdG9yIiwicHJvdG9jb2wiLCJzZXJ2aWNlV29ya2VyIiwicmVnaXN0ZXIiLCJ0aGVuIiwicmVnaXN0cmF0aW9uIiwib251cGRhdGVmb3VuZCIsImNvbnRyb2xsZXIiLCJpbnN0YWxsaW5nV29ya2VyIiwiaW5zdGFsbGluZyIsIm9uc3RhdGVjaGFuZ2UiLCJzdGF0ZSIsIkVycm9yIiwiZSIsImNvbnNvbGUiLCJlcnJvciJdLCJzb3VyY2VSb290IjoiIn0=