const firebase = require('firebase');
const config = require('config');

const firebaseConfig = config.get('firebase');

function initialize() {
  firebase.initializeApp(firebaseConfig);
}

module.exports = {
  initialize,
};
