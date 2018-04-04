import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import eventFixture from './fixtures/events';
import models from '../models';

const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request(server);
const API_PATH = '/api/v2';

let adminToken = null;
let userToken = null;
let centerid = null;
let eventid = null;

describe('Base setup', () => {
  before(() => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
  });

  it('Register admin user', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Register regular user', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.validOrdinaryUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should login admin user', (done) => {
    request
      .post(`${API_PATH}/users/login`)
      .send(userFixture.login.validAdminUser)
      .end((err, res) => {
        adminToken = res.body.token;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should login user', (done) => {
    request
      .post(`${API_PATH}/users/login`)
      .send(userFixture.login.validOrdinaryUser)
      .end((err, res) => {
        userToken = res.body.token;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should create center', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', adminToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        centerid = res.body.id;
        done();
      });
  });
});

describe('post /events', () => {
  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        eventid = res.body.id;
        done();
      });
  });

  it('should create event for both outside', (done) => {
    eventFixture.create.validEventBothOutLeft.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventBothOutLeft)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should not create event for end inside', (done) => {
    eventFixture.create.validEventStartOut.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventStartOut)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('event');
        done();
      });
  });

  it('should not create event for  both date inside', (done) => {
    eventFixture.create.validEventBothIn.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventBothIn)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('event');
        done();
      });
  });

  it('should not create event for  both date inside', (done) => {
    eventFixture.create.validEventEndOut.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventEndOut)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('event');
        done();
      });
  });

  it('should create event for both outside right', (done) => {
    eventFixture.create.validEventBothOutRight.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventBothOutRight)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should not create event for non regular user', (done) => {
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', adminToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Not authorized');
        done();
      });
  });

  it('should not create event if startDate is before now', (done) => {
    eventFixture.create.validEventWithPassStartDate.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventWithPassStartDate)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('startdate');
        done();
      });
  });

  it('should not create event for end date less than start date', (done) => {
    eventFixture.create.validEventWithInvalidStartDate.centerid = centerid;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEventWithInvalidStartDate)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('startdate');
        done();
      });
  });

  it('should not create event if center does not exist', (done) => {
    eventFixture.create.validEvent.centerid = centerid + 1;
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('center');
        done();
      });
  });
});

describe('put /events', () => {
  it('should update event', (done) => {
    eventFixture.update.validEventModified.centerid = centerid;
    request
      .put(`${API_PATH}/events/${eventid}`)
      .set('x-access-token', userToken)
      .send(eventFixture.update.validEventModified)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should not update event for non user', (done) => {
    request
      .put(`${API_PATH}/events/${eventid}`)
      .set('x-access-token', adminToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Not authorized');
        done();
      });
  });

  it('should not update event if center does not exist', (done) => {
    eventFixture.create.validEvent.centerid = centerid + 1;
    request
      .put(`${API_PATH}/events/${eventid}`)
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('center');
        done();
      });
  });
});

describe('delete /events', () => {
  it('should delete event', (done) => {
    eventFixture.update.validEventModified.centerid = centerid;
    request
      .delete(`${API_PATH}/events/${eventid}`)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });
});
