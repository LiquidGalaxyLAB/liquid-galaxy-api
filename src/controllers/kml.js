const { ServerError } = require('../helpers/server');
const {
  saveKmlOnDisk,
  saveKmlUriOnDisk,
  cleanKml: cleanKmlService,
  saveQueryOnDisk,
} = require('../services').kml;

function createKml({ contents, uri }) {
  if (Number(!!contents) + Number(!!uri) !== 1) {
    throw new ServerError('Either Contents or Uri must be defined.', 400);
  }

  return contents ? saveKmlOnDisk(contents) : saveKmlUriOnDisk(uri);
}

function cleanKml() {
  return cleanKmlService('');
}

function createQuery({ contents = '' }) {
  return saveQueryOnDisk(contents);
}

module.exports = {
  createKml,
  cleanKml,
  createQuery,
};
