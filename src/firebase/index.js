const firebase = require('firebase');
const config = require('config');

const auth = require('./auth');

const firebaseConfig = config.get('firebase');

async function initialize() {
  firebase.initializeApp(firebaseConfig);
  await auth();
}

module.exports = {
  initialize,
};
