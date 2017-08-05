import marked from 'marked';
import Message from './models/message';

const chatServer = (io) => {
  let users = [];

  io.on('connection', (socket) => {

    socket.on('user connected', (username) => {
      socket.room = 'general';
      socket.join(socket.room);
      socket.username = username;
      if (users.includes(username)) {
        users.push(username);
      }
      io.emit('update connected users', users);
    });

    socket.on('add message', (message) => {
      io.emit('add message', message);
    });

    socket.on('switch room', (room) => {
      socket.leave(socket.room);
      socket.join(room);
      socket.emit('switch room', room);
      socket.room = room;
    });

    socket.on('disconnect', () => {
      console.log('Disconnecting...')
    })
  });
};

/*
module.exports = function (io) {
  var users = [];
  var poll = io.of('/poll');
  var chat = io.of('/chat');

  chat.on('connection', function (socket) {
    socket.on('userConnecting', function (username) {
      socket.room = 'general';
      socket.join(socket.room);
      socket.username = username;
      if (users.indexOf(username) === -1) {
        users.push(username);
      }
      chat.emit('connectedUsers', users)
    });
    socket.on('disconnect', function () {
      for (var i = 0; i < users.length; i++) {
        users = users.filter(function (username) {
          return username !== socket.username
        });
      }
      chat.emit('connectedUsers', users);
    });
    socket.on('switchRoom', function (newRoom) {
      socket.leave(socket.room);
      socket.join(newRoom);
      socket.emit('updatePage', newRoom);
      socket.room = newRoom;
    });
    socket.on('newMessage', function (msg) {
      msg.content = marked(msg.content);
      msg.room = socket.room;
      msg.date = Date.now();
      let messageToSave = new Message(msg);
      messageToSave.save(function (err) {
        if (err) {
          return err;
        } else {
          chat.to(socket.room).emit('chatMessage', msg);
          socket.broadcast.to(socket.room).emit('stoppedTyping');
        }
      });
    });
    socket.on('isTyping', function (data) {
      if (data.message.length > 0) {
        socket.broadcast.to(socket.room).emit('isTyping');
      } else {
        socket.broadcast.to(socket.room).emit('stoppedTyping');
      }
    });
  });
};
*/

export default chatServer;