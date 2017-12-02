import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import models from '../models';

const expect = chai.expect;
chai.use(chaiHttp);

describe('Base setup', () => {
  it('should set up database', (done) => {
    models.users.destroy({ truncate: true });
    done()
  });
});

describe('post /users', () => {
  it('should create a new user', (done) => {
    chai
      .request(server)
      .post('/v2/users')
      .send(userFixture.register.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should not create user with same credientials', (done) => {
    chai
      .request(server)
      .post('/v2/users')
      .send(userFixture.register.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('username or phonenumber or email has already been used.');
        done();
      });
  });

  it('should not create user with different password', (done) => {
    chai
      .request(server)
      .post('/v2/users')
      .send(userFixture.register.invalidPasswordCombination)
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);

        expect(res.body)
          .to.deep.have.property('message')
          .that.have.property('password')
          .that.equal('Password and repassword does not match');
        done();
      });
  });
});

describe('post /users/login', () => {
  it('should not login with wrong credential', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
      .send(userFixture.login.WrongPassword)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Invalid username or password');
        done();
      });
  });

  it('should not login with no username', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
      .send(userFixture.login.NOUsername)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Invalid username or password');
        done();
      });
  });

  it('should not login with no password', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
      .send(userFixture.login.NOPassword)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('error')
          .that.equal(true);
        expect(res.body)
          .to.deep.have.property('message')
          .that.equal('Invalid username or password');
        done();
      });
  });

  it('should login', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
      .send(userFixture.login.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body)
          .to.deep.have.property('auth')
          .that.equal(true);
        done();
      });
  });
});
