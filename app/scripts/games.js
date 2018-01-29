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
    const activeGamesContainer = querySelector('#activeGamesContainer');
    const pastGamesContainer = querySelector('#pastGamesContainer');
    const dialogPolyfill = window.dialogPolyfill || {};
    const firebase = window.firebase;

    let currentUser = firebase.auth().currentUser;
    let difficulty = 'medium';
    let dialogList = '';
    let activeGamesList = '';
    let pastGamesList = '';
    let allUsers = {};
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
      if (currentUser) {
        firebase.firestore().collection('users').get().then(snapshot => {
          if (!snapshot.exists) {
            console.warn('No users exist yet.');
            return;
          }
          allUsers = snapshot;
          snapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
            if (doc.id !== currentUser.uid) {
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
            // Using opponent uid as id for i element. loadNewGame() checks
            // click target by checking if opponents includes i element id.
            opponents.push(doc.data().uid);
          });
          // console.log(dialogList);
          dialogListContainer.innerHTML = dialogList;
          dialogListContainer.addEventListener('click', loadNewGame);
        }).catch(function(error) {
          console.error('Error getting users: ', error);
        });

        firebase.firestore().collection('games').get().then(snapshot => {
          if (!snapshot.exists) {
            console.warn('No games exist yet.');
            return;
          }
          snapshot.forEach(doc => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, ' => ', doc.data());
            if (doc.status === 'started' &&
              (doc.initiator === currentUser.uid ||
               doc.opponent === currentUser.uid)) {
              let myOpponent = doc.initiator === currentUser.uid ?
                allUsers[doc.opponent].displayName :
                allUsers[doc.initiator].displayName;
              activeGamesList +=
`<li class='mdl-list__item mdl-list__item--two-line'>
  <span class='mdl-list__item-primary-content'>
    <i class='material-icons mdl-list__item-avatar'>person</i>
    <span>${myOpponent}</span>
    <span class='mdl-list__item-sub-title'>
      ${currentUser.uid === doc.nextTurn ? 'Your' : 'Their'} turn
    </span>
  </span>
  <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Play</span>
    <div class='mdl-list__item-secondary-action'>
      <i id='${doc.id}' class='material-icons'>grid_on</i>
    </div>
  </span>
</li>`;
            } else if (doc.initiator === currentUser.uid ||
                       doc.opponent === currentUser.uid) {
              let myOpponent = doc.initiator === currentUser.uid ?
                allUsers[doc.opponent].displayName :
                allUsers[doc.initiator].displayName;
              let result;
              if (doc.result === 'finished') {
                result = currentUser.uid === doc.winner ?
                  'You won!!' :
                  'They won';
              } else if (doc.result === 'abandoned') {
                result = 'Game abandoned';
              } else {
                result = 'They cancelled';
              }
              pastGamesList +=
`<li class='mdl-list__item mdl-list__item--two-line'>
  <span class='mdl-list__item-primary-content'>
    <i class='material-icons mdl-list__item-avatar'>person</i>
    <span>${myOpponent}</span>
    <span class='mdl-list__item-sub-title'>${result}</span>
  </span>
  <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Play again</span>
    <div class='mdl-list__item-secondary-action'>
      <i id='${doc.opponent}' class='material-icons'>replay</i>
    </div>
  </span>
</li>`;
            }
          });
          // console.log(dialogList);
          activeGamesContainer.innerHTML = activeGamesList;
          pastGamesContainer.innerHTML = pastGamesList;
          activeGamesContainer.addEventListener('click', loadActiveGame);
          pastGamesContainer.addEventListener('click', loadNewGame);
        }).catch(function(error) {
          console.error('Error getting games: ', error);
        });
      }
    }

    /**
     * Load game based on user selection
     * @param {Object} event Click event from dialogListContainer
     */
    function loadNewGame(event) {
      // if (opponents.includes(event.target.id)) {
      //   console.log('currentUser.uid: ', currentUser.uid);
      //   console.log('difficulty: ', difficulty);
      //   console.log(event.target.id);
      // }
      window.puzzleWorker.loadPuzzle({
        initiator: currentUser.uid,
        opponent: event.target.id,
        difficulty: difficulty
      });
      location.hash = '#puzzle';
    }

    /**
     * Load game based on user selection
     * @param {Object} event Click event from dialogListContainer
     */
    function loadActiveGame(event) {
      window.puzzleWorker.fetchPuzzle({
        initiator: currentUser.uid,
        opponent: event.target.id,
        difficulty: difficulty
      });
      location.hash = '#puzzle';
    }
  }
})();
