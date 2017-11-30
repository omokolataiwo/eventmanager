'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../../index';
import fixture from '../fixtures/centers'

chai.use(chaiHttp);

describe('get /centers', () => {
	it('should get all centers', (done) => {
		chai.request(server)
		.get('/centers')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("1").that.have.property('id').that.equal(1);
			expect(res.body).to.deep.have.property("2").that.have.property('id').that.equal(2);
			done();
		});
	});

	
})
