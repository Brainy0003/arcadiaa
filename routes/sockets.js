"use strict";

var Message = require('../models/message');

module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('userConnecting', function (username) {
            console.log(`${username} is connecting`);
            /* User is initially in the general room */
            socket.room = 'general';
            socket.join('general');
            socket.username = username;
            socket.broadcast.to(socket.room).emit('connectedUser', socket.username);
        });
        socket.on('disconnect', function () {
            console.log(`${socket.username} is disconnecting`);
            socket.broadcast.to(socket.room).emit('disconnectedUser', socket.username);
        });
        socket.on('switchRoom', function (newRoom) {
            socket.leave(socket.room);
            socket.join(newRoom);
            socket.emit('updatePage', newRoom);
            socket.room = newRoom;

        });
        socket.on('newMessage', function (msg) {
            msg.room = socket.room;
            msg.date = Date.now();
            let messageToSave = new Message(msg);
            messageToSave.save(function (err) {
                if (err) {
                    return err;
                } else {
                    io.sockets.to(socket.room).emit('chat message', msg);
                }
            });
        });
    });
};

/* SOCKETS REFERENCE

socket.emit('message', "this is a test"); //sending to sender-client only
socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
io.emit('message', "this is a test"); //sending to all clients, include sender
io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
socket.emit(); //send to all connected clients
socket.broadcast.emit(); //send to all connected clients except the one that sent the message
socket.on(); //event listener, can be called on client to execute on server
io.sockets.socket(); //for emiting to specific clients
io.sockets.emit(); //send to all connected clients (same as socket.emit)
io.sockets.on() ; //initial connection from a client.

*/
