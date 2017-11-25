'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../index';
import fixture from '../fixtures/events'

chai.use(chaiHttp);

describe('post /events', () => {
	it('should create event', (done) => {
		chai.request(server)
		.post('/events')
		.send(fixture.validEvent)
		.end((err, res) => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should create event in center', (done) => {
		chai.request(server)
		.get('/centers/1')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body.events).to.include(1);
			done();
		});
	});

	it('should not create event without name', (done) => {
		chai.request(server)
		.post('/events')
		.send(fixture.invalidEventName)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});	

	it('should not create event without valid state code', (done) => {
		chai.request(server)
		.post('/events')
		.send(fixture.invalidState)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('state');
			done();
		});
	});	

	it('should not create event without a valid center id', (done) => {
		chai.request(server)
		.post('/events')
		.send(fixture.invalidCenter)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('center');
			done();
		});
	});	
})
