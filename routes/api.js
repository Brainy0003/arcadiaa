var express = require('express');
var Message = require('../models/message');
var router = express.Router();

/*
Sends to the user his username in JSON format only if connected
 */
router.get('/me', function (req, res, next) {
    if (req.user.username) {
        res.json({
            'username': req.user.username
        });
    }
});


/*
Returns all messages from the database
*/
router.get('/messages', function (req, res, next) {
    Message.find({}).sort('date').exec(function (err, messages) {
        if (err) {
            throw err;
        }
        res.json(messages);
    });
});

/*
Returns all messages of the specified room from the database
 */
router.get('/messages/:room', function (req, res, next) {
    Message.find({
        'room': req.params.room
    }, function (err, messages) {
        if (err) {
            throw err;
        }
        res.json(messages);
    });
});

module.exports = router;
