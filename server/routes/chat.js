import express from 'express';
import Message from '../models/message';
import {
    requireAuth
} from '../helpers/auth';

const router = express.Router();

router.get('/messages', requireAuth, (req, res, next) => {
    Message.find({}).sort('date').exec((err, messages) => {
        if (err) {
            return next(err);
        }
        res.json(messages);
    });
});

router.post('/addMessage', requireAuth, (req, res, next) => {
    let {
        content,
        author,
        date,
        room
    } = req.body;
    let message = new Message({
        content,
        author,
        room,
        date
    });
    message.save((err) => {
        if (err) {
            return next(err);
        } else {
            return res.json(message);
        }
    });
});

export default router;