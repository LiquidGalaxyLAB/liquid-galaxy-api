const fetch = require('node-fetch');
const fetchAbsolute = require('fetch-absolute');
const socketioClient = require('socket.io-client');

require('../server');

const PORT = 3030;

const socketioOptions = {
  transports: ['websocket'],
  'force new connection': true,
};

// Globals.
global.fetchApi = fetchAbsolute(fetch)(`http://localhost:${PORT}`);
global.headers = { 'Content-Type': 'application/json' };
global.socketio = socketioClient.connect(`http://localhost:${PORT}`, socketioOptions);

before((done) => {
  socketio.on('connect', () => done());
});

after(() => {
  socketio.disconnect();
});
