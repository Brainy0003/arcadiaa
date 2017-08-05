import express from 'express';
import Poll from '../models/poll';
import randomColor from 'randomcolor';

const router = express.Router();

router.get('/all', (req, res, next) => {
    Poll.find({}).sort('-date').exec((err, polls) => {
        if (err) return next(err);
        res.json(polls);
    });
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
        answers,
        date
    } = req.body;
    let poll = new Poll({
        author,
        title,
        date,
        totalVotes: 0,
        answers: buildAnswers(answers)
    });
    poll.save((err, poll) => {
        if (err) return next(err);
        res.json(poll);
    });
});

router.post('/vote/:id', (req, res, next) => {
    const id = req.params.id;
    const {
        username,
        pos
    } = req.body;
    Poll.findById(id, (err, poll) => {
        if (err) return next(err);
        const voters = poll.voters.map(voter => voter.username);
        const indexVoter = voters.indexOf(username);
        if (indexVoter === -1) {
            poll.voters.push({
                username,
                pos
            });
            poll.answers[pos].vote += 1;
        } else {
            const posPreviousAnswerVoter = poll.voters[indexVoter].pos;
            poll.answers[posPreviousAnswerVoter].vote -= 1;
            poll.answers[pos].vote += 1;
            poll.voters[indexVoter] = {
                username,
                pos
            };
            poll.markModified('voters');
        }
        poll.totalVotes = poll.calculateVotes(poll.answers)
        // Tell mongoose answers has been modified
        poll.markModified('answers');
        poll.save((err, result) => {
            if (err) return next(err);
            res.json(result);
        });
    });
});

export default router;