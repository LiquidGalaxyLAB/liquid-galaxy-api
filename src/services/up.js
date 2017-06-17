const firebase = require('firebase');
const localIp = require('ip');
const publicIp = require('public-ip');

async function reportAlive() {
  const currLocalIp = localIp.address();
  const currPublicIp = await publicIp.v4();
  const currPublicIpConverted = currPublicIp.replace(/\./g, '%');
  const ups = firebase.database().ref(`up/${currPublicIpConverted}`);
  return ups.push({
    localIp: currLocalIp,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
}

module.exports = {
  reportAlive,
};
