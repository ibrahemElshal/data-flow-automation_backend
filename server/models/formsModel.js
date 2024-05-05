const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default:null
  },
  pdf: {
    data: String, // Store binary data of the PDF file
    contentType: String // Store content type of the file (e.g., 'application/pdf')
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  },
  handledBy: {
    type: Schema.Types.ObjectId,
    ref: 'Staff'
  }
}, { timestamps: true });

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
