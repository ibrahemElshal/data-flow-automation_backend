const mongoose = require("mongoose");

// Reference Schema from mongoose
const Schema = mongoose.Schema;

const staffSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId, // Now referencing Schema from mongoose
      ref: 'user'
    },
    profilePicture: {
      type: String,
      default: null
    },
    brief: {
      type: String,
      default: null
    },
    researchPapers: {
      type: [String],
      default: null
    },
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

const Staff = mongoose.model('staff', staffSchema);
module.exports = Staff;