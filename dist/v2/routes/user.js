'use strict';

var _controllers = require('../controllers');

module.exports = function (app) {
  app.post('/users/login', _controllers.user.login);
  app.post('/users', _controllers.user.create);
};