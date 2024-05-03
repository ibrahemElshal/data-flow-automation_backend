const express=require('express');
const router=express.Router();
const multer = require('multer');
const ExternalTraining = require('../models/external-training');
const upload=require('../middlewares/upload.js');

//test 
const {getDepartmentMembers,getDepartmentMember}=require('../controllers/deparmentMemberscontroller');
//
const {
    getHomePage,
    getDepartmentMembersPage,
    getSuccessStoriesPage,
    getLoginPage,
    getProjectsPage,
    getCompetitionsPage,
    getTrainingPage,
    getStudyPlanPage,
    getInternalTrainingPage,
    getExternalTrainingPage,
    getInternalTrainingsPage,
    getExternalTrainingsPage,
    getAbout,
    getSuccessStory,
    getCompetition,
    getproject
}=require('../services/render');


//include evert function in every controller 
//competetion
const {createCompetition,
    getCompetitionById,
    getCompetitions,
    updateCompetition,
    deleteCompetition}=require('../controllers/competetionController');
//external training
const {createExternalTraining,
    getExternalTrainings,
    getExternalTrainingById,
    updateExternalTraining,
    deleteExternalTraining}=require('../controllers/externalTrainingController');


//grad projects
const {createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject}=require('../controllers/projectController');
//
//internal training 
const {createInternalTraining,
    updateInternalTraining,
    deleteInternalTraining,
    getInternalTrainingById,
    getInternalTrainings}=require('../controllers/internalTrainingController');

// success story
const {createSuccessStory,
    updateSuccessStory,
    deleteSuccessStory,
    getSuccessStories,
    getSuccessStoryById}=require('../controllers/successStoryController');
// user controller
const {createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsers}=require('../controllers/userController');
//routers APIS 
router.get('/',getHomePage);
router.get('/home',(req,res)=>{
    res.redirect('/');
})

// router.get('/about',getAbout);
router.get('/departmentmembers',getDepartmentMembersPage);//1
router.get('/successstories',getSuccessStoriesPage);//1
// export it and import but done
router.get('/successStory/:id',getSuccessStory);//1
router.get('/login',getLoginPage);//1
router.get('/projects',getProjectsPage);//1
// export it and import but done
router.get('/project/:id',getproject);
router.get('/competetions',getCompetitionsPage);
// now 
router.get('/competetion/:id',getCompetition);
router.get('/studyplan',getStudyPlanPage);
router.get('/internaltrainings',getInternalTrainingsPage);
router.get('/externaltrainings',getExternalTrainingsPage);

router.get('/internaltraining',getInternalTrainingPage);
router.get('/externaltraining',getExternalTrainingPage);



// Rest api 
//not done
//Apis for department members
// router.get('/api/v1/departmentMembers',getDepartmentMembers);
// router.get('/api/v1/departmentMembers',getDepartmentMembers);
// router.get('/api/v1/departmentMembers',getDepartmentMembers);
// router.get('/api/v1/departmentMembers',getDepartmentMembers);
// router.get('/api/v1/departmentMembers',getDepartmentMembers);


//Apis for success stories
router.get('/api/v1/successStories',getSuccessStories);
router.get('/api/v1/successStory/:id',getSuccessStoryById);
router.post('/api/v1/successStory',upload.fields([{ name: 'mainPicture' }, { name: 'additionalPictures' }, { name: 'video' }, { name: 'teamMemberPictures' }]),createSuccessStory);
router.put('/api/v1/successStory/:id',updateSuccessStory);
router.delete('/api/v1/successStory/:id',deleteSuccessStory);

// Apis for projects
router.route('/projects')
  .get(getProjects)
  .post(createProject);

router.route('/project/:id')
  .get(getProjectById)
  .put(updateProject)
  .delete(deleteProject);
// Apis for competitions 
router.route('/competition')
  .post(createCompetition)
  .get(getCompetitions);

router.route('/competition/:id')
  .get(getCompetitionById)
  .put(updateCompetition)
  .delete(deleteCompetition);
// Apis for internal training :
router.post('/api/v1/internalTraining', createInternalTraining);
router.get('/api/v1/internalTraining/:id', getInternalTrainingById);
router.get('/api/v1/internalTrainings', getInternalTrainings);
router.put('/api/v1/internalTraining/:id', updateInternalTraining);
router.delete('/api/v1/internalTraining/:id', deleteInternalTraining);
// APIS for external training :
router.post('/api/v1/externalTraining', upload.single('trainingPic'), async (req, res) => {
  try {
    const { title, description, link, startsFrom, period } = req.body;
    const newTraining = new ExternalTraining({
      title,
      description,
      link,
      trainingPic: req.file.path, // Save the file path in the database
      startsFrom,
      period
    });
    const savedTraining = await newTraining.save();
    res.status(201).json(savedTraining);
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
});
router.get('/api/v1/externalTrainings', getExternalTrainings);
router.get('/api/v1/externalTraining/:id', getExternalTrainingById);
router.put('/api/v1/externalTraining/:id', updateExternalTraining);
router.delete('/api/v1/externalTraining/:id', deleteExternalTraining);


//test 
router.get('/api/v1/departmentMembersAll', getDepartmentMembers);
router.get('/api/v1/departmentMember/:id', getDepartmentMember);
// Apis for users :
// router.post('/api/v1/user', createUser);
// router.get('/api/v1/users', getUsers);
// router.get('/api/v1/user/:id', getUserById);
// router.put('/api/v1/user/:id', updateUser);
// router.delete('/api/v1/user/:id', deleteUser);


module.exports=router;