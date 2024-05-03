const mongoose = require('mongoose');

// Define the schema
const projectSchema = new mongoose.Schema({
  mainPic: {
    type: String, // Assuming storing URL to the main picture
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  additionalPictures: [{
    type: String // Assuming storing URLs to additional pictures
  }],
  teamMembers: [{
    pic: {
      type: String // Assuming storing URL to the team member's picture
    },
    name: {
      type: String,
      required: true
    }
  }]
});

// Create a model
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
