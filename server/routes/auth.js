import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import {
  check,
  validationResult
} from 'express-validator/check';
import {
  matchedData
} from 'express-validator/filter';

import User from '../models/user';
import config from '../config';

export const setUserInfo = (user) => ({
  id: user.id,
  username: user.username,
  isChief: user.isChief,
  avatar: user.avatar
});

const router = new express.Router();

const generateToken = (user) => jwt.sign(setUserInfo(user), config.secret);

router.post('/signin', [
  check('username')
  .isLength({
    min: 2
  })
  .withMessage('Votre pseudo doit avoir au moins 2 caractères')
  .trim(),
  check('password')
  .isLength({
    min: 4
  })
  .withMessage('Votre mot de passe doit avoir au moins 4 caractères')
  .trim()
], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.mapped())
  }

  const {
    username,
    password
  } = matchedData(req);

  User
    .findOne({
      username
    })
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({
            username: {
              msg: 'Aucun utilisateur trouvé',
              param: 'username'
            }
          });
      } else {
        return user.validPassword(password) ?
          res
          .status(200)
          .json(generateToken(user)) :
          res
          .status(403)
          .json({
            password: {
              msg: 'Mot de passe incorrect',
              param: 'password'
            }
          });
      }
    });
});

router.post('/signup', [
  check('username')
  .isLength({
    min: 2
  })
  .withMessage('must have at least 2 characters')
  .custom(value => {
    return User
      .findOne({
        username: value
      })
      .then(user => {
        if (user) {
          throw new Error('Username already taken');
        } else {
          return true;
        }
      })
  })
  .trim(),
  check('password')
  .isLength({
    min: 4
  })
  .withMessage('must have at least 4 characters')
  .trim(),
  check('passwordVerification').custom((value, {
    req
  }) => value === req.body.password).withMessage('Both passwords should be the same')
], (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json(errors.mapped());
  }

  const {
    username,
    password,
    passwordVerification
  } = matchedData(req);

  let userToCreate = new User({
    username,
    password,
    avatar: 'giant',
    isChief: false
  });
  userToCreate
    .save()
    .then(user => res.json(generateToken(user)));
});

export default router;