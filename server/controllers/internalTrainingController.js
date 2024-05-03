const InternalTraining = require('../models/internal-training');
const multer = require('multer');
const path = require('path');
// Controller functions
const createInternalTraining=async (req, res) => {
  try {
      // Constructing the data object for the training
      const trainingData = {
          title: req.body.title,
          description: req.body.description,
          whatYouWillLearn: req.body.whatYouWillLearn, // Assuming whatYouWillLearn is sent as a JSON string
          startsFrom: req.body.startsFrom,
          endsAt: req.body.endsAt,
          teachingInstructor:[]
      };
      // Adding the training picture URL to the training data
   
      trainingData.trainingPicture = req.files.trainingPicture[0].path;

      // Adding instructor information to the training data
      const instructorList=req.body.teachingInstructor
      for (const instructor of instructorList) {
          
          const instructorData = {
              name: instructor.name,
              title: instructor.title,
              description: instructor.description,
              profilePicture: req.files['teachingInstructor.profilePicture'][instructorList.indexOf(instructor)].path
          };
          trainingData.teachingInstructor.push(instructorData);
      }
      console.log('trainingData')
      console.log(trainingData)
      // Creating a new internal training document using the model and saving it to the database
      const newTraining = new InternalTraining(trainingData);
      await newTraining.save();

      res.status(201).json({ message: 'Internal training created successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
};


const getInternalTrainings=async (req, res) => {
  try {
    const internalTrainings = await InternalTraining.find();
    res.json(internalTrainings);
  } catch (error) {
    console.error('Error fetching all internal trainings:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


const getInternalTrainingById=async (req, res) => {
  try {
    const internalTraining = await InternalTraining.findById(req.params.id);
    if (!internalTraining) {
      return res.status(404).json({ error: 'Internal training not found' });
    }
    res.json(internalTraining);
  } catch (error) {
    console.error('Error fetching internal training by ID:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const updateInternalTraining = async (req, res) => {
  try {
    const trainingId = req.params.id; // Assuming the training ID is passed in the request parameters

    // Constructing the updated data object for the training
    const updatedTrainingData = {
      title: req.body.title,
      description: req.body.description,
      whatYouWillLearn: req.body.whatYouWillLearn,
      startsFrom: req.body.startsFrom,
      endsAt: req.body.endsAt,
      teachingInstructor: []
    };

    // Check if training picture is updated
    if (req.files.trainingPicture) {
      updatedTrainingData.trainingPicture = req.files.trainingPicture[0].path;
    }

    // Check if teaching instructors are updated
    if (req.body.teachingInstructor) {
      const instructorList = req.body.teachingInstructor;
      for (const instructor of instructorList) {
        const instructorData = {
          name: instructor.name,
          title: instructor.title,
          description: instructor.description,
          profilePicture: req.files['teachingInstructor.profilePicture'][instructorList.indexOf(instructor)].path
        };
        updatedTrainingData.teachingInstructor.push(instructorData);
      }
    }

    // Find the existing training document by ID and update it
    const updatedTraining = await InternalTraining.findByIdAndUpdate(trainingId, updatedTrainingData, { new: true });

    if (!updatedTraining) {
      return res.status(404).json({ message: 'Training not found' });
    }

    res.status(200).json({ message: 'Internal training updated successfully', updatedTraining });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const deleteInternalTraining=async (req, res) => {
  try {
    const internalTraining = await InternalTraining.findById(req.params.id);
    if (!internalTraining) {
      return res.status(404).json({ error: 'Internal training not found' });
    }
    await internalTraining.remove();
    res.json({ message: 'Internal training deleted successfully' });
  } catch (error) {
    console.error('Error deleting internal training:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Create a new internal training

module.exports = {
  createInternalTraining,
  getInternalTrainings,
  getInternalTrainingById,
  updateInternalTraining,
  deleteInternalTraining
};


// const createInternalTraining = async (req, res) => {
//   try {
//     const newInternalTraining = new InternalTraining(req.body);
//     await newInternalTraining.save();
//     res.status(201).json(newInternalTraining);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Get all internal trainings
// const getInternalTrainings = async (req, res) => {
//   try {
//     const internalTrainings = await InternalTraining.find();
//     res.status(200).json(internalTrainings);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get a specific internal training by ID
// const getInternalTrainingById = async (req, res) => {
//   try {
//     const internalTraining = await InternalTraining.findById(req.params.id);
//     if (!internalTraining) {
//       return res.status(404).json({ message: 'Internal training not found' });
//     }
//     res.status(200).json(internalTraining);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Update an internal training by ID
// const updateInternalTraining = async (req, res) => {
//   try {
//     const updatedInternalTraining = await InternalTraining.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedInternalTraining) {
//       return res.status(404).json({ message: 'Internal training not found' });
//     }
//     res.status(200).json(updatedInternalTraining);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete an internal training by ID
// const deleteInternalTraining = async (req, res) => {
//   try {
//     const internalTraining = await InternalTraining.findByIdAndDelete(req.params.id);
//     if (!internalTraining) {
//       return res.status(404).json({ message: 'Internal training not found' });
//     }
//     res.status(204).json(); // No content to send back
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

