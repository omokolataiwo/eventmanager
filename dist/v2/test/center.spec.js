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

var _centers = require('./fixtures/centers');

var _centers2 = _interopRequireDefault(_centers);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var adminToken = null;
var userToken = null;
var centerid = null;

describe('Base setup', function () {
  it('should set up database', function (done) {
    _models2.default.users.destroy({ truncate: true });
    _models2.default.centers.destroy({ truncate: true });
    _chai2.default.request(_index2.default).post('/v2/users').send(_users2.default.register.validAdminUser).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('register ordinary user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users').send(_users2.default.register.validOrdinaryUser).end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should login admin user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.validAdminUser).end(function (err, res) {
      adminToken = res.body.token;
      expect(res).to.have.status(200);
      done();
    });
  });

  it('should login user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/users/login').send(_users2.default.login.validOrdinaryUser).end(function (err, res) {
      userToken = res.body.token;
      expect(res).to.have.status(200);
      done();
    });
  });
});

describe('post /centers', function () {
  it('should create center', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').set('x-access-token', adminToken).send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      centerid = res.body.id;
      done();
    });
  });

  it('should not create center for user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').set('x-access-token', userToken).send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('Not authorized');
      done();
    });
  });
  it('should not create center for non user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('No token provided');
      done();
    });
  });
});

describe('put /centers', function () {
  it('should update center', function (done) {
    _chai2.default.request(_index2.default).put('/v2/centers/' + centerid).set('x-access-token', adminToken).send(_centers2.default.create.validCenterModified).end(function (err, res) {
      //console.log(res);
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });

  it('should not update center by user', function (done) {
    _chai2.default.request(_index2.default).put('/v2/centers/' + centerid).set('x-access-token', userToken).send(_centers2.default.create.validCenterModified).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('Not authorized');
      done();
    });
  });
  it('should not update center by non owner', function (done) {
    _chai2.default.request(_index2.default).put('/v2/centers/' + centerid).send(_centers2.default.create.validCenterModified).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('No token provided');
      done();
    });
  });
});