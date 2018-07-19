const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: new Date()
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports.schema = exerciseSchema;

module.exports.model = Exercise;