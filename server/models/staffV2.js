const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, // Now referencing Schema from mongoose
      ref: 'user'
    },
    profilePicture: {
        public_id: { type: String },
        secure_url: { type: String }
    },
    brief: {
      type: String,
      default: null
    },
    researchPapers: [{
        public_id: { type: String },
        secure_url: { type: String }
    }],
    subjectHistory: [{
      subjectCode: {
        type: String,
        default: null
      },
      subjectName: {
        type: String,
        default: null
      }
    }]
});

const Staff = mongoose.model('staffV2', staffSchema);
module.exports = Staff;