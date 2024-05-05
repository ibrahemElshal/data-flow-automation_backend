const express=require('express');
const router=express.Router();
const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addProfilePic}=require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.put('/:id',addProfilePic);


module.exports=router;