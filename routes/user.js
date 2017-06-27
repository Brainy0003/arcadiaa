var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Poll = require('../models/poll')
var isLoggedIn = require('../utils/login').isLoggedIn;

/*
Displays the profile
 */
router.get('/profile', isLoggedIn, function(req, res, next) {
  var messages = req.flash('success');
  let pollsFound = [];
  Poll.find({}, function(err, polls) {
    if (err) throw err;
    for (let i = 0; i < polls.length; i++) {
      if (polls[i].author === req.user.username || polls[i].voters.indexOf(req.user.username) !== -1) {
        pollsFound.push(polls[i]);
      }
    }
    res.render('user/profile', {
      hasMessages: messages.length > 0,
      messages: messages,
      polls: pollsFound,
      username: req.user.username,
    });
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
