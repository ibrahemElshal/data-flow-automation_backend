const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {getAllStaff,updateStaffProfile}=require('../controllers/staffController');
router.get('/', getAllStaff);
router.get('/:userId', updateStaffProfile);
module.exports=router