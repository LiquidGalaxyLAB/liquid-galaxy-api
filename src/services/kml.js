const Promise = require('bluebird');
const config = require('config');
const fs = require('fs');
const uuid = require('uuid/v4');

Promise.promisifyAll(fs);

const kmlPath = config.get('kmlPath');
const tmpKmlPath = config.get('tmpKmlPath');
const queriesPath = config.get('queriesPath');

/**
 * Saves KML file on disk and sets the kmls.txt to point at it.
 * @param data KML contents.
 */
async function saveKmlOnDisk(contents) {
  await fs.writeFile(tmpKmlPath, contents);
  return fs.writeFile(kmlPath, `file://${tmpKmlPath}?${uuid()}`);
}

/**
 * Overrides kmls.txt to point to the indicated URI.
 * @param uri any uri (i.e. http://192.168.1.10/kmls.txt).
 */
function saveKmlUriOnDisk(uri) {
  return fs.writeFile(kmlPath, `${uri}?${uuid()}`);
}

function saveQueryOnDisk(contents) {
  return fs.writeFile(queriesPath, contents);
}

module.exports = {
  saveKmlOnDisk,
  saveKmlUriOnDisk,
  saveQueryOnDisk,
};
