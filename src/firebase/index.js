const firebase = require('firebase');
const config = require('config');
const log = require('../helpers/log');

const auth = require('./auth');
const { reportAlive } = require('./server');

const firebaseConfig = config.get('firebase');

async function initialize() {
  firebase.initializeApp(firebaseConfig);
  return auth.init();
}

function bgReportAlive(serverUid) {
  reportAlive(serverUid);
}

function bgProcessQueue() {

}

async function start() {
  const [uid, , password] = await initialize();
  log.info(`[Firebase] Signed in as ${uid} (${password ? `password ${password}` : 'no password'})`);

  bgReportAlive(uid);
  bgProcessQueue();
}

module.exports = { start };
