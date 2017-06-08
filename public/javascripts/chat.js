var socket = io();
$.get('/api/', function(data) {
  socket.emit('newUser', data.username);
});
socket.on('chat message', function(msg) {
  $("#messages-list").append("<li class='list-group-item'>" + msg + "</li>");
});
$('form').submit(function() {
  var messageInput = $("#message");
  if (messageInput.val().trim() !== '') {
    socket.emit('newMessage', $("#message").val());
  }
  messageInput.val('');
  return false;
});
