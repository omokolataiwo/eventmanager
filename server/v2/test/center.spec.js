import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import models from '../models';
import { RSA_PKCS1_OAEP_PADDING } from 'constants';

const { expect } = chai;
chai.use(chaiHttp);
const request = chai.request(server);
const API_PATH = '/api/v2';
let lucyToken = null;
let blazeToken = null;
let superAdminToken = null;
let johnDoeToken = null;
let centerId = null;
let contactId = null;
let blazeContactId = null;

describe('Base setup', () => {
  before(() => {
    models.users.create(userFixture.register.superAdmin);
  });
  it('should create admin account', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.lucy)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should create another admin account', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.blaze)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should create user account', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.johndoe)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it('should signin as admin', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.lucy)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('token');
        lucyToken = res.body.user.token;
        done();
      });
  });

  it('should signin as another admin', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.blaze)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('token');
        blazeToken = res.body.user.token;
        done();
      });
  });

  it('should sigin as user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.johndoe)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('token');
        johnDoeToken = res.body.user.token;
        done();
      });
  });

  it('should sigin as super admin', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.superAdmin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('token');
        superAdminToken = res.body.user.token;
        done();
      });
  });
});

describe('post /centers', () => {
  it('should create center', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', lucyToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.center).to.deep.have.property('id');
        expect(res.body.center.name).to.equal('Louise Place');
        centerId = res.body.center.id;
        contactId = res.body.center.contactId;
        done();
      });
  });

  it('should create center for another user', (done) => {
    const differentCenter = {
      ...centerFixture.create.validCenter,
      name: 'Four Point Hall'
    };
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', blazeToken)
      .send(differentCenter)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.center).to.deep.have.property('id');
        expect(res.body.center.name).to.equal('Four Point Hall');
        blazeContactId = res.body.center.contactId;
        done();
      });
  });

  it('should not create center for normal user', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', johnDoeToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body.errors).to.deep.have.property('auth');
        expect(res.body.errors.auth[0]).to.equal('Not authorized');
        done();
      });
  });

  it('should create center with existing contact', (done) => {
    const centerWithExistingContact = Object.assign(
      {},
      centerFixture.create.validCenter,
      { newContact: false, contactId, name: 'New Center with same ID' }
    );

    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', lucyToken)
      .send(centerWithExistingContact)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body.center)
          .to.deep.have.property('contactId')
          .that.is.equal(contactId);
        expect(res.body.center.name).to.equal('New Center with same ID');
        done();
      });
  });

  it('should not create center with invalid contact', (done) => {
    const centerWithExistingContact = Object.assign(
      {},
      centerFixture.create.validCenter,
      {
        newContact: false,
        contactId: 90887778,
        name: 'Center with invalid contact id'
      }
    );

    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', lucyToken)
      .send(centerWithExistingContact)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('contactId');
        expect(res.body.errors.contactId[0]).to.equal('Contact does not exist');
        done();
      });
  });
});

describe('put /centers', () => {
  it('should approve center', (done) => {
    request
      .put(`${API_PATH}/centers/approve/${centerId}`)
      .set('x-access-token', superAdminToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.center.approve).to.equal(1);
        done();
      });
  });
});

describe('get /centers', () => {
  it('should get all centers', (done) => {
    request
      .get(`${API_PATH}/centers`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        done();
      });
  });

  it('should get only admin centers', (done) => {
    request
      .get(`${API_PATH}/centers/admin`)
      .set('x-access-token', blazeToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        done();
      });
  });

  it('should get a particular center', (done) => {
    request
      .get(`${API_PATH}/centers/${centerId}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.center).to.deep.have.property('contactId');
        expect(res.body.center.id).to.equal(centerId);
        expect(res.body.center.name).to.equal('Louise Place');
        done();
      });
  });

  it('should not get a center with invalid id', (done) => {
    request
      .get(`${API_PATH}/centers/184848348`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors).to.deep.have.property('center');
        expect(res.body.errors.center[0]).to.equal('Center not found');
        done();
      });
  });
});

describe('put /centers', () => {
  it('should update center', (done) => {
    const modifiedCenter = Object.assign({}, centerFixture.create.validCenter, {
      name: 'Louise Palace Center',
      image: 'default_image',
      state: 23
    });
    request
      .put(`${API_PATH}/centers/${centerId}`)
      .set('x-access-token', lucyToken)
      .send(modifiedCenter)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.center).to.deep.have.property('name');
        expect(res.body.center.name).to.equal('Louise Palace Center');
        done();
      });
  });

  it('should not update invalid center ID', (done) => {
    const modifiedCenter = Object.assign({}, centerFixture.create.validCenter, {
      name: 'Louise Palace Center',
      image: 'default_image',
      state: 23
    });
    request
      .put(`${API_PATH}/centers/9883789`)
      .set('x-access-token', lucyToken)
      .send(modifiedCenter)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('center');
        expect(res.body.errors.center[0]).to.equal('Center does not exist');
        done();
      });
  });

  it('should not update center with different user contact id', (done) => {
    const modifiedCenter = Object.assign({}, centerFixture.create.validCenter, {
      name: 'Louise Palace Center',
      image: 'default_image',
      state: 23,
      contactId: blazeContactId,
      newContact: false
    });
    request
      .put(`${API_PATH}/centers/${centerId}`)
      .set('x-access-token', lucyToken)
      .send(modifiedCenter)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('contactId');
        expect(res.body.errors.contactId[0]).to.equal('Contact does not exist');
        done();
      });
  });

  it('should not update center with invalid contactId', (done) => {
    const modifiedCenter = Object.assign({}, centerFixture.create.validCenter, {
      name: 'Louise Palace Center',
      image: 'default_image',
      state: 23,
      contactId: 329323929,
      newContact: false
    });
    request
      .put(`${API_PATH}/centers/${centerId}`)
      .set('x-access-token', lucyToken)
      .send(modifiedCenter)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors).to.deep.have.property('contactId');
        expect(res.body.errors.contactId[0]).to.equal('Invalid contact id');
        done();
      });
  });
});

describe('get /centers/contacts', () => {
  it('should get centers contact', (done) => {
    request
      .get(`${API_PATH}/centers/contacts`)
      .set('x-access-token', lucyToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.contacts)
          .to.be.an('array')
          .with.lengthOf(2);
        expect(res.body.contacts[0].lastName).to.equal('Packer');
        done();
      });
  });
});

describe('get /centers/events', () => {
  it('should get all centers events', (done) => {
    request
      .get(`${API_PATH}/centers/events`)
      .set('x-access-token', lucyToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors).to.deep.have.property('events');
        expect(res.body.errors.events[0]).to.equal('Events not found.');
        done();
      });
  });
});

describe('get /centers/search', () => {
  after(() => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.contacts.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
  });
  it('should get all centers by name', (done) => {
    const name = 'palace';
    request
      .get(`${API_PATH}/centers/search?name=${name}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        expect(res.body.centers[0].name).to.equal('Louise Palace Center');
        done();
      });
  });

  it('should get all centers by capacity', (done) => {
    const capacity = '3000';
    request
      .get(`${API_PATH}/centers/search?capacity=${capacity}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        expect(res.body.centers[0].capacity).to.equal(3000);
        done();
      });
  });

  it('should get all centers by amount', (done) => {
    const amount = 6000000;
    request
      .get(`${API_PATH}/centers/search?amount=${amount}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        expect(res.body.centers[0].amount).to.equal(6000000);
        done();
      });
  });

  it('should get all centers by area', (done) => {
    const area = 'lek';
    request
      .get(`${API_PATH}/centers/search?area=${area}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        expect(res.body.centers[0].area).to.equal('Lekki');
        done();
      });
  });

  it('should get all centers by facilities', (done) => {
    const facilities = 'chair,table';
    request
      .get(`${API_PATH}/centers/search?facilities=${facilities}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        done();
      });
  });

  it('should get all centers by state', (done) => {
    const state = 23;
    request
      .get(`${API_PATH}/centers/search?state=${state}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        expect(res.body.centers[0].facilities.indexOf('chair')).to.equal(7);
        done();
      });
  });

  it('should get all centers by type', (done) => {
    const type = 1;
    request
      .get(`${API_PATH}/centers/search?type=${type}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.centers)
          .to.be.an('array')
          .with.lengthOf(1);
        done();
      });
  });

  it('should not get centers by image', (done) => {
    const image = 'default_center_image.jpeg';
    request
      .get(`${API_PATH}/centers/search?image=${image}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.errors.search[0]).to.equal('Center not found.');
        done();
      });
  });
});
