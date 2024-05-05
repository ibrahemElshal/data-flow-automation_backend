const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload')
const cloudinary=require('../utlis/cloudinary');
const ExternalTraining = require('../models/externalTrainingV2');


// const {createExternalTraining,
//     getExternalTrainings,
//     getExternalTrainingById,
//     updateExternalTraining,
//     deleteExternalTraining}=require('../controllers/externalTrainingcontrollerV2');
    router.post('/', upload.single('trainingPic'), async (req, res) => {
        try {
          if (!req.file) {
            throw new Error('No file uploaded');
          }
      
          const result = await cloudinary.uploader.upload(req.file.path);
          
          const newTraining = new ExternalTraining({
            title: req.body.title,
            description: req.body.description,
            link: req.body.link,
            trainingPic: {
              public_id: result.public_id,
              secure_url: result.secure_url
            },
            startsFrom: req.body.startsFrom,
            endsAt: req.body.endsAt
          });
      
          await newTraining.save();
      
          res.status(201).json(newTraining);
        } catch (err) {
          console.error(err);
          res.status(400).json({ error: err.message });
        }
      });
router.get('/', async (req, res) => {
  try {
    const trainings = await ExternalTraining.find();
    res.json(trainings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const training = await ExternalTraining.findById(req.params.id);
    if (!training) {
      return res.status(404).json({ error: 'Training not found' });
    }
    res.json(training);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put('/:id', upload.single('trainingPic'), async (req, res) => {
  try {
    let updatedTrainingData = { ...req.body };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedTrainingData.trainingPic = {
        public_id: result.public_id,
        secure_url: result.secure_url
      };
    }

    const updatedTraining = await ExternalTraining.findByIdAndUpdate(
      req.params.id,
      updatedTrainingData,
      { new: true }
    );

    if (!updatedTraining) {
      return res.status(404).json({ error: 'Training not found' });
    }

    res.json(updatedTraining);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTraining = await ExternalTraining.findByIdAndDelete(req.params.id);
    if (!deletedTraining) {
      return res.status(404).json({ error: 'Training not found' });
    }
    // Delete the training picture from Cloudinary
    await cloudinary.uploader.destroy(deletedTraining.trainingPic.public_id);
    res.json({ message: 'Training deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=router;