import express from 'express';
import Poll from '../models/poll';
import randomColor from 'randomcolor';

const router = express.Router();

router.get('/all', (req, res, next) => {
    Poll.find({}, (err, polls) => {
        if (err) return next(err);
        res.json(polls);
    })
});

router.get('/:id', (req, res, next) => {
    Poll.findById(req.params.id, (err, poll) => {
        if (err) return next(err);
        res.json(poll);
    });
});

const buildAnswers = (answers) => answers.split(',').map((answer, i) => ({
    'answer': answer.trim(),
    'vote': 0,
    'pos': i,
    'color': randomColor()
}));

router.post('/add', (req, res, next) => {
    const {
        author,
        title,
        answers
    } = req.body;
    let poll = new Poll({
        author,
        title,
        answers: buildAnswers(answers)
    });
    poll.save((err, poll) => {
        if (err) return next(err);
        res.json(poll);
    });
});

router.post('/vote/:id', function (req, res, next) {
    var id = req.params.id;
    var pos = parseInt(req.body.answer);
    Poll.findById(id, function (err, poll) {
        if (err) throw err;
        // If the user currently logged has not voted for this poll yet
        var hasVoted = false;
        if (poll.voters.indexOf(req.user.username) === -1) {
            poll.voters.push(req.user.username);
            hasVoted = true;
        }
        // We check if someone has voted
        if (hasVoted) {
            poll.answers[pos].vote += 1;
            // Tell mongoose answers has been modified
            poll.markModified('answers');
            poll.save(function (err, result) {
                if (err) throw err;
                res.redirect('/poll/' + id);
            });
        } else {
            req.flash('error', "Vous avez déjà voté");
            res.redirect('/poll/' + id);
        }
    });
});

export default router;