var express = require('express');
var Message = require('../models/message');
var isLoggedIn = require('../utils/login').isLoggedIn;

var router = express.Router();

/*
Displays the chat
 */
router.get('/', isLoggedIn, function (req, res, next) {
    res.render('chat', {
        isChief: req.user.isChief
    });
});

module.exports = router;
