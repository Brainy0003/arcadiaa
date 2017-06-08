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
var expressHbs = require('express-handlebars');

var index = require('./routes/index');
var user = require('./routes/user');
var api = require('./routes/api');

var app = express();
app.io = require('socket.io')();

// connect to DB
mongoose.connect(process.env.ARCADIAA_MLAB_URI);
require('./config/passport');

app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', 'hbs');

// store io to access sockets in other routes
app.use(function(req, res, next) {
  res.io = app.io;
  next();
});

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mySecretKey',
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
app.use(function(req, res, next) {
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  if (req.isAuthenticated()) {
    res.locals.username = req.user.username;
  }
  next();
});

app.use('/', index);
app.use('/user', user);
app.use('/api', api);

// redirect all unmatched routes to home
app.get('*', function(req, res, next) {
  res.redirect('/')
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development'
    ? err
    : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.io.on('connection', function(socket) {
  socket.join('chat');
  socket.on('newMessage', function(msg) {
    console.log('new message: ' + msg);
    app.io.emit('chat message', msg);
  });
});

module.exports = app;
