var express = require('express');
var router = express.Router();
var csrf = require('csurf');
var passport = require('passport');
var User = require('../models/user');

var csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function(req, res, next) {
    var messages = req.flash('success');
    // Username  is stored by passport in req.user.username
    res.render('user/profile', {
        hasMessages: messages.length > 0,
        messages: messages,
        username: req.user.username,
    });
});

// When a user clicks on logout
router.get('/logout', isLoggedIn, function(req, res, next) {
    // Added by passport
    req.logout();
    req.flash('info', 'Logged out');
    res.redirect('/');
});

router.get('/signup', notLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', notLoggedIn, function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/signin',
    failureFlash: true
}));

function isLoggedIn(req, res, next) {
    // isAuthenticated is added by passport
    if (req.isAuthenticated()) {
        return next(); // Equivalent to continue
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {
    // isAuthenticated is added by passport
    if (!req.isAuthenticated()) {
        return next(); // Equivalent to continue
    }
    req.flash('info', 'Already logged');
    res.redirect('/');
}

module.exports = router;
