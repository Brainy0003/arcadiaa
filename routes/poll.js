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
  var messages = req.flash('error');
  Poll.findById(req.params.id, function(err, result) {
    if (req.isAuthenticated()) {
      var isAuthorOfPoll = result.author == req.user.username ? true : false;
    }
    if (err) throw err;
    res.render('poll/poll', {
      hasErrors: messages.length > 0,
      messages: messages,
      answers: result.answers,
      title: result.title,
      author: result.author,
      id: result.id,
      noVotes: result.calculateVotes(result.answers) == 0,
      numberOfVotes: result.calculateVotes(result.answers),
      isAuthorOfPoll: isAuthorOfPoll
    });
  });
});

router.post('/vote/:id', function(req, res, next) {
  var id = req.params.id;
  var pos = parseInt(req.body.answer);
  Poll.findById(id, function(err, poll) {
    if (err) throw err;
    // If the user currently logged has not voted for this poll yet
    var hasVoted = false;
    if (res.locals.login) {
      if (poll.voters.indexOf(req.user.username) === -1) {
        poll.voters.push(req.user.username);
        hasVoted = true;
      }
    }
    // If no one has voted during the session
    if (!req.session[id]) {
      hasVoted = true;
    }
    // We check if someone has voted
    if (hasVoted) {
      req.session[id] = true;
      // Increment the vote for a specific answer
      poll.answers[pos].vote += 1;
      // Tell mongoose answers has been modified
      poll.markModified('answers');
      poll.save(function(err, result) {
        if (err) throw err;
        res.redirect('/poll/' + id);
      });
    } else {
      req.flash('error', "Vous ne pouvez pas voter plus d'une fois");
      res.redirect('/poll/' + id);
    }
  });
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
    res.redirect('/poll');
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
