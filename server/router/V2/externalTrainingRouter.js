const express=require('express');
const router=express.Router();
const upload=require('../../middlewares/upload')
const cloudinary=require('../../utlis/cloudinary')
const {createExternalTraining,
    getExternalTrainings,
    getExternalTrainingById,
    updateExternalTraining,
    deleteExternalTraining}=require('../../controllers/externalTrainingcontrollerV2');

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
router.get('/', getExternalTrainings);
router.get('/:id', getExternalTrainingById);
router.put('/:id',upload.single('trainingPic'), updateExternalTraining);
router.delete('/:id', deleteExternalTraining);
 

module.exports=router;