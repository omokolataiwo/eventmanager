'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _validate = require('validate.js');

var _controllers = require('../controllers');

var _signupRules = require('../validate/signupRules');

var _config = require('../config/config.json');

var _const = require('./const');

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
    if (decoded.role !== _const.ACCOUNT_TYPE_ADMIN && decoded.role !== _const.ACCOUNT_TYPE_USER) {
      return res.status(401).json({ auth: false, message: 'Not authorized' });
    }
    req.user = decoded;
    return next();
  });
};

var validateSignup = function validateSignup(req, res, next) {
  var errors = (0, _validate.validate)(req.body, _signupRules.signupRules);

  if (errors === undefined) {
    return next();
  }
  return res.status(400).json(errors);
};

module.exports = function (app) {
  app.post('/users/login', _controllers.user.login);
  app.post('/users', validateSignup, _controllers.user.create);
  app.get('/users', auth, _controllers.user.getUser);
  app.put('/users/update', auth, _controllers.user.update);
  app.post('/vtoken', auth, function (req, res) {
    return res.status(200).json({ state: true });
  }); // TODO: Remove Set all token in axio.global after successful sign up
};