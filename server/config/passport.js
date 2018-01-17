import passport from 'passport';
import User from '../models/user';
import config from './';
import {
  Strategy as JwtStrategy,
  ExtractJwt
} from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.id)
    .then(user => user ? done(null, user) : done(null, false))
    .catch(err => done(err, false))
});

export default jwtLogin;