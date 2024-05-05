const User = require('../models/UserV2');

const cloudinary=require('../utlis/cloudinary')


// Controller functions

// Create a new user
// const createUser = async (req, res) => {
//   try {
//     const newUser = new User(req.body);
//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// Get all users
const getUsers = async (req, res) => {
  try {
    // Build the query object based on query parameters
    const query = {};

    // If 'role' query parameter is provided, filter users by role
    if (req.query.role) {
      query.role = req.query.role;
    }

    // If 'name' query parameter is provided, perform case-insensitive search by name
    if (req.query.name) {
      query.name = { $regex: new RegExp(req.query.name, 'i') };
    }

    // If 'id' query parameter is provided, filter users by ID
    if (req.query.id) {
      query.id = req.query.id;
    }

    // If 'email' query parameter is provided, filter users by email
    if (req.query.email) {
      query.email = req.query.email;
    }

    // Query the database using the constructed query object
    const users = await User.find(query).exec();

    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
// Get a specific user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).json(); //  // No content will be send jus approvel 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addProfilePic=async (req, res) => {
    try {
      // Upload photo to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
  
      // Update user document with uploaded photo details
      const user = await User.findById(req.user.id); // Assuming user is authenticated and user ID is available in req.user.id
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Update ProfilePic field in user document
      user.ProfilePic = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };
      await user.save();
  
      res.status(200).json({ message: 'Photo uploaded successfully', imageUrl: result.secure_url });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addProfilePic
};
