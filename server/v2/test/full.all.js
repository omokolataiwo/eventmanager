import sequelize from 'sequelize';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import userFixture from './fixtures/users';
import centerFixture from './fixtures/centers';
import eventFixture from './fixtures/events';
import models from './../models';

const expect = chai.expect;
chai.use(chaiHttp);

let userToken = null;
let centerid = null;
let adminToken = null;

describe('Base setup', () => {
  it('should set up database', (done) => {
    models.users.destroy({ truncate: true });
    models.events.destroy({ truncate: true });
    models.centers.destroy({ truncate: true });
    done();
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
        centerid = res.body.id;
        done();
      });
  });

  // Events............................................................
  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-1-2';
    eventFixture.create.validEvent.enddate = '2018-1-4';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-1-5';
    eventFixture.create.validEvent.enddate = '2018-1-5';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-1-6';
    eventFixture.create.validEvent.enddate = '2018-1-7';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });
  // ............................................................

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
        centerid = res.body.id;
        done();
      });
  });

  // Events............................................................
  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-2-2';
    eventFixture.create.validEvent.enddate = '2018-2-4';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-2-5';
    eventFixture.create.validEvent.enddate = '2018-2-5';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-2-6';
    eventFixture.create.validEvent.enddate = '2018-2-7';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });
  // ............................................................

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
        centerid = res.body.id;
        done();
      });
  });

  // Events............................................................
  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-3-2';
    eventFixture.create.validEvent.enddate = '2018-3-4';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-3-5';
    eventFixture.create.validEvent.enddate = '2018-3-5';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });

  it('should create event', (done) => {
    eventFixture.create.validEvent.centerid = centerid;
    eventFixture.create.validEvent.startdate = '2018-3-6';
    eventFixture.create.validEvent.enddate = '2018-3-7';
    chai
      .request(server)
      .post('/v2/events')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.deep.have.property('id');
        done();
      });
  });
  

  // GET CENTERS
  it('should get all centers', (done) => {
    chai
      .request(server)
      .get('/v2/centers')
      .set('x-access-token', userToken)
      .send(eventFixture.create.validEvent)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        done();
      });
  });

  it('should get single center', (done) => {
    chai
      .request(server)
      .get('/v2/centers/'+centerid)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        done();
      });
  });


  it('should get single centers', (done) => {
    chai
      .request(server)
      .get('/v2/centers/'+centerid)
      .set('x-access-token', userToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        done();
      });
  });


  it('should get all events in center', (done) => {
    chai
      .request(server)
      .get('/v2/centers/'+centerid+'/events')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        console.log(res.body);
        done();
      });
  });
    // GET EVENTS

    it('should get my events', (done) => {
      chai
        .request(server)
        .get('/v2/events')
        .set('x-access-token', userToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          console.log(res.body);
          done();
        });
    });
});
