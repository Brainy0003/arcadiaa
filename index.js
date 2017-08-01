/* packages import */

import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import passport from 'passport';
import helmet from 'helmet';
import path from 'path';

/* config import */

import config from './server/config';
mongoose.Promise = Promise;
mongoose.connect(config.database);

const app = express();

app.use(helmet());
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(logger('dev'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

/* passport config */

import jwtLogin from './server/config/passport';

app.use(passport.initialize());
passport.use(jwtLogin);

/* routes import */

import auth from './server/routes/auth';
import chat from './server/routes/chat';
import clashroyale from './server/routes/clashroyale';
import profile from './server/routes/profile';
import user from './server/routes/user';
import poll from './server/routes/poll';

/* routes config */

app.use('/api/auth', auth);
app.use('/api/chat', chat);
app.use('/api/clashroyale', clashroyale);
app.use('/api/profile', profile);
app.use('/api/user', user);
app.use('/api/poll', poll);

/* redirect all unmatched routes to homepage */
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const server = app.listen(config.port);

/* socket.io setup */

import socketIO from 'socket.io';
const io = new socketIO(server);

import chatServer from './server/sockets.js';
chatServer(io);

export default app;