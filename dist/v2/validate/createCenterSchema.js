'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  body: {
    name: _joi2.default.string().min(2).max(100).required(),
    email: _joi2.default.string().email().required()
  }
};