const firebase = require('firebase');
const CronTask = require('../cron/CronTask');

const SERVER_TIME = firebase.database.ServerValue.TIMESTAMP;

function reportAlive(uid) {
  console.info(firebase.auth().currentUser);
  console.info(`/servers/${uid}/lastOnline`);
  firebase.database().ref(`/servers/${uid}/lastOnline`).set(SERVER_TIME);
}

module.exports = {
  reportAlive,
};
