'use strict';

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import Center from './_support/event';

module.exports = {
  createEvent: function createEvent(req, res) {
    return res.send('create event.');
  },
  deleteEvent: function deleteEvent(req, res) {},
  editEvent: function editEvent(req, res) {}
};