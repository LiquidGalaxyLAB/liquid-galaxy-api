module.exports = {
  // TXT file that acts as a KML router. This file's responsibility is to solely store the remote
  // path that's containing the final KML.
  kmlPath: '/var/www/html/kmls.txt',

  // Path that will be used to store the KML when choosing to store it instead of specifying a
  // remote path.
  tmpKmlPath: '/tmp/earth.kml',

  // File that handles Liquid Galaxy commands (such as flyto).
  queriesPath: '/tmp/query.txt',

  // Firebase repository where all up reports will be sent.
  firebase: {
    apiKey: 'AIzaSyC247KPgAqzFMOgjddZcYZdlUXNkFSTJQE',
    authDomain: 'liquid-galaxy-api-dev.firebaseapp.com',
    databaseURL: 'https://liquid-galaxy-api-dev.firebaseio.com',
    projectId: 'liquid-galaxy-api-dev',
    storageBucket: 'liquid-galaxy-api-dev.appspot.com',
    messagingSenderId: '152920735673',
  },
};
