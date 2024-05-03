// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

// const departmentMemberSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: [true, 'Please enter an ID'],
//     unique: true,
//     lowercase: true // Assuming IDs are case-insensitive
//   },
//   password: {
//     type: String,
//     required: [true, 'Please enter a password'],
//     minlength: [6, 'Minimum password length is 6 characters'],
//   },
//   brief: {
//     type: String,
//     required: true
//   },
//   researchPapers: {
//     type: [String],
//     default: []
//   },
//   subjectsHistory: {
//     type: [String],
//     default: []
//   }
// });

// // fire a function before doc saved to db
// departmentMemberSchema.pre('save', async function(next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// const DepartmentMember = mongoose.model('DepartmentMember', departmentMemberSchema);

// module.exports = DepartmentMember;
