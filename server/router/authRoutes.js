const express=require('express');
const router=express.Router();
const {signup_get,
    signup_post,
    login_get,
    login_post,
    logout_get
}=require('../controllers/authController')

router.get('/login',login_get)
router.get('/signup',signup_get);
router.post('/signup',signup_post);
router.post('/login',login_post);
router.get('/logout',logout_get);
module.exports=router