function addMessage(element, author, content) {
  element.append(`<div class="message"><div class="author">${author}</div><div class="content">${content}</div></div>`);
  // Scroll to bottom at each message
  let height = element[0].scrollHeight;
  element.scrollTop(height);
}

$(document).ready(function() {
  var socket = io();
  $.get('/api/messages', function(messages) {
    let length = messages.length;
    let numberOfMessagesToShow = length > 20 ? 20 : length;
    for (let i = length - numberOfMessagesToShow; i < length; i++) {
      addMessage($("#messages"), messages[i].author, messages[i].content);
    }
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
        if (messageInput.val().trim() !== '' && messageInput.val().trim().length < 1000) {
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