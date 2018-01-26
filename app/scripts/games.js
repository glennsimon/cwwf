/* eslint-env es6, browser */
(function() {
  window.addEventListener('load', function() {
    initApp();
  });

  /** Initialize after document loads */
  function initApp() {
    const querySelector = document.querySelector.bind(document);
    const dialog = querySelector('#oppDialog');
    const startGameButton = querySelector('#startGameButton');
    const dialogPolyfill = window.dialogPolyfill || {};
    const firebase = window.firebase;

    let currentUser = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged(user => {
      currentUser = user;
    });

    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    startGameButton.addEventListener('click', initNewGame);
    dialog.querySelector('.close').addEventListener('click', function() {
      dialog.close();
    });

    /** Start a new game or send user to the login page */
    function initNewGame() {
      if (currentUser) {
        // user is logged in
        dialog.showModal();
      } else {
        // user is not logged in
        location.hash = '#home';
      }
    }
  }
})();
