const firebase = require('firebase');

const log = require('../helpers/log');
const { encodeUid } = require('./utils');
const controllers = require('../controllers');

const { kml } = controllers;

/* eslint-disable quote-props */
const routes = value => ({
  'kml:value': () => kml.createKml({ contents: value }),
  'kml:href': () => kml.createKml({ uri: value }),
  'kml:clean': () => kml.cleanKml(),
  'queries': () => kml.createQuery({ contents: value }),
});
/* eslint-enable quote-props */

function controllerHandler(route, value) {
  const routeAction = routes(value)[route];
  if (!routeAction) {
    log.dev(`[Firebase] Unrecognised queue type: ${route}`);
    return;
  }

  log.dev(`[Firebase] Executing queue type: ${route}`);
  try {
    routeAction();
  } catch (error) {
    log.error('[Firebase] Failed to execute queue action (might be a sender error):');
    log.error(`Type ${route}`);
    log.error(`Value: ${value}`);
    log.error(error);
  }
}

function listenQueue(uid) {
  const encodedUid = encodeUid(uid);
  const dbRef = firebase.database().ref(`queue/${encodedUid}`);
  dbRef.orderByChild('timestamp').on('child_added', (snapshot) => {
    const snapshotVal = snapshot.val();
    log.dev(`[Firebase] Queue received ${JSON.stringify(snapshotVal)}`);
    controllerHandler(snapshotVal.type, snapshotVal.value);
    snapshot.ref.remove();
  });
}

module.exports = {
  listenQueue,
};
