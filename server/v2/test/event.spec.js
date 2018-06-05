import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import eventFixture from './fixtures/events';
import models from '../models';
import { registerAccount, createCenter } from './helper';

const { expect } = chai;
chai.use(chaiHttp);
const request = chai.request(server);
const API_PATH = '/api/v2';

let lucyToken = null;
let johndoeToken = null;
let centerId = null;
let eventId = null;

describe('Event Base setup', () => {
  before(async () => {
    let lucy = Object.assign({}, userFixture.register.lucy);
    lucy = await registerAccount(lucy);

    const johndoe = Object.assign({}, userFixture.register.johndoe);
    await registerAccount(johndoe);

    let center = Object.assign({}, centerFixture.create.validCenter, {
      ownerId: lucy.id,
      approve: 0,
      active: 1
    });

    center = await createCenter(center);
    centerId = center.id;
  });

  it('should signin user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.lucy)
      .end((err, res) => {
        expect(res).to.have.status(200);
        lucyToken = res.body.user.token;
        done();
      });
  });

  it('should signin another user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.johndoe)
      .end((err, res) => {
        johndoeToken = res.body.user.token;
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe('post /events', () => {
  it('should create event', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId
    });

    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.event).to.deep.have.property('id');
        expect(res.body.event.title).to.equal('Birthday Party');
        eventId = res.body.event.id;
        done();
      });
  });

  it('should create second event', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId,
      startDate: '2018-11-20',
      endDate: '2018-11-25'
    });

    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.event).to.deep.have.property('id');
        expect(res.body.event.startDate).to.equal('2018-11-20');
        done();
      });
  });

  it('should not create event for exact book date', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId
    });

    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.errors).to.deep.have.property('title');
        expect(res.body.errors.title[0]).to.equal('Center has already been booked.');
        done();
      });
  });

  it('should not create event if center does not exist', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId: '63783786'
    });
    request
      .post(`${API_PATH}/events`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('centerId');
        expect(res.body.errors.centerId[0]).to.equal('Invalid center');
        done();
      });
  });
});

describe('get /events', () => {
  it('should get all events', (done) => {
    request
      .get(`${API_PATH}/events`)
      .set('x-access-token', johndoeToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.events)
          .to.be.an('array')
          .with.lengthOf(2);
        expect(res.body.events[0].startDate).to.equal('2018-11-20');
        done();
      });
  });
});

describe('put /events', () => {
  it('should update event', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      title: 'Birthday Bash',
      centerId
    });
    request
      .put(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.event.title).to.equal('Birthday Bash');
        done();
      });
  });

  it('should not update event without user', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId,
      startDate: '2018-11-23',
      endDate: '2018-11-23'
    });
    request
      .put(`${API_PATH}/events/${eventId}`)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('auth');
        expect(res.body.errors.auth[0]).to.equal('No token provided');
        done();
      });
  });

  it('should not update event that does not exist', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId
    });
    request
      .put(`${API_PATH}/events/45435332`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.event[0]).equal('Event does not exist');
        done();
      });
  });

  it('should not update event for center that does not exist', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId: 332353353
    });
    request
      .put(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.centerId[0]).to.equal('Invalid center');
        done();
      });
  });

  it('should not update event for date already picked', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId,
      startDate: '2018-11-23',
      endDate: '2018-11-23'
    });
    request
      .put(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(409);
        expect(res.body.errors).to.deep.have.property('title');
        expect(res.body.errors.title[0]).to.equal('Center has already been booked.');
        done();
      });
  });
});

describe('delete /events', () => {
  after(() => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.contacts.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
  });

  it('should delete event', (done) => {
    request
      .delete(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.event.id).to.equal(eventId);
        done();
      });
  });

  it('should not delete event with invalid event id', (done) => {
    request
      .delete(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.event[0]).to.equal('Event does not exist.');
        done();
      });
  });
});
