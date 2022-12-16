document.querySelector('.button__send').addEventListener('click', async () => {
  console.log('Player hit the email send button.');
  inviteProgressContainer.classList.add('displayFlex');
  inviteProgressContainer.classList.remove('displayNone');
  inviteLoadSpinner.classList.add('is-active');
  const currentUser = getCurrentUserController();
  const gameStartParameters = {};
  const myUid = currentUser.uid;
  gameStartParameters.players = {};
  gameStartParameters.players[myUid] = {};
  gameStartParameters.players[myUid].bgColor = 'bgTransRed';
  gameStartParameters.viewableBy = [];
  gameStartParameters.viewableBy.push(myUid);
  // opponent - assume never signed in
  const oppName = firstName.value || 'Friend';
  const pendUid = await pendingPlayerController({ firstName: oppName });
  console.log('pendUid: ', pendUid);
  gameStartParameters.players[pendUid] = {};
  gameStartParameters.players[pendUid].bgColor = 'bgTransBlue';
  gameStartParameters.viewableBy.push(pendUid);
  // for first game, default to 'easy' game
  gameStartParameters.difficulty = 'easy';
  const gameId = await startNewGameController(gameStartParameters);
  inviteProgressContainer.classList.add('displayNone');
  inviteProgressContainer.classList.remove('displayFlex');
  inviteLoadSpinner.classList.remove('is-active');
  inviteDialog.close();

  const encodedSubj = encodeURIComponent(
    `I've invited you to play a Crossword game!`
  );
  const encodedBody = encodeURIComponent(
    `${oppName},\n\nI found a crossword game that two people can play ` +
      `against each other, and I'd like to try playing it with you.\n\n` +
      `Here is the link to the game I started:\n` +
      `${document.location.origin}?pending=${pendUid}&game=${gameId}#signin` +
      `\n\nIf you click on the link and sign in, the game will show up in ` +
      `your Active Games list so we can play.\n\nLet's try it!`
  );

  window.location.href =
    `mailto:${inviteEmail.value}?subject=${encodedSubj}` +
    `&body=${encodedBody}`;
});

/**
 * Shows an error dialog with appropriate messaging
 * @param {string} message Type of error
 */
function showErrorDialogView(message) {
  document.querySelector('.header__activity').innerHTML = '';
  document.querySelector('.dialog__error--message').innerText = message;
  document
    .querySelector('.dialog__button--ok')
    .addEventListener('click', () => {
      document.querySelector('.mdl-dialog__content').innerHTML = '';
      document.querySelector('.dialog__shell').close();
    });
  document
    .querySelector('.dialog__shell.close')
    .addEventListener('click', () => {
      document.querySelector('.dialog__shell').close();
    });
  document.querySelector('.dialog__shell').showModal();
}

export { showErrorDialogView };
