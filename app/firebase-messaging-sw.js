importScripts('/__/firebase/4.9.0/firebase-app.js');
importScripts('/__/firebase/4.9.0/firebase-messaging.js');
importScripts('/__/firebase/init.js');

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(payload => {
  const title = 'Hello World!';
  const options = {
    body: payload.data.status
  };
  return self.registration.showNotification(title, options);
});