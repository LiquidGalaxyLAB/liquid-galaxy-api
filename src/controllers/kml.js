const { ServerError } = require('../helpers/server');
const {
  saveKmlOnDisk,
  saveKmlUriOnDisk,
  saveQueryOnDisk,
} = require('../services').kml;

function createKml(values) {
  const { contents, uri } = values;
  if (Number(!!contents) + Number(!!uri) !== 1) {
    throw new ServerError('Either Contents or Uri must be defined.', 400);
  }

  return contents ? saveKmlOnDisk(contents) : saveKmlUriOnDisk(uri);
}

function createQuery(values) {
  const contents = values.contents || '';
  return saveQueryOnDisk(contents);
}

module.exports = {
  createKml,
  createQuery,
};
