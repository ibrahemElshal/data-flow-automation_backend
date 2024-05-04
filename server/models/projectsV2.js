const mongoose = require('mongoose');

// Define the schema
const projectSchema = new mongoose.Schema({
  mainPic: {
    public_id: { type: String },
    secure_url: { type: String }
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
    public_id: { type: String },
    secure_url: { type: String }
  }],
  teamMembers: [{
    pic: {
        public_id: { type: String },
        secure_url: { type: String }
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
