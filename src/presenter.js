import { auth } from './firebase-init';
import { EventBus } from './event-bus';
import { onAuthStateChanged } from 'firebase/auth';

const eventTypes = {
  turnPlayed: 'turnPlayed',
  letterEntered: 'letterEntered',
  startNewGame: 'startNewGame',
  getGame: 'getGame',
};

onAuthStateChanged(auth);
