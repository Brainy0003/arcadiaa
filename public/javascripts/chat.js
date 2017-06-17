function addMessage(element, author, content) {
  element.append(`<div class="message"><div class="author">${author}</div><div class="content">${content}</div></div>`);
  // Scroll to bottom at each message
  let height = element[0].scrollHeight;
  element.scrollTop(height);
}

function buildUserMessages(messages) {
  let userMessagesContainer = $(`<div class="message"></div>`);
  let author = messages[0].author;
  userMessagesContainer.append(`<div class="author">${author}</div>`);
  for (let i = 0; i < messages.length; i++) {
    userMessagesContainer.append(`<div class="content">${messages[i].content}</div>`);
  }
  $("#messages").append(userMessagesContainer);
}

function buildAllMessages(messages) {
  for (let i = 0; i < messages.length; i++) {
    buildUserMessages(messages[i]);
  }
}

$(document).ready(function() {
  var socket = io();
  $.get('/api/messages', function(messages) {
    let length = messages.length;
    let numberOfMessagesToShow = length > 20 ? 20 : length;
    let previousUser = messages[length - numberOfMessagesToShow].author;
    let allMessages = [];
    let userMessages = []
    for (let i = length - numberOfMessagesToShow + 1; i < length; i++) {
      if (previousUser === messages[i].author) {
        userMessages.push(messages[i]);
      } else {
        allMessages.push(userMessages);
        userMessages = [messages[i]];
      }
      previousUser = messages[i].author;
    }
    allMessages.push(userMessages);
    userMessages = [];
    buildAllMessages(allMessages);
    $.get('/api/me', function(data) {
      var username = data.username;
      socket.on('connectedUser', function(username) {
        $("#messages").append(`<div class="alert alert-info"><p class="text-center">${username} s'est connecté.</p></div>`);
      });
      socket.on('disconnectedUser', function(username) {
        $("#messages").append(`<div class="alert alert-info"><p class="text-center">${username} s'est déconnecté.</p></div>`);
      });
      socket.on('chat message', function(message) {
        addMessage($("#messages"), message.author, message.content);
      });
      $('form').submit(function() {
        var messageInput = $("#message");
        if (messageInput.val().trim() !== '') {
          socket.emit('newMessage', {
            'author': username,
            'content': messageInput.val()
          });
        }
        messageInput.val('');
        return false;
      });
    });
  });
});
