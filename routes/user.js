var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var isLoggedIn = require('../utils/login').isLoggedIn;
var notLoggedIn = require('../utils/login').notLoggedIn;

/*
Displays the profile
 */
router.get('/profile', isLoggedIn, function(req, res, next) {
  var messages = req.flash('success');
  /*
  If there exist some success feedback messages, that means that our user just connected
  Therefore, we can tell to people in the chat who just connected
   */
  if (messages.length !== 0) {
    res.io.to('chat').emit('connectedUser', req.user.username);
  }
  res.render('user/profile', {
    hasMessages: messages.length > 0,
    messages: messages,
    username: req.user.username
  });
});

/*
Handles the logout of a user and tells to people in the chat who disconnecteds
 */
router.get('/logout', isLoggedIn, function(req, res, next) {
  res.io.to('chat').emit('disconnectedUser', req.user.username);
  req.logout();
  req.flash('info', 'Vous êtes maintenant déconnecté');
  res.redirect('/');
});

/*
Displays the signup page
 */
router.get('/signup', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signup', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

/*
Handles the registration process using passport.authenticate 
 */
router.post('/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

/*
Displays the signup page
 */
router.get('/signin', notLoggedIn, function(req, res, next) {
  var messages = req.flash('error');
  res.render('user/signin', {
    messages: messages,
    hasErrors: messages.length > 0
  });
});

/*
Handles the login process using passport.authenticate 
 */
router.post('/signin', passport.authenticate('local.signin', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signin',
  failureFlash: true
}));


/*
Handles the removal of the user from the database
 */
router.get('/delete', isLoggedIn, function(req, res, next) {
  User.findByIdAndRemove(req.user._id, function(err, user) {
    if (err) {
      return next(err);
    } else {
      req.flash('info', 'Votre compte a bien été supprimé. A bientôt !');
      res.redirect('/');
    }
  });
});

module.exports = router;
