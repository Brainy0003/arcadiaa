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

router.get('/chat', isLoggedIn, function(req, res, next) {
  res.render('chat');
});

router.get('/chat/:newMessage', function(req, res, next) {
  res.io.to('chat').emit('newMessage', req.params.newMessage);
});

function isLoggedIn(req, res, next) {
    // isAuthenticated is added by passport
    if (req.isAuthenticated()) {
        return next(); // Equivalent to continue
    }
    res.redirect('/user/signin');
}

module.exports = router;
