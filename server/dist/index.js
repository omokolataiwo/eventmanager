'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _admin = require('./routes/admin');

var _admin2 = _interopRequireDefault(_admin);

var _event = require('./routes/event');

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

(0, _admin2.default)(app);
(0, _event2.default)(app);
app.get('/', function (req, res) {
  res.send('HELLO COME TO EVENT MANAGER');
});

app.listen(3000, function () {
  console.log('Listening on 3000');
});