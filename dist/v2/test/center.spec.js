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
    _models2.default.centers.destroy({ truncate: true });
    _models2.default.users.destroy({ truncate: true });
  });
});

describe('post /centers', function () {
  it('should create event', function (done) {
    _chai2.default.request(_index2.default).post('/events').send(fixture.validEvent).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(false);
      done();
    });
  });

  it('should create event in center', function (done) {
    _sequelize2.default.db.centers.distroy({ truncate: { cascade: false } });
    _chai2.default.request(_index2.default).get('/centers/1').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.events).to.include(1);
      done();
    });
  });

  it('should not create event without name', function (done) {
    _chai2.default.request(_index2.default).post('/events').send(fixture.invalidEventName).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('name');
      done();
    });
  });

  it('should not create event without valid state code', function (done) {
    _chai2.default.request(_index2.default).post('/events').send(fixture.invalidState).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('state');
      done();
    });
  });

  it('should not create event without a valid center id', function (done) {
    _chai2.default.request(_index2.default).post('/events').send(fixture.invalidCenter).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('center');
      done();
    });
  });

  it('should not create event if startDate is before now', function (done) {
    _chai2.default.request(_index2.default).post('/events').send(fixture.invalidEventDate).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('startDate');
      done();
    });
  });
});