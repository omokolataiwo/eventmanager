import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import models from '../models';

const expect = chai.expect;
chai.use(chaiHttp);
const request = chai.request(server);
const API_PATH = '/api/v2';
let adminToken = null;
let userToken = null;
let centerid = null;

describe('Base setup', () => {
  before(() => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
  });

  it('Should register center owner', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('register user event owner', (done) => {
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
});

describe('post /centers', () => {
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

  it('should not create center for user', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .set('x-access-token', userToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Not authorized');
        done();
      });
  });
  it('should not create center for non user', (done) => {
    request
      .post(`${API_PATH}/centers`)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('No token provided');
        done();
      });
  });
});

describe('put /centers', () => {
  it('should update center', (done) => {
    request
      .put(`${API_PATH}/centers/${centerid}`)
      .set('x-access-token', adminToken)
      .send(centerFixture.create.validCenterModified)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should not update center by user', (done) => {
    request
      .put(`${API_PATH}/centers/${centerid}`)
      .set('x-access-token', userToken)
      .send(centerFixture.create.validCenterModified)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Not authorized');
        done();
      });
  });
  it('should not update center by non owner', (done) => {
    request
      .put(`${API_PATH}/centers/${centerid}`)
      .send(centerFixture.create.validCenterModified)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('No token provided');
        done();
      });
  });
});

function pe(error) {
  console.log(error.response.body);
}

function pr(res) {
  console.log(res.body);
}
