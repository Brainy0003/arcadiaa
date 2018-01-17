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

export default chatServer;