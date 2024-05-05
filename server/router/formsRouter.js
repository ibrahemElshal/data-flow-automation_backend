const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');

const {createForm,getPendingProjects,forwardForm,downloadForm,getAllForms}=require('../controllers/formController');

router.post('/createform',upload.single('pdf'),createForm);
router.get('/formsToHandle',getPendingProjects);
router.put('/forward/:formId',forwardForm);
router.get('/download/:formId',downloadForm);
router.get('/',getAllForms);



module.exports=router