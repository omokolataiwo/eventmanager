import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import models from '../models';

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
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.contacts.destroy({ truncate: true });
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
        expect(res.body)
          .to.be.an('object')
          .that.has.property('token');
        lucyToken = res.body.token;
        done();
      });
  });

  it('should signin as another admin', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.blaze)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('token');
        blazeToken = res.body.token;
        done();
      });
  });

  it('should sigin as user', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.johndoe)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('token');
        johnDoeToken = res.body.token;
        done();
      });
  });

  it('should sigin as super admin', (done) => {
    request
      .post(`${API_PATH}/users/signin`)
      .send(userFixture.login.superAdmin)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('token');
        superAdminToken = res.body.token;
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
        expect(res.body).to.deep.have.property('id');
        centerId = res.body.id;
        contactId = res.body.contactId;
        done();
      });
  });

  it('should create center for another user', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', blazeToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.deep.have.property('id');
        blazeContactId = res.body.contactId;
        done();
      });
  });

  it('should not create center for user', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', johnDoeToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(403);
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Not authorized');
        done();
      });
  });

  it('should create center with existing contact', (done) => {
    const centerWithExistingContact = Object.assign(
      {},
      centerFixture.create.validCenter,
      { newContact: false, contactId }
    );

    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', lucyToken)
      .send(centerWithExistingContact)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.deep.have.property('contactId')
          .that.is.equal(contactId);
        done();
      });
  });

  it('should not create center with invalid contact', (done) => {
    const centerWithExistingContact = Object.assign(
      {},
      centerFixture.create.validCenter,
      { newContact: false, contactId: 90887778 }
    );

    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', lucyToken)
      .send(centerWithExistingContact)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.deep.have.property('contactId');
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
        expect(res).to.have.status(201);
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
        expect(res.body)
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
        expect(res.body)
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
        expect(res.body).to.deep.have.property('contactId');
        expect(res.body.id).to.equal(centerId);
        done();
      });
  });

  it('should not get a center with invalid id', (done) => {
    request
      .get(`${API_PATH}/centers/184848348`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.deep.have.property('center');
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
        expect(res).to.have.status(201);
        expect(res.body).to.deep.have.property('name');
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
        expect(res.body).to.deep.have.property('center');
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
        expect(res.body).to.deep.have.property('contactId');
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
        expect(res.body).to.deep.have.property('contactId');
        done();
      });
  });
});

describe('get /centers/contacts', () => {
  it('should get all centers', (done) => {
    request
      .get(`${API_PATH}/centers/contacts`)
      .set('x-access-token', lucyToken)
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

describe('get /centers/events', () => {
  it('should get all centers', (done) => {
    request
      .get(`${API_PATH}/centers/events`)
      .set('x-access-token', lucyToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(0);
        done();
      });
  });
});

describe('get /centers/search', () => {
  it('should get all centers by name', (done) => {
    const name = 'palace';
    request
      .get(`${API_PATH}/centers/search?name=${name}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(1);
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
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(1);
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
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(1);
        done();
      });
  });

  it('should get all centers by area', (done) => {
    const area = 'lekki';
    request
      .get(`${API_PATH}/centers/search?area=${area}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(1);
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
        expect(res.body)
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
        expect(res.body)
          .to.be.an('array')
          .with.lengthOf(1);
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
        expect(res.body)
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
        done();
      });
  });
});
