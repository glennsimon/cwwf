/* eslint-env es6 */
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
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
  .ref('/users/{uid}').onUpdate(event => {
    // Get the data written to Realtime Database
    const eventStatus = event.data.val();

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(`users/${event.params.uid}`);

    // It is likely that the Realtime Database change that triggered
    // this event has already been overwritten by a fast change in
    // online / offline status, so we'll re-read the current data
    // and compare the timestamps.
    return event.data.ref.once('value').then(statusSnapshot => {
      return statusSnapshot.val();
    }).then(status => {
      console.log(status, eventStatus);
      // If the current timestamp for this data is newer than
      // the data that triggered this event, we exit this function.
      if (status.lastChanged > eventStatus.lastChanged) return;

      // Otherwise, we convert the lastChanged field to a Date
      eventStatus.lastChanged = new Date(eventStatus.lastChanged);

      // ... and write it to Firestore.
      return userStatusFirestoreRef.set(eventStatus, { merge: true });
    }).catch(err => {
      console.error('Error: ', err);
    });
  });

exports.updateUser = functions.firestore
  .document('games/{gameId}')
  .onUpdate(event => {
    const newValue = event.data.data();
    const previousValue = event.data.previous.data();

    if (newValue.nextTurn !== previousValue.nextTurn) {
      return notifyPlayer(newValue.nextTurn);
    }
    return 'no change';
  });

/**
 * Sends notification to player
 * @param {string} uid uid of player
 */
function notifyPlayer(uid) {
  firestore.doc(`users/${uid}`).get().then(doc => {
    return doc.data().msgToken;
  }).then(toKey => {
    if (toKey) {
      const serverKey = fs.readFileSync('./server-key.txt', 'utf8');
      const notification = {
        title: 'Your turn!',
        body: 'Your opponent has played their turn',
        icon: './logo.png',
        click_action: 'https://xwordswf.firebaseapp.com'
      };
      const postData = JSON.stringify({
        notification: notification,
        to: toKey
      });
      const options = {
        hostname: 'fcm.googleapis.com',
        path: '/fcm/send',
        method: 'POST',
        headers: {
          'Authorization': 'key=' + serverKey.trim(),
          'Content-Type': 'application/json'
        }
      };
      const req = https.request(options, res => {
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        res.setEncoding('utf8');
        res.on('data', chunk => {
          console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
          console.log('No more data in response.');
        });
      });

      req.on('error', e => {
        console.error(`problem with request: ${e.message}`);
      });

      // write data to request body
      req.write(postData);
      req.end();
      return 'function complete';
    }
    return 'no user key available';
  }).catch(error => {
    console.error('Error: ', error);
  });
}
