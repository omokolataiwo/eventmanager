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
    models.users.create(userFixture.register.superAdmin);
  });

  it('should create a new user', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.lucy)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.user.firstName).to.equal('Lucy');
        expect(res.body.user.lastName).to.equal('Ben');
        done();
      });
  });

  it('should not create user with same credientials', (done) => {
    request
      .post(`${API_PATH}/users`)
      .send(userFixture.register.lucy)
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body).to.be.an('object');
        const keys = [...Object.keys(res.body.errors)];

        expect('username').to.be.oneOf(keys);
        expect(res.body.errors.username[0]).to.equal('username has already been taken.');
        expect('email').to.be.oneOf(keys);
        expect(res.body.errors.email[0]).to.equal('email has already been used.');
        expect('phoneNumber').to.be.oneOf(keys);
        expect(res.body.errors.phoneNumber[0]).to.equal('phone number has already been used.');
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
        expect(res.body.errors)
          .to.be.an('object')
          .that.has.property('matchPassword');
        expect(res.body.errors.matchPassword).to.be.an('array');
        expect(res.body.errors.matchPassword[0]).to.equal('Match password is not the same as Password');
        done();
      });
  });
});

describe('post /users/signin', () => {
  it('should not sign in with wrong credential', (done) => {
    const invalidPassword = Object.assign({}, userFixture.login.lucy);
    invalidPassword.password = 'a_wrong_password';
    request
      .post(`${API_PATH}/users/signin`)
      .send(invalidPassword)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.errors)
          .to.be.an('object')
          .that.has.property('signin');
        expect(res.body.errors.signin[0]).is.equal('Invalid username or password');
        done();
      });
  });

  it('should sign in', (done) => {
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
});

describe('get /user/', () => {
  it('should get user details', (done) => {
    request
      .get(`${API_PATH}/users/`)
      .set('x-access-token', lucyToken)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('firstName')
          .that.is.equal('Lucy');
        done();
      });
  });

  it('should not get user details without token', (done) => {
    request
      .get(`${API_PATH}/users/`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(422);
        expect(res.body.errors.auth[0]).to.equal('No token provided');
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
        expect(res.body.errors.auth[0]).to.equal('Failed to authenticate token.');
        done();
      });
  });
});

describe('put /user/', () => {
  after(() => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    models.contacts.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
  });
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
        expect(res).to.have.status(200);
        expect(res.body.user)
          .to.be.an('object')
          .that.has.property('firstName')
          .that.is.not.equal(userFixture.register.lucy.firstName);
        expect(res.body.user.firstName).to.equal('Adeoye');
        expect(res.body.user.role).to.equal(2);
        done();
      });
  });
});
