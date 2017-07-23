const firebase = require('firebase');
const publicIp = require('public-ip');

const { encodeUid } = require('./utils');

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

async function reportGeneralInfo({ uid, hasPassword, displayName }) {
  const encodedUid = encodeUid(uid);
  const serverRef = firebase.database().ref(`/servers/${encodedUid}`);

  await serverRef.child('hasPassword').set(hasPassword || false);
  await serverRef.child('displayName').set(displayName || '');
}

async function reportAlive(uid) {
  const encodedUid = encodeUid(uid);
  const encodedPublicIp = (await publicIp.v4()).replace(/\./g, ':');

  const serverRef = firebase.database().ref(`/servers/${encodedUid}`);
  await serverRef.child('lastOnline').set(SERVER_TIME);
  await serverRef.child('isOnline').set(true);
  serverRef.child('isOnline').onDisconnect().set(false);

  const ipRef = firebase.database().ref(`/ips/${encodedPublicIp}/${encodedUid}`);
  await ipRef.child('lastOnline').set(SERVER_TIME);
  await ipRef.child('isOnline').set(true);
  ipRef.child('isOnline').onDisconnect().set(false);
}

module.exports = {
  reportGeneralInfo,
  reportAlive,
};
