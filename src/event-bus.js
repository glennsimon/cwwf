const eventType = {
  authChange: 'authChange',
  signedOut: 'signedOut',
  // turnPlayed: 'turnPlayed',
  // letterEntered: 'letterEntered',
  startNewGame: 'startNewGame',
  // getGame: 'getGame',
  openNewGameDialog: 'openNewGameDialog',
};

class EventBus extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener);
  }
  once(type, listener) {
    this.addEventListener(type, listener, { once: true });
  }
  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, { detail: data }));
  }
}

const eventBus = new EventBus();

export { eventBus, eventType };
