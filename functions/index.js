/* eslint-env es6 */
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://xwordswf.firebaseio.com',
});
// The Cloud Functions for Firebase SDK to create Cloud Functions and
// setup triggers.
const Firestore = require('@google-cloud/firestore');
const fs = require('fs');
const https = require('https');

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = new Firestore();

// Create a new function which is triggered on changes to /users/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
    .ref('/users/{uid}').onUpdate(async (change, context) => {
    // Get the data written to Realtime Database
      const eventStatus = change.after.val();

      // Then use other event data to create a reference to the
      // corresponding Firestore document.
      const userStatusFirestoreRef = firestore.doc(`users/${context.params.uid}`);

      // It is likely that the Realtime Database change that triggered
      // this event has already been overwritten by a fast change in
      // online / offline status, so we'll re-read the current data
      // and compare the timestamps.
      const statusSnapshot = await change.after.ref.once('value');
      const status = statusSnapshot.val();
      functions.logger.log(status, eventStatus);
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.lastChanged > eventStatus.lastChanged) {
        return null;
      }
      
      // Otherwise, we convert the lastChanged field to a Date
      eventStatus.lastChanged = new Date(eventStatus.lastChanged);

      // ... and write it to Firestore.
      return userStatusFirestoreRef.set(eventStatus, {merge: true});
    });

exports.updateUser = functions.firestore
    .document('games/{gameId}')
    .onUpdate((change, context) => {
      const newValue = change.after.data();
      const previousValue = change.before.data();

      if (newValue.nextTurn !== previousValue.nextTurn) {
        notifyPlayer(newValue.nextTurn);
        return 'success!';
      }
      return 'no change';
    });

/**
 * Sends   to player
 * @param {string} uid uid of player
 */
function notifyPlayer(uid) {
  firestore.doc(`users/${uid}`).get().then((doc) => {
    return doc.data().msgToken;
  }).then((toKey) => {
    if (toKey) {
      functions.logger.log('got users messagetoken: ', toKey);

      const notification = {
        topic: 'your-turn',
        notification: {
          title: 'Your turn!',
          body: 'Your opponent has played their turn',
          icon: 'favicon.ico',
          click_action: 'https://xwordswf.firebaseapp.com',
        }
      };

      return admin.messaging().sendToDevice(toKey, notification);

    }
    return 'no user key available';
  }).catch((error) => {
    functions.logger.log('Error: ', error);
  });
}
