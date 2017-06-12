var express = require('express');
var Message = require('../models/message');
var router = express.Router();

router.get('/me', function (req, res, next) {
    if (req.user.username) {
        res.json({'username': req.user.username});
    }
});

router.get('/messages', function(req, res, next) {
  Message.find({} , function(err, messages) {
    res.json(messages);
  });
});

module.exports = router;
