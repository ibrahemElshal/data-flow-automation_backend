const mongoose = require('mongoose');
const successStorySchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    mainPicture: {
      public_id: { type: String },
      secure_url: { type: String }
    },
    additionalPictures: [
      {
        public_id: { type: String },
        secure_url: { type: String }
      }
    ],
    video: {
      public_id: { type: String },
      secure_url: { type: String }
    },
    teamMembers: [
      {
        name: { type: String, required: true },
        picture: {
          public_id: { type: String },
          secure_url: { type: String }
        }
      }
    ]
  });
  
  // Create the model
  const SuccessStory = mongoose.model('SuccessStoryV2', successStorySchema);
  module.exports= SuccessStory;