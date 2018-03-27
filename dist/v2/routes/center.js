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

var _idroute = require('../validate/idroute');

var _idroute2 = _interopRequireDefault(_idroute);

var _const = require('./const');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).json({ auth: false, message: 'No token provided' });
  }
  return _jsonwebtoken2.default.verify(token, _config.tksecret, function (error, decoded) {
    if (error) {
      return res.status(500).json({ auth: false, type: error.name });
    }

    if (decoded.role !== _const.ACCOUNT_TYPE_ADMIN) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

module.exports = function (app) {
  app.post('/centers', auth, _controllers.center.createCenter); // Create Center
  app.get('/centers', _controllers.center.getCenters); // Get all centers
  app.get('/centers/own', auth, _controllers.center.getOwnCenter); // Get own centers
  app.get('/centers/contacts', auth, _controllers.center.getContacts); // Get Own Center Contacts
  app.get('/centers/:id', (0, _expressJoiValidator2.default)(_idroute2.default), _controllers.center.getCenter); // Get a Single Center, does not need authentication
  app.get('/centers/:id/events', (0, _expressJoiValidator2.default)(_idroute2.default), auth, _controllers.center.getCenterWithEvents); // Get Center with events, protected
  app.get('/centers/search', _controllers.center.search);
  app.put('/centers/:id', (0, _expressJoiValidator2.default)(_idroute2.default), auth, _controllers.center.editCenter); // Update a center
  app.get('/', function (req, res) {
    return res.status(200).send('Welcome to EventMan - The event manager');
  });
};