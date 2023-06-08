const express=require('express');
const router=express.Router();

const userController=require('../Controllers/users_controller');
router.get('/users',userController.users);
router.get('/signIn',userController.signIn);
router.get('/signUp',userController.signUp);
router.post('/create',userController.create);
router.post('/session',userController.session);

module.exports=router;