const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
    getSuccessStories,
    getSuccessStoryById}=require('../controllers/successStoryController');

router.get('/',getSuccessStories);
router.get('/:id',getSuccessStoryById);
router.post('/',upload.fields([{ name: 'mainPicture', maxCount: 1 }, { name: 'additionalPictures', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'teamMembersPictures', maxCount: 10 }]),createSuccessStory);
router.put('/:id',upload.fields([{ name: 'mainPicture', maxCount: 1 }, { name: 'additionalPictures', maxCount: 10 }, { name: 'video', maxCount: 1 }, { name: 'teamMembersPictures', maxCount: 10 }]),updateSuccessStory);
router.delete(':id',deleteSuccessStory);

module.exports=router;