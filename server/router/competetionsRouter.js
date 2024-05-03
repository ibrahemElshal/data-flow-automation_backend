const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {createCompetition,
    getCompetitionById,
    getCompetitions,
    updateCompetition,
    deleteCompetition}=require('../controllers/competetionController');

    //upload.single('competitionPic')
router.post('/',upload.single('competitionPic'),createCompetition)
router.get('/',getCompetitions);
  

router.get('/:id',getCompetitionById)
router.put('/:id',upload.single('competitionPic'),updateCompetition);
router.delete('/:id',deleteCompetition);

module.exports=router
