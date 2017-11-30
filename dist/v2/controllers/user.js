'use strict';

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _config = require('../config/config.json');

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

var _user = require('./_support/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mUser = _models2.default.users;

module.exports = {
  create: function create(req, res) {
    var user = new _user2.default(req.body);

    if (!user.safe()) {
      return res.status(400).json(user.getErrors());
    }

    req.body.password = _bcryptjs2.default.hashSync(req.body.password, 8);
    return mUser.create(req.body).then(function (user) {
      res.status(200).send('Account created');
    }).catch(function (error) {
      return res.status(400).send(error);
    });
  },
  login: function login(req, res) {

    if (!req.body.username || !req.body.password) {
      return res.status(401).send('Invalid username or password');
    }

    _models2.default.users.findOne({
      where: { username: req.body.username }
    }).then(function (user) {
      if (!user) {
        return res.status(401).send('Invalid username or password');
      }

      if (!_bcryptjs2.default.compareSync(req.body.password, user.password)) {
        return res.status(401).send('Invalid username or password');
      }

      var token = _jsonwebtoken2.default.sign({ id: user.id, role: user.role }, _config.tksecret, { expiresIn: 86400 });
      res.status(200).send({ auth: true, token: token });
    });
  }
};