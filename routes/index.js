var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  var messages = req.flash('info');
  res.render('index', {
    title: 'Express',
    messages: messages,
    hasMessages: messages.length > 0
  });
});

router.get('/poll', function(req, res, next) {
  res.render('beta');
})

router.get('/activity', function(req, res, next) {
  res.render('beta');
})

module.exports = router;
