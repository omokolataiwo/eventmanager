'use strict'
/*import chai from 'chai';
import {chaiHttp} from 'chai-http';
*/
import chai from 'chai';
import chaiHttp from 'chai-http';
const expect = chai.expect;
import server from '../../index.js';

chai.use(chaiHttp);

describe('/centers', () => {
	it('should create event center', (done) => {
		let center =  {
			capacity: 200,
			amount: 2000,
			"summary": ""
		};
		
		chai.request(server)
		.post('/centers')
		.send(center)
		.end((err, res) => {
			expect(res).to.have.status(200);
			expect(res).to.be.json;
			expect(res.body).to.deep.equal({error:false});
			done();
		});
	});
})
