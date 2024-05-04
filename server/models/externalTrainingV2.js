const mongoose = require('mongoose');
const cloudinary=require('../middlewares/uploadTocloudinary')
const externalTrainingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    trainingPic: {
      public_id: { type: String },
      secure_url: { type: String }
    },
    startsFrom: { type: Date, required: true },
    endsAt: { type: Date, required: true }
  });

  // externalTrainingSchema.pre('save', async function(next) {
  //     const result = await cloudinary.uploader.upload(this.trainingPic.path);
  //     this.trainingPic.public_id = result.public_id; // Store the Cloudinary public_id
  //     this.trainingPic.secure_url = result.secure_url; // Store the Cloudinary secure URL
  //   next();
  // });
  const ExternalTraining = mongoose.model('ExternalTrainingV2', externalTrainingSchema);
  module.exports=ExternalTraining;