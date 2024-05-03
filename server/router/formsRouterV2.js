const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');

const {createForm ,//
    forwardForm,//
    downloadForm,
    deleteForm,
    assignedForms}=require('../controllers/formsControllerV2');

router.post('/createform',createForm);
router.get('/',assignedForms);
router.put('/forward/:formId',forwardForm);
router.get('/pdf/:formId',downloadForm);


module.exports=router