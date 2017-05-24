module.exports = {
  // TXT file that acts as a KML router. This file's responsibility is to solely store the remote
  // path that's containing the final KML.
  kmlPath: '/var/www/html/kmls.txt',

  // Path that will be used to store the KML when choosing to store it instead of specifying a
  // remote path.
  tmpKmlPath: '/tmp/earth.kml',

  // File that handles Liquid Galaxy commands (such as flyto).
  queriesPath: '/tmp/query.txt',
};
