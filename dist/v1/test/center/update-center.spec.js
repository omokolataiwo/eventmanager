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

describe('put /centers', function () {
	it('should update event center name', function (done) {
		var mfixture = _fixture2.default.validCenter;
		mfixture.name = "Bay Event Center";
		_chai2.default.request(_index2.default).put('/centers/2').send(mfixture).end(function (err, res) {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should update all center property', function (done) {
		var mfixture = _fixture2.default.validCenter;
		mfixture.name = "Bay Event Center";
		mfixture.capacity = 200;
		mfixture.address = "1 Bay Close";
		mfixture.area = "Yaba";
		mfixture.state = "7";
		mfixture.facilities = "CCTV,Parking Space";
		mfixture.amount = 3000;
		mfixture.summary = "Cool party environment";

		_chai2.default.request(_index2.default).put('/centers/2').send(mfixture).end(function (err, res) {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			expect(res.body).to.deep.have.property('center').that.have.property('id').that.equal('2');
			expect(res.body).to.deep.have.property('center').that.have.property('name').that.equal('Bay Event Center');
			expect(res.body).to.deep.have.property('center').that.have.property('capacity').that.equal(200);
			expect(res.body).to.deep.have.property('center').that.have.property('address').that.equal('1 Bay Close');
			expect(res.body).to.deep.have.property('center').that.have.property('area').that.equal('Yaba');
			expect(res.body).to.deep.have.property('center').that.have.property('state').that.equal('7');
			expect(res.body).to.deep.have.property('center').that.have.property('facilities').that.equal('CCTV,Parking Space');
			expect(res.body).to.deep.have.property('center').that.have.property('amount').that.equal(3000);
			expect(res.body).to.deep.have.property('center').that.have.property('summary').that.equal('Cool party environment');
			done();
		});
	});

	it('should not return error for non existing center', function (done) {
		var mfixture = _fixture2.default.validCenter;
		mfixture.name = "Bay Event Center";
		_chai2.default.request(_index2.default).put('/centers/4').send(mfixture).end(function (err, res) {
			expect(res).to.have.status(400);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(true);
			done();
		});
	});

	it('should not update without a name', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.centerWithoutName).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});

	it('should not update without capacity', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.noCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});

	it('should not have capacity that is zero', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.zeroCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});

	it('should have capacity that is only number', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.invalidCapacity).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		});
	});

	it('should have amount', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.noAmount).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});

	it('should have amount that is only number', function (done) {
		_chai2.default.request(_index2.default).put('/centers/2').send(_fixture2.default.invalidAmount).end(function (err, res) {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});
});