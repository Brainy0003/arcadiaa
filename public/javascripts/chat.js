"use strict";

$(document).ready(function () {

    /* Helpers functions */
    function addMessage(element, messageClass, author, content, date) {
        moment.locale('fr');
        date = moment(date).format('DD MMM HH:mm');
        element.append(`<div class="${messageClass}"><div class="author">${author} <span class='pull-right'>${date}</span></div><div class="content">${content} </div></div>`);
        scrollToBottom(element);
    }

    function scrollToBottom(element) {
        // Scroll to bottom at each message
        let height = element[0].scrollHeight;
        element.scrollTop(height);
    }


    function addAllMessages(room, nbMessages) {
        $.get(`/api/messages/${room}`, function (messages) {
            $("#messages").empty();
            let length = messages.length;
            let numberOfMessagesToShow = length > nbMessages ? nbMessages : length;
            for (let i = length - numberOfMessagesToShow; i < length; i++) {
                addMessage($("#messages"), 'message', messages[i].author, messages[i].content, messages[i].date);
            }
        });
    }

    function notifyChat(element, isLeaving, username) {
        let arrivedOrLeft = isLeaving ? 'a quitté le chat' : 'est arrivé sur le chat';
        element.append(`<div class="alert alert-info"><p class="text-center">${username} ${arrivedOrLeft}.</p></div>`);
        scrollToBottom(element);
    }

    function switchRoom(room) {
        chat.emit('switchRoom', room);
    }

    var chat = io();
    addAllMessages('general', 25);

    /* Switch on chief room when user clicks on <a> tag */
    $("#chief").on('click', function () {
        switchRoom('chief');
    });

    /* Switch on general room when user clicks on <a> tag */
    $("#general").on('click', function () {
        switchRoom('general');
    });

    // Get connected username
    $.get('/api/me', function (data) {
        // Emit username as soon as we have the username
        var username = data.username;
        chat.emit('userConnecting', username);

        // Handling events
        chat.on('leaveChat', function (username) {
            notifyChat($("#messages"), true, username);
        });
        chat.on('joinChat', function (username) {
            notifyChat($("#messages"), false, username);
        });
        chat.on('chatMessage', function (message) {
            addMessage($("#messages"), 'newMessage message', message.author, message.content, message.date);
        });
        chat.on('updatePage', function (room) {
            addAllMessages(room, 20);
        });
        chat.on('isTyping', function (username) {
            $("#isTyping").text(`Quelqu'un écrit un message...`);
        });
        chat.on('stoppedTyping', function (username) {
            $("#isTyping").text('');
        });

        // Emitting events
        $("#messageInput").on('keyup', function () {
            chat.emit('isTyping', {
                username,
                'message': $("#messageInput").val()
            });
        });

        // Add new message
        $('form').submit(function () {
            var messageInput = $("#messageInput");
            /* Insert new message if not empty and length < 1000 characters */
            if (messageInput.val().trim() !== '' && messageInput.val().trim().length < 1000) {
                chat.emit('newMessage', {
                    'author': username,
                    'content': messageInput.val()
                });
            }
            messageInput.val('');
            return false;
        });
    });
});
