'use strict'

import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../index';
import fixture from '../fixture'

chai.use(chaiHttp);

describe('put /centers', () => {
	it('should update event center name', (done) => {
		let mfixture = fixture.validCenter;
		mfixture.name = "Bay Event Center";
		chai.request(server)
		.put('/centers/2')
		.send(mfixture)
		.end((err, res) => {
			expect(res).to.have.status(201);
			expect(res).to.be.json;
			expect(res.body).to.deep.have.property("error").that.equal(false);
			done();
		});
	});

	it('should update all center property', (done) => {
		let mfixture = fixture.validCenter;
		mfixture.name = "Bay Event Center";
		mfixture.capacity = 200;
		mfixture.address = "1 Bay Close";
		mfixture.area = "Yaba";
		mfixture.state = "7";
		mfixture.facilities = "CCTV,Parking Space";
		mfixture.amount = 3000;
		mfixture.summary = "Cool party environment";

		chai.request(server)
		.put('/centers/2')
		.send(mfixture)
		.end((err, res) => {
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

	it('should not return error for non existing center', (done) => {
		let mfixture = fixture.validCenter;
		mfixture.name = "Bay Event Center";
		chai.request(server)
		.put('/centers/4')
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
		.put('/centers/2')
		.send(fixture.centerWithoutName)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('name');
			done();
		});
	});

	it('should not update without capacity', (done) => {
		chai.request(server)
		.put('/centers/2')
		.send(fixture.noCapacity)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('capacity');
			done();
		})
	});

	it('should not have capacity that is zero', (done) => {
		chai.request(server)
		.put('/centers/2')
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
		.put('/centers/2')
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
		.put('/centers/2')
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
		.put('/centers/2')
		.send(fixture.invalidAmount)
		.end((err, res) => {
			expect(res).to.have.status(406);
			expect(res.body).to.have.property('error').that.equal(true);
			expect(res.body).to.have.property('message').that.have.property('amount');
			done();
		});
	});
	
})
