const mongoose = require('mongoose');

// Define the schema
const successStorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mainPicture: {
    type: String, // Assuming storing URL to the main picture
    required: true
  },
  additionalPictures: [{
    type: String // Assuming storing URLs to additional pictures
  }],
  video: {
    type: String // Assuming storing URL to the video
  },
  teamMembers: [{
    name: {
      type: String,
      required: true
    },
    picture: {
      type: String // Assuming storing URL to the team member's picture
    }
  }]
});

// Create a model
const SuccessStory = mongoose.model('SuccessStory', successStorySchema);

module.exports = SuccessStory;
