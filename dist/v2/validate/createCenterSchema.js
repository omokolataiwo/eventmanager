'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  body: {
    name: _joi2.default.string().min(2).max(100).required(),
    address: _joi2.default.string().min(5).max(100).required(),
    state: _joi2.default.number().integer().required(),
    capacity: _joi2.default.number().integer().min(5).max(10000).required(),
    ownerid: _joi2.default.number().integer().required(),
    facilities: _joi2.default.string(),
    amount: _joi2.default.number().integer().min(1).max(100000000).required()
  }
};