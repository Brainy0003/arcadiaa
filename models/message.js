var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);
