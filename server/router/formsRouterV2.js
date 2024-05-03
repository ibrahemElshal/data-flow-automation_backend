const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');

const {createForm ,//
    forwardForm,//
    downloadForm,
    deleteForm,
    assignedForms,
    getAllForms
}=require('../controllers/formsControllerV2');

router.post('/createform',createForm);
router.get('/',getAllForms);
router.put('/forward/:formId',forwardForm);
router.get('/pdf/:formId',downloadForm);
router.get('/staff/:userId',assignedForms);



module.exports=router