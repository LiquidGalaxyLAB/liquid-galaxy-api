const config = require('config');
const firebase = require('firebase');
const localIp = require('ip');
const publicIp = require('public-ip');

async function reportAlive() {
  const currLocalIp = localIp.address();
  const accessPort = config.get('proxy') ? config.get('proxyPort') : config.get('port');
  const currPublicIp = await publicIp.v4();
  const currPublicIpConverted = currPublicIp.replace(/\./g, '%');
  const ups = firebase.database().ref(`up/${currPublicIpConverted}%${accessPort}`);
  return ups.push({
    localIp: currLocalIp,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
  });
}

module.exports = {
  reportAlive,
};
