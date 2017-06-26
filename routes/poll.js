var express = require('express');
var Poll = require('../models/poll');
var randomColor = require('randomcolor');
var isLoggedIn = require('../utils/login').isLoggedIn;

var router = express.Router();

/*
Displays the chat
 */
router.get('/', isLoggedIn, function(req, res, next) {
  Poll.find({}, function(err, polls) {
    let hasPolls = polls.length > 0
    res.render('poll/list', {
      hasPolls: hasPolls,
      polls: hasPolls ? polls : null,
      isChief: req.user.isChief
    });
  });
});

router.get('/:id', isLoggedIn, function(req, res, next) {

});

router.post('/add', isLoggedIn, function(req, res, next) {
  var newPoll = new Poll();
  newPoll.title = req.body.title;
  newPoll.answers = buildAnswers(req.body.answers);
  newPoll.author = req.user.username;

  var colors = [];
  for (var i = 0; i < newPoll.answers.length; i++) {
    colors.push(randomColor());
  }
  newPoll.colors = colors;
  newPoll.save(function(err) {
    if (err) {
      throw err;
    }
    res.redirect('/');
  });
});

// We replace all answers into an object
function buildAnswers(answers) {
  var answers = answers.split(',');
  for (var i = 0; i < answers.length; i++) {
    var answerReplacing = answers[i].trim();
    if (answerReplacing !== '') {
      answers[i] = {
        answer: answerReplacing,
        vote: 0,
        pos: i
      };
    }
  }
  return answers;
}

module.exports = router;
