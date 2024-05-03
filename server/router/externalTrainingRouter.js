const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload')
const {createExternalTraining,
    getExternalTrainings,
    getExternalTrainingById,
    updateExternalTraining,
    deleteExternalTraining}=require('../controllers/externalTrainingController');

router.post('/', upload.single('trainingPic'), createExternalTraining);
router.get('/', getExternalTrainings);
router.get('/:id', getExternalTrainingById);
router.put('/:id',upload.single('trainingPic'), updateExternalTraining);
router.delete('/:id', deleteExternalTraining);
 

module.exports=router;