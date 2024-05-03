const express=require('express');
const router=express.Router();
const {
    updateUser,
    deleteUser,
    getUserById,
    getUsers}=require('../controllers/userController');

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports=router;
    