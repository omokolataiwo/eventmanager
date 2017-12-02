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

var _events = require('./fixtures/events');

var _events2 = _interopRequireDefault(_events);

var _models = require('./../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var userToken = null;
var centerid = null;
var adminToken = null;

describe('Base setup', function () {
  it('should set up database', function (done) {
    _models2.default.users.destroy({ truncate: true });
    _models2.default.events.destroy({ truncate: true });
    _models2.default.centers.destroy({ truncate: true });
    done();
  });
});

describe('post /users', function () {
  it('should create a new user', function (done) {
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

  it('should create center', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').set('x-access-token', adminToken).send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      centerid = res.body.id;
      done();
    });
  });

  // Events............................................................
  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-1-2';
    _events2.default.create.validEvent.enddate = '2018-1-4';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-1-5';
    _events2.default.create.validEvent.enddate = '2018-1-5';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-1-6';
    _events2.default.create.validEvent.enddate = '2018-1-7';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });
  // ............................................................

  it('should create center', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').set('x-access-token', adminToken).send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      centerid = res.body.id;
      done();
    });
  });

  // Events............................................................
  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-2-2';
    _events2.default.create.validEvent.enddate = '2018-2-4';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-2-5';
    _events2.default.create.validEvent.enddate = '2018-2-5';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-2-6';
    _events2.default.create.validEvent.enddate = '2018-2-7';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });
  // ............................................................

  it('should create center', function (done) {
    _chai2.default.request(_index2.default).post('/v2/centers').set('x-access-token', adminToken).send(_centers2.default.create.validCenter).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      centerid = res.body.id;
      done();
    });
  });

  // Events............................................................
  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-3-2';
    _events2.default.create.validEvent.enddate = '2018-3-4';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-3-5';
    _events2.default.create.validEvent.enddate = '2018-3-5';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _events2.default.create.validEvent.startdate = '2018-3-6';
    _events2.default.create.validEvent.enddate = '2018-3-7';
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  // GET CENTERS
  it('should get all centers', function (done) {
    _chai2.default.request(_index2.default).get('/v2/centers').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      done();
    });
  });

  it('should get single center', function (done) {
    _chai2.default.request(_index2.default).get('/v2/centers/' + centerid).set('x-access-token', userToken).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      done();
    });
  });

  it('should get single centers', function (done) {
    _chai2.default.request(_index2.default).get('/v2/centers/' + centerid).set('x-access-token', userToken).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      done();
    });
  });

  it('should get all events in center', function (done) {
    _chai2.default.request(_index2.default).get('/v2/centers/' + centerid + '/events').set('x-access-token', adminToken).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      done();
    });
  });
  // GET EVENTS

  it('should get my events', function (done) {
    _chai2.default.request(_index2.default).get('/v2/events').set('x-access-token', userToken).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      console.log(res.body);
      done();
    });
  });
});