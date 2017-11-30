'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../../index';
import fixture from '../fixtures/centers'

chai.use(chaiHttp);

describe('get /centers', () => {
	it('should get single center', (done) => {
		chai.request(server)
		.get('/centers/2')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property('id').that.equal(2);
			done();
		});
	});

	it('should get only existing center', (done) => {
		chai.request(server)
		.get('/centers/3')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.equal({});
			done();
		});
	});
	
})
