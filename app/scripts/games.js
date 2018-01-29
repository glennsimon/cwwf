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
    const radioEasy = querySelector('#radioEasy');
    const radioMed = querySelector('#radioMed');
    const radioHard = querySelector('#radioHard');
    const dialogListContainer = querySelector('#dialogList');
    const dialogPolyfill = window.dialogPolyfill || {};
    const firebase = window.firebase;

    let currentUser = firebase.auth().currentUser;
    let difficulty = 'medium';
    let dialogList = '';
    let opponents = [];

    firebase.auth().onAuthStateChanged(user => {
      currentUser = user;
      fillLists();
    });

    if (!dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
    startGameButton.addEventListener('click', initNewGame);
    dialog.querySelector('.close').addEventListener('click', () => {
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

    // this can be done more cleanly with a single listener on radio
    // class objects and using the value parameter
    radioEasy.addEventListener('click', () => {
      difficulty = 'easy';
    });
    radioMed.addEventListener('click', () => {
      difficulty = 'medium';
    });
    radioHard.addEventListener('click', () => {
      difficulty = 'hard';
    });

    /** Fill dialog list with possible opponents */
    function fillLists() {
      firebase.firestore().collection('users').get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
            if (!currentUser || doc.id !== currentUser.uid) {
              dialogList +=
`<li class='mdl-list__item mdl-list__item--two-line'>
   <span class='mdl-list__item-primary-content'>
     <i class='material-icons mdl-list__item-avatar'>person</i>
     <span>${doc.data().displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${doc.data().providerId.split('.')[0]}
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <div class='mdl-list__item-secondary-action'>
       <i id='${doc.data().uid}' class='material-icons'>grid_on</i>
     </div>
   </span>
 </li>
`;
            }
            opponents.push(doc.data().uid);
          });
          // console.log(dialogList);
          dialogListContainer.innerHTML = dialogList;
          dialogListContainer.addEventListener('click', loadGame);
        })
        .catch(function(error) {
          console.error('Error getting documents: ', error);
        });
    }

    /**
     * Load game based on user selection
     * @param {Object} event Click event from dialogListContainer
     */
    function loadGame(event) {
      location.hash = '#puzzle';
      if (opponents.includes(event.target.id)) {
        console.log('currentUser.uid: ', currentUser.uid);
        console.log('difficulty: ', difficulty);
        console.log(event.target.id);
      }
      window.puzzleWorker.loadPuzzle({
        initiator: currentUser.uid,
        opponent: event.target.id,
        difficulty: difficulty
      });
    }
  }

  // activeGames entry
  // `<li class='mdl-list__item mdl-list__item--two-line'>
  //   <span class='mdl-list__item-primary-content'>
  //     <i class='material-icons mdl-list__item-avatar'>person</i>
  //     <span>Bryan Cranston</span>
  //     <span class='mdl-list__item-sub-title'>Their turn</span>
  //   </span>
  //   <span class='mdl-list__item-secondary-content'>
  //     <span class='mdl-list__item-secondary-info'>Play</span>
  //     <a class='mdl-list__item-secondary-action' href='#'><i class='material-icons'>grid_on</i></a>
  //   </span>
  // </li>`

  // pastGames entry
  // `<li class='mdl-list__item mdl-list__item--two-line'>
  //   <span class='mdl-list__item-primary-content'>
  //     <i class='material-icons mdl-list__item-avatar'>person</i>
  //     <span>Bryan Cranston</span>
  //     <span class='mdl-list__item-sub-title'>They won</span>
  //   </span>
  //   <span class='mdl-list__item-secondary-content'>
  //     <span class='mdl-list__item-secondary-info'>Play again</span>
  //     <a class='mdl-list__item-secondary-action' href='#'><i class='material-icons'>replay</i></a>
  //   </span>
  // </li>`
})();
