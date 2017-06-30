module.exports = {
  // Application port.
  port: 3030,

  // That's not the application port! If you are running the API behind a proxy (like liquid-galaxy
  // by default is), make sure to set this port to the proxy's one.
  // This port, along with the local IP, is the one that client's will connect to the API through.
  proxy: true,
  proxyPort: 82,

  // Network interface. Optional but highly recommended: Liquid Galaxy setup might confuse your
  // network device with the one it uses for its internal network.
  networkInterface: 'eth0', // Leave blank to autodetect.

  // TXT file that acts as a KML router. This file's responsibility is to solely store the remote
  // path that's containing the final KML.
  kmlPath: '/var/www/html/kmls.txt',

  // Path that will be used to store the KML when choosing to store it instead of specifying a
  // remote path.
  tmpKmlPath: '/tmp/earth.kml',

  // File that handles Liquid Galaxy commands (such as flyto).
  queriesPath: '/tmp/query.txt',

  // Run Cron jobs (such as alive reports).
  cronJobsEnabled: true,

  // Firebase repository where all alive reports will be sent.
  firebase: {
    apiKey: 'AIzaSyAddzwazFGRJiC-GW35Zgr7XdhUk8x0890',
    authDomain: 'liquid-galaxy-api.firebaseapp.com',
    databaseURL: 'https://liquid-galaxy-api.firebaseio.com',
    projectId: 'liquid-galaxy-api',
    storageBucket: 'liquid-galaxy-api.appspot.com',
    messagingSenderId: '822593561436',
  },
};
