const firebase = require('firebase');

const log = require('../helpers/log');
const { encodeUid } = require('./utils');
const controllers = require('../controllers');

const { kml } = controllers;

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

const KML_VALUE = 'kml:value';
const KML_HREF = 'kml:href';
const QUERIES = 'queries';

const routes = value => ({
  [KML_VALUE]: () => kml.createKml({ contents: value }),
  [KML_HREF]: () => kml.createKml({ uri: value }),
  [QUERIES]: () => kml.createQuery({ contents: value }),
});

function controllerHandler(route, value) {
  const routeAction = routes(value)[route];
  if (!routeAction) {
    log.dev(`[Firebase] Unrecognised queue type: ${route}`);
    return;
  }
  log.dev(`[Firebase] Executing queue type: ${route}`);
  routeAction();
}

function listenQueue(uid) {
  const encodedUid = encodeUid(uid);
  const dbRef = firebase.database().ref(`queue/${encodedUid}`);
  dbRef.orderByChild('timestamp').on('child_added', (snapshot) => {
    const snapshotVal = snapshot.val();
    controllerHandler(snapshotVal.type, snapshotVal.value);
    snapshot.ref.remove();
  });
}

function demoKml(uid) {
  const encodedUid = encodeUid(uid);
  const dbRef = firebase.database().ref(`queue/${encodedUid}`);
  dbRef.push({
    type: KML_VALUE,
    value: '123',
    timestamp: SERVER_TIME,
  });
}

module.exports = {
  listenQueue,
  demoKml,
};
