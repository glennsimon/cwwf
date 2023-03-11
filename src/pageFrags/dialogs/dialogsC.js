import { startNewGame } from '../../pages/puzzle/puzzleC';
import { currentUser, initPendingPlayer } from '../../pages/signin/signinC';
import { hideActivity } from '../../shellV';

async function sendInvitation() {
  console.log('Player hit the email send button.');
  const gameStartParameters = {};
  const myUid = currentUser.uid;
  gameStartParameters.players = {};
  gameStartParameters.players[myUid] = {};
  gameStartParameters.players[myUid].bgColor = 'bg-color__red--translucent';
  gameStartParameters.viewableBy = [];
  gameStartParameters.viewableBy.push(myUid);
  // opponent - assume never signed in
  const oppName = firstName.value || 'Friend';
  const pendUid = await initPendingPlayer({ firstName: oppName });
  console.log('pendUid: ', pendUid);
  gameStartParameters.players[pendUid] = {};
  gameStartParameters.players[pendUid].bgColor = 'bg-color__blue--translucent';
  gameStartParameters.viewableBy.push(pendUid);
  // for first game, default to 'easy' game
  gameStartParameters.difficulty = 'easy';
  gameStartParameters.scoring = currentUser.prefScoring;
  const gameId = await startNewGame(gameStartParameters);
  startDefaultMail(oppName, document.location.origin, pendUid, gameId);
  hideActivity();
}

/**
 * Navigates to the user's default email app, with a message populated
 * with the invitation to start a new game with another user.
 * @param {string} oppName
 * @param {string} origin
 * @param {string} pendUid
 * @param {string} gameId
 */
function startDefaultMail(oppName, origin, pendUid, gameId) {
  const encodedSubj = encodeURIComponent(
    `I've invited you to play a Crossword game!`
  );
  const encodedBody = encodeURIComponent(
    `${oppName},\n\nI found a crossword game that two people can play ` +
      `against each other, and I'd like to try playing it with you.\n\n` +
      `Here is the link to the game I started:\n` +
      `${origin}?pending=${pendUid}&game=${gameId}#signin` +
      `\n\nIf you click on the link and sign in, the game will show up in ` +
      `your Active Games list so we can play.\n\nLet's try it!`
  );
  window.location.href =
    `mailto:${inviteEmail.value}?subject=${encodedSubj}` +
    `&body=${encodedBody}`;
}

export { sendInvitation };
