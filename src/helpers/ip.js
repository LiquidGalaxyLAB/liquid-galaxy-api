const config = require('config');
const log = require('../helpers/log');
const ip = require('ip');

const networkInterface = config.get('networkInterface');

function localIp() {
  try {
    return ip.address(networkInterface);
  } catch (error) {
    log.error(`Network interface ${networkInterface} not found. Autodetecting network interface..`);
    return ip.address();
  }
}

module.exports = { localIp };
