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
  $.get(`/api/messages/${room}`, function(messages) {
    $("#messages").empty();
    let length = messages.length;
    let numberOfMessagesToShow = length > nbMessages ? nbMessages : length;
    for (let i = length - numberOfMessagesToShow; i < length; i++) {
      addMessage($("#messages"), 'message', messages[i].author, messages[i].content, messages[i].date);
    }
  });
}

$(document).ready(function() {
  var chat = io('/chat');
  addAllMessages('general', 25);

  $(".switch").on('click', function() {
    chat.emit('switchRoom', this.id);
  });

  $("#messageInput").on('keypress', function(e) {
    if (e.which == 13 && !e.shiftKey) {
      $("#message-input-form").submit();
      $(this).val('').focus();
      return false;
    }
  });

  $("#sendMessage").on('click', function() {
    $("#message-input-form").submit();
    $("#messageInput").val('').focus();
    return false;
  });

  // Get connected username
  $.get('/api/me', function(data) {
    // Emit username as soon as we have the username
    var username = data.username;
    chat.emit('userConnecting', username);

    // Handling events
    chat.on('chatMessage', function(message) {
      addMessage($("#messages"), 'newMessage message', message.author, message.content, message.date);
    });
    chat.on('updatePage', function(room) {
      addAllMessages(room, 20);
    });
    chat.on('isTyping', function(username) {
      $("#isTyping").text(`Quelqu'un écrit un message...`);
    });
    chat.on('stoppedTyping', function(username) {
      $("#isTyping").text('');
    });
    chat.on('connectedUsers', function(connectedUsers) {
      $("#connectedUsers").html('');
      for (let i = 0; i < connectedUsers.length; i++) {
        $("#connectedUsers").append(`<li class='list-group-item list-group-item-success'>${connectedUsers[i]}</li>`);
      }
    });

    // Emitting events
    $("#messageInput").on('keyup', function() {
      chat.emit('isTyping', {
        username,
        'message': $("#messageInput").val()
      });
    });

    // Add new message
    $('form').submit(function() {
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
