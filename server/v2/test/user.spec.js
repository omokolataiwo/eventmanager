import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import models from '../models';


const { expect } = chai;
chai.use(chaiHttp);
const request = chai.request(server);
const API_PATH = '/api/v2';

let lucyToken;

describe('post /users', () => {
  before(() => {
    models.users.destroy({ truncate: true });
  });

  it('should create a new user', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.lucy)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should not create user with same credientials', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.lucy)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('array');
        const keys = [];
        res.body.forEach(error => keys.push(...Object.keys(error)));
        expect('username').to.be.oneOf(keys);
        expect('email').to.be.oneOf(keys);
        expect('phoneNumber').to.be.oneOf(keys);
        done();
      });
  });

  it('should not create user with different password', (done) => {
    const diffPassword = userFixture.register.lucy;
    diffPassword.password = 'anotherthing';
    request
      .post(`${API_PATH}/users`)
      .send(diffPassword)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('matchPassword');
        expect(res.body.matchPassword).to.be.an('array');
        done();
      });
  });
});

describe('post /users/signin', () => {
  it('should not login with wrong credential', (done) => {
    const invalidPassword = Object.assign({}, userFixture.login.lucy);
    invalidPassword.password = 'a_wrong_password';
    request
      .post(`${API_PATH}/users/signin`)
      .send(invalidPassword)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('global');
        done();
      });
  });

  it('should login', (done) => {
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
});

describe('get /user/', () => {
  it('should get user details', (done) => {
    request
      .get(`${API_PATH}/users/`)
      .set('x-access-token', lucyToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('firstName')
          .that.is.equal(userFixture.register.lucy.firstName);
        done();
      });
  });

  it('should not get user details without token', (done) => {
    request
      .get(`${API_PATH}/users/`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });

  it('should not get user details with invalid token', (done) => {
    request
      .get(`${API_PATH}/users/`)
      .set('x-access-token', 'ksjci23xix83jk232kj2')
      .send()
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});

describe('put /user/', () => {
  it('should update user', (done) => {
    const newUser = Object.assign({}, userFixture.register.lucy);
    newUser.username = 'user';
    newUser.firstName = 'Adeoye';
    newUser.password = 'some_random_password';
    newUser.role = 70;

    request
      .put(`${API_PATH}/users/`)
      .set('x-access-token', lucyToken)
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body)
          .to.be.an('object')
          .that.has.property('firstName')
          .that.is.not.equal(userFixture.register.lucy.firstName);
        done();
      });
  });
});
