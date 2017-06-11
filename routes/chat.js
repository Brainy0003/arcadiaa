var express = require('express');
var isLoggedIn = require('../utils/login').isLoggedIn;

var router = express.Router();

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('chat');
});

router.get('/:newMessage', function(req, res, next) {
  res.io.to('chat').emit('newMessage', req.params.newMessage);
});

module.exports = router;
