var express = require('express');
var router = express.Router();

/*
Displays the homepage with feedback messages (if they exist) generated from the login and the registration
 */
router.get('/', function(req, res, next) {
  var messages = req.flash('info');
  res.render('index', {
    messages: messages,
    hasMessages: messages.length > 0
  });
});

router.get('/polls', function(req, res, next) {
  res.render('beta');
});

router.get('/activity', function(req, res, next) {
  res.render('beta');
});

module.exports = router;
