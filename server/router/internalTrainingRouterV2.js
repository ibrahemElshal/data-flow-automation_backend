const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload')
const cloudinary=require('../utlis/cloudinary');

const InternalTraining = require('../models/internalTrainingV2');

router.post('/',  upload.fields([
    { name: 'trainingPicture', maxCount: 1 },
    { name: 'teachingInstructor.profilePicture', maxCount: 10 } // Assuming a maximum of 10 instructors
  ]),
  async (req, res, next) => {
    try {
      const trainingPictureResult = req.files['trainingPicture']
        ? await cloudinary.uploader.upload(req.files['trainingPicture'][0].path)
        : null;

      const instructorProfilePictureResults = await Promise.all(
        (req.files['teachingInstructor.profilePicture'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path);
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const newTraining = new InternalTraining({
        ...req.body,
        trainingPicture: trainingPictureResult
          ? {
              public_id: trainingPictureResult.public_id,
              secure_url: trainingPictureResult.secure_url
            }
          : undefined,
        teachingInstructor: req.body.teachingInstructor.map((instructor, index) => ({
          ...instructor,
          profilePicture: instructorProfilePictureResults[index] || {}
        }))
      });
      await newTraining.save();
      res.status(201).json(newTraining);
    } catch (err) {
      next(err);
    }
  });
 router.get('/:id', async (req, res, next) => {
    try {
      const training = await InternalTraining.findById(req.params.id);
      if (!training) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json(training);
    } catch (err) {
      next(err);
    }
  });
 router.get('/', async (req, res, next) => {
    try {
      const trainings = await InternalTraining.find();
      res.json(trainings);
    } catch (err) {
      next(err);
    }
  });
 router.put('/:id',  upload.fields([
    { name: 'trainingPicture', maxCount: 1 },
    { name: 'teachingInstructor.profilePicture', maxCount: 10 } // Assuming a maximum of 10 instructors
  ]),
  async (req, res, next) => {
    try {
      const trainingPictureResult = req.files['trainingPicture']
        ? await cloudinary.uploader.upload(req.files['trainingPicture'][0].path, {
            folder: 'internal_training' // Specify the folder where the pictures will be stored
          })
        : null;

      const instructorProfilePictureResults = await Promise.all(
        (req.files['teachingInstructor.profilePicture'] || []).map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: 'instructor_profiles' // Specify the folder where the pictures will be stored
          });
          return {
            public_id: result.public_id,
            secure_url: result.secure_url
          };
        })
      );

      const updatedTraining = await InternalTraining.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          trainingPicture: trainingPictureResult
            ? {
                public_id: trainingPictureResult.public_id,
                secure_url: trainingPictureResult.secure_url
              }
            : undefined,
          teachingInstructor: req.body.teachingInstructor.map((instructor, index) => ({
            ...instructor,
            profilePicture: instructorProfilePictureResults[index] || {}
          }))
        },
        { new: true }
      );
      if (!updatedTraining) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json(updatedTraining);
    } catch (err) {
      next(err);
    }
  });
 router.delete('/:id', async (req, res, next) => {
    try {
      const deletedTraining = await InternalTraining.findByIdAndRemove(req.params.id);
      if (!deletedTraining) {
        return res.status(404).json({ error: 'Training not found' });
      }
      // Delete the training picture from Cloudinary
      await cloudinary.uploader.destroy(deletedTraining.trainingPicture.public_id);
      // Delete the instructor profile pictures from Cloudinary
      for (const instructor of deletedTraining.teachingInstructor) {
        await cloudinary.uploader.destroy(instructor.profilePicture.public_id);
      }
      res.json({ message: 'Training deleted successfully' });
    } catch (err) {
      next(err);
    }
  });

module.exports=router;