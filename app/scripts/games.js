/* eslint-env es6, browser */
const puzzleGames = (function(document, window) {
  const querySelector = document.querySelector.bind(document);
  const dialog = querySelector('#oppDialog');
  const startGameButton = querySelector('#startGameButton');
  // const radioEasy = querySelector('#radioEasy');
  // const radioMed = querySelector('#radioMed');
  // const radioHard = querySelector('#radioHard');
  const dialogListContainer = querySelector('#dialogList');
  const activeGamesContainer = querySelector('#activeGamesContainer');
  const pastGamesContainer = querySelector('#pastGamesContainer');
  const dialogPolyfill = window.dialogPolyfill || {};
  const firebase = window.firebase;

  let currentUser = firebase.auth().currentUser;
  // let difficulty = 'medium';
  let dialogList = '';
  let activeGamesHtml = '';
  let pastGamesHtml = '';
  let allUsers = {};
  let pastGames = {};

  firebase.auth().onAuthStateChanged(user => {
    currentUser = user;
    // fillLists();
  });

  if (!dialog.showModal) {
    dialogPolyfill.registerDialog(dialog);
  }
  startGameButton.addEventListener('click', initNewGame);
  dialog.querySelector('.close').addEventListener('click', () => {
    // unsubscribe();
    dialog.close();
  });

  /** Start a new game or send user to the login page */
  function initNewGame() {
    if (currentUser) {
      // user is logged in
      dialog.showModal();
    } else {
      // user is not logged in
      location.hash = '#signin';
    }
  }

  /** Subscribe to firestore listeners */
  function subscribe() {
    firebase.firestore().collection('users')
      .onSnapshot(snapshot => loadUserList(snapshot), error => {
        console.error('Error getting users: ', error);
      });
    firebase.firestore().collection('games')
      .onSnapshot(snapshot => loadGames(snapshot), error => {
        console.error('Error getting games: ', error);
      });
  }

  /** Unsubscribe from firestore listeners */
  function unsubscribe() {
    firebase.firestore().collection('users').onSnapshot(() => {});
    firebase.firestore().collection('games').onSnapshot(() => {});
  }

  /**
   * Snapshot of firebase 'user' collection
   * @param {Object} snapshot Collection of users
   */
  function loadUserList(snapshot) {
    if (!currentUser) return;
    dialogListContainer.innerHTML = '';
    dialogListContainer.removeEventListener('click', loadNewGame);
    dialogList = '';
    if (snapshot.empty) {
      console.warn('No users exist yet.');
      return;
    }
    let usersObj = {};
    snapshot.docs.forEach(doc => {
      const uid = doc.id;
      const user = doc.data();
      usersObj[uid] = user;
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      if (uid !== currentUser.uid) {
        dialogList +=
`<li class='mdl-list__item mdl-list__item--two-line'>
   <span class='mdl-list__item-primary-content'>
     <i class='material-icons mdl-list__item-avatar'>person</i>
     <span>${user.displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${user.providerId.split('.')[0]}
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <div class='mdl-list__item-secondary-action'>
       <i id='${uid}' class='material-icons'>grid_on</i>
     </div>
   </span>
 </li>
`;
      }
    });
    allUsers = usersObj;
    // console.log(dialogList);
    dialogListContainer.innerHTML = dialogList;
    dialogListContainer.addEventListener('click', loadNewGame);
  }

  /**
   * Snapshot of firebase 'games' collection
   * @param {Object} snapshot Collection of games
   */
  function loadGames(snapshot) {
    if (!currentUser) return;
    activeGamesContainer.innerHTML = 'No active games yet. Start one!';
    pastGamesContainer.innerHTML = 'No completed games yet';
    activeGamesContainer.removeEventListener('click', loadActiveGame);
    pastGamesContainer.removeEventListener('click', replayOpponent);
    activeGamesHtml = '';
    pastGamesHtml = '';
    if (snapshot.empty) {
      console.warn('No games exist yet.');
      return;
    }
    snapshot.docs.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, ' => ', doc.data());
      const game = doc.data();
      if (game.status === 'started' &&
        (game.initiator.uid === currentUser.uid ||
          game.opponent.uid === currentUser.uid)) {
        let myOpponent = game.initiator.uid === currentUser.uid ?
          game.opponent : game.initiator;
        activeGamesHtml +=
`<li class='mdl-list__item mdl-list__item--two-line'>
  <span class='mdl-list__item-primary-content'>
    <i class='material-icons mdl-list__item-avatar'>person</i>
    <span>${myOpponent.displayName}</span>
    <span class='mdl-list__item-sub-title'>
      ${currentUser.uid === game.nextTurn ? 'Your' : 'Their'} turn
    </span>
  </span>
  <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Play</span>
    <div class='mdl-list__item-secondary-action'>
      <i id='${doc.id}' class='material-icons'>grid_on</i>
    </div>
  </span>
</li>`;
      } else if (game.initiator.uid === currentUser.uid ||
        game.opponent.uid === currentUser.uid) {
        let myOpponent = game.initiator.uid === currentUser.uid ?
          game.opponent : game.initiator;
        pastGames[doc.id] = {};
        pastGames[doc.id].uid = myOpponent.uid;
        pastGames[doc.id].displayName = myOpponent.displayName;
        pastGames[doc.id].difficulty = game.difficulty;
        let result;
        if (game.status === 'finished') {
          result = currentUser.uid === game.winner ?
            'You won!!' :
            'They won';
        } else if (game.status === 'abandoned') {
          result = 'Game abandoned';
        } else {
          result = 'They cancelled';
        }
        pastGamesHtml +=
`<li class='mdl-list__item mdl-list__item--two-line'>
  <span class='mdl-list__item-primary-content'>
    <i class='material-icons mdl-list__item-avatar'>person</i>
    <span>${myOpponent.displayName}</span>
    <span class='mdl-list__item-sub-title'>${result}</span>
  </span>
  <span class='mdl-list__item-secondary-content'>
    <span class='mdl-list__item-secondary-info'>Play again</span>
    <div class='mdl-list__item-secondary-action'>
      <i id='${doc.id}' class='material-icons'>replay</i>
    </div>
  </span>
</li>`;
      }
    });
    // console.log(dialogList);
    activeGamesContainer.innerHTML =
      activeGamesHtml === '' ?
        'No active games yet. Start one!' :
        activeGamesHtml;
    pastGamesContainer.innerHTML =
      pastGamesHtml === '' ? 'No completed games yet' : pastGamesHtml;
    activeGamesContainer.addEventListener('click', loadActiveGame);
    pastGamesContainer.addEventListener('click', replayOpponent);
  }

  /**
   * Load game based on user selection
   * @param {Object} event Click event from list container i element
   */
  function replayOpponent(event) {
    window.puzzleWorker.loadPuzzle({
      initiator: {
        uid: currentUser.uid,
        displayName: currentUser.displayName
      },
      opponent: {
        uid: pastGames[event.target.id].uid,
        displayName: pastGames[event.target.id].displayName
      },
      difficulty: pastGames[event.target.id].difficulty
    });
  }

  /**
   * Load game based on user selection
   * @param {Object} event Click event from dialogListContainer
   */
  function loadNewGame(event) {
    let difficulty =
      querySelector('#radioMed').hasAttribute('checked') ? 'medium' : 'easy';
    difficulty =
      querySelector('#radioHard').hasAttribute('checked') ?
        'hard' : difficulty;

    window.puzzleWorker.loadPuzzle({
      initiator: {
        uid: currentUser.uid,
        displayName: currentUser.displayName
      },
      opponent: {
        uid: event.target.id,
        displayName: allUsers[event.target.id].displayName
      },
      difficulty: difficulty
    });
    // unsubscribe();
    // location.hash = '#puzzle';
  }

  /**
   * Load game based on user selection
   * @param {Object} event Click event from dialogListContainer
   */
  function loadActiveGame(event) {
    window.puzzleWorker.fetchPuzzle(event.target.id);
    // unsubscribe();
    // location.hash = '#puzzle';
  }

  /** Clear lists on games view */
  function clearLists() {
    activeGamesContainer.innerHTML =
      'You must sign in to see your active games';
    pastGamesContainer.innerHTML =
      'You must sign in to see your completed games';
    window.puzzleWorker.clearPuzzle();
  }

  /** Init in case we need it */
  function init() {
    console.log('puzzleWorker here!');
  }

  return {
    // initPicker: initPicker,
    init: init,
    subscribe: subscribe,
    unsubscribe: unsubscribe,
    clearLists: clearLists
  };
})(document, window);

puzzleGames.subscribe();
