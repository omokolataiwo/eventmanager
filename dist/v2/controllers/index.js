'use strict';

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  admin: _admin2.default,
  event: _event2.default,
  user: _user2.default
};