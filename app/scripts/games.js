/* eslint-env es6, browser */
const puzzleGames = (function(document, window) {
  const querySelector = document.querySelector.bind(document);
  const gamesDialog = querySelector('#gamesDialog');
  const startGameButton = querySelector('#startGameButton');
  const headerSignin = querySelector('#headerSignin');
  const turnIndicator = querySelector('#turnIndicator');
  const gameOverHeading = querySelector('#gameOverHeading');
  const winMessage = querySelector('#winMessage');
  const opponentHeading = querySelector('#opponentHeading');
  const opponentList = querySelector('#opponentList');
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
  // holder variable for function

  firebase.auth().onAuthStateChanged(user => {
    currentUser = user;
    // fillLists();
    if (user) {
      headerSignin.classList.add('displayNone');
    } else {
      headerSignin.classList.remove('displayNone');
      turnIndicator.classList.add('displayNone');
    }
  });

  if (!gamesDialog.showModal) {
    dialogPolyfill.registerDialog(gamesDialog);
  }

  startGameButton.addEventListener('click', initNewGame);
  headerSignin.addEventListener('click', () => {
    location.hash = '#signin';
  });

  gamesDialog.querySelector('.close').addEventListener('click', () => {
    // unsubscribe();
    gamesDialog.close();
  });

  /** Start a new game or send user to the login page */
  function initNewGame() {
    if (currentUser) {
      // user is logged in
      gameOverHeading.classList.add('displayNone');
      winMessage.classList.add('displayNone');
      gamesDialog.firstChild.classList.add('padding0', 'height100pct');
      opponentHeading.classList.remove('displayNone');
      opponentList.classList.remove('displayNone');
      let replayButton = querySelector('#replayButton');
      if (replayButton) {
        try {
          gamesDialog.firstChild.removeChild(replayButton);
        } catch (err) {
          // do nothing.  replayButton not attached
        }
      }
      gamesDialog.classList.add('height80pct');
      gamesDialog.showModal();
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
        let avatar =
          `<i class='material-icons mdl-list__item-avatar'>person</i>`;
        if (user.photoURL) {
          avatar =
`<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${user.photoURL}' alt='profile picture'>
  </div>
</span>`;
        }
        dialogList +=
`<li class='mdl-list__item mdl-list__item--two-line'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${user.displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${user.providerId.split('.')[0]}
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <div class='mdl-list__item-secondary-action'>
       <i id='${uid}' class='material-icons cursorPointer'>grid_on</i>
     </div>
   </span>
 </li>`;
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
      let avatar = `<i class='material-icons mdl-list__item-avatar'>person</i>`;
      if (game.status === 'started' &&
        (game.initiator.uid === currentUser.uid ||
          game.opponent.uid === currentUser.uid)) {
        let myOpponent = game.initiator.uid === currentUser.uid ?
          game.opponent : game.initiator;
        let opponentPhoto = allUsers[myOpponent.uid].photoURL;
        if (opponentPhoto) {
          avatar =
`<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${opponentPhoto}' alt='profile picture'>
  </div>
</span>`;
        }
        activeGamesHtml +=
`<li class='mdl-list__item mdl-list__item--two-line'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${myOpponent.displayName}</span>
     <span class='mdl-list__item-sub-title'>
       ${currentUser.uid === game.nextTurn ? 'Your' : 'Their'} turn
     </span>
   </span>
   <span class='mdl-list__item-secondary-content'>
     <span class='mdl-list__item-secondary-info'>Play</span>
     <div class='mdl-list__item-secondary-action'>
       <i id='${doc.id}' class='material-icons cursorPointer'>grid_on</i>
     </div>
   </span>
 </li>`;
      } else if (game.initiator.uid === currentUser.uid ||
        game.opponent.uid === currentUser.uid) {
        let myOpponent = game.initiator.uid === currentUser.uid ?
          game.opponent : game.initiator;
        let result;
        if (game.status === 'finished') {
          result = currentUser.uid === game.winner ?
            'You won!!' :
            'They won';
        } else if (game.status === 'abandoned') {
          result = 'Game abandoned';
        } else {
          result = 'Game cancelled';
        }
        pastGames[doc.id] = {};
        pastGames[doc.id].difficulty = game.difficulty;
        let opponentPhoto = allUsers[myOpponent.uid].photoURL;
        if (opponentPhoto) {
          avatar =
`<span class='picContainer material-icons mdl-list__item-avatar'>
  <div>
    <img class='photoCrop' src='${opponentPhoto}' alt='profile picture'>
  </div>
</span>`;
        }
        pastGamesHtml +=
`<li id='${doc.id}' class='mdl-list__item mdl-list__item--two-line\
 cursorPointer'>
   <span class='mdl-list__item-primary-content'>
     ${avatar}
     <span>${myOpponent.displayName}</span>
     <span class='mdl-list__item-sub-title'>${result}</span>
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
    pastGamesContainer.addEventListener('click', showPastGame);
  }

  /**
   * Show dialog for user to decide if they want to replay the opponent
   * @param {Object} event Click event from replayButton in dialog
   */
  function showPastGame(event) {
    let eventTarget = event.target;
    while (!eventTarget.id) {
      if (eventTarget.nodeName.toLowerCase() === 'ul') return;
      eventTarget = eventTarget.parentElement;
    }
    window.puzzleWorker.fetchPuzzle(eventTarget.id);
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
   * Show dialog for user to decide if they want to replay the opponent
   * @param {Object} game Previous game versus the opponent
   * @param {string} result Message about who won
   */
  function showReplayDialog(game, result) {
    winMessage.innerText = result;
    gameOverHeading.classList.remove('displayNone');
    winMessage.classList.remove('displayNone');
    opponentHeading.classList.add('displayNone');
    opponentList.classList.add('displayNone');
    gamesDialog.classList.remove('height80pct');
    gamesDialog.firstChild.classList.remove('padding0', 'height100pct');
    let replayButton = querySelector('#replayButton');
    if (!replayButton) {
      replayButton = document.createElement('button');
      replayButton.setAttribute('id', 'replayButton');
      replayButton.classList.add('mdl-button', 'mdl-js-button',
        'mdl-button--raised', 'mdl-js-ripple-effect',
        'mdl-button--accent', 'cursorPointer');
      replayButton.innerText = 'Play Again!';
      gamesDialog.firstChild.appendChild(replayButton);
      replayButton.addEventListener('click', replayOpponent);
    }
    if (!gamesDialog.open) gamesDialog.showModal();

    /** Load game based on user selection */
    function replayOpponent() {
      let difficulty =
        querySelector('#radioMed').hasAttribute('checked') ? 'medium' : 'easy';
      difficulty =
        querySelector('#radioHard').hasAttribute('checked') ?
          'hard' : difficulty;

      let they = currentUser.uid === game.initiator.uid ?
        'opponent' : 'initiator';
      // load puzzle based on uids of players
      window.puzzleWorker.loadPuzzle({
        initiator: {
          uid: currentUser.uid,
          displayName: currentUser.displayName
        },
        opponent: {
          uid: game[they].uid,
          displayName: game[they].displayName
        },
        difficulty: difficulty
      });
      gamesDialog.close();
    }
  }

  /**
   * Load game based on user selection
   * @param {Object} event Click event from dialogListContainer
   */
  function loadActiveGame(event) {
    if (event.target.nodeName.toLowerCase() !== 'i') return;
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
    clearLists: clearLists,
    showReplayDialog: showReplayDialog
  };
})(document, window);

puzzleGames.subscribe();
