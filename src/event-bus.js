class EventBus extends EventTarget {
  on(type, listener) {
    this.addEventListener(type, listener);
  }
  once(type, listener) {
    this.addEventListener(type, listener, { once: true });
  }
  // off(type, listener) {
  //   this.removeEventListener(type, listener);
  // }
  emit(type, data) {
    this.dispatchEvent(new CustomEvent(type, { detail: data }));
  }
}

const eventBus = new EventBus();

export { eventBus };
