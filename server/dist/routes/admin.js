'use strict';

var _controllers = require('../controllers');

module.exports = function (app) {
  app.post('/centers', _controllers.admin.createCenter);
  app.get('/centers', _controllers.admin.centers);
  app.get('/centers/:id', _controllers.admin.center);
  app.put('/centers/:id', _controllers.admin.editCenter);
};