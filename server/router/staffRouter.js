const express=require('express');
const router=express.Router();
const upload=require('../middlewares/upload');
const {getAllStaff,updateStaffProfile}=require('../controllers/staffController');
router.get('/', getAllStaff);
router.put('/:userId', updateStaffProfile);
module.exports=router