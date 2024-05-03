const mongoose = require('mongoose');

// Define the schema
const competitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  competitionPic: {
    type: String, // Assuming storing URL to the competition picture
    required: true
  }
});

// Create a model
const Competition = mongoose.model('Competition', competitionSchema);

module.exports = Competition;
