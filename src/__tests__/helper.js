const fetch = require('node-fetch');
const fetchAbsolute = require('fetch-absolute');

const PORT = process.env.PORT || 3030;

// Globals.
global.fetchApi = fetchAbsolute(fetch)(`http://localhost:${PORT}`);
global.headers = { 'Content-Type': 'application/json' };
