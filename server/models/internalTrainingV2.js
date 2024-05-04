const mongoose = require('mongoose');

const internalTrainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    whatYouWillLearn: [{ type: String, required: true }],
    teachingInstructor: [
      {
        name: { type: String, required: true },
        title: { type: String },
        description: { type: String },
        profilePicture: {
          public_id: { type: String },
          secure_url: { type: String }
        }
      }
    ],
    trainingPicture: {
      public_id: { type: String },
      secure_url: { type: String }
    },
    startsFrom: { type: Date, required: true },
    endsAt: { type: Date, required: true }
  });
  
  // Create the model
  const InternalTraining = mongoose.model('InternalTrainingV2', internalTrainingSchema);
  module.exports= InternalTraining;