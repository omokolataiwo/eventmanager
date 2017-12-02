'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

var _events = require('../fixtures/events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
_chai2.default.use(_chaiHttp2.default);

describe('put /events', function () {

  it('should update event name', function (done) {
    var mfixture = _events2.default.validEvent;
    mfixture.name = "Fire Band";
    _chai2.default.request(_index2.default).put('/events/1').send(mfixture).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(false);
      done();
    });
  });

  it('should update all event property', function (done) {
    var mfixture = _events2.default.validEvent;
    mfixture.name = "Fire Band";
    mfixture.startDate = "2017-12-7";
    mfixture.endDate = "2017-12-9";
    mfixture.time = "9:00";
    mfixture.state = 9;
    mfixture.center = 2;

    _chai2.default.request(_index2.default).put('/events/1').send(mfixture).end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property('error').that.equal(false);
      expect(res.body).to.deep.have.property('event').that.have.property('id').that.equal('1');
      expect(res.body).to.deep.have.property('event').that.have.property('name').that.equal('Fire Band');
      expect(res.body).to.deep.have.property('event').that.have.property('startDate').that.equal('2017-12-7');
      expect(res.body).to.deep.have.property('event').that.have.property('endDate').that.equal('2017-12-9');
      expect(res.body).to.deep.have.property('event').that.have.property('time').that.equal('9:00');
      expect(res.body).to.deep.have.property('event').that.have.property('state').that.equal(9);
      expect(res.body).to.deep.have.property('event').that.have.property('center').that.equal(2);
      done();
    });
  });

  it('it should remove event from old center and slot in new center', function (done) {
    _chai2.default.request(_index2.default).get('/centers/').end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body['1']['events']).to.not.include('1');
      expect(res.body['2']['events']).to.include('1');
      done();
    });
  });

  it('should return error for non existing event', function (done) {
    var mfixture = _events2.default.validEvent;
    mfixture.name = "Bay Event Center";
    _chai2.default.request(_index2.default).put('/events/4').send(mfixture).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res).to.be.json;
      expect(res.body).to.deep.have.property("error").that.equal(true);
      done();
    });
  });

  it('should not update without a name', function (done) {
    _chai2.default.request(_index2.default).put('/events/1').send(_events2.default.invalidEventName).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('name');
      done();
    });
  });

  it('should not update without a date', function (done) {
    var mfixture = _events2.default.validEvent;
    mfixture.startDate = "";
    _chai2.default.request(_index2.default).put('/events/1').send(mfixture).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('startDate');
      done();
    });
  });

  it('should not update without an end date', function (done) {
    var mfixture = _events2.default.validEvent;
    mfixture.endDate = "";
    _chai2.default.request(_index2.default).put('/events/1').send(mfixture).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('endDate');
      done();
    });
  });

  it('should not update when end date is greater than start date', function (done) {
    _chai2.default.request(_index2.default).put('/events/1').send(_events2.default.invalidStartDate).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('startDate');
      done();
    });
  });

  it('should not update with invalid date format', function (done) {
    _chai2.default.request(_index2.default).put('/events/1').send(_events2.default.invalidDateFormat).end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.body).to.have.property('error').that.equal(true);
      expect(res.body).to.have.property('message').that.have.property('startDate');
      expect(res.body).to.have.property('message').that.have.property('endDate');
      done();
    });
  });
});