'use strict';

var _controllers = require('../controllers');

var auth = function auth(req, res, next) {
  next();
};

module.exports = function (app) {
  app.post('/events', auth, _controllers.event.createEvent);
  app.delete('/events/:id', auth, _controllers.event.deleteEvent);
  app.put('/events/:id', auth, _controllers.event.editEvent);
};