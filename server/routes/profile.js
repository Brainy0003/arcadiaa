import express from 'express';
import User from '../models/user';
import {
    setUserInfo
} from './auth';

const router = express.Router();

router.post('/avatar', (req, res, next) => {
    const {
        avatar,
        id
    } = req.body;
    User.findById(id, (err, user) => {
        if (err) return next(err);
        user.avatar = avatar;
        user.save((err, updatedUser) => {
            if (err) return next(err);
            res.json(setUserInfo(updatedUser));
        });
    });
});

router.delete('/delete/:id', (req, res, next) => {
    User.remove({
        _id: req.params.id
    }, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});

export default router;