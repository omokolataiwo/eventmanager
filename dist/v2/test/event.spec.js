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

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

var adminToken = null;
var userToken = null;
var centerid = null;
var eventid = null;

describe('Base setup', function () {
  it('should set up database', function (done) {
    _models2.default.users.destroy({ truncate: true });
    _models2.default.centers.destroy({ truncate: true });
    _models2.default.events.destroy({ truncate: true });

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
});

describe('post /events', function () {
  it('should create event', function (done) {
    _events2.default.create.validEvent.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      eventid = res.body.id;
      done();
    });
  });

  it('should create event for both outside', function (done) {
    _events2.default.create.validEventBothOutLeft.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventBothOutLeft).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should not create event for end inside', function (done) {
    _events2.default.create.validEventStartOut.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventStartOut).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.have.property('event');
      done();
    });
  });

  it('should not create event for  both date inside', function (done) {
    _events2.default.create.validEventBothIn.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventBothIn).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.have.property('event');
      done();
    });
  });

  it('should not create event for  both date inside', function (done) {
    _events2.default.create.validEventEndOut.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventEndOut).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.have.property('event');
      done();
    });
  });

  it('should create event for both outside right', function (done) {
    _events2.default.create.validEventBothOutRight.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventBothOutRight).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('id');
      done();
    });
  });

  it('should not create event for non user', function (done) {
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', adminToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('Not authorized');
      done();
    });
  });

  it('should not create event if startDate is before now', function (done) {
    _events2.default.create.validEventWithPassStartDate.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventWithPassStartDate).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('startdate');
      done();
    });
  });

  it('should not create event for end date less than start date', function (done) {
    _events2.default.create.validEventWithInvalidStartDate.centerid = centerid;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEventWithInvalidStartDate).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('startdate');
      done();
    });
  });

  it('should not create event if center does not exist', function (done) {
    _events2.default.create.validEvent.centerid = centerid + 1;
    _chai2.default.request(_index2.default).post('/v2/events').set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.have.property('center');
      done();
    });
  });
});

describe('put /events', function () {
  it('should update event', function (done) {
    _events2.default.update.validEventModified.centerid = centerid;
    _chai2.default.request(_index2.default).put('/v2/events/' + eventid).set('x-access-token', userToken).send(_events2.default.update.validEventModified).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });

  it('should not update event for non user', function (done) {
    _chai2.default.request(_index2.default).put('/v2/events/' + eventid).set('x-access-token', adminToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(401);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('message').that.equal('Not authorized');
      done();
    });
  });

  it('should not update event if center does not exist', function (done) {
    _events2.default.create.validEvent.centerid = centerid + 1;
    _chai2.default.request(_index2.default).put('/v2/events/' + eventid).set('x-access-token', userToken).send(_events2.default.create.validEvent).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(true);
      expect(res.body).to.deep.have.property('message').that.have.property('center');
      done();
    });
  });
});

describe('delete /events', function () {
  it('should delete event', function (done) {
    _events2.default.update.validEventModified.centerid = centerid;
    _chai2.default.request(_index2.default).delete('/v2/events/' + eventid).set('x-access-token', userToken).end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      done();
    });
  });
});