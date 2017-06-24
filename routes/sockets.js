"use strict";

var marked = require('marked');
var Message = require('../models/message');

module.exports = function(io) {
  var users = [];
  io.on('connection', function(socket) {
    socket.on('userConnecting', function(username) {
      /* User is initially in the general room */
      socket.room = 'general';
      socket.join(socket.room);
      socket.username = username;
      if (users.indexOf(username) === -1) {
        users.push(username);
      }
      io.emit('connectedUsers', users)
    });
    socket.on('disconnect', function() {
      users.splice(users.indexOf(socket.username), 1);
      io.emit('connectedUsers', users);
    });
    socket.on('switchRoom', function(newRoom) {
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.emit('updatePage', newRoom);
      socket.room = newRoom;
    });
    socket.on('newMessage', function(msg) {
      msg.content = marked(msg.content);
      msg.room = socket.room;
      msg.date = Date.now();
      let messageToSave = new Message(msg);
      messageToSave.save(function(err) {
        if (err) {
          return err;
        } else {
          io.to(socket.room).emit('chatMessage', msg);
          socket.broadcast.to(socket.room).emit('stoppedTyping');
        }
      });
    });
    socket.on('isTyping', function(data) {
      if (data.message.length > 0) {
        socket.broadcast.to(socket.room).emit('isTyping');
      } else {
        /* message is empty, so user has stopped typing */
        socket.broadcast.to(socket.room).emit('stoppedTyping');
      }
    });
  });
};
