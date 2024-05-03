const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject}=require('../controllers/projectController');


router.get('/',getProjects)
router.post('/', upload.fields([{ name: 'mainPic', maxCount: 1 }, { name: 'additionalPictures', maxCount: 5 }, { name: 'teamMembers', maxCount: 5 }]),createProject);
  
router.get('/:id',getProjectById)
router.put('/:id',upload.fields([{ name: 'mainPic', maxCount: 1 }, { name: 'additionalPictures', maxCount: 5 }, { name: 'teamMembers', maxCount: 5 }]),updateProject)
router.delete('/:id',deleteProject);
module.exports=router;