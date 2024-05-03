const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'Please enter an ID'],
    unique: [true,'this id is already used'],
    lowercase: true 
  },
  name:{
    type:String,
    required:[true,'name required']

  },
  email:{
    type:String,
    unique:[true,'this email is already used'],
    required:[true,'email is required'],
    validate:[isEmail,'please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  role:{
    type:String,
    enum:{
      values:['student','staff','head'],
      message:`{VALUE} is not supported`
    },
    required:[true,'user role is required']
  },
  slug:{
    type:String,
    lowercase:true
  }
},{timestamps:true}
);

// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(id, password) {
  const user = await this.findOne({ id });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      console.log('success')
      return user;
    }
    throw Error('Incorrect password');
  }
  throw Error('User not found');
};

const User = mongoose.model('user', userSchema);

module.exports = User;
