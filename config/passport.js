var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var auth = require('./auth');
var User = require('../models/user');

// In order to support login sessions, Passport will serialize and deserialize user instances to and from the session.
passport.serializeUser(function(user, done) {
  // the first argument is null because there is no errors
  // the done function is part of passport internal logic
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// SIGN WITH GOOGLE
passport.use(new GoogleStrategy({
    clientID: auth.google.clientID,
    clientSecret: auth.google.clientSecret,
    callbackURL: auth.google.callbackURL,
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      User.findOne({
        googleId: profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user, req.flash('success', 'Vous êtes maintenant connecté !'));
        } else {
          var newUser = new User();
          newUser.googleId = profile.id;
          newUser.username = profile.displayName;
          newUser.save(function(err) {
            if (err) {
              throw err;
            }
            return done(null, newUser, req.flash('success', 'Vous êtes maintenant inscrit !'));
          });
        }
      });
    });
  }
));

// SIGNUP
passport.use('local.signup', new LocalStrategy({
  passReqToCallback: true
}, function(req, username, password, done) {
  username = username.trim().toLowerCase();
  req.checkBody('username', 'Votre pseudo doit contenir au moins 2 caractères').notEmpty().isLength({
    min: 2,
    max: 20
  });
  req.checkBody('password', 'Votre mot de passe doit contenir au moins 6 caractères').notEmpty().isLength({
    min: 6
  });
  req.checkBody('password2', 'Vos mots de passe sont différents').equals(req.body.password);
  // If we get some errors, we push them into an array and display them to the user thanks to the flash middleware
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }
  // Search if username is already in the database
  User.findOne({
    'username': username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, false, {
        message: 'Ce pseudo est déjà utilisé'
      });
    }
    // Username is not already used, then we can create a new user
    var newUser = new User();
    newUser.username = username
    newUser.password = newUser.encryptPassword(password);
    newUser.isChief = false;
    // We save in
    newUser.save(function(err, result) {
      if (err) {
        return done(err);
      }
      return done(null, newUser, req.flash('success', 'Vous êtes maintenant inscrit !'));
    });
  });
}));

// SIGNIN
passport.use('local.signin', new LocalStrategy({
  passReqToCallback: true
}, function(req, username, password, done) {
  username = username.trim().toLowerCase();
  req.checkBody('username', 'Votre pseudo doit contenir au moins 2 caractères').notEmpty().isLength({
    min: 2,
    max: 20
  });
  req.checkBody('password', 'Votre mot de passe doit contenir au moins 6 caractères').notEmpty().isLength({
    min: 6
  });
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];
    errors.forEach(function(error) {
      messages.push(error.msg);
    });
    return done(null, false, req.flash('error', messages));
  }

  User.findOne({
    'username': username
  }, function(err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, {
        message: 'Aucun utilisateur trouvé'
      });
    }
    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Mot de passe incorrect'
      });
    }
    // There is no errors
    return done(null, user, req.flash('success', 'Vous êtes maintenant connecté !'));
  });
}));
