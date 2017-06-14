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
  },
  date: Date
});

module.exports = mongoose.model('Message', messageSchema);
