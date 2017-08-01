import mongoose from 'mongoose';
import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../index';
import User from '../server/models/user';
const should = chai.should();

chai.use(chaiHttp);

describe('Auth', () => {
    beforeEach((done) => {
        let user = new User({
            username: 'supertester',
            password: 'tester'
        });
        user.save((err) => {
            if (err) throw err;
            done();
        });
    });

    afterEach((done) => {
        User.remove({ username: 'supertester' }, (err) => {
            done();
        });
    });
    describe('Signin', () => {
        it('it should signin on POST /api/auth/signin with right credentials', (done) => {
            let user = {
                username: 'supertester',
                password: 'tester'
            };
            chai.request(server)
                .post('/api/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.body.should.have.property('token');
                    res.body.should.have.property('username');
                    done();
                });
        });
        it('it should give an error on POST /api/auth/signin with wrong credentials', (done) => {
            let user = {
                username: 'supertester',
                password: 'testerrr'
            };
            chai.request(server)
                .post('/api/auth/signin')
                .send(user)
                .end((err, res) => {
                    res.body.should.have.property('error');
                    done();
                });
        });
    });
});