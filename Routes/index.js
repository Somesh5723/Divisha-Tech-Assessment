const express=require('express');
const router=express.Router();

console.log('router loaded');

const homeController=require('../Controllers/home_controller');
router.get('/house',homeController.home);
router.use('/profile',require('./users'));
router.use('/mail',require('./posts'));

module.exports=router;