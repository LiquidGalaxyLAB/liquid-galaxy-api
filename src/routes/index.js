const express = require('express');

const log = require('../helpers/log');
const { ServerError } = require('../helpers/server');
const controllers = require('../controllers');

const router = express.Router();
const {
  hello,
  kml,
} = controllers;

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const c = controllerHandler;

/**
 * Hello!
 */
router.get('/', c(hello.hello));

/**
 * KMLs.
 */
router.post('/kmls', c(kml.createKml, req => [req.body]));
router.post('/kmls/clean', c(kml.cleanKml));
router.post('/queries', c(kml.createQuery, req => [req.body]));

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  // Expected errors always throw ServerError.
  // Unexpected errors will either throw unexpected stuff or crash the application.
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {
    return res.status(err.status || 500).json({ error: err.message });
  }

  log.error('~~~ Unexpected error exception start ~~~');
  log.error(req);
  log.error(err);
  log.error('~~~ Unexpected error exception end ~~~');


  return res.status(500).json({ error: '⁽ƈ ͡ (ुŏ̥̥̥̥םŏ̥̥̥̥) ु' });
});

module.exports = router;
