'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _controllers = require('../controllers');

var _config = require('../config/config.json');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = function auth(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token) {
    return res.status(401).send({ auth: false, message: 'No token provided' });
  }

  _jsonwebtoken2.default.verify(token, _config.tksecret, function (error, decoded) {
    if (error) {
      return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    if (decoded.role > 1 || decoded.role < 0) {
      return res.status(401).send("Not authorized");
    }

    req.user = decoded;
    return next();
  });
};

module.exports = function (app) {
  app.post('/centers', auth, _controllers.admin.createCenter);
  app.get('/centers', _controllers.admin.centers);
  app.get('/centers/:id', _controllers.admin.center);
  app.put('/centers/:id', auth, _controllers.admin.editCenter);
};