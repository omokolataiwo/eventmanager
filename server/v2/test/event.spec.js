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

function log(what) {
  console.log(what);
  console.log('==============================================');
}

describe('Event Base setup', () => {
  before(async () => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.contacts.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
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

  it('should login user user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.lucy)
      .end((err, res) => {
        expect(res).to.have.status(200);
        lucyToken = res.body.token;
        done();
      });
  });

  it('should login user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.johndoe)
      .end((err, res) => {
        johndoeToken = res.body.token;
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
        expect(res.body).to.deep.have.property('id');
        eventId = res.body.id;
        done();
      });
  });

  it('should create event', (done) => {
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
        expect(res.body).to.deep.have.property('id');
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
        expect(res).to.have.status(422);
        expect(res.body).to.deep.have.property('global');
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
        expect(res.body).to.deep.have.property('centerId');
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
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(2);
        done();
      });
  });
});

describe('put /events', () => {
  it('should update event', (done) => {
    const event = Object.assign({}, eventFixture.create.validEvent, {
      centerId
    });
    request
      .put(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .send(event)
      .end((err, res) => {
        expect(res).to.have.status(201);
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
        expect(res.body).to.deep.have.property('message');
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
        expect(res).to.have.status(422);
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
        expect(res).to.have.status(422);
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
        expect(res).to.have.status(422);
        expect(res.body).to.deep.have.property('global');
        done();
      });
  });
});

describe('delete /events', () => {
  it('should delete event', (done) => {
    request
      .delete(`${API_PATH}/events/${eventId}`)
      .set('x-access-token', johndoeToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should not delete event with invalid event id', (done) => {
    request
      .delete(`${API_PATH}/events/53637637`)
      .set('x-access-token', johndoeToken)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

//   it('should not update event for non user', (done) => {
//     request
//       .put(`${API_PATH}/events/${eventid}`)
//       .set('x-access-token', adminToken)
//       .send(eventFixture.create.validEvent)
//       .end((err, res) => {
//         expect(res).to.have.status(401);
//         expect(res).to.be.json;
//         expect(res.body)
//           .to.deep.have.property('message')
//           .that.equal('Not authorized');
//         done();
//       });
//   });

//   it('should not update event if center does not exist', (done) => {
//     eventFixture.create.validEvent.centerid = centerid + 1;
//     request
//       .put(`${API_PATH}/events/${eventid}`)
//       .set('x-access-token', userToken)
//       .send(eventFixture.create.validEvent)
//       .end((err, res) => {
//         expect(res).to.have.status(400);
//         expect(res).to.be.json;
//         expect(res.body)
//           .to.deep.have.property('error')
//           .that.equal(true);
//         expect(res.body)
//           .to.deep.have.property('message')
//           .that.have.property('center');
//         done();
//       });
//   });
// });
