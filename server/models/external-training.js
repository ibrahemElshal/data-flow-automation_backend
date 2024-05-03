const mongoose = require('mongoose');

// Define the schema
const externalTrainingSchema = new mongoose.Schema({
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
  trainingPic: {
    type: String, // Assuming storing URL to the training picture
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
const ExternalTraining = mongoose.model('ExternalTraining', externalTrainingSchema);

module.exports = ExternalTraining;
