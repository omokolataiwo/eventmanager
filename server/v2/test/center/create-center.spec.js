'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../index';
import fixture from '../fixture'

chai.use(chaiHttp);

describe('post /centers', () => {
	it('should create event center', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.validCenter)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should generate a new id', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.validCenter)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res.body).to.have.property('center').that.have.property('id').that.equal(2);
			done();
		});
	});

	it('should have a name', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.centerWithoutName)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});

	it('should have capacity', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.noCapacity)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		})
	});

	it('should have capacity that is not zero', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.zeroCapacity)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		})
	});
	it('should have capacity that is only number', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.invalidCapacity)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		})
	});
	it('should have amount', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.noAmount)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		})
	});
	it('should have amount that is only number', (done) => {
		chai.request(server)
		.post('/centers')
		.send(fixture.invalidAmount)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});
})
