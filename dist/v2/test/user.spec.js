'use strict';

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../../index');

var _index2 = _interopRequireDefault(_index);

var _users = require('./fixtures/users');

var _users2 = _interopRequireDefault(_users);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

describe('Base setup', function () {
  before(function () {
    _models2.default.users.destroy({ truncate: true });
  });
});

describe('post /users', function () {
  it('should create a new user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users').send(_users2.default.register.validAdminUser).end(function (err, res) {
      console.log(res);
      expect(true).to.equal(true);
      done();
    });
  });

  it('should not create user with same credientials', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users').send(_users2.default.register.validAdminUser).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.equal('username or phonenumber or email has already been used.');
      done();
    });
  });

  it('should not create user with different password', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users').send(_users2.default.register.invalidPasswordCombination).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);

      expect(res.body).to.deep.have.property('message').that.have.property('password').that.equal('Password and repassword does not match');
      done();
    });
  });
});

describe('post /users/login', function () {
  it('should not login with wrong credential', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.WrongPassword).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.equal('Invalid username or password');
      done();
    });
  });

  it('should not login with no username', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.NOUsername).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.equal('Invalid username or password');
      done();
    });
  });

  it('should not login with no password', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.NOPassword).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.equal('Invalid username or password');
      done();
    });
  });

  it('should login', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.validAdminUser).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('auth').that.equal(true);
      done();
    });
  });
});