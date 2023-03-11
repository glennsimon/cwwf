import { db } from '../../firebase-init.js';
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { showActivity } from '../../pageFrags/activity/activity.js';
import { scoring, startNewGame } from '../puzzle/puzzleC.js';
import { loadGames } from './gamesV.js';

let myGames = [];
let gameListUnsubscribe = () => {};

/**
 * Populate list of all games that is viewable to the current user
 * from firestore when auth changes or when something changes in that list.
 * @param {string} uid User ID
 */
async function populateMyGames(uid) {
  console.log('Hello from populateMyGames.');
  if (!uid) return;
  showActivity('.header__activity', 'Fetching games...');
  subscribeToGameList(uid);
}

function subscribeToGameList(uid) {
  console.log('Hello from subscribeToGame.');
  // Stop listening for previous puzzle changes
  gameListUnsubscribe();

  const q = query(
    collection(db, 'gameListBuilder'),
    where('viewableBy', 'array-contains', `${uid}`)
    // TODO: add later when bug is fixed (soon): orderBy('start', 'desc'),
    // limit(30)
  );

  // Start listening to current puzzle changes
  gameListUnsubscribe = onSnapshot(q, (snapshot) => {
    const myPastGames = [];
    const myActiveGames = [];
    const userIds = [];
    // let currentOpponentUid = null;
    snapshot.forEach((doc) => {
      // console.log('query snapshot doc.data(): ', doc.data());
      const gameListItem = doc.data();
      gameListItem.gameId = doc.id;
      if (gameListItem.finish) {
        myPastGames.push(gameListItem);
      } else {
        myActiveGames.push(gameListItem);
      }
    });
    myPastGames.sort((a, b) => {
      return b.finish - a.finish;
    });
    myActiveGames.sort((a, b) => {
      return b.start - a.start;
    });
    myGames = myActiveGames.concat(myPastGames);
    loadGames();
    return;
  });
}

function clearGameList() {
  gameListUnsubscribe();
  gameListUnsubscribe = () => {};
}

/** Load game based on user selection */
function replayOpponent(game, difficulty) {
  showActivity('.header__activity', 'Getting new game...');
  // load puzzle based on uids of players
  const gameStartParameters = {};
  gameStartParameters.difficulty = difficulty;
  gameStartParameters.players = game.players;
  gameStartParameters.viewableBy = Object.keys(game.players);
  gameStartParameters.scoring = scoring;
  startNewGame(gameStartParameters);
}

export { populateMyGames, replayOpponent, clearGameList, myGames };
