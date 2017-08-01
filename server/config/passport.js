import passport from 'passport';
import User from '../models/user';
import config from './';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.secret
};

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.id, (err, user) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
});

export default jwtLogin;
