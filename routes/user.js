var express = require('express');
var router = express.Router();
var User = require('../models/user');
var isLoggedIn = require('../utils/login').isLoggedIn;

/*
Displays the profile
 */
router.get('/profile', isLoggedIn, function(req, res, next) {
  var messages = req.flash('success');
  res.render('user/profile', {
    hasMessages: messages.length > 0,
    messages: messages,
    username: req.user.username
  });
});

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
