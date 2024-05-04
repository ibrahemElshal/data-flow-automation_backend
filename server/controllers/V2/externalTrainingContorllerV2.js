const ExternalTraining=require('../../models/externalTrainingV2')
const cloudinary=require('../../utlis/cloudinary')
const path = require('path');
const createExternalTraining = // Handle file upload with Multer
  async (req, res) => {
    try {
      console.log('......');
      console.log(req.file.path);
      const result = await cloudinary.uploader.upload(req.file.path);
      const newTraining = new ExternalTraining({
        ...req.body
      });
      console.log('..........')
      newTraining.trainingPic.public_id = result.public_id; // Store the Cloudinary public_id
      newTraining.trainingPic.secure_url = result.secure_url;
      await newTraining.save();
      res.status(201).json(newTraining);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err.message });
    }
  }
;

// Get all trainings
const getExternalTrainings = async (req, res) => {
  try {
    const trainings = await ExternalTraining.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a training by ID
const getExternalTrainingById = async (req, res) => {
  try {
    const training = await ExternalTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a training by ID
const updateExternalTraining =
  async (req, res) => {
    try {
      const updatedTraining = await ExternalTraining.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          trainingPic: req.file ? { path: req.file.path } : undefined // Update trainingPic if a new file is provided
        },
        { new: true }
      );
      if (!updatedTraining) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json(updatedTraining);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

// Delete a training by ID
const deleteExternalTraining = async (req, res) => {
  try {
    const deletedTraining = await ExternalTraining.findByIdAndRemove(req.params.id);
    if (!deletedTraining) {
      return res.status(404).json({ error: 'Training not found' });
    }
    // Delete the training picture from Cloudinary
    await cloudinary.uploader.destroy(deletedTraining.trainingPic.public_id);
    res.json({ message: 'Training deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
    createExternalTraining ,
    getExternalTrainings,
    getExternalTrainingById,
    updateExternalTraining,
    deleteExternalTraining
}