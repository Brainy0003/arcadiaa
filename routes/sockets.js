var Message = require('../models/message');

module.exports = function(io) {

    io.on('connection', function(socket) {
    	console.log('test')
        socket.join('chat');
        socket.on('newMessage', function(msg) {
            let currentAuthor = msg.author;
            let messageToSave = new Message(msg);
            messageToSave.save(function(err) {
                if (err) {
                    return err
                } else {
                    io.emit('chat message', msg);
                }
            });
        });
    });
};
