var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var expect = chai.expect;

chai.use(chaiHttp);

describe("LOGIN", function() {
	it("should have status code equal to 200", function(done) {
		chai.request(server)
		.post('/user/signin')
		.set('Content-Type', 'application/x-www-form-urlencoded')
		.send({'username': 'username', 'password': 'password'})
		.end(function(err, res) {
			res.should.have.status(200);
			done();
		});
	});
});
