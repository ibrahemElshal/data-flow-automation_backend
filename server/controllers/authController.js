const User = require("../models/User");
const Staff = require('../models/staff');
const jwt = require('jsonwebtoken');
require('dotenv');
// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { };
  if(err.email)
    
  // duplicate id error
  if (err.code === 11000) {
    errors.id = 'That ID is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: maxAge
  });
};

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { id,name,email,role, password ,slug} = req.body; 

  try {
    const user = await User.create({  id,name,email,role, password ,slug });
    if( role==='staff' || role==='head'){
      const staff = new Staff({ user: user._id });
      await staff.save();
      console.log('staff signed up sucessfully')
    }
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
    console.log('signed up successfully');
  }
  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { id, password } = req.body; // Changed from email to id

  try {
    const user = await User.login(id, password); // Changed from email to id
    const token = createToken(user._id);
    
    res.cookie('jwt', token, { maxAge: maxAge * 1000 }); 
    res.status(200).json({ token });
    
  } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
  }

}

module.exports.logout_get=(req,res)=>{
    res.cookie('jwt','',{ maxAge : 1 }); // Corrected from req.cookie to res.cookie
    res.redirect('/');
}
