'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _api = require('./v2/routes/api2');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
// import apiv1 from './v1/routes/api1';

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

// app.use('/v1', apiv1);
app.use('/v2', _api2.default);

app.use('/', function (req, res) {
  return res.status(200).send('Welcome to EventMan');
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});

module.exports = app;