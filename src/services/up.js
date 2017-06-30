const config = require('config');
const firebase = require('firebase');
const publicIp = require('public-ip');

const { localIp } = require('../helpers/ip');

async function reportAlive() {
  const currLocalIp = localIp();
  const accessPort = config.get('proxy') ? config.get('proxyPort') : config.get('port');
  const currPublicIp = await publicIp.v4();
  const currPublicIpConverted = currPublicIp.replace(/\./g, '%');
  const ups = firebase.database().ref(`up/${currPublicIpConverted}`);
  return ups.push({
    localIp: currLocalIp,
    timestamp: firebase.database.ServerValue.TIMESTAMP,
    port: accessPort,
  });
}

module.exports = {
  reportAlive,
};
