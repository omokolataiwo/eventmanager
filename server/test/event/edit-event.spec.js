'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../index';
import fixture from '../fixtures/events'

chai.use(chaiHttp);

describe('put /events', () => {
	it('should update event name', (done) => {
		let mfixture = fixture.validEvent;
		mfixture.name = "Fire Band";
		chai.request(server)
		.put('/events/1')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should update all event property', (done) => {
		let mfixture = fixture.validEvent;
		mfixture.name = "Fire Band";
		mfixture.startDate = "2017-12-7";
		mfixture.endDate = "2017-12-9";
		mfixture.time = "9:00";
		mfixture.state = 9;
		mfixture.center = 2;

		chai.request(server)
		.put('/events/1')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			expect(res.body).to.deep.have.property('event').that.have.property('id').that.equal('1');
			expect(res.body).to.deep.have.property('event').that.have.property('name').that.equal('Fire Band');
			expect(res.body).to.deep.have.property('event').that.have.property('startDate').that.equal("2017-12-7");
			expect(res.body).to.deep.have.property('event').that.have.property('endDate').that.equal('2017-12-9');
			expect(res.body).to.deep.have.property('event').that.have.property('time').that.equal('9:00');
			expect(res.body).to.deep.have.property('event').that.have.property('state').that.equal(9);
			expect(res.body).to.deep.have.property('event').that.have.property('center').that.equal(2);
			done();
		});
	});

	it('it should remove event from old center and slot in new center', (done) => {
		chai.request(server)
		.get('/centers/')
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body['1']['events']).to.not.include('1');
			expect(res.body['2']['events']).to.include('1');
			done();
		});
	})	

	it('should return error for non existing event', (done) => {
		let mfixture = fixture.validEvent;
		mfixture.name = "Bay Event Center";
		chai.request(server)
		.put('/events/4')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(true);
			done();
		});
	});

	it('should not update without a name', (done) => {
		chai.request(server)
		.put('/events/1')
		.send(fixture.invalidEventName)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});

	it('should not update without a date', (done) => {
		let mfixture = fixture.validEvent;
		mfixture.startDate = "";
		chai.request(server)
		.put('/events/1')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('startDate');
			done();
		});
	});


	it('should not update without an end date', (done) => {
		let mfixture = fixture.validEvent;
		mfixture.endDate = "";
		chai.request(server)
		.put('/events/1')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('endDate');
			done();
		});
	});


	it('should not update when end date is greater than start date', (done) => {
		chai.request(server)
		.put('/events/1')
		.send(fixture.invalidStartDate)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('startDate');
			done();
		});
	});

	it('should not update with invalid date format', (done) => {
		chai.request(server)
		.put('/events/1')
		.send(fixture.invalidDateFormat)
		.end((err, res) => {
			expect(res).to.have.status(400);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('startDate');
			expect(res.body).to.have.property('message').that.have.property('endDate');
			done();
		});
	});
})
