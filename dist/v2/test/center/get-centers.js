'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _index = require('../../../index');

var _index2 = _interopRequireDefault(_index);

var _centers = require('../fixtures/centers');

var _centers2 = _interopRequireDefault(_centers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;


_chai2.default.use(_chaiHttp2.default);

describe('get /centers', function () {
	it('should get all centers', function (done) {
		_chai2.default.request(_index2.default).get('/centers').end(function (err, res) {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("1").that.have.property('id').that.equal(1);
			expect(res.body).to.deep.have.property("2").that.have.property('id').that.equal(2);
			done();
		});
	});
});