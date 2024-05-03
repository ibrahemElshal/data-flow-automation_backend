const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {createInternalTraining,
    getInternalTrainings,
    getInternalTrainingById,
    updateInternalTraining,
    deleteInternalTraining
    }=require('../controllers/internalTrainingController');
    
router.post('/',  upload.fields([{ name: 'teachingInstructor.profilePicture', maxCount: 5 }, { name: 'trainingPicture', maxCount: 1 }]),createInternalTraining);
router.get('/:id', getInternalTrainingById);
router.get('/', getInternalTrainings);
router.put('/:id', upload.fields([{ name: 'teachingInstructor.profilePicture', maxCount: 5 }, { name: 'trainingPicture', maxCount: 1 }]), updateInternalTraining);
router.delete('/:id', deleteInternalTraining);
module.exports=router;