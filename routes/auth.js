var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var isLoggedIn = require('../utils/login').isLoggedIn;
var notLoggedIn = require('../utils/login').notLoggedIn;

/*
Handles the logout of a user and tells to people in the chat who disconnecteds
 */
router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  req.flash('info', 'Vous êtes maintenant déconnecté');
  res.redirect('/');
});

/*
Displays the signup page
 */
router.get('/signup', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('auth/signup', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

/*
Handles the registration process using passport.authenticate
 */
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/auth/signup',
  failureFlash: true
}));

/*
Displays the signup page
 */
router.get('/signin', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('auth/signin', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

/*
Handles the login process using passport.authenticate
 */
router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/auth/signin',
  failureFlash: true
}));

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/user/profile',
  failureRedirect: '/auth/signin'
}));

module.exports = router;
