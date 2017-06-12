var express = require('express');
var Message = require('../models/message');
var isLoggedIn = require('../utils/login').isLoggedIn;

var router = express.Router();

router.get('/', isLoggedIn, function(req, res, next) {
  res.render('chat');
});

module.exports = router;
