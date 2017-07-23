const firebase = require('firebase');
const config = require('config');
const log = require('../helpers/log');

const CronTask = require('../cron/CronTask');
const auth = require('./auth');
const server = require('./server');
const queue = require('./queue');

const firebaseConfig = config.get('firebase');

async function initialize() {
  firebase.initializeApp(firebaseConfig);
  const authValues = await auth();
  await server.reportGeneralInfo({
    uid: authValues.uid,
    hasPassword: !!authValues.password,
    displayName: authValues.displayName,
  });
  return authValues;
}

function bgReportAlive(serverUid) {
  const cron = new CronTask('Report Alive', '0,30 * * * * *', () => server.reportAlive(serverUid));
  cron.executeOnce();
  cron.start();
}

function bgListenQueue(serverUid) {
  queue.listenQueue(serverUid);
}

async function start() {
  const { uid, password } = await initialize();
  log.info(`[Firebase] Signed in as ${uid} (${password ? `password ${password}` : 'no password'})`);

  bgReportAlive(uid);
  bgListenQueue(uid);
}

module.exports = { start };
