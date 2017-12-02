'use strict';

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  body: {
    firstname: _joi2.default.string().min(2).max(100).required(),
    lastname: _joi2.default.string().min(2).max(100).required(),
    address: _joi2.default.string().min(2).max(100).required(),
    state: _joi2.default.number().integer().required(),
    phonenumber: _joi2.default.number().integer().required(),
    username: _joi2.default.string().min(2).max(100).required(),
    password: _joi2.default.string().min(2).max(100).required(),
    repassword: _joi2.default.string().required(),
    role: _joi2.default.number().integer().min(1).max(2).required(),
    email: _joi2.default.string().email().required()
  }
};