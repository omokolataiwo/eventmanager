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

module.exports = {
  create: function create(req, res) {
    req.body.phonenumber += '';
    var user = new _user2.default(req.body);
    if (!user.safe()) {
      return res.status(400).json({ errors: user.getErrors() });
    }
    req.body.password = _bcryptjs2.default.hashSync(req.body.password, 8);
    return _models2.default.users.findOne({
      where: {
        $or: [{ username: req.body.username }, { phonenumber: req.body.phonenumber }, { email: req.body.email }]
      }
    }).then(function (user) {
      if (user) {
        return res.status(400).json({
          errors: { global: ['username or phonenumber or email has already been used.'] }
        });
      }
      return _models2.default.users.create(req.body).then(function (user) {
        user = user.toJSON();
        delete user.password;
        return res.status(200).json({ payload: user, success: { global: ['Account created'] } });
      }).catch(function (error) {
        return res.status(500).json(error);
      });
    }).catch(function (error) {
      return res.status(500).json(error);
    });
  },
  login: function login(req, res) {
    if (!req.body.username || !req.body.password) {
      return res.status(401).json({ errors: { global: ['Invalid username or password'] } });
    }

    return _models2.default.users.findOne({
      where: { username: req.body.username }
    }).then(function (user) {
      if (!user || !_bcryptjs2.default.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ errors: { global: ['Invalid username or password'] } });
      }

      var token = _jsonwebtoken2.default.sign({ id: user.id, role: user.role }, _config.tksecret, { expiresIn: 86400 });
      res.status(200).send({ auth: true, token: token, userdata: user });
    }).catch(function (e) {
      console.log(e);
      res.status(500).send('Server Error');
    });
  },
  getEvents: function getEvents(req, res) {
    return _models2.default.events.findAll({
      where: {
        userid: req.user.id
      }
    }).then(function (events) {
      return res.status(200).json(events);
    }).catch(function (error) {
      return res.status(500).json(error);
    });
  }
};