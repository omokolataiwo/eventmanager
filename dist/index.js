'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _api = require('./v2/routes/api2');

var _api2 = _interopRequireDefault(_api);

var _util = require('util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import apiv1 from './v1/routes/api1';
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _cors2.default)());

// app.use('/api/v1', apiv1);
app.use('/api/v2', _api2.default);

app.get('/', _api2.default);
app.use(function (err, req, res, next) {
  if (err.isBoom) {
    var errors = err.output.payload.message.split(',');
    var ret = '';
    errors.forEach(function (error) {
      var singleError = error.split(/\[/);
      ret = singleError[singleError.length - 1];
      ret = ret.match(/.+[^\]]/)[0];
    });
    return res.status(err.output.statusCode).json(ret);
  }
  return res.json(err);
});

app.listen(process.env.PORT || 5000);

module.exports = app;