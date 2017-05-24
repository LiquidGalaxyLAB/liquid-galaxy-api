const { ServerError } = require('../helpers/server');
const {
  saveKmlOnDisk,
  saveKmlUriOnDisk,
  // saveQueryOnDisk,
} = require('../services').kml;

async function createKml(values) {
  const EITHER_CONTENTS_OR_URI_MUST_BE_DEFINED = 'Either Contents or Uri must be defined.';
  if (!values) {
    throw new ServerError(EITHER_CONTENTS_OR_URI_MUST_BE_DEFINED, 400);
  }

  const { contents, uri } = values;
  if (Number(!!contents) + Number(!!uri) !== 1) {
    throw new ServerError(EITHER_CONTENTS_OR_URI_MUST_BE_DEFINED, 400);
  }

  return contents ? saveKmlOnDisk(contents) : saveKmlUriOnDisk(uri);
}

function createQuery(values) {
  return values;
}

module.exports = {
  createKml,
  createQuery,
};
