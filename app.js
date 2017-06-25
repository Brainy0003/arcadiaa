"use strict";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var validator = require('express-validator');
var helmet = require('helmet');
var expressHbs = require('express-handlebars');
var sassMiddleware = require('node-sass-middleware');

/*
Require all routes
 */
var index = require('./routes/index');
var user = require('./routes/user');
var api = require('./routes/api');
var chat = require('./routes/chat');
var auth = require('./routes/auth');

var app = express();

/*
We use helmet to secure our app, see helmet package for more resources
 */
app.use(helmet());

app.io = require('socket.io')();
require('./routes/sockets')(app.io);

/*
Connect to DB
 */
mongoose.connect(process.env.ARCADIAA_MLAB_URI);

/*
Configuration of passport
 */
require('./config/passport');

/*
Choose the engine that is here Handlebars
 */
app.engine('.hbs', expressHbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));
app.set('view engine', 'hbs');

/*
store socket.io to access sockets in other routes
 */
app.use(function (req, res, next) {
    res.io = app.io;
    next();
});

app.use(
    sassMiddleware({
        src: __dirname + '/sass',
        dest: __dirname + '/public',
        debug: true,
        outputStyle: 'compressed'
    })
);

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
/*
Use body-parser to allow users to have form elements and its values available in req.body
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(validator());
app.use(cookieParser());
app.use(session({
    secret: process.env.ARCADIAA_SECRET_SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    // cookie expires in 3 hour
    cookie: {
        maxAge: 180 * 60 * 1000
    }
}));
// flash needs the session, so we place this piece of code just after app.use(session())
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// store in local variables if the user is logged in
app.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    res.locals.session = req.session;
    if (req.isAuthenticated()) {
        res.locals.username = req.user.username;
    }
    next();
});

/*
Configures the routes
All /user requests will be handled in users routes, etc.
 */
app.use('/', index);
app.use('/auth', auth);
app.use('/user', user);
app.use('/api', api);
app.use('/chat', chat);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
