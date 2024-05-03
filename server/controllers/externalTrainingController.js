const multer = require('multer');
const path = require('path');
const ExternalTraining = require('../models/external-training');

// Controller functions
const createExternalTraining=async (req, res) => {
  try {
    const { title, description, link, startsFrom, endsAt } = req.body;
    const newTraining = new ExternalTraining({
      title,
      description,
      link,
      trainingPic: req.file.path, // Save the path of the uploaded image
      startsFrom,
      endsAt
    });
    console.log(req.file);
    const savedTraining = await newTraining.save();
    res.json(savedTraining);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};
const getExternalTrainings = async (req, res) => {
  try {
    const trainings = await ExternalTraining.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getExternalTrainingById=async (req, res) => {
  try {
    const training = await ExternalTraining.findById(req.params.id);
    res.json(training);
  } catch (err) {
    res.status(404).json({ message: 'Training not found' });
  }
};
const updateExternalTraining= async (req, res) => {
  try {
    const { title, description, link, startsFrom, endsAt } = req.body;
    const updatedTraining = await ExternalTraining.findByIdAndUpdate(req.params.id, {
      title,
      description,
      link,
      trainingPic: req.file ? req.file.path : undefined, // Update the image path only if a new image is uploaded
      startsFrom,
      endsAt
    }, { new: true });
    res.json(updatedTraining);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err.message });
  }
};

const deleteExternalTraining=async (req, res) => {
  try {
    const deletedTraining = await ExternalTraining.findByIdAndDelete(req.params.id);
    if (!deletedTraining) throw Error('Training not found');
    // Delete associated image from the server
    fs.unlinkSync(deletedTraining.trainingPic);
    res.json({ message: 'Training deleted' });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

module.exports = {
  createExternalTraining,
  getExternalTrainings,
  getExternalTrainingById,
  updateExternalTraining,
  deleteExternalTraining
};







// Create a new external training
// const createExternalTraining = async (req, res) => {
//   try {
//     const newExternalTraining = new ExternalTraining(req.body);
//     await newExternalTraining.save();
//     res.status(201).json(newExternalTraining);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all external trainings
// const getExternalTrainings = async (req, res) => {
//   try {
//     const externalTrainings = await ExternalTraining.find();
//     res.status(200).json(externalTrainings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a specific external training by ID
// const getExternalTrainingById = async (req, res) => {
//   try {
//     const externalTraining = await ExternalTraining.findById(req.params.id);
//     if (!externalTraining) {
//       return res.status(404).json({ message: 'External training not found' });
//     }
//     res.status(200).json(externalTraining);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an external training by ID
// const updateExternalTraining = async (req, res) => {
//   try {
//     const updatedExternalTraining = await ExternalTraining.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedExternalTraining) {
//       return res.status(404).json({ message: 'External training not found' });
//     }
//     res.status(200).json(updatedExternalTraining);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an external training by ID
// const deleteExternalTraining = async (req, res) => {
//   try {
//     const externalTraining = await ExternalTraining.findByIdAndDelete(req.params.id);
//     if (!externalTraining) {
//       return res.status(404).json({ message: 'External training not found' });
//     }
//     res.status(204).json(); // No content will be send jus approvel 
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
