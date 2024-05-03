const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');

const {createForm,getPendingProjects,forwardForm,downloadForm}=require('../controllers/formController');

router.post('/forms/createform',upload.single('pdf'),createForm);
router.get('/forms/handle',getPendingProjects);
router.put('/forms/forward/:formId',forwardForm);
router.get('/forms/download/:formId',downloadForm);


module.exports=router