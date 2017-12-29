'use strict';

var _controllers = require('../controllers');

module.exports = function (app) {
  app.post('/events', _controllers.event.createEvent);
  app.get('/events/:id', _controllers.event.deleteEvent);
  app.put('/events/:id', _controllers.event.editEvent);
};