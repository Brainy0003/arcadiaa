import express from 'express';
import User from '../models/user';
import axios from 'axios';
import {
    setUserInfo
} from '../routes/auth';

const router = express.Router();

router.get('/all', (req, res, next) => {
    User.find({}, (err, users) => {
        if (err) return next(err);
        let usersToReturn = {};
        for (let i = 0; i < users.length; i++) {
            usersToReturn[users[i].username] = setUserInfo(users[i]);
        }
        res.json(usersToReturn);
    });
});

router.get('/:username', (req, res, next) => {
    User.findOne({
        username: req.params.username
    }, (err, user) => {
        if (err) return next(err);
        res.json(user);
    });
});



export default router;