const publicIp = require('public-ip');

const log = require('../helpers/log');

/**
 * Uid is part of the firebase email name. This encoding makes sure to use only email valid
 * characters.
 * @param uid
 */
function encodeUid(uid) {
  return uid.split('').reduce((prev, curr) => {
    const encodedCurr = curr.charCodeAt(0);
    return `${prev}${encodedCurr}`;
  }, '');
}

/**
 * Fetches current public IP, and returns it Firebase encoded.
 * If there was a problem retrieving the IP, an empty string is returned.
 */
async function encodedPublicIp() {
  try {
    const ip = await publicIp.v4();
    log.dev(`Current public IP address: ${ip}`);
    const encodedIp = ip.replace(/\./g, ':');
    return encodedIp;
  } catch (error) {
    log.error('Public IP address couldn\'t be retrieved:');
    log.error(error);
    return '';
  }
}

module.exports = {
  encodeUid,
  encodedPublicIp,
};
