var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// A poll is composed of title, answers, colors, author and voters
var pollSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    answers: {
        type: Array,
        required: true
    },
    colors: {
      type: Array,
      required: true
    },
    author: String,
    voters : Array
});

pollSchema.methods.calculateVotes = function(answers) {
  var counter = 0;
  for (var i = 0; i < answers.length; i++) {
    counter += answers[i].vote;
  }
  return counter;
}

module.exports = mongoose.model('Poll', pollSchema);
