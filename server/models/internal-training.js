const mongoose = require('mongoose');

// Define the schema
const internalTrainingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  whatYouWillLearn: [{
    type: String,
    required: true
  }],

  teachingInstructor:[ {
    name: {
      type: String,
      required: true
    },
    title: {
      type: String
    },
    description: {
      type: String
    },
    profilePicture:{
      type: String
    }
  }],

  trainingPicture: {
    type: String, // Assuming storing URL to the topic picture
    required: true
  },

  startsFrom: {
    type: Date,
    required: true
  },
  
  endsAt: {
    type: Date,
    required: true // Assuming period is in days
  }
});

// Create a model
const InternalTraining = mongoose.model('InternalTraining', internalTrainingSchema);
module.exports = InternalTraining;
