const firebase = require('firebase');
const publicIp = require('public-ip');

const { encodeUid } = require('./utils');

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

function serverRef(uid) {
  const encodedUid = encodeUid(uid);
  return firebase.database().ref(`/servers/${encodedUid}`);
}

async function ipRef(uid) {
  const encodedUid = encodeUid(uid);
  const currentPublicIp = await publicIp.v4();
  const encodedPublicIp = currentPublicIp.replace(/\./g, ':');
  return firebase.database().ref(`/ips/${encodedPublicIp}/${encodedUid}`);
}

async function reportGeneralInfo({ uid, hasPassword = false, displayName = '' }) {
  const server = serverRef(uid);
  await server.child('hasPassword').set(hasPassword);
  await server.child('displayName').set(displayName);

  const ip = await ipRef(uid);
  await ip.child('hasPassword').set(hasPassword);
  await ip.child('displayName').set(displayName);
}

async function reportAlive(uid) {
  const server = serverRef(uid);
  await server.child('lastOnline').set(SERVER_TIME);
  await server.child('isOnline').set(true);
  server.child('isOnline').onDisconnect().set(false);

  const ip = await ipRef(uid);
  await ip.child('lastOnline').set(SERVER_TIME);
  await ip.child('isOnline').set(true);
  ip.child('isOnline').onDisconnect().set(false);
}

module.exports = {
  reportGeneralInfo,
  reportAlive,
};
