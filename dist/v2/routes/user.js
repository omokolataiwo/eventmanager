'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _expressJoiValidator = require('express-joi-validator');

var _expressJoiValidator2 = _interopRequireDefault(_expressJoiValidator);

var _controllers = require('../controllers');

var _createUserSchema = require('../validate/createUserSchema');

var _createUserSchema2 = _interopRequireDefault(_createUserSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (app) {
  app.post('/users/login', _controllers.user.login);
  app.post('/users', (0, _expressJoiValidator2.default)(_createUserSchema2.default), _controllers.user.create);
};