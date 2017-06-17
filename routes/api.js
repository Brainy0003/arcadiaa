var express = require('express');
var Message = require('../models/message');
var router = express.Router();

/*
Sends to the user his username in JSON format only if connected
 */
router.get('/me', function (req, res, next) {
    if (req.user.username) {
        res.json({'username': req.user.username});
    }
});


/*
Returns all messages of the chat from the database
 */
router.get('/messages', function(req, res, next) {
  Message.find({} , function(err, messages) {
    res.json(messages);
  });
});

module.exports = router;
