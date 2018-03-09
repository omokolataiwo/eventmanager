'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  body: {
    name: _joi2.default.string().min(2).max(100).required(),
    address: _joi2.default.string().min(5).max(100).required(),
    state: _joi2.default.number().integer().min(1).max(37).required(),
    capacity: _joi2.default.number().integer().min(5).max(100000).required(),
    facilities: _joi2.default.string().required(),
    amount: _joi2.default.number().integer().min(1).max(100000000).required()
  }
};