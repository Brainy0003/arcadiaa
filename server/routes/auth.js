import express from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import User from '../models/user';
import config from '../config';

const router = new express.Router();

const generateToken = (user) => jwt.sign(user, config.secret);

export const setUserInfo = (user) => ({
  id: user.id,
  username: user.username,
  isChief: user.isChief,
  avatar: user.avatar
});

router.post('/decodeToken', (req, res, next) => {
  if (req.body.token) {
    const {
      id
    } = jwt.decode(req.body.token);
    User.findById(id, (err, foundUser) => {
      if (err) return next(err);
      return res.json(setUserInfo(foundUser));
    });
  }
});

router.post('/signin', (req, res, next) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  if (!username) {
    return res.json({
      error: `Ce champ n'est pas rempli`,
      field: 'username'
    });
  }
  if (!password) {
    return res.json({
      error: `Ce champ n'est pas rempli`,
      field: 'password'
    });
  }
  User.findOne({
    username
  }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.json({
        error: `Aucun utilisateur n'a été trouvé`,
        field: 'username'
      });
    } else {
      let token = generateToken(setUserInfo(user));
      return user.validPassword(password) ?
        res.json({
          token,
          user: jwt.decode(token)
        }) :
        res.json({
          error: 'Mot de passe incorrect',
          field: 'password'
        });
    }
  });
});

router.post('/signup', function (req, res, next) {
  const username = req.body.username.trim();
  const password = req.body.password.trim();
  const passwordVerification = req.body.passwordVerification.trim();
  if (!username) {
    return res.json({
      error: `Ce champ n'est pas rempli`,
      field: 'username'
    });
  }
  if (!password) {
    return res.json({
      error: `Ce champ n'est pas rempli`,
      field: 'password'
    });
  }
  if (!passwordVerification) {
    return res.json({
      error: `Ce champ n'est pas rempli`,
      field: 'passwordVerification'
    });
  }
  if (password !== passwordVerification) {
    return res.json({
      error: 'Les mots de passe sont différents',
      field: 'passwordVerification'
    });
  }
  User.findOne({
    username: username
  }, (err, existingUser) => {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      return res.json({
        error: `Ce nom d'utilisateur est déjà utilisé`,
        field: 'username'
      });
    }
    let user = new User({
      username,
      password,
      isChief: false,
      avatar: 'giant'
    });
    user.save((err, user) => {
      if (err) {
        return next(err);
      }
      let token = generateToken(setUserInfo(user));
      return res.json({
        token,
        user: jwt.decode(token)
      });
    });
  });
});

export default router;