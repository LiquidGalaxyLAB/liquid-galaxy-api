const firebase = require('firebase');

const { encodeUid } = require('./utils');

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

async function reportAlive(uid) {
  const encodedUid = encodeUid(uid);
  await firebase.database().ref(`/servers/${encodedUid}/lastOnline`).set(SERVER_TIME);
  await firebase.database().ref(`/servers/${encodedUid}/isOnline`).set(true);
  firebase.database().ref(`/servers/${encodedUid}/isOnline`).onDisconnect().set(false);
}

module.exports = {
  reportAlive,
};
