var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var messages = req.flash('info');

  res.render('index', {
    title: 'Express',
    messages: messages,
    hasMessages: messages.length > 0
  });
});

module.exports = router;
