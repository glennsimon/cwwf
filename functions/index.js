const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const Firestore = require('@google-cloud/firestore');

// Since this code will be running in the Cloud Functions enviornment
// we call initialize Firestore without any arguments because it
// detects authentication from the environment.
const firestore = new Firestore();

// Create a new function which is triggered on changes to /status/{uid}
// Note: This is a Realtime Database trigger, *not* Cloud Firestore.
exports.onUserStatusChanged = functions.database
  .ref('/status/{uid}').onUpdate(event => {
    // Get the data written to Realtime Database
    const eventStatus = event.data.val();

    // Then use other event data to create a reference to the
    // corresponding Firestore document.
    const userStatusFirestoreRef = firestore.doc(`status/${event.params.uid}`);

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
      return userStatusFirestoreRef.set(eventStatus);
    });
  });
