const mongoose = require('mongoose');
const formSchema = new mongoose.Schema({
formType: {
type: String,
required: true,
enum: ['Type1', 'Type2', 'Type3'] // Add the available form types here
},
description: {
type: String,
required: true
},
submittedBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'user', // Assuming you have a 'Student' model
required: true
},
submittedAt: {
type: Date,
default: Date.now
},
pdfFile: {
type: Buffer // To store the PDF file data
},
status: {
type: String,
enum: ['Pending', 'InProgress', 'Completed'],
default: 'Pending'
},
handledBy: {
type: mongoose.Schema.Types.ObjectId,
ref: 'User' // Assuming you have a 'User' model for staff members
}
});
const FormV2 = mongoose.model('FormV2', formSchema);
module.exports = FormV2;