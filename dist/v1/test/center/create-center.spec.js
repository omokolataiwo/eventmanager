'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

var _fixture = require('../fixture');

var _fixture2 = _interopRequireDefault(_fixture);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

describe('post /centers', function () {
	it('should create event center', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.validCenter).end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should generate a new id', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.validCenter).end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('center').that.have.property('id').that.equal(2);
			done();
		});
	});

	it('should have a name', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.centerWithoutName).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});

	it('should have capacity', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.noCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});

	it('should have capacity that is not zero', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.zeroCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});
	it('should have capacity that is only number', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.invalidCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});
	it('should have amount', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.noAmount).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});
	it('should have amount that is only number', function (done) {
		_chai2.default.request(_index2.default).post('/centers').send(_fixture2.default.invalidAmount).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});
});