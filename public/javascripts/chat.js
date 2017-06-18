"use strict";

$(document).ready(function () {

    /* Helpers functions */
    function addMessage(element, author, content) {
        element.append(`<div class="message"><div class="author">${author}</div><div class="content">${content}</div></div>`);
        // Scroll to bottom at each message
        let height = element[0].scrollHeight;
        element.scrollTop(height);
    }

    function switchRoom(room) {
        chat.emit('switchRoom', room);
    }

    // Get all messages in the database
    function addAllMessages(room, nbMessages) {
        $.get(`/api/messages/${room}`, function (messages) {
            $("#messages").empty();
            let length = messages.length;
            let numberOfMessagesToShow = length > nbMessages ? nbMessages : length;
            for (let i = length - numberOfMessagesToShow; i < length; i++) {
                addMessage($("#messages"), messages[i].author, messages[i].content);
            }
        });
    }

    var chat = io();

    /* Switch on chief room when user clicks on <a> tag */
    $("#chief").on('click', function () {
        switchRoom('chief');
    });

    /* Switch on general room when user clicks on <a> tag */
    $("#general").on('click', function () {
        switchRoom('general');
    });

    addAllMessages('general', 20);

    chat.emit('room', 'general');
    // Get connected username
    $.get('/api/me', function (data) {
        // Emit username as soon as we have the username
        var username = data.username;
        chat.emit('userConnecting', username);

        // Handling events
        chat.on('connectedUser', function (username) {
            $("#messages").append(`<div class="alert alert-info"><p class="text-center">${username} s'est connecté.</p></div>`);
        });
        chat.on('disconnectedUser', function (username) {
            $("#messages").append(`<div class="alert alert-info"><p class="text-center">${username} s'est déconnecté.</p></div>`);
        });
        chat.on('chat message', function (message) {
            addMessage($("#messages"), message.author, message.content);
        });
        chat.on('updatePage', function (room) {
            addAllMessages(room, 20);
        });

        // Add new message
        $('form').submit(function () {
            var messageInput = $("#message");
            /* Insert new message if not empty and length < 1000 characters */
            if (messageInput.val().trim() !== '' && messageInput.val().trim().length < 1000) {
                chat.emit('newMessage', {
                    'author': username,
                    'content': messageInput.val(),
                    'date': Date.now()
                });
            }
            messageInput.val('');
            return false;
        });
    });
});
