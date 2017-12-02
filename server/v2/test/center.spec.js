import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import models from '../models';

const expect = chai.expect;
chai.use(chaiHttp);

let adminToken = null;
let userToken = null;
let centerid = null;

describe('Base setup', () => {
  it('should set up database', (done) => {
    models.users.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    chai
      .request(server)
      .post('/v2/users')
      .send(userFixture.register.validAdminUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('register ordinary user', (done) => {
    chai
      .request(server)
      .post('/v2/users')
      .send(userFixture.register.validOrdinaryUser)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should login admin user', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
      .send(userFixture.login.validAdminUser)
      .end((err, res) => {
        adminToken = res.body.token;
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should login user', (done) => {
    chai
      .request(server)
      .post('/v2/users/login')
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
    chai
      .request(server)
      .post('/v2/centers')
      .set('x-access-token', adminToken)
      .send(centerFixture.create.validCenter)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        centerid =res.body.id;
        done();
      });
  });

  it('should not create center for user', (done) => {
    chai
      .request(server)
      .post('/v2/centers')
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
    chai
      .request(server)
      .post('/v2/centers')
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
    chai
      .request(server)
      .put('/v2/centers/'+centerid)
      .set('x-access-token', adminToken)
      .send(centerFixture.create.validCenterModified)
      .end((err, res) => {
        //console.log(res);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        done();
      });
  });

  it('should not update center by user', (done) => {
    chai
      .request(server)
      .put('/v2/centers/'+centerid)
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
    chai
      .request(server)
      .put('/v2/centers/'+centerid)
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
