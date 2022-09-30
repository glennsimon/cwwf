"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["router"],{

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "abandonCurrentGameController": () => (/* binding */ abandonCurrentGameController),
/* harmony export */   "authButtonClickedController": () => (/* binding */ authButtonClickedController),
/* harmony export */   "enterLetterController": () => (/* binding */ enterLetterController),
/* harmony export */   "fetchPuzzleController": () => (/* binding */ fetchPuzzleController),
/* harmony export */   "getAcrossWordController": () => (/* binding */ getAcrossWordController),
/* harmony export */   "getAllGamesController": () => (/* binding */ getAllGamesController),
/* harmony export */   "getColumnsController": () => (/* binding */ getColumnsController),
/* harmony export */   "getCurrentGameController": () => (/* binding */ getCurrentGameController),
/* harmony export */   "getCurrentUserController": () => (/* binding */ getCurrentUserController),
/* harmony export */   "getIdxArrayController": () => (/* binding */ getIdxArrayController),
/* harmony export */   "playWordController": () => (/* binding */ playWordController),
/* harmony export */   "populateAllGamesController": () => (/* binding */ populateAllGamesController),
/* harmony export */   "populateAllUsersController": () => (/* binding */ populateAllUsersController),
/* harmony export */   "savePuzzleController": () => (/* binding */ savePuzzleController),
/* harmony export */   "setAcrossWordController": () => (/* binding */ setAcrossWordController),
/* harmony export */   "setCurrentGameController": () => (/* binding */ setCurrentGameController),
/* harmony export */   "setIdxArrayController": () => (/* binding */ setIdxArrayController),
/* harmony export */   "startNewGameController": () => (/* binding */ startNewGameController)
/* harmony export */ });
/* harmony import */ var _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./firebase-init.js */ "./src/firebase-init.js");
/* harmony import */ var _view_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view.js */ "./src/view.js");
/* harmony import */ var firebase_database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/database */ "./node_modules/firebase/database/dist/index.esm.js");
/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! firebase/auth */ "./node_modules/firebase/auth/dist/index.esm.js");
/* harmony import */ var firebase_messaging__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/messaging */ "./node_modules/firebase/messaging/dist/index.esm.js");
/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! firebase/firestore */ "./node_modules/firebase/firestore/dist/index.esm.js");
/* harmony import */ var firebase_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! firebase/functions */ "./node_modules/firebase/functions/dist/index.esm.js");
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _regeneratorRuntime() {"use strict";
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime = function _regeneratorRuntime() {return exports;};var exports = {},Op = Object.prototype,hasOwn = Op.hasOwnProperty,$Symbol = "function" == typeof Symbol ? Symbol : {},iteratorSymbol = $Symbol.iterator || "@@iterator",asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";function define(obj, key, value) {return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];}try {define({}, "");} catch (err) {define = function define(obj, key, value) {return obj[key] = value;};}function wrap(innerFn, outerFn, self, tryLocsList) {var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,generator = Object.create(protoGenerator.prototype),context = new Context(tryLocsList || []);return generator._invoke = function (innerFn, self, context) {var state = "suspendedStart";return function (method, arg) {if ("executing" === state) throw new Error("Generator is already running");if ("completed" === state) {if ("throw" === method) throw arg;return doneResult();}for (context.method = method, context.arg = arg;;) {var delegate = context.delegate;if (delegate) {var delegateResult = maybeInvokeDelegate(delegate, context);if (delegateResult) {if (delegateResult === ContinueSentinel) continue;return delegateResult;}}if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {if ("suspendedStart" === state) throw state = "completed", context.arg;context.dispatchException(context.arg);} else "return" === context.method && context.abrupt("return", context.arg);state = "executing";var record = tryCatch(innerFn, self, context);if ("normal" === record.type) {if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;return { value: record.arg, done: context.done };}"throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);}};}(innerFn, self, context), generator;}function tryCatch(fn, obj, arg) {try {return { type: "normal", arg: fn.call(obj, arg) };} catch (err) {return { type: "throw", arg: err };}}exports.wrap = wrap;var ContinueSentinel = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}var IteratorPrototype = {};define(IteratorPrototype, iteratorSymbol, function () {return this;});var getProto = Object.getPrototypeOf,NativeIteratorPrototype = getProto && getProto(getProto(values([])));NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);function defineIteratorMethods(prototype) {["next", "throw", "return"].forEach(function (method) {define(prototype, method, function (arg) {return this._invoke(method, arg);});});}function AsyncIterator(generator, PromiseImpl) {function invoke(method, arg, resolve, reject) {var record = tryCatch(generator[method], generator, arg);if ("throw" !== record.type) {var result = record.arg,value = result.value;return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {invoke("next", value, resolve, reject);}, function (err) {invoke("throw", err, resolve, reject);}) : PromiseImpl.resolve(value).then(function (unwrapped) {result.value = unwrapped, resolve(result);}, function (error) {return invoke("throw", error, resolve, reject);});}reject(record.arg);}var previousPromise;this._invoke = function (method, arg) {function callInvokeWithMethodAndArg() {return new PromiseImpl(function (resolve, reject) {invoke(method, arg, resolve, reject);});}return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();};}function maybeInvokeDelegate(delegate, context) {var method = delegate.iterator[context.method];if (undefined === method) {if (context.delegate = null, "throw" === context.method) {if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");}return ContinueSentinel;}var record = tryCatch(method, delegate.iterator, context.arg);if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;var info = record.arg;return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);}function pushTryEntry(locs) {var entry = { tryLoc: locs[0] };1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);}function resetTryEntry(entry) {var record = entry.completion || {};record.type = "normal", delete record.arg, entry.completion = record;}function Context(tryLocsList) {this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);}function values(iterable) {if (iterable) {var iteratorMethod = iterable[iteratorSymbol];if (iteratorMethod) return iteratorMethod.call(iterable);if ("function" == typeof iterable.next) return iterable;if (!isNaN(iterable.length)) {var i = -1,next = function next() {for (; ++i < iterable.length;) {if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;}return next.value = undefined, next.done = !0, next;};return next.next = next;}}return { next: doneResult };}function doneResult() {return { value: undefined, done: !0 };}return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {var ctor = "function" == typeof genFun && genFun.constructor;return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));}, exports.mark = function (genFun) {return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;}, exports.awrap = function (arg) {return { __await: arg };}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {return this;}), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {void 0 === PromiseImpl && (PromiseImpl = Promise);var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {return result.done ? result.value : iter.next();});}, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {return this;}), define(Gp, "toString", function () {return "[object Generator]";}), exports.keys = function (object) {var keys = [];for (var key in object) {keys.push(key);}return keys.reverse(), function next() {for (; keys.length;) {var key = keys.pop();if (key in object) return next.value = key, next.done = !1, next;}return next.done = !0, next;};}, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) {if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);}}, stop: function stop() {this.done = !0;var rootRecord = this.tryEntries[0].completion;if ("throw" === rootRecord.type) throw rootRecord.arg;return this.rval;}, dispatchException: function dispatchException(exception) {if (this.done) throw exception;var context = this;function handle(loc, caught) {return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;}for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i],record = entry.completion;if ("root" === entry.tryLoc) return handle("end");if (entry.tryLoc <= this.prev) {var hasCatch = hasOwn.call(entry, "catchLoc"),hasFinally = hasOwn.call(entry, "finallyLoc");if (hasCatch && hasFinally) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);} else if (hasCatch) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);} else {if (!hasFinally) throw new Error("try statement without catch or finally");if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);}}}}, abrupt: function abrupt(type, arg) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {var finallyEntry = entry;break;}}finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);var record = finallyEntry ? finallyEntry.completion : {};return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);}, complete: function complete(record, afterLoc) {if ("throw" === record.type) throw record.arg;return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;}, finish: function finish(finallyLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;}}, "catch": function _catch(tryLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc === tryLoc) {var record = entry.completion;if ("throw" === record.type) {var thrown = record.arg;resetTryEntry(entry);}return thrown;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(iterable, resultName, nextLoc) {return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel;} }, exports;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}






var dbRT = (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.getDatabase)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.app);
var vapidKey =
'BBMmrZ44HmQylOh0idHo1FCn_Kbr7jP45Pe6LHVVVj4' +
'wB4x-IiPks_QRLLz-dZTL099Z2LKVZKYTJGfEMR4R0Ak';
var scoreValues = {
  A: 1,
  B: 4,
  C: 4,
  D: 2,
  E: 1,
  F: 4,
  G: 3,
  H: 4,
  I: 1,
  J: 10,
  K: 5,
  L: 2,
  M: 4,
  N: 2,
  O: 1,
  P: 4,
  Q: 10,
  R: 1,
  S: 1,
  T: 1,
  U: 2,
  V: 5,
  W: 4,
  X: 8,
  Y: 4,
  Z: 10 };


var currentUser = null;
var previousUser = null;
var allUsers = {};
var allGames = {};
var currentGame = null;
var currentGameId = null;
var myOpponentUid = null;
var currentCell = null;
var acrossWord = true;
var columns = null;
var currentClue = null;
var idxArray = [];
var myTurn = null;
// TODO: should this be tracked, and what can be done while offline?
var online = false;

/**
 * Unsubscribe from listening for changes on current game. Does nothing
 * if not subscribed to any game.
 */
var gameUnsubscribe = function gameUnsubscribe() {};

/**
 * Get the currentGame. Should be used by all external modules.
 * @returns {object} Returns currentGame or null
 */
function getCurrentGameController() {
  return currentGame;
}

/**
 * Set the currentGame. Should be used by all external modules.
 * @param {object} game Game with some parameters changed or added
 */
function setCurrentGameController(game) {
  currentGame = game;
}

/**
 * Get the value of acrossWord. Should be used by all external modules.
 * @returns {boolean} true if across, false if down
 */
function getAcrossWordController() {
  return acrossWord;
}

/**
 * Set acrossWord. Should be used by all external modules.
 * @param {boolean} across true if across, false if down
 */
function setAcrossWordController(across) {
  acrossWord = across;
}

/**
 * Get the currentUser. Should be used by all external modules.
 * @returns {Object} Returns currentUser or null
 */
function getCurrentUserController() {
  return currentUser;
}

/**
 * Get the allGames Object. Should be used by all external modules.
 * @returns {Object} Returns allGames Object
 */
function getAllGamesController() {
  return allGames;
}

/**
 * Get the columns Object. Should be used by all external modules.
 * @returns {number} Returns number of columns
 */
function getColumnsController() {
  return columns;
}

/**
 * Get the idxArray containing the indices of the currently selected word in the
 * puzzle. Should be used by all external modules.
 * @returns {array} Returns idxArray
 */
function getIdxArrayController() {
  return idxArray;
}

/**
 * Set the idxArray containing the indices of the currently selected word in the
 * puzzle. Should be used by all external modules.
 * @param {array} wordArray Array containing the indexes of the currently selected word.
 */
function setIdxArrayController(wordArray) {
  idxArray = wordArray;
}

/**
 * Helper function for creating state object.
 * @param {string} state
 * @returns State object to store for user on database
 */
function authState(state) {
  return { state: state, lastChanged: Date((0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.serverTimestamp)()) };
}

// Updates user online status only if user is logged in
// when connection/disconnection with app is made.
// If no user is logged in, this does nothing.
(0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.onValue)((0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.ref)(dbRT, '.info/connected'), function (snapshot) {
  console.log('connected notification fired. Connected: ', "".concat(snapshot.val()));
  var uid = _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth.currentUser ? _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth.currentUser.uid : null;
  if (snapshot.val() === false) {
    return;
  } else if (uid) {
    (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.onDisconnect)((0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.ref)(dbRT, "/users/".concat(uid))).
    set(authState('offline')).
    then(function () {
      (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.ref)(dbRT, "/users/".concat(uid)), authState('online'));
      return;
    });
  }
});

// // handles change to database just before auth state changes,
// // allowing permission to make the change.
// beforeAuthStateChanged(auth, (user) => {
//   const uid = auth.currentUser ? auth.currentUser.uid : null;
//   if (uid) {
//     set(ref(dbRT, `/users/${uid}`), authState('offline'));
//   }
// });

(0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.onAuthStateChanged)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth, function (user) {
  var uid = user ? user.uid : null;
  console.log('Hello from onAuthStateChanged. Current user ID: ', uid);
  (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.authChangeView)(user);
  previousUser = currentUser;
  currentUser = user;
  if (!uid) return;
  var authChanged = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.functions, 'authChanged');
  authChanged().
  then( /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(result) {return _regeneratorRuntime().wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
              console.log(result);if (!
              result.data) {_context.next = 4;break;}_context.next = 4;return (
                (0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.set)((0,firebase_database__WEBPACK_IMPORTED_MODULE_2__.ref)(dbRT, "/users/".concat(result.data)), authState('online')));case 4:return _context.abrupt("return");case 5:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}()).



  then(function () {
    generateMessagingToken();
    return;
  }).
  then(function () {
    populateAllGamesController();
    return;
  })["catch"](
  function (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
});

// Configure messaging credentials with FCM VAPID key
function generateMessagingToken() {
  (0,firebase_messaging__WEBPACK_IMPORTED_MODULE_4__.getToken)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.messaging, {
    vapidKey: vapidKey }).

  then(function (currentToken) {
    if (currentToken) {
      sendTokenToServer(currentToken);
    } else {
      // I don't think anything is needed here.
      // I think browser automatically asks for permission.
    }
    return;
  })["catch"](
  function (err) {
    console.log('An error occurred while retrieving token: ', err);
  });
}

/**
 * Send cloud messaging token to server
 * @param {string} token Cloud messaging token
 */function
sendTokenToServer(_x2) {return _sendTokenToServer.apply(this, arguments);}











/**
 * Called by the view, signs the user out or takes them to the #signin page.
 */function _sendTokenToServer() {_sendTokenToServer = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token) {var uid;return _regeneratorRuntime().wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:console.log('Messaging permission granted. Token: ', token);uid = _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth.currentUser ? _firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth.currentUser.uid : null;if (!uid) {_context2.next = 5;break;}_context2.next = 5;return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.db, "/users/".concat(uid, "/")), { msgToken: token }, { merge: true });case 5:case "end":return _context2.stop();}}}, _callee2);}));return _sendTokenToServer.apply(this, arguments);}
function authButtonClickedController() {
  if (currentUser) {
    (0,firebase_auth__WEBPACK_IMPORTED_MODULE_3__.signOut)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.auth).
    then(function () {
      // Sign-out successful.
      // signedOutView();
      // location.hash = '#signin';
      return;
    })["catch"](
    function (error) {
      console.log(error);
    });
  } else {
    // keep this else - location should change only if signOut successful
    location.hash = '#signin';
  }
}

/**
 * Populate list of all users from firestore and return the list.
 * @returns Object containing all users by uid
 */
function populateAllUsersController() {
  return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getDocs)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.db, 'users'))).
  then(function (snapshot) {
    if (snapshot.empty) {
      console.warn('No users exist yet.');
      return;
    }
    var usersObj = {};
    snapshot.docs.forEach(function (doc) {
      // console.log(doc.data());
      var user = doc.data();
      usersObj[user.uid] = user;
    });
    allUsers = usersObj;
    return usersObj;
  })["catch"](
  function (error) {return console.log('Error getting list of users: ', error);});
}

/**
 * Populate list of all games that is viewable to the current user
 * from firestore and return the list.
 * @returns Object containing all games by gameId
 */
function populateAllGamesController() {
  console.log('Hello from populateAllGamesController.');
  if (currentUser) {
    var q = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.query)(
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.collection)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.db, 'games'),
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.where)('viewableBy', 'array-contains', "".concat(currentUser.uid)),
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.orderBy)('start', 'desc'),
    (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.limit)(10));

    return (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.getDocs)(q).
    then(function (snapshot) {
      if (snapshot.empty) {
        console.warn('No games exist yet.');
        return;
      }
      var gamesObj = {};
      snapshot.docs.forEach(function (doc) {
        gamesObj[doc.id] = doc.data();
      });
      allGames = gamesObj;
      return gamesObj;
    }).
    then(function (gamesObj) {
      (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.loadGamesView)(gamesObj);
    })["catch"](
    function (error) {return console.log('Error getting list of games: ', error);});
  }
}

/**
 * This function fetches an active puzzle based on the user's selection
 * and then calls functions to format and display the puzzle
 * @param {String} puzzleId Firestore game (puzzle) id
 */
function fetchPuzzleController(puzzleId) {
  console.log('Hello from fetchPuzzleController.');
  subscribeToGame(puzzleId);
}

/**
 * Unsubscribe from listening for changes on previous game, and start listening
 * for changes on gameId game.
 * @param {string} gameId
 */
function subscribeToGame(gameId) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  try {
    gameUnsubscribe();
  } catch (error) {
    console.log('INFO: Error thrown trying to unsubscribe from current game.');
    // do nothing, already unsubscribed
  }

  // Start listening to current puzzle changes
  gameUnsubscribe = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.onSnapshot)(
  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.db, 'games', gameId),
  function (doc) {
    currentGame = doc.data();
    currentGameId = gameId;
    if (currentGame.status === 'started') {
      myOpponentUid =
      currentGame.initiator.uid === currentUser.uid ?
      currentGame.opponent.uid :
      currentGame.initiator.uid;
      columns = currentGame.puzzle.cols;
    }
    idxArray = [];
    columns = currentGame.puzzle.cols;
    myTurn = currentUser.uid === currentGame.nextTurn;
    (0,_view_js__WEBPACK_IMPORTED_MODULE_1__.showPuzzleView)(currentGame);
  },
  function (error) {
    console.error('Error subscribing to puzzle: ', error);
  });

}

/**
 * Play currentUser's turn. Executed when the player clicks the enter
 * button
 */
function playWordController() {
  console.log('Hello from playWordController.');
  if (currentGame.status === 'finished') return;
  if (incomplete()) return;
  if (location.hash === '#puzzle' && !myTurn) {
    alert("Your opponent hasn't played their turn yet!");
    return;
  }
  // TODO: something like this?:
  // document.getElementById('puzTitle').innerText = 'Fetching data...';
  var answerObj = {};
  answerObj.idxArray = idxArray;
  answerObj.gameId = currentGameId;
  answerObj.acrossWord = acrossWord;
  answerObj.guess = [];
  answerObj.myUid = currentUser.uid;
  answerObj.myOpponentUid = myOpponentUid;var _iterator = _createForOfIteratorHelper(
  idxArray),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var index = _step.value;
      answerObj.guess.push(currentGame.puzzle.grid[index].guess);
    }} catch (err) {_iterator.e(err);} finally {_iterator.f();}
  var checkAnswer = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.functions, 'checkAnswer');
  checkAnswer(answerObj).
  then(function (obj) {
    console.log('isCorrect: ', "".concat(obj.data.correctAnswer));
    return;
  }).
  then(function () {
    var notifyOpponent = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.functions, 'notifyPlayer');
    return notifyOpponent(answerObj.myOpponentUid).then(function (result) {
      console.log(result);
      return;
    });
  })["catch"](
  function (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}

/**
 * Checks if array of cells has a letter in each square
 * @return {boolean} true if word is incomplete, false otherwise
 */
function incomplete() {
  console.log('Hello from incomplete. idxArray: ', idxArray);
  if (idxArray.length === 0) return true;var _iterator2 = _createForOfIteratorHelper(
  idxArray),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var i = _step2.value;
      if (
      !currentGame.puzzle.grid[i].guess ||
      currentGame.puzzle.grid[i].guess === '')
      {
        return true;
      }
    }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}
  return false;
}

/**
 * Exported function that presenter uses to start a new game
 * @param {Object} gameStartParameters Parameters needed to start game
 */
function startNewGameController(gameStartParameters) {
  console.log('Attempting to start a new game.');
  var startGame = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.functions, 'startGame');
  startGame(gameStartParameters).
  then(function (gameObjData) {
    subscribeToGame(gameObjData.data.gameId);
    return gameObjData.data.game;
  })["catch"](
  function (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}

/**
 * Enter a letter into the currentGame as a guess.
 * @param {string} letter Letter to be entered into the square
 * @param {number} index Index of square
 */
function enterLetterController(letter, index) {
  currentGame.puzzle.grid[index].guess = letter;
}

/**
 * Update the controller currentGame variable and save the game.
 * @param {object} append Optional Object to append to game as game.append
 */
function savePuzzleController(append) {
  console.log('Hello from savePuzzleController.');
  if (append) {
    appendObject(currentGame, append);
  }
  (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.setDoc)((0,firebase_firestore__WEBPACK_IMPORTED_MODULE_5__.doc)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.db, "games/".concat(currentGameId)), currentGame, { merge: true })["catch"](
  function (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });

}

/**
 * Appends the append Object to the base Object.
 * @param {object} base Base object to append to
 * @param {object} append Object to append to base
 */
function appendObject(base, append) {
  var keys = Object.keys(append);
  keys.forEach(function (key) {
    base[key] = append[key];
  });
}

function abandonCurrentGameController() {
  var abandonObj = {};
  abandonObj.gameId = currentGameId;
  abandonObj.opponentUid = myOpponentUid;
  abandonObj.myUid = currentUser.uid;
  var abandonGame = (0,firebase_functions__WEBPACK_IMPORTED_MODULE_6__.httpsCallable)(_firebase_init_js__WEBPACK_IMPORTED_MODULE_0__.functions, 'abandonGame');
  abandonGame(abandonObj)["catch"](function (err) {
    console.log('Error code: ', err.code);
    console.log('Error message: ', err.message);
    console.log('Error details: ', err.details);
  });
}



/***/ }),

/***/ "./src/router.js":
/*!***********************!*\
  !*** ./src/router.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");


window.addEventListener('load', function () {
  initRouter();
});

/** Initialize after document loads */
function initRouter() {
  var querySelector = document.querySelector.bind(document);
  var appContainer = querySelector('#appContainer');
  var gamesPanel = querySelector('#gamesPanel');
  var gamesDialog = querySelector('#gamesDialog');
  var scores = querySelector('#scores');
  var concessionBtnContainer = querySelector('#concessionBtnContainer');
  var puzzleInfo = document.getElementById('puzzleInfo');
  var puzTable = document.getElementById('puzTable');
  var clueContainer = document.getElementById('clueContainer');
  var kbContainer = document.getElementById('kbContainer');
  var splash = document.getElementById('splash');
  var headerSignin = document.getElementById('headerSignin');
  var signinMessage = document.getElementById('signinMessage');
  var tos = document.getElementById('tos');
  var privacy = document.getElementById('privacy');
  var returnToSignin = document.getElementById('returnToSignin');
  var firebaseuiAuthContainer = document.getElementById(
  'firebaseuiAuthContainer');


  window.addEventListener('hashchange', navigate);

  /**
   * Navigate based on hash change
   */
  function navigate() {
    if (location.hash === '#puzzle') {
      // try {
      //   const replayButton = querySelector('#replayButton');
      //   if (!replayButton) {
      //     gamesDialog.close();
      //   }
      // } catch (err) {
      //   // do nothing, error OK
      // }
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      puzzleInfo.classList.remove('displayNone');
      headerSignin.classList.add('displayNone');
    } else if (location.hash === '#signin') {
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      concessionBtnContainer.classList.add('displayNone');
      puzzleInfo.classList.add('displayNone');
      puzTable.classList.add('displayNone');
      clueContainer.classList.add('displayNone');
      kbContainer.classList.add('displayNone');
      splash.classList.remove('displayNone');
      headerSignin.classList.add('displayNone');
      signinMessage.classList.remove('displayNone');
      tos.classList.add('displayNone');
      privacy.classList.add('displayNone');
      returnToSignin.classList.add('displayNone');
      firebaseuiAuthContainer.classList.remove('displayNone');
    } else if (location.hash === '#games') {
      try {
        gamesDialog.close();
      } catch (err) {
        // do nothing, error OK
      }
      if (!(0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)()) {
        headerSignin.classList.remove('displayNone');
      }
      gamesPanel.classList.remove('slideOut');
      appContainer.classList.remove('slideIn');
      concessionBtnContainer.classList.add('displayNone');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      puzzleInfo.classList.add('displayNone');
      (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.populateAllGamesController)();
    } else if (location.hash === '#tos') {
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      concessionBtnContainer.classList.add('displayNone');
      puzzleInfo.classList.add('displayNone');
      puzTable.classList.add('displayNone');
      clueContainer.classList.add('displayNone');
      kbContainer.classList.add('displayNone');
      splash.classList.remove('displayNone');
      tos.classList.remove('displayNone');
      returnToSignin.classList.remove('displayNone');
      signinMessage.classList.add('displayNone');
      firebaseuiAuthContainer.classList.add('displayNone');
    } else if (location.hash === '#privacy') {
      gamesPanel.classList.add('slideOut');
      appContainer.classList.add('slideIn');
      scores.classList.remove('displayFlex');
      scores.classList.add('displayNone');
      concessionBtnContainer.classList.add('displayNone');
      puzzleInfo.classList.add('displayNone');
      puzTable.classList.add('displayNone');
      clueContainer.classList.add('displayNone');
      kbContainer.classList.add('displayNone');
      splash.classList.remove('displayNone');
      privacy.classList.remove('displayNone');
      returnToSignin.classList.remove('displayNone');
      signinMessage.classList.add('displayNone');
      firebaseuiAuthContainer.classList.add('displayNone');
    }
  }

  if (location.hash !== '#games') {
    location.hash = '#games';
  }
}

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "authChangeView": () => (/* binding */ authChangeView),
/* harmony export */   "loadGamesView": () => (/* binding */ loadGamesView),
/* harmony export */   "showPuzzleView": () => (/* binding */ showPuzzleView),
/* harmony export */   "signedOutView": () => (/* binding */ signedOutView)
/* harmony export */ });
/* harmony import */ var _controller_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}function _createForOfIteratorHelper(o, allowArrayLike) {var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];if (!it) {if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {if (it) o = it;var i = 0;var F = function F() {};return { s: F, n: function n() {if (i >= o.length) return { done: true };return { done: false, value: o[i++] };}, e: function e(_e) {throw _e;}, f: F };}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion = true,didErr = false,err;return { s: function s() {it = it.call(o);}, n: function n() {var step = it.next();normalCompletion = step.done;return step;}, e: function e(_e2) {didErr = true;err = _e2;}, f: function f() {try {if (!normalCompletion && it["return"] != null) it["return"]();} finally {if (didErr) throw err;}} };}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _regeneratorRuntime() {"use strict";
/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */_regeneratorRuntime = function _regeneratorRuntime() {return exports;};var exports = {},Op = Object.prototype,hasOwn = Op.hasOwnProperty,$Symbol = "function" == typeof Symbol ? Symbol : {},iteratorSymbol = $Symbol.iterator || "@@iterator",asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";function define(obj, key, value) {return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key];}try {define({}, "");} catch (err) {define = function define(obj, key, value) {return obj[key] = value;};}function wrap(innerFn, outerFn, self, tryLocsList) {var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,generator = Object.create(protoGenerator.prototype),context = new Context(tryLocsList || []);return generator._invoke = function (innerFn, self, context) {var state = "suspendedStart";return function (method, arg) {if ("executing" === state) throw new Error("Generator is already running");if ("completed" === state) {if ("throw" === method) throw arg;return doneResult();}for (context.method = method, context.arg = arg;;) {var delegate = context.delegate;if (delegate) {var delegateResult = maybeInvokeDelegate(delegate, context);if (delegateResult) {if (delegateResult === ContinueSentinel) continue;return delegateResult;}}if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {if ("suspendedStart" === state) throw state = "completed", context.arg;context.dispatchException(context.arg);} else "return" === context.method && context.abrupt("return", context.arg);state = "executing";var record = tryCatch(innerFn, self, context);if ("normal" === record.type) {if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;return { value: record.arg, done: context.done };}"throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);}};}(innerFn, self, context), generator;}function tryCatch(fn, obj, arg) {try {return { type: "normal", arg: fn.call(obj, arg) };} catch (err) {return { type: "throw", arg: err };}}exports.wrap = wrap;var ContinueSentinel = {};function Generator() {}function GeneratorFunction() {}function GeneratorFunctionPrototype() {}var IteratorPrototype = {};define(IteratorPrototype, iteratorSymbol, function () {return this;});var getProto = Object.getPrototypeOf,NativeIteratorPrototype = getProto && getProto(getProto(values([])));NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);function defineIteratorMethods(prototype) {["next", "throw", "return"].forEach(function (method) {define(prototype, method, function (arg) {return this._invoke(method, arg);});});}function AsyncIterator(generator, PromiseImpl) {function invoke(method, arg, resolve, reject) {var record = tryCatch(generator[method], generator, arg);if ("throw" !== record.type) {var result = record.arg,value = result.value;return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {invoke("next", value, resolve, reject);}, function (err) {invoke("throw", err, resolve, reject);}) : PromiseImpl.resolve(value).then(function (unwrapped) {result.value = unwrapped, resolve(result);}, function (error) {return invoke("throw", error, resolve, reject);});}reject(record.arg);}var previousPromise;this._invoke = function (method, arg) {function callInvokeWithMethodAndArg() {return new PromiseImpl(function (resolve, reject) {invoke(method, arg, resolve, reject);});}return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();};}function maybeInvokeDelegate(delegate, context) {var method = delegate.iterator[context.method];if (undefined === method) {if (context.delegate = null, "throw" === context.method) {if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");}return ContinueSentinel;}var record = tryCatch(method, delegate.iterator, context.arg);if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;var info = record.arg;return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);}function pushTryEntry(locs) {var entry = { tryLoc: locs[0] };1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);}function resetTryEntry(entry) {var record = entry.completion || {};record.type = "normal", delete record.arg, entry.completion = record;}function Context(tryLocsList) {this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);}function values(iterable) {if (iterable) {var iteratorMethod = iterable[iteratorSymbol];if (iteratorMethod) return iteratorMethod.call(iterable);if ("function" == typeof iterable.next) return iterable;if (!isNaN(iterable.length)) {var i = -1,next = function next() {for (; ++i < iterable.length;) {if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;}return next.value = undefined, next.done = !0, next;};return next.next = next;}}return { next: doneResult };}function doneResult() {return { value: undefined, done: !0 };}return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {var ctor = "function" == typeof genFun && genFun.constructor;return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));}, exports.mark = function (genFun) {return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;}, exports.awrap = function (arg) {return { __await: arg };}, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {return this;}), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {void 0 === PromiseImpl && (PromiseImpl = Promise);var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {return result.done ? result.value : iter.next();});}, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {return this;}), define(Gp, "toString", function () {return "[object Generator]";}), exports.keys = function (object) {var keys = [];for (var key in object) {keys.push(key);}return keys.reverse(), function next() {for (; keys.length;) {var key = keys.pop();if (key in object) return next.value = key, next.done = !1, next;}return next.done = !0, next;};}, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) {if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {"t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);}}, stop: function stop() {this.done = !0;var rootRecord = this.tryEntries[0].completion;if ("throw" === rootRecord.type) throw rootRecord.arg;return this.rval;}, dispatchException: function dispatchException(exception) {if (this.done) throw exception;var context = this;function handle(loc, caught) {return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;}for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i],record = entry.completion;if ("root" === entry.tryLoc) return handle("end");if (entry.tryLoc <= this.prev) {var hasCatch = hasOwn.call(entry, "catchLoc"),hasFinally = hasOwn.call(entry, "finallyLoc");if (hasCatch && hasFinally) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);} else if (hasCatch) {if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);} else {if (!hasFinally) throw new Error("try statement without catch or finally");if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);}}}}, abrupt: function abrupt(type, arg) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {var finallyEntry = entry;break;}}finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);var record = finallyEntry ? finallyEntry.completion : {};return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);}, complete: function complete(record, afterLoc) {if ("throw" === record.type) throw record.arg;return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;}, finish: function finish(finallyLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;}}, "catch": function _catch(tryLoc) {for (var i = this.tryEntries.length - 1; i >= 0; --i) {var entry = this.tryEntries[i];if (entry.tryLoc === tryLoc) {var record = entry.completion;if ("throw" === record.type) {var thrown = record.arg;resetTryEntry(entry);}return thrown;}}throw new Error("illegal catch attempt");}, delegateYield: function delegateYield(iterable, resultName, nextLoc) {return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel;} }, exports;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}



//#region HTML element constants
var authButton = document.getElementById('authButton');
var drawer = document.getElementById('drawer');
var profileName = document.getElementById('profileName');
var avatar = document.getElementById('avatar');
var gamesDialog = document.getElementById('gamesDialog');
var headerSignin = document.getElementById('headerSignin');
var gameOverHeading = document.getElementById('gameOverHeading');
var winMessage = document.getElementById('winMessage');
var opponentHeading = document.getElementById('opponentHeading');
var opponentList = document.getElementById('opponentList');
var radioEasy = document.getElementById('radioEasy');
var radioMed = document.getElementById('radioMed');
var radioHard = document.getElementById('radioHard');
var dialogList = document.getElementById('dialogList');
var activeGamesContainer = document.getElementById('activeGamesContainer');
var pastGamesContainer = document.getElementById('pastGamesContainer');
var puzTable = document.getElementById('puzTable');
var puzAuthor = document.getElementById('puzAuthor');
var puzCopy = document.getElementById('puzCopy');
var puzNotepad = document.getElementById('puzNotepad');
var clueContainer = document.getElementById('clueContainer');
var acrossClues = document.getElementById('acrossClues');
var downClues = document.getElementById('downClues');
var singleClue = document.getElementById('singleClue');
var keyboard = document.getElementById('kbContainer');
var splash = document.getElementById('splash');
var scores = document.getElementById('scores');
var myName = document.getElementById('myName');
var oppName = document.getElementById('oppName');
var myScore = document.getElementById('myScore');
var oppScore = document.getElementById('oppScore');
var concessionBtn = document.getElementById('concessionBtn');
var concessionBtnContainer = document.getElementById(
'concessionBtnContainer');

var puzTitle = document.getElementById('puzTitle');
var logo = document.getElementById('logo');
var replayButton = document.getElementById('replayButton');
var returnToSignin = document.getElementById('returnToSignin');
//#endregion

var currentCell = null;
var acrossWord = true;
// let currentOpponent = null;
// let allUsers = null;

logo.addEventListener('click', function () {
  location.hash = '#games';
});

returnToSignin.addEventListener('click', function () {return location.hash = '#signin';});

/**
 * Clicking the authButton on the drawer calls `authButtonClickedController`
 * from the controller, which signs the user in or out depending on
 * their current sign in status.
 */
authButton.addEventListener('click', function (event) {
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.authButtonClickedController)();
});

/**
 * Called by the controller, updates the view
 * when there is an auth change.
 * @param {User} user Current logged in user or null
 */
function authChangeView(user) {
  if (user) {
    authButton.textContent = 'sign out';
    profileName.textContent = user.displayName;
    avatar.src = user.photoURL ?
    user.photoURL :
    'images/avatar_circle_black.png';
    location.hash = '#games';
    headerSignin.classList.add('displayNone');
  } else {
    authButton.textContent = 'sign in';
    profileName.textContent = 'N. E. Person';
    avatar.src = 'images/avatar_circle_black.png';
    headerSignin.classList.remove('displayNone');
    puzTitle.innerText = 'No puzzle loaded';
    activeGamesContainer.innerHTML =
    'You must sign in to see your active games';
    pastGamesContainer.innerHTML =
    'You must sign in to see your completed games';
    clearPuzzle();
    if (location.hash !== '#tos' || location.hash !== '#privacy')
    location.hash = '#signin';
  }
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  // TODO: get rid of local variables - currentUser should be available only
  // in the controller
  // currentUser = user;
}

/**
 * Called by the controller, updates the view
 * when user has signed out.
 */
function signedOutView() {
  activeGamesContainer.innerHTML = 'You must sign in to see your active games';
  pastGamesContainer.innerHTML = 'You must sign in to see your completed games';
  if (drawer.classList.contains('is-visible')) toggleDrawer();
  clearPuzzle();
}

/** Helper function for toggling drawer */
function toggleDrawer() {
  document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
}

/** Removes puzzle from DOM */
function clearPuzzle() {
  console.log('Hello from clearPuzzle.');
  puzTitle.innerText = 'Puzzle info will appear here';
  // clear out old puzzle and clues
  puzTable.innerHTML = '';
  puzAuthor.innerText = '';
  puzNotepad.classList.add('displayNone');
  puzCopy.innerHTML = '';
  clueContainer.classList.add('displayNone');
  splash.classList.remove('displayNone');
  acrossClues.innerHTML = '';
  downClues.innerHTML = '';
  singleClue.innerText = 'Select in the puzzle to reveal clue';
  currentCell = null;
}

// Go to signin page when user clicks headerSignin icon
headerSignin.addEventListener('click', function () {
  location.hash = '#signin';
});

/**
 * Start a new game with selected opponent
 * @param {MouseEvent} event Click event from dialogList
 */
dialogList.addEventListener('click', /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(event) {var currentUser, userList, gameStartParameters, target, difficulty;return _regeneratorRuntime().wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            console.log('User selected opponent to start a new game.');
            currentUser = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)();_context.next = 4;return (
              (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.populateAllUsersController)());case 4:userList = _context.sent;
            gameStartParameters = {};
            gameStartParameters.initiator = {};
            gameStartParameters.initiator.uid = currentUser.uid;
            gameStartParameters.initiator.displayName = currentUser.displayName;
            gameStartParameters.initiator.photoURL = currentUser.photoURL ?
            currentUser.photoURL :
            null;
            // TODO: selecting the right target may need fixing - while loop?
            target = event.target.parentElement;
            // trying a fix
            while (target.id === '') {
              target = target.parentElement;
            }
            gameStartParameters.opponent = {};
            gameStartParameters.opponent.uid = userList[target.id].uid;
            gameStartParameters.opponent.displayName = userList[target.id].displayName;
            gameStartParameters.opponent.photoURL = userList[target.id].photoURL ?
            userList[target.id].photoURL :
            null;
            difficulty = radioMed.parentElement.classList.contains('is-checked') ?
            'medium' :
            'easy';
            difficulty = radioHard.parentElement.classList.contains('is-checked') ?
            'hard' :
            difficulty;
            gameStartParameters.difficulty = difficulty;
            closeGamesDialog();
            document.getElementById('puzTitle').innerText = 'Fetching new puzzle...';
            (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.startNewGameController)(gameStartParameters);case 22:case "end":return _context.stop();}}}, _callee);}));return function (_x) {return _ref.apply(this, arguments);};}());


gamesDialog.querySelector('.close').addEventListener('click', closeGamesDialog);

/** Reset radio buttons and close dialog */
function closeGamesDialog() {
  console.log('Hello from closeGamesDialog.');
  radioMed.removeAttribute('checked');
  radioHard.removeAttribute('checked');
  radioEasy.setAttribute('checked', true);
  gamesDialog.close();
}

/**
 * Fires an event with user data to populate, update and open the new game
 * dialog in the view, or send user to the login page if no one is logged in.
 */
startGameButton.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {var currentUser, usersObj;return _regeneratorRuntime().wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
          console.log('startGameButton clicked.');
          currentUser = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)();if (!
          currentUser) {_context2.next = 17;break;}_context2.next = 5;return (

            (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.populateAllUsersController)());case 5:usersObj = _context2.sent;
          loadUserList(usersObj, currentUser);
          gameOverHeading.classList.add('displayNone');
          winMessage.classList.add('displayNone');
          gamesDialog.children[0].classList.add('padding0', 'height100pct');
          opponentHeading.classList.remove('displayNone');
          opponentList.classList.remove('displayNone');
          replayButton.classList.add('displayNone');
          gamesDialog.classList.add('height80pct');
          gamesDialog.showModal();_context2.next = 18;break;case 17:

          // user is not logged in
          location.hash = '#signin';case 18:case "end":return _context2.stop();}}}, _callee2);})));



/**
 * Load list of potential opponents with list of all firebase users.
 * @param {Object} usersObj Object containing all users by uid
 * @param {object} currentUser Current User
 */
function loadUserList(usersObj, currentUser) {
  console.log('Hello from loadUserList.');
  var userList = '';
  if (usersObj.empty) {
    console.warn('No users exist yet.');
    return;
  }
  var uids = Object.keys(usersObj);
  uids.forEach(function (uid) {
    var user = usersObj[uid];
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, ' => ', doc.data());
    if (uid !== currentUser.uid) {
      var _avatar = "<i class='material-icons mdl-list__item-avatar'>person</i>";
      if (user.photoURL) {
        _avatar = "<span class='picContainer material-icons mdl-list__item-avatar'>\n          <img src='".concat(
        user.photoURL, "' alt='profile picture'>\n        </span>");

      }
      userList += "<li id='".concat(uid, "' class='mdl-list__item mdl-list__item--two-line cursorPointer'>\n        <span class='mdl-list__item-primary-content whiteSpaceNowrap'>\n          ").concat(

      _avatar, "\n          <div class='overflowHidden' style='width: 115px;'>").concat(

      user.displayName, "</div>\n          <span class='mdl-list__item-sub-title'>\n            ").concat(


      user.providerId ? user.providerId.split('.')[0] : 'none', "\n          </span>\n        </span>\n        <span class='mdl-list__item-secondary-content'>\n          <span class='mdl-list__item-secondary-info'>Play</span>\n          <i class='material-icons'>grid_on</i>\n        </span>\n      </li>");







    }
  });
  // allUsers = usersObj;
  // console.log(userList);
  dialogList.innerHTML = userList;
}

/**
 * Load game list with active and past games that the current user has
 * participated in.
 * @param {Object} gamesObj Object all games viewable by the current user
 */function
loadGamesView(_x2) {return _loadGamesView.apply(this, arguments);}function _loadGamesView() {_loadGamesView = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(gamesObj) {var currentUser, allUsers, activeGamesHtml, pastGamesHtml, games;return _regeneratorRuntime().wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            console.log('Hello from loadGamesView.');
            currentUser = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)();_context3.next = 4;return (
              (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.populateAllUsersController)());case 4:allUsers = _context3.sent;if (
            currentUser) {_context3.next = 7;break;}return _context3.abrupt("return");case 7:
            activeGamesContainer.innerHTML = 'No active games yet. Start one!';
            pastGamesContainer.innerHTML = 'No completed games yet';
            activeGamesHtml = '';
            pastGamesHtml = '';if (
            gamesObj && Object.keys(gamesObj)) {_context3.next = 14;break;}
            // gamesObj doesn't exist or is empty
            console.warn('No games exist yet.');return _context3.abrupt("return");case 14:


            games = Object.keys(gamesObj);
            games.forEach(function (key) {
              var game = gamesObj[key];
              var startDate = new Date(game.start).toLocaleDateString('en-us', {
                day: 'numeric',
                month: 'short' });

              var avatar = "<i class='material-icons mdl-list__item-avatar'>person</i>";
              if (game.status === 'started') {
                var myOpponent =
                game.initiator.uid === currentUser.uid ? game.opponent : game.initiator;
                var opponentPhoto =
                allUsers[myOpponent.uid] && allUsers[myOpponent.uid].photoURL;
                if (opponentPhoto) {
                  avatar = "<span class='picContainer material-icons mdl-list__item-avatar'>\n          <img src='".concat(
                  opponentPhoto, "' alt='profile picture'>\n        </span>");

                }
                activeGamesHtml += "<li id='".concat(key, "' class='mdl-list__item mdl-list__item--two-line cursorPointer'>\n  <span class='mdl-list__item-primary-content'>\n    ").concat(

                avatar, "\n    <span>").concat(
                myOpponent.displayName, "</span>\n    <span class='mdl-list__item-sub-title'>\n      ").concat(

                currentUser.uid === game.nextTurn ? 'Your' : 'Their', " turn\n    </span>\n  </span>\n  <span class='mdl-list__item-secondary-content'>\n  <span class='mdl-list__item-secondary-info'>Started</span>\n  <span>").concat(




                startDate, "</span>\n  </span>\n</li>");


              } else {
                var _myOpponent =
                game.initiator.uid === currentUser.uid ? game.opponent : game.initiator;
                var result = 'Tie game!';
                if (game.status === 'finished' && game.winner !== 'tie') {
                  result = currentUser.uid === game.winner ? 'You won!!' : 'They won';
                } else if (game.status === 'abandoned') {
                  result = 'Game abandoned';
                }
                // pastGames[doc.id] = {};
                // pastGames[doc.id].difficulty = game.difficulty;
                var _opponentPhoto =
                allUsers[_myOpponent.uid] && allUsers[_myOpponent.uid].photoURL;
                if (_opponentPhoto) {
                  avatar = "<span class='picContainer material-icons mdl-list__item-avatar'>\n  <div>\n    <img src='".concat(

                  _opponentPhoto, "' alt='profile picture'>\n  </div>\n</span>");


                }
                pastGamesHtml += "<li id='".concat(key, "' class='mdl-list__item mdl-list__item--two-line cursorPointer'>\n  <span class='mdl-list__item-primary-content'>\n    ").concat(

                avatar, "\n    <span>").concat(
                _myOpponent.displayName, "</span>\n    <span class='mdl-list__item-sub-title'>").concat(
                result, "</span>\n  </span>\n    <span class='mdl-list__item-secondary-content'>\n    <span class='mdl-list__item-secondary-info'>Started</span>\n    <span>").concat(



                startDate, "</span>\n  </span>\n</li>");


              }
            });

            // console.log(dialogList);
            activeGamesContainer.innerHTML =
            activeGamesHtml === '' ?
            'No active games yet. Start one!' :
            activeGamesHtml;
            pastGamesContainer.innerHTML =
            pastGamesHtml === '' ? 'No completed games yet' : pastGamesHtml;case 18:case "end":return _context3.stop();}}}, _callee3);}));return _loadGamesView.apply(this, arguments);}


activeGamesContainer.addEventListener('click', loadGame);

pastGamesContainer.addEventListener('click', loadGame);

/**
 * Fetch an existing game from firestore via the controller.
 * @param {MouseEvent} event
 * @returns null
 */
function loadGame(event) {
  console.log('User selected a game to view.');
  var eventTarget = event.target;
  while (!eventTarget.id) {
    if (eventTarget.nodeName.toLowerCase() === 'ul') return;
    eventTarget = eventTarget.parentElement;
  }
  puzTitle.innerText = 'Fetching data...';
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.fetchPuzzleController)(eventTarget.id);
}

/**
 * This function takes the puzzle object returned from the fetch and displays
 * a grid and clues. The HTML table element is a placeholder and the rows and
 * cells are created on the fly. The fetched puzzle is stored as an object in
 * the variable "game".
 */
function showPuzzleView(game) {
  console.log('Hello from showPuzzleView.');
  // clear previous puzzle if it exists
  if (puzTable.children) {
    clearPuzzle();
  }
  if (game.puzzle.notepad) {
    puzNotepad.innerHTML = "<b>Notepad:</b>".concat(game.puzzle.notepad);
    puzNotepad.classList.remove('displayNone');
  }
  puzTitle.innerText = game.puzzle.title ? game.puzzle.title : 'Untitled';
  puzAuthor.innerText = "by ".concat(
  game.puzzle.author ? game.puzzle.author : 'Anonymous');

  puzCopy.innerHTML = game.puzzle.copyright ? "&copy; ".concat(
  game.puzzle.copyright) :
  '';

  var cellDim = getCellDim();
  var tableDim = cellDim * game.puzzle.cols;
  var gridIndex = 0;
  for (var rowIndex = 0; rowIndex < game.puzzle.rows; rowIndex += 1) {
    var row = puzTable.insertRow(rowIndex);
    row.style.width = "".concat(tableDim, "px");
    for (var colIndex = 0; colIndex < game.puzzle.cols; colIndex += 1) {
      var clueNumber = game.puzzle.grid[gridIndex].clueNum;
      var cell = row.insertCell(colIndex);
      var blackCell = game.puzzle.grid[gridIndex].black;

      cell.style.width = "".concat(cellDim, "px");
      cell.style.height = "".concat(cellDim, "px");
      cell.addEventListener('click', cellClicked);
      if (blackCell) {
        cell.className = 'black';
      } else {
        cell.classList.add('cursorPointer');
        var squareDiv = document.createElement('div');
        var letterDiv = document.createElement('div');
        squareDiv.classList.add('square');
        letterDiv.classList.add('marginAuto');
        if (game.puzzle.grid[gridIndex].status === 'locked') {
          cell.classList.add(game.puzzle.grid[gridIndex].bgColor);
        }
        var guess = game.puzzle.grid[gridIndex].guess;
        letterDiv.innerText = guess ? guess : '';
        squareDiv.appendChild(letterDiv);
        cell.appendChild(squareDiv);
        if (clueNumber !== '') {
          var clueNumDiv = document.createElement('div');
          clueNumDiv.classList.add('clueNumber');
          clueNumDiv.appendChild(document.createTextNode(clueNumber));
          cell.appendChild(clueNumDiv);
        }
        if (game.puzzle.grid[gridIndex].circle) {
          cell.children[0].classList.add('circle');
        }
      }
      gridIndex += 1;
    }
  }
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.setCurrentGameController)(game);

  keyboard.classList.remove('displayNone');
  keyboard.classList.add('displayFlex');
  clueContainer.classList.remove('displayNone');
  splash.classList.add('displayNone');
  concessionBtnContainer.classList.remove('displayNone');

  // create contents for across clues div
  var _iterator = _createForOfIteratorHelper(game.puzzle.clues.across),_step;try {for (_iterator.s(); !(_step = _iterator.n()).done;) {var clue = _step.value;
      var parsedClue = clue.split('.');
      var _clueNumber = parseInt(parsedClue[0]);
      var clueRef = parsedClue[0] + '.';
      var clueText = parsedClue.slice(1).join('.');
      var clueDiv = document.createElement('div');
      clueDiv.classList.add('displayFlex', 'cursorPointer');
      clueDiv.id = 'across' + _clueNumber;
      if (game.puzzle.completedClues.across.includes(_clueNumber)) {
        clueDiv.classList.add('colorLightGray');
      }

      var numDiv = document.createElement('div');
      numDiv.appendChild(document.createTextNode(clueRef));
      numDiv.classList.add('padRight', 'cursorPointer');

      var textDiv = document.createElement('div');
      textDiv.appendChild(document.createTextNode(clueText));
      textDiv.classList.add('cursorPointer');
      clueDiv.appendChild(numDiv);
      clueDiv.appendChild(textDiv);
      acrossClues.appendChild(clueDiv);
    }

    // create contents for down clues div
  } catch (err) {_iterator.e(err);} finally {_iterator.f();}var _iterator2 = _createForOfIteratorHelper(game.puzzle.clues.down),_step2;try {for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {var _clue = _step2.value;
      var _parsedClue = _clue.split('.');
      var _clueNumber2 = parseInt(_parsedClue[0]);
      var _clueRef = _parsedClue[0] + '.';
      var _clueText = _parsedClue.slice(1).join('.');
      var _clueDiv = document.createElement('div');
      _clueDiv.classList.add('displayFlex', 'cursorPointer');
      _clueDiv.id = 'down' + _clueNumber2;
      if (game.puzzle.completedClues.down.includes(_clueNumber2)) {
        _clueDiv.classList.add('colorLightGray');
      }

      var _numDiv = document.createElement('div');
      _numDiv.appendChild(document.createTextNode(_clueRef));
      _numDiv.classList.add('padRight', 'cursorPointer');

      var _textDiv = document.createElement('div');
      _textDiv.appendChild(document.createTextNode(_clueText));
      _textDiv.classList.add('cursorPointer');
      _clueDiv.appendChild(_numDiv);
      _clueDiv.appendChild(_textDiv);
      downClues.appendChild(_clueDiv);
    }} catch (err) {_iterator2.e(err);} finally {_iterator2.f();}

  acrossClues.addEventListener('click', function (event) {
    if (event.target.innerText !== '') {
      clueClicked(event, 'across');
    }
  });

  downClues.addEventListener('click', function (event) {
    if (event.target.innerText !== '') {
      clueClicked(event, 'down');
    }
  });

  scores.classList.remove('displayNone');
  scores.classList.add('displayFlex');
  var me =
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)().uid === game.initiator.uid ?
  'initiator' :
  'opponent';
  var they = me === 'initiator' ? 'opponent' : 'initiator';
  var myNickname = game[me].displayName;
  var oppNickname = game[they].displayName;

  myNickname = myNickname.split(' ')[0];
  myNickname = myNickname.length > 8 ? myNickname.slice(0, 8) : myNickname;
  myName.innerText = myNickname;
  oppNickname = oppNickname.split(' ')[0];
  oppNickname = oppNickname.length > 8 ? oppNickname.slice(0, 8) : oppNickname;
  oppName.innerText = oppNickname;
  if (game.emptySquares === 0) {
    var result = 'YOU WON!!';
    if (game[me].score < game[they].score) {
      result = 'You lost';
    } else {
      result = 'Tie game!';
    }
    if (!game.hideReplay) {
      showReplayDialog(game, result);
      (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.savePuzzleController)({ hideReplay: true });
    }
    concessionBtnContainer.classList.add('displayNone');
  } else {
    concessionBtnContainer.classList.remove('displayNone');
  }
  updateScoreboard(game);
  console.log(game);
  // TODO: should this go here?
  location.hash = '#puzzle';
}

/**
 * Sets the variable currentCell to the cell the user clicked in
 * @param {Event} event Mouse click or screen touch event
 */
function cellClicked(event) {
  console.log('Hello from cellClicked.');
  var cell = event.target;
  var row = cell.parentElement.rowIndex;
  var col = cell.cellIndex;
  var acrossWord = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getAcrossWordController)();
  // const index = row * getColumnsController() + col;
  // console.log(cell.cellIndex);
  // console.log(cell.parentElement.rowIndex);
  // console.log(event);

  if (cell.className === 'black') {
    return;
  }
  // TODO: uncomment below if clearing all letters from previous selection is desired
  // if (!getIdxArrayController().includes(index)) {
  //   clearLetters();
  // }
  if (currentCell && currentCell === cell) {
    // clearLetters();
    acrossWord = !acrossWord;
    (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.setAcrossWordController)(acrossWord);
  }
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.setIdxArrayController)([]);
  currentCell = cell;
  if (acrossWord) {
    selectAcross(cell);
  } else {
    selectDown(cell);
  }
}

/**
 * When clue is clicked, this event fires
 * @param {Event} event Mouse click or screen touch event
 * @param {string} direction Clue direction (across or down)
 */
function clueClicked(event, direction) {
  console.log('Hello from clueClicked.');
  var clueNumberText = event.target.parentElement.firstChild.innerText;
  clueNumberText = clueNumberText.slice(0, clueNumberText.indexOf('.'));
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var cellIndex = game.clueNumIndices[clueNumberText];
  var row = Math.floor(cellIndex / columns);
  var col = cellIndex - row * columns;
  var cell = puzTable.firstChild.children[row].children[col];
  if (direction === 'across') {
    selectAcross(cell);
  } else {
    selectDown(cell);
  }
}

/**
 * Update scores in the scoreboard.
 * @param {object} game Current game object
 */
function updateScoreboard(game) {
  console.log('Hello from updateScoreboard.');
  var me =
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)().uid === game.initiator.uid ?
  'initiator' :
  'opponent';
  var they = me === 'initiator' ? 'opponent' : 'initiator';
  myScore.innerText = game[me].score;
  oppScore.innerText = game[they].score;
  myName.classList.add(game[me].bgColor.replace('bg', 'font'));
  oppName.classList.add(game[they].bgColor.replace('bg', 'font'));
  if (game.nextTurn === game[me].uid) {
    scores.children[0].classList.remove('bgColorTransWhite');
    scores.children[0].classList.add('bgColorTransGold');
    scores.children[2].classList.remove('bgColorTransGold');
    scores.children[2].classList.add('bgColorTransWhite');
  } else {
    scores.children[0].classList.remove('bgColorTransGold');
    scores.children[0].classList.add('bgColorTransWhite');
    scores.children[2].classList.remove('bgColorTransWhite');
    scores.children[2].classList.add('bgColorTransGold');
  }
}

/**
 * Removes letter (if present) from current cell and moves
 * backward one space
 */
function undoEntry() {
  console.log('Hello from undoEntry.');
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  if (currentCell) {
    var row = currentCell.parentElement.rowIndex;
    var col = currentCell.cellIndex;
    var index = row * columns + col;
    // reverse copy idxArray so we go backwards instead of forwards
    var localIdxArray = [];
    var idxArray = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getIdxArrayController)();
    for (var i = 0, j = idxArray.length; i < idxArray.length; i++, j--) {
      localIdxArray[i] = idxArray[j - 1];
    }
    var nextCellIndex = localIdxArray.indexOf(index) + 1;
    localIdxArray = localIdxArray.
    slice(nextCellIndex).
    concat(localIdxArray.slice(0, nextCellIndex));
    var letterDiv = document.createElement('div');
    // console.log(idxArray);
    // console.log(localIdxArray);

    if (game.puzzle.grid[index].status === 'locked') {
      // alert('Sorry, that square is locked by a previous answer');
      return;
    }
    letterDiv.appendChild(document.createTextNode(''));
    letterDiv.classList.add('marginAuto');
    currentCell.children[0].replaceChild(
    letterDiv,
    currentCell.children[0].children[0]);

    currentCell.classList.remove('currCellHighlight');
    currentCell.classList.add('rangeHighlight');var _iterator3 = _createForOfIteratorHelper(
    localIdxArray),_step3;try {for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {var idx = _step3.value;
        if (game.puzzle.grid[idx].status !== 'locked') {
          row = Math.floor(idx / columns);
          col = idx - row * columns;
          currentCell = puzTable.children[0].children[row].children[col];
          currentCell.classList.remove('rangeHighlight');
          currentCell.classList.add('currCellHighlight');
          break;
        }
      }} catch (err) {_iterator3.e(err);} finally {_iterator3.f();}
  }
}

/**
 * Calculates width/height dimension of single cell in px
 * @return {number} dimension
 */
function getCellDim() {
  console.log('Hello from getCellDim.');
  var puzTableWidth = puzTable.offsetWidth;
  return Math.floor(puzTableWidth / (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)());
}

/** Clears letters when user changes to a different clue */
function clearLetters() {
  console.log('Hello from clearLetters.');
  var idxArray = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getIdxArrayController)();
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();var _iterator4 = _createForOfIteratorHelper(
  idxArray),_step4;try {for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {var index = _step4.value;
      if (game.puzzle.grid[index].status === 'locked') continue;
      game.puzzle.grid[index].guess = '';
      var row = Math.floor(index / columns);
      var col = index - row * columns;
      puzTable.firstChild.children[row].children[
      col].
      firstChild.firstChild.innerText = '';
    }} catch (err) {_iterator4.e(err);} finally {_iterator4.f();}
}

/**
 * Highlights an across clue and location in puzzle based on which cell
 * the user clicks
 * @param {Object} cell Cell the user clicked
 */
function selectAcross(cell) {
  console.log('Hello from selectAcross.');
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var row = cell.parentElement.rowIndex;
  var col = cell.cellIndex;
  var rowOffset = row * columns;
  var index = row * columns + col;

  clearHighlights();
  var idxArray = getWordBlock(cell, 'across');
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.setIdxArrayController)(idxArray);
  var currentClue = game.puzzle.grid[idxArray[0]].clueNum;var _iterator5 = _createForOfIteratorHelper(
  acrossClues.children),_step5;try {for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {var clue = _step5.value;
      var clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('rangeHighlight', 'cluePop');
        acrossClues.scrollBy({
          top: clue.offsetTop - 100 - acrossClues.scrollTop,
          left: 0,
          behavior: 'smooth' });

        singleClue.innerText = clue.children[1].textContent;
        break;
      }
    }} catch (err) {_iterator5.e(err);} finally {_iterator5.f();}
  var currentCol = index - rowOffset;
  var currentCell = cell.parentElement.children[currentCol];
  cell.parentElement.children[idxArray[0] - rowOffset].classList.add(
  'border2pxLeft');var _iterator6 = _createForOfIteratorHelper(

  idxArray),_step6;try {for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {var idx = _step6.value;
      currentCol = idx - rowOffset;
      currentCell = cell.parentElement.children[currentCol];
      currentCell.classList.add('border2pxTop', 'border2pxBottom');
      currentCell.classList.add(
      currentCol === col ? 'currCellHighlight' : 'rangeHighlight');

    }} catch (err) {_iterator6.e(err);} finally {_iterator6.f();}
  cell.parentElement.children[
  idxArray[idxArray.length - 1] - rowOffset].
  classList.add('border2pxRight');
}

/**
 * Highlights a down clue and location in puzzle based on which cell
 * the user clicks
 * @param {Object} cell Cell the user clicked
 */
function selectDown(cell) {
  console.log('Hello from selectDown.');
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var row = cell.parentElement.rowIndex;
  var col = cell.cellIndex;
  var index = row * columns + col;

  clearHighlights();
  var idxArray = getWordBlock(cell, 'down');
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.setIdxArrayController)(idxArray);
  // get the number of the clue number
  var currentClue = game.puzzle.grid[idxArray[0]].clueNum;var _iterator7 = _createForOfIteratorHelper(
  downClues.children),_step7;try {for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {var clue = _step7.value;
      var clueNumStr = clue.children[0].textContent.split('.')[0];
      if (clueNumStr === currentClue.toString()) {
        clue.classList.add('rangeHighlight', 'cluePop');
        downClues.scrollBy({
          top: clue.offsetTop - 100 - downClues.scrollTop,
          left: 0,
          behavior: 'smooth' });

        singleClue.innerText = clue.children[1].textContent;
      }
    }} catch (err) {_iterator7.e(err);} finally {_iterator7.f();}
  var currentRow = Math.floor(index / columns);
  var currentCell = puzTable.children[0].children[currentRow].children[col];
  puzTable.children[0].children[Math.floor(idxArray[0] / columns)].children[
  col].
  classList.add('border2pxTop');var _iterator8 = _createForOfIteratorHelper(
  idxArray),_step8;try {for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {var idx = _step8.value;
      currentRow = Math.floor(idx / columns);
      currentCell = puzTable.children[0].children[currentRow].children[col];
      currentCell.classList.add('border2pxLeft', 'border2pxRight');
      currentCell.classList.add(
      currentRow === row ? 'currCellHighlight' : 'rangeHighlight');

    }} catch (err) {_iterator8.e(err);} finally {_iterator8.f();}
  puzTable.children[0].children[
  Math.floor(idxArray[idxArray.length - 1] / columns)].
  children[col].classList.add('border2pxBottom');
}

/**
 * Returns an array of indices of cells that make up a word block in
 * the current puzzle.
 * @param {Object} cell Cell in puzzle
 * @param {string} direction Direction (across or down)
 * @return {array} Array of indices that make up a word block
 */
function getWordBlock(cell, direction) {
  console.log('Hello from getWordBlock.');
  var row = cell.parentElement.rowIndex;
  var col = cell.cellIndex;
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var index = row * columns + col;
  var indexArray = [];
  if (direction === 'across') {
    while (index > row * columns && !game.puzzle.grid[index - 1].black) {
      index--;
    }
    while (index < (row + 1) * columns && !game.puzzle.grid[index].black) {
      indexArray.push(index);
      index++;
    }
  } else {
    while (index >= columns && !game.puzzle.grid[index - columns].black) {
      index -= columns;
    }
    while (
    index < game.puzzle.rows * columns &&
    !game.puzzle.grid[index].black)
    {
      indexArray.push(index);
      index += columns;
    }
  }
  return indexArray;
}

/** Removes clue cell highlighting from all cells */
function clearHighlights() {
  console.log('Hello from clearHighlights.');
  // console.log(puzTable.children[0]);
  var rowArray = puzTable.children[0].children;var _iterator9 = _createForOfIteratorHelper(

  rowArray),_step9;try {for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {var row = _step9.value;var _iterator12 = _createForOfIteratorHelper(
      row.children),_step12;try {for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {var cell = _step12.value;
          if (cell.className !== 'black') {
            cell.classList.remove(
            'rangeHighlight',
            'currCellHighlight',
            'border2pxBottom',
            'border2pxRight',
            'border2pxLeft',
            'border2pxTop');

          }
        }} catch (err) {_iterator12.e(err);} finally {_iterator12.f();}
    }} catch (err) {_iterator9.e(err);} finally {_iterator9.f();}var _iterator10 = _createForOfIteratorHelper(
  acrossClues.children),_step10;try {for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {var clue = _step10.value;
      clue.classList.remove('rangeHighlight', 'cluePop');
    }} catch (err) {_iterator10.e(err);} finally {_iterator10.f();}var _iterator11 = _createForOfIteratorHelper(
  downClues.children),_step11;try {for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {var _clue2 = _step11.value;
      _clue2.classList.remove('rangeHighlight', 'cluePop');
    }} catch (err) {_iterator11.e(err);} finally {_iterator11.f();}
}

/**
 * Show dialog for user to decide if they want to replay the opponent
 * @param {Object} game Previous game versus the opponent
 * @param {string} result Message about who won
 */
function showReplayDialog(game, result) {
  console.log('Hello from showReplayDialog.');
  winMessage.innerText = result;
  gameOverHeading.classList.remove('displayNone');
  winMessage.classList.remove('displayNone');
  opponentHeading.classList.add('displayNone');
  opponentList.classList.add('displayNone');
  gamesDialog.classList.remove('height80pct');
  gamesDialog.children[0].classList.remove('padding0', 'height100pct');
  replayButton.classList.remove('displayNone');
  replayButton.addEventListener('click', replayOpponent);
  // let replayButton = document.getElementById('replayButton');
  // if (!replayButton) {
  //   replayButton = document.createElement('button');
  //   replayButton.setAttribute('id', 'replayButton');
  //   replayButton.classList.add(
  //     'mdl-button',
  //     'mdl-js-button',
  //     'mdl-button--raised',
  //     'mdl-js-ripple-effect',
  //     'mdl-button--accent',
  //     'cursorPointer'
  //   );
  //   replayButton.innerText = 'Play Again!';
  //   gamesDialog.children[0].appendChild(replayButton);
  //   replayButton.addEventListener('click', replayOpponent);
  // }
  if (game.difficulty === 'medium') {
    radioEasy.removeAttribute('checked');
    radioHard.removeAttribute('checked');
    radioMed.setAttribute('checked', true);
  } else if (game.difficulty === 'hard') {
    radioEasy.removeAttribute('checked');
    radioMed.removeAttribute('checked');
    radioHard.setAttribute('checked', true);
  } else {
    radioMed.removeAttribute('checked');
    radioHard.removeAttribute('checked');
    radioEasy.setAttribute('checked', true);
  }
  if (!gamesDialog.open) gamesDialog.showModal();
}

/** Load game based on user selection */
function replayOpponent() {
  var currentUser = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUserController)();
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var difficulty = radioMed.parentElement.classList.contains('is-checked') ?
  'medium' :
  'easy';
  difficulty = radioHard.parentElement.classList.contains('is-checked') ?
  'hard' :
  difficulty;
  var they =
  currentUser.uid === game.initiator.uid ? 'opponent' : 'initiator';
  // Emit startNewGame event from eventBus
  closeGamesDialog();

  // load puzzle based on uids of players
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.startNewGameController)({
    initiator: {
      uid: currentUser.uid,
      displayName: currentUser.displayName },

    opponent: {
      uid: game[they].uid,
      displayName: game[they].displayName },

    difficulty: difficulty });

}

/**
 * Adds a letter to the puzzle from physical or virtual keyboard event and
 * moves forward one space
 * @param {Event} event Keyboard or touch event from physical or virtual
 * keyboard
 */
function enterLetter(event) {
  console.log('Hello from enterLetter.');
  var idxArray = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getIdxArrayController)();
  var game = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentGameController)();
  var columns = (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  if (!keyboard.classList.contains('displayNone')) {
    if (event.keyCode === 13) {
      (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.playWordController)();
      return;
    }
    var letter;
    if (event.key) {
      letter = event.key;
    } else {
      var node = event.target;
      while (!node.classList.contains('kbButton')) {
        node = node.parentNode;
      }
      letter = node.children[0].firstChild.data.trim();
    }
    if (letter && letter.toLowerCase() === 'backspace') {
      undoEntry();
      return;
    }
    if (!letter || !letter.match(/^[a-zA-Z]$/)) return;
    if (currentCell) {
      var row = currentCell.parentElement.rowIndex;
      var col = currentCell.cellIndex;
      var index = row * columns + col;
      var nextCellIndex = idxArray.indexOf(index) + 1;
      var localIdxArray = idxArray.
      slice(nextCellIndex).
      concat(idxArray.slice(0, nextCellIndex));
      var letterDiv = document.createElement('div');
      // console.log(idxArray);
      // console.log(localIdxArray);

      if (game.puzzle.grid[index].status === 'locked') {
        // alert('Sorry, that square is locked by a previous answer');
        return;
      }
      (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.enterLetterController)(letter.toUpperCase(), index);
      letterDiv.appendChild(document.createTextNode(letter.toUpperCase()));
      letterDiv.classList.add('marginAuto');
      currentCell.children[0].replaceChild(
      letterDiv,
      currentCell.children[0].children[0]);

      currentCell.classList.remove('currCellHighlight');
      currentCell.classList.add('rangeHighlight');var _iterator13 = _createForOfIteratorHelper(
      localIdxArray),_step13;try {for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {var idx = _step13.value;
          if (game.puzzle.grid[idx].status !== 'locked') {
            row = Math.floor(idx / columns);
            col = idx - row * columns;
            currentCell = puzTable.children[0].children[row].children[col];
            currentCell.classList.remove('rangeHighlight');
            currentCell.classList.add('currCellHighlight');
            break;
          }
        }} catch (err) {_iterator13.e(err);} finally {_iterator13.f();}
    }
  }
}

/**
 * Abandon the game immediately, adding all remaining
 * points to opponent's score
 */
concessionBtn.addEventListener('click', function () {
  toggleDrawer();
  concessionBtnContainer.classList.add('displayNone');
  (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.abandonCurrentGameController)();
});

/** Resizes puzzle based on available space */
function resizePuzzle() {
  if (puzTable.children.length === 0) return;
  // console.log(puzTable.children[0]);
  var cellDim = getCellDim();
  var tableDim = cellDim * (0,_controller_js__WEBPACK_IMPORTED_MODULE_0__.getColumnsController)();
  var rowArray = puzTable.children[0].children;var _iterator14 = _createForOfIteratorHelper(

  rowArray),_step14;try {for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {var row = _step14.value;
      row.style.width = tableDim + 'px';
      var cellArray = row.children;var _iterator15 = _createForOfIteratorHelper(
      cellArray),_step15;try {for (_iterator15.s(); !(_step15 = _iterator15.n()).done;) {var cell = _step15.value;
          cell.style.width = cellDim + 'px';
          cell.style.height = cellDim + 'px';
        }} catch (err) {_iterator15.e(err);} finally {_iterator15.f();}
    }} catch (err) {_iterator14.e(err);} finally {_iterator14.f();}
  if (currentCell) {
    if (acrossWord) {
      selectAcross(currentCell);
    } else {
      selectDown(currentCell);
    }
  }
}

document.addEventListener('keyup', enterLetter);
window.addEventListener('resize', resizePuzzle);
var keyList = keyboard.getElementsByClassName('kbButton');var _iterator16 = _createForOfIteratorHelper(
keyList),_step16;try {for (_iterator16.s(); !(_step16 = _iterator16.n()).done;) {var node = _step16.value;
    node.addEventListener('click', enterLetter);
  }} catch (err) {_iterator16.e(err);} finally {_iterator16.f();}
document.getElementById('enter').addEventListener('click', _controller_js__WEBPACK_IMPORTED_MODULE_0__.playWordController);
document.getElementById('closeDrawer').addEventListener('click', toggleDrawer);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* COMMON */\r\n\r\nhtml {\r\n  box-sizing: border-box;\r\n}\r\n\r\n*,\r\n*:before,\r\n*:after {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font-family: 'Roboto', 'Helvetica', 'Arial', Sans-Serif;\r\n  background-color: #f6f6f6;\r\n  font-size: 16px;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n}\r\n\r\nselect {\r\n  font-size: 20px;\r\n  margin: 0 10px;\r\n}\r\n\r\n.displayBlock {\r\n  display: block;\r\n}\r\n\r\n.alignItemsCenter {\r\n  align-items: center;\r\n}\r\n\r\n.alignSelfEnd {\r\n  align-self: flex-end;\r\n}\r\n\r\n.alignSelfCenter {\r\n  align-self: center;\r\n}\r\n\r\n.cursorPointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.drawerHeader {\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  flex-direction: column;\r\n  padding: 8px;\r\n}\r\n\r\n.picContainer {\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 100px;\r\n  height: 100px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  align-self: center;\r\n}\r\n\r\n.photoCrop {\r\n  height: 100%;\r\n  margin: auto;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n}\r\n\r\n.displayNone {\r\n  display: none;\r\n}\r\n\r\n/* Increased specificity required for precedence */\r\n#returnToSignin.displayNone {\r\n  display: none;\r\n}\r\n\r\n/* Increased specificity required for precedence */\r\n#replayButton.displayNone {\r\n  display: none;\r\n}\r\n\r\n.currCellHighlight {\r\n  background-color: yellow;\r\n}\r\n\r\n.rangeHighlight {\r\n  background-color: gold;\r\n}\r\n\r\n.mdl-list__item:hover {\r\n  background-color: #b8b8b8;\r\n}\r\n\r\n/* END COMMON */\r\n\r\n/* CLUES */\r\n\r\n.heading {\r\n  font-weight: bold;\r\n  padding: 0 0 10px;\r\n}\r\n\r\n.textAlignCenter {\r\n  text-align: center;\r\n}\r\n\r\n.marginAutoTopBot {\r\n  margin-top: auto;\r\n  margin-bottom: auto;\r\n}\r\n\r\n.margin2px10px {\r\n  margin: 2px 10px;\r\n}\r\n\r\n.margin0px5px {\r\n  margin: 0 5px;\r\n}\r\n\r\n.copy {\r\n  font-size: small;\r\n  color: lightgray;\r\n  font-style: italic;\r\n  padding: 2px 10px;\r\n}\r\n\r\n.author {\r\n  padding: 2px 10px;\r\n}\r\n\r\n.colorWhite {\r\n  color: white;\r\n}\r\n\r\n.colorLightGray {\r\n  color: lightGray;\r\n}\r\n\r\n.padRight {\r\n  padding-right: 5px;\r\n}\r\n\r\n.displayFlex {\r\n  display: flex;\r\n}\r\n\r\n.columnCount-2 {\r\n  position: relative;\r\n  height: calc(100% - 31.6px);\r\n  column-count: 2;\r\n  column-gap: 1em;\r\n  column-fill: auto;\r\n}\r\n\r\n.padding-5 {\r\n  padding: 5px;\r\n}\r\n\r\n.padding10px {\r\n  padding: 10px;\r\n}\r\n\r\n.noPadding {\r\n  padding: 0;\r\n}\r\n\r\n.webkitMargin0 {\r\n  -webkit-margin-before: 0;\r\n  -webkit-margin-after: 0;\r\n}\r\n\r\n/* END CLUES */\r\n\r\n.links {\r\n  margin-bottom: 20px;\r\n  font-size: 12px;\r\n}\r\n\r\n/*#gridContainer {\r\n  height: calc(100vh - 10px);\r\n  align-self: stretch;\r\n  flex-grow: 10;\r\n}*/\r\n\r\n/*#clueContainer {\r\n  align-self: stretch;\r\n}*/\r\n\r\n#puzNotepad {\r\n  background-color: #ffffe0;\r\n  padding: 4px;\r\n  border: 1px solid #808080;\r\n  margin: 10px;\r\n}\r\n\r\n#puzTable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0px;\r\n  background-color: white;\r\n}\r\n\r\n#puzTable td {\r\n  position: relative;\r\n  border: 1px solid #000000;\r\n}\r\n\r\n#puzTable .black {\r\n  background-color: black;\r\n}\r\n\r\n#kbContainer {\r\n  bottom: 100%;\r\n  height: 15vh;\r\n}\r\n\r\n#splash {\r\n  position: fixed;\r\n  width: 100%;\r\n  height: 100%;\r\n  align-content: center;\r\n  background-color: lightgray;\r\n  z-index: 1;\r\n}\r\n\r\n#splashImage {\r\n  width: 20%;\r\n  margin: auto;\r\n}\r\n\r\n.circle {\r\n  border: 1px solid black;\r\n  border-radius: 50%;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n#puzTable .shade {\r\n  background-color: lightgray;\r\n}\r\n\r\n.clueNumber {\r\n  position: absolute;\r\n  top: 1px;\r\n  left: 1px;\r\n  font-size: 2vw;\r\n  font-weight: bold;\r\n  pointer-events: none;\r\n  background-color: transparent;\r\n  line-height: 9px;\r\n}\r\n\r\n.fontWeightBold {\r\n  font-weight: bold;\r\n}\r\n\r\n.square {\r\n  display: flex;\r\n  vertical-align: baseline;\r\n  font-weight: bold;\r\n  pointer-events: none;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.border2pxTop {\r\n  border-top: 2px solid gold !important;\r\n}\r\n\r\n.border2pxBottom {\r\n  border-bottom: 2px solid gold !important;\r\n}\r\n\r\n.border2pxLeft {\r\n  border-left: 2px solid gold !important;\r\n}\r\n\r\n.border2pxRight {\r\n  border-right: 2px solid gold !important;\r\n}\r\n\r\n.bgTransRed {\r\n  background-color: rgba(255, 0, 0, 0.5);\r\n}\r\n\r\n.bgTransBlue {\r\n  background-color: rgba(0, 0, 255, 0.5);\r\n}\r\n\r\n.fontTransRed {\r\n  color: rgba(255, 0, 0, 1);\r\n}\r\n\r\n.fontTransBlue {\r\n  color: rgba(0, 0, 255, 1);\r\n}\r\n\r\n.bgTransGray {\r\n  background-color: rgba(100, 100, 100, 0.5);\r\n}\r\n\r\n.whiteSpaceNowrap {\r\n  white-space: nowrap;\r\n}\r\n\r\n.flexDirCol {\r\n  flex-direction: column;\r\n}\r\n\r\n.flexColumnWrap {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.flexWrap {\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.flexCenter {\r\n  justify-content: center;\r\n}\r\n\r\n.spaceEvenly {\r\n  justify-content: space-evenly;\r\n}\r\n\r\n.spaceAround {\r\n  justify-content: space-around;\r\n}\r\n\r\n.spaceBetween {\r\n  justify-content: space-between;\r\n}\r\n\r\n.flexGrow-1 {\r\n  flex-grow: 1;\r\n}\r\n\r\n.flexGrow-2 {\r\n  flex-grow: 2;\r\n}\r\n\r\n.flexGrow-4 {\r\n  flex-grow: 4;\r\n}\r\n\r\n.bgColorWhite {\r\n  background-color: white;\r\n}\r\n\r\n.bgColorTransWhite {\r\n  background-color: #ffffff55;\r\n}\r\n\r\n.bgColorTransGold {\r\n  background-color: #ffd700dd;\r\n}\r\n\r\n.kbButton {\r\n  margin: 0.5%;\r\n  display: flex;\r\n  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.14), 0 6px 2px -4px rgba(0, 0, 0, 0.2),\r\n    0 2px 10px 0 rgba(0, 0, 0, 0.12);\r\n  border-radius: 5px;\r\n  box-sizing: border-box;\r\n  transition-duration: 0.2s;\r\n  transition-property: box-shadow;\r\n  /*transition-timing-function: cubic-bezier(0.4, 0, 1, 1);*/\r\n  will-change: box-shadow;\r\n  cursor: pointer;\r\n}\r\n\r\n.kbButton:active {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),\r\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.subscript {\r\n  vertical-align: baseline;\r\n  position: relative;\r\n  top: 0.6em;\r\n  font-size: 50%;\r\n}\r\n\r\n#backspace {\r\n  background-color: rgba(255, 64, 129, 0.6);\r\n}\r\n\r\n#enter {\r\n  background-color: rgba(63, 81, 181, 0.6);\r\n}\r\n\r\n.marginAuto {\r\n  margin: auto;\r\n}\r\n\r\n.margin10px {\r\n  margin: 10px;\r\n}\r\n\r\n.width5pct {\r\n  width: 5%;\r\n}\r\n\r\n.width9pct {\r\n  width: 9%;\r\n}\r\n\r\n.width20pct {\r\n  width: 20%;\r\n}\r\n\r\n.width33pct {\r\n  width: 33.3%;\r\n}\r\n\r\n.width40pct {\r\n  width: 40%;\r\n}\r\n\r\n.width50pct {\r\n  width: 50%;\r\n}\r\n\r\n.width60pct {\r\n  width: 60%;\r\n}\r\n\r\n.width60px {\r\n  width: 60px;\r\n}\r\n\r\n.maxWidth400px {\r\n  max-width: 400px;\r\n}\r\n\r\n.fullWidth {\r\n  width: 100%;\r\n}\r\n\r\n.height25vh {\r\n  height: 25vh;\r\n}\r\n\r\n.height40px {\r\n  height: 40px;\r\n}\r\n\r\n.height24px {\r\n  height: 24px;\r\n}\r\n\r\n.height80pct {\r\n  height: 80%;\r\n}\r\n\r\n.height100pct {\r\n  height: 100%;\r\n}\r\n\r\n.minHt36px {\r\n  min-height: 36px;\r\n}\r\n\r\n.spacer20px {\r\n  width: 20px;\r\n}\r\n\r\n.overflowHidden {\r\n  overflow: hidden;\r\n}\r\n\r\n.overflowYScroll {\r\n  overflow-y: scroll;\r\n}\r\n\r\n.noOutline {\r\n  outline: none;\r\n}\r\n\r\n#gamesPanel {\r\n  padding: 10px;\r\n  transform: translate(0, 0);\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n#gamesPanel.slideOut {\r\n  transform: translate(-100%, 0);\r\n}\r\n\r\n#appContainer {\r\n  transform: translate(100%, 0);\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n#appContainer.slideIn {\r\n  transform: translate(0, 0);\r\n}\r\n\r\n.posAbsolute {\r\n  position: absolute;\r\n}\r\n\r\n.puzzleWidth {\r\n  width: calc(100% - 10px);\r\n}\r\n\r\n.colorSalmon {\r\n  background-color: Salmon;\r\n}\r\n\r\n.colorLightSkyBlue {\r\n  background-color: LightSkyBlue;\r\n}\r\n\r\n.margin5pxAuto {\r\n  margin: 5px auto;\r\n}\r\n\r\n.fontSizeSmall {\r\n  font-size: small;\r\n}\r\n\r\n.fontSizeLarge {\r\n  font-size: large;\r\n}\r\n\r\n.fontSizeXLarge {\r\n  font-size: x-large;\r\n}\r\n\r\n.cluePop {\r\n  font-size: larger;\r\n  padding: 5px 0;\r\n}\r\n\r\n#clueCard {\r\n  background-color: white;\r\n  padding: 5px;\r\n  margin: 0 5px 2px;\r\n}\r\n\r\n.cardShadow {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),\r\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.padding2px5px {\r\n  padding: 2px 5px;\r\n}\r\n\r\n.padding0px5px {\r\n  padding: 0 5px;\r\n}\r\n\r\n.padding0 {\r\n  padding: 0 !important;\r\n}\r\n\r\n.alignRight {\r\n  text-align: right;\r\n}\r\n\r\n.closeDialogPosition {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n}\r\n\r\n.buttonIsolation {\r\n  margin: 10px auto 10px auto;\r\n  width: 80%;\r\n  text-align: center;\r\n}\r\n\r\n.clickInheritParent {\r\n  pointer-events: inherit;\r\n}\r\n\r\n@media screen and (min-width: 420px) {\r\n  #gamesPanelContainer {\r\n    max-width: 400px;\r\n    margin-left: calc((100vw - 400px) / 2);\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 18/25) {\r\n  body {\r\n    font-size: 2.5vh;\r\n  }\r\n\r\n  .clueNumber {\r\n    font-size: 1.4vh;\r\n  }\r\n\r\n  #puzTable {\r\n    width: 70vh;\r\n  }\r\n\r\n  #clueContainer {\r\n    width: 70vh;\r\n    margin: auto;\r\n  }\r\n\r\n  #kbContainer {\r\n    width: 70vh;\r\n    margin: auto;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 4/3) {\r\n  .clueNumber {\r\n    font-size: 0.8vw;\r\n  }\r\n\r\n  #puzTable {\r\n    width: 45vw;\r\n  }\r\n\r\n  #clueContainer {\r\n    display: flex;\r\n    height: 45vw;\r\n    width: 50vw;\r\n  }\r\n\r\n  #acrossContainer,\r\n  #downContainer {\r\n    width: 50%;\r\n    display: block;\r\n  }\r\n\r\n  #acrossClues,\r\n  #downClues {\r\n    height: calc(100% - 30px);\r\n  }\r\n\r\n  #clueCard {\r\n    display: none;\r\n  }\r\n\r\n  #kbContainer {\r\n    height: 20vh;\r\n  }\r\n\r\n  #title {\r\n    display: block;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 14/9) {\r\n  #clueContainer {\r\n    height: 70%;\r\n    display: flex;\r\n    width: 50vw;\r\n  }\r\n\r\n  #kbContainer {\r\n    height: 25%;\r\n    width: 50vw;\r\n  }\r\n\r\n  #appContainer {\r\n    flex-direction: column;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 2/1) {\r\n  #puzTable {\r\n    width: 35vw;\r\n  }\r\n\r\n  #clueContainer {\r\n    width: 60vw;\r\n  }\r\n\r\n  #kbContainer {\r\n    width: 60vw;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA,WAAW;;AAEX;EACE,sBAAsB;AACxB;;AAEA;;;EAGE,mBAAmB;AACrB;;AAEA;EACE,uDAAuD;EACvD,yBAAyB;EACzB,eAAe;EACf,sBAAsB;EACtB,SAAS;AACX;;AAEA;EACE,eAAe;EACf,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,oBAAoB;AACtB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,kBAAkB;EAClB,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;EACE,YAAY;EACZ,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA,kDAAkD;AAClD;EACE,aAAa;AACf;;AAEA,kDAAkD;AAClD;EACE,aAAa;AACf;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,eAAe;;AAEf,UAAU;;AAEV;EACE,iBAAiB;EACjB,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,kBAAkB;EAClB,2BAA2B;EAC3B,eAAe;EACf,eAAe;EACf,iBAAiB;AACnB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,wBAAwB;EACxB,uBAAuB;AACzB;;AAEA,cAAc;;AAEd;EACE,mBAAmB;EACnB,eAAe;AACjB;;AAEA;;;;EAIE;;AAEF;;EAEE;;AAEF;EACE,yBAAyB;EACzB,YAAY;EACZ,yBAAyB;EACzB,YAAY;AACd;;AAEA;EACE,yBAAyB;EACzB,mBAAmB;EACnB,uBAAuB;AACzB;;AAEA;EACE,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,eAAe;EACf,WAAW;EACX,YAAY;EACZ,qBAAqB;EACrB,2BAA2B;EAC3B,UAAU;AACZ;;AAEA;EACE,UAAU;EACV,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,kBAAkB;EAClB,WAAW;EACX,YAAY;AACd;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,kBAAkB;EAClB,QAAQ;EACR,SAAS;EACT,cAAc;EACd,iBAAiB;EACjB,oBAAoB;EACpB,6BAA6B;EAC7B,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,aAAa;EACb,wBAAwB;EACxB,iBAAiB;EACjB,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,qCAAqC;AACvC;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,uCAAuC;AACzC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,0CAA0C;AAC5C;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,sBAAsB;AACxB;;AAEA;EACE,aAAa;EACb,sBAAsB;EACtB,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,YAAY;EACZ,aAAa;EACb;oCACkC;EAClC,kBAAkB;EAClB,sBAAsB;EACtB,yBAAyB;EACzB,+BAA+B;EAC/B,0DAA0D;EAC1D,uBAAuB;EACvB,eAAe;AACjB;;AAEA;EACE;mCACiC;AACnC;;AAEA;EACE,wBAAwB;EACxB,kBAAkB;EAClB,UAAU;EACV,cAAc;AAChB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,SAAS;AACX;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,aAAa;EACb,0BAA0B;EAC1B,+BAA+B;AACjC;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,6BAA6B;EAC7B,+BAA+B;AACjC;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,wBAAwB;AAC1B;;AAEA;EACE,8BAA8B;AAChC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,uBAAuB;EACvB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE;mCACiC;AACnC;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,WAAW;AACb;;AAEA;EACE,2BAA2B;EAC3B,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,uBAAuB;AACzB;;AAEA;EACE;IACE,gBAAgB;IAChB,sCAAsC;EACxC;AACF;;AAEA;EACE;IACE,gBAAgB;EAClB;;EAEA;IACE,gBAAgB;EAClB;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,WAAW;IACX,YAAY;EACd;;EAEA;IACE,WAAW;IACX,YAAY;EACd;AACF;;AAEA;EACE;IACE,gBAAgB;EAClB;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,aAAa;IACb,YAAY;IACZ,WAAW;EACb;;EAEA;;IAEE,UAAU;IACV,cAAc;EAChB;;EAEA;;IAEE,yBAAyB;EAC3B;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,YAAY;EACd;;EAEA;IACE,cAAc;EAChB;AACF;;AAEA;EACE;IACE,WAAW;IACX,aAAa;IACb,WAAW;EACb;;EAEA;IACE,WAAW;IACX,WAAW;EACb;;EAEA;IACE,sBAAsB;EACxB;AACF;;AAEA;EACE;IACE,WAAW;EACb;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,WAAW;EACb;AACF","sourcesContent":["/* COMMON */\r\n\r\nhtml {\r\n  box-sizing: border-box;\r\n}\r\n\r\n*,\r\n*:before,\r\n*:after {\r\n  box-sizing: inherit;\r\n}\r\n\r\nbody {\r\n  font-family: 'Roboto', 'Helvetica', 'Arial', Sans-Serif;\r\n  background-color: #f6f6f6;\r\n  font-size: 16px;\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n}\r\n\r\nselect {\r\n  font-size: 20px;\r\n  margin: 0 10px;\r\n}\r\n\r\n.displayBlock {\r\n  display: block;\r\n}\r\n\r\n.alignItemsCenter {\r\n  align-items: center;\r\n}\r\n\r\n.alignSelfEnd {\r\n  align-self: flex-end;\r\n}\r\n\r\n.alignSelfCenter {\r\n  align-self: center;\r\n}\r\n\r\n.cursorPointer {\r\n  cursor: pointer;\r\n}\r\n\r\n.drawerHeader {\r\n  display: flex;\r\n  box-sizing: border-box;\r\n  flex-direction: column;\r\n  padding: 8px;\r\n}\r\n\r\n.picContainer {\r\n  display: flex;\r\n  justify-content: center;\r\n  width: 100px;\r\n  height: 100px;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n  align-self: center;\r\n}\r\n\r\n.photoCrop {\r\n  height: 100%;\r\n  margin: auto;\r\n  border-radius: 50%;\r\n  overflow: hidden;\r\n}\r\n\r\n.displayNone {\r\n  display: none;\r\n}\r\n\r\n/* Increased specificity required for precedence */\r\n#returnToSignin.displayNone {\r\n  display: none;\r\n}\r\n\r\n/* Increased specificity required for precedence */\r\n#replayButton.displayNone {\r\n  display: none;\r\n}\r\n\r\n.currCellHighlight {\r\n  background-color: yellow;\r\n}\r\n\r\n.rangeHighlight {\r\n  background-color: gold;\r\n}\r\n\r\n.mdl-list__item:hover {\r\n  background-color: #b8b8b8;\r\n}\r\n\r\n/* END COMMON */\r\n\r\n/* CLUES */\r\n\r\n.heading {\r\n  font-weight: bold;\r\n  padding: 0 0 10px;\r\n}\r\n\r\n.textAlignCenter {\r\n  text-align: center;\r\n}\r\n\r\n.marginAutoTopBot {\r\n  margin-top: auto;\r\n  margin-bottom: auto;\r\n}\r\n\r\n.margin2px10px {\r\n  margin: 2px 10px;\r\n}\r\n\r\n.margin0px5px {\r\n  margin: 0 5px;\r\n}\r\n\r\n.copy {\r\n  font-size: small;\r\n  color: lightgray;\r\n  font-style: italic;\r\n  padding: 2px 10px;\r\n}\r\n\r\n.author {\r\n  padding: 2px 10px;\r\n}\r\n\r\n.colorWhite {\r\n  color: white;\r\n}\r\n\r\n.colorLightGray {\r\n  color: lightGray;\r\n}\r\n\r\n.padRight {\r\n  padding-right: 5px;\r\n}\r\n\r\n.displayFlex {\r\n  display: flex;\r\n}\r\n\r\n.columnCount-2 {\r\n  position: relative;\r\n  height: calc(100% - 31.6px);\r\n  column-count: 2;\r\n  column-gap: 1em;\r\n  column-fill: auto;\r\n}\r\n\r\n.padding-5 {\r\n  padding: 5px;\r\n}\r\n\r\n.padding10px {\r\n  padding: 10px;\r\n}\r\n\r\n.noPadding {\r\n  padding: 0;\r\n}\r\n\r\n.webkitMargin0 {\r\n  -webkit-margin-before: 0;\r\n  -webkit-margin-after: 0;\r\n}\r\n\r\n/* END CLUES */\r\n\r\n.links {\r\n  margin-bottom: 20px;\r\n  font-size: 12px;\r\n}\r\n\r\n/*#gridContainer {\r\n  height: calc(100vh - 10px);\r\n  align-self: stretch;\r\n  flex-grow: 10;\r\n}*/\r\n\r\n/*#clueContainer {\r\n  align-self: stretch;\r\n}*/\r\n\r\n#puzNotepad {\r\n  background-color: #ffffe0;\r\n  padding: 4px;\r\n  border: 1px solid #808080;\r\n  margin: 10px;\r\n}\r\n\r\n#puzTable {\r\n  border-collapse: collapse;\r\n  border-spacing: 0px;\r\n  background-color: white;\r\n}\r\n\r\n#puzTable td {\r\n  position: relative;\r\n  border: 1px solid #000000;\r\n}\r\n\r\n#puzTable .black {\r\n  background-color: black;\r\n}\r\n\r\n#kbContainer {\r\n  bottom: 100%;\r\n  height: 15vh;\r\n}\r\n\r\n#splash {\r\n  position: fixed;\r\n  width: 100%;\r\n  height: 100%;\r\n  align-content: center;\r\n  background-color: lightgray;\r\n  z-index: 1;\r\n}\r\n\r\n#splashImage {\r\n  width: 20%;\r\n  margin: auto;\r\n}\r\n\r\n.circle {\r\n  border: 1px solid black;\r\n  border-radius: 50%;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n#puzTable .shade {\r\n  background-color: lightgray;\r\n}\r\n\r\n.clueNumber {\r\n  position: absolute;\r\n  top: 1px;\r\n  left: 1px;\r\n  font-size: 2vw;\r\n  font-weight: bold;\r\n  pointer-events: none;\r\n  background-color: transparent;\r\n  line-height: 9px;\r\n}\r\n\r\n.fontWeightBold {\r\n  font-weight: bold;\r\n}\r\n\r\n.square {\r\n  display: flex;\r\n  vertical-align: baseline;\r\n  font-weight: bold;\r\n  pointer-events: none;\r\n  box-sizing: border-box;\r\n}\r\n\r\n.border2pxTop {\r\n  border-top: 2px solid gold !important;\r\n}\r\n\r\n.border2pxBottom {\r\n  border-bottom: 2px solid gold !important;\r\n}\r\n\r\n.border2pxLeft {\r\n  border-left: 2px solid gold !important;\r\n}\r\n\r\n.border2pxRight {\r\n  border-right: 2px solid gold !important;\r\n}\r\n\r\n.bgTransRed {\r\n  background-color: rgba(255, 0, 0, 0.5);\r\n}\r\n\r\n.bgTransBlue {\r\n  background-color: rgba(0, 0, 255, 0.5);\r\n}\r\n\r\n.fontTransRed {\r\n  color: rgba(255, 0, 0, 1);\r\n}\r\n\r\n.fontTransBlue {\r\n  color: rgba(0, 0, 255, 1);\r\n}\r\n\r\n.bgTransGray {\r\n  background-color: rgba(100, 100, 100, 0.5);\r\n}\r\n\r\n.whiteSpaceNowrap {\r\n  white-space: nowrap;\r\n}\r\n\r\n.flexDirCol {\r\n  flex-direction: column;\r\n}\r\n\r\n.flexColumnWrap {\r\n  display: flex;\r\n  flex-direction: column;\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.flexWrap {\r\n  flex-wrap: wrap;\r\n}\r\n\r\n.flexCenter {\r\n  justify-content: center;\r\n}\r\n\r\n.spaceEvenly {\r\n  justify-content: space-evenly;\r\n}\r\n\r\n.spaceAround {\r\n  justify-content: space-around;\r\n}\r\n\r\n.spaceBetween {\r\n  justify-content: space-between;\r\n}\r\n\r\n.flexGrow-1 {\r\n  flex-grow: 1;\r\n}\r\n\r\n.flexGrow-2 {\r\n  flex-grow: 2;\r\n}\r\n\r\n.flexGrow-4 {\r\n  flex-grow: 4;\r\n}\r\n\r\n.bgColorWhite {\r\n  background-color: white;\r\n}\r\n\r\n.bgColorTransWhite {\r\n  background-color: #ffffff55;\r\n}\r\n\r\n.bgColorTransGold {\r\n  background-color: #ffd700dd;\r\n}\r\n\r\n.kbButton {\r\n  margin: 0.5%;\r\n  display: flex;\r\n  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.14), 0 6px 2px -4px rgba(0, 0, 0, 0.2),\r\n    0 2px 10px 0 rgba(0, 0, 0, 0.12);\r\n  border-radius: 5px;\r\n  box-sizing: border-box;\r\n  transition-duration: 0.2s;\r\n  transition-property: box-shadow;\r\n  /*transition-timing-function: cubic-bezier(0.4, 0, 1, 1);*/\r\n  will-change: box-shadow;\r\n  cursor: pointer;\r\n}\r\n\r\n.kbButton:active {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),\r\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.subscript {\r\n  vertical-align: baseline;\r\n  position: relative;\r\n  top: 0.6em;\r\n  font-size: 50%;\r\n}\r\n\r\n#backspace {\r\n  background-color: rgba(255, 64, 129, 0.6);\r\n}\r\n\r\n#enter {\r\n  background-color: rgba(63, 81, 181, 0.6);\r\n}\r\n\r\n.marginAuto {\r\n  margin: auto;\r\n}\r\n\r\n.margin10px {\r\n  margin: 10px;\r\n}\r\n\r\n.width5pct {\r\n  width: 5%;\r\n}\r\n\r\n.width9pct {\r\n  width: 9%;\r\n}\r\n\r\n.width20pct {\r\n  width: 20%;\r\n}\r\n\r\n.width33pct {\r\n  width: 33.3%;\r\n}\r\n\r\n.width40pct {\r\n  width: 40%;\r\n}\r\n\r\n.width50pct {\r\n  width: 50%;\r\n}\r\n\r\n.width60pct {\r\n  width: 60%;\r\n}\r\n\r\n.width60px {\r\n  width: 60px;\r\n}\r\n\r\n.maxWidth400px {\r\n  max-width: 400px;\r\n}\r\n\r\n.fullWidth {\r\n  width: 100%;\r\n}\r\n\r\n.height25vh {\r\n  height: 25vh;\r\n}\r\n\r\n.height40px {\r\n  height: 40px;\r\n}\r\n\r\n.height24px {\r\n  height: 24px;\r\n}\r\n\r\n.height80pct {\r\n  height: 80%;\r\n}\r\n\r\n.height100pct {\r\n  height: 100%;\r\n}\r\n\r\n.minHt36px {\r\n  min-height: 36px;\r\n}\r\n\r\n.spacer20px {\r\n  width: 20px;\r\n}\r\n\r\n.overflowHidden {\r\n  overflow: hidden;\r\n}\r\n\r\n.overflowYScroll {\r\n  overflow-y: scroll;\r\n}\r\n\r\n.noOutline {\r\n  outline: none;\r\n}\r\n\r\n#gamesPanel {\r\n  padding: 10px;\r\n  transform: translate(0, 0);\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n#gamesPanel.slideOut {\r\n  transform: translate(-100%, 0);\r\n}\r\n\r\n#appContainer {\r\n  transform: translate(100%, 0);\r\n  transition: transform 0.3s ease;\r\n}\r\n\r\n#appContainer.slideIn {\r\n  transform: translate(0, 0);\r\n}\r\n\r\n.posAbsolute {\r\n  position: absolute;\r\n}\r\n\r\n.puzzleWidth {\r\n  width: calc(100% - 10px);\r\n}\r\n\r\n.colorSalmon {\r\n  background-color: Salmon;\r\n}\r\n\r\n.colorLightSkyBlue {\r\n  background-color: LightSkyBlue;\r\n}\r\n\r\n.margin5pxAuto {\r\n  margin: 5px auto;\r\n}\r\n\r\n.fontSizeSmall {\r\n  font-size: small;\r\n}\r\n\r\n.fontSizeLarge {\r\n  font-size: large;\r\n}\r\n\r\n.fontSizeXLarge {\r\n  font-size: x-large;\r\n}\r\n\r\n.cluePop {\r\n  font-size: larger;\r\n  padding: 5px 0;\r\n}\r\n\r\n#clueCard {\r\n  background-color: white;\r\n  padding: 5px;\r\n  margin: 0 5px 2px;\r\n}\r\n\r\n.cardShadow {\r\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),\r\n    0 1px 5px 0 rgba(0, 0, 0, 0.12);\r\n}\r\n\r\n.padding2px5px {\r\n  padding: 2px 5px;\r\n}\r\n\r\n.padding0px5px {\r\n  padding: 0 5px;\r\n}\r\n\r\n.padding0 {\r\n  padding: 0 !important;\r\n}\r\n\r\n.alignRight {\r\n  text-align: right;\r\n}\r\n\r\n.closeDialogPosition {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n}\r\n\r\n.buttonIsolation {\r\n  margin: 10px auto 10px auto;\r\n  width: 80%;\r\n  text-align: center;\r\n}\r\n\r\n.clickInheritParent {\r\n  pointer-events: inherit;\r\n}\r\n\r\n@media screen and (min-width: 420px) {\r\n  #gamesPanelContainer {\r\n    max-width: 400px;\r\n    margin-left: calc((100vw - 400px) / 2);\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 18/25) {\r\n  body {\r\n    font-size: 2.5vh;\r\n  }\r\n\r\n  .clueNumber {\r\n    font-size: 1.4vh;\r\n  }\r\n\r\n  #puzTable {\r\n    width: 70vh;\r\n  }\r\n\r\n  #clueContainer {\r\n    width: 70vh;\r\n    margin: auto;\r\n  }\r\n\r\n  #kbContainer {\r\n    width: 70vh;\r\n    margin: auto;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 4/3) {\r\n  .clueNumber {\r\n    font-size: 0.8vw;\r\n  }\r\n\r\n  #puzTable {\r\n    width: 45vw;\r\n  }\r\n\r\n  #clueContainer {\r\n    display: flex;\r\n    height: 45vw;\r\n    width: 50vw;\r\n  }\r\n\r\n  #acrossContainer,\r\n  #downContainer {\r\n    width: 50%;\r\n    display: block;\r\n  }\r\n\r\n  #acrossClues,\r\n  #downClues {\r\n    height: calc(100% - 30px);\r\n  }\r\n\r\n  #clueCard {\r\n    display: none;\r\n  }\r\n\r\n  #kbContainer {\r\n    height: 20vh;\r\n  }\r\n\r\n  #title {\r\n    display: block;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 14/9) {\r\n  #clueContainer {\r\n    height: 70%;\r\n    display: flex;\r\n    width: 50vw;\r\n  }\r\n\r\n  #kbContainer {\r\n    height: 25%;\r\n    width: 50vw;\r\n  }\r\n\r\n  #appContainer {\r\n    flex-direction: column;\r\n  }\r\n}\r\n\r\n@media screen and (min-aspect-ratio: 2/1) {\r\n  #puzTable {\r\n    width: 35vw;\r\n  }\r\n\r\n  #clueContainer {\r\n    width: 60vw;\r\n  }\r\n\r\n  #kbContainer {\r\n    width: 60vw;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["init"], () => (__webpack_exec__("./src/router.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxhQUFhLE9BQU8sV0FBVyxLQUFLLFlBQVksV0FBVyxPQUFPLFFBQVEsTUFBTSxNQUFNLE1BQU0sS0FBSyxZQUFZLFdBQVcsWUFBWSxXQUFXLE1BQU0sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxXQUFXLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssVUFBVSxNQUFNLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxVQUFVLEtBQUssT0FBTyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxLQUFLLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxXQUFXLFVBQVUsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxPQUFPLEtBQUssWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLEtBQUssT0FBTyxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxL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QUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3RDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1ZhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTs7QUFFakY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNYYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrREFBa0Q7QUFDbEQ7O0FBRUE7QUFDQSwwQ0FBMEM7QUFDMUM7O0FBRUE7O0FBRUE7QUFDQSxpRkFBaUY7QUFDakY7O0FBRUE7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7O0FBRUE7QUFDQSx5REFBeUQ7QUFDekQsSUFBSTs7QUFFSjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDckVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcm91dGVyLmpzIiwid2VicGFjazovLy8uL3NyYy92aWV3LmpzIiwid2VicGFjazovLy8uL3NyYy9zdHlsZXMvbWFpbi5jc3MiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzL21haW4uY3NzP2U4MGEiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkYiwgYXBwLCBhdXRoLCBmdW5jdGlvbnMsIG1lc3NhZ2luZyB9IGZyb20gJy4vZmlyZWJhc2UtaW5pdC5qcyc7XHJcbmltcG9ydCB7XHJcbiAgYXV0aENoYW5nZVZpZXcsXHJcbiAgc2lnbmVkT3V0VmlldyxcclxuICBzaG93UHV6emxlVmlldyxcclxuICBsb2FkR2FtZXNWaWV3LFxyXG59IGZyb20gJy4vdmlldy5qcyc7XHJcbmltcG9ydCB7XHJcbiAgZ2V0RGF0YWJhc2UsXHJcbiAgcmVmLFxyXG4gIG9uVmFsdWUsXHJcbiAgb25EaXNjb25uZWN0LFxyXG4gIHNldCxcclxuICBzZXJ2ZXJUaW1lc3RhbXAsXHJcbn0gZnJvbSAnZmlyZWJhc2UvZGF0YWJhc2UnO1xyXG5pbXBvcnQge1xyXG4gIG9uQXV0aFN0YXRlQ2hhbmdlZCxcclxuICBiZWZvcmVBdXRoU3RhdGVDaGFuZ2VkLFxyXG4gIHNpZ25PdXQsXHJcbn0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGdldFRva2VuIH0gZnJvbSAnZmlyZWJhc2UvbWVzc2FnaW5nJztcclxuaW1wb3J0IHtcclxuICBjb2xsZWN0aW9uLFxyXG4gIGdldERvY3MsXHJcbiAgc2V0RG9jLFxyXG4gIGRvYyxcclxuICBvblNuYXBzaG90LFxyXG4gIHF1ZXJ5LFxyXG4gIG9yZGVyQnksXHJcbiAgbGltaXQsXHJcbiAgd2hlcmUsXHJcbn0gZnJvbSAnZmlyZWJhc2UvZmlyZXN0b3JlJztcclxuaW1wb3J0IHsgaHR0cHNDYWxsYWJsZSB9IGZyb20gJ2ZpcmViYXNlL2Z1bmN0aW9ucyc7XHJcblxyXG5jb25zdCBkYlJUID0gZ2V0RGF0YWJhc2UoYXBwKTtcclxuY29uc3QgdmFwaWRLZXkgPVxyXG4gICdCQk1tclo0NEhtUXlsT2gwaWRIbzFGQ25fS2JyN2pQNDVQZTZMSFZWVmo0JyArXHJcbiAgJ3dCNHgtSWlQa3NfUVJMTHotZFpUTDA5OVoyTEtWWktZVEpHZkVNUjRSMEFrJztcclxuY29uc3Qgc2NvcmVWYWx1ZXMgPSB7XHJcbiAgQTogMSxcclxuICBCOiA0LFxyXG4gIEM6IDQsXHJcbiAgRDogMixcclxuICBFOiAxLFxyXG4gIEY6IDQsXHJcbiAgRzogMyxcclxuICBIOiA0LFxyXG4gIEk6IDEsXHJcbiAgSjogMTAsXHJcbiAgSzogNSxcclxuICBMOiAyLFxyXG4gIE06IDQsXHJcbiAgTjogMixcclxuICBPOiAxLFxyXG4gIFA6IDQsXHJcbiAgUTogMTAsXHJcbiAgUjogMSxcclxuICBTOiAxLFxyXG4gIFQ6IDEsXHJcbiAgVTogMixcclxuICBWOiA1LFxyXG4gIFc6IDQsXHJcbiAgWDogOCxcclxuICBZOiA0LFxyXG4gIFo6IDEwLFxyXG59O1xyXG5cclxubGV0IGN1cnJlbnRVc2VyID0gbnVsbDtcclxubGV0IHByZXZpb3VzVXNlciA9IG51bGw7XHJcbmxldCBhbGxVc2VycyA9IHt9O1xyXG5sZXQgYWxsR2FtZXMgPSB7fTtcclxubGV0IGN1cnJlbnRHYW1lID0gbnVsbDtcclxubGV0IGN1cnJlbnRHYW1lSWQgPSBudWxsO1xyXG5sZXQgbXlPcHBvbmVudFVpZCA9IG51bGw7XHJcbmxldCBjdXJyZW50Q2VsbCA9IG51bGw7XHJcbmxldCBhY3Jvc3NXb3JkID0gdHJ1ZTtcclxubGV0IGNvbHVtbnMgPSBudWxsO1xyXG5sZXQgY3VycmVudENsdWUgPSBudWxsO1xyXG5sZXQgaWR4QXJyYXkgPSBbXTtcclxubGV0IG15VHVybiA9IG51bGw7XHJcbi8vIFRPRE86IHNob3VsZCB0aGlzIGJlIHRyYWNrZWQsIGFuZCB3aGF0IGNhbiBiZSBkb25lIHdoaWxlIG9mZmxpbmU/XHJcbmxldCBvbmxpbmUgPSBmYWxzZTtcclxuXHJcbi8qKlxyXG4gKiBVbnN1YnNjcmliZSBmcm9tIGxpc3RlbmluZyBmb3IgY2hhbmdlcyBvbiBjdXJyZW50IGdhbWUuIERvZXMgbm90aGluZ1xyXG4gKiBpZiBub3Qgc3Vic2NyaWJlZCB0byBhbnkgZ2FtZS5cclxuICovXHJcbmxldCBnYW1lVW5zdWJzY3JpYmUgPSAoKSA9PiB7fTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGN1cnJlbnRHYW1lLiBTaG91bGQgYmUgdXNlZCBieSBhbGwgZXh0ZXJuYWwgbW9kdWxlcy5cclxuICogQHJldHVybnMge29iamVjdH0gUmV0dXJucyBjdXJyZW50R2FtZSBvciBudWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKSB7XHJcbiAgcmV0dXJuIGN1cnJlbnRHYW1lO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBjdXJyZW50R2FtZS4gU2hvdWxkIGJlIHVzZWQgYnkgYWxsIGV4dGVybmFsIG1vZHVsZXMuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBnYW1lIEdhbWUgd2l0aCBzb21lIHBhcmFtZXRlcnMgY2hhbmdlZCBvciBhZGRlZFxyXG4gKi9cclxuZnVuY3Rpb24gc2V0Q3VycmVudEdhbWVDb250cm9sbGVyKGdhbWUpIHtcclxuICBjdXJyZW50R2FtZSA9IGdhbWU7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHZhbHVlIG9mIGFjcm9zc1dvcmQuIFNob3VsZCBiZSB1c2VkIGJ5IGFsbCBleHRlcm5hbCBtb2R1bGVzLlxyXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gdHJ1ZSBpZiBhY3Jvc3MsIGZhbHNlIGlmIGRvd25cclxuICovXHJcbmZ1bmN0aW9uIGdldEFjcm9zc1dvcmRDb250cm9sbGVyKCkge1xyXG4gIHJldHVybiBhY3Jvc3NXb3JkO1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IGFjcm9zc1dvcmQuIFNob3VsZCBiZSB1c2VkIGJ5IGFsbCBleHRlcm5hbCBtb2R1bGVzLlxyXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGFjcm9zcyB0cnVlIGlmIGFjcm9zcywgZmFsc2UgaWYgZG93blxyXG4gKi9cclxuZnVuY3Rpb24gc2V0QWNyb3NzV29yZENvbnRyb2xsZXIoYWNyb3NzKSB7XHJcbiAgYWNyb3NzV29yZCA9IGFjcm9zcztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudFVzZXIuIFNob3VsZCBiZSB1c2VkIGJ5IGFsbCBleHRlcm5hbCBtb2R1bGVzLlxyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGN1cnJlbnRVc2VyIG9yIG51bGxcclxuICovXHJcbmZ1bmN0aW9uIGdldEN1cnJlbnRVc2VyQ29udHJvbGxlcigpIHtcclxuICByZXR1cm4gY3VycmVudFVzZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGFsbEdhbWVzIE9iamVjdC4gU2hvdWxkIGJlIHVzZWQgYnkgYWxsIGV4dGVybmFsIG1vZHVsZXMuXHJcbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYWxsR2FtZXMgT2JqZWN0XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRBbGxHYW1lc0NvbnRyb2xsZXIoKSB7XHJcbiAgcmV0dXJuIGFsbEdhbWVzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb2x1bW5zIE9iamVjdC4gU2hvdWxkIGJlIHVzZWQgYnkgYWxsIGV4dGVybmFsIG1vZHVsZXMuXHJcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgbnVtYmVyIG9mIGNvbHVtbnNcclxuICovXHJcbmZ1bmN0aW9uIGdldENvbHVtbnNDb250cm9sbGVyKCkge1xyXG4gIHJldHVybiBjb2x1bW5zO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBpZHhBcnJheSBjb250YWluaW5nIHRoZSBpbmRpY2VzIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgd29yZCBpbiB0aGVcclxuICogcHV6emxlLiBTaG91bGQgYmUgdXNlZCBieSBhbGwgZXh0ZXJuYWwgbW9kdWxlcy5cclxuICogQHJldHVybnMge2FycmF5fSBSZXR1cm5zIGlkeEFycmF5XHJcbiAqL1xyXG5mdW5jdGlvbiBnZXRJZHhBcnJheUNvbnRyb2xsZXIoKSB7XHJcbiAgcmV0dXJuIGlkeEFycmF5O1xyXG59XHJcblxyXG4vKipcclxuICogU2V0IHRoZSBpZHhBcnJheSBjb250YWluaW5nIHRoZSBpbmRpY2VzIG9mIHRoZSBjdXJyZW50bHkgc2VsZWN0ZWQgd29yZCBpbiB0aGVcclxuICogcHV6emxlLiBTaG91bGQgYmUgdXNlZCBieSBhbGwgZXh0ZXJuYWwgbW9kdWxlcy5cclxuICogQHBhcmFtIHthcnJheX0gd29yZEFycmF5IEFycmF5IGNvbnRhaW5pbmcgdGhlIGluZGV4ZXMgb2YgdGhlIGN1cnJlbnRseSBzZWxlY3RlZCB3b3JkLlxyXG4gKi9cclxuZnVuY3Rpb24gc2V0SWR4QXJyYXlDb250cm9sbGVyKHdvcmRBcnJheSkge1xyXG4gIGlkeEFycmF5ID0gd29yZEFycmF5O1xyXG59XHJcblxyXG4vKipcclxuICogSGVscGVyIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBzdGF0ZSBvYmplY3QuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdGF0ZVxyXG4gKiBAcmV0dXJucyBTdGF0ZSBvYmplY3QgdG8gc3RvcmUgZm9yIHVzZXIgb24gZGF0YWJhc2VcclxuICovXHJcbmZ1bmN0aW9uIGF1dGhTdGF0ZShzdGF0ZSkge1xyXG4gIHJldHVybiB7IHN0YXRlOiBzdGF0ZSwgbGFzdENoYW5nZWQ6IERhdGUoc2VydmVyVGltZXN0YW1wKCkpIH07XHJcbn1cclxuXHJcbi8vIFVwZGF0ZXMgdXNlciBvbmxpbmUgc3RhdHVzIG9ubHkgaWYgdXNlciBpcyBsb2dnZWQgaW5cclxuLy8gd2hlbiBjb25uZWN0aW9uL2Rpc2Nvbm5lY3Rpb24gd2l0aCBhcHAgaXMgbWFkZS5cclxuLy8gSWYgbm8gdXNlciBpcyBsb2dnZWQgaW4sIHRoaXMgZG9lcyBub3RoaW5nLlxyXG5vblZhbHVlKHJlZihkYlJULCAnLmluZm8vY29ubmVjdGVkJyksIChzbmFwc2hvdCkgPT4ge1xyXG4gIGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgbm90aWZpY2F0aW9uIGZpcmVkLiBDb25uZWN0ZWQ6ICcsIGAke3NuYXBzaG90LnZhbCgpfWApO1xyXG4gIGNvbnN0IHVpZCA9IGF1dGguY3VycmVudFVzZXIgPyBhdXRoLmN1cnJlbnRVc2VyLnVpZCA6IG51bGw7XHJcbiAgaWYgKHNuYXBzaG90LnZhbCgpID09PSBmYWxzZSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSBpZiAodWlkKSB7XHJcbiAgICBvbkRpc2Nvbm5lY3QocmVmKGRiUlQsIGAvdXNlcnMvJHt1aWR9YCkpXHJcbiAgICAgIC5zZXQoYXV0aFN0YXRlKCdvZmZsaW5lJykpXHJcbiAgICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgICBzZXQocmVmKGRiUlQsIGAvdXNlcnMvJHt1aWR9YCksIGF1dGhTdGF0ZSgnb25saW5lJykpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIC8vIGhhbmRsZXMgY2hhbmdlIHRvIGRhdGFiYXNlIGp1c3QgYmVmb3JlIGF1dGggc3RhdGUgY2hhbmdlcyxcclxuLy8gLy8gYWxsb3dpbmcgcGVybWlzc2lvbiB0byBtYWtlIHRoZSBjaGFuZ2UuXHJcbi8vIGJlZm9yZUF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcclxuLy8gICBjb25zdCB1aWQgPSBhdXRoLmN1cnJlbnRVc2VyID8gYXV0aC5jdXJyZW50VXNlci51aWQgOiBudWxsO1xyXG4vLyAgIGlmICh1aWQpIHtcclxuLy8gICAgIHNldChyZWYoZGJSVCwgYC91c2Vycy8ke3VpZH1gKSwgYXV0aFN0YXRlKCdvZmZsaW5lJykpO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcblxyXG5vbkF1dGhTdGF0ZUNoYW5nZWQoYXV0aCwgKHVzZXIpID0+IHtcclxuICBjb25zdCB1aWQgPSB1c2VyID8gdXNlci51aWQgOiBudWxsO1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIG9uQXV0aFN0YXRlQ2hhbmdlZC4gQ3VycmVudCB1c2VyIElEOiAnLCB1aWQpO1xyXG4gIGF1dGhDaGFuZ2VWaWV3KHVzZXIpO1xyXG4gIHByZXZpb3VzVXNlciA9IGN1cnJlbnRVc2VyO1xyXG4gIGN1cnJlbnRVc2VyID0gdXNlcjtcclxuICBpZiAoIXVpZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGF1dGhDaGFuZ2VkID0gaHR0cHNDYWxsYWJsZShmdW5jdGlvbnMsICdhdXRoQ2hhbmdlZCcpO1xyXG4gIGF1dGhDaGFuZ2VkKClcclxuICAgIC50aGVuKGFzeW5jIChyZXN1bHQpID0+IHtcclxuICAgICAgY29uc29sZS5sb2cocmVzdWx0KTtcclxuICAgICAgaWYgKHJlc3VsdC5kYXRhKSB7XHJcbiAgICAgICAgYXdhaXQgc2V0KHJlZihkYlJULCBgL3VzZXJzLyR7cmVzdWx0LmRhdGF9YCksIGF1dGhTdGF0ZSgnb25saW5lJykpO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0pXHJcbiAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgIGdlbmVyYXRlTWVzc2FnaW5nVG9rZW4oKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSlcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgcG9wdWxhdGVBbGxHYW1lc0NvbnRyb2xsZXIoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSlcclxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjb2RlOiAnLCBlcnIuY29kZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBtZXNzYWdlOiAnLCBlcnIubWVzc2FnZSk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBkZXRhaWxzOiAnLCBlcnIuZGV0YWlscyk7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG4vLyBDb25maWd1cmUgbWVzc2FnaW5nIGNyZWRlbnRpYWxzIHdpdGggRkNNIFZBUElEIGtleVxyXG5mdW5jdGlvbiBnZW5lcmF0ZU1lc3NhZ2luZ1Rva2VuKCkge1xyXG4gIGdldFRva2VuKG1lc3NhZ2luZywge1xyXG4gICAgdmFwaWRLZXk6IHZhcGlkS2V5LFxyXG4gIH0pXHJcbiAgICAudGhlbigoY3VycmVudFRva2VuKSA9PiB7XHJcbiAgICAgIGlmIChjdXJyZW50VG9rZW4pIHtcclxuICAgICAgICBzZW5kVG9rZW5Ub1NlcnZlcihjdXJyZW50VG9rZW4pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEkgZG9uJ3QgdGhpbmsgYW55dGhpbmcgaXMgbmVlZGVkIGhlcmUuXHJcbiAgICAgICAgLy8gSSB0aGluayBicm93c2VyIGF1dG9tYXRpY2FsbHkgYXNrcyBmb3IgcGVybWlzc2lvbi5cclxuICAgICAgfVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0FuIGVycm9yIG9jY3VycmVkIHdoaWxlIHJldHJpZXZpbmcgdG9rZW46ICcsIGVycik7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFNlbmQgY2xvdWQgbWVzc2FnaW5nIHRva2VuIHRvIHNlcnZlclxyXG4gKiBAcGFyYW0ge3N0cmluZ30gdG9rZW4gQ2xvdWQgbWVzc2FnaW5nIHRva2VuXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzZW5kVG9rZW5Ub1NlcnZlcih0b2tlbikge1xyXG4gIGNvbnNvbGUubG9nKCdNZXNzYWdpbmcgcGVybWlzc2lvbiBncmFudGVkLiBUb2tlbjogJywgdG9rZW4pO1xyXG4gIGNvbnN0IHVpZCA9IGF1dGguY3VycmVudFVzZXIgPyBhdXRoLmN1cnJlbnRVc2VyLnVpZCA6IG51bGw7XHJcbiAgaWYgKHVpZCkge1xyXG4gICAgYXdhaXQgc2V0RG9jKFxyXG4gICAgICBkb2MoZGIsIGAvdXNlcnMvJHt1aWR9L2ApLFxyXG4gICAgICB7IG1zZ1Rva2VuOiB0b2tlbiB9LFxyXG4gICAgICB7IG1lcmdlOiB0cnVlIH1cclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogQ2FsbGVkIGJ5IHRoZSB2aWV3LCBzaWducyB0aGUgdXNlciBvdXQgb3IgdGFrZXMgdGhlbSB0byB0aGUgI3NpZ25pbiBwYWdlLlxyXG4gKi9cclxuZnVuY3Rpb24gYXV0aEJ1dHRvbkNsaWNrZWRDb250cm9sbGVyKCkge1xyXG4gIGlmIChjdXJyZW50VXNlcikge1xyXG4gICAgc2lnbk91dChhdXRoKVxyXG4gICAgICAudGhlbigoKSA9PiB7XHJcbiAgICAgICAgLy8gU2lnbi1vdXQgc3VjY2Vzc2Z1bC5cclxuICAgICAgICAvLyBzaWduZWRPdXRWaWV3KCk7XHJcbiAgICAgICAgLy8gbG9jYXRpb24uaGFzaCA9ICcjc2lnbmluJztcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0pXHJcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XHJcbiAgICAgIH0pO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBrZWVwIHRoaXMgZWxzZSAtIGxvY2F0aW9uIHNob3VsZCBjaGFuZ2Ugb25seSBpZiBzaWduT3V0IHN1Y2Nlc3NmdWxcclxuICAgIGxvY2F0aW9uLmhhc2ggPSAnI3NpZ25pbic7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogUG9wdWxhdGUgbGlzdCBvZiBhbGwgdXNlcnMgZnJvbSBmaXJlc3RvcmUgYW5kIHJldHVybiB0aGUgbGlzdC5cclxuICogQHJldHVybnMgT2JqZWN0IGNvbnRhaW5pbmcgYWxsIHVzZXJzIGJ5IHVpZFxyXG4gKi9cclxuZnVuY3Rpb24gcG9wdWxhdGVBbGxVc2Vyc0NvbnRyb2xsZXIoKSB7XHJcbiAgcmV0dXJuIGdldERvY3MocXVlcnkoY29sbGVjdGlvbihkYiwgJ3VzZXJzJykpKVxyXG4gICAgLnRoZW4oKHNuYXBzaG90KSA9PiB7XHJcbiAgICAgIGlmIChzbmFwc2hvdC5lbXB0eSkge1xyXG4gICAgICAgIGNvbnNvbGUud2FybignTm8gdXNlcnMgZXhpc3QgeWV0LicpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCB1c2Vyc09iaiA9IHt9O1xyXG4gICAgICBzbmFwc2hvdC5kb2NzLmZvckVhY2goKGRvYykgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRvYy5kYXRhKCkpO1xyXG4gICAgICAgIGNvbnN0IHVzZXIgPSBkb2MuZGF0YSgpO1xyXG4gICAgICAgIHVzZXJzT2JqW3VzZXIudWlkXSA9IHVzZXI7XHJcbiAgICAgIH0pO1xyXG4gICAgICBhbGxVc2VycyA9IHVzZXJzT2JqO1xyXG4gICAgICByZXR1cm4gdXNlcnNPYmo7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coJ0Vycm9yIGdldHRpbmcgbGlzdCBvZiB1c2VyczogJywgZXJyb3IpKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBvcHVsYXRlIGxpc3Qgb2YgYWxsIGdhbWVzIHRoYXQgaXMgdmlld2FibGUgdG8gdGhlIGN1cnJlbnQgdXNlclxyXG4gKiBmcm9tIGZpcmVzdG9yZSBhbmQgcmV0dXJuIHRoZSBsaXN0LlxyXG4gKiBAcmV0dXJucyBPYmplY3QgY29udGFpbmluZyBhbGwgZ2FtZXMgYnkgZ2FtZUlkXHJcbiAqL1xyXG5mdW5jdGlvbiBwb3B1bGF0ZUFsbEdhbWVzQ29udHJvbGxlcigpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBwb3B1bGF0ZUFsbEdhbWVzQ29udHJvbGxlci4nKTtcclxuICBpZiAoY3VycmVudFVzZXIpIHtcclxuICAgIGNvbnN0IHEgPSBxdWVyeShcclxuICAgICAgY29sbGVjdGlvbihkYiwgJ2dhbWVzJyksXHJcbiAgICAgIHdoZXJlKCd2aWV3YWJsZUJ5JywgJ2FycmF5LWNvbnRhaW5zJywgYCR7Y3VycmVudFVzZXIudWlkfWApLFxyXG4gICAgICBvcmRlckJ5KCdzdGFydCcsICdkZXNjJyksXHJcbiAgICAgIGxpbWl0KDEwKVxyXG4gICAgKTtcclxuICAgIHJldHVybiBnZXREb2NzKHEpXHJcbiAgICAgIC50aGVuKChzbmFwc2hvdCkgPT4ge1xyXG4gICAgICAgIGlmIChzbmFwc2hvdC5lbXB0eSkge1xyXG4gICAgICAgICAgY29uc29sZS53YXJuKCdObyBnYW1lcyBleGlzdCB5ZXQuJyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGdhbWVzT2JqID0ge307XHJcbiAgICAgICAgc25hcHNob3QuZG9jcy5mb3JFYWNoKChkb2MpID0+IHtcclxuICAgICAgICAgIGdhbWVzT2JqW2RvYy5pZF0gPSBkb2MuZGF0YSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGFsbEdhbWVzID0gZ2FtZXNPYmo7XHJcbiAgICAgICAgcmV0dXJuIGdhbWVzT2JqO1xyXG4gICAgICB9KVxyXG4gICAgICAudGhlbigoZ2FtZXNPYmopID0+IHtcclxuICAgICAgICBsb2FkR2FtZXNWaWV3KGdhbWVzT2JqKTtcclxuICAgICAgfSlcclxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gY29uc29sZS5sb2coJ0Vycm9yIGdldHRpbmcgbGlzdCBvZiBnYW1lczogJywgZXJyb3IpKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIGZldGNoZXMgYW4gYWN0aXZlIHB1enpsZSBiYXNlZCBvbiB0aGUgdXNlcidzIHNlbGVjdGlvblxyXG4gKiBhbmQgdGhlbiBjYWxscyBmdW5jdGlvbnMgdG8gZm9ybWF0IGFuZCBkaXNwbGF5IHRoZSBwdXp6bGVcclxuICogQHBhcmFtIHtTdHJpbmd9IHB1enpsZUlkIEZpcmVzdG9yZSBnYW1lIChwdXp6bGUpIGlkXHJcbiAqL1xyXG5mdW5jdGlvbiBmZXRjaFB1enpsZUNvbnRyb2xsZXIocHV6emxlSWQpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBmZXRjaFB1enpsZUNvbnRyb2xsZXIuJyk7XHJcbiAgc3Vic2NyaWJlVG9HYW1lKHB1enpsZUlkKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFVuc3Vic2NyaWJlIGZyb20gbGlzdGVuaW5nIGZvciBjaGFuZ2VzIG9uIHByZXZpb3VzIGdhbWUsIGFuZCBzdGFydCBsaXN0ZW5pbmdcclxuICogZm9yIGNoYW5nZXMgb24gZ2FtZUlkIGdhbWUuXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBnYW1lSWRcclxuICovXHJcbmZ1bmN0aW9uIHN1YnNjcmliZVRvR2FtZShnYW1lSWQpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBzdWJzY3JpYmVUb0dhbWUuJyk7XHJcbiAgLy8gU3RvcCBsaXN0ZW5pbmcgZm9yIHByZXZpb3VzIHB1enpsZSBjaGFuZ2VzXHJcbiAgdHJ5IHtcclxuICAgIGdhbWVVbnN1YnNjcmliZSgpO1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZygnSU5GTzogRXJyb3IgdGhyb3duIHRyeWluZyB0byB1bnN1YnNjcmliZSBmcm9tIGN1cnJlbnQgZ2FtZS4nKTtcclxuICAgIC8vIGRvIG5vdGhpbmcsIGFscmVhZHkgdW5zdWJzY3JpYmVkXHJcbiAgfVxyXG5cclxuICAvLyBTdGFydCBsaXN0ZW5pbmcgdG8gY3VycmVudCBwdXp6bGUgY2hhbmdlc1xyXG4gIGdhbWVVbnN1YnNjcmliZSA9IG9uU25hcHNob3QoXHJcbiAgICBkb2MoZGIsICdnYW1lcycsIGdhbWVJZCksXHJcbiAgICAoZG9jKSA9PiB7XHJcbiAgICAgIGN1cnJlbnRHYW1lID0gZG9jLmRhdGEoKTtcclxuICAgICAgY3VycmVudEdhbWVJZCA9IGdhbWVJZDtcclxuICAgICAgaWYgKGN1cnJlbnRHYW1lLnN0YXR1cyA9PT0gJ3N0YXJ0ZWQnKSB7XHJcbiAgICAgICAgbXlPcHBvbmVudFVpZCA9XHJcbiAgICAgICAgICBjdXJyZW50R2FtZS5pbml0aWF0b3IudWlkID09PSBjdXJyZW50VXNlci51aWRcclxuICAgICAgICAgICAgPyBjdXJyZW50R2FtZS5vcHBvbmVudC51aWRcclxuICAgICAgICAgICAgOiBjdXJyZW50R2FtZS5pbml0aWF0b3IudWlkO1xyXG4gICAgICAgIGNvbHVtbnMgPSBjdXJyZW50R2FtZS5wdXp6bGUuY29scztcclxuICAgICAgfVxyXG4gICAgICBpZHhBcnJheSA9IFtdO1xyXG4gICAgICBjb2x1bW5zID0gY3VycmVudEdhbWUucHV6emxlLmNvbHM7XHJcbiAgICAgIG15VHVybiA9IGN1cnJlbnRVc2VyLnVpZCA9PT0gY3VycmVudEdhbWUubmV4dFR1cm47XHJcbiAgICAgIHNob3dQdXp6bGVWaWV3KGN1cnJlbnRHYW1lKTtcclxuICAgIH0sXHJcbiAgICAoZXJyb3IpID0+IHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc3Vic2NyaWJpbmcgdG8gcHV6emxlOiAnLCBlcnJvcik7XHJcbiAgICB9XHJcbiAgKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFBsYXkgY3VycmVudFVzZXIncyB0dXJuLiBFeGVjdXRlZCB3aGVuIHRoZSBwbGF5ZXIgY2xpY2tzIHRoZSBlbnRlclxyXG4gKiBidXR0b25cclxuICovXHJcbmZ1bmN0aW9uIHBsYXlXb3JkQ29udHJvbGxlcigpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBwbGF5V29yZENvbnRyb2xsZXIuJyk7XHJcbiAgaWYgKGN1cnJlbnRHYW1lLnN0YXR1cyA9PT0gJ2ZpbmlzaGVkJykgcmV0dXJuO1xyXG4gIGlmIChpbmNvbXBsZXRlKCkpIHJldHVybjtcclxuICBpZiAobG9jYXRpb24uaGFzaCA9PT0gJyNwdXp6bGUnICYmICFteVR1cm4pIHtcclxuICAgIGFsZXJ0KFwiWW91ciBvcHBvbmVudCBoYXNuJ3QgcGxheWVkIHRoZWlyIHR1cm4geWV0IVwiKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gVE9ETzogc29tZXRoaW5nIGxpa2UgdGhpcz86XHJcbiAgLy8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3B1elRpdGxlJykuaW5uZXJUZXh0ID0gJ0ZldGNoaW5nIGRhdGEuLi4nO1xyXG4gIGNvbnN0IGFuc3dlck9iaiA9IHt9O1xyXG4gIGFuc3dlck9iai5pZHhBcnJheSA9IGlkeEFycmF5O1xyXG4gIGFuc3dlck9iai5nYW1lSWQgPSBjdXJyZW50R2FtZUlkO1xyXG4gIGFuc3dlck9iai5hY3Jvc3NXb3JkID0gYWNyb3NzV29yZDtcclxuICBhbnN3ZXJPYmouZ3Vlc3MgPSBbXTtcclxuICBhbnN3ZXJPYmoubXlVaWQgPSBjdXJyZW50VXNlci51aWQ7XHJcbiAgYW5zd2VyT2JqLm15T3Bwb25lbnRVaWQgPSBteU9wcG9uZW50VWlkO1xyXG4gIGZvciAoY29uc3QgaW5kZXggb2YgaWR4QXJyYXkpIHtcclxuICAgIGFuc3dlck9iai5ndWVzcy5wdXNoKGN1cnJlbnRHYW1lLnB1enpsZS5ncmlkW2luZGV4XS5ndWVzcyk7XHJcbiAgfVxyXG4gIGNvbnN0IGNoZWNrQW5zd2VyID0gaHR0cHNDYWxsYWJsZShmdW5jdGlvbnMsICdjaGVja0Fuc3dlcicpO1xyXG4gIGNoZWNrQW5zd2VyKGFuc3dlck9iailcclxuICAgIC50aGVuKChvYmopID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ2lzQ29ycmVjdDogJywgYCR7b2JqLmRhdGEuY29ycmVjdEFuc3dlcn1gKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSlcclxuICAgIC50aGVuKCgpID0+IHtcclxuICAgICAgY29uc3Qgbm90aWZ5T3Bwb25lbnQgPSBodHRwc0NhbGxhYmxlKGZ1bmN0aW9ucywgJ25vdGlmeVBsYXllcicpO1xyXG4gICAgICByZXR1cm4gbm90aWZ5T3Bwb25lbnQoYW5zd2VyT2JqLm15T3Bwb25lbnRVaWQpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9KTtcclxuICAgIH0pXHJcbiAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29kZTogJywgZXJyLmNvZGUpO1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgbWVzc2FnZTogJywgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGV0YWlsczogJywgZXJyLmRldGFpbHMpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYXJyYXkgb2YgY2VsbHMgaGFzIGEgbGV0dGVyIGluIGVhY2ggc3F1YXJlXHJcbiAqIEByZXR1cm4ge2Jvb2xlYW59IHRydWUgaWYgd29yZCBpcyBpbmNvbXBsZXRlLCBmYWxzZSBvdGhlcndpc2VcclxuICovXHJcbmZ1bmN0aW9uIGluY29tcGxldGUoKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gaW5jb21wbGV0ZS4gaWR4QXJyYXk6ICcsIGlkeEFycmF5KTtcclxuICBpZiAoaWR4QXJyYXkubGVuZ3RoID09PSAwKSByZXR1cm4gdHJ1ZTtcclxuICBmb3IgKGNvbnN0IGkgb2YgaWR4QXJyYXkpIHtcclxuICAgIGlmIChcclxuICAgICAgIWN1cnJlbnRHYW1lLnB1enpsZS5ncmlkW2ldLmd1ZXNzIHx8XHJcbiAgICAgIGN1cnJlbnRHYW1lLnB1enpsZS5ncmlkW2ldLmd1ZXNzID09PSAnJ1xyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBFeHBvcnRlZCBmdW5jdGlvbiB0aGF0IHByZXNlbnRlciB1c2VzIHRvIHN0YXJ0IGEgbmV3IGdhbWVcclxuICogQHBhcmFtIHtPYmplY3R9IGdhbWVTdGFydFBhcmFtZXRlcnMgUGFyYW1ldGVycyBuZWVkZWQgdG8gc3RhcnQgZ2FtZVxyXG4gKi9cclxuZnVuY3Rpb24gc3RhcnROZXdHYW1lQ29udHJvbGxlcihnYW1lU3RhcnRQYXJhbWV0ZXJzKSB7XHJcbiAgY29uc29sZS5sb2coJ0F0dGVtcHRpbmcgdG8gc3RhcnQgYSBuZXcgZ2FtZS4nKTtcclxuICBjb25zdCBzdGFydEdhbWUgPSBodHRwc0NhbGxhYmxlKGZ1bmN0aW9ucywgJ3N0YXJ0R2FtZScpO1xyXG4gIHN0YXJ0R2FtZShnYW1lU3RhcnRQYXJhbWV0ZXJzKVxyXG4gICAgLnRoZW4oKGdhbWVPYmpEYXRhKSA9PiB7XHJcbiAgICAgIHN1YnNjcmliZVRvR2FtZShnYW1lT2JqRGF0YS5kYXRhLmdhbWVJZCk7XHJcbiAgICAgIHJldHVybiBnYW1lT2JqRGF0YS5kYXRhLmdhbWU7XHJcbiAgICB9KVxyXG4gICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGNvZGU6ICcsIGVyci5jb2RlKTtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIG1lc3NhZ2U6ICcsIGVyci5tZXNzYWdlKTtcclxuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGRldGFpbHM6ICcsIGVyci5kZXRhaWxzKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogRW50ZXIgYSBsZXR0ZXIgaW50byB0aGUgY3VycmVudEdhbWUgYXMgYSBndWVzcy5cclxuICogQHBhcmFtIHtzdHJpbmd9IGxldHRlciBMZXR0ZXIgdG8gYmUgZW50ZXJlZCBpbnRvIHRoZSBzcXVhcmVcclxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IG9mIHNxdWFyZVxyXG4gKi9cclxuZnVuY3Rpb24gZW50ZXJMZXR0ZXJDb250cm9sbGVyKGxldHRlciwgaW5kZXgpIHtcclxuICBjdXJyZW50R2FtZS5wdXp6bGUuZ3JpZFtpbmRleF0uZ3Vlc3MgPSBsZXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBVcGRhdGUgdGhlIGNvbnRyb2xsZXIgY3VycmVudEdhbWUgdmFyaWFibGUgYW5kIHNhdmUgdGhlIGdhbWUuXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcHBlbmQgT3B0aW9uYWwgT2JqZWN0IHRvIGFwcGVuZCB0byBnYW1lIGFzIGdhbWUuYXBwZW5kXHJcbiAqL1xyXG5mdW5jdGlvbiBzYXZlUHV6emxlQ29udHJvbGxlcihhcHBlbmQpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBzYXZlUHV6emxlQ29udHJvbGxlci4nKTtcclxuICBpZiAoYXBwZW5kKSB7XHJcbiAgICBhcHBlbmRPYmplY3QoY3VycmVudEdhbWUsIGFwcGVuZCk7XHJcbiAgfVxyXG4gIHNldERvYyhkb2MoZGIsIGBnYW1lcy8ke2N1cnJlbnRHYW1lSWR9YCksIGN1cnJlbnRHYW1lLCB7IG1lcmdlOiB0cnVlIH0pLmNhdGNoKFxyXG4gICAgKGVycikgPT4ge1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgY29kZTogJywgZXJyLmNvZGUpO1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgbWVzc2FnZTogJywgZXJyLm1lc3NhZ2UpO1xyXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGV0YWlsczogJywgZXJyLmRldGFpbHMpO1xyXG4gICAgfVxyXG4gICk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBBcHBlbmRzIHRoZSBhcHBlbmQgT2JqZWN0IHRvIHRoZSBiYXNlIE9iamVjdC5cclxuICogQHBhcmFtIHtvYmplY3R9IGJhc2UgQmFzZSBvYmplY3QgdG8gYXBwZW5kIHRvXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBhcHBlbmQgT2JqZWN0IHRvIGFwcGVuZCB0byBiYXNlXHJcbiAqL1xyXG5mdW5jdGlvbiBhcHBlbmRPYmplY3QoYmFzZSwgYXBwZW5kKSB7XHJcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKGFwcGVuZCk7XHJcbiAga2V5cy5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgIGJhc2Vba2V5XSA9IGFwcGVuZFtrZXldO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhYmFuZG9uQ3VycmVudEdhbWVDb250cm9sbGVyKCkge1xyXG4gIGNvbnN0IGFiYW5kb25PYmogPSB7fTtcclxuICBhYmFuZG9uT2JqLmdhbWVJZCA9IGN1cnJlbnRHYW1lSWQ7XHJcbiAgYWJhbmRvbk9iai5vcHBvbmVudFVpZCA9IG15T3Bwb25lbnRVaWQ7XHJcbiAgYWJhbmRvbk9iai5teVVpZCA9IGN1cnJlbnRVc2VyLnVpZDtcclxuICBjb25zdCBhYmFuZG9uR2FtZSA9IGh0dHBzQ2FsbGFibGUoZnVuY3Rpb25zLCAnYWJhbmRvbkdhbWUnKTtcclxuICBhYmFuZG9uR2FtZShhYmFuZG9uT2JqKS5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICBjb25zb2xlLmxvZygnRXJyb3IgY29kZTogJywgZXJyLmNvZGUpO1xyXG4gICAgY29uc29sZS5sb2coJ0Vycm9yIG1lc3NhZ2U6ICcsIGVyci5tZXNzYWdlKTtcclxuICAgIGNvbnNvbGUubG9nKCdFcnJvciBkZXRhaWxzOiAnLCBlcnIuZGV0YWlscyk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgYXV0aEJ1dHRvbkNsaWNrZWRDb250cm9sbGVyLFxyXG4gIHN0YXJ0TmV3R2FtZUNvbnRyb2xsZXIsXHJcbiAgZ2V0Q3VycmVudFVzZXJDb250cm9sbGVyLFxyXG4gIHBvcHVsYXRlQWxsVXNlcnNDb250cm9sbGVyLFxyXG4gIHBvcHVsYXRlQWxsR2FtZXNDb250cm9sbGVyLFxyXG4gIGdldEFsbEdhbWVzQ29udHJvbGxlcixcclxuICBmZXRjaFB1enpsZUNvbnRyb2xsZXIsXHJcbiAgc2F2ZVB1enpsZUNvbnRyb2xsZXIsXHJcbiAgcGxheVdvcmRDb250cm9sbGVyLFxyXG4gIGdldENvbHVtbnNDb250cm9sbGVyLFxyXG4gIGdldElkeEFycmF5Q29udHJvbGxlcixcclxuICBzZXRJZHhBcnJheUNvbnRyb2xsZXIsXHJcbiAgZ2V0Q3VycmVudEdhbWVDb250cm9sbGVyLFxyXG4gIHNldEN1cnJlbnRHYW1lQ29udHJvbGxlcixcclxuICBlbnRlckxldHRlckNvbnRyb2xsZXIsXHJcbiAgYWJhbmRvbkN1cnJlbnRHYW1lQ29udHJvbGxlcixcclxuICBnZXRBY3Jvc3NXb3JkQ29udHJvbGxlcixcclxuICBzZXRBY3Jvc3NXb3JkQ29udHJvbGxlcixcclxufTtcclxuIiwiaW1wb3J0IHtcclxuICBnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIsXHJcbiAgcG9wdWxhdGVBbGxHYW1lc0NvbnRyb2xsZXIsXHJcbn0gZnJvbSAnLi9jb250cm9sbGVyLmpzJztcclxuXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xyXG4gIGluaXRSb3V0ZXIoKTtcclxufSk7XHJcblxyXG4vKiogSW5pdGlhbGl6ZSBhZnRlciBkb2N1bWVudCBsb2FkcyAqL1xyXG5mdW5jdGlvbiBpbml0Um91dGVyKCkge1xyXG4gIGNvbnN0IHF1ZXJ5U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xyXG4gIGNvbnN0IGFwcENvbnRhaW5lciA9IHF1ZXJ5U2VsZWN0b3IoJyNhcHBDb250YWluZXInKTtcclxuICBjb25zdCBnYW1lc1BhbmVsID0gcXVlcnlTZWxlY3RvcignI2dhbWVzUGFuZWwnKTtcclxuICBjb25zdCBnYW1lc0RpYWxvZyA9IHF1ZXJ5U2VsZWN0b3IoJyNnYW1lc0RpYWxvZycpO1xyXG4gIGNvbnN0IHNjb3JlcyA9IHF1ZXJ5U2VsZWN0b3IoJyNzY29yZXMnKTtcclxuICBjb25zdCBjb25jZXNzaW9uQnRuQ29udGFpbmVyID0gcXVlcnlTZWxlY3RvcignI2NvbmNlc3Npb25CdG5Db250YWluZXInKTtcclxuICBjb25zdCBwdXp6bGVJbmZvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3B1enpsZUluZm8nKTtcclxuICBjb25zdCBwdXpUYWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwdXpUYWJsZScpO1xyXG4gIGNvbnN0IGNsdWVDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2x1ZUNvbnRhaW5lcicpO1xyXG4gIGNvbnN0IGtiQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2tiQ29udGFpbmVyJyk7XHJcbiAgY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaCcpO1xyXG4gIGNvbnN0IGhlYWRlclNpZ25pbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXJTaWduaW4nKTtcclxuICBjb25zdCBzaWduaW5NZXNzYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25pbk1lc3NhZ2UnKTtcclxuICBjb25zdCB0b3MgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9zJyk7XHJcbiAgY29uc3QgcHJpdmFjeSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcml2YWN5Jyk7XHJcbiAgY29uc3QgcmV0dXJuVG9TaWduaW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmV0dXJuVG9TaWduaW4nKTtcclxuICBjb25zdCBmaXJlYmFzZXVpQXV0aENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICAgJ2ZpcmViYXNldWlBdXRoQ29udGFpbmVyJ1xyXG4gICk7XHJcblxyXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdoYXNoY2hhbmdlJywgbmF2aWdhdGUpO1xyXG5cclxuICAvKipcclxuICAgKiBOYXZpZ2F0ZSBiYXNlZCBvbiBoYXNoIGNoYW5nZVxyXG4gICAqL1xyXG4gIGZ1bmN0aW9uIG5hdmlnYXRlKCkge1xyXG4gICAgaWYgKGxvY2F0aW9uLmhhc2ggPT09ICcjcHV6emxlJykge1xyXG4gICAgICAvLyB0cnkge1xyXG4gICAgICAvLyAgIGNvbnN0IHJlcGxheUJ1dHRvbiA9IHF1ZXJ5U2VsZWN0b3IoJyNyZXBsYXlCdXR0b24nKTtcclxuICAgICAgLy8gICBpZiAoIXJlcGxheUJ1dHRvbikge1xyXG4gICAgICAvLyAgICAgZ2FtZXNEaWFsb2cuY2xvc2UoKTtcclxuICAgICAgLy8gICB9XHJcbiAgICAgIC8vIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAvLyAgIC8vIGRvIG5vdGhpbmcsIGVycm9yIE9LXHJcbiAgICAgIC8vIH1cclxuICAgICAgZ2FtZXNQYW5lbC5jbGFzc0xpc3QuYWRkKCdzbGlkZU91dCcpO1xyXG4gICAgICBhcHBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVJbicpO1xyXG4gICAgICBwdXp6bGVJbmZvLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIGhlYWRlclNpZ25pbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5oYXNoID09PSAnI3NpZ25pbicpIHtcclxuICAgICAgZ2FtZXNQYW5lbC5jbGFzc0xpc3QuYWRkKCdzbGlkZU91dCcpO1xyXG4gICAgICBhcHBDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnc2xpZGVJbicpO1xyXG4gICAgICBzY29yZXMuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheUZsZXgnKTtcclxuICAgICAgc2NvcmVzLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIGNvbmNlc3Npb25CdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgcHV6emxlSW5mby5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBwdXpUYWJsZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBjbHVlQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIGtiQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHNwbGFzaC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBoZWFkZXJTaWduaW4uY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgc2lnbmluTWVzc2FnZS5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICB0b3MuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgcHJpdmFjeS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICByZXR1cm5Ub1NpZ25pbi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBmaXJlYmFzZXVpQXV0aENvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgfSBlbHNlIGlmIChsb2NhdGlvbi5oYXNoID09PSAnI2dhbWVzJykge1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGdhbWVzRGlhbG9nLmNsb3NlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vIGRvIG5vdGhpbmcsIGVycm9yIE9LXHJcbiAgICAgIH1cclxuICAgICAgaWYgKCFnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIoKSkge1xyXG4gICAgICAgIGhlYWRlclNpZ25pbi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICB9XHJcbiAgICAgIGdhbWVzUGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2xpZGVPdXQnKTtcclxuICAgICAgYXBwQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlSW4nKTtcclxuICAgICAgY29uY2Vzc2lvbkJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBzY29yZXMuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheUZsZXgnKTtcclxuICAgICAgc2NvcmVzLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHB1enpsZUluZm8uY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgcG9wdWxhdGVBbGxHYW1lc0NvbnRyb2xsZXIoKTtcclxuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaGFzaCA9PT0gJyN0b3MnKSB7XHJcbiAgICAgIGdhbWVzUGFuZWwuY2xhc3NMaXN0LmFkZCgnc2xpZGVPdXQnKTtcclxuICAgICAgYXBwQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NsaWRlSW4nKTtcclxuICAgICAgc2NvcmVzLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlGbGV4Jyk7XHJcbiAgICAgIHNjb3Jlcy5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBjb25jZXNzaW9uQnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHB1enpsZUluZm8uY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgcHV6VGFibGUuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgY2x1ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBrYkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBzcGxhc2guY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgdG9zLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHJldHVyblRvU2lnbmluLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHNpZ25pbk1lc3NhZ2UuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgZmlyZWJhc2V1aUF1dGhDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgIH0gZWxzZSBpZiAobG9jYXRpb24uaGFzaCA9PT0gJyNwcml2YWN5Jykge1xyXG4gICAgICBnYW1lc1BhbmVsLmNsYXNzTGlzdC5hZGQoJ3NsaWRlT3V0Jyk7XHJcbiAgICAgIGFwcENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzbGlkZUluJyk7XHJcbiAgICAgIHNjb3Jlcy5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5RmxleCcpO1xyXG4gICAgICBzY29yZXMuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgY29uY2Vzc2lvbkJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBwdXp6bGVJbmZvLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHB1elRhYmxlLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIGNsdWVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAga2JDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgc3BsYXNoLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICAgIHByaXZhY3kuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgcmV0dXJuVG9TaWduaW4uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICAgICAgc2lnbmluTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgICBmaXJlYmFzZXVpQXV0aENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKGxvY2F0aW9uLmhhc2ggIT09ICcjZ2FtZXMnKSB7XHJcbiAgICBsb2NhdGlvbi5oYXNoID0gJyNnYW1lcyc7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCB7XHJcbiAgYXV0aEJ1dHRvbkNsaWNrZWRDb250cm9sbGVyLFxyXG4gIHN0YXJ0TmV3R2FtZUNvbnRyb2xsZXIsXHJcbiAgcG9wdWxhdGVBbGxVc2Vyc0NvbnRyb2xsZXIsXHJcbiAgZ2V0Q3VycmVudFVzZXJDb250cm9sbGVyLFxyXG4gIGZldGNoUHV6emxlQ29udHJvbGxlcixcclxuICBwbGF5V29yZENvbnRyb2xsZXIsXHJcbiAgZ2V0Q29sdW1uc0NvbnRyb2xsZXIsXHJcbiAgZ2V0SWR4QXJyYXlDb250cm9sbGVyLFxyXG4gIHNldElkeEFycmF5Q29udHJvbGxlcixcclxuICBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIsXHJcbiAgZW50ZXJMZXR0ZXJDb250cm9sbGVyLFxyXG4gIGFiYW5kb25DdXJyZW50R2FtZUNvbnRyb2xsZXIsXHJcbiAgc2V0Q3VycmVudEdhbWVDb250cm9sbGVyLFxyXG4gIHBvcHVsYXRlQWxsR2FtZXNDb250cm9sbGVyLFxyXG4gIHNhdmVQdXp6bGVDb250cm9sbGVyLFxyXG4gIHNldEFjcm9zc1dvcmRDb250cm9sbGVyLFxyXG4gIGdldEFjcm9zc1dvcmRDb250cm9sbGVyLFxyXG59IGZyb20gJy4vY29udHJvbGxlci5qcyc7XHJcblxyXG5pbXBvcnQgJy4vc3R5bGVzL21haW4uY3NzJztcclxuXHJcbi8vI3JlZ2lvbiBIVE1MIGVsZW1lbnQgY29uc3RhbnRzXHJcbmNvbnN0IGF1dGhCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aEJ1dHRvbicpO1xyXG5jb25zdCBkcmF3ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHJhd2VyJyk7XHJcbmNvbnN0IHByb2ZpbGVOYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2ZpbGVOYW1lJyk7XHJcbmNvbnN0IGF2YXRhciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdmF0YXInKTtcclxuY29uc3QgZ2FtZXNEaWFsb2cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZXNEaWFsb2cnKTtcclxuY29uc3QgaGVhZGVyU2lnbmluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlclNpZ25pbicpO1xyXG5jb25zdCBnYW1lT3ZlckhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZU92ZXJIZWFkaW5nJyk7XHJcbmNvbnN0IHdpbk1lc3NhZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnd2luTWVzc2FnZScpO1xyXG5jb25zdCBvcHBvbmVudEhlYWRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Bwb25lbnRIZWFkaW5nJyk7XHJcbmNvbnN0IG9wcG9uZW50TGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHBvbmVudExpc3QnKTtcclxuY29uc3QgcmFkaW9FYXN5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JhZGlvRWFzeScpO1xyXG5jb25zdCByYWRpb01lZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYWRpb01lZCcpO1xyXG5jb25zdCByYWRpb0hhcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmFkaW9IYXJkJyk7XHJcbmNvbnN0IGRpYWxvZ0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGlhbG9nTGlzdCcpO1xyXG5jb25zdCBhY3RpdmVHYW1lc0NvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY3RpdmVHYW1lc0NvbnRhaW5lcicpO1xyXG5jb25zdCBwYXN0R2FtZXNDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGFzdEdhbWVzQ29udGFpbmVyJyk7XHJcbmNvbnN0IHB1elRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3B1elRhYmxlJyk7XHJcbmNvbnN0IHB1ekF1dGhvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwdXpBdXRob3InKTtcclxuY29uc3QgcHV6Q29weSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwdXpDb3B5Jyk7XHJcbmNvbnN0IHB1ek5vdGVwYWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHV6Tm90ZXBhZCcpO1xyXG5jb25zdCBjbHVlQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NsdWVDb250YWluZXInKTtcclxuY29uc3QgYWNyb3NzQ2x1ZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNyb3NzQ2x1ZXMnKTtcclxuY29uc3QgZG93bkNsdWVzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Rvd25DbHVlcycpO1xyXG5jb25zdCBzaW5nbGVDbHVlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpbmdsZUNsdWUnKTtcclxuY29uc3Qga2V5Ym9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgna2JDb250YWluZXInKTtcclxuY29uc3Qgc3BsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NwbGFzaCcpO1xyXG5jb25zdCBzY29yZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmVzJyk7XHJcbmNvbnN0IG15TmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteU5hbWUnKTtcclxuY29uc3Qgb3BwTmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHBOYW1lJyk7XHJcbmNvbnN0IG15U2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXlTY29yZScpO1xyXG5jb25zdCBvcHBTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcHBTY29yZScpO1xyXG5jb25zdCBjb25jZXNzaW9uQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbmNlc3Npb25CdG4nKTtcclxuY29uc3QgY29uY2Vzc2lvbkJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxyXG4gICdjb25jZXNzaW9uQnRuQ29udGFpbmVyJ1xyXG4pO1xyXG5jb25zdCBwdXpUaXRsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwdXpUaXRsZScpO1xyXG5jb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKTtcclxuY29uc3QgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcGxheUJ1dHRvbicpO1xyXG5jb25zdCByZXR1cm5Ub1NpZ25pbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXR1cm5Ub1NpZ25pbicpO1xyXG4vLyNlbmRyZWdpb25cclxuXHJcbmxldCBjdXJyZW50Q2VsbCA9IG51bGw7XHJcbmxldCBhY3Jvc3NXb3JkID0gdHJ1ZTtcclxuLy8gbGV0IGN1cnJlbnRPcHBvbmVudCA9IG51bGw7XHJcbi8vIGxldCBhbGxVc2VycyA9IG51bGw7XHJcblxyXG5sb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIGxvY2F0aW9uLmhhc2ggPSAnI2dhbWVzJztcclxufSk7XHJcblxyXG5yZXR1cm5Ub1NpZ25pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IChsb2NhdGlvbi5oYXNoID0gJyNzaWduaW4nKSk7XHJcblxyXG4vKipcclxuICogQ2xpY2tpbmcgdGhlIGF1dGhCdXR0b24gb24gdGhlIGRyYXdlciBjYWxscyBgYXV0aEJ1dHRvbkNsaWNrZWRDb250cm9sbGVyYFxyXG4gKiBmcm9tIHRoZSBjb250cm9sbGVyLCB3aGljaCBzaWducyB0aGUgdXNlciBpbiBvciBvdXQgZGVwZW5kaW5nIG9uXHJcbiAqIHRoZWlyIGN1cnJlbnQgc2lnbiBpbiBzdGF0dXMuXHJcbiAqL1xyXG5hdXRoQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgaWYgKGRyYXdlci5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXZpc2libGUnKSkgdG9nZ2xlRHJhd2VyKCk7XHJcbiAgYXV0aEJ1dHRvbkNsaWNrZWRDb250cm9sbGVyKCk7XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIENhbGxlZCBieSB0aGUgY29udHJvbGxlciwgdXBkYXRlcyB0aGUgdmlld1xyXG4gKiB3aGVuIHRoZXJlIGlzIGFuIGF1dGggY2hhbmdlLlxyXG4gKiBAcGFyYW0ge1VzZXJ9IHVzZXIgQ3VycmVudCBsb2dnZWQgaW4gdXNlciBvciBudWxsXHJcbiAqL1xyXG5mdW5jdGlvbiBhdXRoQ2hhbmdlVmlldyh1c2VyKSB7XHJcbiAgaWYgKHVzZXIpIHtcclxuICAgIGF1dGhCdXR0b24udGV4dENvbnRlbnQgPSAnc2lnbiBvdXQnO1xyXG4gICAgcHJvZmlsZU5hbWUudGV4dENvbnRlbnQgPSB1c2VyLmRpc3BsYXlOYW1lO1xyXG4gICAgYXZhdGFyLnNyYyA9IHVzZXIucGhvdG9VUkxcclxuICAgICAgPyB1c2VyLnBob3RvVVJMXHJcbiAgICAgIDogJ2ltYWdlcy9hdmF0YXJfY2lyY2xlX2JsYWNrLnBuZyc7XHJcbiAgICBsb2NhdGlvbi5oYXNoID0gJyNnYW1lcyc7XHJcbiAgICBoZWFkZXJTaWduaW4uY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYXV0aEJ1dHRvbi50ZXh0Q29udGVudCA9ICdzaWduIGluJztcclxuICAgIHByb2ZpbGVOYW1lLnRleHRDb250ZW50ID0gJ04uIEUuIFBlcnNvbic7XHJcbiAgICBhdmF0YXIuc3JjID0gJ2ltYWdlcy9hdmF0YXJfY2lyY2xlX2JsYWNrLnBuZyc7XHJcbiAgICBoZWFkZXJTaWduaW4uY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICAgIHB1elRpdGxlLmlubmVyVGV4dCA9ICdObyBwdXp6bGUgbG9hZGVkJztcclxuICAgIGFjdGl2ZUdhbWVzQ29udGFpbmVyLmlubmVySFRNTCA9XHJcbiAgICAgICdZb3UgbXVzdCBzaWduIGluIHRvIHNlZSB5b3VyIGFjdGl2ZSBnYW1lcyc7XHJcbiAgICBwYXN0R2FtZXNDb250YWluZXIuaW5uZXJIVE1MID1cclxuICAgICAgJ1lvdSBtdXN0IHNpZ24gaW4gdG8gc2VlIHlvdXIgY29tcGxldGVkIGdhbWVzJztcclxuICAgIGNsZWFyUHV6emxlKCk7XHJcbiAgICBpZiAobG9jYXRpb24uaGFzaCAhPT0gJyN0b3MnIHx8IGxvY2F0aW9uLmhhc2ggIT09ICcjcHJpdmFjeScpXHJcbiAgICAgIGxvY2F0aW9uLmhhc2ggPSAnI3NpZ25pbic7XHJcbiAgfVxyXG4gIGlmIChkcmF3ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy12aXNpYmxlJykpIHRvZ2dsZURyYXdlcigpO1xyXG4gIC8vIFRPRE86IGdldCByaWQgb2YgbG9jYWwgdmFyaWFibGVzIC0gY3VycmVudFVzZXIgc2hvdWxkIGJlIGF2YWlsYWJsZSBvbmx5XHJcbiAgLy8gaW4gdGhlIGNvbnRyb2xsZXJcclxuICAvLyBjdXJyZW50VXNlciA9IHVzZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBDYWxsZWQgYnkgdGhlIGNvbnRyb2xsZXIsIHVwZGF0ZXMgdGhlIHZpZXdcclxuICogd2hlbiB1c2VyIGhhcyBzaWduZWQgb3V0LlxyXG4gKi9cclxuZnVuY3Rpb24gc2lnbmVkT3V0VmlldygpIHtcclxuICBhY3RpdmVHYW1lc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnWW91IG11c3Qgc2lnbiBpbiB0byBzZWUgeW91ciBhY3RpdmUgZ2FtZXMnO1xyXG4gIHBhc3RHYW1lc0NvbnRhaW5lci5pbm5lckhUTUwgPSAnWW91IG11c3Qgc2lnbiBpbiB0byBzZWUgeW91ciBjb21wbGV0ZWQgZ2FtZXMnO1xyXG4gIGlmIChkcmF3ZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy12aXNpYmxlJykpIHRvZ2dsZURyYXdlcigpO1xyXG4gIGNsZWFyUHV6emxlKCk7XHJcbn1cclxuXHJcbi8qKiBIZWxwZXIgZnVuY3Rpb24gZm9yIHRvZ2dsaW5nIGRyYXdlciAqL1xyXG5mdW5jdGlvbiB0b2dnbGVEcmF3ZXIoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1kbC1sYXlvdXQnKS5NYXRlcmlhbExheW91dC50b2dnbGVEcmF3ZXIoKTtcclxufVxyXG5cclxuLyoqIFJlbW92ZXMgcHV6emxlIGZyb20gRE9NICovXHJcbmZ1bmN0aW9uIGNsZWFyUHV6emxlKCkge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGNsZWFyUHV6emxlLicpO1xyXG4gIHB1elRpdGxlLmlubmVyVGV4dCA9ICdQdXp6bGUgaW5mbyB3aWxsIGFwcGVhciBoZXJlJztcclxuICAvLyBjbGVhciBvdXQgb2xkIHB1enpsZSBhbmQgY2x1ZXNcclxuICBwdXpUYWJsZS5pbm5lckhUTUwgPSAnJztcclxuICBwdXpBdXRob3IuaW5uZXJUZXh0ID0gJyc7XHJcbiAgcHV6Tm90ZXBhZC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gIHB1ekNvcHkuaW5uZXJIVE1MID0gJyc7XHJcbiAgY2x1ZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gIHNwbGFzaC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIGFjcm9zc0NsdWVzLmlubmVySFRNTCA9ICcnO1xyXG4gIGRvd25DbHVlcy5pbm5lckhUTUwgPSAnJztcclxuICBzaW5nbGVDbHVlLmlubmVyVGV4dCA9ICdTZWxlY3QgaW4gdGhlIHB1enpsZSB0byByZXZlYWwgY2x1ZSc7XHJcbiAgY3VycmVudENlbGwgPSBudWxsO1xyXG59XHJcblxyXG4vLyBHbyB0byBzaWduaW4gcGFnZSB3aGVuIHVzZXIgY2xpY2tzIGhlYWRlclNpZ25pbiBpY29uXHJcbmhlYWRlclNpZ25pbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBsb2NhdGlvbi5oYXNoID0gJyNzaWduaW4nO1xyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBTdGFydCBhIG5ldyBnYW1lIHdpdGggc2VsZWN0ZWQgb3Bwb25lbnRcclxuICogQHBhcmFtIHtNb3VzZUV2ZW50fSBldmVudCBDbGljayBldmVudCBmcm9tIGRpYWxvZ0xpc3RcclxuICovXHJcbmRpYWxvZ0xpc3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcclxuICBjb25zb2xlLmxvZygnVXNlciBzZWxlY3RlZCBvcHBvbmVudCB0byBzdGFydCBhIG5ldyBnYW1lLicpO1xyXG4gIGNvbnN0IGN1cnJlbnRVc2VyID0gZ2V0Q3VycmVudFVzZXJDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgdXNlckxpc3QgPSBhd2FpdCBwb3B1bGF0ZUFsbFVzZXJzQ29udHJvbGxlcigpO1xyXG4gIGNvbnN0IGdhbWVTdGFydFBhcmFtZXRlcnMgPSB7fTtcclxuICBnYW1lU3RhcnRQYXJhbWV0ZXJzLmluaXRpYXRvciA9IHt9O1xyXG4gIGdhbWVTdGFydFBhcmFtZXRlcnMuaW5pdGlhdG9yLnVpZCA9IGN1cnJlbnRVc2VyLnVpZDtcclxuICBnYW1lU3RhcnRQYXJhbWV0ZXJzLmluaXRpYXRvci5kaXNwbGF5TmFtZSA9IGN1cnJlbnRVc2VyLmRpc3BsYXlOYW1lO1xyXG4gIGdhbWVTdGFydFBhcmFtZXRlcnMuaW5pdGlhdG9yLnBob3RvVVJMID0gY3VycmVudFVzZXIucGhvdG9VUkxcclxuICAgID8gY3VycmVudFVzZXIucGhvdG9VUkxcclxuICAgIDogbnVsbDtcclxuICAvLyBUT0RPOiBzZWxlY3RpbmcgdGhlIHJpZ2h0IHRhcmdldCBtYXkgbmVlZCBmaXhpbmcgLSB3aGlsZSBsb29wP1xyXG4gIGxldCB0YXJnZXQgPSBldmVudC50YXJnZXQucGFyZW50RWxlbWVudDtcclxuICAvLyB0cnlpbmcgYSBmaXhcclxuICB3aGlsZSAodGFyZ2V0LmlkID09PSAnJykge1xyXG4gICAgdGFyZ2V0ID0gdGFyZ2V0LnBhcmVudEVsZW1lbnQ7XHJcbiAgfVxyXG4gIGdhbWVTdGFydFBhcmFtZXRlcnMub3Bwb25lbnQgPSB7fTtcclxuICBnYW1lU3RhcnRQYXJhbWV0ZXJzLm9wcG9uZW50LnVpZCA9IHVzZXJMaXN0W3RhcmdldC5pZF0udWlkO1xyXG4gIGdhbWVTdGFydFBhcmFtZXRlcnMub3Bwb25lbnQuZGlzcGxheU5hbWUgPSB1c2VyTGlzdFt0YXJnZXQuaWRdLmRpc3BsYXlOYW1lO1xyXG4gIGdhbWVTdGFydFBhcmFtZXRlcnMub3Bwb25lbnQucGhvdG9VUkwgPSB1c2VyTGlzdFt0YXJnZXQuaWRdLnBob3RvVVJMXHJcbiAgICA/IHVzZXJMaXN0W3RhcmdldC5pZF0ucGhvdG9VUkxcclxuICAgIDogbnVsbDtcclxuICBsZXQgZGlmZmljdWx0eSA9IHJhZGlvTWVkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1jaGVja2VkJylcclxuICAgID8gJ21lZGl1bSdcclxuICAgIDogJ2Vhc3knO1xyXG4gIGRpZmZpY3VsdHkgPSByYWRpb0hhcmQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWNoZWNrZWQnKVxyXG4gICAgPyAnaGFyZCdcclxuICAgIDogZGlmZmljdWx0eTtcclxuICBnYW1lU3RhcnRQYXJhbWV0ZXJzLmRpZmZpY3VsdHkgPSBkaWZmaWN1bHR5O1xyXG4gIGNsb3NlR2FtZXNEaWFsb2coKTtcclxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHV6VGl0bGUnKS5pbm5lclRleHQgPSAnRmV0Y2hpbmcgbmV3IHB1enpsZS4uLic7XHJcbiAgc3RhcnROZXdHYW1lQ29udHJvbGxlcihnYW1lU3RhcnRQYXJhbWV0ZXJzKTtcclxufSk7XHJcblxyXG5nYW1lc0RpYWxvZy5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlR2FtZXNEaWFsb2cpO1xyXG5cclxuLyoqIFJlc2V0IHJhZGlvIGJ1dHRvbnMgYW5kIGNsb3NlIGRpYWxvZyAqL1xyXG5mdW5jdGlvbiBjbG9zZUdhbWVzRGlhbG9nKCkge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGNsb3NlR2FtZXNEaWFsb2cuJyk7XHJcbiAgcmFkaW9NZWQucmVtb3ZlQXR0cmlidXRlKCdjaGVja2VkJyk7XHJcbiAgcmFkaW9IYXJkLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xyXG4gIHJhZGlvRWFzeS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICBnYW1lc0RpYWxvZy5jbG9zZSgpO1xyXG59XHJcblxyXG4vKipcclxuICogRmlyZXMgYW4gZXZlbnQgd2l0aCB1c2VyIGRhdGEgdG8gcG9wdWxhdGUsIHVwZGF0ZSBhbmQgb3BlbiB0aGUgbmV3IGdhbWVcclxuICogZGlhbG9nIGluIHRoZSB2aWV3LCBvciBzZW5kIHVzZXIgdG8gdGhlIGxvZ2luIHBhZ2UgaWYgbm8gb25lIGlzIGxvZ2dlZCBpbi5cclxuICovXHJcbnN0YXJ0R2FtZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcclxuICBjb25zb2xlLmxvZygnc3RhcnRHYW1lQnV0dG9uIGNsaWNrZWQuJyk7XHJcbiAgY29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIoKTtcclxuICBpZiAoY3VycmVudFVzZXIpIHtcclxuICAgIC8vIHVzZXIgaXMgbG9nZ2VkIGluXHJcbiAgICBjb25zdCB1c2Vyc09iaiA9IGF3YWl0IHBvcHVsYXRlQWxsVXNlcnNDb250cm9sbGVyKCk7XHJcbiAgICBsb2FkVXNlckxpc3QodXNlcnNPYmosIGN1cnJlbnRVc2VyKTtcclxuICAgIGdhbWVPdmVySGVhZGluZy5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgd2luTWVzc2FnZS5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgZ2FtZXNEaWFsb2cuY2hpbGRyZW5bMF0uY2xhc3NMaXN0LmFkZCgncGFkZGluZzAnLCAnaGVpZ2h0MTAwcGN0Jyk7XHJcbiAgICBvcHBvbmVudEhlYWRpbmcuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICAgIG9wcG9uZW50TGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gICAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlOb25lJyk7XHJcbiAgICBnYW1lc0RpYWxvZy5jbGFzc0xpc3QuYWRkKCdoZWlnaHQ4MHBjdCcpO1xyXG4gICAgZ2FtZXNEaWFsb2cuc2hvd01vZGFsKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIHVzZXIgaXMgbm90IGxvZ2dlZCBpblxyXG4gICAgbG9jYXRpb24uaGFzaCA9ICcjc2lnbmluJztcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIExvYWQgbGlzdCBvZiBwb3RlbnRpYWwgb3Bwb25lbnRzIHdpdGggbGlzdCBvZiBhbGwgZmlyZWJhc2UgdXNlcnMuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSB1c2Vyc09iaiBPYmplY3QgY29udGFpbmluZyBhbGwgdXNlcnMgYnkgdWlkXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBjdXJyZW50VXNlciBDdXJyZW50IFVzZXJcclxuICovXHJcbmZ1bmN0aW9uIGxvYWRVc2VyTGlzdCh1c2Vyc09iaiwgY3VycmVudFVzZXIpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBsb2FkVXNlckxpc3QuJyk7XHJcbiAgbGV0IHVzZXJMaXN0ID0gJyc7XHJcbiAgaWYgKHVzZXJzT2JqLmVtcHR5KSB7XHJcbiAgICBjb25zb2xlLndhcm4oJ05vIHVzZXJzIGV4aXN0IHlldC4nKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgbGV0IHVpZHMgPSBPYmplY3Qua2V5cyh1c2Vyc09iaik7XHJcbiAgdWlkcy5mb3JFYWNoKCh1aWQpID0+IHtcclxuICAgIGNvbnN0IHVzZXIgPSB1c2Vyc09ialt1aWRdO1xyXG4gICAgLy8gZG9jLmRhdGEoKSBpcyBuZXZlciB1bmRlZmluZWQgZm9yIHF1ZXJ5IGRvYyBzbmFwc2hvdHNcclxuICAgIC8vIGNvbnNvbGUubG9nKGRvYy5pZCwgJyA9PiAnLCBkb2MuZGF0YSgpKTtcclxuICAgIGlmICh1aWQgIT09IGN1cnJlbnRVc2VyLnVpZCkge1xyXG4gICAgICBsZXQgYXZhdGFyID0gYDxpIGNsYXNzPSdtYXRlcmlhbC1pY29ucyBtZGwtbGlzdF9faXRlbS1hdmF0YXInPnBlcnNvbjwvaT5gO1xyXG4gICAgICBpZiAodXNlci5waG90b1VSTCkge1xyXG4gICAgICAgIGF2YXRhciA9IGA8c3BhbiBjbGFzcz0ncGljQ29udGFpbmVyIG1hdGVyaWFsLWljb25zIG1kbC1saXN0X19pdGVtLWF2YXRhcic+XHJcbiAgICAgICAgICA8aW1nIHNyYz0nJHt1c2VyLnBob3RvVVJMfScgYWx0PSdwcm9maWxlIHBpY3R1cmUnPlxyXG4gICAgICAgIDwvc3Bhbj5gO1xyXG4gICAgICB9XHJcbiAgICAgIHVzZXJMaXN0ICs9IGA8bGkgaWQ9JyR7dWlkfScgY2xhc3M9J21kbC1saXN0X19pdGVtIG1kbC1saXN0X19pdGVtLS10d28tbGluZSBjdXJzb3JQb2ludGVyJz5cclxuICAgICAgICA8c3BhbiBjbGFzcz0nbWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50IHdoaXRlU3BhY2VOb3dyYXAnPlxyXG4gICAgICAgICAgJHthdmF0YXJ9XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPSdvdmVyZmxvd0hpZGRlbicgc3R5bGU9J3dpZHRoOiAxMTVweDsnPiR7XHJcbiAgICAgICAgICAgIHVzZXIuZGlzcGxheU5hbWVcclxuICAgICAgICAgIH08L2Rpdj5cclxuICAgICAgICAgIDxzcGFuIGNsYXNzPSdtZGwtbGlzdF9faXRlbS1zdWItdGl0bGUnPlxyXG4gICAgICAgICAgICAke3VzZXIucHJvdmlkZXJJZCA/IHVzZXIucHJvdmlkZXJJZC5zcGxpdCgnLicpWzBdIDogJ25vbmUnfVxyXG4gICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzcz0nbWRsLWxpc3RfX2l0ZW0tc2Vjb25kYXJ5LWNvbnRlbnQnPlxyXG4gICAgICAgICAgPHNwYW4gY2xhc3M9J21kbC1saXN0X19pdGVtLXNlY29uZGFyeS1pbmZvJz5QbGF5PC9zcGFuPlxyXG4gICAgICAgICAgPGkgY2xhc3M9J21hdGVyaWFsLWljb25zJz5ncmlkX29uPC9pPlxyXG4gICAgICAgIDwvc3Bhbj5cclxuICAgICAgPC9saT5gO1xyXG4gICAgfVxyXG4gIH0pO1xyXG4gIC8vIGFsbFVzZXJzID0gdXNlcnNPYmo7XHJcbiAgLy8gY29uc29sZS5sb2codXNlckxpc3QpO1xyXG4gIGRpYWxvZ0xpc3QuaW5uZXJIVE1MID0gdXNlckxpc3Q7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBMb2FkIGdhbWUgbGlzdCB3aXRoIGFjdGl2ZSBhbmQgcGFzdCBnYW1lcyB0aGF0IHRoZSBjdXJyZW50IHVzZXIgaGFzXHJcbiAqIHBhcnRpY2lwYXRlZCBpbi5cclxuICogQHBhcmFtIHtPYmplY3R9IGdhbWVzT2JqIE9iamVjdCBhbGwgZ2FtZXMgdmlld2FibGUgYnkgdGhlIGN1cnJlbnQgdXNlclxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gbG9hZEdhbWVzVmlldyhnYW1lc09iaikge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGxvYWRHYW1lc1ZpZXcuJyk7XHJcbiAgY29uc3QgY3VycmVudFVzZXIgPSBnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIoKTtcclxuICBjb25zdCBhbGxVc2VycyA9IGF3YWl0IHBvcHVsYXRlQWxsVXNlcnNDb250cm9sbGVyKCk7XHJcbiAgaWYgKCFjdXJyZW50VXNlcikgcmV0dXJuO1xyXG4gIGFjdGl2ZUdhbWVzQ29udGFpbmVyLmlubmVySFRNTCA9ICdObyBhY3RpdmUgZ2FtZXMgeWV0LiBTdGFydCBvbmUhJztcclxuICBwYXN0R2FtZXNDb250YWluZXIuaW5uZXJIVE1MID0gJ05vIGNvbXBsZXRlZCBnYW1lcyB5ZXQnO1xyXG4gIGxldCBhY3RpdmVHYW1lc0h0bWwgPSAnJztcclxuICBsZXQgcGFzdEdhbWVzSHRtbCA9ICcnO1xyXG4gIGlmICghKGdhbWVzT2JqICYmIE9iamVjdC5rZXlzKGdhbWVzT2JqKSkpIHtcclxuICAgIC8vIGdhbWVzT2JqIGRvZXNuJ3QgZXhpc3Qgb3IgaXMgZW1wdHlcclxuICAgIGNvbnNvbGUud2FybignTm8gZ2FtZXMgZXhpc3QgeWV0LicpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuICBsZXQgZ2FtZXMgPSBPYmplY3Qua2V5cyhnYW1lc09iaik7XHJcbiAgZ2FtZXMuZm9yRWFjaCgoa2V5KSA9PiB7XHJcbiAgICBjb25zdCBnYW1lID0gZ2FtZXNPYmpba2V5XTtcclxuICAgIGNvbnN0IHN0YXJ0RGF0ZSA9IG5ldyBEYXRlKGdhbWUuc3RhcnQpLnRvTG9jYWxlRGF0ZVN0cmluZygnZW4tdXMnLCB7XHJcbiAgICAgIGRheTogJ251bWVyaWMnLFxyXG4gICAgICBtb250aDogJ3Nob3J0JyxcclxuICAgIH0pO1xyXG4gICAgbGV0IGF2YXRhciA9IGA8aSBjbGFzcz0nbWF0ZXJpYWwtaWNvbnMgbWRsLWxpc3RfX2l0ZW0tYXZhdGFyJz5wZXJzb248L2k+YDtcclxuICAgIGlmIChnYW1lLnN0YXR1cyA9PT0gJ3N0YXJ0ZWQnKSB7XHJcbiAgICAgIGNvbnN0IG15T3Bwb25lbnQgPVxyXG4gICAgICAgIGdhbWUuaW5pdGlhdG9yLnVpZCA9PT0gY3VycmVudFVzZXIudWlkID8gZ2FtZS5vcHBvbmVudCA6IGdhbWUuaW5pdGlhdG9yO1xyXG4gICAgICBjb25zdCBvcHBvbmVudFBob3RvID1cclxuICAgICAgICBhbGxVc2Vyc1tteU9wcG9uZW50LnVpZF0gJiYgYWxsVXNlcnNbbXlPcHBvbmVudC51aWRdLnBob3RvVVJMO1xyXG4gICAgICBpZiAob3Bwb25lbnRQaG90bykge1xyXG4gICAgICAgIGF2YXRhciA9IGA8c3BhbiBjbGFzcz0ncGljQ29udGFpbmVyIG1hdGVyaWFsLWljb25zIG1kbC1saXN0X19pdGVtLWF2YXRhcic+XHJcbiAgICAgICAgICA8aW1nIHNyYz0nJHtvcHBvbmVudFBob3RvfScgYWx0PSdwcm9maWxlIHBpY3R1cmUnPlxyXG4gICAgICAgIDwvc3Bhbj5gO1xyXG4gICAgICB9XHJcbiAgICAgIGFjdGl2ZUdhbWVzSHRtbCArPSBgPGxpIGlkPScke2tleX0nIGNsYXNzPSdtZGwtbGlzdF9faXRlbSBtZGwtbGlzdF9faXRlbS0tdHdvLWxpbmUgY3Vyc29yUG9pbnRlcic+XHJcbiAgPHNwYW4gY2xhc3M9J21kbC1saXN0X19pdGVtLXByaW1hcnktY29udGVudCc+XHJcbiAgICAke2F2YXRhcn1cclxuICAgIDxzcGFuPiR7bXlPcHBvbmVudC5kaXNwbGF5TmFtZX08L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz0nbWRsLWxpc3RfX2l0ZW0tc3ViLXRpdGxlJz5cclxuICAgICAgJHtjdXJyZW50VXNlci51aWQgPT09IGdhbWUubmV4dFR1cm4gPyAnWW91cicgOiAnVGhlaXInfSB0dXJuXHJcbiAgICA8L3NwYW4+XHJcbiAgPC9zcGFuPlxyXG4gIDxzcGFuIGNsYXNzPSdtZGwtbGlzdF9faXRlbS1zZWNvbmRhcnktY29udGVudCc+XHJcbiAgPHNwYW4gY2xhc3M9J21kbC1saXN0X19pdGVtLXNlY29uZGFyeS1pbmZvJz5TdGFydGVkPC9zcGFuPlxyXG4gIDxzcGFuPiR7c3RhcnREYXRlfTwvc3Bhbj5cclxuICA8L3NwYW4+XHJcbjwvbGk+YDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IG15T3Bwb25lbnQgPVxyXG4gICAgICAgIGdhbWUuaW5pdGlhdG9yLnVpZCA9PT0gY3VycmVudFVzZXIudWlkID8gZ2FtZS5vcHBvbmVudCA6IGdhbWUuaW5pdGlhdG9yO1xyXG4gICAgICBsZXQgcmVzdWx0ID0gJ1RpZSBnYW1lISc7XHJcbiAgICAgIGlmIChnYW1lLnN0YXR1cyA9PT0gJ2ZpbmlzaGVkJyAmJiBnYW1lLndpbm5lciAhPT0gJ3RpZScpIHtcclxuICAgICAgICByZXN1bHQgPSBjdXJyZW50VXNlci51aWQgPT09IGdhbWUud2lubmVyID8gJ1lvdSB3b24hIScgOiAnVGhleSB3b24nO1xyXG4gICAgICB9IGVsc2UgaWYgKGdhbWUuc3RhdHVzID09PSAnYWJhbmRvbmVkJykge1xyXG4gICAgICAgIHJlc3VsdCA9ICdHYW1lIGFiYW5kb25lZCc7XHJcbiAgICAgIH1cclxuICAgICAgLy8gcGFzdEdhbWVzW2RvYy5pZF0gPSB7fTtcclxuICAgICAgLy8gcGFzdEdhbWVzW2RvYy5pZF0uZGlmZmljdWx0eSA9IGdhbWUuZGlmZmljdWx0eTtcclxuICAgICAgY29uc3Qgb3Bwb25lbnRQaG90byA9XHJcbiAgICAgICAgYWxsVXNlcnNbbXlPcHBvbmVudC51aWRdICYmIGFsbFVzZXJzW215T3Bwb25lbnQudWlkXS5waG90b1VSTDtcclxuICAgICAgaWYgKG9wcG9uZW50UGhvdG8pIHtcclxuICAgICAgICBhdmF0YXIgPSBgPHNwYW4gY2xhc3M9J3BpY0NvbnRhaW5lciBtYXRlcmlhbC1pY29ucyBtZGwtbGlzdF9faXRlbS1hdmF0YXInPlxyXG4gIDxkaXY+XHJcbiAgICA8aW1nIHNyYz0nJHtvcHBvbmVudFBob3RvfScgYWx0PSdwcm9maWxlIHBpY3R1cmUnPlxyXG4gIDwvZGl2PlxyXG48L3NwYW4+YDtcclxuICAgICAgfVxyXG4gICAgICBwYXN0R2FtZXNIdG1sICs9IGA8bGkgaWQ9JyR7a2V5fScgY2xhc3M9J21kbC1saXN0X19pdGVtIG1kbC1saXN0X19pdGVtLS10d28tbGluZSBjdXJzb3JQb2ludGVyJz5cclxuICA8c3BhbiBjbGFzcz0nbWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50Jz5cclxuICAgICR7YXZhdGFyfVxyXG4gICAgPHNwYW4+JHtteU9wcG9uZW50LmRpc3BsYXlOYW1lfTwvc3Bhbj5cclxuICAgIDxzcGFuIGNsYXNzPSdtZGwtbGlzdF9faXRlbS1zdWItdGl0bGUnPiR7cmVzdWx0fTwvc3Bhbj5cclxuICA8L3NwYW4+XHJcbiAgICA8c3BhbiBjbGFzcz0nbWRsLWxpc3RfX2l0ZW0tc2Vjb25kYXJ5LWNvbnRlbnQnPlxyXG4gICAgPHNwYW4gY2xhc3M9J21kbC1saXN0X19pdGVtLXNlY29uZGFyeS1pbmZvJz5TdGFydGVkPC9zcGFuPlxyXG4gICAgPHNwYW4+JHtzdGFydERhdGV9PC9zcGFuPlxyXG4gIDwvc3Bhbj5cclxuPC9saT5gO1xyXG4gICAgfVxyXG4gIH0pO1xyXG5cclxuICAvLyBjb25zb2xlLmxvZyhkaWFsb2dMaXN0KTtcclxuICBhY3RpdmVHYW1lc0NvbnRhaW5lci5pbm5lckhUTUwgPVxyXG4gICAgYWN0aXZlR2FtZXNIdG1sID09PSAnJ1xyXG4gICAgICA/ICdObyBhY3RpdmUgZ2FtZXMgeWV0LiBTdGFydCBvbmUhJ1xyXG4gICAgICA6IGFjdGl2ZUdhbWVzSHRtbDtcclxuICBwYXN0R2FtZXNDb250YWluZXIuaW5uZXJIVE1MID1cclxuICAgIHBhc3RHYW1lc0h0bWwgPT09ICcnID8gJ05vIGNvbXBsZXRlZCBnYW1lcyB5ZXQnIDogcGFzdEdhbWVzSHRtbDtcclxufVxyXG5cclxuYWN0aXZlR2FtZXNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkR2FtZSk7XHJcblxyXG5wYXN0R2FtZXNDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsb2FkR2FtZSk7XHJcblxyXG4vKipcclxuICogRmV0Y2ggYW4gZXhpc3RpbmcgZ2FtZSBmcm9tIGZpcmVzdG9yZSB2aWEgdGhlIGNvbnRyb2xsZXIuXHJcbiAqIEBwYXJhbSB7TW91c2VFdmVudH0gZXZlbnRcclxuICogQHJldHVybnMgbnVsbFxyXG4gKi9cclxuZnVuY3Rpb24gbG9hZEdhbWUoZXZlbnQpIHtcclxuICBjb25zb2xlLmxvZygnVXNlciBzZWxlY3RlZCBhIGdhbWUgdG8gdmlldy4nKTtcclxuICBsZXQgZXZlbnRUYXJnZXQgPSBldmVudC50YXJnZXQ7XHJcbiAgd2hpbGUgKCFldmVudFRhcmdldC5pZCkge1xyXG4gICAgaWYgKGV2ZW50VGFyZ2V0Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICd1bCcpIHJldHVybjtcclxuICAgIGV2ZW50VGFyZ2V0ID0gZXZlbnRUYXJnZXQucGFyZW50RWxlbWVudDtcclxuICB9XHJcbiAgcHV6VGl0bGUuaW5uZXJUZXh0ID0gJ0ZldGNoaW5nIGRhdGEuLi4nO1xyXG4gIGZldGNoUHV6emxlQ29udHJvbGxlcihldmVudFRhcmdldC5pZCk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGlzIGZ1bmN0aW9uIHRha2VzIHRoZSBwdXp6bGUgb2JqZWN0IHJldHVybmVkIGZyb20gdGhlIGZldGNoIGFuZCBkaXNwbGF5c1xyXG4gKiBhIGdyaWQgYW5kIGNsdWVzLiBUaGUgSFRNTCB0YWJsZSBlbGVtZW50IGlzIGEgcGxhY2Vob2xkZXIgYW5kIHRoZSByb3dzIGFuZFxyXG4gKiBjZWxscyBhcmUgY3JlYXRlZCBvbiB0aGUgZmx5LiBUaGUgZmV0Y2hlZCBwdXp6bGUgaXMgc3RvcmVkIGFzIGFuIG9iamVjdCBpblxyXG4gKiB0aGUgdmFyaWFibGUgXCJnYW1lXCIuXHJcbiAqL1xyXG5mdW5jdGlvbiBzaG93UHV6emxlVmlldyhnYW1lKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gc2hvd1B1enpsZVZpZXcuJyk7XHJcbiAgLy8gY2xlYXIgcHJldmlvdXMgcHV6emxlIGlmIGl0IGV4aXN0c1xyXG4gIGlmIChwdXpUYWJsZS5jaGlsZHJlbikge1xyXG4gICAgY2xlYXJQdXp6bGUoKTtcclxuICB9XHJcbiAgaWYgKGdhbWUucHV6emxlLm5vdGVwYWQpIHtcclxuICAgIHB1ek5vdGVwYWQuaW5uZXJIVE1MID0gYDxiPk5vdGVwYWQ6PC9iPiR7Z2FtZS5wdXp6bGUubm90ZXBhZH1gO1xyXG4gICAgcHV6Tm90ZXBhZC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIH1cclxuICBwdXpUaXRsZS5pbm5lclRleHQgPSBnYW1lLnB1enpsZS50aXRsZSA/IGdhbWUucHV6emxlLnRpdGxlIDogJ1VudGl0bGVkJztcclxuICBwdXpBdXRob3IuaW5uZXJUZXh0ID0gYGJ5ICR7XHJcbiAgICBnYW1lLnB1enpsZS5hdXRob3IgPyBnYW1lLnB1enpsZS5hdXRob3IgOiAnQW5vbnltb3VzJ1xyXG4gIH1gO1xyXG4gIHB1ekNvcHkuaW5uZXJIVE1MID0gZ2FtZS5wdXp6bGUuY29weXJpZ2h0XHJcbiAgICA/IGAmY29weTsgJHtnYW1lLnB1enpsZS5jb3B5cmlnaHR9YFxyXG4gICAgOiAnJztcclxuXHJcbiAgY29uc3QgY2VsbERpbSA9IGdldENlbGxEaW0oKTtcclxuICBjb25zdCB0YWJsZURpbSA9IGNlbGxEaW0gKiBnYW1lLnB1enpsZS5jb2xzO1xyXG4gIGxldCBncmlkSW5kZXggPSAwO1xyXG4gIGZvciAobGV0IHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCBnYW1lLnB1enpsZS5yb3dzOyByb3dJbmRleCArPSAxKSB7XHJcbiAgICBjb25zdCByb3cgPSBwdXpUYWJsZS5pbnNlcnRSb3cocm93SW5kZXgpO1xyXG4gICAgcm93LnN0eWxlLndpZHRoID0gYCR7dGFibGVEaW19cHhgO1xyXG4gICAgZm9yIChsZXQgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IGdhbWUucHV6emxlLmNvbHM7IGNvbEluZGV4ICs9IDEpIHtcclxuICAgICAgY29uc3QgY2x1ZU51bWJlciA9IGdhbWUucHV6emxlLmdyaWRbZ3JpZEluZGV4XS5jbHVlTnVtO1xyXG4gICAgICBjb25zdCBjZWxsID0gcm93Lmluc2VydENlbGwoY29sSW5kZXgpO1xyXG4gICAgICBjb25zdCBibGFja0NlbGwgPSBnYW1lLnB1enpsZS5ncmlkW2dyaWRJbmRleF0uYmxhY2s7XHJcblxyXG4gICAgICBjZWxsLnN0eWxlLndpZHRoID0gYCR7Y2VsbERpbX1weGA7XHJcbiAgICAgIGNlbGwuc3R5bGUuaGVpZ2h0ID0gYCR7Y2VsbERpbX1weGA7XHJcbiAgICAgIGNlbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjZWxsQ2xpY2tlZCk7XHJcbiAgICAgIGlmIChibGFja0NlbGwpIHtcclxuICAgICAgICBjZWxsLmNsYXNzTmFtZSA9ICdibGFjayc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdjdXJzb3JQb2ludGVyJyk7XHJcbiAgICAgICAgY29uc3Qgc3F1YXJlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgY29uc3QgbGV0dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgc3F1YXJlRGl2LmNsYXNzTGlzdC5hZGQoJ3NxdWFyZScpO1xyXG4gICAgICAgIGxldHRlckRpdi5jbGFzc0xpc3QuYWRkKCdtYXJnaW5BdXRvJyk7XHJcbiAgICAgICAgaWYgKGdhbWUucHV6emxlLmdyaWRbZ3JpZEluZGV4XS5zdGF0dXMgPT09ICdsb2NrZWQnKSB7XHJcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoZ2FtZS5wdXp6bGUuZ3JpZFtncmlkSW5kZXhdLmJnQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBndWVzcyA9IGdhbWUucHV6emxlLmdyaWRbZ3JpZEluZGV4XS5ndWVzcztcclxuICAgICAgICBsZXR0ZXJEaXYuaW5uZXJUZXh0ID0gZ3Vlc3MgPyBndWVzcyA6ICcnO1xyXG4gICAgICAgIHNxdWFyZURpdi5hcHBlbmRDaGlsZChsZXR0ZXJEaXYpO1xyXG4gICAgICAgIGNlbGwuYXBwZW5kQ2hpbGQoc3F1YXJlRGl2KTtcclxuICAgICAgICBpZiAoY2x1ZU51bWJlciAhPT0gJycpIHtcclxuICAgICAgICAgIGNvbnN0IGNsdWVOdW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgIGNsdWVOdW1EaXYuY2xhc3NMaXN0LmFkZCgnY2x1ZU51bWJlcicpO1xyXG4gICAgICAgICAgY2x1ZU51bURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjbHVlTnVtYmVyKSk7XHJcbiAgICAgICAgICBjZWxsLmFwcGVuZENoaWxkKGNsdWVOdW1EaXYpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZ2FtZS5wdXp6bGUuZ3JpZFtncmlkSW5kZXhdLmNpcmNsZSkge1xyXG4gICAgICAgICAgY2VsbC5jaGlsZHJlblswXS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUnKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZ3JpZEluZGV4ICs9IDE7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHNldEN1cnJlbnRHYW1lQ29udHJvbGxlcihnYW1lKTtcclxuXHJcbiAga2V5Ym9hcmQuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICBrZXlib2FyZC5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5RmxleCcpO1xyXG4gIGNsdWVDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICBzcGxhc2guY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICBjb25jZXNzaW9uQnRuQ29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc3BsYXlOb25lJyk7XHJcblxyXG4gIC8vIGNyZWF0ZSBjb250ZW50cyBmb3IgYWNyb3NzIGNsdWVzIGRpdlxyXG4gIGZvciAoY29uc3QgY2x1ZSBvZiBnYW1lLnB1enpsZS5jbHVlcy5hY3Jvc3MpIHtcclxuICAgIGNvbnN0IHBhcnNlZENsdWUgPSBjbHVlLnNwbGl0KCcuJyk7XHJcbiAgICBjb25zdCBjbHVlTnVtYmVyID0gcGFyc2VJbnQocGFyc2VkQ2x1ZVswXSk7XHJcbiAgICBjb25zdCBjbHVlUmVmID0gcGFyc2VkQ2x1ZVswXSArICcuJztcclxuICAgIGNvbnN0IGNsdWVUZXh0ID0gcGFyc2VkQ2x1ZS5zbGljZSgxKS5qb2luKCcuJyk7XHJcbiAgICBjb25zdCBjbHVlRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjbHVlRGl2LmNsYXNzTGlzdC5hZGQoJ2Rpc3BsYXlGbGV4JywgJ2N1cnNvclBvaW50ZXInKTtcclxuICAgIGNsdWVEaXYuaWQgPSAnYWNyb3NzJyArIGNsdWVOdW1iZXI7XHJcbiAgICBpZiAoZ2FtZS5wdXp6bGUuY29tcGxldGVkQ2x1ZXMuYWNyb3NzLmluY2x1ZGVzKGNsdWVOdW1iZXIpKSB7XHJcbiAgICAgIGNsdWVEaXYuY2xhc3NMaXN0LmFkZCgnY29sb3JMaWdodEdyYXknKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBudW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG51bURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjbHVlUmVmKSk7XHJcbiAgICBudW1EaXYuY2xhc3NMaXN0LmFkZCgncGFkUmlnaHQnLCAnY3Vyc29yUG9pbnRlcicpO1xyXG5cclxuICAgIGNvbnN0IHRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRleHREaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2x1ZVRleHQpKTtcclxuICAgIHRleHREaXYuY2xhc3NMaXN0LmFkZCgnY3Vyc29yUG9pbnRlcicpO1xyXG4gICAgY2x1ZURpdi5hcHBlbmRDaGlsZChudW1EaXYpO1xyXG4gICAgY2x1ZURpdi5hcHBlbmRDaGlsZCh0ZXh0RGl2KTtcclxuICAgIGFjcm9zc0NsdWVzLmFwcGVuZENoaWxkKGNsdWVEaXYpO1xyXG4gIH1cclxuXHJcbiAgLy8gY3JlYXRlIGNvbnRlbnRzIGZvciBkb3duIGNsdWVzIGRpdlxyXG4gIGZvciAoY29uc3QgY2x1ZSBvZiBnYW1lLnB1enpsZS5jbHVlcy5kb3duKSB7XHJcbiAgICBjb25zdCBwYXJzZWRDbHVlID0gY2x1ZS5zcGxpdCgnLicpO1xyXG4gICAgY29uc3QgY2x1ZU51bWJlciA9IHBhcnNlSW50KHBhcnNlZENsdWVbMF0pO1xyXG4gICAgY29uc3QgY2x1ZVJlZiA9IHBhcnNlZENsdWVbMF0gKyAnLic7XHJcbiAgICBjb25zdCBjbHVlVGV4dCA9IHBhcnNlZENsdWUuc2xpY2UoMSkuam9pbignLicpO1xyXG4gICAgY29uc3QgY2x1ZURpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY2x1ZURpdi5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5RmxleCcsICdjdXJzb3JQb2ludGVyJyk7XHJcbiAgICBjbHVlRGl2LmlkID0gJ2Rvd24nICsgY2x1ZU51bWJlcjtcclxuICAgIGlmIChnYW1lLnB1enpsZS5jb21wbGV0ZWRDbHVlcy5kb3duLmluY2x1ZGVzKGNsdWVOdW1iZXIpKSB7XHJcbiAgICAgIGNsdWVEaXYuY2xhc3NMaXN0LmFkZCgnY29sb3JMaWdodEdyYXknKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBudW1EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIG51bURpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjbHVlUmVmKSk7XHJcbiAgICBudW1EaXYuY2xhc3NMaXN0LmFkZCgncGFkUmlnaHQnLCAnY3Vyc29yUG9pbnRlcicpO1xyXG5cclxuICAgIGNvbnN0IHRleHREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHRleHREaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY2x1ZVRleHQpKTtcclxuICAgIHRleHREaXYuY2xhc3NMaXN0LmFkZCgnY3Vyc29yUG9pbnRlcicpO1xyXG4gICAgY2x1ZURpdi5hcHBlbmRDaGlsZChudW1EaXYpO1xyXG4gICAgY2x1ZURpdi5hcHBlbmRDaGlsZCh0ZXh0RGl2KTtcclxuICAgIGRvd25DbHVlcy5hcHBlbmRDaGlsZChjbHVlRGl2KTtcclxuICB9XHJcblxyXG4gIGFjcm9zc0NsdWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCAhPT0gJycpIHtcclxuICAgICAgY2x1ZUNsaWNrZWQoZXZlbnQsICdhY3Jvc3MnKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgZG93bkNsdWVzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0LmlubmVyVGV4dCAhPT0gJycpIHtcclxuICAgICAgY2x1ZUNsaWNrZWQoZXZlbnQsICdkb3duJyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHNjb3Jlcy5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIHNjb3Jlcy5jbGFzc0xpc3QuYWRkKCdkaXNwbGF5RmxleCcpO1xyXG4gIGNvbnN0IG1lID1cclxuICAgIGdldEN1cnJlbnRVc2VyQ29udHJvbGxlcigpLnVpZCA9PT0gZ2FtZS5pbml0aWF0b3IudWlkXHJcbiAgICAgID8gJ2luaXRpYXRvcidcclxuICAgICAgOiAnb3Bwb25lbnQnO1xyXG4gIGNvbnN0IHRoZXkgPSBtZSA9PT0gJ2luaXRpYXRvcicgPyAnb3Bwb25lbnQnIDogJ2luaXRpYXRvcic7XHJcbiAgbGV0IG15Tmlja25hbWUgPSBnYW1lW21lXS5kaXNwbGF5TmFtZTtcclxuICBsZXQgb3BwTmlja25hbWUgPSBnYW1lW3RoZXldLmRpc3BsYXlOYW1lO1xyXG5cclxuICBteU5pY2tuYW1lID0gbXlOaWNrbmFtZS5zcGxpdCgnICcpWzBdO1xyXG4gIG15Tmlja25hbWUgPSBteU5pY2tuYW1lLmxlbmd0aCA+IDggPyBteU5pY2tuYW1lLnNsaWNlKDAsIDgpIDogbXlOaWNrbmFtZTtcclxuICBteU5hbWUuaW5uZXJUZXh0ID0gbXlOaWNrbmFtZTtcclxuICBvcHBOaWNrbmFtZSA9IG9wcE5pY2tuYW1lLnNwbGl0KCcgJylbMF07XHJcbiAgb3BwTmlja25hbWUgPSBvcHBOaWNrbmFtZS5sZW5ndGggPiA4ID8gb3BwTmlja25hbWUuc2xpY2UoMCwgOCkgOiBvcHBOaWNrbmFtZTtcclxuICBvcHBOYW1lLmlubmVyVGV4dCA9IG9wcE5pY2tuYW1lO1xyXG4gIGlmIChnYW1lLmVtcHR5U3F1YXJlcyA9PT0gMCkge1xyXG4gICAgbGV0IHJlc3VsdCA9ICdZT1UgV09OISEnO1xyXG4gICAgaWYgKGdhbWVbbWVdLnNjb3JlIDwgZ2FtZVt0aGV5XS5zY29yZSkge1xyXG4gICAgICByZXN1bHQgPSAnWW91IGxvc3QnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmVzdWx0ID0gJ1RpZSBnYW1lISc7XHJcbiAgICB9XHJcbiAgICBpZiAoIWdhbWUuaGlkZVJlcGxheSkge1xyXG4gICAgICBzaG93UmVwbGF5RGlhbG9nKGdhbWUsIHJlc3VsdCk7XHJcbiAgICAgIHNhdmVQdXp6bGVDb250cm9sbGVyKHsgaGlkZVJlcGxheTogdHJ1ZSB9KTtcclxuICAgIH1cclxuICAgIGNvbmNlc3Npb25CdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29uY2Vzc2lvbkJ0bkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIH1cclxuICB1cGRhdGVTY29yZWJvYXJkKGdhbWUpO1xyXG4gIGNvbnNvbGUubG9nKGdhbWUpO1xyXG4gIC8vIFRPRE86IHNob3VsZCB0aGlzIGdvIGhlcmU/XHJcbiAgbG9jYXRpb24uaGFzaCA9ICcjcHV6emxlJztcclxufVxyXG5cclxuLyoqXHJcbiAqIFNldHMgdGhlIHZhcmlhYmxlIGN1cnJlbnRDZWxsIHRvIHRoZSBjZWxsIHRoZSB1c2VyIGNsaWNrZWQgaW5cclxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgTW91c2UgY2xpY2sgb3Igc2NyZWVuIHRvdWNoIGV2ZW50XHJcbiAqL1xyXG5mdW5jdGlvbiBjZWxsQ2xpY2tlZChldmVudCkge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGNlbGxDbGlja2VkLicpO1xyXG4gIGNvbnN0IGNlbGwgPSBldmVudC50YXJnZXQ7XHJcbiAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gIGNvbnN0IGNvbCA9IGNlbGwuY2VsbEluZGV4O1xyXG4gIGxldCBhY3Jvc3NXb3JkID0gZ2V0QWNyb3NzV29yZENvbnRyb2xsZXIoKTtcclxuICAvLyBjb25zdCBpbmRleCA9IHJvdyAqIGdldENvbHVtbnNDb250cm9sbGVyKCkgKyBjb2w7XHJcbiAgLy8gY29uc29sZS5sb2coY2VsbC5jZWxsSW5kZXgpO1xyXG4gIC8vIGNvbnNvbGUubG9nKGNlbGwucGFyZW50RWxlbWVudC5yb3dJbmRleCk7XHJcbiAgLy8gY29uc29sZS5sb2coZXZlbnQpO1xyXG5cclxuICBpZiAoY2VsbC5jbGFzc05hbWUgPT09ICdibGFjaycpIHtcclxuICAgIHJldHVybjtcclxuICB9XHJcbiAgLy8gVE9ETzogdW5jb21tZW50IGJlbG93IGlmIGNsZWFyaW5nIGFsbCBsZXR0ZXJzIGZyb20gcHJldmlvdXMgc2VsZWN0aW9uIGlzIGRlc2lyZWRcclxuICAvLyBpZiAoIWdldElkeEFycmF5Q29udHJvbGxlcigpLmluY2x1ZGVzKGluZGV4KSkge1xyXG4gIC8vICAgY2xlYXJMZXR0ZXJzKCk7XHJcbiAgLy8gfVxyXG4gIGlmIChjdXJyZW50Q2VsbCAmJiBjdXJyZW50Q2VsbCA9PT0gY2VsbCkge1xyXG4gICAgLy8gY2xlYXJMZXR0ZXJzKCk7XHJcbiAgICBhY3Jvc3NXb3JkID0gIWFjcm9zc1dvcmQ7XHJcbiAgICBzZXRBY3Jvc3NXb3JkQ29udHJvbGxlcihhY3Jvc3NXb3JkKTtcclxuICB9XHJcbiAgc2V0SWR4QXJyYXlDb250cm9sbGVyKFtdKTtcclxuICBjdXJyZW50Q2VsbCA9IGNlbGw7XHJcbiAgaWYgKGFjcm9zc1dvcmQpIHtcclxuICAgIHNlbGVjdEFjcm9zcyhjZWxsKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2VsZWN0RG93bihjZWxsKTtcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBXaGVuIGNsdWUgaXMgY2xpY2tlZCwgdGhpcyBldmVudCBmaXJlc1xyXG4gKiBAcGFyYW0ge0V2ZW50fSBldmVudCBNb3VzZSBjbGljayBvciBzY3JlZW4gdG91Y2ggZXZlbnRcclxuICogQHBhcmFtIHtzdHJpbmd9IGRpcmVjdGlvbiBDbHVlIGRpcmVjdGlvbiAoYWNyb3NzIG9yIGRvd24pXHJcbiAqL1xyXG5mdW5jdGlvbiBjbHVlQ2xpY2tlZChldmVudCwgZGlyZWN0aW9uKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gY2x1ZUNsaWNrZWQuJyk7XHJcbiAgbGV0IGNsdWVOdW1iZXJUZXh0ID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZmlyc3RDaGlsZC5pbm5lclRleHQ7XHJcbiAgY2x1ZU51bWJlclRleHQgPSBjbHVlTnVtYmVyVGV4dC5zbGljZSgwLCBjbHVlTnVtYmVyVGV4dC5pbmRleE9mKCcuJykpO1xyXG4gIGNvbnN0IGdhbWUgPSBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCBjb2x1bW5zID0gZ2V0Q29sdW1uc0NvbnRyb2xsZXIoKTtcclxuICBjb25zdCBjZWxsSW5kZXggPSBnYW1lLmNsdWVOdW1JbmRpY2VzW2NsdWVOdW1iZXJUZXh0XTtcclxuICBjb25zdCByb3cgPSBNYXRoLmZsb29yKGNlbGxJbmRleCAvIGNvbHVtbnMpO1xyXG4gIGNvbnN0IGNvbCA9IGNlbGxJbmRleCAtIHJvdyAqIGNvbHVtbnM7XHJcbiAgY29uc3QgY2VsbCA9IHB1elRhYmxlLmZpcnN0Q2hpbGQuY2hpbGRyZW5bcm93XS5jaGlsZHJlbltjb2xdO1xyXG4gIGlmIChkaXJlY3Rpb24gPT09ICdhY3Jvc3MnKSB7XHJcbiAgICBzZWxlY3RBY3Jvc3MoY2VsbCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHNlbGVjdERvd24oY2VsbCk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogVXBkYXRlIHNjb3JlcyBpbiB0aGUgc2NvcmVib2FyZC5cclxuICogQHBhcmFtIHtvYmplY3R9IGdhbWUgQ3VycmVudCBnYW1lIG9iamVjdFxyXG4gKi9cclxuZnVuY3Rpb24gdXBkYXRlU2NvcmVib2FyZChnYW1lKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gdXBkYXRlU2NvcmVib2FyZC4nKTtcclxuICBjb25zdCBtZSA9XHJcbiAgICBnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIoKS51aWQgPT09IGdhbWUuaW5pdGlhdG9yLnVpZFxyXG4gICAgICA/ICdpbml0aWF0b3InXHJcbiAgICAgIDogJ29wcG9uZW50JztcclxuICBjb25zdCB0aGV5ID0gbWUgPT09ICdpbml0aWF0b3InID8gJ29wcG9uZW50JyA6ICdpbml0aWF0b3InO1xyXG4gIG15U2NvcmUuaW5uZXJUZXh0ID0gZ2FtZVttZV0uc2NvcmU7XHJcbiAgb3BwU2NvcmUuaW5uZXJUZXh0ID0gZ2FtZVt0aGV5XS5zY29yZTtcclxuICBteU5hbWUuY2xhc3NMaXN0LmFkZChnYW1lW21lXS5iZ0NvbG9yLnJlcGxhY2UoJ2JnJywgJ2ZvbnQnKSk7XHJcbiAgb3BwTmFtZS5jbGFzc0xpc3QuYWRkKGdhbWVbdGhleV0uYmdDb2xvci5yZXBsYWNlKCdiZycsICdmb250JykpO1xyXG4gIGlmIChnYW1lLm5leHRUdXJuID09PSBnYW1lW21lXS51aWQpIHtcclxuICAgIHNjb3Jlcy5jaGlsZHJlblswXS5jbGFzc0xpc3QucmVtb3ZlKCdiZ0NvbG9yVHJhbnNXaGl0ZScpO1xyXG4gICAgc2NvcmVzLmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5hZGQoJ2JnQ29sb3JUcmFuc0dvbGQnKTtcclxuICAgIHNjb3Jlcy5jaGlsZHJlblsyXS5jbGFzc0xpc3QucmVtb3ZlKCdiZ0NvbG9yVHJhbnNHb2xkJyk7XHJcbiAgICBzY29yZXMuY2hpbGRyZW5bMl0uY2xhc3NMaXN0LmFkZCgnYmdDb2xvclRyYW5zV2hpdGUnKTtcclxuICB9IGVsc2Uge1xyXG4gICAgc2NvcmVzLmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2JnQ29sb3JUcmFuc0dvbGQnKTtcclxuICAgIHNjb3Jlcy5jaGlsZHJlblswXS5jbGFzc0xpc3QuYWRkKCdiZ0NvbG9yVHJhbnNXaGl0ZScpO1xyXG4gICAgc2NvcmVzLmNoaWxkcmVuWzJdLmNsYXNzTGlzdC5yZW1vdmUoJ2JnQ29sb3JUcmFuc1doaXRlJyk7XHJcbiAgICBzY29yZXMuY2hpbGRyZW5bMl0uY2xhc3NMaXN0LmFkZCgnYmdDb2xvclRyYW5zR29sZCcpO1xyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgbGV0dGVyIChpZiBwcmVzZW50KSBmcm9tIGN1cnJlbnQgY2VsbCBhbmQgbW92ZXNcclxuICogYmFja3dhcmQgb25lIHNwYWNlXHJcbiAqL1xyXG5mdW5jdGlvbiB1bmRvRW50cnkoKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gdW5kb0VudHJ5LicpO1xyXG4gIGNvbnN0IGNvbHVtbnMgPSBnZXRDb2x1bW5zQ29udHJvbGxlcigpO1xyXG4gIGNvbnN0IGdhbWUgPSBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKTtcclxuICBpZiAoY3VycmVudENlbGwpIHtcclxuICAgIGxldCByb3cgPSBjdXJyZW50Q2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gICAgbGV0IGNvbCA9IGN1cnJlbnRDZWxsLmNlbGxJbmRleDtcclxuICAgIGNvbnN0IGluZGV4ID0gcm93ICogY29sdW1ucyArIGNvbDtcclxuICAgIC8vIHJldmVyc2UgY29weSBpZHhBcnJheSBzbyB3ZSBnbyBiYWNrd2FyZHMgaW5zdGVhZCBvZiBmb3J3YXJkc1xyXG4gICAgbGV0IGxvY2FsSWR4QXJyYXkgPSBbXTtcclxuICAgIGNvbnN0IGlkeEFycmF5ID0gZ2V0SWR4QXJyYXlDb250cm9sbGVyKCk7XHJcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IGlkeEFycmF5Lmxlbmd0aDsgaSA8IGlkeEFycmF5Lmxlbmd0aDsgaSsrLCBqLS0pIHtcclxuICAgICAgbG9jYWxJZHhBcnJheVtpXSA9IGlkeEFycmF5W2ogLSAxXTtcclxuICAgIH1cclxuICAgIGNvbnN0IG5leHRDZWxsSW5kZXggPSBsb2NhbElkeEFycmF5LmluZGV4T2YoaW5kZXgpICsgMTtcclxuICAgIGxvY2FsSWR4QXJyYXkgPSBsb2NhbElkeEFycmF5XHJcbiAgICAgIC5zbGljZShuZXh0Q2VsbEluZGV4KVxyXG4gICAgICAuY29uY2F0KGxvY2FsSWR4QXJyYXkuc2xpY2UoMCwgbmV4dENlbGxJbmRleCkpO1xyXG4gICAgY29uc3QgbGV0dGVyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhpZHhBcnJheSk7XHJcbiAgICAvLyBjb25zb2xlLmxvZyhsb2NhbElkeEFycmF5KTtcclxuXHJcbiAgICBpZiAoZ2FtZS5wdXp6bGUuZ3JpZFtpbmRleF0uc3RhdHVzID09PSAnbG9ja2VkJykge1xyXG4gICAgICAvLyBhbGVydCgnU29ycnksIHRoYXQgc3F1YXJlIGlzIGxvY2tlZCBieSBhIHByZXZpb3VzIGFuc3dlcicpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXR0ZXJEaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoJycpKTtcclxuICAgIGxldHRlckRpdi5jbGFzc0xpc3QuYWRkKCdtYXJnaW5BdXRvJyk7XHJcbiAgICBjdXJyZW50Q2VsbC5jaGlsZHJlblswXS5yZXBsYWNlQ2hpbGQoXHJcbiAgICAgIGxldHRlckRpdixcclxuICAgICAgY3VycmVudENlbGwuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF1cclxuICAgICk7XHJcbiAgICBjdXJyZW50Q2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdjdXJyQ2VsbEhpZ2hsaWdodCcpO1xyXG4gICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgncmFuZ2VIaWdobGlnaHQnKTtcclxuICAgIGZvciAoY29uc3QgaWR4IG9mIGxvY2FsSWR4QXJyYXkpIHtcclxuICAgICAgaWYgKGdhbWUucHV6emxlLmdyaWRbaWR4XS5zdGF0dXMgIT09ICdsb2NrZWQnKSB7XHJcbiAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpZHggLyBjb2x1bW5zKTtcclxuICAgICAgICBjb2wgPSBpZHggLSByb3cgKiBjb2x1bW5zO1xyXG4gICAgICAgIGN1cnJlbnRDZWxsID0gcHV6VGFibGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bcm93XS5jaGlsZHJlbltjb2xdO1xyXG4gICAgICAgIGN1cnJlbnRDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlSGlnaGxpZ2h0Jyk7XHJcbiAgICAgICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgnY3VyckNlbGxIaWdobGlnaHQnKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIENhbGN1bGF0ZXMgd2lkdGgvaGVpZ2h0IGRpbWVuc2lvbiBvZiBzaW5nbGUgY2VsbCBpbiBweFxyXG4gKiBAcmV0dXJuIHtudW1iZXJ9IGRpbWVuc2lvblxyXG4gKi9cclxuZnVuY3Rpb24gZ2V0Q2VsbERpbSgpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBnZXRDZWxsRGltLicpO1xyXG4gIGNvbnN0IHB1elRhYmxlV2lkdGggPSBwdXpUYWJsZS5vZmZzZXRXaWR0aDtcclxuICByZXR1cm4gTWF0aC5mbG9vcihwdXpUYWJsZVdpZHRoIC8gZ2V0Q29sdW1uc0NvbnRyb2xsZXIoKSk7XHJcbn1cclxuXHJcbi8qKiBDbGVhcnMgbGV0dGVycyB3aGVuIHVzZXIgY2hhbmdlcyB0byBhIGRpZmZlcmVudCBjbHVlICovXHJcbmZ1bmN0aW9uIGNsZWFyTGV0dGVycygpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBjbGVhckxldHRlcnMuJyk7XHJcbiAgY29uc3QgaWR4QXJyYXkgPSBnZXRJZHhBcnJheUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCBnYW1lID0gZ2V0Q3VycmVudEdhbWVDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgY29sdW1ucyA9IGdldENvbHVtbnNDb250cm9sbGVyKCk7XHJcbiAgZm9yIChjb25zdCBpbmRleCBvZiBpZHhBcnJheSkge1xyXG4gICAgaWYgKGdhbWUucHV6emxlLmdyaWRbaW5kZXhdLnN0YXR1cyA9PT0gJ2xvY2tlZCcpIGNvbnRpbnVlO1xyXG4gICAgZ2FtZS5wdXp6bGUuZ3JpZFtpbmRleF0uZ3Vlc3MgPSAnJztcclxuICAgIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoaW5kZXggLyBjb2x1bW5zKTtcclxuICAgIGNvbnN0IGNvbCA9IGluZGV4IC0gcm93ICogY29sdW1ucztcclxuICAgIHB1elRhYmxlLmZpcnN0Q2hpbGQuY2hpbGRyZW5bcm93XS5jaGlsZHJlbltcclxuICAgICAgY29sXHJcbiAgICBdLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5pbm5lclRleHQgPSAnJztcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBIaWdobGlnaHRzIGFuIGFjcm9zcyBjbHVlIGFuZCBsb2NhdGlvbiBpbiBwdXp6bGUgYmFzZWQgb24gd2hpY2ggY2VsbFxyXG4gKiB0aGUgdXNlciBjbGlja3NcclxuICogQHBhcmFtIHtPYmplY3R9IGNlbGwgQ2VsbCB0aGUgdXNlciBjbGlja2VkXHJcbiAqL1xyXG5mdW5jdGlvbiBzZWxlY3RBY3Jvc3MoY2VsbCkge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIHNlbGVjdEFjcm9zcy4nKTtcclxuICBjb25zdCBnYW1lID0gZ2V0Q3VycmVudEdhbWVDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgY29sdW1ucyA9IGdldENvbHVtbnNDb250cm9sbGVyKCk7XHJcbiAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gIGNvbnN0IGNvbCA9IGNlbGwuY2VsbEluZGV4O1xyXG4gIGNvbnN0IHJvd09mZnNldCA9IHJvdyAqIGNvbHVtbnM7XHJcbiAgY29uc3QgaW5kZXggPSByb3cgKiBjb2x1bW5zICsgY29sO1xyXG5cclxuICBjbGVhckhpZ2hsaWdodHMoKTtcclxuICBjb25zdCBpZHhBcnJheSA9IGdldFdvcmRCbG9jayhjZWxsLCAnYWNyb3NzJyk7XHJcbiAgc2V0SWR4QXJyYXlDb250cm9sbGVyKGlkeEFycmF5KTtcclxuICBjb25zdCBjdXJyZW50Q2x1ZSA9IGdhbWUucHV6emxlLmdyaWRbaWR4QXJyYXlbMF1dLmNsdWVOdW07XHJcbiAgZm9yIChjb25zdCBjbHVlIG9mIGFjcm9zc0NsdWVzLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBjbHVlTnVtU3RyID0gY2x1ZS5jaGlsZHJlblswXS50ZXh0Q29udGVudC5zcGxpdCgnLicpWzBdO1xyXG4gICAgaWYgKGNsdWVOdW1TdHIgPT09IGN1cnJlbnRDbHVlLnRvU3RyaW5nKCkpIHtcclxuICAgICAgY2x1ZS5jbGFzc0xpc3QuYWRkKCdyYW5nZUhpZ2hsaWdodCcsICdjbHVlUG9wJyk7XHJcbiAgICAgIGFjcm9zc0NsdWVzLnNjcm9sbEJ5KHtcclxuICAgICAgICB0b3A6IGNsdWUub2Zmc2V0VG9wIC0gMTAwIC0gYWNyb3NzQ2x1ZXMuc2Nyb2xsVG9wLFxyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxyXG4gICAgICB9KTtcclxuICAgICAgc2luZ2xlQ2x1ZS5pbm5lclRleHQgPSBjbHVlLmNoaWxkcmVuWzFdLnRleHRDb250ZW50O1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcbiAgbGV0IGN1cnJlbnRDb2wgPSBpbmRleCAtIHJvd09mZnNldDtcclxuICBsZXQgY3VycmVudENlbGwgPSBjZWxsLnBhcmVudEVsZW1lbnQuY2hpbGRyZW5bY3VycmVudENvbF07XHJcbiAgY2VsbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuW2lkeEFycmF5WzBdIC0gcm93T2Zmc2V0XS5jbGFzc0xpc3QuYWRkKFxyXG4gICAgJ2JvcmRlcjJweExlZnQnXHJcbiAgKTtcclxuICBmb3IgKGNvbnN0IGlkeCBvZiBpZHhBcnJheSkge1xyXG4gICAgY3VycmVudENvbCA9IGlkeCAtIHJvd09mZnNldDtcclxuICAgIGN1cnJlbnRDZWxsID0gY2VsbC5wYXJlbnRFbGVtZW50LmNoaWxkcmVuW2N1cnJlbnRDb2xdO1xyXG4gICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgnYm9yZGVyMnB4VG9wJywgJ2JvcmRlcjJweEJvdHRvbScpO1xyXG4gICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZChcclxuICAgICAgY3VycmVudENvbCA9PT0gY29sID8gJ2N1cnJDZWxsSGlnaGxpZ2h0JyA6ICdyYW5nZUhpZ2hsaWdodCdcclxuICAgICk7XHJcbiAgfVxyXG4gIGNlbGwucGFyZW50RWxlbWVudC5jaGlsZHJlbltcclxuICAgIGlkeEFycmF5W2lkeEFycmF5Lmxlbmd0aCAtIDFdIC0gcm93T2Zmc2V0XHJcbiAgXS5jbGFzc0xpc3QuYWRkKCdib3JkZXIycHhSaWdodCcpO1xyXG59XHJcblxyXG4vKipcclxuICogSGlnaGxpZ2h0cyBhIGRvd24gY2x1ZSBhbmQgbG9jYXRpb24gaW4gcHV6emxlIGJhc2VkIG9uIHdoaWNoIGNlbGxcclxuICogdGhlIHVzZXIgY2xpY2tzXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBjZWxsIENlbGwgdGhlIHVzZXIgY2xpY2tlZFxyXG4gKi9cclxuZnVuY3Rpb24gc2VsZWN0RG93bihjZWxsKSB7XHJcbiAgY29uc29sZS5sb2coJ0hlbGxvIGZyb20gc2VsZWN0RG93bi4nKTtcclxuICBjb25zdCBnYW1lID0gZ2V0Q3VycmVudEdhbWVDb250cm9sbGVyKCk7XHJcbiAgY29uc3QgY29sdW1ucyA9IGdldENvbHVtbnNDb250cm9sbGVyKCk7XHJcbiAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gIGNvbnN0IGNvbCA9IGNlbGwuY2VsbEluZGV4O1xyXG4gIGNvbnN0IGluZGV4ID0gcm93ICogY29sdW1ucyArIGNvbDtcclxuXHJcbiAgY2xlYXJIaWdobGlnaHRzKCk7XHJcbiAgY29uc3QgaWR4QXJyYXkgPSBnZXRXb3JkQmxvY2soY2VsbCwgJ2Rvd24nKTtcclxuICBzZXRJZHhBcnJheUNvbnRyb2xsZXIoaWR4QXJyYXkpO1xyXG4gIC8vIGdldCB0aGUgbnVtYmVyIG9mIHRoZSBjbHVlIG51bWJlclxyXG4gIGNvbnN0IGN1cnJlbnRDbHVlID0gZ2FtZS5wdXp6bGUuZ3JpZFtpZHhBcnJheVswXV0uY2x1ZU51bTtcclxuICBmb3IgKGNvbnN0IGNsdWUgb2YgZG93bkNsdWVzLmNoaWxkcmVuKSB7XHJcbiAgICBjb25zdCBjbHVlTnVtU3RyID0gY2x1ZS5jaGlsZHJlblswXS50ZXh0Q29udGVudC5zcGxpdCgnLicpWzBdO1xyXG4gICAgaWYgKGNsdWVOdW1TdHIgPT09IGN1cnJlbnRDbHVlLnRvU3RyaW5nKCkpIHtcclxuICAgICAgY2x1ZS5jbGFzc0xpc3QuYWRkKCdyYW5nZUhpZ2hsaWdodCcsICdjbHVlUG9wJyk7XHJcbiAgICAgIGRvd25DbHVlcy5zY3JvbGxCeSh7XHJcbiAgICAgICAgdG9wOiBjbHVlLm9mZnNldFRvcCAtIDEwMCAtIGRvd25DbHVlcy5zY3JvbGxUb3AsXHJcbiAgICAgICAgbGVmdDogMCxcclxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXHJcbiAgICAgIH0pO1xyXG4gICAgICBzaW5nbGVDbHVlLmlubmVyVGV4dCA9IGNsdWUuY2hpbGRyZW5bMV0udGV4dENvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGxldCBjdXJyZW50Um93ID0gTWF0aC5mbG9vcihpbmRleCAvIGNvbHVtbnMpO1xyXG4gIGxldCBjdXJyZW50Q2VsbCA9IHB1elRhYmxlLmNoaWxkcmVuWzBdLmNoaWxkcmVuW2N1cnJlbnRSb3ddLmNoaWxkcmVuW2NvbF07XHJcbiAgcHV6VGFibGUuY2hpbGRyZW5bMF0uY2hpbGRyZW5bTWF0aC5mbG9vcihpZHhBcnJheVswXSAvIGNvbHVtbnMpXS5jaGlsZHJlbltcclxuICAgIGNvbFxyXG4gIF0uY2xhc3NMaXN0LmFkZCgnYm9yZGVyMnB4VG9wJyk7XHJcbiAgZm9yIChjb25zdCBpZHggb2YgaWR4QXJyYXkpIHtcclxuICAgIGN1cnJlbnRSb3cgPSBNYXRoLmZsb29yKGlkeCAvIGNvbHVtbnMpO1xyXG4gICAgY3VycmVudENlbGwgPSBwdXpUYWJsZS5jaGlsZHJlblswXS5jaGlsZHJlbltjdXJyZW50Um93XS5jaGlsZHJlbltjb2xdO1xyXG4gICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgnYm9yZGVyMnB4TGVmdCcsICdib3JkZXIycHhSaWdodCcpO1xyXG4gICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZChcclxuICAgICAgY3VycmVudFJvdyA9PT0gcm93ID8gJ2N1cnJDZWxsSGlnaGxpZ2h0JyA6ICdyYW5nZUhpZ2hsaWdodCdcclxuICAgICk7XHJcbiAgfVxyXG4gIHB1elRhYmxlLmNoaWxkcmVuWzBdLmNoaWxkcmVuW1xyXG4gICAgTWF0aC5mbG9vcihpZHhBcnJheVtpZHhBcnJheS5sZW5ndGggLSAxXSAvIGNvbHVtbnMpXHJcbiAgXS5jaGlsZHJlbltjb2xdLmNsYXNzTGlzdC5hZGQoJ2JvcmRlcjJweEJvdHRvbScpO1xyXG59XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhbiBhcnJheSBvZiBpbmRpY2VzIG9mIGNlbGxzIHRoYXQgbWFrZSB1cCBhIHdvcmQgYmxvY2sgaW5cclxuICogdGhlIGN1cnJlbnQgcHV6emxlLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gY2VsbCBDZWxsIGluIHB1enpsZVxyXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlyZWN0aW9uIERpcmVjdGlvbiAoYWNyb3NzIG9yIGRvd24pXHJcbiAqIEByZXR1cm4ge2FycmF5fSBBcnJheSBvZiBpbmRpY2VzIHRoYXQgbWFrZSB1cCBhIHdvcmQgYmxvY2tcclxuICovXHJcbmZ1bmN0aW9uIGdldFdvcmRCbG9jayhjZWxsLCBkaXJlY3Rpb24pIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBnZXRXb3JkQmxvY2suJyk7XHJcbiAgY29uc3Qgcm93ID0gY2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gIGNvbnN0IGNvbCA9IGNlbGwuY2VsbEluZGV4O1xyXG4gIGNvbnN0IGdhbWUgPSBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCBjb2x1bW5zID0gZ2V0Q29sdW1uc0NvbnRyb2xsZXIoKTtcclxuICBsZXQgaW5kZXggPSByb3cgKiBjb2x1bW5zICsgY29sO1xyXG4gIGNvbnN0IGluZGV4QXJyYXkgPSBbXTtcclxuICBpZiAoZGlyZWN0aW9uID09PSAnYWNyb3NzJykge1xyXG4gICAgd2hpbGUgKGluZGV4ID4gcm93ICogY29sdW1ucyAmJiAhZ2FtZS5wdXp6bGUuZ3JpZFtpbmRleCAtIDFdLmJsYWNrKSB7XHJcbiAgICAgIGluZGV4LS07XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoaW5kZXggPCAocm93ICsgMSkgKiBjb2x1bW5zICYmICFnYW1lLnB1enpsZS5ncmlkW2luZGV4XS5ibGFjaykge1xyXG4gICAgICBpbmRleEFycmF5LnB1c2goaW5kZXgpO1xyXG4gICAgICBpbmRleCsrO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICB3aGlsZSAoaW5kZXggPj0gY29sdW1ucyAmJiAhZ2FtZS5wdXp6bGUuZ3JpZFtpbmRleCAtIGNvbHVtbnNdLmJsYWNrKSB7XHJcbiAgICAgIGluZGV4IC09IGNvbHVtbnM7XHJcbiAgICB9XHJcbiAgICB3aGlsZSAoXHJcbiAgICAgIGluZGV4IDwgZ2FtZS5wdXp6bGUucm93cyAqIGNvbHVtbnMgJiZcclxuICAgICAgIWdhbWUucHV6emxlLmdyaWRbaW5kZXhdLmJsYWNrXHJcbiAgICApIHtcclxuICAgICAgaW5kZXhBcnJheS5wdXNoKGluZGV4KTtcclxuICAgICAgaW5kZXggKz0gY29sdW1ucztcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGluZGV4QXJyYXk7XHJcbn1cclxuXHJcbi8qKiBSZW1vdmVzIGNsdWUgY2VsbCBoaWdobGlnaHRpbmcgZnJvbSBhbGwgY2VsbHMgKi9cclxuZnVuY3Rpb24gY2xlYXJIaWdobGlnaHRzKCkge1xyXG4gIGNvbnNvbGUubG9nKCdIZWxsbyBmcm9tIGNsZWFySGlnaGxpZ2h0cy4nKTtcclxuICAvLyBjb25zb2xlLmxvZyhwdXpUYWJsZS5jaGlsZHJlblswXSk7XHJcbiAgY29uc3Qgcm93QXJyYXkgPSBwdXpUYWJsZS5jaGlsZHJlblswXS5jaGlsZHJlbjtcclxuXHJcbiAgZm9yIChjb25zdCByb3cgb2Ygcm93QXJyYXkpIHtcclxuICAgIGZvciAoY29uc3QgY2VsbCBvZiByb3cuY2hpbGRyZW4pIHtcclxuICAgICAgaWYgKGNlbGwuY2xhc3NOYW1lICE9PSAnYmxhY2snKSB7XHJcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKFxyXG4gICAgICAgICAgJ3JhbmdlSGlnaGxpZ2h0JyxcclxuICAgICAgICAgICdjdXJyQ2VsbEhpZ2hsaWdodCcsXHJcbiAgICAgICAgICAnYm9yZGVyMnB4Qm90dG9tJyxcclxuICAgICAgICAgICdib3JkZXIycHhSaWdodCcsXHJcbiAgICAgICAgICAnYm9yZGVyMnB4TGVmdCcsXHJcbiAgICAgICAgICAnYm9yZGVyMnB4VG9wJ1xyXG4gICAgICAgICk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZm9yIChjb25zdCBjbHVlIG9mIGFjcm9zc0NsdWVzLmNoaWxkcmVuKSB7XHJcbiAgICBjbHVlLmNsYXNzTGlzdC5yZW1vdmUoJ3JhbmdlSGlnaGxpZ2h0JywgJ2NsdWVQb3AnKTtcclxuICB9XHJcbiAgZm9yIChjb25zdCBjbHVlIG9mIGRvd25DbHVlcy5jaGlsZHJlbikge1xyXG4gICAgY2x1ZS5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZUhpZ2hsaWdodCcsICdjbHVlUG9wJyk7XHJcbiAgfVxyXG59XHJcblxyXG4vKipcclxuICogU2hvdyBkaWFsb2cgZm9yIHVzZXIgdG8gZGVjaWRlIGlmIHRoZXkgd2FudCB0byByZXBsYXkgdGhlIG9wcG9uZW50XHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBnYW1lIFByZXZpb3VzIGdhbWUgdmVyc3VzIHRoZSBvcHBvbmVudFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzdWx0IE1lc3NhZ2UgYWJvdXQgd2hvIHdvblxyXG4gKi9cclxuZnVuY3Rpb24gc2hvd1JlcGxheURpYWxvZyhnYW1lLCByZXN1bHQpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBzaG93UmVwbGF5RGlhbG9nLicpO1xyXG4gIHdpbk1lc3NhZ2UuaW5uZXJUZXh0ID0gcmVzdWx0O1xyXG4gIGdhbWVPdmVySGVhZGluZy5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIHdpbk1lc3NhZ2UuY2xhc3NMaXN0LnJlbW92ZSgnZGlzcGxheU5vbmUnKTtcclxuICBvcHBvbmVudEhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICBvcHBvbmVudExpc3QuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICBnYW1lc0RpYWxvZy5jbGFzc0xpc3QucmVtb3ZlKCdoZWlnaHQ4MHBjdCcpO1xyXG4gIGdhbWVzRGlhbG9nLmNoaWxkcmVuWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ3BhZGRpbmcwJywgJ2hlaWdodDEwMHBjdCcpO1xyXG4gIHJlcGxheUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKCdkaXNwbGF5Tm9uZScpO1xyXG4gIHJlcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcGxheU9wcG9uZW50KTtcclxuICAvLyBsZXQgcmVwbGF5QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JlcGxheUJ1dHRvbicpO1xyXG4gIC8vIGlmICghcmVwbGF5QnV0dG9uKSB7XHJcbiAgLy8gICByZXBsYXlCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAvLyAgIHJlcGxheUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2lkJywgJ3JlcGxheUJ1dHRvbicpO1xyXG4gIC8vICAgcmVwbGF5QnV0dG9uLmNsYXNzTGlzdC5hZGQoXHJcbiAgLy8gICAgICdtZGwtYnV0dG9uJyxcclxuICAvLyAgICAgJ21kbC1qcy1idXR0b24nLFxyXG4gIC8vICAgICAnbWRsLWJ1dHRvbi0tcmFpc2VkJyxcclxuICAvLyAgICAgJ21kbC1qcy1yaXBwbGUtZWZmZWN0JyxcclxuICAvLyAgICAgJ21kbC1idXR0b24tLWFjY2VudCcsXHJcbiAgLy8gICAgICdjdXJzb3JQb2ludGVyJ1xyXG4gIC8vICAgKTtcclxuICAvLyAgIHJlcGxheUJ1dHRvbi5pbm5lclRleHQgPSAnUGxheSBBZ2FpbiEnO1xyXG4gIC8vICAgZ2FtZXNEaWFsb2cuY2hpbGRyZW5bMF0uYXBwZW5kQ2hpbGQocmVwbGF5QnV0dG9uKTtcclxuICAvLyAgIHJlcGxheUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHJlcGxheU9wcG9uZW50KTtcclxuICAvLyB9XHJcbiAgaWYgKGdhbWUuZGlmZmljdWx0eSA9PT0gJ21lZGl1bScpIHtcclxuICAgIHJhZGlvRWFzeS5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgIHJhZGlvSGFyZC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgIHJhZGlvTWVkLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xyXG4gIH0gZWxzZSBpZiAoZ2FtZS5kaWZmaWN1bHR5ID09PSAnaGFyZCcpIHtcclxuICAgIHJhZGlvRWFzeS5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgIHJhZGlvTWVkLnJlbW92ZUF0dHJpYnV0ZSgnY2hlY2tlZCcpO1xyXG4gICAgcmFkaW9IYXJkLnNldEF0dHJpYnV0ZSgnY2hlY2tlZCcsIHRydWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByYWRpb01lZC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgIHJhZGlvSGFyZC5yZW1vdmVBdHRyaWJ1dGUoJ2NoZWNrZWQnKTtcclxuICAgIHJhZGlvRWFzeS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCB0cnVlKTtcclxuICB9XHJcbiAgaWYgKCFnYW1lc0RpYWxvZy5vcGVuKSBnYW1lc0RpYWxvZy5zaG93TW9kYWwoKTtcclxufVxyXG5cclxuLyoqIExvYWQgZ2FtZSBiYXNlZCBvbiB1c2VyIHNlbGVjdGlvbiAqL1xyXG5mdW5jdGlvbiByZXBsYXlPcHBvbmVudCgpIHtcclxuICBjb25zdCBjdXJyZW50VXNlciA9IGdldEN1cnJlbnRVc2VyQ29udHJvbGxlcigpO1xyXG4gIGNvbnN0IGdhbWUgPSBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKTtcclxuICBsZXQgZGlmZmljdWx0eSA9IHJhZGlvTWVkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1jaGVja2VkJylcclxuICAgID8gJ21lZGl1bSdcclxuICAgIDogJ2Vhc3knO1xyXG4gIGRpZmZpY3VsdHkgPSByYWRpb0hhcmQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWNoZWNrZWQnKVxyXG4gICAgPyAnaGFyZCdcclxuICAgIDogZGlmZmljdWx0eTtcclxuICBjb25zdCB0aGV5ID1cclxuICAgIGN1cnJlbnRVc2VyLnVpZCA9PT0gZ2FtZS5pbml0aWF0b3IudWlkID8gJ29wcG9uZW50JyA6ICdpbml0aWF0b3InO1xyXG4gIC8vIEVtaXQgc3RhcnROZXdHYW1lIGV2ZW50IGZyb20gZXZlbnRCdXNcclxuICBjbG9zZUdhbWVzRGlhbG9nKCk7XHJcblxyXG4gIC8vIGxvYWQgcHV6emxlIGJhc2VkIG9uIHVpZHMgb2YgcGxheWVyc1xyXG4gIHN0YXJ0TmV3R2FtZUNvbnRyb2xsZXIoe1xyXG4gICAgaW5pdGlhdG9yOiB7XHJcbiAgICAgIHVpZDogY3VycmVudFVzZXIudWlkLFxyXG4gICAgICBkaXNwbGF5TmFtZTogY3VycmVudFVzZXIuZGlzcGxheU5hbWUsXHJcbiAgICB9LFxyXG4gICAgb3Bwb25lbnQ6IHtcclxuICAgICAgdWlkOiBnYW1lW3RoZXldLnVpZCxcclxuICAgICAgZGlzcGxheU5hbWU6IGdhbWVbdGhleV0uZGlzcGxheU5hbWUsXHJcbiAgICB9LFxyXG4gICAgZGlmZmljdWx0eTogZGlmZmljdWx0eSxcclxuICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBsZXR0ZXIgdG8gdGhlIHB1enpsZSBmcm9tIHBoeXNpY2FsIG9yIHZpcnR1YWwga2V5Ym9hcmQgZXZlbnQgYW5kXHJcbiAqIG1vdmVzIGZvcndhcmQgb25lIHNwYWNlXHJcbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IEtleWJvYXJkIG9yIHRvdWNoIGV2ZW50IGZyb20gcGh5c2ljYWwgb3IgdmlydHVhbFxyXG4gKiBrZXlib2FyZFxyXG4gKi9cclxuZnVuY3Rpb24gZW50ZXJMZXR0ZXIoZXZlbnQpIHtcclxuICBjb25zb2xlLmxvZygnSGVsbG8gZnJvbSBlbnRlckxldHRlci4nKTtcclxuICBjb25zdCBpZHhBcnJheSA9IGdldElkeEFycmF5Q29udHJvbGxlcigpO1xyXG4gIGNvbnN0IGdhbWUgPSBnZXRDdXJyZW50R2FtZUNvbnRyb2xsZXIoKTtcclxuICBjb25zdCBjb2x1bW5zID0gZ2V0Q29sdW1uc0NvbnRyb2xsZXIoKTtcclxuICBpZiAoIWtleWJvYXJkLmNsYXNzTGlzdC5jb250YWlucygnZGlzcGxheU5vbmUnKSkge1xyXG4gICAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIHBsYXlXb3JkQ29udHJvbGxlcigpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgbGV0dGVyO1xyXG4gICAgaWYgKGV2ZW50LmtleSkge1xyXG4gICAgICBsZXR0ZXIgPSBldmVudC5rZXk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgbm9kZSA9IGV2ZW50LnRhcmdldDtcclxuICAgICAgd2hpbGUgKCFub2RlLmNsYXNzTGlzdC5jb250YWlucygna2JCdXR0b24nKSkge1xyXG4gICAgICAgIG5vZGUgPSBub2RlLnBhcmVudE5vZGU7XHJcbiAgICAgIH1cclxuICAgICAgbGV0dGVyID0gbm9kZS5jaGlsZHJlblswXS5maXJzdENoaWxkLmRhdGEudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgaWYgKGxldHRlciAmJiBsZXR0ZXIudG9Mb3dlckNhc2UoKSA9PT0gJ2JhY2tzcGFjZScpIHtcclxuICAgICAgdW5kb0VudHJ5KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICghbGV0dGVyIHx8ICFsZXR0ZXIubWF0Y2goL15bYS16QS1aXSQvKSkgcmV0dXJuO1xyXG4gICAgaWYgKGN1cnJlbnRDZWxsKSB7XHJcbiAgICAgIGxldCByb3cgPSBjdXJyZW50Q2VsbC5wYXJlbnRFbGVtZW50LnJvd0luZGV4O1xyXG4gICAgICBsZXQgY29sID0gY3VycmVudENlbGwuY2VsbEluZGV4O1xyXG4gICAgICBjb25zdCBpbmRleCA9IHJvdyAqIGNvbHVtbnMgKyBjb2w7XHJcbiAgICAgIGNvbnN0IG5leHRDZWxsSW5kZXggPSBpZHhBcnJheS5pbmRleE9mKGluZGV4KSArIDE7XHJcbiAgICAgIGNvbnN0IGxvY2FsSWR4QXJyYXkgPSBpZHhBcnJheVxyXG4gICAgICAgIC5zbGljZShuZXh0Q2VsbEluZGV4KVxyXG4gICAgICAgIC5jb25jYXQoaWR4QXJyYXkuc2xpY2UoMCwgbmV4dENlbGxJbmRleCkpO1xyXG4gICAgICBjb25zdCBsZXR0ZXJEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgLy8gY29uc29sZS5sb2coaWR4QXJyYXkpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZyhsb2NhbElkeEFycmF5KTtcclxuXHJcbiAgICAgIGlmIChnYW1lLnB1enpsZS5ncmlkW2luZGV4XS5zdGF0dXMgPT09ICdsb2NrZWQnKSB7XHJcbiAgICAgICAgLy8gYWxlcnQoJ1NvcnJ5LCB0aGF0IHNxdWFyZSBpcyBsb2NrZWQgYnkgYSBwcmV2aW91cyBhbnN3ZXInKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgZW50ZXJMZXR0ZXJDb250cm9sbGVyKGxldHRlci50b1VwcGVyQ2FzZSgpLCBpbmRleCk7XHJcbiAgICAgIGxldHRlckRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShsZXR0ZXIudG9VcHBlckNhc2UoKSkpO1xyXG4gICAgICBsZXR0ZXJEaXYuY2xhc3NMaXN0LmFkZCgnbWFyZ2luQXV0bycpO1xyXG4gICAgICBjdXJyZW50Q2VsbC5jaGlsZHJlblswXS5yZXBsYWNlQ2hpbGQoXHJcbiAgICAgICAgbGV0dGVyRGl2LFxyXG4gICAgICAgIGN1cnJlbnRDZWxsLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdXHJcbiAgICAgICk7XHJcbiAgICAgIGN1cnJlbnRDZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ2N1cnJDZWxsSGlnaGxpZ2h0Jyk7XHJcbiAgICAgIGN1cnJlbnRDZWxsLmNsYXNzTGlzdC5hZGQoJ3JhbmdlSGlnaGxpZ2h0Jyk7XHJcbiAgICAgIGZvciAoY29uc3QgaWR4IG9mIGxvY2FsSWR4QXJyYXkpIHtcclxuICAgICAgICBpZiAoZ2FtZS5wdXp6bGUuZ3JpZFtpZHhdLnN0YXR1cyAhPT0gJ2xvY2tlZCcpIHtcclxuICAgICAgICAgIHJvdyA9IE1hdGguZmxvb3IoaWR4IC8gY29sdW1ucyk7XHJcbiAgICAgICAgICBjb2wgPSBpZHggLSByb3cgKiBjb2x1bW5zO1xyXG4gICAgICAgICAgY3VycmVudENlbGwgPSBwdXpUYWJsZS5jaGlsZHJlblswXS5jaGlsZHJlbltyb3ddLmNoaWxkcmVuW2NvbF07XHJcbiAgICAgICAgICBjdXJyZW50Q2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdyYW5nZUhpZ2hsaWdodCcpO1xyXG4gICAgICAgICAgY3VycmVudENlbGwuY2xhc3NMaXN0LmFkZCgnY3VyckNlbGxIaWdobGlnaHQnKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEFiYW5kb24gdGhlIGdhbWUgaW1tZWRpYXRlbHksIGFkZGluZyBhbGwgcmVtYWluaW5nXHJcbiAqIHBvaW50cyB0byBvcHBvbmVudCdzIHNjb3JlXHJcbiAqL1xyXG5jb25jZXNzaW9uQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHRvZ2dsZURyYXdlcigpO1xyXG4gIGNvbmNlc3Npb25CdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGlzcGxheU5vbmUnKTtcclxuICBhYmFuZG9uQ3VycmVudEdhbWVDb250cm9sbGVyKCk7XHJcbn0pO1xyXG5cclxuLyoqIFJlc2l6ZXMgcHV6emxlIGJhc2VkIG9uIGF2YWlsYWJsZSBzcGFjZSAqL1xyXG5mdW5jdGlvbiByZXNpemVQdXp6bGUoKSB7XHJcbiAgaWYgKHB1elRhYmxlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG4gIC8vIGNvbnNvbGUubG9nKHB1elRhYmxlLmNoaWxkcmVuWzBdKTtcclxuICBjb25zdCBjZWxsRGltID0gZ2V0Q2VsbERpbSgpO1xyXG4gIGNvbnN0IHRhYmxlRGltID0gY2VsbERpbSAqIGdldENvbHVtbnNDb250cm9sbGVyKCk7XHJcbiAgY29uc3Qgcm93QXJyYXkgPSBwdXpUYWJsZS5jaGlsZHJlblswXS5jaGlsZHJlbjtcclxuXHJcbiAgZm9yIChjb25zdCByb3cgb2Ygcm93QXJyYXkpIHtcclxuICAgIHJvdy5zdHlsZS53aWR0aCA9IHRhYmxlRGltICsgJ3B4JztcclxuICAgIGNvbnN0IGNlbGxBcnJheSA9IHJvdy5jaGlsZHJlbjtcclxuICAgIGZvciAoY29uc3QgY2VsbCBvZiBjZWxsQXJyYXkpIHtcclxuICAgICAgY2VsbC5zdHlsZS53aWR0aCA9IGNlbGxEaW0gKyAncHgnO1xyXG4gICAgICBjZWxsLnN0eWxlLmhlaWdodCA9IGNlbGxEaW0gKyAncHgnO1xyXG4gICAgfVxyXG4gIH1cclxuICBpZiAoY3VycmVudENlbGwpIHtcclxuICAgIGlmIChhY3Jvc3NXb3JkKSB7XHJcbiAgICAgIHNlbGVjdEFjcm9zcyhjdXJyZW50Q2VsbCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBzZWxlY3REb3duKGN1cnJlbnRDZWxsKTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZW50ZXJMZXR0ZXIpO1xyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplUHV6emxlKTtcclxuY29uc3Qga2V5TGlzdCA9IGtleWJvYXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2tiQnV0dG9uJyk7XHJcbmZvciAoY29uc3Qgbm9kZSBvZiBrZXlMaXN0KSB7XHJcbiAgbm9kZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGVudGVyTGV0dGVyKTtcclxufVxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZW50ZXInKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBsYXlXb3JkQ29udHJvbGxlcik7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZURyYXdlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlRHJhd2VyKTtcclxuXHJcbmV4cG9ydCB7IGF1dGhDaGFuZ2VWaWV3LCBzaWduZWRPdXRWaWV3LCBzaG93UHV6emxlVmlldywgbG9hZEdhbWVzVmlldyB9O1xyXG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIi8qIENPTU1PTiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuKixcXHJcXG4qOmJlZm9yZSxcXHJcXG4qOmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCAnSGVsdmV0aWNhJywgJ0FyaWFsJywgU2Fucy1TZXJpZjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5zZWxlY3Qge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgbWFyZ2luOiAwIDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5QmxvY2sge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5hbGlnbkl0ZW1zQ2VudGVyIHtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblNlbGZFbmQge1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblNlbGZDZW50ZXIge1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3Vyc29yUG9pbnRlciB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5kcmF3ZXJIZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGljQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDBweDtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucGhvdG9Dcm9wIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5Tm9uZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbmNyZWFzZWQgc3BlY2lmaWNpdHkgcmVxdWlyZWQgZm9yIHByZWNlZGVuY2UgKi9cXHJcXG4jcmV0dXJuVG9TaWduaW4uZGlzcGxheU5vbmUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogSW5jcmVhc2VkIHNwZWNpZmljaXR5IHJlcXVpcmVkIGZvciBwcmVjZWRlbmNlICovXFxyXFxuI3JlcGxheUJ1dHRvbi5kaXNwbGF5Tm9uZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VyckNlbGxIaWdobGlnaHQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcclxcbn1cXHJcXG5cXHJcXG4ucmFuZ2VIaWdobGlnaHQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZDtcXHJcXG59XFxyXFxuXFxyXFxuLm1kbC1saXN0X19pdGVtOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiOGI4Yjg7XFxyXFxufVxcclxcblxcclxcbi8qIEVORCBDT01NT04gKi9cXHJcXG5cXHJcXG4vKiBDTFVFUyAqL1xcclxcblxcclxcbi5oZWFkaW5nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgcGFkZGluZzogMCAwIDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50ZXh0QWxpZ25DZW50ZXIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFyZ2luQXV0b1RvcEJvdCB7XFxyXFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjJweDEwcHgge1xcclxcbiAgbWFyZ2luOiAycHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjBweDVweCB7XFxyXFxuICBtYXJnaW46IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29weSB7XFxyXFxuICBmb250LXNpemU6IHNtYWxsO1xcclxcbiAgY29sb3I6IGxpZ2h0Z3JheTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gIHBhZGRpbmc6IDJweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yIHtcXHJcXG4gIHBhZGRpbmc6IDJweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sb3JXaGl0ZSB7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5jb2xvckxpZ2h0R3JheSB7XFxyXFxuICBjb2xvcjogbGlnaHRHcmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkUmlnaHQge1xcclxcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzcGxheUZsZXgge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbHVtbkNvdW50LTIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAzMS42cHgpO1xcclxcbiAgY29sdW1uLWNvdW50OiAyO1xcclxcbiAgY29sdW1uLWdhcDogMWVtO1xcclxcbiAgY29sdW1uLWZpbGw6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nLTUge1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkZGluZzEwcHgge1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm5vUGFkZGluZyB7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ud2Via2l0TWFyZ2luMCB7XFxyXFxuICAtd2Via2l0LW1hcmdpbi1iZWZvcmU6IDA7XFxyXFxuICAtd2Via2l0LW1hcmdpbi1hZnRlcjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogRU5EIENMVUVTICovXFxyXFxuXFxyXFxuLmxpbmtzIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi8qI2dyaWRDb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTBweCk7XFxyXFxuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xcclxcbiAgZmxleC1ncm93OiAxMDtcXHJcXG59Ki9cXHJcXG5cXHJcXG4vKiNjbHVlQ29udGFpbmVyIHtcXHJcXG4gIGFsaWduLXNlbGY6IHN0cmV0Y2g7XFxyXFxufSovXFxyXFxuXFxyXFxuI3B1ek5vdGVwYWQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZlMDtcXHJcXG4gIHBhZGRpbmc6IDRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4MDgwODA7XFxyXFxuICBtYXJnaW46IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNwdXpUYWJsZSB7XFxyXFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgYm9yZGVyLXNwYWNpbmc6IDBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jcHV6VGFibGUgdGQge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuI3B1elRhYmxlIC5ibGFjayB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI2tiQ29udGFpbmVyIHtcXHJcXG4gIGJvdHRvbTogMTAwJTtcXHJcXG4gIGhlaWdodDogMTV2aDtcXHJcXG59XFxyXFxuXFxyXFxuI3NwbGFzaCB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxufVxcclxcblxcclxcbiNzcGxhc2hJbWFnZSB7XFxyXFxuICB3aWR0aDogMjAlO1xcclxcbiAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbiNwdXpUYWJsZSAuc2hhZGUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4uY2x1ZU51bWJlciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIGxlZnQ6IDFweDtcXHJcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgbGluZS1oZWlnaHQ6IDlweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRXZWlnaHRCb2xkIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3F1YXJlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvcmRlcjJweFRvcCB7XFxyXFxuICBib3JkZXItdG9wOiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9yZGVyMnB4Qm90dG9tIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBnb2xkICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5ib3JkZXIycHhMZWZ0IHtcXHJcXG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9yZGVyMnB4UmlnaHQge1xcclxcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYmdUcmFuc1JlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC41KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnVHJhbnNCbHVlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMjU1LCAwLjUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9udFRyYW5zUmVkIHtcXHJcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMSk7XFxyXFxufVxcclxcblxcclxcbi5mb250VHJhbnNCbHVlIHtcXHJcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMSk7XFxyXFxufVxcclxcblxcclxcbi5iZ1RyYW5zR3JheSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuNSk7XFxyXFxufVxcclxcblxcclxcbi53aGl0ZVNwYWNlTm93cmFwIHtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxufVxcclxcblxcclxcbi5mbGV4RGlyQ29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5mbGV4Q29sdW1uV3JhcCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhXcmFwIHtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhDZW50ZXIge1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zcGFjZUV2ZW5seSB7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXHJcXG59XFxyXFxuXFxyXFxuLnNwYWNlQXJvdW5kIHtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbn1cXHJcXG5cXHJcXG4uc3BhY2VCZXR3ZWVuIHtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhHcm93LTEge1xcclxcbiAgZmxleC1ncm93OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxleEdyb3ctMiB7XFxyXFxuICBmbGV4LWdyb3c6IDI7XFxyXFxufVxcclxcblxcclxcbi5mbGV4R3Jvdy00IHtcXHJcXG4gIGZsZXgtZ3JvdzogNDtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JXaGl0ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JUcmFuc1doaXRlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY1NTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JUcmFuc0dvbGQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDcwMGRkO1xcclxcbn1cXHJcXG5cXHJcXG4ua2JCdXR0b24ge1xcclxcbiAgbWFyZ2luOiAwLjUlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNnB4IDJweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXHJcXG4gICAgMCAycHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGJveC1zaGFkb3c7XFxyXFxuICAvKnRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKTsqL1xcclxcbiAgd2lsbC1jaGFuZ2U6IGJveC1zaGFkb3c7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5rYkJ1dHRvbjphY3RpdmUge1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcclxcbiAgICAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbn1cXHJcXG5cXHJcXG4uc3Vic2NyaXB0IHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogMC42ZW07XFxyXFxuICBmb250LXNpemU6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tzcGFjZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgNjQsIDEyOSwgMC42KTtcXHJcXG59XFxyXFxuXFxyXFxuI2VudGVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjMsIDgxLCAxODEsIDAuNik7XFxyXFxufVxcclxcblxcclxcbi5tYXJnaW5BdXRvIHtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjEwcHgge1xcclxcbiAgbWFyZ2luOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ud2lkdGg1cGN0IHtcXHJcXG4gIHdpZHRoOiA1JTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoOXBjdCB7XFxyXFxuICB3aWR0aDogOSU7XFxyXFxufVxcclxcblxcclxcbi53aWR0aDIwcGN0IHtcXHJcXG4gIHdpZHRoOiAyMCU7XFxyXFxufVxcclxcblxcclxcbi53aWR0aDMzcGN0IHtcXHJcXG4gIHdpZHRoOiAzMy4zJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNDBwY3Qge1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNTBwY3Qge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNjBwY3Qge1xcclxcbiAgd2lkdGg6IDYwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNjBweCB7XFxyXFxuICB3aWR0aDogNjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1heFdpZHRoNDAwcHgge1xcclxcbiAgbWF4LXdpZHRoOiA0MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZ1bGxXaWR0aCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlaWdodDI1dmgge1xcclxcbiAgaGVpZ2h0OiAyNXZoO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVpZ2h0NDBweCB7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWlnaHQyNHB4IHtcXHJcXG4gIGhlaWdodDogMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlaWdodDgwcGN0IHtcXHJcXG4gIGhlaWdodDogODAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVpZ2h0MTAwcGN0IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm1pbkh0MzZweCB7XFxyXFxuICBtaW4taGVpZ2h0OiAzNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3BhY2VyMjBweCB7XFxyXFxuICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm92ZXJmbG93SGlkZGVuIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5vdmVyZmxvd1lTY3JvbGwge1xcclxcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4ubm9PdXRsaW5lIHtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNnYW1lc1BhbmVsIHtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbiNnYW1lc1BhbmVsLnNsaWRlT3V0IHtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAwKTtcXHJcXG59XFxyXFxuXFxyXFxuI2FwcENvbnRhaW5lciB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbiNhcHBDb250YWluZXIuc2xpZGVJbiB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvc0Fic29sdXRlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnB1enpsZVdpZHRoIHtcXHJcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxMHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbG9yU2FsbW9uIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IFNhbG1vbjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbG9yTGlnaHRTa3lCbHVlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IExpZ2h0U2t5Qmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjVweEF1dG8ge1xcclxcbiAgbWFyZ2luOiA1cHggYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplU21hbGwge1xcclxcbiAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplTGFyZ2Uge1xcclxcbiAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplWExhcmdlIHtcXHJcXG4gIGZvbnQtc2l6ZTogeC1sYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsdWVQb3Age1xcclxcbiAgZm9udC1zaXplOiBsYXJnZXI7XFxyXFxuICBwYWRkaW5nOiA1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuI2NsdWVDYXJkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbiAgbWFyZ2luOiAwIDVweCAycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkU2hhZG93IHtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXHJcXG4gICAgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcycHg1cHgge1xcclxcbiAgcGFkZGluZzogMnB4IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcwcHg1cHgge1xcclxcbiAgcGFkZGluZzogMCA1cHg7XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nMCB7XFxyXFxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblJpZ2h0IHtcXHJcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2VEaWFsb2dQb3NpdGlvbiB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDEwcHg7XFxyXFxuICByaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbklzb2xhdGlvbiB7XFxyXFxuICBtYXJnaW46IDEwcHggYXV0byAxMHB4IGF1dG87XFxyXFxuICB3aWR0aDogODAlO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2tJbmhlcml0UGFyZW50IHtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MjBweCkge1xcclxcbiAgI2dhbWVzUGFuZWxDb250YWluZXIge1xcclxcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogY2FsYygoMTAwdncgLSA0MDBweCkgLyAyKTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDE4LzI1KSB7XFxyXFxuICBib2R5IHtcXHJcXG4gICAgZm9udC1zaXplOiAyLjV2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jbHVlTnVtYmVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjR2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNwdXpUYWJsZSB7XFxyXFxuICAgIHdpZHRoOiA3MHZoO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2NsdWVDb250YWluZXIge1xcclxcbiAgICB3aWR0aDogNzB2aDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2tiQ29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDcwdmg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDQvMykge1xcclxcbiAgLmNsdWVOdW1iZXIge1xcclxcbiAgICBmb250LXNpemU6IDAuOHZ3O1xcclxcbiAgfVxcclxcblxcclxcbiAgI3B1elRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDQ1dnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjY2x1ZUNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGhlaWdodDogNDV2dztcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYWNyb3NzQ29udGFpbmVyLFxcclxcbiAgI2Rvd25Db250YWluZXIge1xcclxcbiAgICB3aWR0aDogNTAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNhY3Jvc3NDbHVlcyxcXHJcXG4gICNkb3duQ2x1ZXMge1xcclxcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDMwcHgpO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2NsdWVDYXJkIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNrYkNvbnRhaW5lciB7XFxyXFxuICAgIGhlaWdodDogMjB2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICN0aXRsZSB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWFzcGVjdC1yYXRpbzogMTQvOSkge1xcclxcbiAgI2NsdWVDb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDcwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAja2JDb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDI1JTtcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYXBwQ29udGFpbmVyIHtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDIvMSkge1xcclxcbiAgI3B1elRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDM1dnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjY2x1ZUNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MHZ3O1xcclxcbiAgfVxcclxcblxcclxcbiAgI2tiQ29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDYwdnc7XFxyXFxuICB9XFxyXFxufVxcclxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvbWFpbi5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsV0FBVzs7QUFFWDtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTs7O0VBR0UsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsdURBQXVEO0VBQ3ZELHlCQUF5QjtFQUN6QixlQUFlO0VBQ2Ysc0JBQXNCO0VBQ3RCLFNBQVM7QUFDWDs7QUFFQTtFQUNFLGVBQWU7RUFDZixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsY0FBYztBQUNoQjs7QUFFQTtFQUNFLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHNCQUFzQjtFQUN0QixZQUFZO0FBQ2Q7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0VBQ2Isa0JBQWtCO0VBQ2xCLGdCQUFnQjtFQUNoQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osWUFBWTtFQUNaLGtCQUFrQjtFQUNsQixnQkFBZ0I7QUFDbEI7O0FBRUE7RUFDRSxhQUFhO0FBQ2Y7O0FBRUEsa0RBQWtEO0FBQ2xEO0VBQ0UsYUFBYTtBQUNmOztBQUVBLGtEQUFrRDtBQUNsRDtFQUNFLGFBQWE7QUFDZjs7QUFFQTtFQUNFLHdCQUF3QjtBQUMx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SUFDYixXQUFXO0VBQ2I7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsV0FBVztFQUNiOztFQUVBO0lBQ0Usc0JBQXNCO0VBQ3hCO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLFdBQVc7RUFDYjs7RUFFQTtJQUNFLFdBQVc7RUFDYjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIi8qIENPTU1PTiAqL1xcclxcblxcclxcbmh0bWwge1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuKixcXHJcXG4qOmJlZm9yZSxcXHJcXG4qOmFmdGVyIHtcXHJcXG4gIGJveC1zaXppbmc6IGluaGVyaXQ7XFxyXFxufVxcclxcblxcclxcbmJvZHkge1xcclxcbiAgZm9udC1mYW1pbHk6ICdSb2JvdG8nLCAnSGVsdmV0aWNhJywgJ0FyaWFsJywgU2Fucy1TZXJpZjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY2ZjY7XFxyXFxuICBmb250LXNpemU6IDE2cHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbn1cXHJcXG5cXHJcXG5zZWxlY3Qge1xcclxcbiAgZm9udC1zaXplOiAyMHB4O1xcclxcbiAgbWFyZ2luOiAwIDEwcHg7XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5QmxvY2sge1xcclxcbiAgZGlzcGxheTogYmxvY2s7XFxyXFxufVxcclxcblxcclxcbi5hbGlnbkl0ZW1zQ2VudGVyIHtcXHJcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblNlbGZFbmQge1xcclxcbiAgYWxpZ24tc2VsZjogZmxleC1lbmQ7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblNlbGZDZW50ZXIge1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY3Vyc29yUG9pbnRlciB7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5kcmF3ZXJIZWFkZXIge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcclxcbiAgcGFkZGluZzogOHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGljQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIHdpZHRoOiAxMDBweDtcXHJcXG4gIGhlaWdodDogMTAwcHg7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxyXFxuICBvdmVyZmxvdzogaGlkZGVuO1xcclxcbiAgYWxpZ24tc2VsZjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ucGhvdG9Dcm9wIHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5kaXNwbGF5Tm9uZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4vKiBJbmNyZWFzZWQgc3BlY2lmaWNpdHkgcmVxdWlyZWQgZm9yIHByZWNlZGVuY2UgKi9cXHJcXG4jcmV0dXJuVG9TaWduaW4uZGlzcGxheU5vbmUge1xcclxcbiAgZGlzcGxheTogbm9uZTtcXHJcXG59XFxyXFxuXFxyXFxuLyogSW5jcmVhc2VkIHNwZWNpZmljaXR5IHJlcXVpcmVkIGZvciBwcmVjZWRlbmNlICovXFxyXFxuI3JlcGxheUJ1dHRvbi5kaXNwbGF5Tm9uZSB7XFxyXFxuICBkaXNwbGF5OiBub25lO1xcclxcbn1cXHJcXG5cXHJcXG4uY3VyckNlbGxIaWdobGlnaHQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogeWVsbG93O1xcclxcbn1cXHJcXG5cXHJcXG4ucmFuZ2VIaWdobGlnaHQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogZ29sZDtcXHJcXG59XFxyXFxuXFxyXFxuLm1kbC1saXN0X19pdGVtOmhvdmVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiOGI4Yjg7XFxyXFxufVxcclxcblxcclxcbi8qIEVORCBDT01NT04gKi9cXHJcXG5cXHJcXG4vKiBDTFVFUyAqL1xcclxcblxcclxcbi5oZWFkaW5nIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbiAgcGFkZGluZzogMCAwIDEwcHg7XFxyXFxufVxcclxcblxcclxcbi50ZXh0QWxpZ25DZW50ZXIge1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFyZ2luQXV0b1RvcEJvdCB7XFxyXFxuICBtYXJnaW4tdG9wOiBhdXRvO1xcclxcbiAgbWFyZ2luLWJvdHRvbTogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjJweDEwcHgge1xcclxcbiAgbWFyZ2luOiAycHggMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjBweDVweCB7XFxyXFxuICBtYXJnaW46IDAgNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29weSB7XFxyXFxuICBmb250LXNpemU6IHNtYWxsO1xcclxcbiAgY29sb3I6IGxpZ2h0Z3JheTtcXHJcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXHJcXG4gIHBhZGRpbmc6IDJweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uYXV0aG9yIHtcXHJcXG4gIHBhZGRpbmc6IDJweCAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4uY29sb3JXaGl0ZSB7XFxyXFxuICBjb2xvcjogd2hpdGU7XFxyXFxufVxcclxcblxcclxcbi5jb2xvckxpZ2h0R3JheSB7XFxyXFxuICBjb2xvcjogbGlnaHRHcmF5O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkUmlnaHQge1xcclxcbiAgcGFkZGluZy1yaWdodDogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4uZGlzcGxheUZsZXgge1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbHVtbkNvdW50LTIge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAzMS42cHgpO1xcclxcbiAgY29sdW1uLWNvdW50OiAyO1xcclxcbiAgY29sdW1uLWdhcDogMWVtO1xcclxcbiAgY29sdW1uLWZpbGw6IGF1dG87XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nLTUge1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbn1cXHJcXG5cXHJcXG4ucGFkZGluZzEwcHgge1xcclxcbiAgcGFkZGluZzogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm5vUGFkZGluZyB7XFxyXFxuICBwYWRkaW5nOiAwO1xcclxcbn1cXHJcXG5cXHJcXG4ud2Via2l0TWFyZ2luMCB7XFxyXFxuICAtd2Via2l0LW1hcmdpbi1iZWZvcmU6IDA7XFxyXFxuICAtd2Via2l0LW1hcmdpbi1hZnRlcjogMDtcXHJcXG59XFxyXFxuXFxyXFxuLyogRU5EIENMVUVTICovXFxyXFxuXFxyXFxuLmxpbmtzIHtcXHJcXG4gIG1hcmdpbi1ib3R0b206IDIwcHg7XFxyXFxuICBmb250LXNpemU6IDEycHg7XFxyXFxufVxcclxcblxcclxcbi8qI2dyaWRDb250YWluZXIge1xcclxcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTBweCk7XFxyXFxuICBhbGlnbi1zZWxmOiBzdHJldGNoO1xcclxcbiAgZmxleC1ncm93OiAxMDtcXHJcXG59Ki9cXHJcXG5cXHJcXG4vKiNjbHVlQ29udGFpbmVyIHtcXHJcXG4gIGFsaWduLXNlbGY6IHN0cmV0Y2g7XFxyXFxufSovXFxyXFxuXFxyXFxuI3B1ek5vdGVwYWQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZlMDtcXHJcXG4gIHBhZGRpbmc6IDRweDtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkICM4MDgwODA7XFxyXFxuICBtYXJnaW46IDEwcHg7XFxyXFxufVxcclxcblxcclxcbiNwdXpUYWJsZSB7XFxyXFxuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xcclxcbiAgYm9yZGVyLXNwYWNpbmc6IDBweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbn1cXHJcXG5cXHJcXG4jcHV6VGFibGUgdGQge1xcclxcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xcclxcbiAgYm9yZGVyOiAxcHggc29saWQgIzAwMDAwMDtcXHJcXG59XFxyXFxuXFxyXFxuI3B1elRhYmxlIC5ibGFjayB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXHJcXG59XFxyXFxuXFxyXFxuI2tiQ29udGFpbmVyIHtcXHJcXG4gIGJvdHRvbTogMTAwJTtcXHJcXG4gIGhlaWdodDogMTV2aDtcXHJcXG59XFxyXFxuXFxyXFxuI3NwbGFzaCB7XFxyXFxuICBwb3NpdGlvbjogZml4ZWQ7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG4gIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGxpZ2h0Z3JheTtcXHJcXG4gIHotaW5kZXg6IDE7XFxyXFxufVxcclxcblxcclxcbiNzcGxhc2hJbWFnZSB7XFxyXFxuICB3aWR0aDogMjAlO1xcclxcbiAgbWFyZ2luOiBhdXRvO1xcclxcbn1cXHJcXG5cXHJcXG4uY2lyY2xlIHtcXHJcXG4gIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcclxcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbiNwdXpUYWJsZSAuc2hhZGUge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogbGlnaHRncmF5O1xcclxcbn1cXHJcXG5cXHJcXG4uY2x1ZU51bWJlciB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDFweDtcXHJcXG4gIGxlZnQ6IDFweDtcXHJcXG4gIGZvbnQtc2l6ZTogMnZ3O1xcclxcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxyXFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xcclxcbiAgbGluZS1oZWlnaHQ6IDlweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRXZWlnaHRCb2xkIHtcXHJcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcclxcbn1cXHJcXG5cXHJcXG4uc3F1YXJlIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxyXFxuICBmb250LXdlaWdodDogYm9sZDtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcclxcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXHJcXG59XFxyXFxuXFxyXFxuLmJvcmRlcjJweFRvcCB7XFxyXFxuICBib3JkZXItdG9wOiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9yZGVyMnB4Qm90dG9tIHtcXHJcXG4gIGJvcmRlci1ib3R0b206IDJweCBzb2xpZCBnb2xkICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5ib3JkZXIycHhMZWZ0IHtcXHJcXG4gIGJvcmRlci1sZWZ0OiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYm9yZGVyMnB4UmlnaHQge1xcclxcbiAgYm9yZGVyLXJpZ2h0OiAycHggc29saWQgZ29sZCAhaW1wb3J0YW50O1xcclxcbn1cXHJcXG5cXHJcXG4uYmdUcmFuc1JlZCB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMC41KTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnVHJhbnNCbHVlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMjU1LCAwLjUpO1xcclxcbn1cXHJcXG5cXHJcXG4uZm9udFRyYW5zUmVkIHtcXHJcXG4gIGNvbG9yOiByZ2JhKDI1NSwgMCwgMCwgMSk7XFxyXFxufVxcclxcblxcclxcbi5mb250VHJhbnNCbHVlIHtcXHJcXG4gIGNvbG9yOiByZ2JhKDAsIDAsIDI1NSwgMSk7XFxyXFxufVxcclxcblxcclxcbi5iZ1RyYW5zR3JheSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuNSk7XFxyXFxufVxcclxcblxcclxcbi53aGl0ZVNwYWNlTm93cmFwIHtcXHJcXG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxyXFxufVxcclxcblxcclxcbi5mbGV4RGlyQ29sIHtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxufVxcclxcblxcclxcbi5mbGV4Q29sdW1uV3JhcCB7XFxyXFxuICBkaXNwbGF5OiBmbGV4O1xcclxcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhXcmFwIHtcXHJcXG4gIGZsZXgtd3JhcDogd3JhcDtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhDZW50ZXIge1xcclxcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5zcGFjZUV2ZW5seSB7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXHJcXG59XFxyXFxuXFxyXFxuLnNwYWNlQXJvdW5kIHtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcclxcbn1cXHJcXG5cXHJcXG4uc3BhY2VCZXR3ZWVuIHtcXHJcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXHJcXG59XFxyXFxuXFxyXFxuLmZsZXhHcm93LTEge1xcclxcbiAgZmxleC1ncm93OiAxO1xcclxcbn1cXHJcXG5cXHJcXG4uZmxleEdyb3ctMiB7XFxyXFxuICBmbGV4LWdyb3c6IDI7XFxyXFxufVxcclxcblxcclxcbi5mbGV4R3Jvdy00IHtcXHJcXG4gIGZsZXgtZ3JvdzogNDtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JXaGl0ZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JUcmFuc1doaXRlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY1NTtcXHJcXG59XFxyXFxuXFxyXFxuLmJnQ29sb3JUcmFuc0dvbGQge1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZDcwMGRkO1xcclxcbn1cXHJcXG5cXHJcXG4ua2JCdXR0b24ge1xcclxcbiAgbWFyZ2luOiAwLjUlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGJveC1zaGFkb3c6IDAgNHB4IDRweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgNnB4IDJweCAtNHB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXHJcXG4gICAgMCAycHggMTBweCAwIHJnYmEoMCwgMCwgMCwgMC4xMik7XFxyXFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxyXFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcclxcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC4ycztcXHJcXG4gIHRyYW5zaXRpb24tcHJvcGVydHk6IGJveC1zaGFkb3c7XFxyXFxuICAvKnRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKTsqL1xcclxcbiAgd2lsbC1jaGFuZ2U6IGJveC1zaGFkb3c7XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5rYkJ1dHRvbjphY3RpdmUge1xcclxcbiAgYm94LXNoYWRvdzogMCAycHggMnB4IDAgcmdiYSgwLCAwLCAwLCAwLjE0KSwgMCAzcHggMXB4IC0ycHggcmdiYSgwLCAwLCAwLCAwLjIpLFxcclxcbiAgICAwIDFweCA1cHggMCByZ2JhKDAsIDAsIDAsIDAuMTIpO1xcclxcbn1cXHJcXG5cXHJcXG4uc3Vic2NyaXB0IHtcXHJcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXHJcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXHJcXG4gIHRvcDogMC42ZW07XFxyXFxuICBmb250LXNpemU6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuI2JhY2tzcGFjZSB7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgNjQsIDEyOSwgMC42KTtcXHJcXG59XFxyXFxuXFxyXFxuI2VudGVyIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjMsIDgxLCAxODEsIDAuNik7XFxyXFxufVxcclxcblxcclxcbi5tYXJnaW5BdXRvIHtcXHJcXG4gIG1hcmdpbjogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjEwcHgge1xcclxcbiAgbWFyZ2luOiAxMHB4O1xcclxcbn1cXHJcXG5cXHJcXG4ud2lkdGg1cGN0IHtcXHJcXG4gIHdpZHRoOiA1JTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoOXBjdCB7XFxyXFxuICB3aWR0aDogOSU7XFxyXFxufVxcclxcblxcclxcbi53aWR0aDIwcGN0IHtcXHJcXG4gIHdpZHRoOiAyMCU7XFxyXFxufVxcclxcblxcclxcbi53aWR0aDMzcGN0IHtcXHJcXG4gIHdpZHRoOiAzMy4zJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNDBwY3Qge1xcclxcbiAgd2lkdGg6IDQwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNTBwY3Qge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNjBwY3Qge1xcclxcbiAgd2lkdGg6IDYwJTtcXHJcXG59XFxyXFxuXFxyXFxuLndpZHRoNjBweCB7XFxyXFxuICB3aWR0aDogNjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm1heFdpZHRoNDAwcHgge1xcclxcbiAgbWF4LXdpZHRoOiA0MDBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmZ1bGxXaWR0aCB7XFxyXFxuICB3aWR0aDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLmhlaWdodDI1dmgge1xcclxcbiAgaGVpZ2h0OiAyNXZoO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVpZ2h0NDBweCB7XFxyXFxuICBoZWlnaHQ6IDQwcHg7XFxyXFxufVxcclxcblxcclxcbi5oZWlnaHQyNHB4IHtcXHJcXG4gIGhlaWdodDogMjRweDtcXHJcXG59XFxyXFxuXFxyXFxuLmhlaWdodDgwcGN0IHtcXHJcXG4gIGhlaWdodDogODAlO1xcclxcbn1cXHJcXG5cXHJcXG4uaGVpZ2h0MTAwcGN0IHtcXHJcXG4gIGhlaWdodDogMTAwJTtcXHJcXG59XFxyXFxuXFxyXFxuLm1pbkh0MzZweCB7XFxyXFxuICBtaW4taGVpZ2h0OiAzNnB4O1xcclxcbn1cXHJcXG5cXHJcXG4uc3BhY2VyMjBweCB7XFxyXFxuICB3aWR0aDogMjBweDtcXHJcXG59XFxyXFxuXFxyXFxuLm92ZXJmbG93SGlkZGVuIHtcXHJcXG4gIG92ZXJmbG93OiBoaWRkZW47XFxyXFxufVxcclxcblxcclxcbi5vdmVyZmxvd1lTY3JvbGwge1xcclxcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xcclxcbn1cXHJcXG5cXHJcXG4ubm9PdXRsaW5lIHtcXHJcXG4gIG91dGxpbmU6IG5vbmU7XFxyXFxufVxcclxcblxcclxcbiNnYW1lc1BhbmVsIHtcXHJcXG4gIHBhZGRpbmc6IDEwcHg7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbiNnYW1lc1BhbmVsLnNsaWRlT3V0IHtcXHJcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC0xMDAlLCAwKTtcXHJcXG59XFxyXFxuXFxyXFxuI2FwcENvbnRhaW5lciB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgxMDAlLCAwKTtcXHJcXG4gIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjNzIGVhc2U7XFxyXFxufVxcclxcblxcclxcbiNhcHBDb250YWluZXIuc2xpZGVJbiB7XFxyXFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgwLCAwKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBvc0Fic29sdXRlIHtcXHJcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXHJcXG59XFxyXFxuXFxyXFxuLnB1enpsZVdpZHRoIHtcXHJcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxMHB4KTtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbG9yU2FsbW9uIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IFNhbG1vbjtcXHJcXG59XFxyXFxuXFxyXFxuLmNvbG9yTGlnaHRTa3lCbHVlIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IExpZ2h0U2t5Qmx1ZTtcXHJcXG59XFxyXFxuXFxyXFxuLm1hcmdpbjVweEF1dG8ge1xcclxcbiAgbWFyZ2luOiA1cHggYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplU21hbGwge1xcclxcbiAgZm9udC1zaXplOiBzbWFsbDtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplTGFyZ2Uge1xcclxcbiAgZm9udC1zaXplOiBsYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmZvbnRTaXplWExhcmdlIHtcXHJcXG4gIGZvbnQtc2l6ZTogeC1sYXJnZTtcXHJcXG59XFxyXFxuXFxyXFxuLmNsdWVQb3Age1xcclxcbiAgZm9udC1zaXplOiBsYXJnZXI7XFxyXFxuICBwYWRkaW5nOiA1cHggMDtcXHJcXG59XFxyXFxuXFxyXFxuI2NsdWVDYXJkIHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcclxcbiAgcGFkZGluZzogNXB4O1xcclxcbiAgbWFyZ2luOiAwIDVweCAycHg7XFxyXFxufVxcclxcblxcclxcbi5jYXJkU2hhZG93IHtcXHJcXG4gIGJveC1zaGFkb3c6IDAgMnB4IDJweCAwIHJnYmEoMCwgMCwgMCwgMC4xNCksIDAgM3B4IDFweCAtMnB4IHJnYmEoMCwgMCwgMCwgMC4yKSxcXHJcXG4gICAgMCAxcHggNXB4IDAgcmdiYSgwLCAwLCAwLCAwLjEyKTtcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcycHg1cHgge1xcclxcbiAgcGFkZGluZzogMnB4IDVweDtcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcwcHg1cHgge1xcclxcbiAgcGFkZGluZzogMCA1cHg7XFxyXFxufVxcclxcblxcclxcbi5wYWRkaW5nMCB7XFxyXFxuICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XFxyXFxufVxcclxcblxcclxcbi5hbGlnblJpZ2h0IHtcXHJcXG4gIHRleHQtYWxpZ246IHJpZ2h0O1xcclxcbn1cXHJcXG5cXHJcXG4uY2xvc2VEaWFsb2dQb3NpdGlvbiB7XFxyXFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxyXFxuICB0b3A6IDEwcHg7XFxyXFxuICByaWdodDogMTBweDtcXHJcXG59XFxyXFxuXFxyXFxuLmJ1dHRvbklzb2xhdGlvbiB7XFxyXFxuICBtYXJnaW46IDEwcHggYXV0byAxMHB4IGF1dG87XFxyXFxuICB3aWR0aDogODAlO1xcclxcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xpY2tJbmhlcml0UGFyZW50IHtcXHJcXG4gIHBvaW50ZXItZXZlbnRzOiBpbmhlcml0O1xcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA0MjBweCkge1xcclxcbiAgI2dhbWVzUGFuZWxDb250YWluZXIge1xcclxcbiAgICBtYXgtd2lkdGg6IDQwMHB4O1xcclxcbiAgICBtYXJnaW4tbGVmdDogY2FsYygoMTAwdncgLSA0MDBweCkgLyAyKTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDE4LzI1KSB7XFxyXFxuICBib2R5IHtcXHJcXG4gICAgZm9udC1zaXplOiAyLjV2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIC5jbHVlTnVtYmVyIHtcXHJcXG4gICAgZm9udC1zaXplOiAxLjR2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNwdXpUYWJsZSB7XFxyXFxuICAgIHdpZHRoOiA3MHZoO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2NsdWVDb250YWluZXIge1xcclxcbiAgICB3aWR0aDogNzB2aDtcXHJcXG4gICAgbWFyZ2luOiBhdXRvO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2tiQ29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDcwdmg7XFxyXFxuICAgIG1hcmdpbjogYXV0bztcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDQvMykge1xcclxcbiAgLmNsdWVOdW1iZXIge1xcclxcbiAgICBmb250LXNpemU6IDAuOHZ3O1xcclxcbiAgfVxcclxcblxcclxcbiAgI3B1elRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDQ1dnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjY2x1ZUNvbnRhaW5lciB7XFxyXFxuICAgIGRpc3BsYXk6IGZsZXg7XFxyXFxuICAgIGhlaWdodDogNDV2dztcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYWNyb3NzQ29udGFpbmVyLFxcclxcbiAgI2Rvd25Db250YWluZXIge1xcclxcbiAgICB3aWR0aDogNTAlO1xcclxcbiAgICBkaXNwbGF5OiBibG9jaztcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNhY3Jvc3NDbHVlcyxcXHJcXG4gICNkb3duQ2x1ZXMge1xcclxcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDMwcHgpO1xcclxcbiAgfVxcclxcblxcclxcbiAgI2NsdWVDYXJkIHtcXHJcXG4gICAgZGlzcGxheTogbm9uZTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICNrYkNvbnRhaW5lciB7XFxyXFxuICAgIGhlaWdodDogMjB2aDtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gICN0aXRsZSB7XFxyXFxuICAgIGRpc3BsYXk6IGJsb2NrO1xcclxcbiAgfVxcclxcbn1cXHJcXG5cXHJcXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLWFzcGVjdC1yYXRpbzogMTQvOSkge1xcclxcbiAgI2NsdWVDb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDcwJTtcXHJcXG4gICAgZGlzcGxheTogZmxleDtcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAja2JDb250YWluZXIge1xcclxcbiAgICBoZWlnaHQ6IDI1JTtcXHJcXG4gICAgd2lkdGg6IDUwdnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjYXBwQ29udGFpbmVyIHtcXHJcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXFxyXFxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi1hc3BlY3QtcmF0aW86IDIvMSkge1xcclxcbiAgI3B1elRhYmxlIHtcXHJcXG4gICAgd2lkdGg6IDM1dnc7XFxyXFxuICB9XFxyXFxuXFxyXFxuICAjY2x1ZUNvbnRhaW5lciB7XFxyXFxuICAgIHdpZHRoOiA2MHZ3O1xcclxcbiAgfVxcclxcblxcclxcbiAgI2tiQ29udGFpbmVyIHtcXHJcXG4gICAgd2lkdGg6IDYwdnc7XFxyXFxuICB9XFxyXFxufVxcclxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vbWFpbi5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL21haW4uY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJkYiIsImFwcCIsImF1dGgiLCJmdW5jdGlvbnMiLCJtZXNzYWdpbmciLCJhdXRoQ2hhbmdlVmlldyIsInNpZ25lZE91dFZpZXciLCJzaG93UHV6emxlVmlldyIsImxvYWRHYW1lc1ZpZXciLCJnZXREYXRhYmFzZSIsInJlZiIsIm9uVmFsdWUiLCJvbkRpc2Nvbm5lY3QiLCJzZXQiLCJzZXJ2ZXJUaW1lc3RhbXAiLCJvbkF1dGhTdGF0ZUNoYW5nZWQiLCJiZWZvcmVBdXRoU3RhdGVDaGFuZ2VkIiwic2lnbk91dCIsImdldFRva2VuIiwiY29sbGVjdGlvbiIsImdldERvY3MiLCJzZXREb2MiLCJkb2MiLCJvblNuYXBzaG90IiwicXVlcnkiLCJvcmRlckJ5IiwibGltaXQiLCJ3aGVyZSIsImh0dHBzQ2FsbGFibGUiLCJkYlJUIiwidmFwaWRLZXkiLCJzY29yZVZhbHVlcyIsIkEiLCJCIiwiQyIsIkQiLCJFIiwiRiIsIkciLCJIIiwiSSIsIkoiLCJLIiwiTCIsIk0iLCJOIiwiTyIsIlAiLCJRIiwiUiIsIlMiLCJUIiwiVSIsIlYiLCJXIiwiWCIsIlkiLCJaIiwiY3VycmVudFVzZXIiLCJwcmV2aW91c1VzZXIiLCJhbGxVc2VycyIsImFsbEdhbWVzIiwiY3VycmVudEdhbWUiLCJjdXJyZW50R2FtZUlkIiwibXlPcHBvbmVudFVpZCIsImN1cnJlbnRDZWxsIiwiYWNyb3NzV29yZCIsImNvbHVtbnMiLCJjdXJyZW50Q2x1ZSIsImlkeEFycmF5IiwibXlUdXJuIiwib25saW5lIiwiZ2FtZVVuc3Vic2NyaWJlIiwiZ2V0Q3VycmVudEdhbWVDb250cm9sbGVyIiwic2V0Q3VycmVudEdhbWVDb250cm9sbGVyIiwiZ2FtZSIsImdldEFjcm9zc1dvcmRDb250cm9sbGVyIiwic2V0QWNyb3NzV29yZENvbnRyb2xsZXIiLCJhY3Jvc3MiLCJnZXRDdXJyZW50VXNlckNvbnRyb2xsZXIiLCJnZXRBbGxHYW1lc0NvbnRyb2xsZXIiLCJnZXRDb2x1bW5zQ29udHJvbGxlciIsImdldElkeEFycmF5Q29udHJvbGxlciIsInNldElkeEFycmF5Q29udHJvbGxlciIsIndvcmRBcnJheSIsImF1dGhTdGF0ZSIsInN0YXRlIiwibGFzdENoYW5nZWQiLCJEYXRlIiwic25hcHNob3QiLCJjb25zb2xlIiwibG9nIiwidmFsIiwidWlkIiwidGhlbiIsInVzZXIiLCJhdXRoQ2hhbmdlZCIsInJlc3VsdCIsImRhdGEiLCJnZW5lcmF0ZU1lc3NhZ2luZ1Rva2VuIiwicG9wdWxhdGVBbGxHYW1lc0NvbnRyb2xsZXIiLCJlcnIiLCJjb2RlIiwibWVzc2FnZSIsImRldGFpbHMiLCJjdXJyZW50VG9rZW4iLCJzZW5kVG9rZW5Ub1NlcnZlciIsInRva2VuIiwibXNnVG9rZW4iLCJtZXJnZSIsImF1dGhCdXR0b25DbGlja2VkQ29udHJvbGxlciIsImVycm9yIiwibG9jYXRpb24iLCJoYXNoIiwicG9wdWxhdGVBbGxVc2Vyc0NvbnRyb2xsZXIiLCJlbXB0eSIsIndhcm4iLCJ1c2Vyc09iaiIsImRvY3MiLCJmb3JFYWNoIiwicSIsImdhbWVzT2JqIiwiaWQiLCJmZXRjaFB1enpsZUNvbnRyb2xsZXIiLCJwdXp6bGVJZCIsInN1YnNjcmliZVRvR2FtZSIsImdhbWVJZCIsInN0YXR1cyIsImluaXRpYXRvciIsIm9wcG9uZW50IiwicHV6emxlIiwiY29scyIsIm5leHRUdXJuIiwicGxheVdvcmRDb250cm9sbGVyIiwiaW5jb21wbGV0ZSIsImFsZXJ0IiwiYW5zd2VyT2JqIiwiZ3Vlc3MiLCJteVVpZCIsImluZGV4IiwicHVzaCIsImdyaWQiLCJjaGVja0Fuc3dlciIsIm9iaiIsImNvcnJlY3RBbnN3ZXIiLCJub3RpZnlPcHBvbmVudCIsImxlbmd0aCIsImkiLCJzdGFydE5ld0dhbWVDb250cm9sbGVyIiwiZ2FtZVN0YXJ0UGFyYW1ldGVycyIsInN0YXJ0R2FtZSIsImdhbWVPYmpEYXRhIiwiZW50ZXJMZXR0ZXJDb250cm9sbGVyIiwibGV0dGVyIiwic2F2ZVB1enpsZUNvbnRyb2xsZXIiLCJhcHBlbmQiLCJhcHBlbmRPYmplY3QiLCJiYXNlIiwia2V5cyIsIk9iamVjdCIsImtleSIsImFiYW5kb25DdXJyZW50R2FtZUNvbnRyb2xsZXIiLCJhYmFuZG9uT2JqIiwib3Bwb25lbnRVaWQiLCJhYmFuZG9uR2FtZSIsIndpbmRvdyIsImFkZEV2ZW50TGlzdGVuZXIiLCJpbml0Um91dGVyIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiYmluZCIsImFwcENvbnRhaW5lciIsImdhbWVzUGFuZWwiLCJnYW1lc0RpYWxvZyIsInNjb3JlcyIsImNvbmNlc3Npb25CdG5Db250YWluZXIiLCJwdXp6bGVJbmZvIiwiZ2V0RWxlbWVudEJ5SWQiLCJwdXpUYWJsZSIsImNsdWVDb250YWluZXIiLCJrYkNvbnRhaW5lciIsInNwbGFzaCIsImhlYWRlclNpZ25pbiIsInNpZ25pbk1lc3NhZ2UiLCJ0b3MiLCJwcml2YWN5IiwicmV0dXJuVG9TaWduaW4iLCJmaXJlYmFzZXVpQXV0aENvbnRhaW5lciIsIm5hdmlnYXRlIiwiY2xhc3NMaXN0IiwiYWRkIiwicmVtb3ZlIiwiY2xvc2UiLCJhdXRoQnV0dG9uIiwiZHJhd2VyIiwicHJvZmlsZU5hbWUiLCJhdmF0YXIiLCJnYW1lT3ZlckhlYWRpbmciLCJ3aW5NZXNzYWdlIiwib3Bwb25lbnRIZWFkaW5nIiwib3Bwb25lbnRMaXN0IiwicmFkaW9FYXN5IiwicmFkaW9NZWQiLCJyYWRpb0hhcmQiLCJkaWFsb2dMaXN0IiwiYWN0aXZlR2FtZXNDb250YWluZXIiLCJwYXN0R2FtZXNDb250YWluZXIiLCJwdXpBdXRob3IiLCJwdXpDb3B5IiwicHV6Tm90ZXBhZCIsImFjcm9zc0NsdWVzIiwiZG93bkNsdWVzIiwic2luZ2xlQ2x1ZSIsImtleWJvYXJkIiwibXlOYW1lIiwib3BwTmFtZSIsIm15U2NvcmUiLCJvcHBTY29yZSIsImNvbmNlc3Npb25CdG4iLCJwdXpUaXRsZSIsImxvZ28iLCJyZXBsYXlCdXR0b24iLCJldmVudCIsImNvbnRhaW5zIiwidG9nZ2xlRHJhd2VyIiwidGV4dENvbnRlbnQiLCJkaXNwbGF5TmFtZSIsInNyYyIsInBob3RvVVJMIiwiaW5uZXJUZXh0IiwiaW5uZXJIVE1MIiwiY2xlYXJQdXp6bGUiLCJNYXRlcmlhbExheW91dCIsInVzZXJMaXN0IiwidGFyZ2V0IiwicGFyZW50RWxlbWVudCIsImRpZmZpY3VsdHkiLCJjbG9zZUdhbWVzRGlhbG9nIiwicmVtb3ZlQXR0cmlidXRlIiwic2V0QXR0cmlidXRlIiwic3RhcnRHYW1lQnV0dG9uIiwibG9hZFVzZXJMaXN0IiwiY2hpbGRyZW4iLCJzaG93TW9kYWwiLCJ1aWRzIiwicHJvdmlkZXJJZCIsInNwbGl0IiwiYWN0aXZlR2FtZXNIdG1sIiwicGFzdEdhbWVzSHRtbCIsImdhbWVzIiwic3RhcnREYXRlIiwic3RhcnQiLCJ0b0xvY2FsZURhdGVTdHJpbmciLCJkYXkiLCJtb250aCIsIm15T3Bwb25lbnQiLCJvcHBvbmVudFBob3RvIiwid2lubmVyIiwibG9hZEdhbWUiLCJldmVudFRhcmdldCIsIm5vZGVOYW1lIiwidG9Mb3dlckNhc2UiLCJub3RlcGFkIiwidGl0bGUiLCJhdXRob3IiLCJjb3B5cmlnaHQiLCJjZWxsRGltIiwiZ2V0Q2VsbERpbSIsInRhYmxlRGltIiwiZ3JpZEluZGV4Iiwicm93SW5kZXgiLCJyb3dzIiwicm93IiwiaW5zZXJ0Um93Iiwic3R5bGUiLCJ3aWR0aCIsImNvbEluZGV4IiwiY2x1ZU51bWJlciIsImNsdWVOdW0iLCJjZWxsIiwiaW5zZXJ0Q2VsbCIsImJsYWNrQ2VsbCIsImJsYWNrIiwiaGVpZ2h0IiwiY2VsbENsaWNrZWQiLCJjbGFzc05hbWUiLCJzcXVhcmVEaXYiLCJjcmVhdGVFbGVtZW50IiwibGV0dGVyRGl2IiwiYmdDb2xvciIsImFwcGVuZENoaWxkIiwiY2x1ZU51bURpdiIsImNyZWF0ZVRleHROb2RlIiwiY2lyY2xlIiwiY2x1ZXMiLCJjbHVlIiwicGFyc2VkQ2x1ZSIsInBhcnNlSW50IiwiY2x1ZVJlZiIsImNsdWVUZXh0Iiwic2xpY2UiLCJqb2luIiwiY2x1ZURpdiIsImNvbXBsZXRlZENsdWVzIiwiaW5jbHVkZXMiLCJudW1EaXYiLCJ0ZXh0RGl2IiwiZG93biIsImNsdWVDbGlja2VkIiwibWUiLCJ0aGV5IiwibXlOaWNrbmFtZSIsIm9wcE5pY2tuYW1lIiwiZW1wdHlTcXVhcmVzIiwic2NvcmUiLCJoaWRlUmVwbGF5Iiwic2hvd1JlcGxheURpYWxvZyIsInVwZGF0ZVNjb3JlYm9hcmQiLCJjb2wiLCJjZWxsSW5kZXgiLCJzZWxlY3RBY3Jvc3MiLCJzZWxlY3REb3duIiwiZGlyZWN0aW9uIiwiY2x1ZU51bWJlclRleHQiLCJmaXJzdENoaWxkIiwiaW5kZXhPZiIsImNsdWVOdW1JbmRpY2VzIiwiTWF0aCIsImZsb29yIiwicmVwbGFjZSIsInVuZG9FbnRyeSIsImxvY2FsSWR4QXJyYXkiLCJqIiwibmV4dENlbGxJbmRleCIsImNvbmNhdCIsInJlcGxhY2VDaGlsZCIsImlkeCIsInB1elRhYmxlV2lkdGgiLCJvZmZzZXRXaWR0aCIsImNsZWFyTGV0dGVycyIsInJvd09mZnNldCIsImNsZWFySGlnaGxpZ2h0cyIsImdldFdvcmRCbG9jayIsImNsdWVOdW1TdHIiLCJ0b1N0cmluZyIsInNjcm9sbEJ5IiwidG9wIiwib2Zmc2V0VG9wIiwic2Nyb2xsVG9wIiwibGVmdCIsImJlaGF2aW9yIiwiY3VycmVudENvbCIsImN1cnJlbnRSb3ciLCJpbmRleEFycmF5Iiwicm93QXJyYXkiLCJyZXBsYXlPcHBvbmVudCIsIm9wZW4iLCJlbnRlckxldHRlciIsImtleUNvZGUiLCJub2RlIiwicGFyZW50Tm9kZSIsInRyaW0iLCJtYXRjaCIsInRvVXBwZXJDYXNlIiwicmVzaXplUHV6emxlIiwiY2VsbEFycmF5Iiwia2V5TGlzdCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiXSwic291cmNlUm9vdCI6IiJ9