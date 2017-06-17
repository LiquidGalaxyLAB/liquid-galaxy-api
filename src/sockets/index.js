const log = require('../helpers/log');
const { ServerError } = require('../helpers/server');
const controllers = require('../controllers');

const {
  hello,
  kml,
} = controllers;

function errorHandler(error, acknowledgement) {
  // Expected errors always throw ServerError.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, error)) {
    return acknowledgement && acknowledgement({ error: error.message });
  }

  log.error('~~~ Unexpected error exception start ~~~');
  log.error(error);
  log.error('~~~ Unexpected error exception end ~~~');

  return acknowledgement && acknowledgement({ error: '⁽ƈ ͡ (ुŏ̥̥̥̥םŏ̥̥̥̥) ु' });
}

/**
 * Handles controller execution and responds to user (socket version).
 * This way controllers are not attached to the socket.
 * API has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (data, acknowledgement) => {
  const boundParams = params ? params(data) : [];
  try {
    const result = await promise(...boundParams);
    return acknowledgement && acknowledgement(result);
  } catch (error) {
    return errorHandler(error, acknowledgement);
  }
};
const c = controllerHandler; // Just a name shortener.

function connectionHandler(socket) {
  log.dev(`⚡︎ New connection: ${socket.id}`);

  socket.on('disconnect', () => {
    log.dev(`⚡︎ Disconnection: ${socket.id}`);
  });

  /**
   * Hello!
   */
  socket.on('G:/', c(hello.hello));

  /**
   * KMLs.
   */
  socket.on('P:/kmls', c(kml.createKml, data => [data]));
  socket.on('P:/queries', c(kml.createQuery, data => [data]));
}

module.exports = connectionHandler;
