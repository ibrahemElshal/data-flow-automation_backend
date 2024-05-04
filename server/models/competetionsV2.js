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
    public_id: { type: String },
    secure_url: { type: String }
  }
});

// Create a model
const Competition = mongoose.model('CompetitionV2', competitionSchema);

module.exports = Competition;

