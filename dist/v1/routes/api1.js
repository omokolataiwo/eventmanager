'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = _express2.default.Router();
(0, _admin2.default)(app);
(0, _event2.default)(app);
module.exports = app;