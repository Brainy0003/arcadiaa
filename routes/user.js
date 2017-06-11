var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');
var isLoggedIn = require('../utils/login').isLoggedIn;
var notLoggedIn = require('../utils/login').notLoggedIn;

// Protect from CSRF attacks
var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
  var messages = req.flash('success');
  res.render('user/profile', {
    hasMessages: messages.length > 0,
    messages: messages,
    username: req.user.username
  });
});

router.get('/logout', isLoggedIn, function(req, res, next) {
  req.logout();
  req.flash('info', 'Vous êtes maintenant déconnecté');
  res.redirect('/');
});

router.get('/signup', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/signin', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0
  });
});

router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));

module.exports = router;
