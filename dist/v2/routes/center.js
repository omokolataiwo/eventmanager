'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _expressJoiValidator = require('express-joi-validator');

var _expressJoiValidator2 = _interopRequireDefault(_expressJoiValidator);

var _controllers = require('../controllers');

var _config = require('../config/config.json');

var _createCenterSchema = require('../validate/createCenterSchema');

var _createCenterSchema2 = _interopRequireDefault(_createCenterSchema);

var _getCenterSchema = require('../validate/getCenterSchema');

var _getCenterSchema2 = _interopRequireDefault(_getCenterSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return _jsonwebtoken2.default.verify(token, _config.tksecret, function (error, decoded) {
    if (error) {
      return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role > 1 || decoded.role < 0) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = function (app) {
  app.post('/centers', auth, (0, _expressJoiValidator2.default)(_createCenterSchema2.default), _controllers.center.createCenter);
  app.get('/centers', _controllers.center.getCenters);
  app.get('/centers/:id', _controllers.center.getCenter);
  app.put('/centers/:id', auth, _controllers.center.editCenter);
  app.get('/centers/:id/events', auth, _controllers.center.getEvents);
  app.get('/centers/date/:date?', _controllers.center.getCenterByDate);
  app.get('/', function (req, res) {
    return res.status(200).send('Welcome to EventMan - The event manager');
  });
};